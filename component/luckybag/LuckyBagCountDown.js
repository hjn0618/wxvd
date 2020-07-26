function t(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

var e = require("../../comm/script/luckybag"), n = e.showDownTimePop, i = e.getVue, a = e.setVue, o = e.getAllVueKey, r = e.getluckyBagCountDownText, u = require("../../component/styleTemplate/template");

Component({
    properties: {
        luckyBagCountDownBottom: {
            type: String,
            value: ""
        },
        isfromSettle: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        timeStr: "02: 04",
        timeItem: {},
        content: "",
        luckyBagCountDown: {},
        luckyBagCountDownShow: !1
    },
    created: function() {},
    attached: function() {
        this.data.luckyBagPriorVue = i(o().luckyBagCountDown), a(this, o().luckyBagCountDown), 
        this.data.luckyBagCountDown && this.showCountDownTD(), console.log("[luckyBagCountDown] attached");
    },
    detached: function() {
        a(this.data.luckyBagPriorVue, o().luckyBagCountDown), console.log("[luckyBagCountDown] detached");
    },
    methods: {
        close: function() {
            getApp().onTdEvent({
                id: this.data.isfromSettle ? "mini_kfcp_orderconfirm_fudai_reminder_close" : "mini_kfcp_mainmenu_fudai_reminder_close"
            }), n(!1);
        },
        setContent: function() {
            var e = this, n = r();
            if (n !== this.data.content) {
                this.data.content = n;
                var i = this.getBrItem(), a = this.getTemplateContext(u.createContent(n), /<br.?>/i, i), o = [], m = !0, c = !1, s = void 0;
                try {
                    for (var l, d = a[Symbol.iterator](); !(m = (l = d.next()).done); m = !0) {
                        var f = l.value, h = this.getImageItems(f.text);
                        o.push.apply(o, this.getTemplateContext(f, /<img .*?>/i, h, !0));
                    }
                } catch (t) {
                    c = !0, s = t;
                } finally {
                    try {
                        !m && d.return && d.return();
                    } finally {
                        if (c) throw s;
                    }
                }
                a = o;
                var o = [], g = this.getTimeItem(), p = !0, y = !1, v = void 0;
                try {
                    for (var _, C = a[Symbol.iterator](); !(p = (_ = C.next()).done); p = !0) {
                        var w = _.value;
                        o.push.apply(o, this.getTemplateContext(w, "{time}", g));
                    }
                } catch (t) {
                    y = !0, v = t;
                } finally {
                    try {
                        !p && C.return && C.return();
                    } finally {
                        if (y) throw v;
                    }
                }
                var k = [];
                if (o) for (var T = 0; T < o.length; T++) o[T] && o[T].isTime && k.push(T);
                this.data.timeItem = g, this.data.timeItemIndex = k, u.setContents.call(this, o);
            } else {
                var D = this.data.timeItemIndex;
                this.data.timeItem.text = this.data.timeStr, D && D.forEach(function(n) {
                    e.setData(t({}, "styleTemplateContents[" + n + "]", e.data.timeItem));
                });
            }
        },
        getTemplateContext: function(t, e, n, i) {
            for (var a = t.text.split(e), o = [], r = 0, m = 0; m < a.length; m++) {
                n && m % 2 != 0 && (i ? o.push(n[r++]) : o.push(n));
                var c = Object.assign({}, t);
                o.push(Object.assign(c, u.createContent(a[m], t.style || "display: inline;", t.class || "")));
            }
            return o;
        },
        getBrItem: function() {
            return u.createContent("", "display: block;", "");
        },
        getImageItems: function(t) {
            if (t) {
                var e = t.match(/<img .*?src=['"](.*?)['"].*?>/gi);
                if (e) {
                    var n = /<img .*?src=['"](.*?)['"].*?>/i;
                    return e.map(function(t) {
                        return t.match(n)[1];
                    }).map(function(t) {
                        return u.createImageTag(t, "", "icon");
                    });
                }
            }
        },
        getTimeItem: function() {
            var t = u.createContent(this.data.timeStr, "display: inline;", "time");
            return t.isTime = !0, t;
        },
        showCountDownTD: function() {
            getApp().onTdEvent({
                id: this.data.isfromSettle ? "mini_kfcp_orderconfirm_fudai_reminder1" : "mini_kfcp_mainmenu_fudai_reminder1"
            });
        },
        showCountDown60TD: function() {
            getApp().onTdEvent({
                id: this.data.isfromSettle ? "mini_kfcp_orderconfirm_fudai_reminder2" : "mini_kfcp_mainmenu_fudai_reminder2"
            });
        }
    }
});