// ============================================================
// Locket Remote Config Rewrite - Optimized Video & Camera Roll
// Endpoint: firebaseremoteconfig.googleapis.com
// Dùng cho: Loon / Quantumult X / Surge / Shadowrocket
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.Attention = "Đã tối ưu hóa tải video Album & Kích hoạt Gold!";
    obj.state = "UPDATE";
    obj.entries = obj.entries || {};

    // ============================================================
    // 1. CẤU HÌNH GOLD, TÍNH NĂNG & GỠ QUẢNG CÁO
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
        android_subscribe_gold_button_enabled: "false",
        profile_badge_visible: "true",
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
    // 2. TỐI ƯU TOÀN DIỆN VIDEO TỪ ALBUM (HDR, 60/120 FPS, 4K, BITRATE)
    // ============================================================
    var MY_VIDEO_DURATION = 45.0;
    var ALBUM_VIDEO_DURATION = 60.0;
    var albumDurationStr = ALBUM_VIDEO_DURATION.toString();
    var MAX_SIZE_BYTES = 104857600; // 100 MiB

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
        quality_mbps: 2.5,
        qualityMbps: 2.5,
        fps: 60,
        video_fps: 60
    };

    var cameraRollConfig = {
        gold_max_duration: ALBUM_VIDEO_DURATION,
        goldMaxDuration: ALBUM_VIDEO_DURATION,
        video_max_duration: ALBUM_VIDEO_DURATION,
        videoMaxDuration: ALBUM_VIDEO_DURATION,
        max_duration: ALBUM_VIDEO_DURATION,
        maxDuration: ALBUM_VIDEO_DURATION,
        trim_max_duration: ALBUM_VIDEO_DURATION,
        trimMaxDuration: ALBUM_VIDEO_DURATION,
        camera_roll_max_duration: ALBUM_VIDEO_DURATION,
        camera_roll_video_max_duration: ALBUM_VIDEO_DURATION,
        max_file_size: MAX_SIZE_BYTES,
        max_upload_bytes: MAX_SIZE_BYTES,
        max_size_bytes: MAX_SIZE_BYTES,
        quality_mbps: 3.5,                 // Bitrate cao giúp chống vỡ nát hình ảnh
        qualityMbps: 3.5,
        video_quality_mbps: 3.5,
        max_bitrate: 4500000,
        flash_button: true,
        allow_high_fps: true,               // Nhận diện video 60fps / 120fps mượt mà
        max_fps: 60,                        // Giới hạn buffer an toàn chống crash Widget
        target_fps: 60,
        transcode_high_fps: true,           // Ép nén chuẩn luồng khung hình cao
        support_hdr: true,
        tone_mapping_enabled: true,         // Chống đen màn hình / cháy sáng video HDR
        force_h264_transcode: true,         // Chuẩn hóa sang H.264 chống lỗi codec
        allow_passthrough: false,          // Luôn kiểm tra & scale đúng khung hình
        normalize_orientation: true,        // Tự động xoay đúng chiều quay
        audio_bitrate_kbps: 128,
        audio_channels: 2
    };

    obj.entries.camera = JSON.stringify(cameraConfig);
    obj.entries.camera_roll = JSON.stringify(cameraRollConfig);

    Object.assign(obj.entries, {
        camera_roll_preview_enabled: "true",
        camera_roll_video_enabled: "true",
        camera_roll_video_upload_enabled: "true",
        internal_camera_roll_video_upload_enabled: "true",
        longer_camera_roll_videos_enabled: "true",
        camera_roll_video_max_duration: albumDurationStr,
        camera_roll_max_duration: albumDurationStr,
        camera_roll_duration: albumDurationStr,
        max_video_duration: albumDurationStr,
        video_max_duration: albumDurationStr,
        video_trim_max_duration: albumDurationStr,
        trim_max_duration: albumDurationStr,
        gold_max_duration: albumDurationStr,
        goldMaxDuration: albumDurationStr,
        max_file_size: MAX_SIZE_BYTES.toString(),
        max_upload_bytes: MAX_SIZE_BYTES.toString(),
        video_quality_mbps: "3.5",
        video_max_dimension: "1440",
        video_target_fps: "60",
        video_allow_60fps: "true",
        video_transcoding_v2: "true",
        video_hdr_tone_mapping_enabled: "true",
        video_sound_enabled: "true",
        microphone_enabled: "true",
        camera_microphone_enabled: "true",
        audio_session_deactivation_enabled: "true",
        zoom_enabled: "true",
        upload_main_image_quality: "1.0",
        upload_main_image_size: "1440",
        upload_thumbnail_image_quality: "1.0",
        upload_thumbnail_image_size: "1020"
    });

    // ============================================================
    // 3. GIỚI HẠN BẠN BÈ & TƯƠNG TÁC CƠ BẢN
    // ============================================================
    Object.assign(obj.entries, {
        max_friends_count: "999999",
        friend_limit_mode: "0",
        soft_friend_limit_threshold_count: "999999",
        show_friend_limit_on_cam: "false",
        signup_max_friends_count: "999999",
        celebrity_inbox_limit: "999999",
        moment_views_enabled: "true",
        moment_views_v2: "true",
        record_moment_views: "true",
        notify_moment_views: "true",
        moment_reactions_v2: "true",
        chat_reactions_enabled: "true",
        conversation_reactions: "true",
        typing_indicators_enabled: "true",
        unsend_message_enabled: "true",
        conversations_enabled: "true",
        fetch_moments_in_conversation: "true",
        groups_enabled: "true",
        send_to_self_only_mode: "always_enabled",
        time_travel_rewind_v2_enabled: "true",
        calendar_delete_moment_enabled: "true",
        rollcall_enabled: "true",
        custom_profile_pics: "true",
        profile_menu_v2_enabled: "true"
    });

    // ============================================================
    // 4. STORAGE, CDN & CACHE
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
        get_latest_moment_v2: "true",
        fetch_users_from_cloud_function: "true",
        refresh_interval: "60",
        firestore_refresh_v2: "true",
        firestore_refresh_v3: "true",
        beta_features_enabled: "true",
        join_testflight_enabled: "true",
        use_thumbnails_for_sharing: "true",
        use_thumbnails_in_timeline: "true"
    });

    // ============================================================
    // 5. CAPTION MẶC ĐỊNH (RÚT GỌN GỌN NHẸ)
    // ============================================================
    Object.assign(obj.entries, {
        captions_enabled: "true",
        music_caption_enabled: "true",
        link_caption_link_enabled: "true",
        overlay_navigator_enabled: "true",
        overlays_v2_config: JSON.stringify({ suggestions_enabled: true }),
        overlay_dynamic_captions: JSON.stringify([
            "standard", "poll", "color_palette", "review", "music", "location",
            "weather", "time", "streak", "star_sign", "party_time", "locket_count"
        ])
    });
}

$done({ body: JSON.stringify(obj) });
