# Spotify VINHDAT

Thư mục này chứa mã Spotify độc lập với các script Locket Gold.

- `spotify.js`: JavaScript xử lý yêu cầu và phản hồi Spotify.
- `Spotify_VINHDAT.module`: module Shadowrocket tham chiếu đến `Spotify/spotify.js`.
- `Spotify_VINHDAT.sgmodule`: module Surge tham chiếu đến `Spotify/spotify.js`.

## Cấu trúc

```text
LocketGold/
├── scripts/                     # Giữ nguyên script Locket Gold
├── Spotify/
│   ├── spotify.js
│   ├── Spotify_VINHDAT.module
│   ├── Spotify_VINHDAT.sgmodule
│   └── README.md
└── ...
```

## Đường dẫn script sau khi đưa lên nhánh main

`https://raw.githubusercontent.com/vdatdv/LocketGold/main/Spotify/spotify.js`

> Lưu ý: script không cấp quyền thuê bao Spotify Premium thực; chức năng phụ thuộc phiên bản ứng dụng và công cụ proxy. Việc can thiệp HTTPS cần được cân nhắc về bảo mật và quyền riêng tư.
