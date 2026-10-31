
// ============================================================
// Locket Remote Config Rewrite
// Endpoint: firebaseremoteconfig.googleapis.com
// Dùng cho: Loon / Quantumult X / Surge / Shadowrocket
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";
    obj.state = "UPDATE";
    obj.entries = obj.entries || {};

    // ============================================================
    // 1. CẤU HÌNH GOLD, FEATURE GATES & PAYWALL 
    // ============================================================
    Object.assign(obj.entries, {
        feature_gates: JSON.stringify({
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
        }),
        upsell_features: JSON.stringify({
            app_icon_picker: true,
            camera_roll: true,
            camera_theme: true,
            locket_views: true,
            remove_ads: true,
            custom_widget_frames: true
        }),
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

    obj.entries.camera = JSON.stringify(cameraConfig);
    obj.entries.camera_roll = JSON.stringify(cameraRollConfig);

    // AI Effects: ưu tiên cấu hình gốc từ Locket. Danh sách hiện có chỉ là dự phòng.
    // Remote Config chỉ thiết lập giao diện; máy chủ vẫn quyết định quyền tạo ảnh AI.
    var aiFallbackFilterConfig = {
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
    };
    var aiEffectiveFilterConfig = aiFallbackFilterConfig;
    try {
        var aiOriginalRemoteConfig = obj.entries.camera_filter_config;
        if (typeof aiOriginalRemoteConfig === "string") {
            aiOriginalRemoteConfig = JSON.parse(aiOriginalRemoteConfig);
        }
        if (aiOriginalRemoteConfig && typeof aiOriginalRemoteConfig === "object" &&
            !Array.isArray(aiOriginalRemoteConfig) && Object.keys(aiOriginalRemoteConfig).length > 0) {
            // Giữ các trường gốc, đặc biệt ID hiệu ứng và thuộc tính mà app thực sự nhận diện.
            // Chỉ sử dụng fallback cho các trường không có trong cấu hình gốc.
            aiEffectiveFilterConfig = Object.assign({}, aiFallbackFilterConfig, aiOriginalRemoteConfig);
        }
    } catch (aiConfigError) {
        // Không để Remote Config lỗi làm gián đoạn camera hay 218 caption.
        aiEffectiveFilterConfig = aiFallbackFilterConfig;
    }

    Object.assign(obj.entries, {
        live_photos: JSON.stringify({
            capture: true,
            viewing: true,
            catch_up: true,
            widget_looping_mode: "never"
        }),
        camera_filter_config: JSON.stringify(aiEffectiveFilterConfig),
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
    // 8. OVERLAY & TOÀN BỘ CAPTION GỐC (36 TIKTOK + TIẾNG HÀN)
    // ============================================================
    Object.assign(obj.entries, {
        overlay_navigator_enabled: "true",
        overlays_v2_config: JSON.stringify({ suggestions_enabled: true }),
        captions_enabled: "true",
        music_caption_enabled: "true",
        music_caption_song_preview_enabled: "true",
        link_caption_link_enabled: "true",
        overlay_dynamic_captions: JSON.stringify([
            "standard", "poll", "color_palette", "review", "music", "location",
            "weather", "time", "streak", "star_sign", "party_time", "locket_count",
            "good_morning", "goodnight", "ootd", "miss_you", "custom", "phunu_2010", "halloween_2026"
        ]),
        overlay_items: JSON.stringify(
[
    {
        "section": "🎨 Tình yêu & Cơm chó 💕",
        "items": [
            {
                "overlay_id": "caption:em_nho_anhh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FFF1F2",
                            "#FCE6F3",
                            "#FBCFE9",
                            "#F5D0FE",
                            "#E9D5FF",
                            "#DCD6FE",
                            "#C8D3FE",
                            "#DBEAFE",
                            "#DFF2FE",
                            "#CFFAFE",
                            "#CCFBF1",
                            "#D2FAE4",
                            "#EDFCCB",
                            "#FEF3C7",
                            "#FFEDD6",
                            "#FFE4E6"
                        ]
                    },
                    "icon": {
                        "data": "🥺",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "em nhớ anhh",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nho_anh_phien",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F9A8D5",
                            "#EFABFC",
                            "#D7B4FE",
                            "#C3B5FD",
                            "#A4B5FC",
                            "#92C5FD",
                            "#7CD4FC",
                            "#67E8F8",
                            "#5FEAD3",
                            "#70E7B8",
                            "#A8F3CC",
                            "#C0F265",
                            "#FDE489",
                            "#FDB976",
                            "#FCA6B2",
                            "#EAD3FD"
                        ]
                    },
                    "icon": {
                        "data": "🥺",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "nhớ anh tới mức hơi phiền",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:i_love_you",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#022D23",
                            "#064F3B",
                            "#066047",
                            "#047958",
                            "#05976A",
                            "#11BA82",
                            "#34D39A",
                            "#2CD3BE",
                            "#14B7A6",
                            "#0891B3",
                            "#0383C8",
                            "#2662EB",
                            "#5047E5",
                            "#6464F1",
                            "#7E3DED",
                            "#A188F2"
                        ]
                    },
                    "icon": {
                        "data": "💗",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "i love you",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:yeu_cuc_dang",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#09091F",
                            "#14112F",
                            "#1E1B4B",
                            "#31205D",
                            "#3730A3",
                            "#4338CA",
                            "#4C1D95",
                            "#5B21B6",
                            "#6D28D9",
                            "#7C3AED",
                            "#9333EA",
                            "#A21CAF",
                            "#BE185D",
                            "#DB2777",
                            "#E879F9",
                            "#F0ABFC"
                        ]
                    },
                    "icon": {
                        "data": "🎀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "yêu cục dàng",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:yeu_emmm",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBCEE7",
                            "#F9A9D4",
                            "#FECAC9",
                            "#FED8AC",
                            "#FFEDD5",
                            "#FEF3C5",
                            "#FCE78B",
                            "#D8F99F",
                            "#BAF7D0",
                            "#A7F3D1",
                            "#9BF6E5",
                            "#CEF9FE",
                            "#BFDBFE",
                            "#C8D2FE",
                            "#DED6FE",
                            "#F5D0FD"
                        ]
                    },
                    "icon": {
                        "data": "💗",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Yeu Emmm",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:yeu_anhhh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF0070",
                            "#FF00AA",
                            "#FD00E6",
                            "#C600FF",
                            "#8A02FF",
                            "#792AFF",
                            "#3903FF",
                            "#005EFF",
                            "#00A5FF",
                            "#00DAFD",
                            "#00F5D1",
                            "#02FF83",
                            "#3DFF13",
                            "#B9FE00",
                            "#FFE100",
                            "#FF5B04"
                        ]
                    },
                    "icon": {
                        "data": "🫶",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Yeu Anhhh",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:baby_love",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#723E49",
                            "#854653",
                            "#97515E",
                            "#A75C6B",
                            "#B76F79",
                            "#C08082",
                            "#CB8C91",
                            "#D39B9C",
                            "#E0B1AE",
                            "#E7BDB5",
                            "#EDC8BE",
                            "#F1D1C5",
                            "#F5D9CE",
                            "#F9E4D9",
                            "#FCECE4",
                            "#F0CBC0"
                        ]
                    },
                    "icon": {
                        "data": "🧸",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Baby Love 💖",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cho_hun_mieng",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B5F3E0",
                            "#C1F7E9",
                            "#CFF5F1",
                            "#D8F6F3",
                            "#C8E6FF",
                            "#D6EAFF",
                            "#D6D4FF",
                            "#E2DAFF",
                            "#F0D5F8",
                            "#F5DAF4",
                            "#FADBE9",
                            "#FFE5EC",
                            "#FFF0CE",
                            "#F4F6D7",
                            "#E3F5DC",
                            "#D6F3E8"
                        ]
                    },
                    "icon": {
                        "data": "😘",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "cho hun miếng coi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:me_anh_me_ngu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FFF1F2",
                            "#FCE6F2",
                            "#FBCFE9",
                            "#F4D0FE",
                            "#E8D5FF",
                            "#DCD6FE",
                            "#C8D3FE",
                            "#DBEAFE",
                            "#DFF2FE",
                            "#CFFAFD",
                            "#CCFBF0",
                            "#D2FAE4",
                            "#EDFCCB",
                            "#FEF3C8",
                            "#FFEDD6",
                            "#FFE5E7"
                        ]
                    },
                    "icon": {
                        "data": "💤",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "mê anh hơn mê ngủ",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:be_be_can_do",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F9A8D6",
                            "#EFABFC",
                            "#D7B4FE",
                            "#C3B5FD",
                            "#A4B5FC",
                            "#92C6FD",
                            "#7CD4FC",
                            "#67E8F7",
                            "#5FEAD3",
                            "#71E8B8",
                            "#A8F3CB",
                            "#C1F166",
                            "#FDE489",
                            "#FDB977",
                            "#FCA6B3",
                            "#EAD3FD"
                        ]
                    },
                    "icon": {
                        "data": "🎀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "em bé cần được dỗ",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:iu_thi_noi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#022E23",
                            "#064F3C",
                            "#066047",
                            "#047958",
                            "#06986A",
                            "#12BA82",
                            "#34D39B",
                            "#2CD3BE",
                            "#13B6A7",
                            "#0890B3",
                            "#0482C9",
                            "#2762EB",
                            "#5047E6",
                            "#6464F1",
                            "#7E3EEE",
                            "#9F87F0"
                        ]
                    },
                    "icon": {
                        "data": "🤭",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "iu thì nói, đừng có ngại",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:iu_hong_thi_bao",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#14112F",
                            "#1E1B4B",
                            "#31205D",
                            "#3730A3",
                            "#4338CA",
                            "#4C1D95",
                            "#5B21B6",
                            "#6D28D9",
                            "#7C3AED",
                            "#9333EA",
                            "#A21CAF",
                            "#BE185D",
                            "#DB2777",
                            "#E879F9",
                            "#F0ABFC",
                            "#09091F"
                        ]
                    },
                    "icon": {
                        "data": "🎀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "iu hong thì bảo",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:anh_thuong_em",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBCDE7",
                            "#F9AAD4",
                            "#FECBC9",
                            "#FED8AC",
                            "#FFEDD4",
                            "#FEF2C4",
                            "#FBE78B",
                            "#D8F99F",
                            "#BAF7D0",
                            "#A6F3D1",
                            "#9BF6E5",
                            "#CEF9FE",
                            "#BFDBFE",
                            "#C8D2FE",
                            "#DED6FE",
                            "#F5D0FD"
                        ]
                    },
                    "icon": {
                        "data": "🥹",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "anh có thương em thiệt hong",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:yeu_em_nhiem_vu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF0071",
                            "#FF00AB",
                            "#FC00E6",
                            "#C500FF",
                            "#8A02FF",
                            "#782AFF",
                            "#3804FF",
                            "#005EFF",
                            "#00A5FF",
                            "#00DAFD",
                            "#00F5D0",
                            "#03FF82",
                            "#3FFF13",
                            "#B9FE00",
                            "#FFE000",
                            "#FF5A05"
                        ]
                    },
                    "icon": {
                        "data": "🫡",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "yêu em là nhiệm vụ cả đời",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:crush_nhin",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#723E49",
                            "#854754",
                            "#97515F",
                            "#A75C6B",
                            "#B76F79",
                            "#C18182",
                            "#CB8C91",
                            "#D49B9C",
                            "#E0B2AE",
                            "#E7BEB5",
                            "#EDC8BE",
                            "#F1D1C5",
                            "#F5DACF",
                            "#F9E4DA",
                            "#FCECE3",
                            "#EFC9BE"
                        ]
                    },
                    "icon": {
                        "data": "🫠",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "crush nhìn em một cái là xong",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ngoai_le_cua_em",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B6F3E0",
                            "#C1F7E9",
                            "#CFF5F1",
                            "#D8F6F4",
                            "#C9E6FF",
                            "#D6EAFF",
                            "#D7D4FF",
                            "#E2DAFF",
                            "#F0D5F8",
                            "#F5DAF3",
                            "#FADBE9",
                            "#FFE6EC",
                            "#FFF0CE",
                            "#F4F6D7",
                            "#E2F5DD",
                            "#D5F3E8"
                        ]
                    },
                    "icon": {
                        "data": "🫶",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "anh là ngoại lệ của em",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:minh_cuoi_nhau",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FFF0F2",
                            "#FCE6F2",
                            "#FBCFE9",
                            "#F4D0FE",
                            "#E8D5FF",
                            "#DCD6FE",
                            "#C8D3FE",
                            "#DBEAFE",
                            "#DFF2FE",
                            "#CFFAFD",
                            "#CCFBF0",
                            "#D3FAE4",
                            "#EDFBCB",
                            "#FEF3C8",
                            "#FFECD6",
                            "#FFE5E7"
                        ]
                    },
                    "icon": {
                        "data": "💍",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "hông ấy mình cưới nhau đi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tuong_love_hoa_ra_lop",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F8A8D6",
                            "#EFACFC",
                            "#D7B4FE",
                            "#C2B5FD",
                            "#A4B5FC",
                            "#92C6FD",
                            "#7CD4FC",
                            "#66E8F7",
                            "#5FEAD2",
                            "#71E8B8",
                            "#A8F3CA",
                            "#C2F166",
                            "#FDE389",
                            "#FDB977",
                            "#FCA7B4",
                            "#EAD2FD"
                        ]
                    },
                    "icon": {
                        "data": "❤️‍🩹",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tưởng love hoá ra lốp",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "Shin & Hello Kitty 🎀",
        "items": [
            {
                "overlay_id": "caption:vinhdat_extra_1_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#022E23",
                            "#064F3C",
                            "#066047",
                            "#047A58",
                            "#06986A",
                            "#12BA82",
                            "#34D39B",
                            "#2CD2BE",
                            "#13B6A7",
                            "#0890B3",
                            "#0482C9",
                            "#2761EB",
                            "#5048E6",
                            "#6463F1",
                            "#7E3FEE",
                            "#9E86EE"
                        ]
                    },
                    "icon": {
                        "data": "🎀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Hello Kitty đáng iu",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1E1B4B",
                            "#31205D",
                            "#3730A3",
                            "#4338CA",
                            "#4C1D95",
                            "#5B21B6",
                            "#6D28D9",
                            "#7C3AED",
                            "#9333EA",
                            "#A21CAF",
                            "#BE185D",
                            "#DB2777",
                            "#E879F9",
                            "#F0ABFC",
                            "#09091F",
                            "#14112F"
                        ]
                    },
                    "icon": {
                        "data": "🖍️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Shin Cậu Bé Bút Chì",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBCDE7",
                            "#F9AAD3",
                            "#FECBC8",
                            "#FED8AC",
                            "#FFEDD4",
                            "#FEF2C4",
                            "#FBE78B",
                            "#D7F9A0",
                            "#BAF7D0",
                            "#A6F3D1",
                            "#9CF6E5",
                            "#CEF8FE",
                            "#BFDAFE",
                            "#C8D2FE",
                            "#DED6FE",
                            "#F5D0FD"
                        ]
                    },
                    "icon": {
                        "data": "🍫",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Bánh Chocobi số zách",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF0071",
                            "#FF00AB",
                            "#FC00E6",
                            "#C500FF",
                            "#8A03FF",
                            "#7729FF",
                            "#3805FF",
                            "#005FFF",
                            "#00A6FF",
                            "#00DBFD",
                            "#00F6D0",
                            "#03FF80",
                            "#40FF13",
                            "#BAFE00",
                            "#FFDE00",
                            "#FF5906"
                        ]
                    },
                    "icon": {
                        "data": "🦸",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Siêu Nhân Hành Động",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#723E4A",
                            "#854754",
                            "#97525F",
                            "#A75C6B",
                            "#B86F79",
                            "#C18182",
                            "#CB8C92",
                            "#D49B9C",
                            "#E0B2AE",
                            "#E7BEB6",
                            "#EDC9BE",
                            "#F1D1C6",
                            "#F5DACF",
                            "#F9E5DA",
                            "#FCEBE3",
                            "#EDC8BD"
                        ]
                    },
                    "icon": {
                        "data": "🍑",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Anh Hùng Mông Căng",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_6",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B6F3E1",
                            "#C1F7E9",
                            "#D0F5F1",
                            "#D8F6F4",
                            "#C9E6FF",
                            "#D6EAFF",
                            "#D7D4FF",
                            "#E2DAFF",
                            "#F0D5F8",
                            "#F5DAF3",
                            "#FADCE9",
                            "#FFE6EB",
                            "#FEF0CF",
                            "#F4F6D7",
                            "#E2F5DD",
                            "#D5F3E8"
                        ]
                    },
                    "icon": {
                        "data": "☁️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cinnamoroll tai dài",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_7",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FFF0F2",
                            "#FCE5F2",
                            "#FBCFE9",
                            "#F4D0FE",
                            "#E8D5FF",
                            "#DCD6FE",
                            "#C8D4FE",
                            "#DBEBFE",
                            "#DFF3FE",
                            "#CFFAFD",
                            "#CCFBF0",
                            "#D3FAE3",
                            "#EDFBCB",
                            "#FEF3C8",
                            "#FFECD6",
                            "#FFE5E7"
                        ]
                    },
                    "icon": {
                        "data": "🖤",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Kuromi siêu ngầu",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_8",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F8A8D7",
                            "#EEACFC",
                            "#D7B4FE",
                            "#C2B5FD",
                            "#A4B5FC",
                            "#92C6FD",
                            "#7CD4FC",
                            "#66E8F6",
                            "#5FEAD2",
                            "#72E8B9",
                            "#A9F3C9",
                            "#C2F167",
                            "#FDE389",
                            "#FDB978",
                            "#FCA7B4",
                            "#EAD2FC"
                        ]
                    },
                    "icon": {
                        "data": "🍓",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "My Melody ngọt ngào",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_9",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#022E24",
                            "#064F3C",
                            "#066147",
                            "#047A58",
                            "#06986B",
                            "#12BB83",
                            "#34D39C",
                            "#2BD2BD",
                            "#13B5A7",
                            "#0890B3",
                            "#0482C9",
                            "#2861EB",
                            "#5048E6",
                            "#6563F1",
                            "#7F40EE",
                            "#9C85EB"
                        ]
                    },
                    "icon": {
                        "data": "🐸",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Keroppi nhí nhảnh",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_10",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#31205D",
                            "#3730A3",
                            "#4338CA",
                            "#4C1D95",
                            "#5B21B6",
                            "#6D28D9",
                            "#7C3AED",
                            "#9333EA",
                            "#A21CAF",
                            "#BE185D",
                            "#DB2777",
                            "#E879F9",
                            "#F0ABFC",
                            "#09091F",
                            "#14112F",
                            "#1E1B4B"
                        ]
                    },
                    "icon": {
                        "data": "🐕",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Bạch Tuyết ngoan ngoãn",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "Chứng nhận của Locket 🤍",
        "items": [
            {
                "overlay_id": "caption:vinhdat_extra_4_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBCCE7",
                            "#F9AAD3",
                            "#FECBC8",
                            "#FED8AD",
                            "#FFEDD4",
                            "#FEF2C3",
                            "#FBE78B",
                            "#D7F9A0",
                            "#BAF7D0",
                            "#A6F3D1",
                            "#9DF6E6",
                            "#CEF8FE",
                            "#C0DAFE",
                            "#C8D2FE",
                            "#DFD6FE",
                            "#F5D0FD"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Locket xác nhận bạn cutii",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF0072",
                            "#FF00AC",
                            "#FB00E7",
                            "#C400FF",
                            "#8A03FF",
                            "#7729FF",
                            "#3706FF",
                            "#0060FF",
                            "#00A7FF",
                            "#00DBFC",
                            "#00F6CF",
                            "#04FF7F",
                            "#42FF13",
                            "#BBFD00",
                            "#FFDD00",
                            "#FF5807"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Locket xác nhận bạn xjnh gái",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#723F4A",
                            "#854754",
                            "#97525F",
                            "#A75C6B",
                            "#B86F7A",
                            "#C18182",
                            "#CC8C92",
                            "#D49C9C",
                            "#E0B2AE",
                            "#E7BEB6",
                            "#EDC9BE",
                            "#F1D2C6",
                            "#F5DACF",
                            "#F9E5DA",
                            "#FCEBE3",
                            "#ECC6BC"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Locket xác nhận bạn đẹp choa",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B6F3E1",
                            "#C1F7EA",
                            "#D0F5F1",
                            "#D8F6F4",
                            "#C9E6FF",
                            "#D6E9FF",
                            "#D7D4FF",
                            "#E2DAFF",
                            "#F0D5F8",
                            "#F5DAF3",
                            "#FADCE9",
                            "#FFE6EB",
                            "#FEF0CF",
                            "#F4F6D7",
                            "#E2F5DD",
                            "#D5F3E7"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Locket xác nhận bạn đangiu vc",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FFF0F2",
                            "#FCE5F2",
                            "#FBCFEA",
                            "#F4D0FE",
                            "#E8D5FF",
                            "#DBD6FE",
                            "#C9D4FE",
                            "#DBEBFE",
                            "#DFF3FE",
                            "#CFFAFD",
                            "#CCFBF0",
                            "#D3FAE3",
                            "#EDFBCB",
                            "#FEF3C8",
                            "#FFECD6",
                            "#FFE5E7"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Đã xác minh bạn là gái đẹp",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_6",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F8A8D7",
                            "#EEACFC",
                            "#D6B4FE",
                            "#C2B5FD",
                            "#A4B5FC",
                            "#91C6FD",
                            "#7BD5FC",
                            "#66E8F6",
                            "#5FEAD2",
                            "#73E8B9",
                            "#A9F3C7",
                            "#C3F167",
                            "#FDE388",
                            "#FDB879",
                            "#FBA8B5",
                            "#EAD1FC"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Đã xác minh bạn là trai đẹp",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_7",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#022F24",
                            "#064F3C",
                            "#066147",
                            "#047A58",
                            "#06996B",
                            "#13BB83",
                            "#33D39C",
                            "#2BD2BD",
                            "#13B5A7",
                            "#0890B4",
                            "#0581CA",
                            "#2861EB",
                            "#5149E6",
                            "#6563F1",
                            "#7F40EE",
                            "#9A83E9"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Đã xác nhận bạn là bé ngoann",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_8",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#3730A3",
                            "#4338CA",
                            "#4C1D95",
                            "#5B21B6",
                            "#6D28D9",
                            "#7C3AED",
                            "#9333EA",
                            "#A21CAF",
                            "#BE185D",
                            "#DB2777",
                            "#E879F9",
                            "#F0ABFC",
                            "#09091F",
                            "#14112F",
                            "#1E1B4B",
                            "#31205D"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Locket tuyên dương bạn cute",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎨 General",
        "items": [
            {
                "overlay_id": "caption:standard",
                "source": "local",
                "caption": {
                    "type": "standard",
                    "background": {
                        "colors": [
                            "#FBCCE6",
                            "#F9ABD3",
                            "#FECBC7",
                            "#FED9AD",
                            "#FFEDD4",
                            "#FEF2C2",
                            "#FAE88C",
                            "#D7F9A1",
                            "#B9F7D0",
                            "#A6F3D2",
                            "#9DF6E6",
                            "#CEF8FE",
                            "#C0DAFE",
                            "#C9D2FE",
                            "#DFD6FE",
                            "#F5D0FC"
                        ]
                    },
                    "text_color": "#241A33"
                }
            },
            {
                "overlay_id": "caption:review",
                "source": "local",
                "caption": {
                    "type": "review",
                    "background": {
                        "colors": [
                            "#FF0073",
                            "#FF00AD",
                            "#FB00E7",
                            "#C300FF",
                            "#8A03FF",
                            "#7629FF",
                            "#3607FF",
                            "#0061FF",
                            "#00A7FF",
                            "#00DBFC",
                            "#00F6CE",
                            "#05FF7E",
                            "#43FF12",
                            "#BCFD00",
                            "#FFDB00",
                            "#FF5709"
                        ]
                    },
                    "text_color": "#241A33"
                }
            },
            {
                "overlay_id": "caption:music",
                "source": "local",
                "caption": {
                    "type": "music",
                    "background": {
                        "colors": [
                            "#733F4A",
                            "#854754",
                            "#97525F",
                            "#A75D6B",
                            "#B86F7A",
                            "#C18182",
                            "#CC8C92",
                            "#D49C9D",
                            "#E1B2AF",
                            "#E7BEB6",
                            "#EDC9BF",
                            "#F1D2C6",
                            "#F5DACF",
                            "#F9E5DA",
                            "#FBEBE2",
                            "#EBC4BA"
                        ]
                    },
                    "text_color": "#241A33"
                }
            },
            {
                "overlay_id": "caption:location",
                "source": "local",
                "caption": {
                    "type": "location",
                    "background": {
                        "colors": [
                            "#B6F3E1",
                            "#C1F7EA",
                            "#D0F5F1",
                            "#D8F6F4",
                            "#C9E6FF",
                            "#D6E9FF",
                            "#D7D4FF",
                            "#E2DAFE",
                            "#F0D5F8",
                            "#F5DAF3",
                            "#FADCE9",
                            "#FFE6EB",
                            "#FEF0CF",
                            "#F4F6D7",
                            "#E2F5DD",
                            "#D4F3E7"
                        ]
                    },
                    "text_color": "#241A33"
                }
            },
            {
                "overlay_id": "caption:weather",
                "source": "local",
                "caption": {
                    "type": "weather",
                    "background": {
                        "colors": [
                            "#FFF0F2",
                            "#FCE5F2",
                            "#FACFEA",
                            "#F4D0FE",
                            "#E8D5FF",
                            "#DBD6FE",
                            "#C9D4FE",
                            "#DBEBFE",
                            "#DEF3FE",
                            "#CFFAFD",
                            "#CCFBF0",
                            "#D3FAE3",
                            "#EEFBCB",
                            "#FEF2C8",
                            "#FFECD7",
                            "#FFE5E7"
                        ]
                    },
                    "text_color": "#241A33"
                }
            },
            {
                "overlay_id": "caption:time",
                "source": "local",
                "caption": {
                    "type": "time",
                    "background": {
                        "colors": [
                            "#F8A8D8",
                            "#EEACFC",
                            "#D6B4FE",
                            "#C1B5FD",
                            "#A3B6FC",
                            "#91C6FD",
                            "#7BD5FC",
                            "#66E8F6",
                            "#5FEAD1",
                            "#73E8B9",
                            "#A9F3C6",
                            "#C4F167",
                            "#FDE288",
                            "#FDB879",
                            "#FBA8B6",
                            "#EAD1FB"
                        ]
                    },
                    "text_color": "#241A33"
                }
            },
            {
                "overlay_id": "caption:streak",
                "source": "local",
                "caption": {
                    "type": "streak",
                    "background": {
                        "colors": [
                            "#022F24",
                            "#06503C",
                            "#066148",
                            "#047B59",
                            "#06996B",
                            "#13BB83",
                            "#33D39C",
                            "#2BD1BD",
                            "#13B4A7",
                            "#0790B4",
                            "#0581CA",
                            "#2960EA",
                            "#5149E6",
                            "#6562F1",
                            "#8041EE",
                            "#9882E7"
                        ]
                    },
                    "text_color": "#FFFDFE"
                }
            },
            {
                "overlay_id": "caption:star_sign",
                "source": "local",
                "caption": {
                    "type": "star_sign",
                    "background": {
                        "colors": [
                            "#4338CA",
                            "#4C1D95",
                            "#5B21B6",
                            "#6D28D9",
                            "#7C3AED",
                            "#9333EA",
                            "#A21CAF",
                            "#BE185D",
                            "#DB2777",
                            "#E879F9",
                            "#F0ABFC",
                            "#09091F",
                            "#14112F",
                            "#1E1B4B",
                            "#31205D",
                            "#3730A3"
                        ]
                    },
                    "text_color": "#FFFDFE"
                }
            },
            {
                "overlay_id": "caption:poll",
                "source": "local",
                "caption": {
                    "type": "poll",
                    "background": {
                        "colors": [
                            "#FBCBE6",
                            "#F9ABD3",
                            "#FECBC7",
                            "#FED9AE",
                            "#FFEED4",
                            "#FEF2C2",
                            "#FAE88C",
                            "#D6F9A2",
                            "#B9F7D0",
                            "#A6F3D2",
                            "#9EF6E6",
                            "#CEF7FE",
                            "#C0DAFE",
                            "#C9D2FE",
                            "#DFD5FE",
                            "#F6D0FC"
                        ]
                    },
                    "text_color": "#241A33"
                }
            },
            {
                "overlay_id": "caption:color_palette",
                "source": "local",
                "caption": {
                    "type": "color_palette",
                    "background": {
                        "colors": [
                            "#FF0073",
                            "#FF00AD",
                            "#FA00E7",
                            "#C300FF",
                            "#8A04FF",
                            "#7528FF",
                            "#3608FF",
                            "#0061FF",
                            "#00A8FF",
                            "#00DCFB",
                            "#00F6CD",
                            "#05FF7D",
                            "#44FF12",
                            "#BDFD00",
                            "#FFDA00",
                            "#FF560A"
                        ]
                    },
                    "text_color": "#241A33"
                }
            },
            {
                "overlay_id": "caption:locket_count",
                "source": "local",
                "caption": {
                    "type": "locket_count",
                    "background": {
                        "colors": [
                            "#733F4A",
                            "#864754",
                            "#97525F",
                            "#A85D6B",
                            "#B8707A",
                            "#C18182",
                            "#CC8C92",
                            "#D49C9D",
                            "#E1B2AF",
                            "#E8BEB6",
                            "#EDC9BF",
                            "#F1D2C6",
                            "#F5DACF",
                            "#F9E5DA",
                            "#FBEAE2",
                            "#E9C3B9"
                        ]
                    },
                    "text_color": "#241A33"
                }
            }
        ]
    },
    {
        "section": "🎨 Holiday Caption",
        "items": [
            {
                "overlay_id": "caption:halloween_2026",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B6F3E1",
                            "#C1F7EA",
                            "#D0F5F1",
                            "#D7F5F4",
                            "#C9E6FF",
                            "#D6E9FF",
                            "#D7D5FF",
                            "#E2DAFE",
                            "#F0D5F8",
                            "#F5DAF3",
                            "#FADCE9",
                            "#FFE6EA",
                            "#FEF1CF",
                            "#F3F6D7",
                            "#E2F5DD",
                            "#D4F3E7"
                        ]
                    },
                    "icon": {
                        "data": "🎃",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Halloween",
                    "localized_text": {
                        "en": "Halloween",
                        "vn": "Halloween"
                    },
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:autumn_2026",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FFF0F2",
                            "#FCE5F2",
                            "#FACFEA",
                            "#F4D1FE",
                            "#E8D5FF",
                            "#DBD6FE",
                            "#C9D4FE",
                            "#DCEBFE",
                            "#DEF3FE",
                            "#CFFAFD",
                            "#CDFBF0",
                            "#D4FAE2",
                            "#EEFBCB",
                            "#FEF2C8",
                            "#FFECD7",
                            "#FFE5E7"
                        ]
                    },
                    "icon": {
                        "data": "🍂",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Xin chào Mùa Thu",
                    "localized_text": {
                        "en": "Xin chào Mùa Thu",
                        "vn": "Xin chào Mùa Thu"
                    },
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:christmas_eve_2026",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F8A8D8",
                            "#EEACFC",
                            "#D6B4FE",
                            "#C1B5FD",
                            "#A3B6FC",
                            "#91C6FD",
                            "#7BD5FC",
                            "#66E8F5",
                            "#60EAD1",
                            "#74E8BA",
                            "#A9F3C5",
                            "#C4F168",
                            "#FDE288",
                            "#FDB87A",
                            "#FBA9B7",
                            "#EBD0FB"
                        ]
                    },
                    "icon": {
                        "data": "🕯️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Giáng sinh an lành",
                    "localized_text": {
                        "en": "Giáng sinh an lành",
                        "vn": "Giáng sinh an lành"
                    },
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:new_years_eve_2026",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#022F25",
                            "#06503C",
                            "#066248",
                            "#047B59",
                            "#069A6B",
                            "#14BC83",
                            "#33D39D",
                            "#2AD1BC",
                            "#13B4A7",
                            "#0790B4",
                            "#0681CB",
                            "#2960EA",
                            "#5149E6",
                            "#6662F1",
                            "#8042EE",
                            "#9681E4"
                        ]
                    },
                    "icon": {
                        "data": "🥂",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Xin chào 2027!",
                    "localized_text": {
                        "en": "Xin chào 2027!",
                        "vn": "Xin chào 2027!"
                    },
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:new_years_day_2027_alternate",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#4C1D95",
                            "#5B21B6",
                            "#6D28D9",
                            "#7C3AED",
                            "#9333EA",
                            "#A21CAF",
                            "#BE185D",
                            "#DB2777",
                            "#E879F9",
                            "#F0ABFC",
                            "#09091F",
                            "#14112F",
                            "#1E1B4B",
                            "#31205D",
                            "#3730A3",
                            "#4338CA"
                        ]
                    },
                    "max_lines": 2,
                    "text": "2027",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎨 Decorative by Locket",
        "items": [
            {
                "overlay_id": "caption:toi_nho_em",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#621D4C",
                            "#78244C",
                            "#8D2A46"
                        ]
                    },
                    "max_lines": 1,
                    "text": "보고 싶어 🥺",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:party_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#C2E8A5",
                            "#C0ECB6",
                            "#C7F0CA"
                        ]
                    },
                    "icon": {
                        "data": "🪩",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Party Time!",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:good_morning",
                "source": "remote",
                "daily_start_hour": 5,
                "daily_end_hour": 10,
                "caption": {
                    "background": {
                        "colors": [
                            "#141759",
                            "#231970",
                            "#391F87"
                        ]
                    },
                    "icon": {
                        "data": "☀️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Good morning",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:goodnight",
                "source": "remote",
                "daily_start_hour": 19.5,
                "daily_end_hour": 24,
                "caption": {
                    "background": {
                        "colors": [
                            "#6B2615",
                            "#824319",
                            "#9A681E"
                        ]
                    },
                    "icon": {
                        "data": "🌙",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Goodnight",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ootd",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#A8E5C3",
                            "#B8EADB",
                            "#C9EFEC"
                        ]
                    },
                    "icon": {
                        "data": "🕶",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "OOTD",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:miss_you",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#4C1757",
                            "#6C1D6D",
                            "#832277"
                        ]
                    },
                    "icon": {
                        "data": "🥰",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Miss you",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎨 Độc lạ & Cá nhân",
        "items": [
            {
                "overlay_id": "caption:dth24_7",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBCBE6",
                            "#FAABD3",
                            "#FECBC7",
                            "#FED9AE",
                            "#FFEED4",
                            "#FEF2C1",
                            "#F9E88C",
                            "#D6F9A2",
                            "#B9F7D0",
                            "#A6F3D2",
                            "#9EF6E7",
                            "#CDF7FE",
                            "#C0DAFE",
                            "#C9D2FE",
                            "#DFD5FE",
                            "#F6D0FC"
                        ]
                    },
                    "max_lines": 2,
                    "text": "⚡ dth24/7",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:feeling_cute",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF0074",
                            "#FF00AE",
                            "#F900E8",
                            "#C200FF",
                            "#8904FF",
                            "#7528FF",
                            "#3509FF",
                            "#0062FF",
                            "#00A8FF",
                            "#00DCFB",
                            "#00F6CC",
                            "#06FF7B",
                            "#46FF12",
                            "#BDFC00",
                            "#FFD800",
                            "#FF550B"
                        ]
                    },
                    "icon": {
                        "data": "🌷",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Feeling Cute",
                    "localized_text": {
                        "en": "Feeling Cute",
                        "vn": "Cảm thấy dthw"
                    },
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#733F4A",
                            "#864754",
                            "#98525F",
                            "#A85D6C",
                            "#B8707A",
                            "#C18183",
                            "#CC8D92",
                            "#D49C9D",
                            "#E1B2AF",
                            "#E8BEB6",
                            "#EDC9BF",
                            "#F1D2C6",
                            "#F5DACF",
                            "#F9E5DA",
                            "#FBEAE2",
                            "#E8C1B8"
                        ]
                    },
                    "max_lines": 2,
                    "text": "Cu 🐎",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tuat",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B6F3E1",
                            "#C2F7EA",
                            "#D0F5F1",
                            "#D7F5F4",
                            "#C9E7FF",
                            "#D6E9FF",
                            "#D7D5FF",
                            "#E3D9FE",
                            "#F1D6F8",
                            "#F6DAF3",
                            "#FBDCE9",
                            "#FFE6EA",
                            "#FEF1CF",
                            "#F3F6D8",
                            "#E2F5DD",
                            "#D4F3E7"
                        ]
                    },
                    "icon": {
                        "data": "🐕",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tuất",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:wedding_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FFF0F2",
                            "#FCE4F2",
                            "#FACFEA",
                            "#F4D1FE",
                            "#E8D5FF",
                            "#DBD6FE",
                            "#C9D5FE",
                            "#DCEBFE",
                            "#DEF3FE",
                            "#CFFAFD",
                            "#CDFBF0",
                            "#D4FAE2",
                            "#EEFBCB",
                            "#FEF2C9",
                            "#FFECD7",
                            "#FFE5E7"
                        ]
                    },
                    "icon": {
                        "data": "💍",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Wedding Time!",
                    "localized_text": {
                        "en": "Wedding Time!",
                        "vn": "Đám cưới nè!"
                    },
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cam_thay_hanh_phuc",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F8A8D8",
                            "#EDACFC",
                            "#D6B4FE",
                            "#C1B5FD",
                            "#A3B6FC",
                            "#91C7FD",
                            "#7BD5FC",
                            "#66E8F5",
                            "#60EAD1",
                            "#74E8BA",
                            "#AAF3C4",
                            "#C5F168",
                            "#FDE188",
                            "#FDB87B",
                            "#FBA9B8",
                            "#EBD0FA"
                        ]
                    },
                    "icon": {
                        "data": "🇻🇳",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cảm thấy hạnh phúc",
                    "localized_text": {
                        "en": "Feeling Happy",
                        "vn": "Cảm thấy hạnh phúc"
                    },
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:coffee_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#023025",
                            "#06503C",
                            "#066248",
                            "#047B59",
                            "#069A6C",
                            "#14BC84",
                            "#33D39D",
                            "#2AD1BC",
                            "#13B4A7",
                            "#0790B4",
                            "#0680CB",
                            "#2A60EA",
                            "#514AE6",
                            "#6661F1",
                            "#8143EE",
                            "#9580E2"
                        ]
                    },
                    "icon": {
                        "data": "☕",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Coffee Time!",
                    "localized_text": {
                        "en": "Coffee Time!",
                        "vn": "Giờ uống cà phê!"
                    },
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:snake_vibes",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#5B21B6",
                            "#6D28D9",
                            "#7C3AED",
                            "#9333EA",
                            "#A21CAF",
                            "#BE185D",
                            "#DB2777",
                            "#E879F9",
                            "#F0ABFC",
                            "#09091F",
                            "#14112F",
                            "#1E1B4B",
                            "#31205D",
                            "#3730A3",
                            "#4338CA",
                            "#4C1D95"
                        ]
                    },
                    "icon": {
                        "data": "🐍",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Snake Vibes",
                    "localized_text": {
                        "en": "Snake Vibes",
                        "vn": "Chất rắn"
                    },
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:mixue_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBCBE6",
                            "#FAACD3",
                            "#FECBC6",
                            "#FED9AF",
                            "#FFEED3",
                            "#FEF2C0",
                            "#F9E88C",
                            "#D6F9A3",
                            "#B9F7D0",
                            "#A5F3D2",
                            "#9FF6E7",
                            "#CDF7FE",
                            "#C0DAFE",
                            "#C9D2FE",
                            "#E0D5FE",
                            "#F6D0FC"
                        ]
                    },
                    "icon": {
                        "data": "🍦",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Mixue Time!",
                    "localized_text": {
                        "en": "Mixue Time!",
                        "vn": "Giờ Mixue!"
                    },
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:locket_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF0074",
                            "#FF00AF",
                            "#F900E8",
                            "#C100FF",
                            "#8905FF",
                            "#7427FF",
                            "#340AFF",
                            "#0063FF",
                            "#00A9FF",
                            "#00DCFA",
                            "#00F6CB",
                            "#06FF7A",
                            "#47FF12",
                            "#BEFC00",
                            "#FFD700",
                            "#FF530C"
                        ]
                    },
                    "icon": {
                        "data": "📷",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Locket Time!",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cinema_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#733F4A",
                            "#864754",
                            "#98525F",
                            "#A85D6C",
                            "#B8707A",
                            "#C18183",
                            "#CC8D92",
                            "#D49D9D",
                            "#E1B2AF",
                            "#E8BEB6",
                            "#EDC9BF",
                            "#F1D2C6",
                            "#F5DACF",
                            "#F9E5DA",
                            "#FBEAE1",
                            "#E6C0B6"
                        ]
                    },
                    "icon": {
                        "data": "🎬",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cinema Time!",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:dating_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B6F3E1",
                            "#C2F7EA",
                            "#D0F5F1",
                            "#D7F5F4",
                            "#CAE7FF",
                            "#D6E8FF",
                            "#D7D5FF",
                            "#E3D9FE",
                            "#F1D6F8",
                            "#F6DAF3",
                            "#FBDCE9",
                            "#FFE6EA",
                            "#FEF1CF",
                            "#F3F6D8",
                            "#E2F5DD",
                            "#D3F3E7"
                        ]
                    },
                    "icon": {
                        "data": "💕",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Dating Time!",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:graduation_day",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FFF0F2",
                            "#FCE4F2",
                            "#FACFEB",
                            "#F4D1FE",
                            "#E8D5FF",
                            "#DAD6FE",
                            "#C9D5FE",
                            "#DCEBFE",
                            "#DEF3FE",
                            "#CFFAFC",
                            "#CDFBF0",
                            "#D4FAE2",
                            "#EEFBCB",
                            "#FEF2C9",
                            "#FFECD7",
                            "#FFE6E7"
                        ]
                    },
                    "icon": {
                        "data": "🎓",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Happy Graduation Day!",
                    "localized_text": {
                        "en": "Happy Graduation Day!",
                        "vn": "Chúc mừng tốt nghiệp!"
                    },
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:shopping_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F8A8D9",
                            "#EDACFC",
                            "#D6B4FE",
                            "#C0B5FD",
                            "#A3B6FC",
                            "#90C7FD",
                            "#7AD6FC",
                            "#66E8F4",
                            "#60EAD0",
                            "#75E8BA",
                            "#AAF3C3",
                            "#C6F169",
                            "#FDE187",
                            "#FDB77B",
                            "#FBAAB9",
                            "#EBCFFA"
                        ]
                    },
                    "icon": {
                        "data": "🛍️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Shopping Time!",
                    "localized_text": {
                        "en": "Shopping Time!",
                        "vn": "Giờ mua sắm!"
                    },
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:dinner_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#023025",
                            "#06503C",
                            "#066248",
                            "#047C59",
                            "#069A6C",
                            "#14BC84",
                            "#33D39E",
                            "#2AD1BC",
                            "#13B3A7",
                            "#078FB5",
                            "#0680CB",
                            "#2A5FEA",
                            "#514AE6",
                            "#6661F1",
                            "#8144EF",
                            "#937FDF"
                        ]
                    },
                    "icon": {
                        "data": "🍽️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Dinner Time!",
                    "localized_text": {
                        "en": "Dinner Time!",
                        "vn": "Giờ ăn tối!"
                    },
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:chilling_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#6D28D9",
                            "#7C3AED",
                            "#9333EA",
                            "#A21CAF",
                            "#BE185D",
                            "#DB2777",
                            "#E879F9",
                            "#F0ABFC",
                            "#09091F",
                            "#14112F",
                            "#1E1B4B",
                            "#31205D",
                            "#3730A3",
                            "#4338CA",
                            "#4C1D95",
                            "#5B21B6"
                        ]
                    },
                    "icon": {
                        "data": "🌴",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Chilling Time!",
                    "localized_text": {
                        "en": "Chilling Time!",
                        "vn": "Giờ thư giãn!"
                    },
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎨 Độc lạ đời sống",
        "items": [
            {
                "overlay_id": "caption:xin_vinh_biet_cu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBCAE6",
                            "#FAACD3",
                            "#FECCC6",
                            "#FEDAAF",
                            "#FFEED3",
                            "#FEF1BF",
                            "#F9E88C",
                            "#D5F9A3",
                            "#B9F7D0",
                            "#A5F3D2",
                            "#A0F6E7",
                            "#CDF6FE",
                            "#C0DAFE",
                            "#CAD2FE",
                            "#E0D5FE",
                            "#F6D0FB"
                        ]
                    },
                    "icon": {
                        "data": "🕯️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Xin vĩnh biệt cụ",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:chay_ngay_di",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF0075",
                            "#FF00B0",
                            "#F800E8",
                            "#C000FF",
                            "#8905FF",
                            "#7327FF",
                            "#340BFF",
                            "#0064FF",
                            "#00AAFF",
                            "#00DCFA",
                            "#00F6CB",
                            "#07FF79",
                            "#48FF12",
                            "#BFFC00",
                            "#FFD500",
                            "#FF520E"
                        ]
                    },
                    "icon": {
                        "data": "🏃💨",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Chạy ngay đi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:luc_nao_co_tien_thi_moi_di_a",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#733F4A",
                            "#864754",
                            "#98525F",
                            "#A85D6C",
                            "#B8707A",
                            "#C18183",
                            "#CC8D92",
                            "#D59D9D",
                            "#E1B2AF",
                            "#E8BEB6",
                            "#EDC9BF",
                            "#F1D2C6",
                            "#F5DACF",
                            "#F9E5DA",
                            "#FBE9E1",
                            "#E5BEB5"
                        ]
                    },
                    "icon": {
                        "data": "💸",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Lúc nào có tiền thì mới đi á",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cu_tu_tu_khoai_se_nhu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B6F3E1",
                            "#C2F7EA",
                            "#D0F5F1",
                            "#D7F5F4",
                            "#CAE7FF",
                            "#D6E8FF",
                            "#D7D5FF",
                            "#E3D9FE",
                            "#F1D6F8",
                            "#F6DAF3",
                            "#FBDCE9",
                            "#FFE6E9",
                            "#FEF1CF",
                            "#F3F6D8",
                            "#E2F5DD",
                            "#D3F3E7"
                        ]
                    },
                    "icon": {
                        "data": "🥔",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cứ từ từ khoai sẽ nhừ",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:kiem_tra_nhan_pham",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FFF0F2",
                            "#FCE4F2",
                            "#FACFEB",
                            "#F3D1FE",
                            "#E7D5FF",
                            "#DAD5FE",
                            "#CAD5FE",
                            "#DCEBFE",
                            "#DEF3FE",
                            "#CFFAFC",
                            "#CDFBEF",
                            "#D5FAE2",
                            "#EEFBCA",
                            "#FEF2C9",
                            "#FFECD7",
                            "#FFE6E8"
                        ]
                    },
                    "icon": {
                        "data": "🎲",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Kiểm tra nhân phẩm",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:doc_so_tai_khoan",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F8A8D9",
                            "#EDACFC",
                            "#D5B4FE",
                            "#C0B5FD",
                            "#A3B6FC",
                            "#90C7FD",
                            "#7AD6FC",
                            "#66E8F4",
                            "#60EAD0",
                            "#76E9BA",
                            "#AAF3C2",
                            "#C6F069",
                            "#FDE087",
                            "#FDB77C",
                            "#FAABBA",
                            "#EBCFF9"
                        ]
                    },
                    "icon": {
                        "data": "💳",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Đọc số tài khoản đi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ai_so_thi_di_ve",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033125",
                            "#06503C",
                            "#066248",
                            "#047C59",
                            "#069B6C",
                            "#15BC84",
                            "#33D39E",
                            "#2AD0BC",
                            "#12B3A8",
                            "#078FB5",
                            "#0780CC",
                            "#2B5FEA",
                            "#524AE7",
                            "#6660F0",
                            "#8245EF",
                            "#917EDD"
                        ]
                    },
                    "icon": {
                        "data": "🏃",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "ai sợ thì đi về",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:con_cai_nit",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#7C3AED",
                            "#9333EA",
                            "#A21CAF",
                            "#BE185D",
                            "#DB2777",
                            "#E879F9",
                            "#F0ABFC",
                            "#09091F",
                            "#14112F",
                            "#1E1B4B",
                            "#31205D",
                            "#3730A3",
                            "#4338CA",
                            "#4C1D95",
                            "#5B21B6",
                            "#6D28D9"
                        ]
                    },
                    "icon": {
                        "data": "🧶",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "còn cái nịt",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:canh_bao_co_hat",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBCAE5",
                            "#FAADD3",
                            "#FECCC6",
                            "#FEDAB0",
                            "#FFEED3",
                            "#FEF1BF",
                            "#F8E98D",
                            "#D5F9A4",
                            "#B8F6D0",
                            "#A5F3D3",
                            "#A0F7E7",
                            "#CDF6FE",
                            "#C0DAFE",
                            "#CAD3FE",
                            "#E0D5FE",
                            "#F6D0FB"
                        ]
                    },
                    "icon": {
                        "data": "🎤",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "cảnh báo có hát",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:than_chua_ma_don",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF0076",
                            "#FF00B0",
                            "#F800E8",
                            "#C000FF",
                            "#8906FF",
                            "#7226FF",
                            "#330CFF",
                            "#0065FF",
                            "#00AAFF",
                            "#00DDF9",
                            "#00F6CA",
                            "#08FF78",
                            "#4AFF11",
                            "#C0FC00",
                            "#FFD400",
                            "#FF510F"
                        ]
                    },
                    "icon": {
                        "data": "😔",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Thân chưa mà dỡn",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ai_muon",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#743F4A",
                            "#864754",
                            "#985260",
                            "#A85E6C",
                            "#B8707A",
                            "#C18183",
                            "#CC8D92",
                            "#D59D9E",
                            "#E1B3AF",
                            "#E8BEB6",
                            "#EEC9BF",
                            "#F2D2C6",
                            "#F6DACF",
                            "#F9E5DB",
                            "#FBE9E1",
                            "#E3BCB4"
                        ]
                    },
                    "icon": {
                        "data": "🤔",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Ai mượn?",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:hay_ra_de_qua_a",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B6F4E1",
                            "#C2F7EA",
                            "#D0F5F1",
                            "#D7F5F5",
                            "#CAE7FF",
                            "#D6E8FF",
                            "#D7D5FF",
                            "#E3D9FE",
                            "#F1D6F7",
                            "#F6DAF3",
                            "#FBDCEA",
                            "#FFE6E9",
                            "#FEF1CF",
                            "#F3F6D8",
                            "#E1F5DE",
                            "#D2F3E7"
                        ]
                    },
                    "icon": {
                        "data": "🥺",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Hay ra dẻ quá à!",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:giam_suc_manh_con_tuong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FFF0F2",
                            "#FCE4F1",
                            "#FACFEB",
                            "#F3D1FE",
                            "#E7D5FF",
                            "#DAD5FE",
                            "#CAD5FE",
                            "#DCEBFE",
                            "#DEF3FE",
                            "#CFFAFC",
                            "#CDFBEF",
                            "#D5FAE1",
                            "#EFFBCA",
                            "#FEF2C9",
                            "#FFECD7",
                            "#FFE6E8"
                        ]
                    },
                    "icon": {
                        "data": "🎮",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Giảm sức mạnh con tướng",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:mac_co_qua_hai_oi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F8A8DA",
                            "#EDACFC",
                            "#D5B4FE",
                            "#C0B5FD",
                            "#A2B6FC",
                            "#90C7FD",
                            "#7AD6FC",
                            "#66E8F4",
                            "#60EAD0",
                            "#76E9BB",
                            "#AAF3C0",
                            "#C7F06A",
                            "#FDE087",
                            "#FDB77D",
                            "#FAABBB",
                            "#EBCEF9"
                        ]
                    },
                    "icon": {
                        "data": "😭",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Mắc cỡ quá hai ơi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:minh_la_lop",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033126",
                            "#06503D",
                            "#066348",
                            "#047C5A",
                            "#079B6C",
                            "#15BD84",
                            "#33D39F",
                            "#29D0BB",
                            "#12B2A8",
                            "#078FB5",
                            "#077FCC",
                            "#2B5FEA",
                            "#524BE7",
                            "#6760F0",
                            "#8246EF",
                            "#8F7DDB"
                        ]
                    },
                    "icon": {
                        "data": "🛞",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Mình là lốp",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:dep_trai_co_gi_sai",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#9333EA",
                            "#A21CAF",
                            "#BE185D",
                            "#DB2777",
                            "#E879F9",
                            "#F0ABFC",
                            "#09091F",
                            "#14112F",
                            "#1E1B4B",
                            "#31205D",
                            "#3730A3",
                            "#4338CA",
                            "#4C1D95",
                            "#5B21B6",
                            "#6D28D9",
                            "#7C3AED"
                        ]
                    },
                    "icon": {
                        "data": "😎",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Đẹp trai có gì sai",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:mong_ton_hoa_sen",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBC9E5",
                            "#FAADD3",
                            "#FECCC5",
                            "#FEDAB0",
                            "#FFEED3",
                            "#FEF1BE",
                            "#F8E98D",
                            "#D5F9A4",
                            "#B8F6D0",
                            "#A5F3D3",
                            "#A1F7E8",
                            "#CDF6FE",
                            "#C0DAFE",
                            "#CAD3FE",
                            "#E0D5FE",
                            "#F6D0FB"
                        ]
                    },
                    "icon": {
                        "data": "🪷",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Mong tôn hoa sen thấy cảnh này",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:dam_nhau_khong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF0076",
                            "#FF00B1",
                            "#F700E9",
                            "#BF00FF",
                            "#8906FF",
                            "#7226FF",
                            "#320DFF",
                            "#0065FF",
                            "#00ABFF",
                            "#00DDF9",
                            "#00F6C9",
                            "#08FF76",
                            "#4BFF11",
                            "#C1FB00",
                            "#FFD200",
                            "#FF5010"
                        ]
                    },
                    "icon": {
                        "data": "🥊",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "đấm nhau không",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:sieu_cap_ba_khi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#743F4A",
                            "#874855",
                            "#985260",
                            "#A85E6C",
                            "#B8717A",
                            "#C28283",
                            "#CC8D92",
                            "#D59D9E",
                            "#E1B3AF",
                            "#E8BFB6",
                            "#EEC9BF",
                            "#F2D2C6",
                            "#F6DBD0",
                            "#F9E5DB",
                            "#FBE9E0",
                            "#E2BBB2"
                        ]
                    },
                    "icon": {
                        "data": "🐉",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "siêu cấp bá khí",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:du_an_ma",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B7F4E1",
                            "#C2F7EA",
                            "#D0F5F1",
                            "#D7F5F5",
                            "#CAE7FF",
                            "#D6E8FF",
                            "#D8D5FF",
                            "#E3D9FE",
                            "#F1D6F7",
                            "#F6DAF2",
                            "#FBDCEA",
                            "#FFE7E9",
                            "#FEF1CF",
                            "#F2F6D8",
                            "#E1F5DE",
                            "#D2F3E7"
                        ]
                    },
                    "icon": {
                        "data": "👻",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "dự án ma",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:doi_roi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FFEFF2",
                            "#FCE3F1",
                            "#FACFEB",
                            "#F3D1FE",
                            "#E7D5FF",
                            "#DAD5FE",
                            "#CAD6FE",
                            "#DCEBFE",
                            "#DDF3FE",
                            "#CFFAFC",
                            "#CDFBEF",
                            "#D5FAE1",
                            "#EFFBCA",
                            "#FEF2C9",
                            "#FFECD8",
                            "#FFE6E8"
                        ]
                    },
                    "icon": {
                        "data": "😤",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Dỗi rồi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:dang_ban_tuong_tu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F8A8DA",
                            "#ECACFC",
                            "#D5B4FE",
                            "#BFB5FD",
                            "#A2B7FC",
                            "#90C7FD",
                            "#7AD6FC",
                            "#66E8F3",
                            "#60EACF",
                            "#77E9BB",
                            "#ABF3BF",
                            "#C8F06A",
                            "#FDDF87",
                            "#FDB77D",
                            "#FAACBB",
                            "#EBCEF8"
                        ]
                    },
                    "icon": {
                        "data": "💭",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Đang bận tương tư",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:mo_hon_nhung_tam_hien",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033126",
                            "#06513D",
                            "#066349",
                            "#047D5A",
                            "#079B6D",
                            "#16BD85",
                            "#33D39F",
                            "#29D0BB",
                            "#12B2A8",
                            "#078FB5",
                            "#077FCD",
                            "#2C5EEA",
                            "#524BE7",
                            "#675FF0",
                            "#8347EF",
                            "#8D7CD8"
                        ]
                    },
                    "icon": {
                        "data": "🐤",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Mỏ hỗn nhưng tâm hiền",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:muon_duoc_om",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#A21CAF",
                            "#BE185D",
                            "#DB2777",
                            "#E879F9",
                            "#F0ABFC",
                            "#09091F",
                            "#14112F",
                            "#1E1B4B",
                            "#31205D",
                            "#3730A3",
                            "#4338CA",
                            "#4C1D95",
                            "#5B21B6",
                            "#6D28D9",
                            "#7C3AED",
                            "#9333EA"
                        ]
                    },
                    "icon": {
                        "data": "🫂",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Muốn được ôm",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎨 Trend TikTok & Meme VN 🔥",
        "items": [
            {
                "overlay_id": "caption:hoi_chieu_troi_mua",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBC9E5",
                            "#FAADD2",
                            "#FECCC5",
                            "#FEDAB1",
                            "#FFEED3",
                            "#FEF1BD",
                            "#F7E98D",
                            "#D4F9A5",
                            "#B8F6D0",
                            "#A5F3D3",
                            "#A1F7E8",
                            "#CDF5FE",
                            "#C0DAFE",
                            "#CAD3FE",
                            "#E1D5FE",
                            "#F6D0FB"
                        ]
                    },
                    "icon": {
                        "data": "🌧️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Hồi chiều trời mưa...",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:con_vien_la_lan",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF0077",
                            "#FF00B2",
                            "#F600E9",
                            "#BE00FF",
                            "#8907FF",
                            "#7125FF",
                            "#320EFF",
                            "#0066FF",
                            "#00ABFF",
                            "#00DDF8",
                            "#00F7C8",
                            "#09FF75",
                            "#4CFF11",
                            "#C1FB00",
                            "#FFD100",
                            "#FF4F11"
                        ]
                    },
                    "icon": {
                        "data": "🍂",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "côn viên lá làn",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:gian_dang_iu_hong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#743F4B",
                            "#874855",
                            "#985360",
                            "#A95E6C",
                            "#B8717A",
                            "#C28283",
                            "#CC8D93",
                            "#D59E9E",
                            "#E1B3AF",
                            "#E8BFB6",
                            "#EEC9BF",
                            "#F2D2C6",
                            "#F6DBD0",
                            "#F9E5DB",
                            "#FBE8E0",
                            "#E0B9B1"
                        ]
                    },
                    "icon": {
                        "data": "🪳",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Gián đáng iu hong",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nau_xoi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B7F4E1",
                            "#C2F7EA",
                            "#D1F5F1",
                            "#D6F4F5",
                            "#CAE7FF",
                            "#D6E7FF",
                            "#D8D5FF",
                            "#E3D9FE",
                            "#F1D6F7",
                            "#F6DAF2",
                            "#FBDDEA",
                            "#FFE7E8",
                            "#FDF1CF",
                            "#F2F6D8",
                            "#E1F5DE",
                            "#D2F3E7"
                        ]
                    },
                    "icon": {
                        "data": "🙀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Nấu xói",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:co_tien_lam_phien_thien_ha",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEFF2",
                            "#FCE3F1",
                            "#FACFEC",
                            "#F3D1FE",
                            "#E7D5FF",
                            "#D9D5FE",
                            "#CAD6FE",
                            "#DCEBFE",
                            "#DDF3FE",
                            "#CEFAFC",
                            "#CDFBEF",
                            "#D6FAE1",
                            "#EFFACA",
                            "#FEF2C9",
                            "#FFEBD8",
                            "#FFE6E8"
                        ]
                    },
                    "icon": {
                        "data": "💰",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Có tiền làm phiền thiên hạ",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nguoi_im_lang_gap_nguoi_hay_noi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7A9DB",
                            "#ECADFC",
                            "#D5B4FE",
                            "#BFB5FD",
                            "#A2B7FC",
                            "#8FC7FD",
                            "#79D7FB",
                            "#65E8F3",
                            "#61E9CF",
                            "#78E9BB",
                            "#ABF3BE",
                            "#C9F06A",
                            "#FDDF86",
                            "#FDB67E",
                            "#FAACBC",
                            "#ECCDF8"
                        ]
                    },
                    "icon": {
                        "data": "🤐",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Người im lặng gặp người hay nói",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:roi_let_luon",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033226",
                            "#06513D",
                            "#066349",
                            "#047D5A",
                            "#079C6D",
                            "#16BD85",
                            "#33D39F",
                            "#29CFBB",
                            "#12B1A8",
                            "#078FB6",
                            "#087ECD",
                            "#2C5EEA",
                            "#524BE7",
                            "#675FF0",
                            "#8348EF",
                            "#8B7BD6"
                        ]
                    },
                    "icon": {
                        "data": "💅",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "rồi lét luôn",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:roi_gay_luon",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#BE185D",
                            "#DB2777",
                            "#E879F9",
                            "#F0ABFC",
                            "#09091F",
                            "#14112F",
                            "#1E1B4B",
                            "#31205D",
                            "#3730A3",
                            "#4338CA",
                            "#4C1D95",
                            "#5B21B6",
                            "#6D28D9",
                            "#7C3AED",
                            "#9333EA",
                            "#A21CAF"
                        ]
                    },
                    "icon": {
                        "data": "🌈",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "rồi gay luôn",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tuyet_doi_khong_nghe",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBC8E5",
                            "#FAAED2",
                            "#FECCC5",
                            "#FEDBB1",
                            "#FFEED3",
                            "#FEF1BD",
                            "#F7E98D",
                            "#D4F9A6",
                            "#B8F6D0",
                            "#A5F4D3",
                            "#A2F7E8",
                            "#CCF5FE",
                            "#C0D9FE",
                            "#CBD3FE",
                            "#E1D5FE",
                            "#F6D0FA"
                        ]
                    },
                    "icon": {
                        "data": "🙉",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tuyệt đối không nghe",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cha_nay_tu_luyen_ghe",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF0078",
                            "#FF00B2",
                            "#F600E9",
                            "#BE00FF",
                            "#8807FF",
                            "#7025FF",
                            "#310FFF",
                            "#0067FF",
                            "#00ACFF",
                            "#00DEF8",
                            "#00F7C7",
                            "#0AFF74",
                            "#4EFF11",
                            "#C2FB00",
                            "#FFCF00",
                            "#FF4E12"
                        ]
                    },
                    "icon": {
                        "data": "🪞",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cha này tự luyến ghê",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:co_bien_co_bien",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#743F4B",
                            "#874855",
                            "#995360",
                            "#A95E6D",
                            "#B9717A",
                            "#C28284",
                            "#CC8E93",
                            "#D59E9E",
                            "#E1B3AF",
                            "#E8BFB7",
                            "#EECABF",
                            "#F2D2C7",
                            "#F6DBD0",
                            "#FAE6DB",
                            "#FBE8DF",
                            "#DFB8AF"
                        ]
                    },
                    "icon": {
                        "data": "🚨",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Có biến có biến",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:hong_drama",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B7F4E2",
                            "#C3F7EA",
                            "#D1F5F1",
                            "#D6F4F5",
                            "#CAE7FF",
                            "#D6E7FF",
                            "#D8D5FF",
                            "#E4D9FE",
                            "#F1D6F7",
                            "#F6DAF2",
                            "#FBDDEA",
                            "#FFE7E8",
                            "#FDF1D0",
                            "#F2F6D8",
                            "#E1F5DE",
                            "#D1F3E7"
                        ]
                    },
                    "icon": {
                        "data": "🍿",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Hóng drama",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cuoi_vcl_m_oi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEFF2",
                            "#FCE3F1",
                            "#FACFEC",
                            "#F3D1FE",
                            "#E7D5FF",
                            "#D9D5FE",
                            "#CBD6FE",
                            "#DCEBFE",
                            "#DDF3FE",
                            "#CEFAFC",
                            "#CDFBEF",
                            "#D6FAE0",
                            "#EFFACA",
                            "#FEF2C9",
                            "#FFEBD8",
                            "#FFE6E8"
                        ]
                    },
                    "icon": {
                        "data": "😂",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cười vcl m oi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vl_m_oi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7A9DB",
                            "#ECADFC",
                            "#D4B4FE",
                            "#BEB5FD",
                            "#A2B7FC",
                            "#8FC7FD",
                            "#79D7FB",
                            "#65E8F2",
                            "#61E9CF",
                            "#78E9BB",
                            "#ABF3BD",
                            "#C9F06B",
                            "#FDDE86",
                            "#FDB67F",
                            "#F9ADBD",
                            "#ECCDF7"
                        ]
                    },
                    "icon": {
                        "data": "😳",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "vl m ơi?",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:noi_het_bi_mat_thi_co_yeu_hong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033226",
                            "#06513D",
                            "#066349",
                            "#047D5A",
                            "#079C6D",
                            "#16BE85",
                            "#33D3A0",
                            "#29CFBB",
                            "#12B1A8",
                            "#078FB6",
                            "#087ECD",
                            "#2C5EEA",
                            "#534CE7",
                            "#675EF0",
                            "#8448EF",
                            "#8A7AD4"
                        ]
                    },
                    "icon": {
                        "data": "🤫",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Nói hết bị mật thì có yêu hong",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:flex_den_hoi_tho_cuoi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DB2777",
                            "#E879F9",
                            "#F0ABFC",
                            "#09091F",
                            "#14112F",
                            "#1E1B4B",
                            "#31205D",
                            "#3730A3",
                            "#4338CA",
                            "#4C1D95",
                            "#5B21B6",
                            "#6D28D9",
                            "#7C3AED",
                            "#9333EA",
                            "#A21CAF",
                            "#BE185D"
                        ]
                    },
                    "icon": {
                        "data": "💎",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Flex đến hơi thở cuối",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:overthinking_vai_chuong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBC8E4",
                            "#FAAED2",
                            "#FECCC4",
                            "#FEDBB2",
                            "#FFEED3",
                            "#FEF1BC",
                            "#F7E98D",
                            "#D4F9A6",
                            "#B7F6D0",
                            "#A5F4D4",
                            "#A3F7E9",
                            "#CCF4FE",
                            "#C0D9FE",
                            "#CBD3FE",
                            "#E1D5FE",
                            "#F6D0FA"
                        ]
                    },
                    "icon": {
                        "data": "🤯",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Overthinking vai chưởng",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:chan_bo_may_di",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF0078",
                            "#FF00B3",
                            "#F500EA",
                            "#BD00FF",
                            "#8808FF",
                            "#7024FF",
                            "#3010FF",
                            "#0068FF",
                            "#00ADFF",
                            "#00DEF7",
                            "#00F7C6",
                            "#0AFF73",
                            "#4FFF10",
                            "#C3FB00",
                            "#FFCE00",
                            "#FF4D14"
                        ]
                    },
                    "icon": {
                        "data": "🙄",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Chan bố mày đi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:oach_xa_lach",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#743F4B",
                            "#874855",
                            "#995360",
                            "#A95E6D",
                            "#B9717A",
                            "#C28284",
                            "#CC8E93",
                            "#D59E9E",
                            "#E1B3AF",
                            "#E8BFB7",
                            "#EECABF",
                            "#F2D2C7",
                            "#F6DBD0",
                            "#FAE6DB",
                            "#FBE8DF",
                            "#DEB6AE"
                        ]
                    },
                    "icon": {
                        "data": "🥬",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "oách xà lách",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:lai_phai_lo",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B7F4E2",
                            "#C3F7EA",
                            "#D1F5F1",
                            "#D6F4F5",
                            "#CAE7FF",
                            "#D6E7FF",
                            "#D8D5FF",
                            "#E4D9FE",
                            "#F1D6F7",
                            "#F6DAF2",
                            "#FBDDEA",
                            "#FFE7E7",
                            "#FDF1D0",
                            "#F2F6D8",
                            "#E1F5DE",
                            "#D1F3E7"
                        ]
                    },
                    "icon": {
                        "data": "💔",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "lại phải lọ",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ua_alo_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEFF2",
                            "#FCE2F1",
                            "#FACFEC",
                            "#F3D1FE",
                            "#E7D5FF",
                            "#D9D5FE",
                            "#CBD7FE",
                            "#DCECFE",
                            "#DDF4FE",
                            "#CEFAFC",
                            "#CDFBEF",
                            "#D6FAE0",
                            "#EFFACA",
                            "#FEF2CA",
                            "#FFEBD8",
                            "#FFE6E8"
                        ]
                    },
                    "icon": {
                        "data": "📞",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Ủa alo",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ke_chuyen_nghe_choi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7A9DC",
                            "#EBADFC",
                            "#D4B4FE",
                            "#BEB5FD",
                            "#A2B7FC",
                            "#8FC8FD",
                            "#79D7FB",
                            "#65E8F2",
                            "#61E9CF",
                            "#79E9BC",
                            "#ABF3BC",
                            "#CAF06B",
                            "#FDDE86",
                            "#FDB67F",
                            "#F9ADBE",
                            "#ECCCF7"
                        ]
                    },
                    "icon": {
                        "data": "🍿",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Kể chuyện nghe chơi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:hom_nay_toi_buon",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033227",
                            "#06513D",
                            "#066449",
                            "#047E5A",
                            "#079D6E",
                            "#17BE86",
                            "#33D3A0",
                            "#28CFBA",
                            "#12B1A8",
                            "#078FB6",
                            "#097ECE",
                            "#2D5EEA",
                            "#534CE7",
                            "#685EF0",
                            "#8449EF",
                            "#8879D1"
                        ]
                    },
                    "icon": {
                        "data": "🥀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "hôm nay tôi buồn",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:xinh_dep_tuyet_voi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E879F9",
                            "#F0ABFC",
                            "#09091F",
                            "#14112F",
                            "#1E1B4B",
                            "#31205D",
                            "#3730A3",
                            "#4338CA",
                            "#4C1D95",
                            "#5B21B6",
                            "#6D28D9",
                            "#7C3AED",
                            "#9333EA",
                            "#A21CAF",
                            "#BE185D",
                            "#DB2777"
                        ]
                    },
                    "icon": {
                        "data": "💅",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Xinh đẹp tuyệt vời",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tram_cam_nhe",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBC8E4",
                            "#FAAED2",
                            "#FECCC4",
                            "#FEDBB2",
                            "#FFEED2",
                            "#FEF1BB",
                            "#F6EA8E",
                            "#D3F9A7",
                            "#B7F6D0",
                            "#A4F4D4",
                            "#A3F7E9",
                            "#CCF4FE",
                            "#C1D9FE",
                            "#CBD3FE",
                            "#E2D5FE",
                            "#F6D0FA"
                        ]
                    },
                    "icon": {
                        "data": "🫠",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Trầm cảm nhẹ",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:chua_du_wow",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF0079",
                            "#FF00B4",
                            "#F500EA",
                            "#BC00FF",
                            "#8808FF",
                            "#6F24FF",
                            "#3011FF",
                            "#0069FF",
                            "#00ADFF",
                            "#00DEF7",
                            "#00F7C5",
                            "#0BFF71",
                            "#51FF10",
                            "#C4FA00",
                            "#FFCC00",
                            "#FF4C15"
                        ]
                    },
                    "icon": {
                        "data": "⭐",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Chưa đủ wow",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:boc_trung_sit_rit",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#75404B",
                            "#874855",
                            "#995360",
                            "#A95F6D",
                            "#B9717B",
                            "#C28284",
                            "#CD8E93",
                            "#D59E9F",
                            "#E1B3AF",
                            "#E8BFB7",
                            "#EECABF",
                            "#F2D3C7",
                            "#F6DBD0",
                            "#FAE6DB",
                            "#FBE8DF",
                            "#DCB4AD"
                        ]
                    },
                    "icon": {
                        "data": "🎁",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Bóc trúng sít rịt",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:hen_lam_moi_xui_duoc_vay_a",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B7F4E2",
                            "#C3F7EB",
                            "#D1F5F1",
                            "#D6F4F5",
                            "#CBE7FF",
                            "#D6E7FF",
                            "#D8D5FF",
                            "#E4D9FE",
                            "#F1D6F7",
                            "#F6DAF2",
                            "#FBDDEA",
                            "#FFE7E7",
                            "#FDF1D0",
                            "#F2F6D8",
                            "#E1F5DE",
                            "#D1F3E6"
                        ]
                    },
                    "icon": {
                        "data": "😅",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Hèn lắm mới xui được vậy á",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ra_duong_ne_moi_anh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEFF2",
                            "#FCE2F1",
                            "#FACFEC",
                            "#F3D1FE",
                            "#E7D5FF",
                            "#D9D5FE",
                            "#CBD7FE",
                            "#DCECFE",
                            "#DDF4FE",
                            "#CEFAFB",
                            "#CDFBEF",
                            "#D6FAE0",
                            "#F0FACA",
                            "#FEF2CA",
                            "#FFEBD8",
                            "#FFE7E8"
                        ]
                    },
                    "icon": {
                        "data": "👤",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Ra đường nể mỗi anh",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cung_cung_di",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7A9DC",
                            "#EBADFC",
                            "#D4B4FE",
                            "#BEB5FD",
                            "#A1B7FC",
                            "#8FC8FD",
                            "#79D7FB",
                            "#65E8F2",
                            "#61E9CE",
                            "#79E9BC",
                            "#ACF3BA",
                            "#CBF06C",
                            "#FDDD86",
                            "#FDB680",
                            "#F9AEBF",
                            "#ECCCF6"
                        ]
                    },
                    "icon": {
                        "data": "🚀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cũng cứng đi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tuyet_doi_dien_anh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033327",
                            "#06513D",
                            "#066449",
                            "#047E5B",
                            "#079D6E",
                            "#17BE86",
                            "#33D3A1",
                            "#28CEBA",
                            "#12B0A8",
                            "#078EB6",
                            "#097DCE",
                            "#2D5DEA",
                            "#534CE7",
                            "#685DF0",
                            "#854AF0",
                            "#8678CF"
                        ]
                    },
                    "icon": {
                        "data": "📷",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tuyệt đối điện ảnh",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:du_ba_khi_chua",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0ABFC",
                            "#09091F",
                            "#14112F",
                            "#1E1B4B",
                            "#31205D",
                            "#3730A3",
                            "#4338CA",
                            "#4C1D95",
                            "#5B21B6",
                            "#6D28D9",
                            "#7C3AED",
                            "#9333EA",
                            "#A21CAF",
                            "#BE185D",
                            "#DB2777",
                            "#E879F9"
                        ]
                    },
                    "icon": {
                        "data": "⚡",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Đủ bá khí chưa",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cai_gi_vay_troi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBC7E4",
                            "#FAAFD2",
                            "#FECDC4",
                            "#FEDBB3",
                            "#FFEED2",
                            "#FEF0BB",
                            "#F6EA8E",
                            "#D3F9A7",
                            "#B7F6D0",
                            "#A4F4D4",
                            "#A4F7E9",
                            "#CCF4FE",
                            "#C1D9FE",
                            "#CBD3FE",
                            "#E2D5FE",
                            "#F6D0FA"
                        ]
                    },
                    "icon": {
                        "data": "❗",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cái gì vậy trời",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nay_la_het_cuu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF007A",
                            "#FF00B4",
                            "#F400EA",
                            "#BC00FF",
                            "#8809FF",
                            "#6E23FF",
                            "#2F12FF",
                            "#0069FF",
                            "#00AEFF",
                            "#00DFF6",
                            "#00F7C5",
                            "#0BFF70",
                            "#52FF10",
                            "#C5FA00",
                            "#FFCB00",
                            "#FF4B16"
                        ]
                    },
                    "icon": {
                        "data": "❌",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Này là hết cứu",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:qua_la_dien_anh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#75404B",
                            "#884855",
                            "#995360",
                            "#A95F6D",
                            "#B9727B",
                            "#C28284",
                            "#CD8E93",
                            "#D69F9F",
                            "#E1B3AF",
                            "#E8BFB7",
                            "#EECABF",
                            "#F2D3C7",
                            "#F6DBD0",
                            "#FAE6DB",
                            "#FBE7DE",
                            "#DBB3AB"
                        ]
                    },
                    "icon": {
                        "data": "📷",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Quá là điện ảnh",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_2_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B7F4E2",
                            "#C3F7EB",
                            "#D1F5F1",
                            "#D6F4F5",
                            "#CBE7FF",
                            "#D6E6FF",
                            "#D8D5FF",
                            "#E4D9FE",
                            "#F1D6F7",
                            "#F6DAF2",
                            "#FBDDEA",
                            "#FFE7E7",
                            "#FDF1D0",
                            "#F1F6D8",
                            "#E1F5DE",
                            "#D0F3E6"
                        ]
                    },
                    "icon": {
                        "data": "🚀",
                        "type": "emoji"
                    },
                    "max_lines": 3,
                    "text": "Đỉnh nóc kịch trần bay phấp phới",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_2_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEFF2",
                            "#FCE2F1",
                            "#FACFED",
                            "#F2D1FE",
                            "#E6D5FF",
                            "#D8D5FE",
                            "#CBD7FE",
                            "#DCECFE",
                            "#DCF4FE",
                            "#CEFAFB",
                            "#CDFBEE",
                            "#D7FAE0",
                            "#F0FACA",
                            "#FEF2CA",
                            "#FFEBD9",
                            "#FFE7E9"
                        ]
                    },
                    "icon": {
                        "data": "🏆",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Mãi đỉnh mãi đỉnh",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎨 Gen Z Life 🩻",
        "items": [
            {
                "overlay_id": "caption:hao_han",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7A9DC",
                            "#EBADFC",
                            "#D4B4FE",
                            "#BDB5FD",
                            "#A1B8FC",
                            "#8EC8FD",
                            "#78D7FB",
                            "#65E8F1",
                            "#61E9CE",
                            "#7AEABC",
                            "#ACF3B9",
                            "#CBEF6C",
                            "#FDDD85",
                            "#FDB580",
                            "#F9AEC0",
                            "#ECCCF6"
                        ]
                    },
                    "icon": {
                        "data": "🗡️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Hảo hán",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cam_lanh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033327",
                            "#06523D",
                            "#06644A",
                            "#047E5B",
                            "#079D6E",
                            "#18BE86",
                            "#33D3A1",
                            "#28CEBA",
                            "#11B0A9",
                            "#078EB6",
                            "#097DCF",
                            "#2E5DEA",
                            "#534DE8",
                            "#685DF0",
                            "#854BF0",
                            "#8477CC"
                        ]
                    },
                    "icon": {
                        "data": "🤧",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cảm lạnh",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:bat_luc",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0ABFC",
                            "#E879F9",
                            "#DB2777",
                            "#BE185D",
                            "#A21CAF",
                            "#9333EA",
                            "#7C3AED",
                            "#6D28D9",
                            "#5B21B6",
                            "#4C1D95",
                            "#4338CA",
                            "#3730A3",
                            "#31205D",
                            "#1E1B4B",
                            "#14112F",
                            "#09091F"
                        ]
                    },
                    "icon": {
                        "data": "🏳️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Bất lực",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:xin_lui_duoc_chua",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBC7E4",
                            "#FAAFD2",
                            "#FECDC3",
                            "#FEDCB3",
                            "#FFEED2",
                            "#FEF0BA",
                            "#F5EA8E",
                            "#D3F9A8",
                            "#B7F6D0",
                            "#A4F4D4",
                            "#A4F7E9",
                            "#CCF3FE",
                            "#C1D9FE",
                            "#CCD3FE",
                            "#E2D5FE",
                            "#F6D0F9"
                        ]
                    },
                    "icon": {
                        "data": "🥺",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Xin lũi được chưa",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:rot_nuoc_mat",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF007A",
                            "#FF00B5",
                            "#F300EA",
                            "#BB00FF",
                            "#8809FF",
                            "#6D23FF",
                            "#2F13FF",
                            "#006AFF",
                            "#00AEFF",
                            "#00DFF6",
                            "#00F7C4",
                            "#0CFF6F",
                            "#53FF10",
                            "#C5FA00",
                            "#FFC900",
                            "#FF4A17"
                        ]
                    },
                    "icon": {
                        "data": "😭",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Rớt nước mắt",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:guc_nga",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#75404B",
                            "#884855",
                            "#995361",
                            "#AA5F6D",
                            "#B9727B",
                            "#C28284",
                            "#CD8E93",
                            "#D69F9F",
                            "#E1B4AF",
                            "#E8BFB7",
                            "#EECABF",
                            "#F2D3C7",
                            "#F6DBD0",
                            "#FAE6DC",
                            "#FBE7DE",
                            "#D9B1AA"
                        ]
                    },
                    "icon": {
                        "data": "📉",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Gục ngã",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tien_dinh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B7F4E2",
                            "#C3F7EB",
                            "#D1F5F1",
                            "#D5F3F6",
                            "#CBE7FF",
                            "#D6E6FF",
                            "#D8D5FF",
                            "#E4D9FE",
                            "#F1D6F7",
                            "#F6DAF2",
                            "#FBDDEA",
                            "#FFE7E6",
                            "#FDF1D0",
                            "#F1F6D8",
                            "#E0F5DF",
                            "#D0F3E6"
                        ]
                    },
                    "icon": {
                        "data": "🌪️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tiền đình",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:che_manh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEFF2",
                            "#FCE2F1",
                            "#FACFED",
                            "#F2D1FE",
                            "#E6D5FF",
                            "#D8D5FE",
                            "#CBD7FE",
                            "#DCECFE",
                            "#DCF4FE",
                            "#CEFAFB",
                            "#CDFBEE",
                            "#D7FADF",
                            "#F0FACA",
                            "#FEF2CA",
                            "#FFEBD9",
                            "#FFE7E9"
                        ]
                    },
                    "icon": {
                        "data": "👎",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Chê mạnh",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:xinh_gai_an_phim_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7A9DD",
                            "#EBADFC",
                            "#D4B4FE",
                            "#BDB5FD",
                            "#A1B8FC",
                            "#8EC8FD",
                            "#78D8FB",
                            "#65E8F1",
                            "#62E9CE",
                            "#7BEABD",
                            "#ACF3B8",
                            "#CCEF6C",
                            "#FDDC85",
                            "#FDB581",
                            "#F9AFC1",
                            "#EDCBF5"
                        ]
                    },
                    "icon": {
                        "data": "💅",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Xinh gái ấn phím 1",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:di_lam_vi_dam_me",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033428",
                            "#06523D",
                            "#06654A",
                            "#047F5B",
                            "#079E6E",
                            "#18BF86",
                            "#32D3A1",
                            "#27CEB9",
                            "#11AFA9",
                            "#078EB7",
                            "#0A7DCF",
                            "#2E5DEA",
                            "#534DE8",
                            "#695CF0",
                            "#864CF0",
                            "#8276CA"
                        ]
                    },
                    "icon": {
                        "data": "🤡",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Đi làm vì đam mê",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎨 Meme vui nhộn",
        "items": [
            {
                "overlay_id": "caption:cuoi_xiu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#09091F",
                            "#F0ABFC",
                            "#E879F9",
                            "#DB2777",
                            "#BE185D",
                            "#A21CAF",
                            "#9333EA",
                            "#7C3AED",
                            "#6D28D9",
                            "#5B21B6",
                            "#4C1D95",
                            "#4338CA",
                            "#3730A3",
                            "#31205D",
                            "#1E1B4B",
                            "#14112F"
                        ]
                    },
                    "icon": {
                        "data": "😎",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cười xỉu",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:toang_that_roi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBC6E4",
                            "#FAB0D2",
                            "#FECDC3",
                            "#FEDCB4",
                            "#FFEED2",
                            "#FEF0B9",
                            "#F5EA8E",
                            "#D2F9A8",
                            "#B7F6D0",
                            "#A4F4D4",
                            "#A5F7EA",
                            "#CBF3FE",
                            "#C1D9FE",
                            "#CCD3FE",
                            "#E2D5FE",
                            "#F6D0F9"
                        ]
                    },
                    "icon": {
                        "data": "🐉",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Toang thật rồi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:toi_roi_toi_roi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF007B",
                            "#FF00B6",
                            "#F300EB",
                            "#BA00FF",
                            "#870AFF",
                            "#6D22FF",
                            "#2E14FF",
                            "#006BFF",
                            "#00AFFF",
                            "#00DFF5",
                            "#00F7C3",
                            "#0DFF6D",
                            "#55FF10",
                            "#C6F900",
                            "#FFC800",
                            "#FF4918"
                        ]
                    },
                    "icon": {
                        "data": "❗",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tới rồi tới rồi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:khong_the_tin_noi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#75404B",
                            "#884855",
                            "#9A5361",
                            "#AA5F6D",
                            "#B9727B",
                            "#C28285",
                            "#CD8E93",
                            "#D69F9F",
                            "#E2B4B0",
                            "#E8BFB7",
                            "#EECAC0",
                            "#F2D3C7",
                            "#F6DBD0",
                            "#FAE6DC",
                            "#FAE7DE",
                            "#D8B0A9"
                        ]
                    },
                    "icon": {
                        "data": "❓",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Không thể tin nổi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎨 Đời sống",
        "items": [
            {
                "overlay_id": "caption:ngay_moi_vui_ve",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B7F4E2",
                            "#C3F7EB",
                            "#D1F5F1",
                            "#D5F3F6",
                            "#CBE7FF",
                            "#D6E6FF",
                            "#D8D5FF",
                            "#E4D9FD",
                            "#F1D6F7",
                            "#F6DAF2",
                            "#FBDDEA",
                            "#FFE7E6",
                            "#FDF1D0",
                            "#F1F6D8",
                            "#E0F5DF",
                            "#CFF3E6"
                        ]
                    },
                    "icon": {
                        "data": "☀️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Ngày mới vui vẻ",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ngu_ngon",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEFF2",
                            "#FCE1F0",
                            "#FACFED",
                            "#F2D1FE",
                            "#E6D5FF",
                            "#D8D5FE",
                            "#CCD8FE",
                            "#DCECFE",
                            "#DCF4FE",
                            "#CEFAFB",
                            "#CDFBEE",
                            "#D7FADF",
                            "#F0FACA",
                            "#FEF2CA",
                            "#FFEBD9",
                            "#FFE7E9"
                        ]
                    },
                    "icon": {
                        "data": "🌙",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Ngủ ngon",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:an_com_chua",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7A9DD",
                            "#EAADFC",
                            "#D3B4FE",
                            "#BDB5FD",
                            "#A1B8FC",
                            "#8EC8FD",
                            "#78D8FB",
                            "#65E8F0",
                            "#62E9CD",
                            "#7BEABD",
                            "#ACF3B7",
                            "#CDEF6D",
                            "#FDDC85",
                            "#FDB582",
                            "#F8AFC2",
                            "#EDCBF5"
                        ]
                    },
                    "icon": {
                        "data": "🍽️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Ăn cơm chưa?",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:di_choi_khong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033428",
                            "#06523E",
                            "#06654A",
                            "#047F5B",
                            "#089E6F",
                            "#18BF87",
                            "#32D3A2",
                            "#27CDB9",
                            "#11AFA9",
                            "#078EB7",
                            "#0A7CCF",
                            "#2F5CEA",
                            "#544DE8",
                            "#695CF0",
                            "#864DF0",
                            "#8175C8"
                        ]
                    },
                    "icon": {
                        "data": "✈️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Đi chơi không?",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎨 Gen Z Slay",
        "items": [
            {
                "overlay_id": "caption:tinh_hoa_hoi_tu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#14112F",
                            "#09091F",
                            "#F0ABFC",
                            "#E879F9",
                            "#DB2777",
                            "#BE185D",
                            "#A21CAF",
                            "#9333EA",
                            "#7C3AED",
                            "#6D28D9",
                            "#5B21B6",
                            "#4C1D95",
                            "#4338CA",
                            "#3730A3",
                            "#31205D",
                            "#1E1B4B"
                        ]
                    },
                    "icon": {
                        "data": "✨",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tinh hoa hội tụ",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:phu_tinh_khong_phu_ban",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBC6E3",
                            "#FAB0D2",
                            "#FECDC3",
                            "#FEDCB4",
                            "#FFEED2",
                            "#FEF0B9",
                            "#F5EA8E",
                            "#D2F9A9",
                            "#B6F6D0",
                            "#A4F4D5",
                            "#A6F7EA",
                            "#CBF3FE",
                            "#C1D9FE",
                            "#CCD3FE",
                            "#E3D5FE",
                            "#F6D0F9"
                        ]
                    },
                    "icon": {
                        "data": "🕶️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Phụ tình không phụ bản",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ngoan_xinh_yeu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF007C",
                            "#FF00B6",
                            "#F200EB",
                            "#BA00FF",
                            "#870AFF",
                            "#6C22FF",
                            "#2D15FF",
                            "#006CFF",
                            "#00B0FF",
                            "#00E0F5",
                            "#00F7C2",
                            "#0DFF6C",
                            "#56FF0F",
                            "#C7F900",
                            "#FFC600",
                            "#FF481A"
                        ]
                    },
                    "icon": {
                        "data": "🌸",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Ngoan xinh yêu của ai?",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nhin_la_biet_uy_tin",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#75404B",
                            "#884956",
                            "#9A5361",
                            "#AA5F6D",
                            "#B9727B",
                            "#C38385",
                            "#CD8E93",
                            "#D69F9F",
                            "#E2B4B0",
                            "#E8C0B7",
                            "#EECAC0",
                            "#F2D3C7",
                            "#F6DCD1",
                            "#FAE6DC",
                            "#FAE6DD",
                            "#D6AEA7"
                        ]
                    },
                    "icon": {
                        "data": "👌",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Nhìn là biết uy tín",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎨 Bất ổn & Khó đỡ",
        "items": [
            {
                "overlay_id": "caption:luon_vui_tuoi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B8F4E2",
                            "#C3F7EB",
                            "#D1F5F1",
                            "#D5F3F6",
                            "#CBE7FF",
                            "#D6E6FF",
                            "#D9D5FF",
                            "#E4D9FD",
                            "#F1D6F7",
                            "#F6DAF1",
                            "#FBDDEA",
                            "#FFE8E6",
                            "#FDF1D0",
                            "#F1F6D8",
                            "#E0F5DF",
                            "#CFF3E6"
                        ]
                    },
                    "icon": {
                        "data": "🤡",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Luôn vui tươi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:bat_on_that_su",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEFF2",
                            "#FCE1F0",
                            "#FACFED",
                            "#F2D1FE",
                            "#E6D5FF",
                            "#D8D5FE",
                            "#CCD8FE",
                            "#DCECFE",
                            "#DCF4FE",
                            "#CEFAFB",
                            "#CDFBEE",
                            "#D8FADF",
                            "#F0FACA",
                            "#FEF2CA",
                            "#FFEBD9",
                            "#FFE7E9"
                        ]
                    },
                    "icon": {
                        "data": "🫠",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Bất ổn thật sự",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:khong_cam_xuc",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7A9DE",
                            "#EAADFC",
                            "#D3B4FE",
                            "#BCB5FD",
                            "#A1B8FC",
                            "#8EC8FD",
                            "#78D8FB",
                            "#65E8F0",
                            "#62E9CD",
                            "#7CEABD",
                            "#ADF3B6",
                            "#CDEF6D",
                            "#FDDB85",
                            "#FDB582",
                            "#F8B0C3",
                            "#EDCAF5"
                        ]
                    },
                    "icon": {
                        "data": "🗿",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Không cảm xúc",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:phu_huynh_dung_xem",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033428",
                            "#06523E",
                            "#06654A",
                            "#047F5B",
                            "#089F6F",
                            "#19BF87",
                            "#32D3A2",
                            "#27CDB9",
                            "#11AEA9",
                            "#078EB7",
                            "#0B7CD0",
                            "#2F5CEA",
                            "#544EE8",
                            "#695BF0",
                            "#864EF0",
                            "#7F74C5"
                        ]
                    },
                    "icon": {
                        "data": "🙈",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Phụ huynh đừng xem",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎨 Check VAR & Hóng hớt",
        "items": [
            {
                "overlay_id": "caption:check_var",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1E1B4B",
                            "#14112F",
                            "#09091F",
                            "#F0ABFC",
                            "#E879F9",
                            "#DB2777",
                            "#BE185D",
                            "#A21CAF",
                            "#9333EA",
                            "#7C3AED",
                            "#6D28D9",
                            "#5B21B6",
                            "#4C1D95",
                            "#4338CA",
                            "#3730A3",
                            "#31205D"
                        ]
                    },
                    "icon": {
                        "data": "📺",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Check VAR liền",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:qua_nhieu_su_de_thuong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBC5E3",
                            "#FAB0D2",
                            "#FECDC2",
                            "#FEDCB4",
                            "#FFEED2",
                            "#FEF0B8",
                            "#F4EB8F",
                            "#D2F9A9",
                            "#B6F6D0",
                            "#A4F4D5",
                            "#A6F7EA",
                            "#CBF2FE",
                            "#C1D9FE",
                            "#CCD3FE",
                            "#E3D5FE",
                            "#F6D0F9"
                        ]
                    },
                    "icon": {
                        "data": "🎀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Quá nhiều sự dễ thương",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:mac_bay_tinh_yeu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF007C",
                            "#FF00B7",
                            "#F200EB",
                            "#B900FF",
                            "#870BFF",
                            "#6B21FF",
                            "#2D16FF",
                            "#006DFF",
                            "#00B0FF",
                            "#00E0F5",
                            "#00F7C1",
                            "#0EFF6B",
                            "#58FF0F",
                            "#C8F900",
                            "#FFC500",
                            "#FF471B"
                        ]
                    },
                    "icon": {
                        "data": "💘",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Mắc bẫy tình yêu",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:song_gio_phu_doi_trai",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#76404B",
                            "#884956",
                            "#9A5361",
                            "#AA606E",
                            "#B9727B",
                            "#C38385",
                            "#CD8F93",
                            "#D6A0A0",
                            "#E2B4B0",
                            "#E8C0B7",
                            "#EECAC0",
                            "#F2D3C7",
                            "#F6DCD1",
                            "#FAE6DC",
                            "#FAE6DD",
                            "#D5ACA6"
                        ]
                    },
                    "icon": {
                        "data": "🌪️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Sóng gió phủ đời trai",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎨 Góc Deadline & Đi Làm",
        "items": [
            {
                "overlay_id": "caption:deadline_ruot",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B8F4E2",
                            "#C4F7EB",
                            "#D1F5F1",
                            "#D5F3F6",
                            "#CBE7FF",
                            "#D6E5FF",
                            "#D9D5FF",
                            "#E5D9FD",
                            "#F1D6F7",
                            "#F6DAF1",
                            "#FBDDEA",
                            "#FFE8E5",
                            "#FDF1D0",
                            "#F1F6D8",
                            "#E0F5DF",
                            "#CFF3E6"
                        ]
                    },
                    "icon": {
                        "data": "🔥",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Deadline dí tụt quần",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ca_o_ran_doc",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEEF2",
                            "#FCE1F0",
                            "#F9CFEE",
                            "#F2D1FE",
                            "#E6D5FF",
                            "#D7D5FE",
                            "#CCD8FE",
                            "#DCECFE",
                            "#DCF4FE",
                            "#CEFAFB",
                            "#CDFBEE",
                            "#D8FBDE",
                            "#F1FACA",
                            "#FEF1CB",
                            "#FFEBD9",
                            "#FFE7E9"
                        ]
                    },
                    "icon": {
                        "data": "🐍",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cả ổ rắn độc",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tien_dau_ma_tieu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7A9DE",
                            "#EAADFD",
                            "#D3B4FE",
                            "#BCB5FD",
                            "#A0B8FC",
                            "#8DC9FD",
                            "#77D8FB",
                            "#65E9F0",
                            "#62E9CD",
                            "#7DEABD",
                            "#ADF3B4",
                            "#CEEF6E",
                            "#FDDB84",
                            "#FDB483",
                            "#F8B0C3",
                            "#EDCAF4"
                        ]
                    },
                    "icon": {
                        "data": "💸",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tiền đâu mà tiêu",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nghien_cuu_khoa_hoc",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033528",
                            "#06523E",
                            "#05654A",
                            "#04805C",
                            "#089F6F",
                            "#19C087",
                            "#32D3A3",
                            "#27CDB9",
                            "#11AEA9",
                            "#068EB7",
                            "#0B7CD0",
                            "#305CE9",
                            "#544EE8",
                            "#695BF0",
                            "#874FF0",
                            "#7D73C3"
                        ]
                    },
                    "icon": {
                        "data": "☕",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cần nạp cafein gấp",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#31205D",
                            "#1E1B4B",
                            "#14112F",
                            "#09091F",
                            "#F0ABFC",
                            "#E879F9",
                            "#DB2777",
                            "#BE185D",
                            "#A21CAF",
                            "#9333EA",
                            "#7C3AED",
                            "#6D28D9",
                            "#5B21B6",
                            "#4C1D95",
                            "#4338CA",
                            "#3730A3"
                        ]
                    },
                    "icon": {
                        "data": "☕",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Thế mà lại hay",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FAC5E3",
                            "#FAB1D1",
                            "#FECDC2",
                            "#FEDDB5",
                            "#FFEFD1",
                            "#FEF0B7",
                            "#F4EB8F",
                            "#D1F8AA",
                            "#B6F6D0",
                            "#A3F4D5",
                            "#A7F7EB",
                            "#CBF2FE",
                            "#C1D9FE",
                            "#CDD3FE",
                            "#E3D4FE",
                            "#F7D0F8"
                        ]
                    },
                    "icon": {
                        "data": "✈️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Vẽ kẻ không ai tin",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF007D",
                            "#FF00B8",
                            "#F100EC",
                            "#B800FF",
                            "#870BFF",
                            "#6B21FF",
                            "#2C17FF",
                            "#006DFF",
                            "#00B1FF",
                            "#00E0F4",
                            "#00F8C0",
                            "#0FFF6A",
                            "#59FF0F",
                            "#C9F900",
                            "#FFC300",
                            "#FF461C"
                        ]
                    },
                    "icon": {
                        "data": "🧘",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Hướng nội hết phần đời còn lại",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#76404C",
                            "#894956",
                            "#9A5461",
                            "#AA606E",
                            "#B9737B",
                            "#C38385",
                            "#CD8F94",
                            "#D6A0A0",
                            "#E2B4B0",
                            "#E9C0B7",
                            "#EECAC0",
                            "#F2D3C7",
                            "#F6DCD1",
                            "#FAE6DC",
                            "#FAE6DD",
                            "#D3ABA5"
                        ]
                    },
                    "icon": {
                        "data": "✨",
                        "type": "emoji"
                    },
                    "max_lines": 3,
                    "text": "Suy nghĩ tích cực, đời bớt tiêu cực",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B8F4E2",
                            "#C4F6EB",
                            "#D2F6F2",
                            "#D5F3F6",
                            "#CCE7FF",
                            "#D6E5FF",
                            "#D9D6FF",
                            "#E5D9FD",
                            "#F1D6F7",
                            "#F6DAF1",
                            "#FBDEEA",
                            "#FFE8E5",
                            "#FCF2D0",
                            "#F0F6D8",
                            "#E0F4DF",
                            "#CEF3E6"
                        ]
                    },
                    "icon": {
                        "data": "👀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Có nhiều cái chưa muốn nói đâu",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_6",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEEF2",
                            "#FCE1F0",
                            "#F9CFEE",
                            "#F2D1FE",
                            "#E6D5FF",
                            "#D7D5FE",
                            "#CCD8FE",
                            "#DCECFE",
                            "#DBF4FE",
                            "#CEFAFB",
                            "#CDFBEE",
                            "#D8FBDE",
                            "#F1FACA",
                            "#FEF1CB",
                            "#FFEBDA",
                            "#FFE7E9"
                        ]
                    },
                    "icon": {
                        "data": "🎯",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Nhiệm vụ hệ thống",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_7",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7A9DF",
                            "#EAADFD",
                            "#D3B4FE",
                            "#BCB5FD",
                            "#A0B9FC",
                            "#8DC9FD",
                            "#77D9FB",
                            "#65E9EF",
                            "#62E9CC",
                            "#7DEABE",
                            "#ADF3B3",
                            "#CFEF6E",
                            "#FDDA84",
                            "#FDB484",
                            "#F8B1C4",
                            "#EDC9F4"
                        ]
                    },
                    "icon": {
                        "data": "🏢",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Đi làm công ty không, em xin",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_8",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033529",
                            "#06533E",
                            "#05664B",
                            "#04805C",
                            "#089F6F",
                            "#1AC087",
                            "#32D3A3",
                            "#26CDB8",
                            "#11AEA9",
                            "#068EB8",
                            "#0B7BD1",
                            "#305BE9",
                            "#544FE8",
                            "#6A5AF0",
                            "#8750F0",
                            "#7B72C1"
                        ]
                    },
                    "icon": {
                        "data": "🏃",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "+1 máy bị deadline dí",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_10",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#3730A3",
                            "#31205D",
                            "#1E1B4B",
                            "#14112F",
                            "#09091F",
                            "#F0ABFC",
                            "#E879F9",
                            "#DB2777",
                            "#BE185D",
                            "#A21CAF",
                            "#9333EA",
                            "#7C3AED",
                            "#6D28D9",
                            "#5B21B6",
                            "#4C1D95",
                            "#4338CA"
                        ]
                    },
                    "icon": {
                        "data": "🎙️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Dịch cabin",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎓 Học tập & Sinh viên",
        "items": [
            {
                "overlay_id": "caption:vinhdat_new_1_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FAC5E3",
                            "#FAB1D1",
                            "#FECDC1",
                            "#FEDDB5",
                            "#FFEFD1",
                            "#FEF0B7",
                            "#F3EB8F",
                            "#D1F8AB",
                            "#B6F6D0",
                            "#A3F4D5",
                            "#A7F7EB",
                            "#CBF2FE",
                            "#C1D9FE",
                            "#CDD3FE",
                            "#E3D4FE",
                            "#F7D0F8"
                        ]
                    },
                    "icon": {
                        "data": "graduationcap.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Mai thi rồi, cứu tôi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_1_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF007D",
                            "#FF00B8",
                            "#F000EC",
                            "#B800FF",
                            "#870CFF",
                            "#6A20FF",
                            "#2B18FF",
                            "#006EFF",
                            "#00B1FF",
                            "#00E0F4",
                            "#00F8C0",
                            "#0FFF68",
                            "#5AFF0F",
                            "#C9F800",
                            "#FFC200",
                            "#FF451D"
                        ]
                    },
                    "icon": {
                        "data": "graduationcap.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Học ít hiểu nhiều",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_1_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#76404C",
                            "#894956",
                            "#9A5461",
                            "#AB606E",
                            "#B9737B",
                            "#C38385",
                            "#CD8F94",
                            "#D6A0A0",
                            "#E2B4B0",
                            "#E9C0B7",
                            "#EECAC0",
                            "#F2D3C7",
                            "#F6DCD1",
                            "#FAE6DC",
                            "#FAE5DC",
                            "#D2A9A3"
                        ]
                    },
                    "icon": {
                        "data": "graduationcap.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Qua môn là hạnh phúc",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_1_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B8F4E2",
                            "#C4F6EB",
                            "#D2F6F2",
                            "#D4F2F6",
                            "#CCE7FF",
                            "#D6E5FF",
                            "#D9D6FF",
                            "#E5D9FD",
                            "#F1D6F7",
                            "#F6DAF1",
                            "#FBDEEA",
                            "#FFE8E5",
                            "#FCF2D0",
                            "#F0F6D8",
                            "#E0F4DF",
                            "#CEF3E6"
                        ]
                    },
                    "icon": {
                        "data": "graduationcap.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Não đang loading...",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_1_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEEF2",
                            "#FCE0F0",
                            "#F9CFEE",
                            "#F2D1FE",
                            "#E6D5FF",
                            "#D7D5FE",
                            "#CDD9FE",
                            "#DCECFE",
                            "#DBF4FE",
                            "#CEFAFA",
                            "#CDFBEE",
                            "#D8FBDE",
                            "#F1FACA",
                            "#FEF1CB",
                            "#FFEBDA",
                            "#FFE8E9"
                        ]
                    },
                    "icon": {
                        "data": "graduationcap.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "GPA ơi đừng bỏ tôi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎮 Gaming & Giải trí",
        "items": [
            {
                "overlay_id": "caption:vinhdat_new_2_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7A9DF",
                            "#E9ADFD",
                            "#D2B4FE",
                            "#BBB5FD",
                            "#A0B9FC",
                            "#8DC9FD",
                            "#77D9FB",
                            "#65E9EF",
                            "#62E9CC",
                            "#7EEABE",
                            "#ADF3B2",
                            "#CFEF6F",
                            "#FDDA84",
                            "#FDB484",
                            "#F7B2C5",
                            "#EDC9F3"
                        ]
                    },
                    "icon": {
                        "data": "gamecontroller.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Online nhưng không rep",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_2_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033529",
                            "#06533E",
                            "#05664B",
                            "#04805C",
                            "#08A070",
                            "#1AC088",
                            "#32D3A4",
                            "#26CCB8",
                            "#11ADA9",
                            "#068DB8",
                            "#0C7BD1",
                            "#315BE9",
                            "#554FE8",
                            "#6A5AF0",
                            "#8850F1",
                            "#7971BE"
                        ]
                    },
                    "icon": {
                        "data": "gamecontroller.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Gánh team trong im lặng",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_2_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#4338CA",
                            "#3730A3",
                            "#31205D",
                            "#1E1B4B",
                            "#14112F",
                            "#09091F",
                            "#F0ABFC",
                            "#E879F9",
                            "#DB2777",
                            "#BE185D",
                            "#A21CAF",
                            "#9333EA",
                            "#7C3AED",
                            "#6D28D9",
                            "#5B21B6",
                            "#4C1D95"
                        ]
                    },
                    "icon": {
                        "data": "gamecontroller.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Thắng làm vua, thua làm lại",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_2_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FAC4E2",
                            "#FAB1D1",
                            "#FECEC1",
                            "#FEDDB6",
                            "#FFEFD1",
                            "#FEEFB6",
                            "#F3EB8F",
                            "#D1F8AB",
                            "#B5F6D0",
                            "#A3F4D6",
                            "#A8F7EB",
                            "#CBF1FE",
                            "#C1D9FE",
                            "#CDD3FE",
                            "#E4D4FE",
                            "#F7D0F8"
                        ]
                    },
                    "icon": {
                        "data": "gamecontroller.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Ping cao tại số phận",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_2_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF007E",
                            "#FF00B9",
                            "#F000EC",
                            "#B700FF",
                            "#870CFF",
                            "#6920FF",
                            "#2B19FF",
                            "#006FFF",
                            "#00B2FF",
                            "#00E1F3",
                            "#00F8BF",
                            "#10FF67",
                            "#5CFF0E",
                            "#CAF800",
                            "#FFC000",
                            "#FF441E"
                        ]
                    },
                    "icon": {
                        "data": "gamecontroller.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "AFK đi ăn cơm",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🌙 Tâm trạng & Chữa lành",
        "items": [
            {
                "overlay_id": "caption:vinhdat_new_3_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#76404C",
                            "#894956",
                            "#9A5461",
                            "#AB606E",
                            "#B9737B",
                            "#C38385",
                            "#CD8F94",
                            "#D7A0A0",
                            "#E2B4B0",
                            "#E9C0B7",
                            "#EECAC0",
                            "#F2D3C7",
                            "#F6DCD1",
                            "#FAE6DC",
                            "#FAE5DC",
                            "#D0A8A2"
                        ]
                    },
                    "icon": {
                        "data": "moon.stars.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Hôm nay hơi mệt một chút",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_3_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B8F4E2",
                            "#C4F6EB",
                            "#D2F6F2",
                            "#D4F2F6",
                            "#CCE7FF",
                            "#D6E5FF",
                            "#D9D6FF",
                            "#E5D9FD",
                            "#F1D6F7",
                            "#F6DAF1",
                            "#FBDEEA",
                            "#FFE8E4",
                            "#FCF2D0",
                            "#F0F6D8",
                            "#E0F4DF",
                            "#CEF3E6"
                        ]
                    },
                    "icon": {
                        "data": "moon.stars.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Bình yên là đủ",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_3_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEEF2",
                            "#FCE0F0",
                            "#F9CFEE",
                            "#F2D1FE",
                            "#E6D5FF",
                            "#D7D5FE",
                            "#CDD9FE",
                            "#DCECFE",
                            "#DBF4FE",
                            "#CEFAFA",
                            "#CDFBEE",
                            "#D9FBDE",
                            "#F1F9CA",
                            "#FEF1CB",
                            "#FFEADA",
                            "#FFE8E9"
                        ]
                    },
                    "icon": {
                        "data": "moon.stars.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Cho bản thân một ngày nghỉ",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_3_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F6A9E0",
                            "#E9AEFD",
                            "#D2B4FE",
                            "#BBB5FD",
                            "#A0B9FC",
                            "#8DC9FD",
                            "#77D9FB",
                            "#64E9EE",
                            "#63E9CC",
                            "#7EEABE",
                            "#AEF3B1",
                            "#D0EF6F",
                            "#FDD984",
                            "#FDB485",
                            "#F7B2C6",
                            "#EEC8F3"
                        ]
                    },
                    "icon": {
                        "data": "moon.stars.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Trái tim đang bảo trì",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_3_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033629",
                            "#06533E",
                            "#05664B",
                            "#04815C",
                            "#08A070",
                            "#1AC088",
                            "#32D3A4",
                            "#26CCB8",
                            "#11ADA9",
                            "#068DB8",
                            "#0C7AD1",
                            "#315BE9",
                            "#554FE8",
                            "#6A59F0",
                            "#8851F1",
                            "#7770BC"
                        ]
                    },
                    "icon": {
                        "data": "moon.stars.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Rồi mọi chuyện sẽ ổn",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🍜 Ăn uống & Foodie",
        "items": [
            {
                "overlay_id": "caption:vinhdat_new_4_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#4C1D95",
                            "#4338CA",
                            "#3730A3",
                            "#31205D",
                            "#1E1B4B",
                            "#14112F",
                            "#09091F",
                            "#F0ABFC",
                            "#E879F9",
                            "#DB2777",
                            "#BE185D",
                            "#A21CAF",
                            "#9333EA",
                            "#7C3AED",
                            "#6D28D9",
                            "#5B21B6"
                        ]
                    },
                    "icon": {
                        "data": "fork.knife",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Ăn trước, tính sau",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_4_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FAC4E2",
                            "#FAB2D1",
                            "#FECEC1",
                            "#FEDDB6",
                            "#FFEFD1",
                            "#FEEFB5",
                            "#F3EB8F",
                            "#D0F8AC",
                            "#B5F6D0",
                            "#A3F4D6",
                            "#A9F7EB",
                            "#CAF1FE",
                            "#C1D8FE",
                            "#CDD3FE",
                            "#E4D4FE",
                            "#F7D0F8"
                        ]
                    },
                    "icon": {
                        "data": "fork.knife",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Tâm hồn cần trà sữa",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_4_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF007F",
                            "#FF00BA",
                            "#EF00EC",
                            "#B600FF",
                            "#860DFF",
                            "#691FFF",
                            "#2A1AFF",
                            "#0070FF",
                            "#00B3FF",
                            "#00E1F3",
                            "#00F8BE",
                            "#10FF66",
                            "#5DFF0E",
                            "#CBF800",
                            "#FFBF00",
                            "#FF4320"
                        ]
                    },
                    "icon": {
                        "data": "fork.knife",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Đói là không vui",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_4_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#76404C",
                            "#894956",
                            "#9B5461",
                            "#AB606E",
                            "#BA737B",
                            "#C38386",
                            "#CD8F94",
                            "#D7A1A0",
                            "#E2B4B0",
                            "#E9C0B8",
                            "#EECBC0",
                            "#F2D3C8",
                            "#F6DCD1",
                            "#FAE7DC",
                            "#FAE5DB",
                            "#CFA6A1"
                        ]
                    },
                    "icon": {
                        "data": "fork.knife",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Ăn ngon quên lối về",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_4_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B8F4E3",
                            "#C4F6EB",
                            "#D2F6F2",
                            "#D4F2F6",
                            "#CCE7FF",
                            "#D6E4FF",
                            "#D9D6FF",
                            "#E5D9FD",
                            "#F1D6F7",
                            "#F6DAF1",
                            "#FBDEEA",
                            "#FFE8E4",
                            "#FCF2D1",
                            "#F0F6D8",
                            "#E0F4DF",
                            "#CDF3E6"
                        ]
                    },
                    "icon": {
                        "data": "fork.knife",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Một chiếc bụng đói",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "💸 Tiền bạc & Cuộc sống",
        "items": [
            {
                "overlay_id": "caption:vinhdat_new_5_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEEF2",
                            "#FCE0F0",
                            "#F9CFEF",
                            "#F1D1FE",
                            "#E5D5FF",
                            "#D6D5FE",
                            "#CDD9FE",
                            "#DCECFE",
                            "#DBF4FE",
                            "#CEFAFA",
                            "#CDFBED",
                            "#D9FBDD",
                            "#F1F9CA",
                            "#FEF1CB",
                            "#FFEADA",
                            "#FFE8EA"
                        ]
                    },
                    "icon": {
                        "data": "banknote.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Ví mỏng nhưng đam mê dày",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_5_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F6A9E0",
                            "#E9AEFD",
                            "#D2B4FE",
                            "#BBB5FD",
                            "#A0B9FC",
                            "#8CC9FD",
                            "#76D9FB",
                            "#64E9EE",
                            "#63E9CB",
                            "#7FEBBE",
                            "#AEF3B0",
                            "#D1EE6F",
                            "#FDD983",
                            "#FDB386",
                            "#F7B3C7",
                            "#EEC8F2"
                        ]
                    },
                    "icon": {
                        "data": "banknote.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Lương về rồi lại đi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_5_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#033629",
                            "#06533E",
                            "#05664B",
                            "#04815C",
                            "#08A070",
                            "#1BC188",
                            "#32D3A4",
                            "#26CCB8",
                            "#10ACAA",
                            "#068DB8",
                            "#0C7AD2",
                            "#325AE9",
                            "#5550E9",
                            "#6A59F0",
                            "#8952F1",
                            "#766FB9"
                        ]
                    },
                    "icon": {
                        "data": "banknote.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Chưa giàu nhưng rất chill",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_5_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#5B21B6",
                            "#4C1D95",
                            "#4338CA",
                            "#3730A3",
                            "#31205D",
                            "#1E1B4B",
                            "#14112F",
                            "#09091F",
                            "#F0ABFC",
                            "#E879F9",
                            "#DB2777",
                            "#BE185D",
                            "#A21CAF",
                            "#9333EA",
                            "#7C3AED",
                            "#6D28D9"
                        ]
                    },
                    "icon": {
                        "data": "banknote.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Số dư không cho phép",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_5_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FAC3E2",
                            "#FAB2D1",
                            "#FECEC0",
                            "#FEDEB7",
                            "#FFEFD1",
                            "#FEEFB5",
                            "#F2EC90",
                            "#D0F8AC",
                            "#B5F6D0",
                            "#A3F4D6",
                            "#A9F7EC",
                            "#CAF1FE",
                            "#C1D8FE",
                            "#CED3FE",
                            "#E4D4FE",
                            "#F7D0F7"
                        ]
                    },
                    "icon": {
                        "data": "banknote.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Triệu phú trong giấc mơ",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🧸 Dễ thương & Nhõng nhẽo",
        "items": [
            {
                "overlay_id": "caption:vinhdat_new_6_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF007F",
                            "#FF00BA",
                            "#EF00ED",
                            "#B600FF",
                            "#860DFF",
                            "#681FFF",
                            "#291BFF",
                            "#0071FF",
                            "#00B3FF",
                            "#00E1F2",
                            "#00F8BD",
                            "#11FF65",
                            "#5EFF0E",
                            "#CCF800",
                            "#FFBD00",
                            "#FF4221"
                        ]
                    },
                    "icon": {
                        "data": "heart.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Hôm nay bé hơi ngoan",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_6_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#77404C",
                            "#894956",
                            "#9B5462",
                            "#AB616E",
                            "#BA737B",
                            "#C38386",
                            "#CD8F94",
                            "#D7A1A1",
                            "#E2B5B0",
                            "#E9C0B8",
                            "#EECBC0",
                            "#F2D3C8",
                            "#F6DCD1",
                            "#FAE7DD",
                            "#FAE4DB",
                            "#CEA49F"
                        ]
                    },
                    "icon": {
                        "data": "heart.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Một cục bông biết nói",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_6_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B8F4E3",
                            "#C4F6EB",
                            "#D2F6F2",
                            "#D4F2F7",
                            "#CCE7FF",
                            "#D6E4FF",
                            "#D9D6FF",
                            "#E5D9FD",
                            "#F1D6F7",
                            "#F6DAF1",
                            "#FBDEEA",
                            "#FFE8E4",
                            "#FCF2D1",
                            "#F0F6D8",
                            "#DFF4E0",
                            "#CDF3E6"
                        ]
                    },
                    "icon": {
                        "data": "heart.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Đừng chọc bé nha",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_6_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEEF2",
                            "#FCE0F0",
                            "#F9CFEF",
                            "#F1D2FE",
                            "#E5D5FF",
                            "#D6D5FE",
                            "#CDD9FE",
                            "#DDECFE",
                            "#DBF4FE",
                            "#CEFAFA",
                            "#CEFBED",
                            "#D9FBDD",
                            "#F2F9CA",
                            "#FEF1CB",
                            "#FFEADA",
                            "#FFE8EA"
                        ]
                    },
                    "icon": {
                        "data": "heart.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Em bé cần sạc pin",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_6_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F6A9E0",
                            "#E9AEFD",
                            "#D2B4FE",
                            "#BAB5FD",
                            "#9FB9FC",
                            "#8CC9FD",
                            "#76DAFB",
                            "#64E9EE",
                            "#63E9CB",
                            "#80EBBF",
                            "#AEF3AF",
                            "#D2EE70",
                            "#FDD883",
                            "#FDB386",
                            "#F7B3C8",
                            "#EEC7F2"
                        ]
                    },
                    "icon": {
                        "data": "heart.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Dỗi xíu thôi mà",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "✈️ Du lịch & Đi chơi",
        "items": [
            {
                "overlay_id": "caption:vinhdat_new_7_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#03372A",
                            "#06533E",
                            "#05674B",
                            "#04815D",
                            "#08A170",
                            "#1BC188",
                            "#32D3A5",
                            "#25CBB7",
                            "#10ACAA",
                            "#068DB9",
                            "#0D7AD2",
                            "#325AE9",
                            "#5550E9",
                            "#6B58F0",
                            "#8953F1",
                            "#746EB7"
                        ]
                    },
                    "icon": {
                        "data": "airplane",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Xách balo lên và đi",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_7_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#6D28D9",
                            "#5B21B6",
                            "#4C1D95",
                            "#4338CA",
                            "#3730A3",
                            "#31205D",
                            "#1E1B4B",
                            "#14112F",
                            "#09091F",
                            "#F0ABFC",
                            "#E879F9",
                            "#DB2777",
                            "#BE185D",
                            "#A21CAF",
                            "#9333EA",
                            "#7C3AED"
                        ]
                    },
                    "icon": {
                        "data": "airplane",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Đi trốn cùng nhau không?",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_7_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FAC3E2",
                            "#FBB3D1",
                            "#FECEC0",
                            "#FEDEB7",
                            "#FFEFD1",
                            "#FEEFB4",
                            "#F2EC90",
                            "#D0F8AD",
                            "#B5F6D0",
                            "#A3F4D6",
                            "#AAF7EC",
                            "#CAF0FE",
                            "#C1D8FE",
                            "#CED3FE",
                            "#E4D4FE",
                            "#F7D0F7"
                        ]
                    },
                    "icon": {
                        "data": "airplane",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Hẹn gặp ở chân trời",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_7_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF0080",
                            "#FF00BB",
                            "#EE00ED",
                            "#B500FF",
                            "#860EFF",
                            "#671EFF",
                            "#291CFF",
                            "#0071FF",
                            "#00B4FF",
                            "#00E2F2",
                            "#00F8BC",
                            "#12FF63",
                            "#60FF0E",
                            "#CDF700",
                            "#FFBC00",
                            "#FF4122"
                        ]
                    },
                    "icon": {
                        "data": "airplane",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Tạm biệt deadline",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_7_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#77404C",
                            "#8A4956",
                            "#9B5462",
                            "#AB616F",
                            "#BA747B",
                            "#C38386",
                            "#CD9094",
                            "#D7A1A1",
                            "#E2B5B0",
                            "#E9C0B8",
                            "#EECBC0",
                            "#F2D3C8",
                            "#F6DCD1",
                            "#FAE7DD",
                            "#FAE4DB",
                            "#CCA39E"
                        ]
                    },
                    "icon": {
                        "data": "airplane",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Mang thanh xuân đi chơi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🔥 Meme & Cà khịa",
        "items": [
            {
                "overlay_id": "caption:vinhdat_new_8_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B8F4E3",
                            "#C5F6EB",
                            "#D2F6F2",
                            "#D4F2F7",
                            "#CCE8FF",
                            "#D6E4FF",
                            "#D9D6FF",
                            "#E6D8FD",
                            "#F2D7F7",
                            "#F7DAF1",
                            "#FCDEEA",
                            "#FFE8E3",
                            "#FCF2D1",
                            "#EFF6D9",
                            "#DFF4E0",
                            "#CCF3E6"
                        ]
                    },
                    "icon": {
                        "data": "flame.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Đừng hỏi, tôi cũng không biết",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_8_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEEF2",
                            "#FCDFEF",
                            "#F9CFEF",
                            "#F1D2FE",
                            "#E5D5FF",
                            "#D6D5FE",
                            "#CDDAFE",
                            "#DDEDFE",
                            "#DBF5FE",
                            "#CEFAFA",
                            "#CEFBED",
                            "#DAFBDD",
                            "#F2F9CA",
                            "#FEF1CB",
                            "#FFEADA",
                            "#FFE8EA"
                        ]
                    },
                    "icon": {
                        "data": "flame.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Nhìn vậy thôi chứ mệt lắm",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_8_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F6A9E1",
                            "#E8AEFD",
                            "#D2B4FE",
                            "#BAB5FD",
                            "#9FB9FC",
                            "#8CC9FD",
                            "#76DAFB",
                            "#64E9ED",
                            "#63E9CB",
                            "#80EBBF",
                            "#AEF3AD",
                            "#D2EE70",
                            "#FDD883",
                            "#FDB387",
                            "#F7B4C9",
                            "#EEC7F1"
                        ]
                    },
                    "icon": {
                        "data": "flame.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Ủa rồi ai hỏi?",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_8_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#03372A",
                            "#06533F",
                            "#05674B",
                            "#04825D",
                            "#09A171",
                            "#1CC189",
                            "#32D3A5",
                            "#25CBB7",
                            "#10ABAA",
                            "#068DB9",
                            "#0D79D3",
                            "#325AE9",
                            "#5550E9",
                            "#6B58F0",
                            "#8A54F1",
                            "#726DB5"
                        ]
                    },
                    "icon": {
                        "data": "flame.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Tỉnh táo nhưng không nhiều",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_8_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#7C3AED",
                            "#6D28D9",
                            "#5B21B6",
                            "#4C1D95",
                            "#4338CA",
                            "#3730A3",
                            "#31205D",
                            "#1E1B4B",
                            "#14112F",
                            "#09091F",
                            "#F0ABFC",
                            "#E879F9",
                            "#DB2777",
                            "#BE185D",
                            "#A21CAF",
                            "#9333EA"
                        ]
                    },
                    "icon": {
                        "data": "flame.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 3,
                    "text": "Mọi thứ trong tầm kiểm soát (chắc vậy)",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎵 Ngôn ngữ vui nhộn VINHDAT",
        "items": [
            {
                "overlay_id": "caption:vinhdat_chanchan_01",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FAC2E2",
                            "#FBB3D1",
                            "#FECEC0",
                            "#FEDEB8",
                            "#FFEFD1",
                            "#FEEFB3",
                            "#F1EC90",
                            "#CFF8AD",
                            "#B5F6D0",
                            "#A3F4D6",
                            "#AAF7EC",
                            "#CAF0FE",
                            "#C2D8FE",
                            "#CED3FE",
                            "#E5D4FE",
                            "#F7D0F7"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 3,
                    "text": "chan chan chan chan, chan du bái",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_02",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FF0081",
                            "#FF00BC",
                            "#ED00ED",
                            "#B400FF",
                            "#860EFF",
                            "#661EFF",
                            "#281DFF",
                            "#0072FF",
                            "#00B4FF",
                            "#00E2F1",
                            "#00F8BB",
                            "#12FF62",
                            "#61FF0E",
                            "#CDF700",
                            "#FFBA00",
                            "#FF4023"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "lịu lịu lịu lịu, lịu chư sa",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_03",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#77414C",
                            "#8A4A57",
                            "#9B5462",
                            "#AB616F",
                            "#BA747C",
                            "#C48486",
                            "#CE9094",
                            "#D7A1A1",
                            "#E2B5B0",
                            "#E9C1B8",
                            "#EECBC0",
                            "#F2D4C8",
                            "#F6DDD2",
                            "#FAE7DD",
                            "#FAE4DA",
                            "#CBA19D"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "anh dắc e đi ăng kem",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_04",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B9F4E3",
                            "#C5F6EC",
                            "#D2F6F2",
                            "#D4F2F7",
                            "#CCE8FF",
                            "#D6E4FF",
                            "#DAD6FF",
                            "#E6D8FD",
                            "#F2D7F7",
                            "#F7DAF0",
                            "#FCDEEA",
                            "#FFE9E3",
                            "#FCF2D1",
                            "#EFF6D9",
                            "#DFF4E0",
                            "#CCF3E5"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "ăm chả húi",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_05",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FEEEF2",
                            "#FCDFEF",
                            "#F9CFEF",
                            "#F1D2FE",
                            "#E5D5FF",
                            "#D6D5FE",
                            "#CEDAFE",
                            "#DDEDFE",
                            "#DAF5FE",
                            "#CEFAFA",
                            "#CEFBED",
                            "#DAFBDC",
                            "#F2F9CA",
                            "#FEF1CC",
                            "#FFEADB",
                            "#FFE8EA"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "bà chả hơm",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_06",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F6A9E1",
                            "#E8AEFD",
                            "#D1B4FE",
                            "#BAB5FD",
                            "#9FBAFC",
                            "#8CCAFD",
                            "#76DAFB",
                            "#64E9ED",
                            "#63E9CA",
                            "#81EBBF",
                            "#AFF3AC",
                            "#D3EE71",
                            "#FDD783",
                            "#FDB388",
                            "#F6B4CA",
                            "#EEC6F1"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "ăm chả hơm",
                    "text_color": "#241A33",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_07",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#03372A",
                            "#06543F",
                            "#05674C",
                            "#04825D",
                            "#09A271",
                            "#1CC289",
                            "#32D3A6",
                            "#25CBB7",
                            "#10ABAA",
                            "#068DB9",
                            "#0E79D3",
                            "#3359E9",
                            "#5651E9",
                            "#6B57F0",
                            "#8A55F1",
                            "#706BB2"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "bà chả húi",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_08",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#9333EA",
                            "#7C3AED",
                            "#6D28D9",
                            "#5B21B6",
                            "#4C1D95",
                            "#4338CA",
                            "#3730A3",
                            "#31205D",
                            "#1E1B4B",
                            "#14112F",
                            "#09091F",
                            "#F0ABFC",
                            "#E879F9",
                            "#DB2777",
                            "#BE185D",
                            "#A21CAF"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "làm riết nhiều cái thấy mệt ghê",
                    "text_color": "#FFFDFE",
                    "type": "static_content"
                }
            }
        ]
    }
]
        )
    });
}

$done({ body: JSON.stringify(obj) });
