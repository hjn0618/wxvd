function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = require("../../comm/script/model"), a = require("../../component/loading/loading"), i = require("../../comm/script/order-helper"), n = require("../../component/styleTemplate/template"), o = require("../../comm/script/luckybag"), r = o.setNextNoHidePage, u = o.getContextConfig, m = o.getluckyBagADetailCountdown, s = o.setLuckyBagAddFlag, _ = o.getAllLuckyBagAddFlag, l = o.getVue, d = o.setVue, p = o.getAllVueKey;

Component({
    properties: {},
    data: {
        title: "6折福袋砸中您啦",
        timeStr: "",
        timeItem: {},
        content: "",
        show: !1,
        bottomImgLoaded: !1
    },
    attached: function() {
        console.log("getApp().globalData.imageResPath", getApp().globalData.imageResPath), 
        this.data.luckyBagPriorVue = l(p().LuckyBagPopup), d(this, p().LuckyBagPopup);
        var t = u();
        this.setData({
            title: t.luckyBagPopup && t.luckyBagPopup.title || "",
            couponPromotionDisplay: {},
            imageResPath: getApp().globalData.imageResPath
        });
    },
    detached: function() {
        d(this.data.luckyBagPriorVue, p().LuckyBagPopup);
    },
    methods: {
        plusPromotion: function(t) {
            var e = this.data.couponPromotionDisplay, a = e.items[t.currentTarget.dataset.index];
            e.__num__ || 0 == e.__num__ || (e.__num__ = 0), a && !a.__num__ && 0 != a.__num__ && (a.__num__ = 0), 
            a.__num__ + 1 <= a.restrictionQuantity && (a.__num__ += 1, e.__num__ += 1), this.setData({
                couponPromotionDisplay: e
            }), a.linkId && getApp().onTdEvent({
                id: "mini_kfcp_mainmenu_fudai_add",
                params: {
                    product2: a.linkId
                }
            });
        },
        minusPromotion: function(t) {
            var e = this.data.couponPromotionDisplay, a = e.items[t.currentTarget.dataset.index];
            e.__num__ || 0 == e.__num__ || (e.__num__ = 0), a && !a.__num__ && 0 != a.__num__ && (a.__num__ = 0), 
            a && a.__num__ > 0 && (a.__num__ -= 1, e.__num__ -= 1), this.setData({
                couponPromotionDisplay: e
            }), a.linkId && getApp().onTdEvent({
                id: "mini_kfcp_mainmenu_fudai_delete",
                params: {
                    product2: a.linkId
                }
            });
        },
        addAll: function() {
            getApp().onTdEvent({
                id: "mini_kfcp_mainmenu_fudai_chooseall"
            });
            var t = this.data.couponPromotionDisplay;
            t.__num__ = 0, t.items.forEach(function(e) {
                e.__num__ = e.restrictionQuantity, t.__num__ += e.__num__;
            }), this.setData({
                couponPromotionDisplay: t
            }), s(_().all), this.add();
        },
        addCustom: function() {
            getApp().onTdEvent({
                id: "mini_kfcp_mainmenu_fudai_confirm"
            }), s(_().custom), this.add();
        },
        add: function(t) {
            var a = this, n = getApp(), o = [];
            if (!this.data.couponPromotionDisplay.__num__ || this.data.couponPromotionDisplay.__num__ <= 0) wx.showToast({
                title: "请选择优惠",
                icon: "none",
                duration: 2e3
            }); else {
                var r = this.data.couponPromotionDisplay.items;
                if (r && r.length > 0) for (var u = 0; u < r.length; u++) r[u].__num__ > 0 && o.push({
                    productid: r[u].pmid,
                    linkId: r[u].linkId,
                    proid: r[u].id,
                    count: r[u].__num__,
                    specialProductFlag: "22"
                });
                e.usePromotion({
                    items: JSON.stringify(o)
                }, function(t) {
                    if (0 == t.data.errorCode) {
                        n.globalData.bigOrderValue = t.data.showBigOrder ? t.data.bigOrderValue : -1, n.globalData.order = t.data.order, 
                        i._caculateOrder(n.globalData.order), i.isNotFixcondiment();
                        var e = l(p().initkey);
                        e && e.confirmOrderSyncData();
                    }
                    a.close();
                });
            }
        },
        close: function() {
            getApp().onTdEvent({
                id: "mini_kfcp_mainmenu_fudai_close"
            }), this.setData({
                show: !1
            });
        },
        setContent: function() {
            var e = this, a = m();
            if (a !== this.data.content) {
                this.data.content = a;
                var i = this.getBrItem(), o = this.getTemplateContext(n.createContent(a), /<br.?>/i, i), r = [], u = !0, s = !1, _ = void 0;
                try {
                    for (var l, d = o[Symbol.iterator](); !(u = (l = d.next()).done); u = !0) {
                        var p = l.value, c = this.getImageItems(p.text);
                        r.push.apply(r, this.getTemplateContext(p, /<img .*?>/i, c, !0));
                    }
                } catch (t) {
                    s = !0, _ = t;
                } finally {
                    try {
                        !u && d.return && d.return();
                    } finally {
                        if (s) throw _;
                    }
                }
                o = r;
                var r = [], g = this.getTimeItem(), h = !0, f = !1, y = void 0;
                try {
                    for (var v, k = o[Symbol.iterator](); !(h = (v = k.next()).done); h = !0) {
                        var P = v.value;
                        r.push.apply(r, this.getTemplateContext(P, "{time}", g));
                    }
                } catch (t) {
                    f = !0, y = t;
                } finally {
                    try {
                        !h && k.return && k.return();
                    } finally {
                        if (f) throw y;
                    }
                }
                var D = [];
                if (r) for (var I = 0; I < r.length; I++) r[I] && r[I].isTime && D.push(I);
                this.data.timeItem = g, this.data.timeItemIndex = D, n.setContents.call(this, r);
            } else {
                var b = this.data.timeItemIndex;
                this.data.timeItem.text = this.data.timeStr, b && b.forEach(function(a) {
                    e.setData(t({}, "styleTemplateContents[" + a + "]", e.data.timeItem));
                });
            }
        },
        getTemplateContext: function(t, e, a, i) {
            for (var o = t.text.split(e), r = [], u = 0, m = 0; m < o.length; m++) {
                a && m % 2 != 0 && (i ? r.push(a[u++]) : r.push(a));
                var s = Object.assign({}, t);
                r.push(Object.assign(s, n.createContent(o[m], t.style || "display: inline;", t.class || "")));
            }
            return r;
        },
        getBrItem: function() {
            return n.createContent("", "display: block;", "");
        },
        getImageItems: function(t) {
            if (t) {
                var e = t.match(/<img .*?src=['"](.*?)['"].*?>/gi);
                if (e) {
                    var a = /<img .*?src=['"](.*?)['"].*?>/i;
                    return e.map(function(t) {
                        return t.match(a)[1];
                    }).map(function(t) {
                        return n.createImageTag(t, "", "lucky-bag-icon");
                    });
                }
            }
        },
        getTimeItem: function() {
            var t = n.createContent(this.data.timeStr, "display: inline;", "time");
            return t.isTime = !0, t;
        },
        goDetail: function() {
            getApp().onTdEvent({
                id: "mini_kfcp_mainmenu_fudai_detail"
            }), r(!0), wx.navigateTo({
                url: "/pages/luckybag/luckybag-rules"
            });
        },
        popupShowTD: function(t) {
            for (var e = "", a = 0; a < this.data.couponPromotionDisplay.items.length; a++) e += this.data.couponPromotionDisplay.items[a].linkId + "_";
            getApp().onTdEvent({
                id: t ? "mini_kfcp_mainmenu_fudai_popup1" : "mini_kfcp_mainmenu_fudai_popup2",
                params: {
                    product2: e.substr(0, e.length - 1)
                }
            });
        },
        imgOnLoad: function() {
            this.setData({
                bottomImgLoaded: !0
            }), a.hide.call(getCurrentPages()[getCurrentPages().length - 1]);
        }
    }
});