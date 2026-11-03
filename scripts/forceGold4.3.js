// ============================================================
// Locket Remote Config Rewrite - Fix Native Transcode
// Endpoint: firebaseremoteconfig.googleapis.com
// Dùng cho: Loon / Quantumult X / Surge / Shadowrocket
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.Attention = "Đã tối ưu hóa tính năng gửi Video Album!";
    obj.state = "UPDATE";
    obj.entries = obj.entries || {};

    // 1. Kích hoạt tính năng Gold & gỡ giới hạn
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

    // 2. Cấu hình Camera Roll theo Preset tự nhiên của iOS
    // Không can thiệp bitrate cưỡng bức để tránh lỗi mã hóa AVFoundation
    var cameraConfig = {
        gold_max_duration: 30.0,
        max_duration: 30.0,
        ultra_wide: true,
        volume_button: true,
        flash_button: true,
        telephoto: true
    };

    var cameraRollConfig = {
        gold_max_duration: 30.0,
        video_max_duration: 30.0,
        max_duration: 30.0,
        trim_max_duration: 30.0,
        camera_roll_max_duration: 30.0,
        camera_roll_video_max_duration: 30.0,
        max_file_size: 52428800,
        max_upload_bytes: 52428800
    };

    obj.entries.camera = JSON.stringify(cameraConfig);
    obj.entries.camera_roll = JSON.stringify(cameraRollConfig);

    Object.assign(obj.entries, {
        camera_roll_preview_enabled: "true",
        camera_roll_video_enabled: "true",
        camera_roll_video_upload_enabled: "true",
        internal_camera_roll_video_upload_enabled: "true",
        longer_camera_roll_videos_enabled: "true",
        camera_roll_video_max_duration: "30.0",
        camera_roll_max_duration: "30.0",
        camera_roll_duration: "30.0",
        max_video_duration: "30.0",
        video_max_duration: "30.0",
        video_trim_max_duration: "30.0",
        trim_max_duration: "30.0",
        gold_max_duration: "30.0",
        max_file_size: "52428800",
        max_upload_bytes: "52428800",
        video_sound_enabled: "true",
        microphone_enabled: "true",
        camera_microphone_enabled: "true"
    });

    // 3. Caption & tính năng phụ
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
