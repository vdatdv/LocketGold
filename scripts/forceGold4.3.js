
// ============================================================
// Locket Remote Config Rewrite
// Endpoint: firebaseremoteconfig.googleapis.com
// Dùng cho: Loon / Quantumult X / Surge / Shadowrocket
// ============================================================

(function () {
var ua = ($request && $request.headers && ($request.headers["User-Agent"] || $request.headers["user-agent"])) || "";
var obj;
try {
    obj = JSON.parse($response.body);
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
        throw new Error("Remote Config response is not a JSON object");
    }
} catch (parseError) {
    if (typeof console !== "undefined" && console.log) {
        console.log("[VINHDAT AI CHECK] SKIP_NON_JSON_RESPONSE (Script Test may use placeholder text)");
    }
    $done({ body: $response.body });
    return;
}

// Gộp cấu hình gốc thay vì xóa các khóa AI do máy chủ Locket cấp.
function vinhdatReadConfigObject(raw) {
    try {
        if (typeof raw === "string") raw = JSON.parse(raw);
        return raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
    } catch (ignored) {
        return {};
    }
}


// ============================================================
// VINHDAT AI EFFECTS CHECK (CHỈ GHI NHẬT KÝ, KHÔNG ĐỔI CẤU HÌNH)
// Các tên khóa được ghi lại để kiểm tra cấu hình AI từ máy chủ.
// Không ghi token, ID người dùng hoặc nội dung phản hồi.
// ============================================================
try {
    if (ua.includes("Locket") && typeof console !== "undefined" && typeof console.log === "function") {
        var aiKeys = [];
        var aiPattern = /(^|[_\.\-])(ai|aigc|credits?|quotas?|effects?|generative|generation)([_\.\-]|$)/i;
        function inspectAIKeys(value, prefix, depth) {
            if (!value || depth > 4 || aiKeys.length >= 40) return;
            if (typeof value === "string") {
                if (value.length > 20000) return;
                var trimmed = value.trim();
                if (trimmed.charAt(0) !== "{" && trimmed.charAt(0) !== "[") return;
                try { value = JSON.parse(trimmed); } catch (ignored) { return; }
            }
            if (typeof value !== "object") return;
            var keys = Object.keys(value);
            for (var idx = 0; idx < keys.length && aiKeys.length < 40; idx++) {
                var key = keys[idx];
                var path = prefix ? prefix + "." + key : key;
                if (aiPattern.test(key)) {
                    // Chỉ ghi tên khóa, không ghi giá trị hay thông tin tài khoản.
                    aiKeys.push(path.substring(0, 180));
                }
                // Dò qua cấu hình JSON lồng nhau tối đa 4 cấp.
                inspectAIKeys(value[key], path, depth + 1);
            }
        }
        inspectAIKeys(obj.entries || {}, "entries", 0);
        if (aiKeys.length) {
            console.log("[VINHDAT AI CHECK] FOUND " + aiKeys.length + " KEYS");
            console.log("[VINHDAT AI CHECK] " + aiKeys.join(" | "));
        } else {
            console.log("[VINHDAT AI CHECK] NO_AI_KEYS_FOUND in Remote Config response");
        }
    }
} catch (aiCheckError) {
    // Không để kiểm tra AI làm gián đoạn script chính.
}

if (ua.includes("Locket")) {
    obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";
    obj.state = "UPDATE";
    obj.entries = obj.entries || {};

    // ============================================================
    // 1. CẤU HÌNH GOLD, FEATURE GATES & PAYWALL 
    // ============================================================
    Object.assign(obj.entries, {
        feature_gates: JSON.stringify(Object.assign({}, vinhdatReadConfigObject(obj.entries.feature_gates), {
            app_icon_picker: "enabled",
            camera_roll: "enabled",
            camera_theme: "enabled",
            locket_views: "enabled",
            long_captions: "enabled",
            longer_video: "enabled",
            unlimited_friends: "enabled",
            priority_support: "enabled",
            profile_badge: "enabled",
            remove_ads: "enabled",
            video: "enabled",
            custom_widget_frames: "enabled",
            streak_recovery: "enabled"
        })),
        upsell_features: JSON.stringify(Object.assign({}, vinhdatReadConfigObject(obj.entries.upsell_features), {
            app_icon_picker: true,
            camera_roll: true,
            camera_theme: true,
            locket_views: true,
            remove_ads: true,
            custom_widget_frames: true
        })),
        paywall_presentation_config: JSON.stringify({
            uid: "paywall_testflight",
            onboarding: false,
            after_sent_moment: false,
            on_foreground: false,
            interval: 2592000,
            profile_banner: true
        }),
        feature_discovery_popup_config: JSON.stringify({
            tag: "LOCKET GOLD VINHDAT",
            tag_gradient: true,
            tag_style: "gold_gradient",
            title: "Đã Kích Hoạt 💛",
        feature_set: [
            {
                title: "Instagram: dtadvih ✨",
                body: "Mày nhìn cái chó gì? 👀 ",
                imageURL: "https://i.postimg.cc/8Cf9cRN9/Vinhdat.png"
            },
            {
                title: "Lên LocketGold rồi đó 😎",
                body: "Chúc Bạn Có Những Trải Nghiệm Thật Tuyệt Vời Cùng Locket Gold Nhé 💛",
                imageURL: "https://i.postimg.cc/8Cf9cRN9/Vinhdat.png"
            }
        ],
            primary_button_title: "Xong",
            campaign: "locket_gold_welcome_v3",
            start_at: "2020-01-01T00:00:00",
            end_at: "2099-12-31T23:59:59",
            use_local_time_zone: true
        }),
        android_subscribe_gold_button_enabled: "false",
        profile_badge_visible: "true",
        lunar_new_year_app_icon_enabled: "true",
        settings_instagram_url: "https://www.instagram.com/dtadvih/",
        settings_tiktok_url: "https://www.tiktok.com/@iamvdat"
    });

    // ============================================================
    // 2. CHẶN QUẢNG CÁO & TẮT TRACKING (SENTRY)
    // ============================================================
    Object.assign(obj.entries, {
        history_ads_mode: "off",
        history_ads_prefetch_count: "0",
        history_ads_prefetch_immediate: "false",
        history_ads_prefetch_reroute: "false",
        history_ads_dynamic_insertion: "false",
        history_ads_refresh_prefetch_on_foreground: "false",
        history_ads_floor_price: "0",
        history_ads_floor_price_att: "0",
        history_ad_log_displayed_on_background: "false",
        history_ads_debug_menu: "false",
        sentry_sample_rate: "0",
        sentry_network_tracing: "false",
        sentry_performance_tracking: "false",
        sentry_trace_sample_rate: "0",
        sentry_profiles_sample_rate: "0"
    });

    // ============================================================
    // 3. CAMERA, VIDEO (45S / 0.6MBPS) & DUNG LƯỢNG TẢI (100MB)
    // ============================================================
    var MY_VIDEO_DURATION = 45.0;
    var durationStr = MY_VIDEO_DURATION.toString();
    var MAX_SIZE_BYTES = 104857600; // 100MB

    var cameraConfig = {
        gold_max_duration: MY_VIDEO_DURATION,
        goldMaxDuration: MY_VIDEO_DURATION,
        max_duration: MY_VIDEO_DURATION,
        maxDuration: MY_VIDEO_DURATION,
        ultra_wide: true,
        ultraWide: true,
        volume_button: true,
        volumeButton: true,
        flash_button: true,
        telephoto: true,
        srgb: true,
        lanczos: true,
        quality_mbps: 0.6,
        qualityMbps: 0.6
    };

    var cameraRollConfig = {
        gold_max_duration: MY_VIDEO_DURATION,
        goldMaxDuration: MY_VIDEO_DURATION,
        video_max_duration: MY_VIDEO_DURATION,
        videoMaxDuration: MY_VIDEO_DURATION,
        max_duration: MY_VIDEO_DURATION,
        maxDuration: MY_VIDEO_DURATION,
        trim_max_duration: MY_VIDEO_DURATION,
        trimMaxDuration: MY_VIDEO_DURATION,
        camera_roll_max_duration: MY_VIDEO_DURATION,
        camera_roll_video_max_duration: MY_VIDEO_DURATION,
        max_file_size: MAX_SIZE_BYTES,
        max_upload_bytes: MAX_SIZE_BYTES,
        max_size_bytes: MAX_SIZE_BYTES,
        quality_mbps: 0.6,
        qualityMbps: 0.6,
        flash_button: true
    };

    obj.entries.camera = JSON.stringify(Object.assign(
        {}, vinhdatReadConfigObject(obj.entries.camera), cameraConfig
    ));
    obj.entries.camera_roll = JSON.stringify(Object.assign(
        {}, vinhdatReadConfigObject(obj.entries.camera_roll), cameraRollConfig
    ));

    Object.assign(obj.entries, {
        live_photos: JSON.stringify({
            capture: true,
            viewing: true,
            catch_up: true,
            widget_looping_mode: "never"
        }),
        camera_filter_config: JSON.stringify({
            allows_custom_filters: true,
            show_filter_button: true,
            sheet_enabled: true,
            open_sheet_immediately: true,
            sheet_filters: [
                { title: { en: "Goofy" }, filter_ids: ["okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows"] },
                { title: { en: "Looks" }, filter_ids: ["bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "bye_brows"] },
                { title: { en: "Celebrate" }, filter_ids: ["slimed", "princess", "disco_lights", "cash_money", "happy_birthday"] },
                { title: { en: "Cute" }, filter_ids: ["cutesy", "sticker_face", "flower_crown", "love_bug"] },
                { title: { en: "Costumes" }, filter_ids: ["wedding", "cowboy_cowgirl", "giraffe", "clown"] },
                { title: { en: "Holidays" }, filter_ids: ["easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"] }
            ],
            picker_filters: [
                "okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows",
                "bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns",
                "tatted", "mohawk", "braces", "slimed", "princess",
                "disco_lights", "cash_money", "happy_birthday", "cutesy", "sticker_face",
                "flower_crown", "love_bug", "wedding", "cowboy_cowgirl", "giraffe",
                "clown", "easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun",
                "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"
            ]
        }),
        camera_roll_preview_enabled: "true",
        camera_roll_video_enabled: "true",
        camera_roll_video_upload_enabled: "true",
        internal_camera_roll_video_upload_enabled: "true",
        longer_camera_roll_videos_enabled: "true",
        camera_roll_video_max_duration: durationStr,
        camera_roll_max_duration: durationStr,
        camera_roll_duration: durationStr,
        max_video_duration: durationStr,
        video_max_duration: durationStr,
        video_trim_max_duration: durationStr,
        trim_max_duration: durationStr,
        gold_max_duration: durationStr,
        goldMaxDuration: durationStr,
        max_file_size: MAX_SIZE_BYTES.toString(),
        max_upload_bytes: MAX_SIZE_BYTES.toString(),
        video_quality_mbps: "0.6",
        video_sound_enabled: "true",
        microphone_enabled: "true",
        camera_microphone_enabled: "true",
        audio_session_deactivation_enabled: "true",
        zoom_enabled: "true",
        upload_main: "false",
        upload_main_image_quality: "1.0",
        upload_main_image_size: "1440",
        upload_thumbnail_image_quality: "1.0",
        upload_thumbnail_image_size: "1020"
    });

    // ============================================================
    // 4. BẠN BÈ, GIỚI HẠN & ĐỀ XUẤT KẾT BẠN
    // ============================================================
    Object.assign(obj.entries, {
        max_friends_count: "999999",
        friend_limit_mode: "0",
        soft_friend_limit_threshold_count: "999999",
        show_friend_limit_on_cam: "false",
        signup_max_friends_count: "999999",
        celebrity_inbox_limit: "999999",
        friend_limit_geo_override: JSON.stringify({ experiments: {}, area_code_overrides: {} }),
        friends_sheet_locket_count_config: JSON.stringify({
            items: [
                { threshold: 0, icon_name: "heart" },
                { threshold: 1, icon_name: "heart.fill" },
                { threshold: 10, emoji: "🤍" },
                { threshold: 100, emoji: "💛" },
                { threshold: 500, emoji: "❤️‍🔥" },
                { threshold: 1000, emoji: "🌟🫶🌟" },
                { threshold: 2000, emoji: "✨💟✨" },
                { threshold: 5000, emoji: "⚡️😵‍💫⚡" },
                { threshold: 10000, emoji: "✨⚡️😱⚡✨" }
            ]
        }),
        friend_locket_count_config: JSON.stringify({
            items: [
                { threshold: 0, icon_name: "heart" },
                { threshold: 1, icon_name: "heart.fill" },
                { threshold: 10, emoji: "🤍" },
                { threshold: 100, emoji: "💛" },
                { threshold: 500, emoji: "❤️‍🔥" },
                { threshold: 1000, emoji: "✨💗✨" },
                { threshold: 2000, emoji: "✨️⭐️✨" },
                { threshold: 5000, emoji: "✨💎✨" },
                { threshold: 10000, emoji: "✨🔐💛✨" }
            ]
        }),
        new_friends_monitoring_enabled: "true",
        improved_friend_suggestions: "true",
        show_friend_suggestions_by_default: "true",
        emoji_friend_suggestions: "true",
        prompt_contact_permissions_on_search: "true",
        populate_phone_numbers_from_suggest_friends: "true",
        hide_friends_enabled: "true",
        hide_invite_links: "false",
        hide_skip_contacts: "true",
        show_all_contacts: "true",
        show_invite_suggestions: "true",
        show_no_friends_bottom_sheet: "false",
        signup_allow_skip_add_friends: "true"
    });

    // ============================================================
    // 5. MOMENTS, STREAK, CHAT & TƯƠNG TÁC
    // ============================================================
    try {
        var streak = JSON.parse(obj.entries.streak_config || "{}");
        streak.minimum_recovery_count = 0;
        streak.minimum_display_count = 0;
        obj.entries.streak_config = JSON.stringify(streak);
    } catch (e) {}

    Object.assign(obj.entries, {
        moment_views_enabled: "true",
        moment_views_v2: "true",
        record_moment_views: "true",
        notify_moment_views: "true",
        get_moment_views_as_cloud_function: "true",
        moment_reactions_v2: "true",
        chat_reactions_enabled: "true",
        conversation_reactions: "true",
        typing_indicators_enabled: "true",
        unsend_message_enabled: "true",
        reply_prototype_enabled: "true",
        messages_integration: "true",
        conversations_enabled: "true",
        fetch_moments_in_conversation: "true",
        hide_chat_button: "false",
        groups_enabled: "true",
        send_to_self_only_mode: "always_enabled",
        time_travel_rewind_v2_enabled: "true",
        calendar_delete_moment_enabled: "true",
        calendar_rewind_enabled: "false",
        locket_yearbook_story_sharing_encouraged: "true",
        rollcall_enabled: "true",
        rollcall_comment_actions: "true",
        rollcall_profile_button: "true",
        rollcall_prompt_export_after_share: "true",
        rollcall_confirm_skip_tagging: "false",
        rollcall_tap_to_tag_enabled: "false"
    });

    // ============================================================
    // 6. WIDGET SỰ KIỆN MỚI & KHUNG HOÀNG GIA (ROYAL GOLD)
    // ============================================================
    Object.assign(obj.entries, {
        widget_frame_event_max_images: "10",
        android_widget_frame_event_enabled: "true",
        widget_badge_enabled: "true",
        widget_badge_v2: "true",
        widget_stale_state_enabled: "false",
        widget_last_sent_indicator: "false",
        widget_sync_token_reload_mode: "clearTokenNever",

        // Link sự kiện mới theo yêu cầu
        widget_frame_event: JSON.stringify({
            uid: "midautumn_2026",
            url: "https://i.ibb.co/zV41vyJ2/t-i-xu-ng-1.png",
            use_local_time_zone: true,
            placement: "below",
            start_at: "2020-01-01T00:00:00",
            end_at: "2099-12-31T23:59:59"
        }),

        // Kích hoạt tính năng Custom Widget Frame trong Locket Gold
        custom_widget_frames: "enabled",
        custom_widget_frames_enabled: "true",

        // Cấu hình kho khung tĩnh VIP Gold tùy chỉnh (Khung hoàng gia)
        widget_frames_config: JSON.stringify({
            enabled: true,
            allow_custom_frames: true,
            unlock_all_styles: true,
            default_style: "royal_gold_vip",
            styles: [
                {
                    id: "royal_gold_vip",
                    name: "👑 VIP Royal Gold",
                    border_style: "ornate_gold",
                    crown_badge: true,
                    badge_text: "VIP",
                    corner_radius: 28.0,
                    glow_effect: true,
                    glow_color: "#FFD700",
                    overlay_asset: "royal_crown_frame"
                }
            ]
        }),

        // Danh sách ID khung đè vào menu chọn widget
        widget_frame_styles: JSON.stringify([
            "royal_gold_vip",
            "gold_luxury",
            "classic"
        ]),

        // Cấu hình sự kiện / Seasonal Frames
        seasonal_frames_config: JSON.stringify({
            enabled: true,
            auto_rotate: false,
            override_default: true,
            current_season_theme: "royal_gold_vip"
        }),

        live_activity_onboarding: "true",
        live_activity_onboarding_variant: "friending",
        register_live_activity_push_to_start_token: "true",
        live_activity_remove_stale_start_token: "true",
        notification_preferences_live_activities: "true",
        notification_preferences: "true",
        notification_reply_body_visible: "true",
        prompt_notification_permissions_after_friending: "true",
        activity_bar_enabled: "true",
        journal_activity_bar_enabled: "true",
        // BẬT ĐỊA CHỈ (location: true) VÀ FOCUS NỘI DUNG ẢNH (focus_animation: true)
        journal_settings: JSON.stringify({
            debug_menu_enabled: false,
            focus_animation: true,           // Bật hiệu ứng phóng to / focus mượt mà khi bấm xem ảnh
            compact_header: true,
            friends_button: true,
            reverse_scroll_direction: false,
            streak_visualization: true,
            streak_visualization_style: "gradient",
            streak_header_minimum_count: 0,
            streak_visualization_minimum_count: 2,
            overlay_indicators: {
                location: true,              // Bật hiển thị vị trí / địa chỉ chụp trên ảnh
                music: true,
                static_content: true,
                weather: true
            }
        }),
        qr_code_config: JSON.stringify({ profile_enabled: true, scanning_enabled: true }),
        custom_profile_pics: "true",
        profile_menu_v2_enabled: "true"
    });

    // ============================================================
    // 7. HỆ THỐNG CDN, CACHE & STORAGE ĐẦY ĐỦ
    // ============================================================
    Object.assign(obj.entries, {
        cdn_domain_replacements: JSON.stringify({
            "firebasestorage.googleapis.com": "cdn.locketcamera.com"
        }),
        cdn_domain_replacements_video: "true",
        storage_bucket: "gs://locket-img",
        storage_bucket_video: "gs://locket-video",
        image_cache_max_age_sec: "157680000",
        image_cache_max_size: "400000000",
        history_cache_age_days: "1000",
        user_cache_max_age_sec: "691200",
        friends_cache_max_age_sec: "2592000",
        image_fetch_cache: "true",
        image_cache_use_shared: "true",
        use_doc_dir_for_image_cache: "true",
        efficient_history_cache_invalidation: "true",
        timestamp_based_history_fetches: "true",
        get_latest_moment_v2: "true",
        fetch_users_from_cloud_function: "true",
        refresh_interval: "60",
        firestore_refresh_v2: "true",
        firestore_refresh_v3: "true",
        keychain_access_retries: "true",
        blocked_users_cached_sync_enabled: "true",
        beta_features_enabled: "true",
        join_testflight_enabled: "true",
        safety_center: "true",
        help_center: "true",
        support_v2: "true",
        privacy_choices_setting: "true",
        request_att_permission: "true",
        invite_link_preview_variant: "4",
        share_history_config: JSON.stringify({ prompt_enabled: false, fetching_enabled: true }),
        share_history_prompt_enabled: "false",
        use_thumbnails_for_sharing: "true",
        use_thumbnails_in_timeline: "true",
        persist_onboarding_step: "true",
        onboarding_contact_permission_step: "true"
    });

    // ============================================================
    // 8. TẠM TẮT CAPTION ĐỂ TẬP TRUNG KIỂM TRA AI EFFECTS
    // Không chèn bất kỳ caption tùy chỉnh nào; giữ phần kiểm tra AI phía trên.
    // Lưu ý: thay đổi này không cấp thêm lượt AI trên máy chủ.
    // ============================================================
    Object.assign(obj.entries, {
        overlay_navigator_enabled: "true",
        overlays_v2_config: JSON.stringify({ suggestions_enabled: true }),
        captions_enabled: "false",
        music_caption_enabled: "false",
        music_caption_song_preview_enabled: "false",
        link_caption_link_enabled: "false",
        overlay_dynamic_captions: JSON.stringify([]),
        overlay_items: JSON.stringify([])
    });
}

$done({ body: JSON.stringify(obj) });
})();
