var e = require("../../comm/script/helper"), t = require("../../component/loading/loading"), a = require("../../component/loadingText/loadingText"), o = function e() {
    return e.__luckybag$js__ || (e.__luckybag$js__ = require("./luckybag"));
};

module.exports = {
    ajax: function(o, r, i, n, s, c, l, u) {
        var g = this, d = getApp();
        d && d.globalData.currPage && !n && t.show.call(d.globalData.currPage);
        var f = JSON.stringify(d && d.globalData ? d.globalData.wxSysInfo : null), m = JSON.stringify(d && d.globalData && d.globalData.userInfo ? d.globalData.userInfo : wx.getStorageSync("getUserInfo"));
        e.extend(r, {
            deviceId: d && d.getOpenId() ? d.getOpenId() : e._getUUID(),
            isWechatApp: !0,
            wxSysInfo: f,
            wxUserInfo: m
        });
        var p = wx.getStorageSync("sessionInfo"), h = p ? JSON.parse(p).data : null;
        -1 != o.indexOf("home/initSession") && s && (h = null);
        var x = h && h.memcacheKey ? h.memcacheKey : null, y = x ? "memcacheKey=" + x : null, j = g.getCookieValues(), b = y || "";
        j && (b += (y && j ? "; " : "") + j);
        var v = g.getCookieEageValues();
        v && (b += (b ? "; " : "") + v);
        var C = (d ? d.globalData.mwosDomain : "") + o;
        wx.request({
            url: C,
            data: r,
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                Cookie: b
            },
            success: function(a) {
                var o = a && a.header && a.header["Set-Cookie"] ? a.header["Set-Cookie"] : null;
                if (g.resetCookies(o), 10005 == a.data.errorCode || 14005 == a.data.errorCode || 10001 == a.data.errorCode || 12003 == a.data.errorCode || 14004 == a.data.errorCode || 80098 == a.data.errorCode || 80099 == a.data.errorCode) {
                    var r = a.data.errorMsg;
                    return r ? r += " " : r = "", a.data.traceId && (r += a.data.traceId), !l && wx.showToast({
                        title: r,
                        icon: "none",
                        duration: 3e3
                    }), getApp() && getApp().globalData.currPage && t.hide.call(getApp().globalData.currPage), 
                    void (getApp() && getApp().clearUserInfo(function() {
                        setTimeout(function() {
                            getApp().globalData.getMenuFail ? (wx.navigateTo({
                                url: "../store/store?storeCode=" + getApp().globalData.getMenuFail + "&isfromMenuH5url=" + !0
                            }), getApp().globalData.getMenuFail = !1) : e._backToHome();
                        }, 1e3);
                    }));
                }
                if (a.data.traceId) {
                    var n = a.data.errorMsg;
                    n ? n += " " : n = "", n += a.data.traceId, !l && wx.showToast({
                        title: n,
                        icon: "none",
                        duration: 3e3
                    }), setTimeout(function() {
                        "function" == typeof i && i(a);
                    }, 3e3);
                } else a.data.syncTime && (getApp().globalData.syncTime = a.data.syncTime), "function" == typeof i && i(a);
            },
            fail: function(e) {
                getApp() && getApp().globalData.currPage && (t.hide.call(getApp().globalData.currPage), 
                a.hide.call(getApp().globalData.currPage), "function" == typeof u ? u(e) : "function" == typeof c && c(e)), 
                -1 != e.errMsg.indexOf("request:fail") && (e.errMsg = "网络异常 请重试" + e.errMsg.replace("request:fail", "")), 
                !l && wx.showToast({
                    title: e.errMsg,
                    icon: "none",
                    duration: 2e3
                });
            },
            complete: function(e) {
                "function" == typeof c && c();
            }
        });
    },
    getCookieValues: function() {
        var e = getApp(), t = e && e.globalData && e.globalData.cookies ? e.globalData.cookies : null;
        if (!t) return null;
        var a = "";
        for (var o in t) {
            var r = t[o];
            if (r && !r.expired) {
                var i = r.name + "=" + r.value;
                a && (a += "; "), a += i;
            }
        }
        return a;
    },
    getCookieEageValues: function(e) {
        var e = wx.getStorageSync("sessionEdge"), t = "", a = new Date().getTime();
        for (var o in e) {
            var r = e[o];
            if (r.maxAge <= a) delete e[o]; else {
                var i = o + "=" + r.value;
                t && (t += "; "), t += i;
            }
        }
        return wx.setStorageSync("sessionEdge", e), t;
    },
    resetCookies: function(e) {
        function t(e) {
            return "expires" == (e = e.toLowerCase()) || "max-age" == e || "maxage" == e || "domain" == e || "path" == e || "secure" == e || "httponly" == e;
        }
        if (e) {
            var a = getApp();
            a.globalData.cookies || (a.globalData.cookies = {});
            var o = e.split(","), r = [], i = [];
            o.length && o.forEach(function(e, t) {
                -1 !== e.toLowerCase().indexOf("edge") ? r.push(e) : i.push(e);
            }), r && r.length && function(e) {
                var t = wx.getStorageSync("sessionEdge");
                if (t) var a = Object.keys(t); else t = {};
                var o = new Date().getTime();
                e.forEach(function(e, r) {
                    var i = "";
                    e.split(";").forEach(function(e, r) {
                        var n = e.split("=");
                        -1 !== n[0].toLowerCase().indexOf("edge") && (i = n[0].trim(), a && a.includes(i) ? t[i].value = n[1].trim() : (t[i] = {}, 
                        t[i].value = n[1].trim())), -1 !== n[0].toLowerCase().indexOf("max-age") && t[i] && (t[i].maxAge = 1e3 * (0 | n[1].trim()) + o);
                    });
                }), wx.setStorageSync("sessionEdge", t);
            }(r);
            for (var n = 0; n < i.length; n++) {
                var s = function(e) {
                    if (!e) return null;
                    for (var a = {}, o = e.split(";"), r = 0; r < o.length; r++) {
                        var i = o[r].trim();
                        if (i) {
                            var n = i.split("=");
                            if (n.length && !(n.length < 2)) {
                                var s = n[0].trim(), c = n[1].trim();
                                if (s) {
                                    a[s] = c, t(s) || (a.name = s, a.value = c);
                                    var l = s.toLowerCase();
                                    "max-age" != l && "maxage" != l || "0" != c && 0 != c || (a.expired = !0);
                                }
                            }
                        }
                    }
                    return a;
                }(i[n]);
                s && s.name && (a.globalData.cookies[s.name] = s.expired ? null : s);
            }
        }
    },
    initSession: function(e, t, a) {
        this.ajax(e + "core/home/initSession", {}, t, !1, a);
    },
    getUserInfo: function(e, t) {
        this.ajax("core/wechat/getUserInfo", e, t, !0);
    },
    getCities: function(e) {
        this.ajax("core/misc/cities", {}, e);
    },
    login: function(e, t) {
        this.ajax("core/login", e, t);
    },
    validStore: function(e, t) {
        this.ajax("core/misc/valid/validStore", e, t);
    },
    createOrder: function(e, t) {
        var a = {};
        getApp().globalData.latitude && (a = {
            mylat: getApp().globalData.latitude ? getApp().globalData.latitude : "",
            mylng: getApp().globalData.longitude ? getApp().globalData.longitude : ""
        }), Object.assign(e, a), this.ajax("core/order/create", e, t);
    },
    getMenuByStore: function(e, t) {
        this.ajax("core/menu/getMenuByStore", e, function(e) {
            e && e.data && 0 == e.data.errorCode && (e.data.data = o().filterDelayClass(e.data.data)), 
            t && t(e);
        });
    },
    getMenuByRecommend: function(e, t) {
        this.ajax("minor/fcm/getMenuByRecommend", e, t, !0);
    },
    orderConfirm: function(e, t) {
        var a = o();
        a.isLuckyBagProductByRequest(e) ? a.addLuckyBagProduct(e).then(t) : this.ajax("core/order/confirm", e, t);
    },
    usePromotion: function(e, t) {
        var a = o();
        a.isLuckyBagConpon(e) ? a.addLuckyBagConpon(e).then(t) : this.ajax("minor/order/usePromotion", e, t);
    },
    registerNew: function(e, t) {
        this.ajax("core/registerNew", e, t);
    },
    sendVerificationCode: function(e, t) {
        this.ajax("core/per/sendVerificationCode", e, t);
    },
    kgoldIndex: function(e, t) {
        this.ajax("minor/kgold/kgoldIndex", e, t);
    },
    queryKgoldAccountInfo: function(e, t) {
        this.ajax("minor/kgold/kgoldAccountInfo", e, t);
    },
    gpscity: function(e, t) {
        this.ajax("core/misc/search/getCityByRgeoCode", e, t);
    },
    verifyCode: function(e, t) {
        this.ajax("core/per/verifyVerificationCode", e, t);
    },
    forgetPwd: function(e, t) {
        this.ajax("core/forgetPwd", e, t);
    },
    upgrademember: function(e, t) {
        this.ajax("core/upgradeMember", e, t);
    },
    queryPointAccTrans: function(e, t) {
        this.ajax("minor/kgold/queryPointAccTrans", e, t);
    },
    orderlist: function(e, t, a) {
        this.ajax("minor/order/orderlist", e, t, a);
    },
    orderdetail: function(e, t) {
        this.ajax("minor/order/orderdetail", e, t);
    },
    hisOrderdetail: function(e, t) {
        this.ajax("minor/order/getHisOrderDetailById", e, t);
    },
    sendImageVerificationCode: function(e, t) {
        this.ajax("core/sendImageVerificationCode", e, t);
    },
    closeOrder: function(e, t) {
        this.ajax("core/fiveThousand/closeOrder", e, t);
    },
    queryOrderNumber: function(e, t) {
        this.ajax("minor/order/getOrderNumber", e, t);
    },
    searchAllStoresByCityCode: function(e, t) {
        this.ajax("core/misc/search/searchAllStoresByCityCode", e, t);
    },
    searchAllStoresByKeyWord: function(e, t) {
        this.ajax("core/misc/search/searchAllStoresByCityCodeAndKeyword", e, t, !0);
    },
    addPhone: function(e, t) {
        this.ajax("cust/phone/add", e, t);
    },
    submit: function(e, t) {
        o().savePayParam({
            realPhone: e.phoneToNotLoginUser,
            plateNumber: e.plateNumber
        }), this.ajax("core/order/submit", e, t);
    },
    isSupport5000Store: function(e, t) {
        this.ajax("fiveThousand/isSupport5000Store", e, t);
    },
    delPhoneNum: function(e, t) {
        this.ajax("cust/phone/del", e, t);
    },
    wechatLogin: function(e, t) {
        this.ajax("core/wechat/login", e, t, !0);
    },
    getPaymentUrl: function(e, t, a) {
        o().savePayParam({
            realPhone: e.phoneToNotLoginUser,
            plateNumber: e.plateNumber
        }), this.ajax("core/payment/getPaymentUrl", e, t, null, null, a);
    },
    getCouponList: function(e, t) {
        this.ajax("minor/coupon/getCoupon", e, t);
    },
    resetLimitTimes: function(e, t) {
        this.ajax("core/order/resetLimitTimes", e, t);
    },
    useCouponCode: function(e, t) {
        this.ajax("minor/order/useCouponCode", e, t);
    },
    checkPayStatus: function(e, t) {
        this.ajax("core/payment/checkPayStatus", e, t);
    },
    autoLogin: function(e, t) {
        this.ajax("core/login", e, t);
    },
    logout: function(e, t) {
        this.ajax("minor/logout", e, t);
    },
    initHome: function(e, t) {
        this.ajax("core/home/initHome", e, t);
    },
    getMealDeal: function(e, t) {
        this.ajax("menu/getMealDeal", e, t);
    },
    getUserCodeByPhone: function(e, t) {
        this.ajax("kgold/getUserCodeByPhone", e, t);
    },
    setPassword: function(e, t) {
        this.ajax("minor/kgold/setPassword", e, t);
    },
    cancelOrder: function(e, t) {
        this.ajax("core/order/cancel", e, t);
    },
    asyncCancelOrder: function(e, t) {
        this.ajax("core/order/cancelAsync", e, t, !0);
    },
    getStoreByStoreCode: function(e, t) {
        this.ajax("core/misc/search/store", e, t);
    },
    storeAndOrder: function(e, t) {
        var a = {};
        getApp().globalData.latitude && (a = {
            mylat: getApp().globalData.latitude ? getApp().globalData.latitude : "",
            mylng: getApp().globalData.longitude ? getApp().globalData.longitude : ""
        }), Object.assign(e, a), this.ajax("core/misc/storeAndOrder", e, t);
    },
    getOrderListHistory: function(e, t) {
        this.ajax("minor/order/orderhistory", e, t);
    },
    queryStores: function(e, t) {
        this.ajax("minor/customer/queryStores", e, t);
    },
    addStore: function(e, t, a) {
        this.ajax("minor/customer/addStore", e, t, a);
    },
    delStore: function(e, t, a) {
        this.ajax("minor/customer/delStore", e, t, a);
    },
    submitZeroOrder: function(e, t, a) {
        this.ajax("core/order/submit", e, t, null, null, a);
    },
    submitZeroOrders: function(e, t, a) {
        this.ajax("core/order/submit", e, t, !0, null, a);
    },
    getAccountStatus: function(e, t) {
        this.ajax("minor/payment/getAccountStatus", {}, e, t);
    },
    queryAvailablePrime: function(e, t) {
        this.ajax("minor/prime/queryAvailablePrime", {}, e, t);
    },
    getPrimeDiscountPrice: function(e, t) {
        this.ajax("minor/prime/getPrimeDiscountPrice", e, t, !0);
    },
    gotoCapthca: function(e) {
        getApp().globalData.getGt = e.geetest.gt, getApp().globalData.getChallenge = e.geetest.challenge, 
        getApp().globalData.getSuccess = e.geetest.success;
        wx.createSelectorQuery().select("#phone").fields({
            properties: [ "value" ]
        }, function(e) {
            wx.navigateTo({
                url: "/pages/captcha/captcha-slide",
                fail: function(e) {
                    wx.hideLoading();
                }
            });
        }).exec();
    },
    getActivityInfo: function(e, t, a) {
        this.ajax("minor/activity/getActivityInfo", e, t, a);
    },
    quickOrders: function(e, t) {
        var a = {};
        getApp().globalData.latitude && (a = {
            mylat: getApp().globalData.latitude ? getApp().globalData.latitude : "",
            mylng: getApp().globalData.longitude ? getApp().globalData.longitude : ""
        }), Object.assign(e, a), this.ajax("minor/order/quickOrders", e, t);
    },
    queryVgoldInfo: function(e, t) {
        this.ajax("minor/kgold/queryRewardInfo", e, t);
    },
    queryMyVgold: function(e, t) {
        this.ajax("minor/kgold/queryRewardAvailable", e, t, !0);
    },
    getInvoiceInfo: function(e, t) {
        this.ajax("minor/invoice/getInvoiceInfo", e, t);
    },
    getBroadcast: function(e, t) {
        this.ajax("minor/promotion/getBroadcastList", e, t);
    },
    postCoupon: function(e, t) {
        this.ajax("minor/coupon/usePromptCoupon", e, t);
    },
    querySubstores: function(e, t) {
        this.ajax("core/misc/search/store", e, t);
    },
    changeSubstore: function(e, t) {
        var a = {};
        getApp().globalData.latitude && (a = {
            mylat: getApp().globalData.latitude ? getApp().globalData.latitude : "",
            mylng: getApp().globalData.longitude ? getApp().globalData.longitude : ""
        }), Object.assign(e, a), this.ajax("core/order/changeStore", e, t);
    },
    changeSubstoreConfirm: function(e, t) {
        this.ajax("core/order/changeStoreConfirm", e, t);
    },
    addformula: function(e, t) {
        this.ajax("core/formula/addFormula", e, t);
    },
    delFormula: function(e, t) {
        this.ajax("core/formula/delFormula", e, t);
    },
    selFormulaList: function(e, t) {
        this.ajax("core/formula/selFormulaList", e, t);
    },
    getPromptCoupon: function(e, t) {
        this.ajax("minor/activity/getPromptCoupon", e, t);
    },
    getFishActivity: function(e, t) {
        this.ajax("minor/activity/getFishActivity", e, t);
    },
    saveOnlinePayOrder: function(e, t, a) {
        o().savePayParam({
            realPhone: e.phoneToNotLoginUser,
            plateNumber: e.plateNumber
        }), this.ajax("core/payment/saveOnlinePayOrder", e, t, !0, null, null, !0, a);
    },
    getOrderStatusById: function(e, t) {
        this.ajax("minor/order/getOrderStatusById", e, t, !0);
    },
    getOrderStatusWordData: function(e, t) {
        this.ajax("minor/resource/getOrderStatusWordData", e, t, !0);
    },
    getWxCoupon: function(e, t) {
        this.ajax("core/weixin/sendWxCoupon", e, t, !0);
    },
    createYpymOrder: function(e, t) {
        this.ajax("core/order/createYpymOrder", e, t, !0);
    },
    getRenewPrimeCoupon: function(e, t) {
        this.ajax("minor/prime/getRenewPrimeCoupon", e, t, !0);
    },
    checkEscape: function(e, t, a) {
        this.ajax("flowswitch", e, t, !1, null, null, null, a);
    }
};