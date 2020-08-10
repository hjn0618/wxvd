var e = require("../../comm/script/weapp-qrcode"), t = require("../../comm/script/rpx2px"), i = require("../../comm/script/date-format"), o = require("../../comm/script/blueimp-md5"), r = t(300);

Component({
    properties: {
        qrcodeVisible: {
            type: Boolean,
            value: !0
        },
        needGuide: {
            type: Boolean,
            value: !1
        },
        orderFinishNumber: {
            type: String
        },
        order: {
            type: Object
        }
    },
    data: {
        selfSupportMealCode: getApp().globalData.selfSupportMealCode,
        configSwitch: !1,
        guideVisible: !1,
        popupVisible: !1,
        qrcodeSize: r,
        isFirstOrder: !0,
        buffetQrcodeImgpath: ""
    },
    lifetimes: {
        created: function() {},
        ready: function() {
            this.setData({
                selfSupportMealCode: getApp().globalData.selfSupportMealCode,
                guideVisible: this.data.needGuide && !wx.getStorageSync("UNFIRST_TO_BUFFET")
            }), this.setQrcodeValue(), this.setData({
                configSwitch: this.getConfigSwitch()
            }), this.triggerEvent("onShowQRCodeGuide", {
                show: this.data.guideVisible && this.data.configSwitch
            });
        }
    },
    pageLifetimes: {
        show: function() {},
        hide: function() {}
    },
    observers: {
        orderFinishNumber: function() {
            this.setQrcodeValue();
        },
        order: function(e) {
            e && this.data.isFirstOrder && this.setData({
                configSwitch: this.getConfigSwitch(),
                isFirstOrder: !1
            });
        }
    },
    methods: {
        getConfigSwitch: function() {
            if (this.data.order) {
                if (i._dateFormater(new Date(getApp().globalData.syncTime), "numberDate") !== i._dateFormater(new Date(this.data.order.orderTime), "numberDate")) return !1;
                var e = getApp().globalData.selfSupportMealCode, t = e.nationwideSwitch, o = e.citySwitch, r = e.storeSwitch, a = e.marketSwitch, s = e.cityList, d = e.storeList, c = e.marketList, n = this.data.order.store;
                return "Q" !== n.typeCode && (!!t || (!!(a && c && c.length && c.includes(n.marketcode)) || (!!(o && s && s.length && s.includes(n.citycode)) || !!(r && d && d.length && d.includes(n.storecode)))));
            }
        },
        changePopupVisible: function(e) {
            var t = e.currentTarget.dataset.popupVisible;
            this.setData({
                popupVisible: t
            });
        },
        closeGuide: function() {
            this.setData({
                guideVisible: !1
            }), wx.setStorageSync("UNFIRST_TO_BUFFET", "1"), this.triggerEvent("onShowQRCodeGuide", {
                show: this.data.guideVisible
            });
        },
        setQrcodeValue: function() {
            var t = this;
            if (this.data.orderFinishNumber || !this.data.buffetQrcodeImgpath) {
                var a = this.data.order.store.storecode, s = i._dateFormater(new Date(this.data.order.orderTime), "mmdd"), d = this.data.orderFinishNumber, c = [ a, s, d, o([ a, s, d ].join("-"), "MJcUsNL5j5DIrcAgaeW7dfxSvmBMpmNB").slice(0, 8).toLowerCase() ].join("-"), n = new e("buffet-qrcode", {
                    width: r,
                    height: r,
                    colorDark: "#000",
                    colorLight: "white",
                    correctLevel: e.CorrectLevel.H,
                    usingIn: this
                });
                n.makeCode(c, function() {
                    setTimeout(function() {
                        wx.canvasToTempFilePath({
                            canvasId: "buffet-qrcode",
                            success: function(e) {
                                e.tempFilePath && !t.data.buffetQrcodeImgpath && t.setData({
                                    buffetQrcodeImgpath: e.tempFilePath
                                });
                            },
                            fail: function(e) {
                                console.log(e);
                            }
                        }, t);
                    }, 1e3);
                }), this.setData({
                    buffetQrcode: {
                        instance: n,
                        code: c
                    }
                });
            }
        },
        drawQrcode: function() {
            var e = this.data.buffetQrcode, t = e.instance, i = e.code;
            t && i && t.makeCode(i, function() {
                for (var e = arguments.length, t = Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                console.log(t);
            });
        },
        stopBubble: function() {}
    }
});