function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.checkLuckbagBalancePay = exports.submitOrder = exports.getAmountInfo = exports.savePayParam = exports.getActivityDetail = exports.syncLuckybagOrderToVUEX = exports.endPaySuccessDownTiming = exports.startPaySuccessDownTiming = exports.getPaySuccessConfig = exports.paySuccessIsEnable = exports.getluckybagOrder = exports.setluckybagOrder = exports.usePaySuccessPromotion = exports.paySuccessInitLuckybag = exports.updateLuckyBagProductForMenu = exports.getNextNoHidePage = exports.setNextNoHidePage = exports.checkHasLuckbag = exports.checkOrderHasLuckbag = exports.filterDelayClass = exports.getluckyBagADetail = exports.getluckyBagADetailCountdown = exports.getluckyBagCartCountdown = exports.getluckyBagCountDownText = exports.discontinueDownTime = exports.resetDownTime = exports.showDownTimePop = exports.showProductInvalidConfim = exports.setShowScFlag = exports.orderBeLuckyBagProduct = exports.addLuckyBagConponSuccess = exports.addLuckyBagProductSuccess = exports.isluckyBagBreakfast = exports.addLuckyBagConpon = exports.addLuckyBagProduct = exports.noProductInfo = exports.cleanluckyBagBreakfastItemCache = exports.luckyBagBreakfastItemHendle = exports.findLuckyBagProductByFlag = exports.isLuckyBagConpon = exports.isLuckyBagProductByRequest = exports.showluckyBagPopup = exports.isEnable = exports.switchType = exports.productType = exports.getContextConfig = exports.getShopCartConfig = exports.getluckyBagBreakfastConfig = exports.getTimeConfig = exports.getVue = exports.setVue = exports.initluckyBag = exports.getAllVueKey = exports.cleanRequest = exports.luckybagSubmitOrderReset = exports.luckybagSubmitOrderStop = exports.orderWaitPayTime = exports.getLuckyBagAddFlag = exports.setLuckyBagAddFlag = exports.getAllLuckyBagAddFlag = exports.setPrePage = void 0;

