var t = require("../../component/loading/loading"), a = require("../../comm/script/order-helper"), i = require("../../comm/script/helper"), r = {
    changeChooseType: function(i) {
        var r = this, e = this, n = getApp(), u = n.globalData.currPage, o = this.data.listBag, c = this.data.listBagBack, s = !1, l = [];
        if (o) {
            var d = function(t) {
                return t.reduce(function(t, a) {
                    return t + a.quantity;
                }, 0);
            };
            if (!1 === i ? (c = [].concat(JSON.parse(JSON.stringify(o))), e.setData({
                listBagBack: c
            }), d(o) > 0 && (o.forEach(function(t) {
                0 !== t.quantity && (r.fitQuantity(!1, t, -1 * t.quantity), t.quantity = -1 * t.quantity, 
                l.push(t));
            }), s = !0)) : d(c) > 0 && (o.forEach(function(t) {
                c.forEach(function(a) {
                    t.productId === a.productId && 0 !== a.quantity && (r.fitQuantity(!1, t, a.quantity), 
                    l.push(a));
                });
            }), s = !0), s) {
                a._orderConfirm(l, !1, function() {
                    t.hide.call(u), e.setData({
                        order: n.globalData.order
                    }), e.fitQuantity(!0);
                    var a = {
                        type: "bag-order"
                    };
                    e.triggerEvent("bagevent", a);
                }, "", void 0, !1);
            }
        }
    },
    deal: function(i, r) {
        var e = this;
        if (!e.data.hasClick) {
            var n = i.currentTarget.dataset.item, u = getApp(), o = u.globalData.currPage;
            a._confirmOrder(function(a) {
                t.hide.call(o), e.setData({
                    order: u.globalData.order
                }), e.fitQuantity(!0), e.data.hasClick = !1;
                var i = {
                    type: "bag-order"
                };
                e.triggerEvent("bagevent", i);
            }, n, r);
        }
    },
    minus: function(t) {
        this.deal(t, -1);
    },
    plus: function(t) {
        var a = t.currentTarget.dataset.item;
        if (!(a.curNum >= a.maxQty)) {
            this.deal(t, 1), this.triggerEvent("bagevent", {
                e: t,
                type: "bag-doudoukick"
            });
        }
    },
    fitQuantity: function(t, a, i) {
        var r = this, e = getApp(), n = 0, u = 0, o = 0, c = this.data.listBag;
        if (t) {
            var s = e.globalData.order;
            c.forEach(function(t) {
                t.quantity = 0, t.curNum = 0, s.items.forEach(function(a) {
                    t.productId === a.pmId && 0 === a.promotionType && (t.quantity = a.quantity, t.curNum = a.quantity, 
                    t.id = a.id, n += a.price * a.quantity, u += a.quantity);
                }), o = u;
            });
        } else a.curNum = a.curNum + i, c.forEach(function(t) {
            n += t.price * t.curNum, u += t.curNum;
        }), o = u, -1 === i && 0 === u && (o += 1);
        r.setData({
            listBag: c,
            bagTotalPrice: n,
            bagTotalQuantity: o
        });
    },
    ready: function() {
        var t = getApp().globalData.plasticBagList || [], a = t = t.filter(function(t) {
            return "G" !== t.menuFlag && void 0 === t.condimentRoundList;
        });
        a && (a.forEach(function(t, a) {
            t.nameCn = i._trimD(t.nameCn), t.quantity ? t.curNum = t.quantity : (t.quantity = 0, 
            t.curNum = 0);
        }), this.setData({
            listBag: a
        }), this.fitQuantity(!0));
    }
};

Component({
    properties: {
        isPackage: {
            type: null,
            value: !1,
            observer: function(t, a) {
                !0 !== t && !1 !== t || (this.data.init ? this.setData({
                    init: !1
                }) : this.changeChooseType(t));
            }
        },
        list: {
            type: Array,
            value: []
        }
    },
    data: {
        init: !0,
        listBag: [],
        listBagBack: [],
        bagTotalPrice: 0,
        bagTotalQuantity: 0
    },
    ready: function() {
        this.ready();
    },
    methods: r
});