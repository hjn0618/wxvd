var t = require("../../comm/script/helper"), e = require("../../comm/script/date-format");

module.exports = {
    _getDefaultClassInfo: function() {
        var t = getApp(), e = t.globalData.menuVoList.data, i = {};
        if (t.globalData.defaultClassId) i.classId = t.globalData.defaultClassId; else {
            for (var a = 0; a < e.length; a++) {
                var n = e[a];
                if ("1" == n.selected) {
                    i.classId = n.classExtId;
                    break;
                }
            }
            i.classId || (i.classId = e[0].classExtId);
        }
        return i;
    },
    _initRecommendClassInfo: function(e) {
        for (var i = 0; i < e.length; i++) {
            var a = [];
            e[i].childClassList && e[i].childClassList.length > 0 ? (a = e[i].childClassList, 
            !0) : a[0] = e[i];
            for (var n = 0; n < a.length; n++) for (var s = a[n], _ = 0; _ < s.menuVoList.length; _++) {
                var r = s.menuVoList[_];
                if (r.__disabled__ = this._productCanBuy(r) ? 0 : 1, !r.__price__) {
                    r.__price__ = (r.price / 100).toFixed(1);
                    var l = t._trimD2(r.nameCn);
                    -1 != l.indexOf("BBN") && (r.__nameCns__ = l.split("BBN")), r.__nameCn__ = t._trimD(r.nameCn);
                }
                var o = !0, u = r.condimentRoundList;
                if (u) {
                    for (var d = 0; d < getApp().globalData.condimentIds.length; d++) getApp().globalData.condimentIds[d] == r.productId && (o = !1);
                    var m = [];
                    u.forEach(function(e) {
                        e.condimentItemList.forEach(function(e) {
                            e.quantity > 0 && m.push(t._trimD(e.showNameCn) + e.quantity + "个");
                        });
                    }), r.selectDesc = m.join(" + ");
                }
                r.__fixCondiment__ = o;
            }
        }
    },
    _initSelectedClassInfo: function(e) {
        for (var i = 0; i < e.length; i++) {
            var a = !1, n = [];
            e[i].childClassList && e[i].childClassList.length > 0 ? (n = e[i].childClassList, 
            a = !0) : n[0] = e[i];
            for (var s = 0; s < n.length; s++) for (var _ = n[s], r = 0; r < _.menuVoList.length; r++) {
                var l = _.menuVoList[r];
                if (l.__disabled__ = this._productCanBuy(l) ? 0 : 1, !l.__price__) {
                    l.__price__ = (l.price / 100).toFixed(1);
                    var o = t._trimD2(l.nameCn);
                    -1 != o.indexOf("BBN") && (l.__nameCns__ = o.split("BBN")), l.__nameCn__ = t._trimD(l.nameCn), 
                    l.restrictionQuantity = l.restrictionQuantity;
                    var u = getApp().globalData.bigSystemIds;
                    u && -1 != u.indexOf(l.productId) && (l.__showbigimg__ = !0);
                }
                var d = l.price, m = a ? getApp().globalData.menuVoList.data[i].childClassList[s].menuVoList[r].condimentRoundList : getApp().globalData.menuVoList.data[i].menuVoList[r].condimentRoundList;
                if (m) {
                    for (var p = !0, c = 0; c < m.length; c++) {
                        var g = m[c].condimentItemList;
                        p && (g.length > 1 || getApp().globalData.minItemCountSwitch && 1 === g.length && m[c].itemCount !== m[c].minItemCount) && (p = !1);
                        for (var f = 0; f < g.length; f++) {
                            var h = g[f];
                            void 0 === m[c].__minPrice__ ? m[c].__minPrice__ = h.price : m[c].__minPrice__ > h.price && (m[c].__minPrice__ = h.price);
                        }
                        var I = isNaN(m[c].minItemCount) || null === m[c].minItemCount || !getApp().globalData.minItemCountSwitch || "true" !== getApp().globalData.minItemCountSwitch;
                        d += m[c].__minPrice__ * (I ? m[c].itemCount : m[c].minItemCount);
                    }
                    l.__fixCondiment__ = p, 0 == l.__fixCondiment__ && getApp().globalData.condimentIds.push(l.productId);
                }
                d = (d / 100).toFixed(1), l.__price__ = d;
            }
        }
    },
    _productCanBuy: function(t, e) {
        var i = getApp(), a = i.globalData.menuVoList.configuration, n = i.globalData.halfProductList, s = i.globalData.hasAddedHalf;
        if (t && 1 == t.willSaleFlag) return !1;
        if (t && 2 == t.disabledFlag) return !1;
        if (t && 1 == t.disabledFlag) return !1;
        if (t && t.__quantity__ >= t.maxQty) return !1;
        if (null != e && (7 == e.itemType || 8 == e.itemType || 9 == e.itemType)) return !1;
        if (this._isHalfProduct(t, e, n)) {
            if (e && !s[e.pmId] && (s[e.pmId] = e.quantity), t && !n[t.productId] && (n[t.productId] = t.lunch), 
            this._getAddedHalfNum() > a.halfPriceNum) return !1;
            if (t && t.__quantity__ >= a.eachHalfPriceNum) return !1;
            if (!t && e.quantity >= a.eachHalfPriceNum) return !1;
        }
        var _ = this._getHalfSysId(t, e, n);
        return !_ || (this._getAddedHalfNum() > a.halfPriceNum || s[_] >= a.eachHalfPriceNum);
    },
    _getAddedHalfNum: function(t) {
        var e = 0;
        for (var i in t) e += t[i];
        return e;
    },
    _isHalfProduct: function(t, e, i) {
        return null == t ? !(!i || !i[e.pmId]) : !!t.lunch;
    },
    _getHalfSysId: function(t, e, i) {
        var a = null;
        for (var n in i) {
            if (null == t && e.pmId == i[n]) {
                a = n;
                break;
            }
            if (t && t.productId == i[n]) {
                a = n;
                break;
            }
        }
        return a;
    },
    isFixcondiment: function(t, e) {
        if (null != t) {
            for (var i = !0, a = 0; a < t.length; a++) {
                var n = t[a].condimentItemList;
                i && (n.length > 1 || getApp().globalData.minItemCountSwitch && 1 === n.length && t[a].itemCount !== t[a].minItemCount) && (i = !1);
            }
            return i;
        }
    },
    _syncMenuVoList: function(t, e, i, a) {
        if (e && e.length) {
            var n = this, s = getApp().globalData.defaultClassId, _ = getApp().globalData.isSpecialNeed, r = getApp().globalData.isShowPrimeDisplay, l = null;
            getApp().globalData.hasAddedHalf = [];
            var o = [];
            if (!a) {
                for (N = 0; N < e.length; N++) {
                    var u = !1, d = [];
                    e[N].childClassList && e[N].childClassList.length > 0 ? (d = e[N].childClassList, 
                    u = !0) : d[0] = e[N];
                    for (var m = [], p = 0; p < d.length; p++) {
                        var c = d[p], g = {
                            classExtId: c.classExtId,
                            nameCn: c.nameCn,
                            imageCnUrl: c.imageCnUrl,
                            __quantity__: 0,
                            __prevQuantity__: 0,
                            menuVoList: []
                        };
                        c.__quantity__ = 0, c.__prevQuantity__ = 0;
                        for (q = 0; q < c.menuVoList.length; q++) {
                            c.menuVoList[q].iGroupVoList && c.menuVoList[q].iGroupVoList.length > 0 && c.menuVoList[q].iGroupVoList[0].iMenuVoList.forEach(function(t) {
                                t.__quantity__ = 0, t.__prevQuantity__ = 0;
                            });
                            var f = r ? c.menuVoList[q].primeDisplayInfoVo : null;
                            if (f) {
                                var h = f.primePrice;
                                f._primePrice_ = null != h && "" != h && "0" != h ? (h / 100).toFixed(1) : "";
                            }
                            var I = {
                                primeDisplayInfoVo: f,
                                accessoryIds: c.menuVoList[q].accessoryIds,
                                disabledFlag: c.menuVoList[q].disabledFlag,
                                taste: c.menuVoList[q].taste,
                                isMultipleChoice: c.menuVoList[q].isMultipleChoice,
                                menuFlag: c.menuVoList[q].menuFlag,
                                productId: c.menuVoList[q].productId,
                                linkId: c.menuVoList[q].linkId,
                                systemId: c.menuVoList[q].systemId,
                                nameCn: c.menuVoList[q].nameCn,
                                descCn: c.menuVoList[q].descCn,
                                imageUrl: c.menuVoList[q].imageUrl,
                                price: c.menuVoList[q].price,
                                maxQty: c.menuVoList[q].maxQty,
                                restrictionQuantity: c.menuVoList[q].restrictionQuantity,
                                classId: c.classExtId,
                                __quantity__: 0,
                                __prevQuantity__: 0,
                                iGroupVoList: c.menuVoList[q].iGroupVoList,
                                condimentRoundList: c.menuVoList[q].condimentRoundList && c.menuVoList[q].condimentRoundList.length > 0,
                                condimentRoundLists: c.menuVoList[q].condimentRoundList,
                                __fixCondiment__: !!c.menuVoList[q].condimentRoundList && this.isFixcondiment(c.menuVoList[q].condimentRoundList, c.menuVoList[q].nameCn)
                            };
                            if ("G" == I.menuFlag) {
                                for (var L = I.iGroupVoList[0].iMenuVoList, v = 0; v < L.length; v++) if (L[v].taste && L[v].taste.length > 0) {
                                    _ || (_ = !0, getApp().globalData.isSpecialNeed = !0);
                                    for (var y = JSON.parse(L[v].taste), b = [], C = 0; C < y.length; C++) b.push({
                                        id: y[C].id,
                                        orderItemId: y[C].orderItemId,
                                        laberPmId: y[C].laberPmId,
                                        laberName: y[C].laberName,
                                        __choose__: !1
                                    });
                                    L[v].__tasteList__ = b;
                                }
                            } else if (I.taste && I.taste.length > 0) {
                                _ || (_ = !0, getApp().globalData.isSpecialNeed = !0);
                                for (var y = JSON.parse(I.taste), b = [], C = 0; C < y.length; C++) b.push({
                                    id: y[C].id,
                                    orderItemId: y[C].orderItemId,
                                    laberPmId: y[C].laberPmId,
                                    laberName: y[C].laberName,
                                    __choose__: !1
                                });
                                I.__tasteList__ = b;
                            }
                            g.menuVoList.push(I), c.menuVoList[q].__quantity__ = 0, c.menuVoList[q].__prevQuantity__ = 0;
                        }
                        m.push(g);
                    }
                    var V = {};
                    u ? ((V = JSON.parse(JSON.stringify(e[N]))).childClassList = m, V.__quantity__ = 0) : V = m[0], 
                    l || s != e[N].classExtId || (l = V), o.push(V);
                }
                getApp().globalData.menuList = o;
            }
            for (var N = 0; N < t.items.length; N++) {
                var D = t.items[N];
                if (D.show) {
                    D.__disabled__ = this._productCanBuy(null, D) ? 0 : 1;
                    for (var q = 0; q < o.length; q++) {
                        var P = o[q], S = !1, A = [];
                        P.childClassList && P.childClassList.length > 0 ? (A = P.childClassList, S = !0) : A[0] = P;
                        for (var x = 0, O = 0; O < A.length; O++) {
                            for (var F = A[O], J = F.__quantity__, C = 0; C < F.menuVoList.length; C++) {
                                var Q = F.menuVoList[C];
                                if ("G" == Q.menuFlag) for (var k = 0; k < Q.iGroupVoList[0].iMenuVoList.length; k++) {
                                    var B = Q.iGroupVoList[0].iMenuVoList[k];
                                    B.productId == D.pmId && 0 == D.promotionType && (Q.__quantity__ += D.quantity, 
                                    Q.__prevQuantity__ += D.quantity, B.__quantity__ = D.quantity, B.__prevQuantity__ += D.quantity, 
                                    D.__fixCondiment__ = Q.__fixCondiment__, J += D.quantity, !0, B.taste && B.taste.length > 0 && (Q.subItems || (Q.subItems = []), 
                                    Q.subItemsPrev || (Q.subItemsPrev = []), (E = JSON.parse(JSON.stringify(B))).__quantity__ = D.quantity, 
                                    E.__prevQuantity__ = D.quantity, E.tasteList = n.getTasteListFromOrderItem(B.__tasteList__, D.specialNeeds), 
                                    Q.subItems.push(JSON.parse(JSON.stringify(E))), Q.subItemsPrev.push(JSON.parse(JSON.stringify(E)))));
                                } else {
                                    if (Q.productId == D.pmId && 0 == D.promotionType && (Q.__quantity__ && Q.__quantity__ > 0 ? Q.__isMulti__ = !0 : Q.__isMulti__ = !1, 
                                    Q.__quantity__ += D.quantity, Q.__prevQuantity__ += D.quantity, D.__fixCondiment__ = Q.__fixCondiment__, 
                                    J += D.quantity, !0, Q.taste && Q.taste.length > 0)) {
                                        Q.subItems || (Q.subItems = []), Q.subItemsPrev || (Q.subItemsPrev = []);
                                        var E = JSON.parse(JSON.stringify(Q));
                                        E.subItems = null, E.__quantity__ = D.quantity, E.__prevQuantity__ = D.quantity, 
                                        E.tasteList = n.getTasteListFromOrderItem(Q.__tasteList__, D.specialNeeds), Q.subItems.push(JSON.parse(JSON.stringify(E))), 
                                        Q.subItemsPrev.push(JSON.parse(JSON.stringify(E)));
                                    }
                                    Q.productId == D.pmId && (D.quantity >= Q.maxQty ? D.__disablePlus__ = !0 : D.__disablePlus__ = !1);
                                }
                            }
                            x += J, F.__quantity__ = J, F.__prevQuantity__ = J;
                        }
                        S && (P.__quantity__ = x);
                    }
                }
            }
            l && i && this._initSelectedClassInfo(l), n._syncOrderAndRecommend(t);
        }
    },
    _syncOrderAndRecommend: function(t) {
        var e = this, i = getApp().globalData.isSpecialNeed, a = getApp().globalData.recommendList;
        if (a && !(a.length <= 0)) {
            if (a.forEach(function(t) {
                t.menuVoList.forEach(function(t) {
                    t.__quantity__ = 0, t.__prevQuantity__ = 0;
                });
            }), t.items && t.items.length > 0) for (var n = 0; n < t.items.length; n++) {
                var s = t.items[n];
                if (s.show) {
                    s.__disabled__ = this._productCanBuy(null, s) ? 0 : 1;
                    for (u = 0; u < a.length; u++) {
                        (d = a[u]).__quantity__;
                        for (m = 0; m < d.menuVoList.length; m++) if ((p = d.menuVoList[m]).productId == s.pmId && 0 == s.promotionType && (p.__quantity__ && p.__quantity__ > 0 ? p.__isMulti__ = !0 : p.__isMulti__ = !1, 
                        p.__quantity__ += s.quantity, p.__prevQuantity__ += s.quantity, s.quantity, !0, 
                        p.taste && p.taste.length > 0)) {
                            i || (i = !0, getApp().globalData.isSpecialNeed = !0);
                            for (var _ = JSON.parse(p.taste), r = [], l = 0; l < _.length; l++) r.push({
                                id: _[l].id,
                                orderItemId: _[l].orderItemId,
                                laberPmId: _[l].laberPmId,
                                laberName: _[l].laberName,
                                __choose__: !1
                            });
                            p.__tasteList__ = r, p.subItems || (p.subItems = []), p.subItemsPrev || (p.subItemsPrev = []);
                            var o = JSON.parse(JSON.stringify(p));
                            o.subItems = null, o.__quantity__ = s.quantity, o.__prevQuantity__ = s.quantity, 
                            o.tasteList = e.getTasteListFromOrderItem(p.__tasteList__, s.specialNeeds), p.subItems.push(JSON.parse(JSON.stringify(o))), 
                            p.subItemsPrev.push(JSON.parse(JSON.stringify(o)));
                        }
                    }
                }
            } else for (var u = 0; u < a.length; u++) for (var d = a[u], m = 0; m < d.menuVoList.length; m++) {
                var p = d.menuVoList[m];
                p.__quantity__ = 0;
            }
            getApp().globalData.recommendList = a;
        }
    },
    _initialLabelClass: function() {
        for (var e = getApp().globalData.menuVoList.orderLabelClass.menuVoList, i = getApp().globalData.selectedLabelSysIds, a = 0; a < e.length; a++) {
            var n = e[a];
            if (n.__nameCn__ = t._trimD(n.nameCn), i.length > 0) for (var s = 0; s < i.length; s++) i[s] == n.productId && (n.__selected__ = !0);
        }
    },
    _getMenuBanner: function(t) {
        var e = "";
        if (t) for (var i = 0; i < t.length; i++) if (17 == t[i].bannerType) {
            e = t[i].imageUrl;
            break;
        }
        return e;
    },
    _filterIclassVos: function(t) {
        t && t[0] && ("3" != t[0].singlePageFlag && "4" != t[0].singlePageFlag || t.shift());
    },
    shopIsShow: function() {
        var t = getApp().globalData.couponNeedCountList;
        if (t && t.length > 0) return !0;
        var e = 0;
        return getApp().globalData.menuList.forEach(function(t) {
            e += t.__quantity__;
        }), e > 0;
    },
    getTasteListFromOrderItem: function(t, e) {
        for (var i = [], a = 0; a < t.length; a++) {
            for (var n = t[a], s = !1, _ = 0; _ < e.length; _++) if (n.laberPmId == e[_].laberPmId) {
                s = !0;
                break;
            }
            n.__choose__ = s, i.push(n);
        }
        return i;
    },
    _initPrimeCardName: function(t) {
        if (t) getApp().globalData.usedPrimeCardName = t; else {
            var e = getApp().globalData.primeCardVo;
            e && e.primeInfo && e.primeInfo.length > 0 ? getApp().globalData.usedPrimeCardName = "All" : getApp().globalData.usedPrimeCardName = "";
        }
    },
    pickUpgrade: function(t, i) {
        var a = wx.getStorageSync("UPGRADE_TIME"), n = e._dateFormater(new Date(), "numberDate");
        if (a && a > n) return null;
        if (t && t.length > 0) {
            for (var s = 0; s < t.length; s++) {
                var _ = t[s];
                if (_.aLinkId === i.linkId) {
                    getApp().globalData.upgradeConfirm = t[s];
                    for (var r = getApp().globalData.menuList, l = 0; l < r.length; l++) {
                        var o = r[l];
                        if (o.childClassList && o.childClassList.length) for (var u = 0; u < o.childClassList.length; u++) for (var d = o.childClassList[u], m = 0; m < d.menuVoList.length; m++) {
                            var p = d.menuVoList[m];
                            if (p.linkId === _.bLinkId && "0" === p.disabledFlag) {
                                var c = parseFloat(p.__price__) - parseFloat(i.__price__);
                                if (c >= 0) return Object.assign(_, p), _.__price__ = c.toFixed(1), _.aNameCn = i.__nameCn__, 
                                _.bNameCn = p.__nameCn__, _.aProductId = i.productId, _.bProductId = p.productId, 
                                _.classindex = l, _.labelindex = u, _.menuindex = m, _;
                            }
                        } else for (var g = 0; g < o.menuVoList.length; g++) {
                            var f = o.menuVoList[g];
                            if (f.linkId === _.bLinkId && "0" === f.disabledFlag) {
                                var h = parseFloat(f.__price__) - parseFloat(i.__price__);
                                if (h >= 0) return Object.assign(_, f), _.__price__ = h.toFixed(1), _.aNameCn = i.__nameCn__, 
                                _.bNameCn = f.__nameCn__, _.aProductId = i.productId, _.bProductId = f.productId, 
                                _.classindex = l, _.menuindex = g, _;
                            }
                        }
                    }
                    return null;
                }
            }
            return null;
        }
        return null;
    }
};