var t = e(require("./luckybagRequest")), o = e(require("./storage")), n = (require("../../component/confirm/confirm"), 
require("../../component/luckybagConfirm/confirm")), a = require("../../component/loading/loading"), r = require("./order-helper"), u = require("../../component/notify/notify"), i = require("../../comm/script/helper"), c = require("../../comm/script/subscribe-message"), s = {
    vm: {},
    vmMap: {},
    vuex: {
        luckyBagConfig: function() {
            return getApp().globalData.luckyBagConfig || {};
        },
        currentPage: function() {
            return getCurrentPages()[getCurrentPages().length - 1];
        },
        order: function() {
            return getApp().globalData.order || {};
        },
        couponWriteOffConfig: function() {
            return {
                switch: "true" === getApp().globalData.asyncVerifyFlag || !0 === getApp().globalData.asyncVerifyFlag
            };
        },
        store: function() {
            return getApp().globalData.order ? getApp().globalData.order.store : {};
        },
        openId: function() {
            return getApp().getOpenId();
        },
        preorder: function() {
            return require("./model");
        },
        showScFlag: function() {
            return s.vuex.__ShowScFlag__;
        }
    },
    webSockClient: {
        luckyBagWS: null,
        waitOutTime: 3e4
    },
    downTime: null,
    timeouts: [],
    intervals: [],
    initing: !1,
    showDownTime: !1,
    firstAddTime: 0,
    isSync: !1,
    productInvalid: !1,
    luckyBagOrDelay: "",
    luckyBagBasicInfoList: [],
    downTimeTextThreshold: 6e4
}, l = (exports.setPrePage = function(e) {
    s._prePageVue = e;
}, function() {
    return s._prePageVue;
}), d = exports.getAllLuckyBagAddFlag = function() {
    return {
        all: "all",
        custom: "custom"
    };
}, g = (exports.setLuckyBagAddFlag = function(e) {
    s.luckyBagProductAddFlag = e;
}, exports.getLuckyBagAddFlag = function() {
    return s.luckyBagProductAddFlag;
}), p = (exports.orderWaitPayTime = function() {
    return 60;
}, function(e) {
    if (e) o.default.setObject("luckyBag_sync_key", {
        firstAddTime: e.firstAddTime
    }); else {
        var t = o.default.getObject("luckyBag_sync_key");
        s.firstAddTime = t && t.firstAddTime;
    }
}), f = function(e) {
    console.log("[福袋] 还原状态"), s.stopDownTimingBeforePopState = e || s.showDownTime, 
    ye(!0);
    var t = F(s.vuex.order);
    if (s.downTime && s.downTime.getTime() > 0 && ie(t) && ge(t)) {
        if (0 === s.intervals.length) {
            var o = C().shopCartCountdown, n = new Date();
            s.firstAddTime + o.getTime() < n.getTime() ? s.downTime = new Date(0) : s.downTime = new Date(o.getTime() + s.firstAddTime - n.getTime()), 
            ce(s.downTime), de(s.stopDownTimingBeforePopState);
        }
        return !0;
    }
    return y(), !1;
}, y = (exports.luckybagSubmitOrderStop = function() {
    s.stopDownTimingBeforePopState = s.showDownTime, ye(!0);
}, exports.luckybagSubmitOrderReset = function() {
    f(s.stopDownTimingBeforePopState);
}, exports.cleanRequest = function() {
    console.log("清理轮询与WebSocket"), me(), ke();
}), m = exports.getAllVueKey = function() {
    return {
        initkey: "initluckyBag",
        luckybagKey: "luckybagKey",
        settlementKey: "settlement",
        paySuccessKey: "paySuccessKey",
        shoppingCartKey: "shoppingCartKey",
        luckyBagCountDown: "LuckyBagCountDownKey",
        LuckyBagPopup: "LuckyBagPopupKey",
        LuckyBagPaySucessPopup: "LuckyBagPaySucessPopupKey",
        LuckyBagPayType: "LuckyBagPayTypeKey"
    };
}, k = function(e, t) {
    var o = function() {
        if (t || !s.isSync) {
            if (s.isSync = !0, p(), f()) return !0;
            pe();
        }
    };
    return e ? setTimeout(o, 100) : o();
}, h = function(e) {
    return !!(e = e || F(s.vuex.order) || {}).bookingDate;
}, w = exports.initluckyBag = function(e) {
    if (!s.initing && !h()) if (s.initing = !0, P(e, m().initkey), I()) {
        var t = v(), o = function(e, o) {
            return !!x(m().luckybagKey) && (t && s.luckyBagBasicInfoList.length > 0 && N(!0, "reShow"), 
            console.log("initBreakCall"), s.initing = !1, !0);
        };
        k(!1, !0) ? (s.initBreakCall = o, s.initBreakCall() && (s.initBreakCall = null)) : (s.initBreakCall = t ? o : function(e, o) {
            return !(!x(m().luckybagKey) || !x(m().LuckyBagPopup)) && (I(L().luckyBag) && !t ? (console.log("获取福袋商品"), 
            s.luckyBagBasicInfoList = [], j(!0).then(function(e) {
                K(e) ? q(!1, !0).then(function(e) {
                    N(!0, "initMenu");
                }) : V();
            }, function() {
                E();
            }).finally(function() {
                s.initing = !1;
            })) : s.initing = !1, console.log("initBreakCall"), !0);
        }, s.initBreakCall() && (s.initBreakCall = null));
    } else s.initing = !1;
}, v = function() {
    var e = l(), t = getCurrentPages();
    return e && e !== F(s.vuex.currentPage) && t.length > 1 && t[t.length - 2] !== e;
}, P = exports.setVue = function(e, t, o) {
    console.log("设置vue", t), e && (s.vm = e), s.vmMap[t] = e, o && k(!0), s.initBreakCall && s.initBreakCall(e, t, o) && (s.initBreakCall = null);
}, x = exports.getVue = function(e) {
    return e ? s.vmMap[e] : s.vm;
}, B = function(e, t, o, n) {
    var a = _().webSocket || {}, r = wx.connectSocket({
        url: a.url.replace(/^http/, "ws") + "?store=" + encodeURI(e)
    });
    return wx.onSocketOpen(function() {
        t(), console.log("webSockConnect Connect");
    }), wx.onSocketMessage(function(e) {
        o(e), console.log("webSock onmessage");
    }), wx.onSocketClose(function() {
        n(), console.log("webSockConnect Disconnected");
    }), wx.onSocketError(function() {
        n(), console.log("webSockConnect Disconnected");
    }), r;
}, C = exports.getTimeConfig = function() {
    var e = _(), t = e && e.time || {}, o = t.shopCartCountdown, n = t.sellCountdown;
    return {
        shopCartCountdown: M(o),
        sellCountdown: M(n)
    };
}, T = exports.getluckyBagBreakfastConfig = function() {
    var e = F(s.vuex.luckyBagConfig) || {}, t = e.luckyBagBreakfast || {};
    return t.classId = [], e.classExtId && t.classId.push(e.classExtId), t;
}, S = function() {
    var e = F(s.vuex.luckyBagConfig) || {}, t = {};
    switch (s.luckyBagOrDelay) {
      case L().delay:
        t = e.delayProductInvalid || {};
        break;

      case L().luckyBag:
        t = e.luckyBagProductInvalid || {};
    }
    return t;
}, b = exports.getShopCartConfig = function() {
    var e = F(s.vuex.luckyBagConfig) || {}, t = {};
    switch (s.luckyBagOrDelay) {
      case L().delay:
        t = e.delayShopCart || {};
        break;

      case L().luckyBag:
        t = e.luckyBagShopCart || {};
        break;

      default:
        t = e.delayShopCart || {};
    }
    return t;
}, _ = exports.getContextConfig = function() {
    return F(s.vuex.luckyBagConfig) || {};
}, D = exports.productType = function() {
    return {
        luckyBag: "luckyBag",
        delay: "delay"
    };
}, L = exports.switchType = function() {
    return {
        luckyBag: "luckyBagSwitch",
        delay: "delaySwitch",
        paySuccessluckyBagSwitch: "paySuccessSwitch"
    };
}, I = exports.isEnable = function(e) {
    var t = _(), o = [];
    return e ? t && t[e] && o.push(t[e]) : (t && o.push(t[L().delay]), t && o.push(t[L().luckyBag])), 
    A(o);
}, A = function(e) {
    var t = !1;
    return e && e.forEach(function(e) {
        t = t || e && ("y" === e.switch || "Y" === e.switch) && O(e);
    }), t;
}, O = function(e) {
    var t = F(s.vuex.store);
    return t = t || {}, !(!e || "y" !== e.nationwideSwitch && "Y" !== e.nationwideSwitch) || (!!(e && e.marketList && e.marketList.includes(t.marketcode)) || (!!(e && e.cityList && e.cityList.includes(t.citycode)) || !!(e && e.storeList && e.storeList.includes(t.storecode))));
}, F = function(e) {
    var t = null;
    try {
        t = e.call(s.vm);
    } catch (t) {
        console.warn("获取值失败", e);
    }
    return t;
}, M = function(e) {
    var t = {
        h: "setUTCHours",
        H: "setUTCHours",
        m: "setUTCMinutes",
        M: "setUTCMinutes",
        s: "setUTCSeconds",
        S: "setUTCSeconds"
    }, o = e.slice(0, e.length - 1), n = e.slice(e.length - 1, e.length), a = new Date(0);
    return a[t[n]](o), a;
}, E = function() {
    var e = !1;
    R(function(t) {
        var o = {};
        try {
            o = t && JSON.parse(t.data);
        } catch (e) {
            console.error("解析消息出错", e);
        }
        !e && o && o.hasStock && (e = !0, j().then(function() {
            ke(), N(!0, "monitor");
        }).finally(function() {
            e = !1;
        }));
    }).then(function() {
        var e = _().webSocket || {}, t = s.webSockClient.waitOutTime;
        try {
            t = M(e.waitOutTime).getTime();
        } catch (o) {
            console.warn("解析ws超时时间失败, 使用默认时间: " + t + ",  配置值: " + e.waitOutTime);
        }
        s.timeouts.push(setTimeout(function() {
            ke();
            var e = K(s.luckyBagBasicInfoList);
            console.log("福袋 ws超时关闭, 当前福袋基础信息: ", e, s.luckyBagBasicInfoList), e ? N(!0, "monitor") : V();
        }, t));
    }, function() {
        V();
    });
}, N = function(e, t) {
    s.vmMap[m().luckybagKey].showluckyBagSmall(!1 !== e, t);
}, V = function() {
    s.luckyBagBasicInfoList = [];
    var e = U().time;
    if (e instanceof Array && 0 !== e.length) {
        var t = !1, o = !0, n = !1, a = void 0;
        try {
            for (var r, u = e[Symbol.iterator](); !(o = (r = u.next()).done); o = !0) {
                var i = r.value, c = setTimeout(function() {
                    t || j().then(function() {
                        t = !0, N(!0, "monitor");
                    });
                }, i.getTime());
                s.timeouts.push(c);
            }
        } catch (e) {
            n = !0, a = e;
        } finally {
            try {
                !o && u.return && u.return();
            } finally {
                if (n) throw a;
            }
        }
    } else console.log("福袋--\x3e未配置轮询时间");
}, U = function() {
    for (var e = _(), t = e && e.requestPoll || {}, o = t.time = t.time || [], n = 0; n < o.length; n++) if (!(o[n] instanceof Date)) try {
        o[n] = M(o[n]);
    } catch (e) {
        console.warn("轮询配置错误,配置值: " + o[n]);
    }
    return t;
}, R = function(e) {
    return new Promise(function(t, o) {
        var n = F(s.vuex.store).storecode;
        n ? s.webSockClient.luckyBagWS = B(n, t, e, o) : o();
    });
}, j = function(e) {
    return new Promise(function(o, n) {
        var a = {};
        t.default.getLuckyBag(a).then(function(t) {
            var a = t && t.data;
            return 0 === a.errorCode && a.stockActvInfoVoList && a.stockActvInfoVoList.length > 0 && (e || K(a.stockActvInfoVoList)) ? (s.luckyBagBasicInfoList = a.stockActvInfoVoList, 
            o(a.stockActvInfoVoList)) : n();
        }, n).catch(n);
    });
}, K = function(e) {
    var t = !1;
    return (e = e || s.luckyBagBasicInfoList).forEach(function(e) {
        t = t || e.surplusStock > 0;
    }), t;
}, q = exports.showluckyBagPopup = function(e, t) {
    if (!s.showluckyBagPopupLock) {
        s.showluckyBagPopupLock = !0;
        var o = F(s.vuex.currentPage);
        return a.show.call(o), Y(t).then(function(e) {
            var o = s.vmMap[m().LuckyBagPopup];
            if (setTimeout(function() {
                o && o.setData({
                    show: !0
                });
            }, 0), o && o.popupShowTD(t), o && 0 === s.intervals.length) {
                var n = C().shopCartCountdown;
                we([ o ], n && new Date(n.getTime()));
            }
            return Promise.resolve(e);
        }).catch(function(e) {
            return a.hide.call(o), t || (H(), N(!1, "reShow")), s.luckyBagBasicInfoList = [], 
            Promise.reject(e);
        }).finally(function() {
            s.showluckyBagPopupLock = !1;
        });
    }
}, H = function() {
    var e = (_().luckyBagSmall || {}).openPopupFail || "";
    wx.showToast({
        title: e,
        icon: "none",
        duration: 3e3
    });
}, W = function() {
    var e = s.vmMap[m().LuckyBagPopup];
    return e && e.data.show;
}, Y = function(e) {
    return new Promise(function(o, n) {
        var a = {
            page: "menu"
        };
        t.default.getLuckyBagDetail(a, e).then(function(e) {
            if (0 === e.data.errorCode && e.data.order && e.data.order.promotions && e.data.order.promotions.length > 0) {
                var t = e.data.order.promotions.filter(function(e) {
                    return 1 === e.code.length || 0 === e.code.toLowerCase().indexOf("h");
                });
                if (t && t.length > 0 && t[0].items && t[0].items.length > 0) {
                    for (var a = 0; a < t[0].items.length; a++) t[0].items[a].__nameCN__ = i._trimD(t[0].items[a].nameCN);
                    console.log("获取到福袋优惠项", t), s.luckyBagOrDelay = L().luckyBag;
                    var r = s.vmMap[m().LuckyBagPopup];
                    r && r.setData({
                        couponPromotionDisplay: t[0]
                    }), s._promotions = t[0], De(_().luckyBagADetail || {}, "menu"), o(e);
                } else n(e);
            } else n(e);
        }, n).catch(n);
    });
}, Q = exports.isLuckyBagProductByRequest = function(e) {
    var t = !1;
    if (I()) {
        var o = null;
        try {
            o = e && JSON.parse(e.orderItems);
        } catch (e) {
            console.error("解析参数异常", e);
        }
        var n = null;
        o && (n = G(o)) && n.length > 0 && (t = !0), console.log("餐品项, 是福袋餐品", o, t);
    }
    return t;
}, G = (exports.isLuckyBagConpon = function(e) {
    var t = {
        orderItems: e && e.items
    };
    return Q(t);
}, exports.findLuckyBagProductByFlag = function(e, t) {
    var o = [];
    switch (t) {
      case D().delay:
        o.push("21");
        break;

      case D().luckyBag:
        o.push("22");
        break;

      default:
        o.push("21"), o.push("22");
    }
    return e && e.filter(function(e) {
        return e && o.includes(e.specialProductFlag);
    }) || [];
}), J = (exports.luckyBagBreakfastItemHendle = function(e, t, o) {
    return !I(L().delay) || (z(e) && (e.specialProductFlag = "21", s.luckyBagOrDelay = L().delay, 
    "add" === o && Z(e)) ? ($(t), !1) : (s.luckyBagAddOpType = "add" === o, !0));
}, exports.cleanluckyBagBreakfastItemCache = function(e, t) {
    setTimeout(function() {
        t && t.data && 0 !== t.data.errorCode && (x(m().shoppingCartKey).confirmOrderSyncData(), 
        console.log("清理临期品商品(未与后台交互)"));
    }, 0);
}, function(e) {
    var t = [];
    return (e = e || getApp().globalData.menuList) && e.forEach(function(e) {
        X(e) && e.menuVoList && (t = t.concat(e.menuVoList));
    }), t;
}), X = function(e) {
    var t = T().classId;
    return e && t.includes(e.classExtId);
}, $ = exports.noProductInfo = function(e) {
    wx.showToast({
        title: b().productShortage,
        icon: "none",
        duration: 3e3
    });
}, Z = function(e) {
    if (!I(L().delay)) return !1;
    var t = e.restrictionQuantity, o = G(F(s.vuex.order).items), n = null;
    return o && o.forEach(function(t) {
        t.productId === e.productId && (n = t);
    }), !!n && (!t || n && n.quantity >= (t || 0));
}, z = (exports.addLuckyBagProduct = function(e) {
    return t.default.addLuckyBagProduct(e);
}, exports.addLuckyBagConpon = function(e) {
    return t.default.addLuckyBagConpon(e);
}, exports.isluckyBagBreakfast = function(e) {
    if (!I(L().delay)) return !1;
    var t = !1;
    return e.classId ? t = X({
        classExtId: e.classId
    }) : J().forEach(function(o) {
        !t && o && o.productId === e.productId && (t = !0, e.restrictionQuantity = o.restrictionQuantity);
    }), t;
}), ee = (exports.addLuckyBagProductSuccess = function(e, t) {
    ie(t && t.data.order) ? (s.luckyBagOrDelay = ue(e), s.luckyBagAddOpType && 0 === s.intervals.length && ce()) : ye();
}, exports.addLuckyBagConponSuccess = function(e, t) {
    if (t && t.data) {
        var o = !1;
        switch (t.data.errorCode) {
          case 0:
            ee(), o = !0;
            break;

          case 90002:
            te(), o = !1;
            break;

          case 90004:
            oe(t.data.stockSuccessItems), o = !0;
        }
        o && (t.data.errorCode = 0, s.luckyBagOrDelay = ue(e), 0 === s.intervals.length && ce());
    }
}, function() {
    u.showNotifyHtml.call(x(m().initkey), !0, ae("allSuccessToastText"));
}), te = function() {
    var e = re().allFailToastText || {}, t = F(s.vuex.currentPage), o = 0;
    s._promotions.items.forEach(function(e) {
        e.__num__ && e.__num__ > 0 && o++;
    }), o >= s._promotions.items.length && (N(!1), s.luckyBagBasicInfoList = []), n.showConfirm.call(t, e.title, (e.context || "").split(/<br.?>/i), "好的", null, null, function() {
        t.setData({
            showLuckybagConfirm: !1
        });
    });
}, oe = function(e) {
    var t = ne(e), o = ae("existSuccessToastText");
    u.showNotifyHtml.call(x(m().initkey), !0, [ o ].concat(t).join("<br/>"), 5e3);
}, ne = function(e) {
    var t = [];
    return e && e.forEach(function(e) {
        var o = e && e.quantity || 0, n = e && e.nameCN && i._trimD(e.nameCN) || "";
        o && t.push(o + "份" + n);
    }), t;
}, ae = function(e) {
    var t = re()[e] || [];
    return t.length > 0 ? t[Math.floor(Math.random() * t.length)] || "" : "";
}, re = function(e) {
    var t = {};
    switch (e || g()) {
      case d().custom:
        t = _().luckyBagProductCustomAdd || {};
        break;

      case d().all:
        t = _().luckyBagProductAllAdd || {};
    }
    return t;
}, ue = function(e) {
    var t = G(e), o = "";
    switch (t.length > 0 && t[0].specialProductFlag) {
      case "21":
        o = L().delay;
        break;

      case "22":
        o = L().luckyBag;
    }
    return o;
}, ie = exports.orderBeLuckyBagProduct = function(e) {
    e || (e = F(s.vuex.order));
    var t = e && e.items || [];
    return G(t).length > 0;
}, ce = function(e) {
    var t = C().shopCartCountdown;
    s.downTime = e;
    var o = setInterval(function() {
        var e = !1;
        s.downTime ? s.downTime.setTime(s.downTime.getTime() - 1e3) : (x(m().luckyBagCountDown).showCountDownTD(), 
        e = !0, s.firstAddTime = new Date().getTime(), s.downTime = new Date(t.getTime()), 
        p(s)), se(e), s.downTime.getTime() <= 0 && (s.productInvalid = !0, ye(), pe()), 
        he();
    }, 1e3);
    s.intervals.push(o);
}, se = (exports.setShowScFlag = function(e) {
    s.vuex.__ShowScFlag__ = e;
}, exports.showProductInvalidConfim = function(e, t) {
    if (s.productInvalid) {
        if (ie(t && t.data.order)) return;
        s.productInvalid = !1;
        var o = S(), a = F(s.vuex.currentPage);
        (a && "pages/settlement/settlement" === a.route || !F(s.vuex.showScFlag)) && n.showConfirm.call(a, o.title, (o.context || "").split(/<br.?>/i), "好的", null, null, function() {
            a.setData({
                showLuckybagConfirm: !1
            }), "pages/settlement/settlement" === a.route && ("0.0" === a.data.order.__totalPrice__ ? wx.navigateBack({
                delta: 1
            }) : a.reLoad && a.reLoad());
        });
    }
}, function(e) {
    var t = s.showDownTime;
    e ? t = !0 : s.downTime instanceof Date && le(s.downTime.getTime()) ? (t || x(m().luckyBagCountDown).showCountDown60TD(), 
    t = !0) : (!s.downTime || s.downTime.getTime() <= 0) && (t = !1), de(t);
}), le = function(e) {
    return e >= s.downTimeTextThreshold && e < s.downTimeTextThreshold + 1e3;
}, de = exports.showDownTimePop = function(e) {
    s.showDownTime = e, [].concat(s.vmMap[m().luckyBagCountDown]).forEach(function(e) {
        e && s.showDownTime !== e.data.luckyBagCountDownShow && e.setData({
            luckyBagCountDownShow: s.showDownTime
        });
    });
}, ge = function(e) {
    return (e = e || F(s.vuex.order)) && e.status && 0 === e.status.iosStatus;
}, pe = function() {
    console.log("计时完成");
    var e = F(s.vuex.order), t = G(e.items);
    if (t.length > 0 && ge(e)) {
        var o = s.vmMap[m().shoppingCartKey], n = F(s.vuex.currentPage);
        if (n && ("pages/menu/menu" === n.route || "pages/settlement/settlement" === n.route || "pages/menu/my/coupon" === n.route || "pages/menu/menu-detail/menu-detail" === n.route)) {
            var a = [], u = !0, i = !1, c = void 0;
            try {
                for (var l, d = t[Symbol.iterator](); !(u = (l = d.next()).done); u = !0) {
                    var g = l.value, p = {};
                    Object.assign(p, g), 0 !== p.promotionType && (p.quantity = 0, p.modify = !0, p.productId || (p.productId = "delete")), 
                    p.meal && (p.mealItems = []), p.quantity = 0, p.modify = !0, a.push(p);
                }
            } catch (e) {
                i = !0, c = e;
            } finally {
                try {
                    !u && d.return && d.return();
                } finally {
                    if (i) throw c;
                }
            }
            r._orderConfirm(a, !1, function() {
                o.confirmOrderSyncData();
            });
        }
    }
}, fe = (exports.resetDownTime = function() {
    k(!0, !0);
}, exports.discontinueDownTime = function() {
    s.intervals.forEach(function(e) {
        clearInterval(e);
    }), s.intervals = [];
}), ye = function(e) {
    console.log("终止定时"), de(!1), !e && s.downTime && s.downTime.setTime(0), fe();
}, me = function(e) {
    var t = e || s;
    t.timeouts.forEach(function(e) {
        clearTimeout(e);
    }), t.timeouts = [];
}, ke = function() {
    wx.closeSocket({}), s.webSockClient.luckyBagWS = null;
}, he = (exports.getluckyBagCountDownText = function() {
    var e = b().toastCountdown || {}, t = s.downTime, o = s.downTimeTextThreshold;
    return t instanceof Date ? (t.getTime() <= o + 999 ? e.toZero : e.n2one) || "" : "";
}, exports.getluckyBagCartCountdown = function() {
    return b().cartCountdown || "";
}, exports.getluckyBagADetailCountdown = function() {
    var e = _();
    return e.luckyBagPopup && e.luckyBagPopup.countdown || "";
}, exports.getluckyBagADetail = function() {
    return _().luckyBagADetail || {};
}, function(e) {
    var t = s.downTime;
    if (!(t instanceof Date)) return "";
    var o = [];
    o.push(s.vmMap[m().luckyBagCountDown]), o.push(s.vmMap[m().shoppingCartKey]), W() && o.push(s.vmMap[m().LuckyBagPopup]), 
    we(o, t, e);
}), we = function(e, t, o) {
    var n = o || "timeStr", a = "", r = function(e) {
        return e < 10 ? "0" + e : "" + e;
    };
    a = le(t) ? "" + parseInt(s.downTimeTextThreshold / 1e3) : t.getUTCMinutes() > 0 ? r(t.getUTCMinutes()) + ":" + r(t.getUTCSeconds()) : "" + r(t.getUTCSeconds()), 
    e.forEach(function(e) {
        e && (e.data[n] = a, e.setContent && e.setContent());
    });
}, ve = (exports.filterDelayClass = function(e) {
    var t = function(e) {
        return !X(e);
    };
    return I(L().delay) && !h() && (t = function(e) {
        return !X(e) || e.menuVoList && e.menuVoList.length > 0;
    }), e = e && e.filter(function(e) {
        return t(e);
    });
}, exports.checkOrderHasLuckbag = function(e, t) {
    for (var o = e, n = !1, a = 0; a < o.length; a++) {
        if (o[a].specialProductFlag && (t ? o[a].specialProductFlag === t : "21" === o[a].specialProductFlag || "22" === o[a].specialProductFlag)) {
            n = !0;
            break;
        }
        n = !1;
    }
    return n;
}, exports.checkHasLuckbag = function(e, t) {
    return !(!e.specialProductFlag || (t ? e.specialProductFlag !== t : "21" !== e.specialProductFlag && "22" !== e.specialProductFlag));
}, exports.setNextNoHidePage = function(e) {
    s.__nextNoHidePage__ = e;
}, exports.getNextNoHidePage = function() {
    var e = s.__nextNoHidePage__;
    return s.__nextNoHidePage__ = null, e;
}, exports.updateLuckyBagProductForMenu = function(e, o) {
    return e && e.length > 0 ? t.default.getLuckyBag({
        linkIds: JSON.stringify(e.map(function(e) {
            return e.linkId;
        })),
        stockType: "1"
    }).then(function(t) {
        var n = t && t.data;
        if (0 === n.errorCode && n.stockActvInfoVoList) {
            var a = {};
            n.stockActvInfoVoList.forEach(function(e) {
                a[String(e.linkId)] = e.surplusStock || 0;
            });
            var r = {};
            e && e.forEach(function(e) {
                var t = String(e.linkId);
                r[t] = {
                    num: a[t] || 0
                };
            });
            var u = {};
            G((o || F(s.vuex.order)).items, D().delay).forEach(function(e) {
                u[String(e.linkId)] = {
                    num: e.quantity || 0
                };
            });
            var i = J(getApp().globalData.menuVoList.data || []);
            i && i.forEach(function(e) {
                var t = String(e.linkId), o = null;
                r[t] && !isNaN(o = parseInt(r[t].num)) && (e.restrictionQuantity = o, u[t] && (e.restrictionQuantity += u[t].num));
            });
        }
    }) : Promise.resolve();
}, {
    timeouts: [],
    promotionItems: [],
    vPayCardList: o.default.getObject("PAY_CARD_LIST") || [],
    order: o.default.getObject("PAYSUCCESS_LUCKBAG_ORDER") || {},
    useFlowStatus: -999
}), Pe = (exports.paySuccessInitLuckybag = function() {
    if (!h() && Be()) {
        ve.useFlowStatus = -999, Fe({
            saveOnlinePayCount: 0,
            getPaymentUrlCount: 0,
            balanceFinish: !1
        }), Se(!1), !ie() && _e().then(function(e) {
            Ce(!0), Te();
        });
    }
}, exports.usePaySuccessPromotion = function(e, t) {
    if (e || !(ve.useFlowStatus < xe().saveOnlinePay)) {
        var o = Promise.resolve();
        if (ve.__submitLock__) return o;
        switch (ve.__submitLock__ = !0, Se(), ve.useFlowStatus) {
          case xe().createOrder:
            o = o.then(function() {
                return Ne();
            });

          case xe().usePromotion:
            o = o.then(function() {
                return Ve(e);
            }).catch(function(e) {
                return ve.useFlowStatus === xe().usePromotion && (e.data.traceId || Ee(), be()), 
                Promise.reject(e);
            });

          case xe().checkBalance:
            o = o.then(function() {
                return Re();
            });

          case xe().saveOnlinePay:
            o = (F(s.vuex.couponWriteOffConfig) || {}).switch ? o.then(function() {
                return je(t);
            }) : o.then(function() {
                ve.useFlowStatus = xe().saveOnlinePay + 1;
            });

          case xe().getPaymentUrl:
            o = o.then(function() {
                return Ke();
            });
        }
        return o = o.finally(function() {
            Te(!0), ve.__submitLock__ = !1;
        });
    }
    console.warn("不要搞事情哟");
}), xe = (exports.setluckybagOrder = function(e) {
    ve.order = e, o.default.setObject("PAYSUCCESS_LUCKBAG_ORDER", e, 36e5);
}, exports.getluckybagOrder = function() {
    return ve.order;
}, function() {
    return {
        createOrder: 0,
        usePromotion: 1,
        checkBalance: 2,
        saveOnlinePay: 3,
        getPaymentUrl: 4
    };
}), Be = exports.paySuccessIsEnable = function() {
    var e = [ _()[L().paySuccessluckyBagSwitch] ];
    return A(e);
}, Ce = function(e) {
    var t = s.vmMap[m().LuckyBagPaySucessPopup];
    t && t.showPopup && t.showPopup(e);
}, Te = (exports.getPaySuccessConfig = function() {
    return _().paySuccessMarketing || {};
}, exports.startPaySuccessDownTiming = function(e) {
    if (ve.useFlowStatus > xe().usePromotion) console.log("不启动倒计时, 当前流程是: ", ve.useFlowStatus); else {
        var t = ((_().paySuccessMarketing || {}).popup || {}).autoCloseTime, o = new Date(8e3);
        try {
            o = M(t);
        } catch (e) {
            console.error("自动关闭时间配置错误: ", t);
        }
        Se(!1), e ? ve.__startDownTimingDate__ && (o = new Date(new Date().getTime() - ve.__startDownTimingDate__)) : ve.__startDownTimingDate__ = new Date().getTime(), 
        ve.timeouts.push(setTimeout(function() {
            Se(!0);
        }, o.getTime()));
    }
}), Se = exports.endPaySuccessDownTiming = function(e) {
    me(ve), e && Ce(!1);
}, be = function() {
    var e = ve.promotionItems.pop();
    Se(!0), e && (ve.promotionItems = [], Le(e), setTimeout(function() {
        Ce(!0), Te();
    }, 500));
}, _e = (exports.syncLuckybagOrderToVUEX = function() {
    var e = F(s.vuex.order);
    e && e.sortedIPromotionVos && (ve.order.sortedIPromotionVos = e.sortedIPromotionVos), 
    s.vm.$store.commit(TYPES.SAVE_ORDER, {
        order: ve.order,
        flag: !0
    });
}, function() {
    return t.default.getPaySuccessLuckybagDetail({}, !0).then(function(e) {
        if (0 === e.data.errorCode && e.data.order && e.data.order.promotions && e.data.order.promotions.length > 0) {
            var t = e.data.order.promotions.filter(function(e) {
                return 1 === e.code.length || 0 === e.code.toLowerCase().indexOf("h");
            });
            if (t && t.length > 0 && t[0].items && t[0].items.length > 0) {
                for (var o = 0; o < t[0].items.length; o++) t[0].items[o].__nameCN__ = i._trimD(t[0].items[o].nameCN);
                console.log("获取到完成页福袋优惠项", t);
                var n = s.vmMap[m().LuckyBagPaySucessPopup];
                ve.promotionItems = t[0].items.reverse(), ve.useFlowStatus = xe().createOrder, Le(ve.promotionItems.pop());
                var a = _().paySuccessMarketing || {};
                return n && n.setData({
                    title: (a.popup || {}).title
                }), De(a.luckyBagADetail || _().luckyBagADetail || {}, "paySuc"), Promise.resolve(e);
            }
            return Promise.reject(e);
        }
        return Promise.reject(e);
    });
}), De = function(e, t) {
    switch (t) {
      case "paySuc":
        ve.__ACTIVITY_DETAIL__ = e;
        break;

      case "menu":
      default:
        s.__ACTIVITY_DETAIL__ = e;
    }
}, Le = (exports.getActivityDetail = function(e) {
    var t = {};
    switch (e) {
      case "paySuc":
        t = ve.__ACTIVITY_DETAIL__;
        break;

      case "menu":
      default:
        t = s.__ACTIVITY_DETAIL__;
    }
    return t;
}, function(e) {
    var t = s.vmMap[m().LuckyBagPaySucessPopup];
    t && t.setData({
        item: e
    });
}), Ie = function() {
    var e = {}, t = F(s.vuex.store);
    return e.storeCode = t.storecode, e.portalSource = "WECHATMINI", e.portalType = "WAP", 
    e.wxm_openId = F(s.vuex.openId), e.address2 = t.takeMealPlace, e;
}, Ae = function() {
    var e = F(s.vuex.store), t = (ve.order, Me()), o = getApp(), n = "", a = wx.getStorageSync("isAvatarAuth");
    if (o.globalData.isSystemX && a) {
        var r = wx.getStorageSync("wechatUserInfo");
        n = r && r.avatarUrl ? r.avatarUrl : "";
    }
    return {
        pendingPay: "",
        isWechatApp: "1",
        avatar: n,
        vGoldRuleId: "",
        iremark: "",
        packType: o.globalData.isPackage ? 1 : 2,
        payType: t.payType,
        phoneToNotLoginUser: t.realPhone,
        customerName: "",
        choosenLabels: t.choosenLabels,
        donation: "",
        comboPayFlag: t.isCombinedPayment ? 1 : 0,
        isFirst: t.saveOnlinePayCount,
        address2: e.takeMealPlace || null,
        plateNumber: t.plateNumber,
        buyPrimeCard: !1
    };
}, Oe = function() {
    var e = Me(), t = {};
    return (F(s.vuex.couponWriteOffConfig) || {}).switch || Object.assign(t, Ae()), 
    Object.assign(t, {
        phoneToNotLoginUser: e.realPhone,
        payType: e.payType,
        pendingPay: 0 == e.getPaymentUrlCount ? "" : "1",
        comboPayFlag: e.isCombinedPayment ? e.balanceFinish ? 99 : 1 : 0,
        openId: F(s.vuex.openId),
        isWechatApp: "1",
        usedPrimeCardName: "",
        aotTime: 0
    }), t;
}, Fe = exports.savePayParam = function(e) {
    for (var t in e) ("" === e[t] || null === e[t] || void 0 === e[t]) && delete e[t];
    var n = o.default.getObject("LUCKBAG_SAVE_PAY_ORDER_PARAM") || {};
    Object.assign(n, e), o.default.setObject("LUCKBAG_SAVE_PAY_ORDER_PARAM", n, 36e5);
}, Me = function() {
    return o.default.getObject("LUCKBAG_SAVE_PAY_ORDER_PARAM") || {};
}, Ee = (exports.getAmountInfo = function() {
    return {
        accountBalance: Me().accountBalance || 0,
        orderAccount: ve.order.total
    };
}, exports.submitOrder = function(e) {
    Fe(e), Pe(null, !0);
}, function() {
    var e = _().paySuccessMarketing || {};
    x(m().LuckyBagPaySucessPopup).toastTD(), wx.showToast({
        title: e.flashSaleFailToast || "",
        icon: "none",
        duration: 3e3
    });
}), Ne = function() {
    return t.default.createOrder(Ie()).then(function(e) {
        return 0 === e.data.errorCode ? (ve.useFlowStatus = xe().createOrder + 1, Promise.resolve(e)) : (wx.showToast({
            title: e.data.errorMsg,
            icon: "none",
            duration: 2e3
        }), Promise.reject(e));
    });
}, Ve = function(e) {
    var o = [];
    return o.push({
        productid: e.pmid,
        linkId: e.linkId,
        proid: e.id,
        count: 1,
        specialProductFlag: "22"
    }), t.default.usePromotionForFinishLuckBag({
        items: JSON.stringify(o)
    }).then(function(e) {
        return 0 === e.data.errorCode ? (ve.useFlowStatus = xe().usePromotion + 1, Ue(), 
        Promise.resolve(e)) : Promise.reject(e);
    });
}, Ue = function() {
    var e = F(s.vuex.order), t = !1, o = !1, n = null;
    e.items.forEach(function(e) {
        var a = i.payNameToType(e.nameCN);
        6 === a ? o = !0 : -1 !== a && (n = a, t = !0);
    }), !n && o && (n = 6);
    var a = Me();
    Fe({
        isCombinedPayment: t && o,
        isBalancePayOpen: o,
        realPhone: e.phoneDescription || a.realPhone,
        plateNumber: e.plateNumber || a.plateNumber,
        payType: n
    }), console.log("获取上一订单支付方式失败,设置默认支付方式"), !n && Ye();
}, Re = function() {
    var e = Me(), o = ve.order.total, n = xe().checkBalance + 1;
    return e.isBalancePayOpen && !e.isCombinedPayment && i._canUseByVersion("1.7.1") ? t.default.getAccountStatus().then(function(t) {
        var a = t.data;
        return 0 === a.errorCode ? (Fe({
            accountBalance: a.accountBalance
        }), console.log("余额金额", a.accountBalance), ve.useFlowStatus = n, a.accountBalance >= o ? Qe() : a.accountBalance > 0 ? Ge() : Ye(), 
        Promise.resolve(e)) : (wx.showToast({
            title: a.errorMsg,
            icon: "none",
            duration: 3e3
        }), Promise.reject(e));
    }) : (Ye(), ve.useFlowStatus = n, Promise.resolve(e));
}, je = function(e) {
    var o = Ae();
    return t.default.saveOnlinePayOrder(o).then(function(e) {
        return 0 === e.data.errorCode && 99 === e.data.order.status.iosStatus ? (ve.useFlowStatus = xe().saveOnlinePay + 1, 
        Fe({
            saveOnlinePayCount: Me().saveOnlinePayCount + 1
        }), Promise.resolve(e)) : (vm.$notify({
            mes: e.data.errorMsg
        }), Promise.reject(e));
    }).catch(function(e) {
        return We(e.data), Promise.reject(e);
    });
}, Ke = function() {
    var e = Me(), o = getApp(), n = Oe();
    return t.default.getPaymentUrl(n).then(function(t) {
        if (0 === t.data.errorCode) {
            o.globalData.order.primeVo && (t.data.order.primeVo = o.globalData.order.primeVo), 
            t.data.order.sortedIPromotionVos = o.globalData.order.sortedIPromotionVos, o.globalData.order = t.data.order;
            var a = t.data.packagev && t.data.packagev.split("=")[1];
            return ve._formId = a, ve._orderTime = t.data.order.orderTime, ve._dateNow = t.data.syncTime, 
            e.isBalancePayOpen && 99 !== n.comboPayFlag ? (ve._havecalled = !1, ve._showCardPay = !0, 
            wx.navigateTo({
                url: "../settlement/cardPay?url=" + escape(t.data.url)
            }), Promise.resolve(t)) : new Promise(function(a, r) {
                wx.requestPayment({
                    timeStamp: t.data.encryptedInfo.timeStamp,
                    nonceStr: t.data.encryptedInfo.nonceStr,
                    package: t.data.packagev,
                    signType: "MD5",
                    paySign: t.data.encryptedInfo.sign,
                    success: function(t) {
                        e.isBalancePayOpen || (ve.order.bookingDate ? c.bookingPaySucSendSubscribeMessage() : c.paySucSendSubscribeMessage()), 
                        o.checkOrderStatus(1, n.comboPayFlag, function(e) {
                            ve.useFlowStatus = xe().getPaymentUrl + 1, a(t), He(e);
                        }, null, function(e) {
                            a(e), qe(99 == n.comboPayFlag ? 1 : 0);
                        });
                    },
                    fail: function(e) {
                        r(e), qe(99 == n.comboPayFlag ? 1 : 0);
                    }
                });
            });
        }
        return wx.showToast({
            title: t.data.errorMsg,
            icon: "none",
            duration: 2e3
        }), Promise.reject(t);
    }).catch(function(e) {
        return e.data && We(e.data), Promise.reject(e);
    });
}, qe = function(e) {
    var t = Me(), o = t.realPhone;
    wx.navigateTo({
        url: "/pages/paysuccess/paysuccess?isWaitPay=true&orderTime=" + ve._orderTime + "&userPhone=" + o + "&customerName=&choosenLabels=" + t.choosenLabels + "&dateNow=" + ve._dateNow + "&payType=2&continuePayFlag=" + e
    });
}, He = function(e) {
    var t = Me().realPhone, o = e.data.cfproductNum, n = e.data.wsUrl + "/websocket";
    n = n.replace("https:", "wss:");
    var a = e.data.loadOrderNumberSeconds, r = e.data.wsCancelSwitch, u = e.data.wsSwitch, i = e.data.diningQRCode || "";
    e.data.promptCouponSwitch && (getApp().globalData.promptCouponSwitch = e.data.promptCouponSwitch), 
    getApp().globalData.balanceFinish = !1, wx.navigateTo({
        url: "/pages/paysuccess/paysuccess?cfcount=" + o + "&wsUrl=" + n + "&loadingSeconds=" + a + "&formId=" + ve._formId + "&wsCancelSwitch=" + r + "&isWsSwitch=" + u + "&userPhone=" + t + "&diningQRCode=" + i
    });
}, We = function(e) {
    var t = getApp(), o = F(s.vuex.preorder);
    if (477 == e.errorCode) wx.showToast({
        title: "您购物车内有优惠券无法使用，请删除后重新提交订单，谢谢！",
        icon: "none",
        duration: 2e3
    }); else if (491 == e.errorCode) {
        var n = e.errorMsg;
        n && wx.showToast({
            title: n,
            icon: "none",
            duration: 2e3
        });
    } else 4 == e.errorCode ? wx.showToast({
        title: r.getCouponErrorMessage("circuit"),
        icon: "none",
        duration: 2e3
    }) : 80001 == e.errorCode || 10003 == e.errorCode ? o.gotoCapthca(e) : 80006 == e.errorCode || 10007 == e.errorCode ? o.gotoCapthca(e) : 89999 == e.errorCode ? wx.showToast({
        title: "您暂时被禁止提交订单",
        icon: "none",
        duration: 2e3
    }) : wx.showToast({
        title: e.errorMsg,
        icon: "none",
        duration: 2e3
    });
    14004 == e.errorCode && (t.globalData.user = null, i._backToHome());
}, Ye = function() {
    Fe({
        isCombinedPayment: !1,
        isBalancePayOpen: !1,
        payType: 2
    });
}, Qe = function() {
    Fe({
        isCombinedPayment: !1,
        isBalancePayOpen: !0,
        payType: 6
    });
}, Ge = function() {
    Fe({
        isCombinedPayment: !0,
        isBalancePayOpen: !0,
        payType: 2
    });
};

exports.checkLuckbagBalancePay = function() {
    var e = getApp();
    if (ve._showCardPay && ve.useFlowStatus >= xe().getPaymentUrl) {
        if (e.globalData.balanceFinish) {
            Fe({
                balanceFinish: !0
            });
            Me();
            var t = Oe();
            e.checkOrderStatus(1, t.comboPayFlag, function(e) {
                99 == t.comboPayFlag ? Pe() : He(e);
            }, null, function(e) {
                qe(0);
            });
        } else qe(0);
        return e.globalData.balanceFinish = !1, ve._showCardPay = !1, !0;
    }
    return !1;
};

exports.default = w;