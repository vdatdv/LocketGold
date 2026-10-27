
/*
 * Project: Locket Gold
 * Distribution: vinhdat
 * GitHub: https://github.com/vdatdv
 * Version: 1.0.0
 *
 * Based on Nightmarket source.
 * Original license and attribution retained.
 */

// ========= ID ========= //
const mapping = {
  'Locket': ['Gold']
};

// ========= Phần cố định ========= //
var ua = $request.headers["User-Agent"] ||
         $request.headers["user-agent"] ||
         "";

var obj = JSON.parse($response.body);

obj.Attention =
  "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

var NMS = {
  auto_resume_date: null,
  display_name: "locket_1600_1y",
  is_sandbox: true,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  management_url: "https://apps.apple.com/account/subscriptions",
  period_type: "normal",

  price: {
    amount: 399000.0,
    currency: "VND"
  },

  expires_date: "9999-01-09T10:10:14Z",
  grace_period_expires_date: null,
  refunded_at: null,
  unsubscribe_detected_at: null,

  // Ngày mua: 07/10/2006
  original_purchase_date: "2006-10-07T10:10:15Z",
  purchase_date: "2006-10-07T10:10:14Z",

  store: "app_store",
  store_transaction_id: "2000001108724193"
};

var locketGold = {
  grace_period_expires_date: null,

  // Ngày mua: 07/10/2006
  purchase_date: "2006-10-07T10:10:14Z",

  product_identifier: "locket_1600_1y",
  expires_date: "9999-01-09T10:10:14Z"
};

// ========= Xử lý ========= //
const match = Object.keys(mapping).find(
  e => ua.includes(e)
);

if (match) {
  let [e, s] = mapping[match];

  if (s) {
    locketGold.product_identifier = s;
    obj.subscriber.subscriptions[s] = NMS;
  } else {
    obj.subscriber.subscriptions[
      "locket_1600_1y"
    ] = NMS;
  }

  obj.subscriber.entitlements[e] = locketGold;

} else {
  obj.subscriber.subscriptions[
    "locket_1600_1y"
  ] = NMS;

  obj.subscriber.entitlements.pro = locketGold;
}

$done({
  body: JSON.stringify(obj)
});
