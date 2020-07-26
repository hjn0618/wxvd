function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r;
    }
    return Array.from(t);
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];
        for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
}, r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = require("../../comm/script/helper"), o = require("../../comm/script/model"), i = require("../../comm/script/date-format");

module.exports = {
    groupDeal: function(t) {
        var e = t.__quantity__, r = void 0 !== e && e != t.__prevQuantity__ || void 0 !== e && e == t.__prevQuantity__ && this.loopmenuVoList(t.menuVoList);
        return r;
    },
    loopmenuVoList: function(t) {
        for (var e = !1, r = 0; r < t.length; r++) {
            var a = t[r];
            "G" == a.menuFlag && (e = a.__quantity__ !== a.__prevQuantity__ || this.loopGroupList(a));
        }
        return e;
    },
    loopGroupList: function(t) {
        var e = !1;
        if ("G" == t.menuFlag) for (var r = 0; r < t.iGroupVoList[0].iMenuVoList.length; r++) {
            var a = t.iGroupVoList[0].iMenuVoList[r];
            if (a.__prevQuantity__ !== a.__quantity__) {
                e = !0;
                break;
            }
        }
        return e;
    },
    loopTasteList: function(t) {
        var e = !1;
        if (t.subItems || (t.subItems = []), t.subItemsPrev || (t.subItemsPrev = []), t.subItems.length != t.subItemsPrev.length) return !0;
        for (i = 0; i < t.subItems.length; i++) {
            for (var r = t.subItems[i], a = !1, o = 0; o < t.subItemsPrev.length; o++) {
                n = t.subItemsPrev[o];
                if ("G" == t.menuFlag) {
                    if (r.productId == n.productId && this.compareTaste(r.tasteList, n.tasteList)) {
                        a = !0, r.__quantity != n.quantity__ && (e = !0);
                        break;
                    }
                } else if (this.compareTaste(r.tasteList, n.tasteList)) {
                    a = !0, r.__quantity != n.quantity__ && (e = !0);
                    break;
                }
            }
            a || (e = !0);
        }
        for (var i = 0; i < t.subItemsPrev.length; i++) {
            for (var n = t.subItemsPrev[i], a = !1, o = 0; o < t.subItems.length; o++) {
                r = t.subItems[o];
                if ("G" == t.menuFlag) {
                    if (r.productId == n.productId && this.compareTaste(r.tasteList, n.tasteList)) {
                        a = !0;
                        break;
                    }
                } else if (this.compareTaste(r.tasteList, n.tasteList)) {
                    a = !0;
                    break;
                }
            }
            if (!a) {
                e = !0;
                break;
            }
        }
        return e;
    },
    _getProductsAdd: function(e) {
        for (var o = this, i = getApp(), n = [], s = i.globalData.menuList, u = i.globalData.order.items, l = 0; l < s.length; l++) {
            var d = !1, c = [];
            s[l].childClassList && s[l].childClassList.length > 0 ? (c = s[l].childClassList, 
            d = !0) : c[0] = s[l];
            for (var m = 0; m < c.length; m++) if (o.groupDeal(c[m])) {
                var p = [];
                p = c[m].menuVoList;
                for (var g = 0; g < p.length; g++) {
                    var _ = p[g];
                    if (void 0 !== _.__quantity__ && _.__quantity__ != _.__prevQuantity__ || void 0 !== _.__quantity__ && _.__quantity__ == _.__prevQuantity__ && "G" === _.menuFlag && o.loopGroupList(_) || o.loopTasteList(_)) {
                        for (var f = -1, y = 0; y < n.length; y++) if (_.productId == n[y].productId) {
                            f = y;
                            break;
                        }
                        if (-1 == f || _.__fixCondiment__) if (e && 0 == _.memberProduct && (-1 != _.menuFlag.indexOf("M") && "M" != _.menuFlag || (_.condimentRoundList && _.condimentRoundList.length) > 0)) {
                            for (var h = 0; h < u.length; h++) {
                                var v = u[h];
                                if (v.pmId == _.productId) {
                                    v.quantity = -v.quantity, C = v;
                                    break;
                                }
                            }
                            C && n.push(C);
                        } else if ("G" == _.menuFlag) {
                            for (var I = 0; I < _.iGroupVoList[0].iMenuVoList.length; I++) {
                                var b = _.iGroupVoList[0].iMenuVoList[I];
                                if (!(b.taste && b.taste.length > 0 && "object" === r(b.taste)) && (b.__quantity__ >= 0 && b.__quantity__ != b.__prevQuantity__)) {
                                    C = {
                                        ruleid: b.productId,
                                        productId: b.productId,
                                        nameCN: a._trimD(b.nameCn),
                                        nameEN: b.nameEn,
                                        classId: c[m].classExtId,
                                        itemType: 0,
                                        mealFlag: -1 != b.menuFlag.indexOf("M"),
                                        lunch: b.lunch,
                                        price: b.price,
                                        quantity: e && 0 == b.memberProduct ? 0 : b.__quantity__,
                                        modify: !0,
                                        memberProduct: b.memberProduct,
                                        maxQty: b.maxQty,
                                        accessoryIds: b.accessoryIds,
                                        linkId: b.linkId,
                                        specialProductFlag: _.specialProductFlag
                                    };
                                    n.push(C);
                                }
                            }
                            o.addTasteProducts(e, _, n, c[m].classExtId);
                        } else {
                            var C = {
                                ruleid: _.productId,
                                productId: _.productId,
                                nameCN: _.showNameCn,
                                nameEN: _.showNameEn,
                                classId: c[m].classExtId,
                                itemType: 0,
                                mealFlag: -1 != _.menuFlag.indexOf("M"),
                                lunch: _.lunch,
                                price: _.price,
                                quantity: e && 0 == _.memberProduct ? 0 : _.__quantity__,
                                modify: !0,
                                condimentItems: [],
                                accessoryIds: _.accessoryIds,
                                linkId: _.linkId,
                                specialProductFlag: _.specialProductFlag
                            };
                            if ("M2" == _.menuFlag) C.itemType = 92; else if ("M3" == _.menuFlag) C.itemType = 93; else if ("M4" == _.menuFlag) C.itemType = 94; else if (-1 != _.menuFlag.indexOf("M")) C.itemType = 1, 
                            n.push(C); else if (_.condimentRoundList) {
                                C.itemType = 95;
                                var S = C.quantity;
                                if (0 != S) {
                                    for (var P = d ? i.globalData.menuVoList.data[l].childClassList[m].menuVoList[g].condimentRoundList : i.globalData.menuVoList.data[l].menuVoList[g].condimentRoundList, D = 0; D < P.length; D++) {
                                        var N = P[D].condimentItemList[0];
                                        if (C.condimentItems.push({
                                            ruleid: N.productId,
                                            productId: N.productId,
                                            nameCN: N.menuCn,
                                            nameEN: "",
                                            itemType: 11,
                                            mealFlag: !1,
                                            price: _.price,
                                            quantity: S * P[D].itemCount,
                                            modify: !0
                                        }), N.accessoryIds) {
                                            var F = (C.accessoryIds ? C.accessoryIds + "," + N.accessoryIds : N.accessoryIds).split(","), q = new Set(F);
                                            C.accessoryIds = [].concat(t(q)).toString();
                                        }
                                    }
                                    C.quantity = S, n.push(C);
                                } else {
                                    var A = C.quantity;
                                    C.quantity = A, n.push(C);
                                }
                            } else _.taste && 0 != _.taste.length && "object" === r(_.taste) ? o.addTasteProducts(e, _, n, c[m].classExtId) : n.push(C);
                        } else n[f].quantity += _.__quantity__;
                    }
                }
            }
        }
        return n;
    },
    _caculateOrder: function(t, e, r) {
        var o = getApp();
        if (!t.__total__) {
            t.egiftCardPaySupport = !0;
            for (var i = 0, n = 0, s = "", u = 0; u < t.items.length; u++) {
                var l = t.items[u];
                if (l.__price__ = (l.realPrice / 100).toFixed(1), l.price > l.realPrice && (l.__originPrice__ = (l.price / 100).toFixed(1)), 
                l.__nameCN__ = a._trimD(l.nameCN), 4 != l.promotionType && 5 != l.promotionType && 6 != l.promotionType && l.show && (i += l.quantity, 
                1 == l.egiftCardPaymentSupport ? n += l.realPrice * l.quantity : t.egiftCardPaySupport && (t.egiftCardPaySupport = !1)), 
                (l.mealFlag || l.condimentItems && l.condimentItems.length > 0) && (l.__mealItems__ = this._getMealItems(l)), 
                l.primeCardName && l.primeCardName.indexOf("亲子卡") < 0 && (s = l.primeCardName), 
                "68" === l.specialProductFlag && l.show) {
                    l.__price__ = ((+l.realPrice + +this.getKafeiContent(l, t, "realPrice")) / 100).toFixed(1), 
                    l.__originPrice__ = ((+l.price + +this.getKafeiContent(l, t, "price")) / 100).toFixed(1), 
                    l.__nameCN__ = l.promotionDescCN;
                    var d = "原价 " + l.nameCN + "x1", c = "赠送 " + this.getKafeiContent(l, t, "nameCN") + "x1";
                    d = a._trimD(d), c = a._trimD(c), l.__mealItems__ = [ d, c ];
                }
                if ("69-0" === l.specialProductFlag && (l.specialProductFlag = "69"), "69-1" === l.specialProductFlag && (l.specialProductFlag = "69"), 
                "69" === l.specialProductFlag && l.show) {
                    l.__price__ = ((+l.realPrice + +this.getKafeiContent(l, t, "realPrice")) / 100).toFixed(1), 
                    l.__originPrice__ = ((+l.price + +this.getKafeiContent(l, t, "price")) / 100).toFixed(1), 
                    l.__nameCN__ = l.promotionDescCN;
                    var d = l.nameCN + "x1", c = this.getKafeiContent(l, t, "nameCN") + "x1";
                    d = a._trimD(d), c = a._trimD(c), l.__mealItems__ = [ d, c ];
                }
            }
            t.__total__ = i, t.validtotal = n, t.__totalPrice__ = (parseInt(t.total) / 100).toFixed(1), 
            this._caculatePromotions(t.sortedIPromotionVos), this._caculatePromotions(t.promotions);
            var m = {};
            e && (r ? m = e : (m.provincialAmount = e.provincialAmount, m.onSaleDiscountAmount = e.onSaleDiscountAmount, 
            m.primeInfoProvincialAmount = e.primeInfoProvincialAmount), m.provincialAmount && (m.__provincialAmount__ = (m.provincialAmount / 100).toFixed(1)), 
            e.onSaleDiscountAmount && (m.__onSaleDiscountAmount__ = (m.onSaleDiscountAmount / 100).toFixed(1)), 
            e.primeInfoProvincialAmount && (m.__primeInfoProvincialAmount__ = (e.primeInfoProvincialAmount / 100).toFixed(1)), 
            m.primeCardName = s, t.primeVo = m), "Q" != o.globalData.storeTypeCode && (o.globalData.smallYellowStripVo.__stripTemplate = 100 * parseFloat(t.__totalPrice__) - o.globalData.smallYellowStripVo.stripAmountThreshold >= 0 ? o.replaceParams(o.globalData.smallYellowStripVo.stripTemplate2, "$m", (o.globalData.smallYellowStripVo.stripAmountThreshold / 100).toFixed(1)) : o.replaceParams(o.globalData.smallYellowStripVo.stripTemplate, "$m", ((o.globalData.smallYellowStripVo.stripAmountThreshold - 100 * parseFloat(t.__totalPrice__)) / 100).toFixed(1)));
        }
    },
    getKafeiContent: function(t, e, r) {
        for (var a = 0; a < e.items.length; a++) {
            var o = e.items[a];
            if (o.groupId === t.groupId && o.promotionCode === t.promotionCode && !o.show) return o[r];
        }
    },
    _getMealItems: function(t) {
        var e = new Array();
        if (t.mealItems.length > 0) for (var r = t.mealItems, o = 0; o < r.length; o++) {
            s = "    ";
            if (r.length - 1 == o && (s = ""), r[o].show) if (r[o].condimentItems && r[o].condimentItems.length > 0) for (n = 0; n < r[o].condimentItems.length; n++) {
                var i = r[o].condimentItems[n];
                e.push(a._trimD(i.nameCN) + "x" + i.quantity + s);
            } else e.push(a._trimD(r[o].nameCN) + "x" + r[o].quantity + s);
        } else if (t.condimentItems.length > 0) for (var n = 0; n < t.condimentItems.length; n++) {
            var s = "    ";
            t.condimentItems.length - 1 == o && (s = ""), (i = t.condimentItems[n]).specialNeeds && 0 != i.specialNeeds.length ? e.push(a._trimD(i.nameCN) + "(" + this.getSpecialNeedsString(i.specialNeeds) + ")x" + i.quantity + s) : e.push(a._trimD(i.nameCN) + "x" + i.quantity + s);
        }
        return e;
    },
    getSpecialNeedsString: function(t) {
        if (!t || 0 == t.length) return "标准";
        for (var e = "", r = 0; r < t.length; r++) e += t[r].laberName, e += "、";
        return e.substring(0, e.length - 1);
    },
    _caculatePromotions: function(t) {
        if (t && !(t.length < 1)) for (var e = 0; e < t.length; e++) {
            var r = t[e];
            if (r.items) {
                r.__index__ = e;
                var o = [];
                if (0 == r.items.length) o.push({
                    nameCN: r.couponTitleCn,
                    __nameCN__: a._trimD(r.couponTitleCn),
                    imagePath: r.imagePath,
                    id: r.id,
                    pmid: ""
                }); else for (var i = 0; i < r.items.length; i++) {
                    var n = r.items[i];
                    n.__nameCN__ = a._trimD(n.nameCN), n.__realPrice__ = (n.realPrice / 100).toFixed(1), 
                    n.__orgPrice__ = n.orgPrice && n.orgPrice > 0 ? (n.orgPrice / 100).toFixed(1) : "", 
                    o.push(n);
                }
                r._items = o;
            }
        }
    },
    _confirmOrder: function(t, e, r, a, o, i, n, s) {
        var u = [], l = "true";
        if (void 0 !== a && null != a || (a = ""), e) if (e.quantity += r, e.mealItems = [], 
        e.__fixCondiment__) {
            e.condimentItems.forEach(function(t) {
                t.quantity = t.quantity / (e.quantity - r) * e.quantity;
            }), e.modify = !0;
            var d = JSON.parse(JSON.stringify(e));
            u.push(d);
        } else 0 == e.promotionType || e.productId ? e.condimentItems && e.condimentItems.length > 0 ? (e.condimentItems.forEach(function(t) {
            t.quantity = t.quantity / (e.quantity - r);
        }), e.quantity = 0 === e.quantity ? 0 : r, e.modify = !0) : (l = "false", 0 != e.promotionType ? e.modify = !0 : (e.quantity = 0 === e.quantity ? 0 : r, 
        e.modify = 0 === e.quantity)) : (e.modify = !0, e.productId = "delete"), u.push(e); else (u = this._getProductsAdd()).forEach(function(t) {
            t.memberProduct && 2 == t.memberProduct && (t.modify = !0);
        });
        if (e && e.__fixCondiment__ && (e.condimentItems.forEach(function(t) {
            t.quantity = t.quantity / (e.quantity - r) * e.quantity;
        }), e.modify = !0), u.length > 0 && r < 0 && e) {
            var c = e.couponCode;
            if (c) for (g = 0; g < getApp().globalData.couponNeedCountList.length; g++) if (getApp().globalData.couponNeedCountList[g].couponCode == c) {
                var m = 1;
                break;
            }
        }
        if (e && e.specialProductFlag && ("68" === e.specialProductFlag || "69" === e.specialProductFlag)) for (var p = getApp().globalData.order.items, g = 0; g < p.length; g++) {
            var _ = p[g];
            _.groupId !== e.groupId || _.promotionCode !== e.promotionCode || _.show || u.push(_);
        }
        this._orderConfirm(u, l, t, a, m, o, i, n, s);
    },
    _deleteProductsForTradeupPopup: function(t, r) {
        var a = [], o = !0, i = !1, n = void 0;
        try {
            for (var s, u = r[Symbol.iterator](); !(o = (s = u.next()).done); o = !0) {
                var l = s.value, d = e({}, l);
                0 !== l.promotionType && (d.quantity = 0, d.modify = !0, l.productId || (d.productId = "delete")), 
                d.meal && (d.mealItems = []), d.quantity = 0, d.modify = !0, a.push(d);
            }
        } catch (t) {
            i = !0, n = t;
        } finally {
            try {
                !o && u.return && u.return();
            } finally {
                if (i) throw n;
            }
        }
        this._orderConfirm(a, !1, t, "", 0);
    },
    _orderConfirm: function(t, e, r, a, i, n, s, u, l) {
        var d = getApp(), c = this;
        a && void 0 !== a || (a = "");
        var m = 0;
        d.globalData.order.primeVo && (m = d.globalData.order.primeVo.provincialAmount);
        var p = "";
        s && d.globalData.upgradeConfirm && (p = JSON.stringify(d.globalData.upgradeConfirm));
        var g = {
            renewCardUsedCoupon: l,
            pmId: u,
            orderItems: JSON.stringify(t),
            oid: d.globalData.order.id,
            usedPrimeCardName: d.globalData.usedPrimeCardName,
            provincialAmount: m,
            menuUpgradeData: p,
            delFlag: e,
            index: a,
            condimentMergeFlag: !0
        };
        i && (g.isCouponItem = i), n && (g.confirmType = "checkout"), o.orderConfirm(g, function(e) {
            0 == e.data.errorCode ? (t && t.length > 0 && (d.globalData.bigOrderValue = e.data.showBigOrder ? e.data.bigOrderValue : -1), 
            d.globalData.order = e.data.order, c._caculateOrder(e.data.order, e.data.primeVo, n), 
            "function" == typeof r && r(e)) : 339 == e.data.errorCode ? (wx.showToast({
                title: e.data.errorMsg,
                icon: "none",
                duration: 2e3
            }), "function" == typeof r && r(null)) : (t && t.length > 0 && (d.globalData.order.__total__ = null, 
            c._caculateOrder(d.globalData.order)), "function" == typeof r && r(e));
        });
    },
    _convertPayType: function(t) {
        var e = "";
        switch (t) {
          case 0:
            e = "货到现金支付";
            break;

          case 3:
            e = "肯德基宅急送美食券支付（不足部分支付现金)";
            break;

          case 1:
          case 2:
            e = "支付宝支付";
            break;

          case 4:
            e = "微信支付";
            break;

          case 7:
            e = "心意美食卡支付";
            break;

          case 5:
            e = "财付通支付";
            break;

          case 6:
            e = "肯德基礼品卡";
            break;

          case 22:
            e = "支付宝支付";
        }
        return e;
    },
    _isSupport5000Store: function(t) {
        return 18 != t.status.posStatus && 5 != t.status.iosStatus && 97 != t.status.iosStatus && 98 != t.status.iosStatus && 99 != t.status.iosStatus && 80 != t.status.iosStatus && 81 != t.status.iosStatus && 82 != t.status.iosStatus && 83 != t.status.iosStatus && 84 != t.status.iosStatus && 85 != t.status.iosStatus;
    },
    _dealOrderStatus: function(t, e) {
        var r = getApp().globalData.currPage;
        return e ? t.bookingDate ? "arrival" : "getOrderNumber" : !t.bookingDate || t.posOrderNumber || t.sendByMail ? t.posOrderNumber ? t.bookingDate && 15 != t.status.posStatus && !t.status.modified ? (r.setData({
            queryNum: ++r.queryNum
        }), e || 1 != r.queryNum ? t.store.storecode && t.store.businessdate && r.data.barcodeSwitch ? "barCode" : "getOrderNumberFail" : "arrival") : "orderNumber" : t.sendByMail || t.status && 2 == t.status.posStatus ? "getOrderNumberFail" : "tryAgain" : "arrival";
    },
    isNotFixcondiment: function() {
        for (var t = getApp().globalData.order, e = 0; e < t.items.length; e++) for (var r = t.items[e], a = 0; a < getApp().globalData.condimentIds.length; a++) {
            var o = getApp().globalData.condimentIds[a];
            r.pmId == o && (r.__fixCondiment__ = !1);
        }
    },
    compareTaste: function(t, e) {
        if (!t || !e || t.length != e.length) return !1;
        for (var r = !0, a = 0; a < t.length; a++) if (t[a].__choose__ != e[a].__choose__) {
            r = !1;
            break;
        }
        return r;
    },
    getSpecialNeeds: function(t) {
        for (var e = [], r = 0; r < t.tasteList.length; r++) t.tasteList[r].__choose__ && e.push(t.tasteList[r]);
        return e;
    },
    addTasteProducts: function(t, e, r, o) {
        e.subItemsPrev || (e.subItemsPrev = []), e.subItems || (e.subItems = []);
        for (u = 0; u < e.subItems.length; u++) {
            for (var i = e.subItems[u], n = !1, s = 0; s < e.subItemsPrev.length; s++) {
                l = e.subItemsPrev[s];
                if ("G" == e.menuFlag) {
                    if (i.productId == l.productId && this.compareTaste(i.tasteList, l.tasteList)) {
                        n = !0, i.__quantity__ != l.__quantity__ && (d = {
                            ruleid: i.productId,
                            productId: i.productId,
                            nameCN: a._trimD(i.nameCn),
                            nameEN: i.nameEn,
                            classId: o,
                            itemType: 0,
                            mealFlag: -1 != i.menuFlag.indexOf("M"),
                            lunch: i.lunch,
                            price: i.price,
                            quantity: i.__quantity__,
                            modify: !0,
                            memberProduct: i.memberProduct,
                            maxQty: i.maxQty,
                            specialNeeds: this.getSpecialNeeds(i),
                            accessoryIds: i.accessoryIds
                        }, r.push(d));
                        break;
                    }
                } else if (this.compareTaste(i.tasteList, l.tasteList)) {
                    if (n = !0, i.__quantity__ != l.__quantity__) {
                        d = {
                            ruleid: i.productId,
                            productId: i.productId,
                            nameCN: i.showNameCn,
                            nameEN: i.showNameEn,
                            classId: o,
                            itemType: 0,
                            mealFlag: -1 != i.menuFlag.indexOf("M"),
                            lunch: i.lunch,
                            price: i.price,
                            quantity: t && 0 == i.memberProduct ? 0 : i.__quantity__,
                            modify: !0,
                            condimentItems: [],
                            specialNeeds: this.getSpecialNeeds(i),
                            accessoryIds: i.accessoryIds
                        };
                        r.push(d);
                    }
                    break;
                }
            }
            if (!n) {
                d = {
                    ruleid: i.productId,
                    productId: i.productId,
                    nameCN: a._trimD(i.nameCn),
                    nameEN: i.nameEn,
                    classId: o,
                    itemType: 0,
                    mealFlag: -1 != i.menuFlag.indexOf("M"),
                    lunch: i.lunch,
                    price: i.price,
                    quantity: t && 0 == i.memberProduct ? 0 : i.__quantity__,
                    modify: !0,
                    memberProduct: i.memberProduct,
                    maxQty: i.maxQty,
                    specialNeeds: this.getSpecialNeeds(i),
                    accessoryIds: i.accessoryIds
                };
                r.push(d);
            }
        }
        for (var u = 0; u < e.subItemsPrev.length; u++) {
            for (var l = e.subItemsPrev[u], n = !1, s = 0; s < e.subItems.length; s++) {
                i = e.subItems[s];
                if ("G" == e.menuFlag) {
                    if (i.productId == l.productId && this.compareTaste(i.tasteList, l.tasteList)) {
                        n = !0;
                        break;
                    }
                } else if (this.compareTaste(i.tasteList, l.tasteList)) {
                    n = !0;
                    break;
                }
            }
            if (!n) {
                var d = {
                    ruleid: l.productId,
                    productId: l.productId,
                    nameCN: a._trimD(l.nameCn),
                    nameEN: l.nameEn,
                    classId: o,
                    itemType: 0,
                    mealFlag: -1 != l.menuFlag.indexOf("M"),
                    lunch: l.lunch,
                    price: l.price,
                    quantity: 0,
                    modify: !0,
                    memberProduct: l.memberProduct,
                    maxQty: l.maxQty,
                    specialNeeds: this.getSpecialNeeds(l),
                    accessoryIds: l.accessoryIds
                };
                r.push(d);
            }
        }
    },
    againOrder: function(t, e, r) {
        var i = getApp();
        if (t && i.globalData.order && i.globalData.order.items) {
            var n = {
                storeCode: t,
                orderItems: JSON.stringify(i.globalData.order.items)
            };
            o.quickOrders(n, function(t) {
                if (0 == t.data.errorCode) {
                    if (i.globalData.order = t.data.order, t.data.order.store.typeCode && (i.globalData.storeTypeCode = t.data.order.store.typeCode), 
                    i.globalData.isSystemX = t.data.order.store.systemX, t.data.invalidItems && t.data.invalidItems.length > 0 || t.data.priceChangedItems && t.data.priceChangedItems.length > 0) {
                        var o = "", n = "";
                        if (t.data.invalidItems && t.data.invalidItems.length > 0) {
                            var s = !0, u = !1, l = void 0;
                            try {
                                for (var d, c = t.data.invalidItems[Symbol.iterator](); !(s = (d = c.next()).done); s = !0) {
                                    var m = d.value, p = "68" === m.specialProductFlag || m.specialProductFlag && "69" === m.specialProductFlag.split("-")[0];
                                    if (m.show || p) {
                                        var g = a._trimD(m.nameCN);
                                        o += o ? "\n" + g : g;
                                    }
                                }
                            } catch (t) {
                                u = !0, l = t;
                            } finally {
                                try {
                                    !s && c.return && c.return();
                                } finally {
                                    if (u) throw l;
                                }
                            }
                            t.data.__invalidStr__ = o;
                        }
                        if (t.data.priceChangedItems && t.data.priceChangedItems.length > 0) {
                            var _ = !0, f = !1, y = void 0;
                            try {
                                for (var h, v = t.data.priceChangedItems[Symbol.iterator](); !(_ = (h = v.next()).done); _ = !0) {
                                    var I = h.value, p = "68" === I.specialProductFlag || I.specialProductFlag && "69" === I.specialProductFlag.split("-")[0];
                                    if (I.show || p) {
                                        var b = a._trimD(I.nameCN);
                                        n += n ? "\n" + b : b;
                                    }
                                }
                            } catch (t) {
                                f = !0, y = t;
                            } finally {
                                try {
                                    !_ && v.return && v.return();
                                } finally {
                                    if (f) throw y;
                                }
                            }
                            t.data.__priceChangedStr__ = n;
                        }
                    }
                    "function" == typeof e && e(t.data);
                } else "function" == typeof r && r(t.data);
            });
        }
    },
    _getNumDaysAgo: function(t, e) {
        var r = new Date().getTime(), a = t + 24 * e * 60 * 60 * 1e3;
        return r > t && r <= a;
    },
    _filterUnderlineKey: function(t) {
        var e = JSON.parse(JSON.stringify(t));
        for (var r in e) "[object Object]" !== Object.prototype.toString.call(e[r]) && "[object Array]" !== Object.prototype.toString.call(e[r]) || (e[r] = this._filterUnderlineKey(e[r])), 
        /^_\w*_$/.test(r) && delete e[r];
        return e;
    },
    orderPrompt: function(t, e, a) {
        function o(e) {
            var r = t.store.typeCode;
            for (var a in e) if (r === a || -1 !== a.indexOf(r)) return e[a];
        }
        var i = getApp(), n = i.globalData.frontEndPromptCopywriter ? JSON.parse(i.globalData.frontEndPromptCopywriter) : "";
        if ("object" === (void 0 === n ? "undefined" : r(n)) && n.mcStoreTakeMeals) {
            if (e) {
                var s = n.mcStoreTakeMeals.completion;
                return a ? o(s.sucess) || "请至柜台凭取餐号取餐" : o(s.fail) || "请至柜台联系值班经理为您配餐";
            }
            var u = n.mcStoreTakeMeals.orderDetails;
            return a ? o(u.sucess) || "请至柜台凭取餐号取餐" : o(u.fail) || "请至柜台联系值班经理为您配餐";
        }
        return a ? "请至柜台凭取餐号取餐" : "请至柜台联系值班经理为您配餐";
    },
    isBuffetStore: function(t) {
        if (i._dateFormater(new Date(getApp().globalData.syncTime), "numberDate") !== i._dateFormater(new Date(t.bookingDate || t.orderTime), "numberDate")) return !1;
        var e = getApp().globalData.selfSupportMealCode, r = e.nationwideSwitch, a = e.citySwitch, o = e.storeSwitch, n = e.marketSwitch, s = e.cityList, u = e.storeList, l = e.marketList, d = t.store;
        return "Q" !== d.typeCode && (!!r || (!!(n && l && l.length && l.includes(d.marketcode)) || (!!(a && s && s.length && s.includes(d.citycode)) || !!(o && u && u.length && u.includes(d.storecode)))));
    },
    buffetStoreOrderPrompt: function(t) {
        if (this.isBuffetStore(t)) return getApp().globalData.selfSupportMealCode.noticeTitle;
    },
    saveOnlinePayOrder: function(t, e) {
        var r = this;
        return new Promise(function(a, i) {
            o.saveOnlinePayOrder(t, function(t) {
                if (0 === t.data.errorCode) if (t.data.order) {
                    if (e) {
                        var o = e.data.order;
                        o.id = t.data.order.id, e.setData({
                            order: o
                        });
                    }
                    if (15 === t.data.order.status.iosStatus) {
                        var n = getApp().globalData.wsUrlOrderState || t.data.wsUrlOrderState + "/websocket";
                        n = n.replace("https:", "wss:"), r.orderStatusSocket(t.data.order, n).then(function() {
                            a();
                        }).catch(function(e) {
                            "pollingOrderStatus" === e.type ? r.pollingOrderStatus(t.data.order, e.queryCount).then(function() {
                                a();
                            }).catch(function(t) {
                                console.log(t), i(t);
                            }) : "couponFail" === e.type ? 491 === e.errorCode ? i(e.errorMsg && e.errorMsg.indexOf("%") > -1 ? {
                                type: "defaultAction",
                                errorCode: e.errorCode,
                                errorMsg: e.errorMsg
                            } : {
                                type: "defaultAction",
                                errorCode: -1,
                                errorMsg: e.errorMsg
                            }) : 4 === e.errorCode && i({
                                type: "defaultAction",
                                errorCode: -1,
                                errorMsg: r.getCouponErrorMessage("circuit")
                            }) : (console.log(e), i(e));
                        });
                    } else 99 === t.data.order.status.iosStatus ? a() : i({
                        type: "defaultAction",
                        errorCode: -1,
                        errorMsg: r.getCouponErrorMessage("timeout")
                    });
                } else i({
                    type: "defaultAction",
                    errorCode: -1,
                    errorMsg: r.getCouponErrorMessage("timeout")
                }); else i({
                    type: "defaultAction",
                    errorCode: t.data.errorCode,
                    errorMsg: t.data.errorMsg
                });
            }, function(t) {
                t && t.errMsg && i({
                    type: "defaultAction"
                });
            });
        });
    },
    orderStatusSocket: function(t, e) {
        var r = this;
        return new Promise(function(a, o) {
            var i;
            wx.connectSocket({
                url: e
            }), wx.onSocketOpen(function(e) {
                console.log("长连接开始"), wx.sendSocketMessage({
                    data: JSON.stringify({
                        soid: t.id
                    })
                }), i = setInterval(function() {
                    clearInterval(i), wx.closeSocket(), r.getOrderStatusById(t).then(function(t) {
                        a();
                    }).catch(function(t) {
                        o(t);
                    });
                }, 12e3);
            }), wx.onSocketMessage(function(t) {
                console.log("长连接接收消息");
                var e = JSON.parse(t.data);
                1 === e.type ? 1 === e.result ? (i && clearInterval(i), wx.closeSocket(), a()) : 0 === e.result && (i && clearInterval(i), 
                wx.closeSocket(), o({
                    type: "couponFail",
                    errorCode: e.code,
                    errorMsg: e.message
                })) : 0 !== e.result && (i && clearInterval(i), wx.closeSocket(), o({
                    type: "pollingOrderStatus"
                }));
            }), wx.onSocketError(function(t) {
                console.log("长连接错误"), i && clearInterval(i), o({
                    type: "pollingOrderStatus"
                });
            });
        });
    },
    pollingOrderStatus: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5, r = this;
        return new Promise(function(a, o) {
            var i = 0;
            getApp().globalData.orderStatusIntervalTimer = setInterval(function() {
                i >= e && (getApp().globalData.orderStatusIntervalTimer && clearInterval(getApp().globalData.orderStatusIntervalTimer), 
                o({
                    type: "backHome",
                    errorCode: -1,
                    errorMsg: r.getCouponErrorMessage("timeout")
                })), r.getOrderStatusById(t).then(function() {
                    a();
                }).catch(function(t) {
                    "tryAgain" !== t.type && o(t);
                }), i++;
            }, 2e3);
        });
    },
    getOrderStatusById: function(t) {
        var r = this;
        return new Promise(function(a, i) {
            o.getOrderStatusById({
                orderId: t.id,
                userId: t.userId
            }, function(t) {
                if (0 === t.data.errorCode) {
                    var o = t.data.order;
                    o ? 2 == o.status.iosStatus || 5 == o.status.iosStatus || 18 == o.status.posStatus || 97 == o.status.iosStatus || 98 == o.status.iosStatus || 80 == o.status.iosStatus || 81 == o.status.iosStatus || 82 == o.status.iosStatus || 83 == o.status.iosStatus || 84 == o.status.iosStatus || 85 == o.status.iosStatus ? (getApp().globalData.orderStatusIntervalTimer && clearInterval(getApp().globalData.orderStatusIntervalTimer), 
                    i({
                        type: "timeOut",
                        errorCode: -1,
                        errorMsg: r.getCouponErrorMessage("timeout")
                    })) : 15 === o.status.iosStatus ? i({
                        type: "tryAgain",
                        errorCode: -1,
                        errorMsg: r.getCouponErrorMessage("timeout")
                    }) : (getApp().globalData.orderStatusIntervalTimer && clearInterval(getApp().globalData.orderStatusIntervalTimer), 
                    a()) : i({
                        type: "tryAgain",
                        errorCode: -1,
                        errorMsg: r.getCouponErrorMessage("timeout")
                    });
                } else getApp().globalData.orderStatusIntervalTimer && clearInterval(getApp().globalData.orderStatusIntervalTimer), 
                i(e({
                    type: "defaultAction"
                }, t.data));
            });
        });
    },
    getCouponErrorMessage: function(t) {
        var e = getApp(), a = e.globalData.frontEndPromptCopywriter ? JSON.parse(e.globalData.frontEndPromptCopywriter) : "", o = "circuit" === t ? "系统繁忙，请至柜台点餐" : "系统繁忙，请稍后再试";
        return "object" === (void 0 === a ? "undefined" : r(a)) && a.useCouponError && (o = a.useCouponError[t]), 
        o;
    }
};