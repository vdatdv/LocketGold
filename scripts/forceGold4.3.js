
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
        body: "Mày nhìn cái chó gì? 👀\n\nLên LocketGold rồi đó 😎\nChúc Bạn Có Những Trải Nghiệm Thật Tuyệt Vời Cùng Locket Gold Nhé 💛"
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
                            "#542519",
                            "#6A3A20",
                            "#805326"
                        ]
                    },
                    "icon": {
                        "data": "🥺",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "em nhớ anhh",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nho_anh_phien",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#9BE5BC",
                            "#ACE9D3",
                            "#BDEEE6"
                        ]
                    },
                    "icon": {
                        "data": "🥺",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "nhớ anh tới mức hơi phiền",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:i_love_you",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#5A1B76",
                            "#86208D",
                            "#A4258D"
                        ]
                    },
                    "icon": {
                        "data": "💗",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "i love you",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:yeu_cuc_dang",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E1E88B",
                            "#DAEC9D",
                            "#D7EFAF"
                        ]
                    },
                    "icon": {
                        "data": "🎀",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "yêu cục dàng",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:yeu_emmm",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1D4C62",
                            "#244C78",
                            "#2A468D"
                        ]
                    },
                    "icon": {
                        "data": "💗",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Yeu Emmm",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:yeu_anhhh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#731E43",
                            "#892437",
                            "#A0302A"
                        ]
                    },
                    "icon": {
                        "data": "🫶",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Yeu Anhhh",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:baby_love",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#92E58E",
                            "#9FE9A7",
                            "#B1EDC0"
                        ]
                    },
                    "icon": {
                        "data": "🧸",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Baby Love 💖",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cho_hun_mieng",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#25156B",
                            "#421982",
                            "#671E9A"
                        ]
                    },
                    "icon": {
                        "data": "😘",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "cho hun miếng coi",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:me_anh_me_ngu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E5C3A8",
                            "#EADAB8",
                            "#EFECC9"
                        ]
                    },
                    "icon": {
                        "data": "💤",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "mê anh hơn mê ngủ",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:be_be_can_do",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#17574C",
                            "#1D6D6B",
                            "#227783"
                        ]
                    },
                    "icon": {
                        "data": "🎀",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "em bé cần được dỗ",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:iu_thi_noi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#681862",
                            "#7F1D65",
                            "#962260"
                        ]
                    },
                    "icon": {
                        "data": "🤭",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "iu thì nói, đừng có ngại",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:iu_hong_thi_bao",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#D5EDA0",
                            "#CDF0B2",
                            "#CDF4C4"
                        ]
                    },
                    "icon": {
                        "data": "🎀",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "iu hong thì bảo",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:anh_thuong_em",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#192B54",
                            "#202B6A",
                            "#262680"
                        ]
                    },
                    "icon": {
                        "data": "🥹",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "anh có thương em thiệt hong",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:yeu_em_nhiem_vu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E59B9F",
                            "#E9B5AC",
                            "#EECEBD"
                        ]
                    },
                    "icon": {
                        "data": "🫡",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "yêu em là nhiệm vụ cả đời",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:crush_nhin",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1B762C",
                            "#208D50",
                            "#25A47C"
                        ]
                    },
                    "icon": {
                        "data": "🫠",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "crush nhìn em một cái là xong",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ngoai_le_cua_em",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#3D125C",
                            "#5A1673",
                            "#7D1B8B"
                        ]
                    },
                    "icon": {
                        "data": "🫶",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "anh là ngoại lệ của em",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:minh_cuoi_nhau",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E2D69E",
                            "#E6E7AE",
                            "#E2ECBF"
                        ]
                    },
                    "icon": {
                        "data": "💍",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "hông ấy mình cưới nhau đi",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tuong_love_hoa_ra_lop",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1E6E73",
                            "#246A89",
                            "#2A5EA0"
                        ]
                    },
                    "icon": {
                        "data": "❤️‍🩹",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Tưởng love hoá ra lốp",
                    "text_color": "#FFFFFF",
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
                            "#E58EBE",
                            "#E99FBD",
                            "#EDB1C0"
                        ]
                    },
                    "icon": {
                        "data": "🎀",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Hello Kitty đáng iu",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#2F6B15",
                            "#248219",
                            "#1E9A29"
                        ]
                    },
                    "icon": {
                        "data": "🖍️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Shin Cậu Bé Bút Chì",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#212670",
                            "#392886",
                            "#5D2E9B"
                        ]
                    },
                    "icon": {
                        "data": "🍫",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Bánh Chocobi số zách",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E2AC91",
                            "#E7C3A2",
                            "#EBD6B3"
                        ]
                    },
                    "icon": {
                        "data": "🦸",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Siêu Nhân Hành Động",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#186845",
                            "#1D7F68",
                            "#229692"
                        ]
                    },
                    "icon": {
                        "data": "🍑",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Anh Hùng Mông Căng",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_6",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#DEA0ED",
                            "#F0B2EC",
                            "#F4C4E5"
                        ]
                    },
                    "icon": {
                        "data": "☁️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Cinnamoroll tai dài",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_7",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#485419",
                            "#506A20",
                            "#538026"
                        ]
                    },
                    "icon": {
                        "data": "🖤",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Kuromi siêu ngầu",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_8",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1A4465",
                            "#20417B",
                            "#263792"
                        ]
                    },
                    "icon": {
                        "data": "🍓",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "My Melody ngọt ngào",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_9",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EAA3B9",
                            "#EEB4B8",
                            "#F2CEC6"
                        ]
                    },
                    "icon": {
                        "data": "🐸",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Keroppi nhí nhảnh",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_1_10",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#125C18",
                            "#16732C",
                            "#1B8B45"
                        ]
                    },
                    "icon": {
                        "data": "🐕",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Bạch Tuyết ngoan ngoãn",
                    "text_color": "#FFFFFF",
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
                            "#B49EE2",
                            "#CCAEE7",
                            "#DFBFEC"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Locket xác nhận bạn cutii",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#734E1E",
                            "#897624",
                            "#99A02A"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Locket xác nhận bạn xjnh gái",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#145956",
                            "#196770",
                            "#1F6D87"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Locket xác nhận bạn đẹp choaiii",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EB96DA",
                            "#EEA7D2",
                            "#F1B9D0"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Locket xác nhận bạn dangiu vc",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#4D7021",
                            "#458628",
                            "#369B2E"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Đã xác minh bạn là gái đẹp",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_6",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#919FE2",
                            "#A2A3E7",
                            "#BAB3EB"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Đã xác minh bạn là trai đẹp",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_7",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#681D18",
                            "#7F371D",
                            "#965822"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Đã xác nhận bạn là bé ngoann",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_4_8",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#187A37",
                            "#1C915E",
                            "#21A98F"
                        ]
                    },
                    "icon": {
                        "data": "checkmark.seal.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Locket tuyên dương bạn cute",
                    "text_color": "#FFFFFF",
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
                            "#C994DF",
                            "#DBA5E4",
                            "#E9B5E9"
                        ]
                    },
                    "text_color": "#17243A"
                }
            },
            {
                "overlay_id": "caption:review",
                "source": "local",
                "caption": {
                    "type": "review",
                    "background": {
                        "colors": [
                            "#65611A",
                            "#6E7B20",
                            "#6D9226"
                        ]
                    },
                    "text_color": "#FFFFFF"
                }
            },
            {
                "overlay_id": "caption:music",
                "source": "local",
                "caption": {
                    "type": "music",
                    "background": {
                        "colors": [
                            "#A3DCEA",
                            "#B4D5EE",
                            "#C6D4F2"
                        ]
                    },
                    "text_color": "#17243A"
                }
            },
            {
                "overlay_id": "caption:location",
                "source": "local",
                "caption": {
                    "type": "location",
                    "background": {
                        "colors": [
                            "#5C1231",
                            "#73162F",
                            "#8B1B28"
                        ]
                    },
                    "text_color": "#FFFFFF"
                }
            },
            {
                "overlay_id": "caption:weather",
                "source": "local",
                "caption": {
                    "type": "weather",
                    "background": {
                        "colors": [
                            "#29621D",
                            "#247826",
                            "#2A8D40"
                        ]
                    },
                    "text_color": "#FFFFFF"
                }
            },
            {
                "overlay_id": "caption:time",
                "source": "local",
                "caption": {
                    "type": "time",
                    "background": {
                        "colors": [
                            "#AAA5E8",
                            "#C7B6EC",
                            "#DEC7F0"
                        ]
                    },
                    "text_color": "#17243A"
                }
            },
            {
                "overlay_id": "caption:streak",
                "source": "local",
                "caption": {
                    "type": "streak",
                    "background": {
                        "colors": [
                            "#593414",
                            "#704E19",
                            "#876E1F"
                        ]
                    },
                    "text_color": "#FFFFFF"
                }
            },
            {
                "overlay_id": "caption:star_sign",
                "source": "local",
                "caption": {
                    "type": "star_sign",
                    "background": {
                        "colors": [
                            "#96EBD1",
                            "#A7EEE7",
                            "#B9ECF1"
                        ]
                    },
                    "text_color": "#17243A"
                }
            },
            {
                "overlay_id": "caption:poll",
                "source": "local",
                "caption": {
                    "type": "poll",
                    "background": {
                        "colors": [
                            "#6B2170",
                            "#862874",
                            "#9B2E6C"
                        ]
                    },
                    "text_color": "#FFFFFF"
                }
            },
            {
                "overlay_id": "caption:color_palette",
                "source": "local",
                "caption": {
                    "type": "color_palette",
                    "background": {
                        "colors": [
                            "#425717",
                            "#466D1D",
                            "#468322"
                        ]
                    },
                    "text_color": "#FFFFFF"
                }
            },
            {
                "overlay_id": "caption:locket_count",
                "source": "local",
                "caption": {
                    "type": "locket_count",
                    "background": {
                        "colors": [
                            "#98BAE8",
                            "#AAB9EC",
                            "#BBBDF0"
                        ]
                    },
                    "text_color": "#17243A"
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
                            "#7A1829",
                            "#91241C",
                            "#A94B21"
                        ]
                    },
                    "icon": {
                        "data": "🎃",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Halloween",
                    "localized_text": {
                        "en": "Halloween",
                        "vn": "Halloween"
                    },
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:autumn_2026",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#94DFA4",
                            "#A5E4BB",
                            "#B5E9CF"
                        ]
                    },
                    "icon": {
                        "data": "🍂",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Xin chào Mùa Thu",
                    "localized_text": {
                        "en": "Xin chào Mùa Thu",
                        "vn": "Xin chào Mùa Thu"
                    },
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:christmas_eve_2026",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#3C1A65",
                            "#5B207B",
                            "#812692"
                        ]
                    },
                    "icon": {
                        "data": "🕯️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Giáng sinh an lành",
                    "localized_text": {
                        "en": "Giáng sinh an lành",
                        "vn": "Giáng sinh an lành"
                    },
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:new_years_eve_2026",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#765A1B",
                            "#8D8720",
                            "#8DA425"
                        ]
                    },
                    "icon": {
                        "data": "🥂",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Xin chào 2027!",
                    "localized_text": {
                        "en": "Xin chào 2027!",
                        "vn": "Xin chào 2027!"
                    },
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:new_years_day_2027_alternate",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#8BE1E8",
                            "#9DDAEC",
                            "#AFD7EF"
                        ]
                    },
                    "max_lines": 1,
                    "text": "2027",
                    "text_color": "#17243A",
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
                            "#E2E898",
                            "#DAECAA",
                            "#D7F0BB"
                        ]
                    },
                    "max_lines": 1,
                    "text": "⚡ dth24/7",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:feeling_cute",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#185A7A",
                            "#1C4F91",
                            "#213AA9"
                        ]
                    },
                    "icon": {
                        "data": "🌷",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Feeling Cute",
                    "localized_text": {
                        "en": "Feeling Cute",
                        "vn": "Cảm thấy dthw"
                    },
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#54192B",
                            "#6A202A",
                            "#802726"
                        ]
                    },
                    "max_lines": 1,
                    "text": "Cu 🐎",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tuat",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#9FE59B",
                            "#ACE9B5",
                            "#BDEECE"
                        ]
                    },
                    "icon": {
                        "data": "🐕",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Tuất",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:wedding_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#2D1B76",
                            "#50208D",
                            "#7D25A4"
                        ]
                    },
                    "icon": {
                        "data": "💍",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Wedding Time!",
                    "localized_text": {
                        "en": "Wedding Time!",
                        "vn": "Đám cưới nè!"
                    },
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cam_thay_hanh_phuc",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E8C18B",
                            "#ECD79D",
                            "#EFE8AF"
                        ]
                    },
                    "icon": {
                        "data": "🇻🇳",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Cảm thấy hạnh phúc",
                    "localized_text": {
                        "en": "Feeling Happy",
                        "vn": "Cảm thấy hạnh phúc"
                    },
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:coffee_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1D6256",
                            "#247678",
                            "#2A778D"
                        ]
                    },
                    "icon": {
                        "data": "☕",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Coffee Time!",
                    "localized_text": {
                        "en": "Coffee Time!",
                        "vn": "Giờ uống cà phê!"
                    },
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:snake_vibes",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#731E6D",
                            "#892469",
                            "#A02A5D"
                        ]
                    },
                    "icon": {
                        "data": "🐍",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Snake Vibes",
                    "localized_text": {
                        "en": "Snake Vibes",
                        "vn": "Chất rắn"
                    },
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:mixue_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#BDE58E",
                            "#BCE99F",
                            "#BFEDB1"
                        ]
                    },
                    "icon": {
                        "data": "🍦",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Mixue Time!",
                    "localized_text": {
                        "en": "Mixue Time!",
                        "vn": "Giờ Mixue!"
                    },
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:locket_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#152E6B",
                            "#192482",
                            "#2A1E9A"
                        ]
                    },
                    "icon": {
                        "data": "📷",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Locket Time!",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cinema_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E5A8AB",
                            "#EAC2B8",
                            "#EFD9C9"
                        ]
                    },
                    "icon": {
                        "data": "🎬",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Cinema Time!",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:dating_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#17572C",
                            "#1D6D44",
                            "#228360"
                        ]
                    },
                    "icon": {
                        "data": "💕",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Dating Time!",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:graduation_day",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#461868",
                            "#691D7F",
                            "#932296"
                        ]
                    },
                    "icon": {
                        "data": "🎓",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Happy Graduation Day!",
                    "localized_text": {
                        "en": "Happy Graduation Day!",
                        "vn": "Chúc mừng tốt nghiệp!"
                    },
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:shopping_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EDDFA0",
                            "#ECF0B2",
                            "#E5F4C4"
                        ]
                    },
                    "icon": {
                        "data": "🛍️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Shopping Time!",
                    "localized_text": {
                        "en": "Shopping Time!",
                        "vn": "Giờ mua sắm!"
                    },
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:dinner_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#194854",
                            "#204F6A",
                            "#265280"
                        ]
                    },
                    "icon": {
                        "data": "🍽️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Dinner Time!",
                    "localized_text": {
                        "en": "Dinner Time!",
                        "vn": "Giờ ăn tối!"
                    },
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:chilling_time",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E59BC3",
                            "#E9ACC1",
                            "#EEBDC4"
                        ]
                    },
                    "icon": {
                        "data": "🌴",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Chilling Time!",
                    "localized_text": {
                        "en": "Chilling Time!",
                        "vn": "Giờ thư giãn!"
                    },
                    "text_color": "#17243A",
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
                            "#37761B",
                            "#268D20",
                            "#25A43D"
                        ]
                    },
                    "icon": {
                        "data": "🕯️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Xin vĩnh biệt cụ",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:chay_ngay_di",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#18125C",
                            "#2C1673",
                            "#461B8B"
                        ]
                    },
                    "icon": {
                        "data": "🏃💨",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Chạy ngay đi",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:luc_nao_co_tien_thi_moi_di_a",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E2B49E",
                            "#E7CCAE",
                            "#ECE0BF"
                        ]
                    },
                    "icon": {
                        "data": "💸",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Lúc nào có tiền thì mới đi á",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cu_tu_tu_khoai_se_nhu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1E734F",
                            "#248977",
                            "#2A98A0"
                        ]
                    },
                    "icon": {
                        "data": "🥔",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Cứ từ từ khoai sẽ nhừ",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:kiem_tra_nhan_pham",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E28EE5",
                            "#E99FE1",
                            "#EDB1DE"
                        ]
                    },
                    "icon": {
                        "data": "🎲",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Kiểm tra nhân phẩm",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:doc_so_tai_khoan",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#596B15",
                            "#588219",
                            "#4F9A1E"
                        ]
                    },
                    "icon": {
                        "data": "💳",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Đọc số tài khoản đi",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ai_so_thi_di_ve",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#214D70",
                            "#284586",
                            "#2E359B"
                        ]
                    },
                    "icon": {
                        "data": "🏃",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "ai sợ thì đi về",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:con_cai_nit",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E2919E",
                            "#E7A2A3",
                            "#EBBBB3"
                        ]
                    },
                    "icon": {
                        "data": "🧶",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "còn cái nịt",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:canh_bao_co_hat",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#18681E",
                            "#1D7F38",
                            "#229659"
                        ]
                    },
                    "icon": {
                        "data": "🎤",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "cảnh báo có hát",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:than_chua_ma_don",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B9A0ED",
                            "#D5B2F0",
                            "#EBC4F4"
                        ]
                    },
                    "icon": {
                        "data": "😔",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Thân chưa mà dỡn",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ai_muon",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#544319",
                            "#6A6020",
                            "#7F8026"
                        ]
                    },
                    "icon": {
                        "data": "🤔",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Ai mượn?",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:hay_ra_de_qua_a",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1A6562",
                            "#206D7B",
                            "#266C92"
                        ]
                    },
                    "icon": {
                        "data": "🥺",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Hay ra dẻ quá à!",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:giam_suc_manh_con_tuong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EAA3DC",
                            "#EEB4D4",
                            "#F2C6D3"
                        ]
                    },
                    "icon": {
                        "data": "🎮",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Giảm sức mạnh con tướng",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:mac_co_qua_hai_oi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#305C12",
                            "#2F7316",
                            "#288B1B"
                        ]
                    },
                    "icon": {
                        "data": "😭",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Mắc cỡ quá hai ơi",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:minh_la_lop",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#9EAAE2",
                            "#B0AEE7",
                            "#C9BFEC"
                        ]
                    },
                    "icon": {
                        "data": "🛞",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Mình là lốp",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:dep_trai_co_gi_sai",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#73241E",
                            "#894424",
                            "#A06C2A"
                        ]
                    },
                    "icon": {
                        "data": "😎",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Đẹp trai có gì sai",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:mong_ton_hoa_sen",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#145934",
                            "#19704F",
                            "#1F876E"
                        ]
                    },
                    "icon": {
                        "data": "🪷",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Mong tôn hoa sen thấy cảnh này",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:dam_nhau_khong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#D196EB",
                            "#E7A7EE",
                            "#F1B9EC"
                        ]
                    },
                    "icon": {
                        "data": "🥊",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "đấm nhau không",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:sieu_cap_ba_khi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#706C21",
                            "#738628",
                            "#6B9B2E"
                        ]
                    },
                    "icon": {
                        "data": "🐉",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "siêu cấp bá khí",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:du_an_ma",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#91C7E2",
                            "#A2C5E7",
                            "#B3C7EB"
                        ]
                    },
                    "icon": {
                        "data": "👻",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "dự án ma",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:doi_roi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#681839",
                            "#7F1D32",
                            "#962225"
                        ]
                    },
                    "icon": {
                        "data": "😤",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Dỗi rồi",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:dang_ban_tuong_tu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#297A18",
                            "#1C9124",
                            "#21A94C"
                        ]
                    },
                    "icon": {
                        "data": "💭",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Đang bận tương tư",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:mo_hon_nhung_tam_hien",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#A494DF",
                            "#BCA5E4",
                            "#D0B5E9"
                        ]
                    },
                    "icon": {
                        "data": "🐤",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Mỏ hỗn nhưng tâm hiền",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:muon_duoc_om",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#653C1A",
                            "#7B5C20",
                            "#928226"
                        ]
                    },
                    "icon": {
                        "data": "🫂",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Muốn được ôm",
                    "text_color": "#FFFFFF",
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
                            "#A3EAD5",
                            "#B4EEEB",
                            "#C6E9F2"
                        ]
                    },
                    "icon": {
                        "data": "🌧️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Hồi chiều trời mưa...",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:con_vien_la_lan",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#5C1255",
                            "#73165D",
                            "#8B1B5F"
                        ]
                    },
                    "icon": {
                        "data": "🍂",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "côn viên lá làn",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:gian_dang_iu_hong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#4B621D",
                            "#4B7824",
                            "#458D2A"
                        ]
                    },
                    "icon": {
                        "data": "🪳",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Gián đáng iu hong",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nau_xoi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#A5C1E8",
                            "#B6C0EC",
                            "#CAC7F0"
                        ]
                    },
                    "icon": {
                        "data": "🙀",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Nấu xói",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:co_tien_lam_phien_thien_ha",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#591417",
                            "#702319",
                            "#873A1F"
                        ]
                    },
                    "icon": {
                        "data": "💰",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Có tiền làm phiền thiên hạ",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nguoi_im_lang_gap_nguoi_hay_noi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#96EBA7",
                            "#A7EEC4",
                            "#B9F1DB"
                        ]
                    },
                    "icon": {
                        "data": "🤐",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Người im lặng gặp người hay nói",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:roi_let_luon",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#452170",
                            "#692886",
                            "#952E9B"
                        ]
                    },
                    "icon": {
                        "data": "💅",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "rồi lét luôn",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:roi_gay_luon",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#574D17",
                            "#6D6C1D",
                            "#768322"
                        ]
                    },
                    "icon": {
                        "data": "🌈",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "rồi gay luôn",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tuyet_doi_khong_nghe",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#98E1E8",
                            "#AAD9EC",
                            "#BBD7F0"
                        ]
                    },
                    "icon": {
                        "data": "🙉",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Tuyệt đối không nghe",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cha_nay_tu_luyen_ghe",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#7A185A",
                            "#911C4E",
                            "#A92139"
                        ]
                    },
                    "icon": {
                        "data": "🪞",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Cha này tự luyến ghê",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:co_bien_co_bien",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#AADF94",
                            "#ADE4A5",
                            "#B5E9B6"
                        ]
                    },
                    "icon": {
                        "data": "🚨",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Có biến có biến",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:hong_drama",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1A1E65",
                            "#2E207B",
                            "#4C2692"
                        ]
                    },
                    "icon": {
                        "data": "🍿",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Hóng drama",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cuoi_vcl_m_oi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#762D1B",
                            "#8D5120",
                            "#A47D25"
                        ]
                    },
                    "icon": {
                        "data": "😂",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Cười vcl m oi",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vl_m_oi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#8BE8C2",
                            "#9DECD7",
                            "#AFEFE8"
                        ]
                    },
                    "icon": {
                        "data": "😳",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "vl m ơi?",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:noi_het_bi_mat_thi_co_yeu_hong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#571D62",
                            "#782475",
                            "#8D2A77"
                        ]
                    },
                    "icon": {
                        "data": "🤫",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Nói hết bị mật thì có yêu hong",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:flex_den_hoi_tho_cuoi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E2E8A5",
                            "#DBECB6",
                            "#D9F0C7"
                        ]
                    },
                    "icon": {
                        "data": "💎",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Flex đến hơi thở cuối",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:overthinking_vai_chuong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#143959",
                            "#193B70",
                            "#1F3787"
                        ]
                    },
                    "icon": {
                        "data": "🤯",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Overthinking vai chưởng",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:chan_bo_may_di",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#6B152E",
                            "#821923",
                            "#9A2B1E"
                        ]
                    },
                    "icon": {
                        "data": "🙄",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Chan bố mày đi",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:oach_xa_lach",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#ABE5A8",
                            "#B8EAC2",
                            "#C9EFDA"
                        ]
                    },
                    "icon": {
                        "data": "🥬",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "oách xà lách",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:lai_phai_lo",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#2D1757",
                            "#441D6D",
                            "#602283"
                        ]
                    },
                    "icon": {
                        "data": "💔",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "lại phải lọ",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ua_alo_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E8C798",
                            "#ECDDAA",
                            "#F0EFBB"
                        ]
                    },
                    "icon": {
                        "data": "📞",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Ủa alo",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ke_chuyen_nghe_choi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#187A69",
                            "#1C8991",
                            "#217DA9"
                        ]
                    },
                    "icon": {
                        "data": "🍿",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Kể chuyện nghe chơi",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:hom_nay_toi_buon",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#541948",
                            "#6A204F",
                            "#802651"
                        ]
                    },
                    "icon": {
                        "data": "🥀",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "hôm nay tôi buồn",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:xinh_dep_tuyet_voi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#C3E59B",
                            "#C1E9AC",
                            "#C4EEBD"
                        ]
                    },
                    "icon": {
                        "data": "💅",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Xinh đẹp tuyệt vời",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tram_cam_nhe",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1B3676",
                            "#20268D",
                            "#3E25A4"
                        ]
                    },
                    "icon": {
                        "data": "🫠",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Trầm cảm nhẹ",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:chua_du_wow",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E8938B",
                            "#ECB09D",
                            "#EFC8AF"
                        ]
                    },
                    "icon": {
                        "data": "⭐",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Chưa đủ wow",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:boc_trung_sit_rit",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1D6234",
                            "#247851",
                            "#2A8D73"
                        ]
                    },
                    "icon": {
                        "data": "🎁",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Bóc trúng sít rịt",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:hen_lam_moi_xui_duoc_vay_a",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#4F1E73",
                            "#782489",
                            "#A02A97"
                        ]
                    },
                    "icon": {
                        "data": "😅",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Hèn lắm mới xui được vậy á",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ra_duong_ne_moi_anh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E5E28E",
                            "#E1E99F",
                            "#DDEDB1"
                        ]
                    },
                    "icon": {
                        "data": "👤",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Ra đường nể mỗi anh",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cung_cung_di",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#15596B",
                            "#195782",
                            "#1E4F9A"
                        ]
                    },
                    "icon": {
                        "data": "🚀",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Cũng cứng đi",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tuyet_doi_dien_anh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E5A8C9",
                            "#EAB8C7",
                            "#EFC9CB"
                        ]
                    },
                    "icon": {
                        "data": "📷",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Tuyệt đối điện ảnh",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:du_ba_khi_chua",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#215717",
                            "#1D6D1D",
                            "#228330"
                        ]
                    },
                    "icon": {
                        "data": "⚡",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Đủ bá khí chưa",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cai_gi_vay_troi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1E1868",
                            "#391D7F",
                            "#5A2296"
                        ]
                    },
                    "icon": {
                        "data": "❗",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Cái gì vậy trời",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nay_la_het_cuu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EDB9A0",
                            "#F0D6B2",
                            "#F4EBC4"
                        ]
                    },
                    "icon": {
                        "data": "❌",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Này là hết cứu",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:qua_la_dien_anh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#195444",
                            "#206A60",
                            "#267E80"
                        ]
                    },
                    "icon": {
                        "data": "📷",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Quá là điện ảnh",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_2_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E29BE5",
                            "#E9ACE0",
                            "#EEBDDC"
                        ]
                    },
                    "icon": {
                        "data": "🚀",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Đỉnh nóc kịch trần bay phấp phới",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_2_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#64761B",
                            "#5C8D20",
                            "#4CA425"
                        ]
                    },
                    "icon": {
                        "data": "🏆",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Mãi đỉnh mãi đỉnh",
                    "text_color": "#FFFFFF",
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
                            "#12305C",
                            "#162E73",
                            "#1B278B"
                        ]
                    },
                    "icon": {
                        "data": "🗡️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Hảo hán",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:cam_lanh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E29EA9",
                            "#E7B0AE",
                            "#ECC9BF"
                        ]
                    },
                    "icon": {
                        "data": "🤧",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Cảm lạnh",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:bat_luc",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1E7325",
                            "#248945",
                            "#2AA06D"
                        ]
                    },
                    "icon": {
                        "data": "🏳️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Bất lực",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:xin_lui_duoc_chua",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B78EE5",
                            "#CD9FE9",
                            "#DFB1ED"
                        ]
                    },
                    "icon": {
                        "data": "🥺",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Xin lũi được chưa",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:rot_nuoc_mat",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#6B5215",
                            "#827919",
                            "#8C9A1E"
                        ]
                    },
                    "icon": {
                        "data": "😭",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Rớt nước mắt",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:guc_nga",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#21706C",
                            "#287386",
                            "#2E6A9B"
                        ]
                    },
                    "icon": {
                        "data": "📉",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Gục ngã",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tien_dinh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E291C6",
                            "#E7A2C5",
                            "#EBB3C7"
                        ]
                    },
                    "icon": {
                        "data": "🌪️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Tiền đình",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:che_manh",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#396818",
                            "#327F1D",
                            "#249622"
                        ]
                    },
                    "icon": {
                        "data": "👎",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Chê mạnh",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:xinh_gai_an_phim_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#A0ADED",
                            "#B7B2F0",
                            "#D3C4F4"
                        ]
                    },
                    "icon": {
                        "data": "💅",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Xinh gái ấn phím 1",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:di_lam_vi_dam_me",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#542619",
                            "#6A3B20",
                            "#805526"
                        ]
                    },
                    "icon": {
                        "data": "🤡",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Đi làm vì đam mê",
                    "text_color": "#FFFFFF",
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
                            "#1A653D",
                            "#207B5C",
                            "#269282"
                        ]
                    },
                    "icon": {
                        "data": "😎",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Cười xỉu",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:toang_that_roi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#D5A3EA",
                            "#EBB4EE",
                            "#F2C6E9"
                        ]
                    },
                    "icon": {
                        "data": "🐉",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Toang thật rồi",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:toi_roi_toi_roi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#555C12",
                            "#5D7316",
                            "#5F8B1B"
                        ]
                    },
                    "icon": {
                        "data": "❗",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Tới rồi tới rồi",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:khong_the_tin_noi",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#9ECBE2",
                            "#AEC9E7",
                            "#BFCBEC"
                        ]
                    },
                    "icon": {
                        "data": "❓",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Không thể tin nổi",
                    "text_color": "#17243A",
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
                            "#731E42",
                            "#892435",
                            "#A0322A"
                        ]
                    },
                    "icon": {
                        "data": "☀️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Ngày mới vui vẻ",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ngu_ngon",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#165914",
                            "#197024",
                            "#1F873B"
                        ]
                    },
                    "icon": {
                        "data": "🌙",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Ngủ ngon",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:an_com_chua",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#A896EB",
                            "#C4A7EE",
                            "#DCB9F1"
                        ]
                    },
                    "icon": {
                        "data": "🍽️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Ăn cơm chưa?",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:di_choi_khong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#704521",
                            "#866A28",
                            "#9B962E"
                        ]
                    },
                    "icon": {
                        "data": "✈️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Đi chơi không?",
                    "text_color": "#FFFFFF",
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
                            "#91E2D6",
                            "#A2E7E6",
                            "#B3E3EB"
                        ]
                    },
                    "icon": {
                        "data": "✨",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Tinh hoa hội tụ",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:phu_tinh_khong_phu_ban",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#681861",
                            "#7F1D63",
                            "#96225E"
                        ]
                    },
                    "icon": {
                        "data": "🕶️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Phụ tình không phụ bản",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ngoan_xinh_yeu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#597A18",
                            "#4E911C",
                            "#39A921"
                        ]
                    },
                    "icon": {
                        "data": "🌸",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Ngoan xinh yêu của ai?",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nhin_la_biet_uy_tin",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#94A9DF",
                            "#A5ADE4",
                            "#B6B5E9"
                        ]
                    },
                    "icon": {
                        "data": "👌",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Nhìn là biết uy tín",
                    "text_color": "#17243A",
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
                            "#651A1D",
                            "#7B2F20",
                            "#924D26"
                        ]
                    },
                    "icon": {
                        "data": "🤡",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Luôn vui tươi",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:bat_on_that_su",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#A3EAB2",
                            "#B4EECE",
                            "#C6F2E5"
                        ]
                    },
                    "icon": {
                        "data": "🫠",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Bất ổn thật sự",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:khong_cam_xuc",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#3E125C",
                            "#5C1673",
                            "#7F1B8B"
                        ]
                    },
                    "icon": {
                        "data": "🗿",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Không cảm xúc",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:phu_huynh_dung_xem",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#62571D",
                            "#757824",
                            "#768D2A"
                        ]
                    },
                    "icon": {
                        "data": "🙈",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Phụ huynh đừng xem",
                    "text_color": "#FFFFFF",
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
                            "#A5E2E8",
                            "#B6DAEC",
                            "#C7D9F0"
                        ]
                    },
                    "icon": {
                        "data": "📺",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Check VAR liền",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:qua_nhieu_su_de_thuong",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#591439",
                            "#70193A",
                            "#871F37"
                        ]
                    },
                    "icon": {
                        "data": "🎀",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Quá nhiều sự dễ thương",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:mac_bay_tinh_yeu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#AEEB96",
                            "#AEEEA7",
                            "#B9F1C0"
                        ]
                    },
                    "icon": {
                        "data": "💘",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Mắc bẫy tình yêu",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:song_gio_phu_doi_trai",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#212570",
                            "#3B2886",
                            "#5F2E9B"
                        ]
                    },
                    "icon": {
                        "data": "🌪️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Sóng gió phủ đời trai",
                    "text_color": "#FFFFFF",
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
                            "#572D17",
                            "#6D451D",
                            "#836122"
                        ]
                    },
                    "icon": {
                        "data": "🔥",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Deadline dí tụt quần",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:ca_o_ran_doc",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#98E8C7",
                            "#AAECDE",
                            "#BBF0EF"
                        ]
                    },
                    "icon": {
                        "data": "🐍",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Cả ổ rắn độc",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:tien_dau_ma_tieu",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#69187A",
                            "#911C88",
                            "#A9217C"
                        ]
                    },
                    "icon": {
                        "data": "💸",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Tiền đâu mà tiêu",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:nghien_cuu_khoa_hoc",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#CEDF94",
                            "#CCE4A5",
                            "#CEE9B5"
                        ]
                    },
                    "icon": {
                        "data": "☕",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Cần nạp cafein gấp",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_1",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1A4265",
                            "#203F7B",
                            "#263592"
                        ]
                    },
                    "icon": {
                        "data": "☕",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Thế mà lại hay",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#761B36",
                            "#8D2025",
                            "#A43F25"
                        ]
                    },
                    "icon": {
                        "data": "✈️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Vẽ kẻ không ai tin",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#8BE894",
                            "#9DECB0",
                            "#AFEFC8"
                        ]
                    },
                    "icon": {
                        "data": "🧘",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Hướng nội hết phần đời còn lại",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#351D62",
                            "#512478",
                            "#732A8D"
                        ]
                    },
                    "icon": {
                        "data": "✨",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Suy nghĩ tích cực, đời bớt tiêu cực",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E8CCA5",
                            "#ECE3B6",
                            "#EDF0C7"
                        ]
                    },
                    "icon": {
                        "data": "👀",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Có nhiều cái chưa muốn nói đâu",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_6",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#145957",
                            "#196670",
                            "#1F6B87"
                        ]
                    },
                    "icon": {
                        "data": "🎯",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Nhiệm vụ hệ thống",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_7",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#6B1558",
                            "#821957",
                            "#9A1E4E"
                        ]
                    },
                    "icon": {
                        "data": "🏢",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Đi làm công ty không, em xin",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_8",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#C9E5A8",
                            "#C7EAB8",
                            "#CBEFC9"
                        ]
                    },
                    "icon": {
                        "data": "🏃",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "+1 máy bị deadline dí",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_extra_3_10",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#172157",
                            "#1D1D6D",
                            "#312283"
                        ]
                    },
                    "icon": {
                        "data": "🎙️",
                        "type": "emoji"
                    },
                    "max_lines": 1,
                    "text": "Dịch cabin",
                    "text_color": "#FFFFFF",
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
                            "#E8A098",
                            "#ECBDAA",
                            "#F0D5BB"
                        ]
                    },
                    "icon": {
                        "data": "graduationcap.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Mai thi rồi, cứu tôi",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_1_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#187A39",
                            "#1C9160",
                            "#21A991"
                        ]
                    },
                    "icon": {
                        "data": "graduationcap.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Học ít hiểu nhiều",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_1_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#441954",
                            "#61206A",
                            "#80267E"
                        ]
                    },
                    "icon": {
                        "data": "graduationcap.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Qua môn là hạnh phúc",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_1_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E5E29B",
                            "#DFE9AC",
                            "#DCEEBD"
                        ]
                    },
                    "icon": {
                        "data": "graduationcap.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Não đang loading...",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_1_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1B6376",
                            "#205B8D",
                            "#254BA4"
                        ]
                    },
                    "icon": {
                        "data": "graduationcap.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "GPA ơi đừng bỏ tôi",
                    "text_color": "#FFFFFF",
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
                            "#E88BB0",
                            "#EC9DB1",
                            "#EFAFB5"
                        ]
                    },
                    "icon": {
                        "data": "gamecontroller.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Online nhưng không rep",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_2_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#28621D",
                            "#247827",
                            "#2A8D42"
                        ]
                    },
                    "icon": {
                        "data": "gamecontroller.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Gánh team trong im lặng",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_2_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#251E73",
                            "#462489",
                            "#6E2AA0"
                        ]
                    },
                    "icon": {
                        "data": "gamecontroller.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Thắng làm vua, thua làm lại",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_2_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E5B78E",
                            "#E9CE9F",
                            "#EDE0B1"
                        ]
                    },
                    "icon": {
                        "data": "gamecontroller.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Ping cao tại số phận",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_2_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#156B52",
                            "#198279",
                            "#1E8C9A"
                        ]
                    },
                    "icon": {
                        "data": "gamecontroller.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "AFK đi ăn cơm",
                    "text_color": "#FFFFFF",
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
                            "#E3A8E5",
                            "#EAB8E0",
                            "#EFC9DE"
                        ]
                    },
                    "icon": {
                        "data": "moon.stars.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Hôm nay hơi mệt một chút",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_3_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#405717",
                            "#456D1D",
                            "#448322"
                        ]
                    },
                    "icon": {
                        "data": "moon.stars.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Bình yên là đủ",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_3_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#183868",
                            "#1D317F",
                            "#222396"
                        ]
                    },
                    "icon": {
                        "data": "moon.stars.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Cho bản thân một ngày nghỉ",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_3_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#EDA0AD",
                            "#F0B7B2",
                            "#F4D4C4"
                        ]
                    },
                    "icon": {
                        "data": "moon.stars.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Trái tim đang bảo trì",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_3_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#195427",
                            "#206A3C",
                            "#268055"
                        ]
                    },
                    "icon": {
                        "data": "moon.stars.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Rồi mọi chuyện sẽ ổn",
                    "text_color": "#FFFFFF",
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
                            "#BE9BE5",
                            "#D5ACE9",
                            "#E7BDEE"
                        ]
                    },
                    "icon": {
                        "data": "fork.knife",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Ăn trước, tính sau",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_4_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#765C1B",
                            "#8D8920",
                            "#8AA425"
                        ]
                    },
                    "icon": {
                        "data": "fork.knife",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Tâm hồn cần trà sữa",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_4_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#12545C",
                            "#165C73",
                            "#1B5E8B"
                        ]
                    },
                    "icon": {
                        "data": "fork.knife",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Đói là không vui",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_4_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#E29ECB",
                            "#E7AEC8",
                            "#ECBFCB"
                        ]
                    },
                    "icon": {
                        "data": "fork.knife",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Ăn ngon quên lối về",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_4_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#41731E",
                            "#358924",
                            "#2AA033"
                        ]
                    },
                    "icon": {
                        "data": "fork.knife",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Một chiếc bụng đói",
                    "text_color": "#FFFFFF",
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
                            "#8E90E5",
                            "#A99FE9",
                            "#C2B1ED"
                        ]
                    },
                    "icon": {
                        "data": "banknote.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Ví mỏng nhưng đam mê dày",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_5_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#6B2815",
                            "#824519",
                            "#9A6A1E"
                        ]
                    },
                    "icon": {
                        "data": "banknote.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Lương về rồi lại đi",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_5_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#217046",
                            "#28866A",
                            "#2E9B96"
                        ]
                    },
                    "icon": {
                        "data": "banknote.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Chưa giàu nhưng rất chill",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_5_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#D691E2",
                            "#E7A2E7",
                            "#EBB3E3"
                        ]
                    },
                    "icon": {
                        "data": "banknote.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Số dư không cho phép",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_5_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#606818",
                            "#627F1D",
                            "#5D9622"
                        ]
                    },
                    "icon": {
                        "data": "banknote.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Triệu phú trong giấc mơ",
                    "text_color": "#FFFFFF",
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
                            "#A0D3ED",
                            "#B2CCF0",
                            "#C4CCF4"
                        ]
                    },
                    "icon": {
                        "data": "heart.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Hôm nay bé hơi ngoan",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_6_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#541929",
                            "#6A2029",
                            "#802826"
                        ]
                    },
                    "icon": {
                        "data": "heart.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Một cục bông biết nói",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_6_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#1D651A",
                            "#207B30",
                            "#26924D"
                        ]
                    },
                    "icon": {
                        "data": "heart.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Đừng chọc bé nha",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_6_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#B2A3EA",
                            "#CFB4EE",
                            "#E5C6F2"
                        ]
                    },
                    "icon": {
                        "data": "heart.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Em bé cần sạc pin",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_6_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#5C3E12",
                            "#735C16",
                            "#8B801B"
                        ]
                    },
                    "icon": {
                        "data": "heart.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Dỗi xíu thôi mà",
                    "text_color": "#FFFFFF",
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
                            "#9EE2D8",
                            "#AEE4E7",
                            "#BFE1EC"
                        ]
                    },
                    "icon": {
                        "data": "airplane",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Xách balo lên và đi",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_7_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#731E6C",
                            "#892467",
                            "#A02A5B"
                        ]
                    },
                    "icon": {
                        "data": "airplane",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Đi trốn cùng nhau không?",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_7_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#385914",
                            "#3A7019",
                            "#36871F"
                        ]
                    },
                    "icon": {
                        "data": "airplane",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Hẹn gặp ở chân trời",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_7_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#96ADEB",
                            "#A7ADEE",
                            "#C0B9F1"
                        ]
                    },
                    "icon": {
                        "data": "airplane",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Tạm biệt deadline",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_7_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#702124",
                            "#863C28",
                            "#9B602E"
                        ]
                    },
                    "icon": {
                        "data": "airplane",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Mang thanh xuân đi chơi",
                    "text_color": "#FFFFFF",
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
                            "#91E2AE",
                            "#A2E7C5",
                            "#B3EBD8"
                        ]
                    },
                    "icon": {
                        "data": "flame.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Đừng hỏi, tôi cũng không biết",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_8_2",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#471868",
                            "#6B1D7F",
                            "#952296"
                        ]
                    },
                    "icon": {
                        "data": "flame.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Nhìn vậy thôi chứ mệt lắm",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_8_3",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#7A6A18",
                            "#87911C",
                            "#7CA921"
                        ]
                    },
                    "icon": {
                        "data": "flame.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Ủa rồi ai hỏi?",
                    "text_color": "#FFFFFF",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_8_4",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#94CEDF",
                            "#A5CCE4",
                            "#B5CEE9"
                        ]
                    },
                    "icon": {
                        "data": "flame.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Tỉnh táo nhưng không nhiều",
                    "text_color": "#17243A",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_new_8_5",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#651A42",
                            "#7B203E",
                            "#922634"
                        ]
                    },
                    "icon": {
                        "data": "flame.fill",
                        "type": "sf_symbol"
                    },
                    "max_lines": 1,
                    "text": "Mọi thứ trong tầm kiểm soát (chắc vậy)",
                    "text_color": "#FFFFFF",
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
                            "#F8E4DB",
                            "#EFC6BD",
                            "#D99AA1"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 3,
                    "text": "chan chan chan chan, chan du bái",
                    "text_color": "#563840",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_02",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F6DECF",
                            "#E8B7AA",
                            "#CA8794"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "lịu lịu lịu lịu, lịu chư sa",
                    "text_color": "#563840",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_03",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FCE7E3",
                            "#EAC4CD",
                            "#B97B8C"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "anh dắc e đi ăng kem",
                    "text_color": "#563840",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_04",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F6DBD3",
                            "#DDA6A4",
                            "#B77485"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "ăm chả húi",
                    "text_color": "#563840",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_05",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FFEADD",
                            "#E9BAA9",
                            "#C98F86"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "bà chả hơm",
                    "text_color": "#563840",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_06",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F3D6D4",
                            "#DDAAB5",
                            "#B57D92"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "ăm chả hơm",
                    "text_color": "#563840",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_07",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#FBE8D9",
                            "#E8C8BA",
                            "#C9909E"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "bà chả húi",
                    "text_color": "#563840",
                    "type": "static_content"
                }
            },
            {
                "overlay_id": "caption:vinhdat_chanchan_08",
                "source": "remote",
                "caption": {
                    "background": {
                        "colors": [
                            "#F9E3DC",
                            "#E4B1A7",
                            "#C3838E"
                        ]
                    },
                    "icon": {
                        "data": "music.note",
                        "type": "sf_symbol"
                    },
                    "max_lines": 2,
                    "text": "làm riết nhiều cái thấy mệt ghê",
                    "text_color": "#563840",
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
