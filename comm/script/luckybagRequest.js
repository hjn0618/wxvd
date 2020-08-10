Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("./luckybag"), r = require("./model"), a = require("../../component/loading/loading"), t = require("../../component/loadingText/loadingText"), n = function(e, a, t) {
    return new Promise(function(n, o) {
        r.ajax(e, a, n, !1 === t, null, null, null, o);
    });
};

exports.default = {
    getLuckyBag: function(e) {
        return n("minor/activity/getLuckBag", e, !1);
    },
    getLuckyBagDetail: function(e, r) {
        return n("minor/activity/getLuckBagDetail", e, !1).finally(function() {
            !r && getApp().globalData.currPage && a.hide.call(getApp().globalData.currPage);
        });
    },
    addLuckyBagProduct: function(r) {
        var t = [], o = {};
        try {
            t = r && r.orderItems && JSON.parse(r.orderItems) || [], t = (0, e.findLuckyBagProductByFlag)(t), 
            r.orderItems = JSON.stringify(t);
        } catch (e) {
            console.warn("解析订单参数异常, param", r);
        }
        var u = t;
        return n("core/activity/luckBagBuy", r).then(function(r) {
            return o = r, 0 === r.data.errorCode && ((0, e.addLuckyBagProductSuccess)(u, r), 
            (0, e.showProductInvalidConfim)(u, r)), Promise.resolve(r);
        }).then(function(r) {
            return new Promise(function(a, t) {
                var n = null;
                0 === r.data.errorCode && (n = r.data.order), (0, e.updateLuckyBagProductForMenu)((0, 
                e.findLuckyBagProductByFlag)(u, (0, e.productType)().delay), n).finally(function() {
                    a(r);
                });
            });
        }).finally(function() {
            (0, e.cleanluckyBagBreakfastItemCache)(u, o), getApp().globalData.currPage && a.hide.call(getApp().globalData.currPage);
        });
    },
    addLuckyBagConpon: function(r, t) {
        return n("minor/order/usePromotionForLuckBag", r, !t).then(function(a) {
            var t = [];
            try {
                t = r && r.items && JSON.parse(r.items) || [];
            } catch (e) {
                console.warn("解析订单参数异常, param", r);
            }
            return (0, e.addLuckyBagConponSuccess)(t, a), Promise.resolve(a);
        }).finally(function() {
            getApp().globalData.currPage && a.hide.call(getApp().globalData.currPage);
        });
    },
    getPaySuccessLuckybagDetail: function(e, r) {
        return n("minor/activity/getFinishPageLuckBagDetail", e, !r);
    },
    usePromotionForFinishLuckBag: function(r) {
        var t = getApp().globalData.currPage;
        return t && a.show.call(t), n("minor/order/usePromotionForFinishLuckBag", r, !1).then(function(r) {
            return 0 === r.data.errorCode && (0, e.setluckybagOrder)(r.data.order), Promise.resolve(r);
        }).finally(function() {
            a.hide.call(t);
        });
    },
    createOrder: function(r) {
        return n("core/order/create", r, !1).then(function(r) {
            return 0 === r.data.errorCode && (0, e.setluckybagOrder)(r.data.order), Promise.resolve(r);
        }).finally(function() {
            getApp().globalData.currPage && a.hide.call(getApp().globalData.currPage);
        });
    },
    saveOnlinePayOrder: function(r) {
        var a = getApp().globalData.currPage;
        return a && t.show.call(a), n("core/payment/saveOnlinePayOrder", r, !1).then(function(r) {
            return 0 === r.data.errorCode && (0, e.setluckybagOrder)(r.data.order), Promise.resolve(r);
        }).finally(function() {
            a && t.hide.call(a);
        });
    },
    getPaymentUrl: function(r) {
        return n("core/payment/getPaymentUrl", r, !1).then(function(r) {
            return 0 === r.data.errorCode && (0, e.setluckybagOrder)(r.data.order), Promise.resolve(r);
        }).finally(function() {
            getApp().globalData.currPage && a.hide.call(getApp().globalData.currPage);
        });
    },
    getAccountStatus: function(e) {
        return n("minor/payment/getAccountStatus", e, !1).finally(function() {
            getApp().globalData.currPage && a.hide.call(getApp().globalData.currPage);
        });
    }
};