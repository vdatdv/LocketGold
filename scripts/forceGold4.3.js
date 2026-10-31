
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
                            "#F1E4E5",
                            "#F3ECDD",
                            "#EAEFD7"
                        ]
                    },
                    "icon": {
                        "data": "🥺",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "em nhớ anhh",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nho_anh_phien",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EAF6EB",
                            "#DDEEE7",
                            "#EEF1F6"
                        ]
                    },
                    "icon": {
                        "data": "🥺",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "nhớ anh tới mức hơi phiền",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:i_love_you",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F3ECF8",
                            "#F5E5F2",
                            "#EFDCDC"
                        ]
                    },
                    "icon": {
                        "data": "💗",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "i love you",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:yeu_cuc_dang",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EFEEE1",
                            "#E6EEDD",
                            "#E2F3E7"
                        ]
                    },
                    "icon": {
                        "data": "🎀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "yêu cục dàng",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:yeu_emmm",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E3EDF2",
                            "#E2E2F4",
                            "#F7F1F9"
                        ]
                    },
                    "icon": {
                        "data": "💗",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Yeu Emmm",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:yeu_anhhh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F6EFF2",
                            "#F2EAE8",
                            "#ECEBDF"
                        ]
                    },
                    "icon": {
                        "data": "🫶",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Yeu Anhhh",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:baby_love",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0F5EB",
                            "#E5F6EA",
                            "#EBF5F3"
                        ]
                    },
                    "icon": {
                        "data": "🧸",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Baby Love 💖",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cho_hun_mieng",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DDDBEB",
                            "#F7F0F9",
                            "#F5E5EB"
                        ]
                    },
                    "icon": {
                        "data": "😘",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "cho hun miếng coi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:me_anh_me_ngu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EEE0DD",
                            "#F3F5E5",
                            "#ECF3E2"
                        ]
                    },
                    "icon": {
                        "data": "💤",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "mê anh hơn mê ngủ",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:be_be_can_do",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EEF6F3",
                            "#DEEBED",
                            "#E9EBF7"
                        ]
                    },
                    "icon": {
                        "data": "🎀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "em bé cần được dỗ",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:iu_thi_noi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7ECF8",
                            "#F5EBF0",
                            "#EBE7DB"
                        ]
                    },
                    "icon": {
                        "data": "🤭",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "iu thì nói, đừng có ngại",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:iu_hong_thi_bao",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F2F2E8",
                            "#EEF4EC",
                            "#E8F7F6"
                        ]
                    },
                    "icon": {
                        "data": "🎀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "iu hong thì bảo",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:anh_thuong_em",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DBDEEB",
                            "#E4E1F4",
                            "#EFD7E2"
                        ]
                    },
                    "icon": {
                        "data": "🥹",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "anh có thương em thiệt hong",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:yeu_em_nhiem_vu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F4E1E5",
                            "#F3EDE7",
                            "#F4F8F1"
                        ]
                    },
                    "icon": {
                        "data": "🫡",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "yêu em là nhiệm vụ cả đời",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:crush_nhin",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E4F2E4",
                            "#E6F5F4",
                            "#DEE4F2"
                        ]
                    },
                    "icon": {
                        "data": "🫠",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "crush nhìn em một cái là xong",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ngoai_le_cua_em",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EDE5F6",
                            "#F5E5F5",
                            "#F4EAE6"
                        ]
                    },
                    "icon": {
                        "data": "🫶",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "anh là ngoại lệ của em",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:minh_cuoi_nhau",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F4EFEB",
                            "#EFEAD7",
                            "#E6F4EC"
                        ]
                    },
                    "icon": {
                        "data": "💍",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "hông ấy mình cưới nhau đi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tuong_love_hoa_ra_lop",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E9F7F7",
                            "#E9EEF7",
                            "#EAE0F1"
                        ]
                    },
                    "icon": {
                        "data": "❤️‍🩹",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tưởng love hoá ra lốp",
                    "text_color": "#443951",
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
                            "#EADCE6",
                            "#F0D6D8",
                            "#F6F2EE"
                        ]
                    },
                    "icon": {
                        "data": "🎀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Hello Kitty đáng iu",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#ECF3E7",
                            "#E9F7ED",
                            "#E0F0EC"
                        ]
                    },
                    "icon": {
                        "data": "🖍️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Shin Cậu Bé Bút Chì",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DAE4F1",
                            "#EDEBF4",
                            "#F6E5F4"
                        ]
                    },
                    "icon": {
                        "data": "🍫",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Bánh Chocobi số zách",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F2ECE9",
                            "#F8F8EC",
                            "#F3F8EC"
                        ]
                    },
                    "icon": {
                        "data": "🦸",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Siêu Nhân Hành Động",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DBEBE0",
                            "#E7F1F4",
                            "#E8E9F2"
                        ]
                    },
                    "icon": {
                        "data": "🍑",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Anh Hùng Mông Căng",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_6",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F6EFF6",
                            "#F6EEF3",
                            "#F6F2EF"
                        ]
                    },
                    "icon": {
                        "data": "☁️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cinnamoroll tai dài",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_7",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F4F4EB",
                            "#E7EDD9",
                            "#DAECE7"
                        ]
                    },
                    "icon": {
                        "data": "🖤",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Kuromi siêu ngầu",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_8",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E1E9EF",
                            "#E1E4EF",
                            "#EDE6F4"
                        ]
                    },
                    "icon": {
                        "data": "🍓",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "My Melody ngọt ngào",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_9",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F2DEE2",
                            "#EFD7D7",
                            "#F3F7EE"
                        ]
                    },
                    "icon": {
                        "data": "🐸",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Keroppi nhí nhảnh",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_10",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DFECDF",
                            "#E1EFE8",
                            "#DFEBF1"
                        ]
                    },
                    "icon": {
                        "data": "🐕",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Bạch Tuyết ngoan ngoãn",
                    "text_color": "#443951",
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
                            "#EFECF4",
                            "#F3E6F4",
                            "#EEDEDD"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Locket xác nhận bạn cutii",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EFE0D7",
                            "#EEE7D8",
                            "#EBF4E1"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Locket xác nhận bạn xjnh gái",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DBEAEB",
                            "#F1F4F8",
                            "#EEEDF7"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Locket xác nhận bạn đẹp choa",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EBDBEA",
                            "#EFD7DC",
                            "#F7F2EE"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Locket xác nhận bạn đangiu vc",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EBF1E4",
                            "#ECF8F1",
                            "#E5F5F5"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Đã xác minh bạn là gái đẹp",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_6",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E5EEF5",
                            "#E8E1F4",
                            "#E9DEED"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Đã xác minh bạn là trai đẹp",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_7",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EFE1E3",
                            "#F9F7F1",
                            "#F3F3E7"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Đã xác nhận bạn là bé ngoann",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_8",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F2F8F2",
                            "#EAF5F2",
                            "#E6EBF4"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Locket tuyên dương bạn cute",
                    "text_color": "#443951",
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
                            "#ECE4F1",
                            "#EEDDEC",
                            "#F9F0F1"
                        ]
                    },
                    "text_color": "#443951"
                }
            },
            {
                "overlay_id": "caption:review",
                "source": "local",
                "caption": {
                    "type": "review",
                    "background": {
                        "colors": [
                            "#EEEEE2",
                            "#E5F3E2",
                            "#DCEFE5"
                        ]
                    },
                    "text_color": "#443951"
                }
            },
            {
                "overlay_id": "caption:music",
                "source": "local",
                "caption": {
                    "type": "music",
                    "background": {
                        "colors": [
                            "#F1F7F9",
                            "#E9EDF7",
                            "#F8F1F7"
                        ]
                    },
                    "text_color": "#443951"
                }
            },
            {
                "overlay_id": "caption:location",
                "source": "local",
                "caption": {
                    "type": "location",
                    "background": {
                        "colors": [
                            "#F7EEF4",
                            "#F4E2E1",
                            "#F6F5EE"
                        ]
                    },
                    "text_color": "#443951"
                }
            },
            {
                "overlay_id": "caption:weather",
                "source": "local",
                "caption": {
                    "type": "weather",
                    "background": {
                        "colors": [
                            "#EFF7E8",
                            "#E8F3EC",
                            "#F2F7F8"
                        ]
                    },
                    "text_color": "#443951"
                }
            },
            {
                "overlay_id": "caption:time",
                "source": "local",
                "caption": {
                    "type": "time",
                    "background": {
                        "colors": [
                            "#F2F2F8",
                            "#EAE2F3",
                            "#F3E4E2"
                        ]
                    },
                    "text_color": "#443951"
                }
            },
            {
                "overlay_id": "caption:streak",
                "source": "local",
                "caption": {
                    "type": "streak",
                    "background": {
                        "colors": [
                            "#F1DCDA",
                            "#F8F5F1",
                            "#ECF5EA"
                        ]
                    },
                    "text_color": "#443951"
                }
            },
            {
                "overlay_id": "caption:star_sign",
                "source": "local",
                "caption": {
                    "type": "star_sign",
                    "background": {
                        "colors": [
                            "#F2F8F5",
                            "#F0F8F9",
                            "#DCDAEC"
                        ]
                    },
                    "text_color": "#443951"
                }
            },
            {
                "overlay_id": "caption:poll",
                "source": "local",
                "caption": {
                    "type": "poll",
                    "background": {
                        "colors": [
                            "#F3EFF6",
                            "#F4E6F4",
                            "#F7EEF0"
                        ]
                    },
                    "text_color": "#443951"
                }
            },
            {
                "overlay_id": "caption:color_palette",
                "source": "local",
                "caption": {
                    "type": "color_palette",
                    "background": {
                        "colors": [
                            "#F8F9F1",
                            "#DDEFD7",
                            "#E1F4EF"
                        ]
                    },
                    "text_color": "#443951"
                }
            },
            {
                "overlay_id": "caption:locket_count",
                "source": "local",
                "caption": {
                    "type": "locket_count",
                    "background": {
                        "colors": [
                            "#E1EDF4",
                            "#ECEEF8",
                            "#EBE4F1"
                        ]
                    },
                    "text_color": "#443951"
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
                            "#F4E1E9",
                            "#F2E6E3",
                            "#F5F9F0"
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
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:autumn_2026",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DBEBDE",
                            "#E1F4F2",
                            "#E1E6EF"
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
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:christmas_eve_2026",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E7E3F3",
                            "#F4ECF3",
                            "#F5EBEA"
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
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:new_years_eve_2026",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7F0ED",
                            "#EFEDE1",
                            "#E6F4E9"
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
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:new_years_day_2027_alternate",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E2F4ED",
                            "#EAF3F5",
                            "#E7E5F0"
                        ]
                    },
                    "max_lines": 2,
                    "text": "2027",
                    "text_color": "#443951",
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
                            "#EFDCED",
                            "#F0E0E6",
                            "#F9F5F1"
                        ]
                    },
                    "max_lines": 2,
                    "text": "보고 싶어 🥺",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:party_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EEF4E7",
                            "#EDF7EF",
                            "#DAE6EC"
                        ]
                    },
                    "icon": {
                        "data": "🪩",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Party Time!",
                    "text_color": "#443951",
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
                            "#E3E5F3",
                            "#E5E1F4",
                            "#F3E7F2"
                        ]
                    },
                    "icon": {
                        "data": "☀️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Good morning",
                    "text_color": "#443951",
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
                            "#F3E7E8",
                            "#F0E8E5",
                            "#EAF2E8"
                        ]
                    },
                    "icon": {
                        "data": "🌙",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Goodnight",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ootd",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DCEFE0",
                            "#DEF0F2",
                            "#E5EDF5"
                        ]
                    },
                    "icon": {
                        "data": "🕶",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "OOTD",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:miss_you",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F2E9F6",
                            "#F2DEF0",
                            "#FAF0F1"
                        ]
                    },
                    "icon": {
                        "data": "🥰",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Miss you",
                    "text_color": "#443951",
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
                            "#F7F6E8",
                            "#E0EDD9",
                            "#DEEDE4"
                        ]
                    },
                    "max_lines": 2,
                    "text": "⚡ dth24/7",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:feeling_cute",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DEF1F2",
                            "#EAEDF6",
                            "#EEDBF0"
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
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F1DFE4",
                            "#EBDDDB",
                            "#F5F7ED"
                        ]
                    },
                    "max_lines": 2,
                    "text": "Cu 🐎",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tuat",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E0EDDE",
                            "#E9F6F4",
                            "#F0F6FA"
                        ]
                    },
                    "icon": {
                        "data": "🐕",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tuất",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:wedding_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E6DDF3",
                            "#F1E4EF",
                            "#EDDEE6"
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
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cam_thay_hanh_phuc",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F5F1EA",
                            "#F6F5E5",
                            "#E5F1E4"
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
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:coffee_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0F9F7",
                            "#E5F3F6",
                            "#DCDBF0"
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
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:snake_vibes",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0DBF0",
                            "#F4EBEF",
                            "#F8F4ED"
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
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:mixue_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F2F5E5",
                            "#E8F3E8",
                            "#E2F3F1"
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
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:locket_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E6EEF4",
                            "#DBE0F0",
                            "#F3E5F5"
                        ]
                    },
                    "icon": {
                        "data": "📷",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Locket Time!",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cinema_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0E5E7",
                            "#F0E5E0",
                            "#F6F8F2"
                        ]
                    },
                    "icon": {
                        "data": "🎬",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cinema Time!",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:dating_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E1F0E0",
                            "#F0FAF6",
                            "#F1F2F9"
                        ]
                    },
                    "icon": {
                        "data": "💕",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Dating Time!",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:graduation_day",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EAE4F1",
                            "#F4E7EE",
                            "#F6EAE9"
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
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:shopping_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F4EBE1",
                            "#F1F6EA",
                            "#F2F9F1"
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
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:dinner_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DEEDEA",
                            "#E4ECF1",
                            "#E4E5F1"
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
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:chilling_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F1DFEC",
                            "#EFE1E6",
                            "#EDE9D9"
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
                    "text_color": "#443951",
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
                            "#E2EEDD",
                            "#EBF4EE",
                            "#EEF7F5"
                        ]
                    },
                    "icon": {
                        "data": "🕯️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Xin vĩnh biệt cụ",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:chay_ngay_di",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DCDFEA",
                            "#F0EDF7",
                            "#EDD9EC"
                        ]
                    },
                    "icon": {
                        "data": "🏃💨",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Chạy ngay đi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:luc_nao_co_tien_thi_moi_di_a",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F8F3F1",
                            "#F8F5F2",
                            "#E5F0E6"
                        ]
                    },
                    "icon": {
                        "data": "💸",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Lúc nào có tiền thì mới đi á",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cu_tu_tu_khoai_se_nhu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DEEDE7",
                            "#F2F6F8",
                            "#DDDFF3"
                        ]
                    },
                    "icon": {
                        "data": "🥔",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cứ từ từ khoai sẽ nhừ",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:kiem_tra_nhan_pham",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E7DBEB",
                            "#F4E1E6",
                            "#EFE6E1"
                        ]
                    },
                    "icon": {
                        "data": "🎲",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Kiểm tra nhân phẩm",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:doc_so_tai_khoan",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F1EFE4",
                            "#F5F8F2",
                            "#E2F3E9"
                        ]
                    },
                    "icon": {
                        "data": "💳",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Đọc số tài khoản đi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ai_so_thi_di_ve",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E8EEF3",
                            "#EAE5F5",
                            "#F1DFED"
                        ]
                    },
                    "icon": {
                        "data": "🏃",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "ai sợ thì đi về",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:con_cai_nit",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EED8DF",
                            "#F3EBE2",
                            "#EEF6E9"
                        ]
                    },
                    "icon": {
                        "data": "🧶",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "còn cái nịt",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:canh_bao_co_hat",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DEF0DB",
                            "#E9F7EA",
                            "#D9F2F2"
                        ]
                    },
                    "icon": {
                        "data": "🎤",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "cảnh báo có hát",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:than_chua_ma_don",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E0D7EF",
                            "#F5E5F1",
                            "#ECDAE2"
                        ]
                    },
                    "icon": {
                        "data": "😔",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Thân chưa mà dỡn",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ai_muon",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0E6E0",
                            "#F4F5EA",
                            "#F3F8F1"
                        ]
                    },
                    "icon": {
                        "data": "🤔",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Ai mượn?",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:hay_ra_de_qua_a",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#D8EEE6",
                            "#E7ECF3",
                            "#E7E0F0"
                        ]
                    },
                    "icon": {
                        "data": "🥺",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Hay ra dẻ quá à!",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:giam_suc_manh_con_tuong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F1E3F2",
                            "#F0E0EA",
                            "#F4EAE1"
                        ]
                    },
                    "icon": {
                        "data": "🎮",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Giảm sức mạnh con tướng",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:mac_co_qua_hai_oi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EEF3E8",
                            "#E3F1DF",
                            "#E2EDEE"
                        ]
                    },
                    "icon": {
                        "data": "😭",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Mắc cỡ quá hai ơi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:minh_la_lop",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F2F4F7",
                            "#E4D5F0",
                            "#F4E6F1"
                        ]
                    },
                    "icon": {
                        "data": "🛞",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Mình là lốp",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:dep_trai_co_gi_sai",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7E9E9",
                            "#FAF3F0",
                            "#DFEFD7"
                        ]
                    },
                    "icon": {
                        "data": "😎",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Đẹp trai có gì sai",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:mong_ton_hoa_sen",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DAECE1",
                            "#F0F9F8",
                            "#E9E7F3"
                        ]
                    },
                    "icon": {
                        "data": "🪷",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Mong tôn hoa sen thấy cảnh này",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:dam_nhau_khong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E5DCEF",
                            "#F3E2EC",
                            "#F6ECE5"
                        ]
                    },
                    "icon": {
                        "data": "🥊",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "đấm nhau không",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:sieu_cap_ba_khi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F4F2E6",
                            "#ECF5E5",
                            "#DFF1E5"
                        ]
                    },
                    "icon": {
                        "data": "🐉",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "siêu cấp bá khí",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:du_an_ma",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#ECF6F8",
                            "#DADEEC",
                            "#EDDEF2"
                        ]
                    },
                    "icon": {
                        "data": "👻",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "dự án ma",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:doi_roi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7EDF1",
                            "#F2DFDE",
                            "#F0EADB"
                        ]
                    },
                    "icon": {
                        "data": "😤",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Dỗi rồi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:dang_ban_tuong_tu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DBEDD9",
                            "#DDF3E0",
                            "#D6EBF0"
                        ]
                    },
                    "icon": {
                        "data": "💭",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Đang bận tương tư",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:mo_hon_nhung_tam_hien",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DEDEED",
                            "#F0EBF4",
                            "#F6EEF1"
                        ]
                    },
                    "icon": {
                        "data": "🐤",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Mỏ hỗn nhưng tâm hiền",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:muon_duoc_om",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F3E8E2",
                            "#F5F4EA",
                            "#E9F1E4"
                        ]
                    },
                    "icon": {
                        "data": "🫂",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Muốn được ôm",
                    "text_color": "#443951",
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
                            "#DCEFEA",
                            "#EFF4F6",
                            "#D8D6F0"
                        ]
                    },
                    "icon": {
                        "data": "🌧️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Hồi chiều trời mưa...",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:con_vien_la_lan",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F6EFF4",
                            "#F8F2F2",
                            "#F4EDE1"
                        ]
                    },
                    "icon": {
                        "data": "🍂",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "côn viên lá làn",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:gian_dang_iu_hong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F5F6EF",
                            "#E7F0E5",
                            "#E9F6F6"
                        ]
                    },
                    "icon": {
                        "data": "🪳",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Gián đáng iu hong",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nau_xoi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EDF2F7",
                            "#E5E2EE",
                            "#F4E7F1"
                        ]
                    },
                    "icon": {
                        "data": "🙀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Nấu xói",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:co_tien_lam_phien_thien_ha",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0DBDC",
                            "#F7F3E9",
                            "#F0F1DF"
                        ]
                    },
                    "icon": {
                        "data": "💰",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Có tiền làm phiền thiên hạ",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nguoi_im_lang_gap_nguoi_hay_noi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EDF8ED",
                            "#EBF4F4",
                            "#F0F7FA"
                        ]
                    },
                    "icon": {
                        "data": "🤐",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Người im lặng gặp người hay nói",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:roi_let_luon",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F4F1F9",
                            "#FAF0F8",
                            "#F4E5E1"
                        ]
                    },
                    "icon": {
                        "data": "💅",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "rồi lét luôn",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:roi_gay_luon",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0E7E0",
                            "#F8F7F1",
                            "#E5F6E6"
                        ]
                    },
                    "icon": {
                        "data": "🌈",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "rồi gay luôn",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tuyet_doi_khong_nghe",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EEF6F6",
                            "#DDE8EE",
                            "#F1EBF4"
                        ]
                    },
                    "icon": {
                        "data": "🙉",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tuyệt đối không nghe",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cha_nay_tu_luyen_ghe",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F3DDF0",
                            "#EFDCE1",
                            "#F1E5DA"
                        ]
                    },
                    "icon": {
                        "data": "🪞",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cha này tự luyến ghê",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:co_bien_co_bien",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EAF0E5",
                            "#DDEEE3",
                            "#D9EDE7"
                        ]
                    },
                    "icon": {
                        "data": "🚨",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Có biến có biến",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:hong_drama",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DDE1F3",
                            "#E3DFF1",
                            "#F3E2EB"
                        ]
                    },
                    "icon": {
                        "data": "🍿",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Hóng drama",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cuoi_vcl_m_oi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F3E4E3",
                            "#F6F8ED",
                            "#F4F7EE"
                        ]
                    },
                    "icon": {
                        "data": "😂",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cười vcl m oi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vl_m_oi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DDEEE1",
                            "#E3F2F1",
                            "#D8DCEE"
                        ]
                    },
                    "icon": {
                        "data": "😳",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "vl m ơi?",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:noi_het_bi_mat_thi_co_yeu_hong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EAE1F4",
                            "#EEE2ED",
                            "#ECDFDA"
                        ]
                    },
                    "icon": {
                        "data": "🤫",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Nói hết bị mật thì có yêu hong",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:flex_den_hoi_tho_cuoi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F3F2E8",
                            "#F5F9F1",
                            "#E9F2EF"
                        ]
                    },
                    "icon": {
                        "data": "💎",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Flex đến hơi thở cuối",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:overthinking_vai_chuong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E9F2F6",
                            "#DEDDEE",
                            "#F4E1EF"
                        ]
                    },
                    "icon": {
                        "data": "🤯",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Overthinking vai chưởng",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:chan_bo_may_di",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#ECDFE6",
                            "#EEDDE0",
                            "#EBF0D6"
                        ]
                    },
                    "icon": {
                        "data": "🙄",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Chan bố mày đi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:oach_xa_lach",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E1EDDE",
                            "#DFF1EA",
                            "#EDF3F8"
                        ]
                    },
                    "icon": {
                        "data": "🥬",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "oách xà lách",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:lai_phai_lo",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EEEBF4",
                            "#F7EEF6",
                            "#F4E6E9"
                        ]
                    },
                    "icon": {
                        "data": "💔",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "lại phải lọ",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ua_alo_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F5EEEB",
                            "#F8F5ED",
                            "#E7F3DD"
                        ]
                    },
                    "icon": {
                        "data": "📞",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Ủa alo",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ke_chuyen_nghe_choi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F2F8F6",
                            "#D5E9F0",
                            "#EFEEF6"
                        ]
                    },
                    "icon": {
                        "data": "🍿",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Kể chuyện nghe chơi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:hom_nay_toi_buon",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EADEED",
                            "#EEDDE9",
                            "#EFEAE1"
                        ]
                    },
                    "icon": {
                        "data": "🥀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "hôm nay tôi buồn",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:xinh_dep_tuyet_voi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F2F6EA",
                            "#E8F1E4",
                            "#EAF6F1"
                        ]
                    },
                    "icon": {
                        "data": "💅",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Xinh đẹp tuyệt vời",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tram_cam_nhe",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E9F0F7",
                            "#EEECF8",
                            "#F2D9EE"
                        ]
                    },
                    "icon": {
                        "data": "🫠",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Trầm cảm nhẹ",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:chua_du_wow",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F5EBED",
                            "#F0E1D6",
                            "#F1F0DF"
                        ]
                    },
                    "icon": {
                        "data": "⭐",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Chưa đủ wow",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:boc_trung_sit_rit",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DAECDB",
                            "#D8EEEC",
                            "#DEE0ED"
                        ]
                    },
                    "icon": {
                        "data": "🎁",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Bóc trúng sít rịt",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:hen_lam_moi_xui_duoc_vay_a",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F4F0FA",
                            "#F6EEF4",
                            "#EDDEE3"
                        ]
                    },
                    "icon": {
                        "data": "😅",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Hèn lắm mới xui được vậy á",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ra_duong_ne_moi_anh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EDE6D9",
                            "#EEF6E5",
                            "#EFF6F1"
                        ]
                    },
                    "icon": {
                        "data": "👤",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Ra đường nể mỗi anh",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cung_cung_di",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F2F8F7",
                            "#DEE3F2",
                            "#EFE1F4"
                        ]
                    },
                    "icon": {
                        "data": "🚀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cũng cứng đi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tuyet_doi_dien_anh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F6E9EF",
                            "#ECDDD9",
                            "#F1F3E7"
                        ]
                    },
                    "icon": {
                        "data": "📷",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tuyệt đối điện ảnh",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:du_ba_khi_chua",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EDF3E3",
                            "#E1ECDF",
                            "#ECF3F4"
                        ]
                    },
                    "icon": {
                        "data": "⚡",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Đủ bá khí chưa",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cai_gi_vay_troi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#D7DDEE",
                            "#DDDAF1",
                            "#F8F1F4"
                        ]
                    },
                    "icon": {
                        "data": "❗",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cái gì vậy trời",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nay_la_het_cuu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EBE2DB",
                            "#F4F4E1",
                            "#F2F8ED"
                        ]
                    },
                    "icon": {
                        "data": "❌",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Này là hết cứu",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:qua_la_dien_anh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E9F6EE",
                            "#D9EDE5",
                            "#D6D9F0"
                        ]
                    },
                    "icon": {
                        "data": "📷",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Quá là điện ảnh",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_2_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EDDEEC",
                            "#EEE2E4",
                            "#F6EEEA"
                        ]
                    },
                    "icon": {
                        "data": "🚀",
                        "type": "emoji"
                    },
                    "max_lines": 3,
                    "text": "Đỉnh nóc kịch trần bay phấp phới",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_2_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F1F4E6",
                            "#EFF7EE",
                            "#DAE9EC"
                        ]
                    },
                    "icon": {
                        "data": "🏆",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Mãi đỉnh mãi đỉnh",
                    "text_color": "#443951",
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
                            "#D7E5EF",
                            "#E8E8F3",
                            "#F2E6F4"
                        ]
                    },
                    "icon": {
                        "data": "🗡️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Hảo hán",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cam_lanh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F6EFF0",
                            "#F1E5DF",
                            "#E6F0E0"
                        ]
                    },
                    "icon": {
                        "data": "🤧",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cảm lạnh",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:bat_luc",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E3F2E7",
                            "#EEF6F5",
                            "#DDE6EE"
                        ]
                    },
                    "icon": {
                        "data": "🏳️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Bất lực",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:xin_lui_duoc_chua",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F1EDF8",
                            "#EBDBE9",
                            "#EFDDDC"
                        ]
                    },
                    "icon": {
                        "data": "🥺",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Xin lũi được chưa",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:rot_nuoc_mat",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F5F0EB",
                            "#E9EDD9",
                            "#EEF5EB"
                        ]
                    },
                    "icon": {
                        "data": "😭",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Rớt nước mắt",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:guc_nga",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DEF2F2",
                            "#E0E9F1",
                            "#F4F1F8"
                        ]
                    },
                    "icon": {
                        "data": "📉",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Gục ngã",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tien_dinh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0D6ED",
                            "#F8ECF2",
                            "#F9F8F0"
                        ]
                    },
                    "icon": {
                        "data": "🌪️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tiền đình",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:che_manh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E8EEDD",
                            "#EEF5EA",
                            "#EDF8F5"
                        ]
                    },
                    "icon": {
                        "data": "👎",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Chê mạnh",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:xinh_gai_an_phim_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EBEFF4",
                            "#E3E2F3",
                            "#F3E2F1"
                        ]
                    },
                    "icon": {
                        "data": "💅",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Xinh gái ấn phím 1",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:di_lam_vi_dam_me",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F6E8E5",
                            "#EDE6DE",
                            "#E8F4E7"
                        ]
                    },
                    "icon": {
                        "data": "🤡",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Đi làm vì đam mê",
                    "text_color": "#443951",
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
                            "#DEEDE3",
                            "#E8F2F1",
                            "#E2E4EE"
                        ]
                    },
                    "icon": {
                        "data": "😎",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cười xỉu",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:toang_that_roi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E9D6F0",
                            "#F7EDF2",
                            "#ECE5DA"
                        ]
                    },
                    "icon": {
                        "data": "🐉",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Toang thật rồi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:toi_roi_toi_roi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0EEE0",
                            "#F4F8F2",
                            "#EFF6EF"
                        ]
                    },
                    "icon": {
                        "data": "❗",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tới rồi tới rồi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:khong_the_tin_noi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E3ECF3",
                            "#D9DAED",
                            "#F0E7F4"
                        ]
                    },
                    "icon": {
                        "data": "❓",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Không thể tin nổi",
                    "text_color": "#443951",
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
                            "#F5EAF0",
                            "#F2E5DE",
                            "#F3F2E2"
                        ]
                    },
                    "icon": {
                        "data": "☀️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Ngày mới vui vẻ",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ngu_ngon",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0FAF0",
                            "#EAF6F0",
                            "#DEE2ED"
                        ]
                    },
                    "icon": {
                        "data": "🌙",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Ngủ ngon",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:an_com_chua",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E6E2EE",
                            "#F7E9F4",
                            "#F7EEF1"
                        ]
                    },
                    "icon": {
                        "data": "🍽️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Ăn cơm chưa?",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:di_choi_khong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F6EFEF",
                            "#EFEBDC",
                            "#F1F6EE"
                        ]
                    },
                    "icon": {
                        "data": "✈️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Đi chơi không?",
                    "text_color": "#443951",
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
                            "#D6F0E8",
                            "#EFF6F6",
                            "#E5D9F2"
                        ]
                    },
                    "icon": {
                        "data": "✨",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tinh hoa hội tụ",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:phu_tinh_khong_phu_ban",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EBDBF0",
                            "#F0D6EB",
                            "#F0E5E5"
                        ]
                    },
                    "icon": {
                        "data": "🕶️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Phụ tình không phụ bản",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ngoan_xinh_yeu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F9F9F0",
                            "#D9EDD9",
                            "#DFF1E3"
                        ]
                    },
                    "icon": {
                        "data": "🌸",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Ngoan xinh yêu của ai?",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nhin_la_biet_uy_tin",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EEF3F6",
                            "#E5EBF5",
                            "#F0E8F2"
                        ]
                    },
                    "icon": {
                        "data": "👌",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Nhìn là biết uy tín",
                    "text_color": "#443951",
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
                            "#F3E3E4",
                            "#F6EDE9",
                            "#F0F7ED"
                        ]
                    },
                    "icon": {
                        "data": "🤡",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Luôn vui tươi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:bat_on_that_su",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E7F4E7",
                            "#D6F0EA",
                            "#E0E2F0"
                        ]
                    },
                    "icon": {
                        "data": "🫠",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Bất ổn thật sự",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:khong_cam_xuc",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E4DEED",
                            "#F5EFF6",
                            "#EFE1E7"
                        ]
                    },
                    "icon": {
                        "data": "🗿",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Không cảm xúc",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:phu_huynh_dung_xem",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0ECE5",
                            "#F7F5EE",
                            "#EAF6E9"
                        ]
                    },
                    "icon": {
                        "data": "🙈",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Phụ huynh đừng xem",
                    "text_color": "#443951",
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
                            "#DBEBEB",
                            "#D9DAF2",
                            "#E9E5F5"
                        ]
                    },
                    "icon": {
                        "data": "📺",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Check VAR liền",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:qua_nhieu_su_de_thuong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F8EDF6",
                            "#F4E6E8",
                            "#F3F0E7"
                        ]
                    },
                    "icon": {
                        "data": "🎀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Quá nhiều sự dễ thương",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:mac_bay_tinh_yeu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0F8EC",
                            "#DEF2E2",
                            "#EBF2F5"
                        ]
                    },
                    "icon": {
                        "data": "💘",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Mắc bẫy tình yêu",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:song_gio_phu_doi_trai",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E2E5F3",
                            "#E7E2F3",
                            "#F4E6F0"
                        ]
                    },
                    "icon": {
                        "data": "🌪️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Sóng gió phủ đời trai",
                    "text_color": "#443951",
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
                            "#F4E5E2",
                            "#F4F0E7",
                            "#DCEDD9"
                        ]
                    },
                    "icon": {
                        "data": "🔥",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Deadline dí tụt quần",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ca_o_ran_doc",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DEF2E9",
                            "#D8EBEE",
                            "#DCD5F0"
                        ]
                    },
                    "icon": {
                        "data": "🐍",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cả ổ rắn độc",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tien_dau_ma_tieu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F3EDF8",
                            "#EFD7E5",
                            "#F1E5E4"
                        ]
                    },
                    "icon": {
                        "data": "💸",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Tiền đâu mà tiêu",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nghien_cuu_khoa_hoc",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F1EFDA",
                            "#E0EBDB",
                            "#DCEAE5"
                        ]
                    },
                    "icon": {
                        "data": "☕",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Cần nạp cafein gấp",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E8EDF3",
                            "#F3F1F9",
                            "#ECE2EE"
                        ]
                    },
                    "icon": {
                        "data": "☕",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Thế mà lại hay",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F3E7EF",
                            "#F9F1F1",
                            "#EEECD8"
                        ]
                    },
                    "icon": {
                        "data": "✈️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Vẽ kẻ không ai tin",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F3F9F0",
                            "#DCEFE3",
                            "#E5ECF0"
                        ]
                    },
                    "icon": {
                        "data": "🧘",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Hướng nội hết phần đời còn lại",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0EFF6",
                            "#F0E5F5",
                            "#F2D9E2"
                        ]
                    },
                    "icon": {
                        "data": "✨",
                        "type": "emoji"
                    },
                    "max_lines": 3,
                    "text": "Suy nghĩ tích cực, đời bớt tiêu cực",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FAF7F0",
                            "#E7EFDC",
                            "#EEF7F0"
                        ]
                    },
                    "icon": {
                        "data": "👀",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Có nhiều cái chưa muốn nói đâu",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_6",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DEF2EC",
                            "#EDF4F7",
                            "#EAE9F7"
                        ]
                    },
                    "icon": {
                        "data": "🎯",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Nhiệm vụ hệ thống",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_7",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F8F2F7",
                            "#FAF0F3",
                            "#F2EEE3"
                        ]
                    },
                    "icon": {
                        "data": "🏢",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Đi làm công ty không, em xin",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_8",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F3F4EB",
                            "#DFEBDB",
                            "#EAF5F1"
                        ]
                    },
                    "icon": {
                        "data": "🏃",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "+1 máy bị deadline dí",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_10",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E8ECF3",
                            "#F2EDF8",
                            "#F7EEF5"
                        ]
                    },
                    "icon": {
                        "data": "🎙️",
                        "type": "emoji"
                    },
                    "max_lines": 2,
                    "text": "Dịch cabin",
                    "text_color": "#443951",
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
                            "#F8F2F1",
                            "#EDEBDE",
                            "#E2F1DF"
                        ]
                    },
                    "icon": {
                        "data": "graduationcap.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Mai thi rồi, cứu tôi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_1_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F2F8F3",
                            "#E3F2F0",
                            "#DAEAF1"
                        ]
                    },
                    "icon": {
                        "data": "graduationcap.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Học ít hiểu nhiều",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_1_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E0D9ED",
                            "#F9F1F9",
                            "#ECD9E1"
                        ]
                    },
                    "icon": {
                        "data": "graduationcap.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Qua môn là hạnh phúc",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_1_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F6F3E9",
                            "#F0F3E7",
                            "#DFECE2"
                        ]
                    },
                    "icon": {
                        "data": "graduationcap.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Não đang loading...",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_1_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#D7EBEF",
                            "#E5E9F0",
                            "#F2EEF6"
                        ]
                    },
                    "icon": {
                        "data": "graduationcap.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "GPA ơi đừng bỏ tôi",
                    "text_color": "#443951",
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
                            "#EDDEE8",
                            "#EDDFD9",
                            "#F1EEDA"
                        ]
                    },
                    "icon": {
                        "data": "gamecontroller.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Online nhưng không rep",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_2_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E0F1DA",
                            "#EEF6EE",
                            "#EAF5F5"
                        ]
                    },
                    "icon": {
                        "data": "gamecontroller.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Gánh team trong im lặng",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_2_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E8E6F5",
                            "#E5D8EE",
                            "#F7F2F2"
                        ]
                    },
                    "icon": {
                        "data": "gamecontroller.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Thắng làm vua, thua làm lại",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_2_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EFE5E1",
                            "#F0F1DA",
                            "#E7F5E5"
                        ]
                    },
                    "icon": {
                        "data": "gamecontroller.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Ping cao tại số phận",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_2_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E2F3ED",
                            "#DEE9F2",
                            "#EAE7F4"
                        ]
                    },
                    "icon": {
                        "data": "gamecontroller.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "AFK đi ăn cơm",
                    "text_color": "#443951",
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
                            "#F6F2F7",
                            "#F8EDF3",
                            "#F0E0DB"
                        ]
                    },
                    "icon": {
                        "data": "moon.stars.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Hôm nay hơi mệt một chút",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_3_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EFEFE1",
                            "#DFEDDE",
                            "#E5F5EE"
                        ]
                    },
                    "icon": {
                        "data": "moon.stars.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Bình yên là đủ",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_3_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EFF3F6",
                            "#F2F0F9",
                            "#F4EEF7"
                        ]
                    },
                    "icon": {
                        "data": "moon.stars.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Cho bản thân một ngày nghỉ",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_3_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F1DFE7",
                            "#ECE1DA",
                            "#F1F7E9"
                        ]
                    },
                    "icon": {
                        "data": "moon.stars.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Trái tim đang bảo trì",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_3_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E8F5E5",
                            "#EBF4EF",
                            "#EDF6F8"
                        ]
                    },
                    "icon": {
                        "data": "moon.stars.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Rồi mọi chuyện sẽ ổn",
                    "text_color": "#443951",
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
                            "#E7E1EF",
                            "#EEDDE8",
                            "#F5EAE6"
                        ]
                    },
                    "icon": {
                        "data": "fork.knife",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Ăn trước, tính sau",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_4_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F1E8DA",
                            "#E4EEDD",
                            "#E1EFEA"
                        ]
                    },
                    "icon": {
                        "data": "fork.knife",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Tâm hồn cần trà sữa",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_4_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E4F1F0",
                            "#D7E0EE",
                            "#F1F0F9"
                        ]
                    },
                    "icon": {
                        "data": "fork.knife",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Đói là không vui",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_4_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F5E9F6",
                            "#F4EBF0",
                            "#F8F7ED"
                        ]
                    },
                    "icon": {
                        "data": "fork.knife",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Ăn ngon quên lối về",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_4_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E2F0DB",
                            "#E3F2E9",
                            "#D9E6ED"
                        ]
                    },
                    "icon": {
                        "data": "fork.knife",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Một chiếc bụng đói",
                    "text_color": "#443951",
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
                            "#EAEDF5",
                            "#E8E3F2",
                            "#F3E8F2"
                        ]
                    },
                    "icon": {
                        "data": "banknote.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Ví mỏng nhưng đam mê dày",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_5_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F2E1DE",
                            "#F7F6F2",
                            "#E0EEDD"
                        ]
                    },
                    "icon": {
                        "data": "banknote.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Lương về rồi lại đi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_5_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E3F2EA",
                            "#F2F8F8",
                            "#DCE2EF"
                        ]
                    },
                    "icon": {
                        "data": "banknote.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Chưa giàu nhưng rất chill",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_5_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F4E6F5",
                            "#F4E6EB",
                            "#F1E9DF"
                        ]
                    },
                    "icon": {
                        "data": "banknote.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Số dư không cho phép",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_5_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EDEFDC",
                            "#EFF4EC",
                            "#D9ECE6"
                        ]
                    },
                    "icon": {
                        "data": "banknote.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Triệu phú trong giấc mơ",
                    "text_color": "#443951",
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
                            "#E1F3F4",
                            "#E7EDF4",
                            "#F5EAF5"
                        ]
                    },
                    "icon": {
                        "data": "heart.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Hôm nay bé hơi ngoan",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_6_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F1E0EC",
                            "#F1E5E5",
                            "#EEEAE2"
                        ]
                    },
                    "icon": {
                        "data": "heart.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Một cục bông biết nói",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_6_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F3F8F2",
                            "#EEF7F2",
                            "#DCEBEF"
                        ]
                    },
                    "icon": {
                        "data": "heart.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Đừng chọc bé nha",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_6_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F2F1F8",
                            "#F2EBF4",
                            "#ECDFE8"
                        ]
                    },
                    "icon": {
                        "data": "heart.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Em bé cần sạc pin",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_6_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F4E6E1",
                            "#F2F1E8",
                            "#DBECDA"
                        ]
                    },
                    "icon": {
                        "data": "heart.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Dỗi xíu thôi mà",
                    "text_color": "#443951",
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
                            "#DBEBE4",
                            "#E8F0F2",
                            "#F2F1F9"
                        ]
                    },
                    "icon": {
                        "data": "airplane",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Xách balo lên và đi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_7_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EFE3F2",
                            "#F1DAE0",
                            "#EFDFDC"
                        ]
                    },
                    "icon": {
                        "data": "airplane",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Đi trốn cùng nhau không?",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_7_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0F6EA",
                            "#E3EEE2",
                            "#EFF6F4"
                        ]
                    },
                    "icon": {
                        "data": "airplane",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Hẹn gặp ở chân trời",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_7_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#D9DFED",
                            "#DED6F0",
                            "#F8EDF0"
                        ]
                    },
                    "icon": {
                        "data": "airplane",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Tạm biệt deadline",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_7_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F7E9EB",
                            "#ECDDDA",
                            "#EFF2E3"
                        ]
                    },
                    "icon": {
                        "data": "airplane",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Mang thanh xuân đi chơi",
                    "text_color": "#443951",
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
                            "#E5F6EC",
                            "#EAF5F4",
                            "#EAE7F3"
                        ]
                    },
                    "icon": {
                        "data": "flame.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Đừng hỏi, tôi cũng không biết",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_8_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EFECF8",
                            "#F7E9F6",
                            "#ECDAE6"
                        ]
                    },
                    "icon": {
                        "data": "flame.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Nhìn vậy thôi chứ mệt lắm",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_8_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F2F1E9",
                            "#E7EBDB",
                            "#D9EDDC"
                        ]
                    },
                    "icon": {
                        "data": "flame.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Ủa rồi ai hỏi?",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_8_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E0ECF0",
                            "#E8EBF2",
                            "#E7D8EE"
                        ]
                    },
                    "icon": {
                        "data": "flame.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "Tỉnh táo nhưng không nhiều",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_8_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EEE2EB",
                            "#F8F1F5",
                            "#F1F2D9"
                        ]
                    },
                    "icon": {
                        "data": "flame.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 3,
                    "text": "Mọi thứ trong tầm kiểm soát (chắc vậy)",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            }
        ]
    },
    {
        "section": "🎵 Ngôn ngữ vui nhộn",
        "items": [
            {
                "overlay_id": "caption:vinhdat_chanchan_01",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E0F2D9",
                            "#EAF5EF",
                            "#E2F2F3"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 3,
                    "text": "chan chan chan chan, chan du bái",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_02",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E6E7F4",
                            "#F4F2F8",
                            "#EFDCE0"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "lịu lịu lịu lịu, lịu chư sa",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_03",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F3E8E3",
                            "#EDF0E0",
                            "#F3F9F1"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "anh dắc e đi ăng kem",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_04",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F0FAF5",
                            "#DBF0EC",
                            "#DFDEED"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "ăm chả húi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_05",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EEE5F5",
                            "#F3E7F3",
                            "#F3DDE5"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "bà chả hơm",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_06",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F2F4EC",
                            "#E5F4E1",
                            "#DBEBE1"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "ăm chả hơm",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_07",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DEE5ED",
                            "#DFE4F1",
                            "#F5E5F3"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "bà chả húi",
                    "text_color": "#443951",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_08",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F3E8EA",
                            "#F5E7E5",
                            "#EAEDDE"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "làm riết nhiều cái thấy mệt ghê",
                    "text_color": "#443951",
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
