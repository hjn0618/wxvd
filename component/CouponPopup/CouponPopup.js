var o = require("../../comm/script/model");

require("../../component/loading/loading");

Component({
    properties: {
        couponType: {
            type: String,
            value: "0"
        },
        showCouponPopup: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        imageResPath: getApp().globalData.imageResPath
    },
    detached: function() {},
    methods: {
        close: function() {
            this.setData({
                showCouponPopup: !1
            });
        },
        draw: function(e) {
            var t = this, a = wx.getStorageSync("openId");
            a && o.getWxCoupon({
                openid: a
            }, function(o) {
                0 == o.data.errorCode ? (t.setData({
                    couponType: "1"
                }), wx.setStorageSync("wxCouponId", o.data.data)) : t.setData({
                    couponType: "2"
                });
            });
        },
        _clickToastImageClose: function(o) {},
        _clickToastImageSave: function(o) {}
    }
});