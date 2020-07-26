function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
        return n;
    }
    return Array.from(t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("./date-format"), n = function(t) {
    try {
        return wx.getStorageSync(t);
    } catch (t) {}
}, r = function(t, e) {
    try {
        wx.setStorageSync(t, e);
    } catch (t) {}
}, o = function() {
    return new Promise(function(t, e) {
        wx.getClipboardData({
            success: function(e) {
                t(e.data);
            },
            fail: function(t) {
                e();
            }
        });
    });
}, a = function() {
    var t = getApp().globalData.mwosDomain, e = !1;
    return e = e || t.indexOf("devorder.kfc.com.cn") >= 0, e = e || t.indexOf("qaorder.kfc.com.cn") >= 0;
}, i = function(t, n) {
    if (!(t.length >= 13 && t.length <= 15)) {
        var r = "错误，test预约时间必须为yyyyMMdd-hhmm，长度为13 但输入的是" + t;
        return wx.showToast({
            title: r,
            icon: "none",
            duration: 3e3
        }), !1;
    }
    var o = !0, a = /^'?(\d{4})(\d{2})(\d{2})-(\d{2})(\d{2})'?$/, i = t.match(a);
    if (null == i) {
        o = !1;
        var s = "错误，test预约时间必须为yyyyMMdd-hhmm但输入的是" + t;
        return wx.showToast({
            title: s,
            icon: "none",
            duration: 3e3
        }), !1;
    }
    var c = parseInt(i[1]), u = parseInt(i[2]), f = parseInt(i[3]), l = parseInt(i[4]), h = parseInt(i[5]);
    u >= 1 && u <= 12 || (o = !1), f >= 1 && f <= 31 || (o = !1), l >= 0 && l <= 23 || (o = !1), 
    h >= 0 && h <= 59 || (o = !1);
    var d = new Date(c, u - 1, f, l, h);
    if (o = !(!o || d.getFullYear() !== c || d.getMonth() !== u - 1 || d.getDate() !== f), 
    !(o = !(!o || d.getHours() !== l || d.getMinutes() !== h))) {
        var g = "错误，test预约时间必须为yyyyMMdd-hhmm 但输入的是" + t;
        return wx.showToast({
            title: g,
            icon: "none",
            duration: 3e3
        }), !1;
    }
    return n.setFullYear(c, u - 1, f), n.setHours(l, h), getApp().globalData.sss = void 0, 
    wx.setClipboardData({
        data: "asss=" + t,
        success: function() {
            wx.hideToast();
        },
        fail: function(t) {
            console.log("剪贴板err:", t);
        },
        complete: function() {
            var t = e._dateFormater(n, "DateTime"), r = "正确，设置的test预约时间：" + t;
            wx.showToast({
                title: r,
                icon: "none",
                duration: 3e3
            }), console.log("正确，设置的test预约时间：", t, n, n.getTime());
        }
    }), !0;
};

exports.getObject = n, exports.saveOftenStoreInfo = function(t) {
    var e = n("OFTEN_STORE_INFO");
    e && "[object Object]" !== Object.prototype.toString.call(e) || (e = []);
    var o = new Date().getTime(), a = -1;
    e.forEach(function(e, n) {
        e.storecode === t && (a = n);
    });
    var i = {};
    -1 === a ? (i.storecode = t, i.times = []) : (i = e.splice(a, 1)[0]).times = i.times.splice(0, 1), 
    i.times.unshift(o), e.unshift(i), r("OFTEN_STORE_INFO", e), console.log("支付成功后，保存店的编码", e);
}, exports.judgeOftenStore = function(t) {
    var e = n("OFTEN_STORE_INFO");
    if (!e || "[object Object]" === Object.prototype.toString.call(e)) return !1;
    var r = new Date().getTime();
    return e.some(function(e, n) {
        if (e.storecode === t) return e.times.filter(function(t) {
            return r - t <= 5184e6;
        }).length >= 2;
    });
}, exports.distanceBetweenPoints = function(t, e, n, r) {
    if (!(n && r && t && e)) return 0;
    var o = 180 / 3.14169, a = t / o, i = e / o, s = n / o, c = r / o, u = Math.cos(a) * Math.cos(i) * Math.cos(s) * Math.cos(c), f = Math.cos(a) * Math.sin(i) * Math.cos(s) * Math.sin(c), l = Math.sin(a) * Math.sin(s);
    return 6366e3 * Math.acos(u + f + l);
}, exports.sortOpenStore = function(t) {
    var e = [], n = [];
    return t.forEach(function(t) {
        t.isOpen ? e.push(t) : n.push(t);
    }), e.concat(n);
}, exports.setBookingTimeDay = function(t, e, n) {
    if (t && a()) {
        var r = void 0;
        if (e) r = String(e); else {
            var s = getApp().globalData.sss;
            if (!s) return void o().then(function(e) {
                return e && 0 === e.indexOf("sss=") ? (r = String(e.substr("sss=".length)), n(i(r, t))) : n(!0);
            }).catch(function(t) {
                return n(!0);
            });
            r = String(s);
        }
        return n(i(r, t));
    }
    return n(!0);
}, exports.allOftenStore = function() {
    var e = n("OFTEN_STORE_INFO");
    if (!e || "[object Object]" === Object.prototype.toString.call(e)) return [];
    var r = new Date().getTime();
    return [].concat(t(e)).filter(function(t) {
        return t.times.filter(function(t) {
            return r - t <= 5184e6;
        }).length >= 2;
    }).map(function(t) {
        return t.storecode;
    });
};