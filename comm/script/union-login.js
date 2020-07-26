function o() {
    var o = getApp();
    o.globalData.isLoginBackMenu = !0, t.getMenuByStore({
        portalType: "WAP",
        portalSource: "WECHATMINI"
    }, function(e) {
        n.hide.call(o.globalData.currPage), o.globalData.menuVoList = e.data, o.globalData.promotionList = e.data.couponList, 
        o.globalData.bigSystemIds = e.data.bigSystemIds, o.globalData.hasAddedHalf = [], 
        o.globalData.halfProductList = {}, o.globalData.defaultClassId = null, t.queryAvailablePrime(function(e) {
            0 === e.data.errorCode && (o.globalData.primeCardVo = e.data.primeCardVo, l._initPrimeCardName());
        }, !0), o.globalData.mustMemberFlag ? wx.redirectTo({
            url: "../settlement/settlement"
        }) : wx.redirectTo({
            url: "../menu/menu"
        });
    });
}

function e() {
    var o = getApp(), e = o.globalData.collectList, a = o.globalData.NologinLoveStore;
    t.addStore({
        userId: o.globalData.user.id,
        storeCode: a.storecode
    }, function(t) {
        n.hide.call(o.globalData.currPage), 0 == t.data.errorCode ? (wx.showToast({
            title: "收藏餐厅成功",
            icon: "none",
            duration: 2e3
        }), a.__isShow__ = !1, e.unshift(a)) : 1502 == t.data.errorCode ? wx.showToast({
            title: "最多收藏2家餐厅哦~",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: t.data.errorMsg,
            icon: "none",
            duration: 2e3
        }), o.globalData.NologinLoveStore = {}, wx.redirectTo({
            url: "../store/store"
        });
    });
}

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, t = require("./model"), r = (require("./helper"), require("./order-helper")), l = require("./menu-helper"), n = require("../../component/loading/loading");

module.exports = {
    loginFinish: function(l) {
        var n = getApp();
        console.log("登录返回信息：" + JSON.stringify(l));
        var i = {
            unionId: l && l.wxlapp && l.wxlapp.unionid ? l.wxlapp.unionid.trim() : ""
        };
        if (i.unionId) {
            var d = n.globalData.userInfo || {};
            if (Object.assign(d, i), n.globalData.userInfo = d, console.log("userInfo：" + JSON.stringify(d)), 
            n.rickControlInstance(), n.globalData.userInfo) try {
                wx.setStorageSync("getUserInfo", n.globalData.userInfo);
            } catch (o) {}
            if (l && "object" == (void 0 === l ? "undefined" : a(l))) {
                var g = n.globalData.unionLoginPage;
                n.globalData.nonUnionIdLogin = !1, "menu" != g && "coupon" != g || (n.globalData.isRemainOrder = !0), 
                n.autoLogin(function() {
                    if (n.globalData.isRemainOrder = !1, "menu" == g) (l = r._getProductsAdd(!0)) && l.length > 0 ? t.orderConfirm({
                        orderItems: JSON.stringify(l),
                        oid: n.globalData.order.id,
                        delFlag: "true"
                    }, function(e) {
                        0 == e.data.errorCode ? (e.data.order.items && e.data.order.items.length < l.length && (n.globalData.showmToast = !0), 
                        n.globalData.bigOrderValue = e.data.showBigOrder ? e.data.bigOrderValue : -1, n.globalData.order = e.data.order, 
                        o()) : (wx.redirectTo({
                            url: "../menu/menu"
                        }), wx.showToast({
                            title: e.errorMsg,
                            icon: "none",
                            duration: 2e3
                        }));
                    }) : o(); else if ("store" == g) {
                        if (getApp().globalData.NologinLoveStore) {
                            for (var a = 0; a < n.globalData.collectList.length; a++) if (n.globalData.collectList[a].storecode == getApp().globalData.NologinLoveStore.storecode) return getApp().globalData.showCollect = !0, 
                            void (getApp().globalData.NologinLoveStore = {});
                            e();
                        } else wx.redirectTo({
                            url: "../store/store"
                        });
                        getApp().globalData.isStoreLogin = !0;
                    } else if ("coupon" == g) {
                        var l = r._getProductsAdd(!0);
                        l && l.length > 0 ? t.orderConfirm({
                            orderItems: JSON.stringify(l),
                            oid: n.globalData.order.id,
                            delFlag: "true"
                        }, function(e) {
                            0 == e.data.errorCode ? (e.data.order.items && e.data.order.items.length < l.length && (n.globalData.showmToast = !0), 
                            n.globalData.bigOrderValue = e.data.showBigOrder ? e.data.bigOrderValue : -1, n.globalData.order = e.data.order, 
                            o()) : (wx.redirectTo({
                                url: "../menu/menu"
                            }), wx.showToast({
                                title: e.errorMsg,
                                icon: "none",
                                duration: 2e3
                            }));
                        }) : o();
                    } else "home" == g && wx.redirectTo({
                        url: "../home/home"
                    });
                });
            }
        } else wx.showToast({
            title: "登录失败",
            icon: "none",
            duration: 2e3
        });
    }
};