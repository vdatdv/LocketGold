// ============================================================
// Locket Remote Config Rewrite - Fix Upload Error
// Endpoint: firebaseremoteconfig.googleapis.com
// Dùng cho: Loon / Quantumult X / Surge / Shadowrocket
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.Attention = "Đã tối ưu video & sửa lỗi gửi!";
    obj.state = "UPDATE";
    obj.entries = obj.entries || {};

    // ============================================================
    // 1. KÍCH HOẠT GOLD & MỞ TÍNH NĂNG
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
        sentry_sample_rate: "0"
    });

    // ============================================================
    // 2. CẤU HÌNH VIDEO CHUẨN SERVER (TRÁNH FAILED TO SEND)
    // ============================================================
    // Để 30s để server không reject payload upload
    var ALBUM_VIDEO_DURATION = 30.0;
    var albumDurationStr = ALBUM_VIDEO_DURATION.toString();
    var MAX_SIZE_BYTES = 52428800; // 50 MiB (chuẩn an toàn)

    var cameraConfig = {
        gold_max_duration: 30.0,
        goldMaxDuration: 30.0,
        max_duration: 30.0,
        maxDuration: 30.0,
        ultra_wide: true,
        ultraWide: true,
        volume_button: true,
        volumeButton: true,
        flash_button: true,
        telephoto: true,
        srgb: true,
        quality_mbps: 2.0,
        qualityMbps: 2.0,
        fps: 30
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
        quality_mbps: 2.0,
        qualityMbps: 2.0,
        video_quality_mbps: 2.0,
        allow_high_fps: true,
        max_fps: 30,
        target_fps: 30,
        transcode_high_fps: true,
        support_hdr: true,
        tone_mapping_enabled: true,
        force_h264_transcode: true,
        normalize_orientation: true,
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
        video_quality_mbps: "2.0",
        video_max_dimension: "1080",
        video_target_fps: "30",
        video_sound_enabled: "true",
        microphone_enabled: "true",
        camera_microphone_enabled: "true",
        upload_main_image_quality: "0.9",
        upload_main_image_size: "1080"
    });

    // ============================================================
    // 3. TÍNH NĂNG PHỤ & CAPTION CƠ BẢN
    // ============================================================
    Object.assign(obj.entries, {
        moment_views_enabled: "true",
        moment_views_v2: "true",
        record_moment_views: "true",
        moment_reactions_v2: "true",
        conversations_enabled: "true",
        fetch_moments_in_conversation: "true",
        custom_profile_pics: "true",
        captions_enabled: "true",
        music_caption_enabled: "true",
        link_caption_link_enabled: "true",
        overlay_navigator_enabled: "true",
        overlays_v2_config: JSON.stringify({ suggestions_enabled: true })
    });
}

$done({ body: JSON.stringify(obj) });
