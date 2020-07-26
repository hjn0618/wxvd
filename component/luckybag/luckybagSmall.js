var a = require("../../comm/script/luckybag"), t = a.getContextConfig, i = a.showluckyBagPopup, e = a.getVue, l = a.setVue, n = a.getAllVueKey;

Component({
    properties: {
        couponType: {
            type: String,
            value: "0"
        }
    },
    data: {
        luckyBagSmallState: "Small",
        showluckyBagSmallDom: !1,
        animation: "",
        url: "",
        delay: !1
    },
    attached: function() {
        this.data.luckyBagPriorVue = e(n().luckybagKey), l(this, n().luckybagKey);
        var a = t().luckyBagSmall || {}, i = a.image + "?v=" + (this.data.__index = 0);
        this.setData({
            luckyBagSmallConfig: a,
            url: i
        });
    },
    detached: function() {
        l(this.data.luckyBagPriorVue, n().luckybagKey);
    },
    methods: {
        clickSmall: function() {
            this.data.delay && (this.setData({
                delay: !1,
                animation: "showAM"
            }), getApp().onTdEvent({
                id: "mini_kfcp_mainmenu_fudai_click"
            }), this.setData({
                url: this.data.luckyBagSmallConfig.image + "?v=" + ++this.data.__index
            }), this.showluckyBagBig());
        },
        showluckyBagSmall: function(a, t) {
            if (this.data.showluckyBagSmallDom !== a) {
                a && ("monitor" === t || "initMenu" === t) && getApp().onTdEvent({
                    id: "mini_kfcp_mainmenu_fudai_show1"
                });
                var i = {
                    showluckyBagSmallDom: a
                };
                if ("monitor" === t) {
                    var e = this;
                    Object.assign(i, {
                        delay: !1,
                        animation: "showAM"
                    }), setTimeout(function() {
                        e.setData({
                            delay: !0,
                            animation: "vibrateAM"
                        });
                    }, 3e3);
                } else Object.assign(i, {
                    delay: a,
                    animation: a ? "vibrateAM" : ""
                });
                this.setData(i);
            }
        },
        showluckyBagBig: function() {
            var a = this;
            setTimeout(function() {
                a.setData({
                    delay: !0,
                    animation: "vibrateAM"
                });
            }, 3e3), i();
        }
    }
});