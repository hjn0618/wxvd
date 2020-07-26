var t = require("../../component/styleTemplate/template"), e = function(e) {
    var r = n(), a = i(t.createContent(e), /<br.?>/i, r), s = [], l = !0, u = !1, c = void 0;
    try {
        for (var f, m = a[Symbol.iterator](); !(l = (f = m.next()).done); l = !0) {
            var y = f.value, h = o(y.text);
            s.push.apply(s, i(y, /<img .*?>/i, h, !0));
        }
    } catch (t) {
        u = !0, c = t;
    } finally {
        try {
            !l && m.return && m.return();
        } finally {
            if (u) throw c;
        }
    }
    return s;
}, i = function(e, i, n, o) {
    for (var r = e.text.split(i), a = [], s = 0, l = 0; l < r.length; l++) {
        n && l % 2 != 0 && (o ? a.push(n[s++]) : a.push(n));
        var u = Object.assign({}, e);
        a.push(Object.assign(u, t.createContent(r[l], e.style || "display: inline;", e.class || "")));
    }
    return a;
}, n = function() {
    return t.createContent("", "display: block;", "");
}, o = function(e) {
    if (e) {
        var i = e.match(/<img .*?src=['"](.*?)['"].*?>/gi);
        if (i) {
            var n = /<img .*?src=['"](.*?)['"].*?>/i;
            return i.map(function(t) {
                return t.match(n)[1];
            }).map(function(e) {
                var i = t.createImageTag(e, "", "nf-icon-size");
                return i.style = "display: inline;", i;
            });
        }
    }
};

module.exports = {
    showNotify: function(t, e, i) {
        var n = this;
        this.setData({
            mes: e,
            showNotify: t,
            showNotifyHtml: !1
        }), setTimeout(function() {
            n.setData({
                showNotify: !1
            });
        }, i || 3e3);
    },
    showNotifyHtml: function(t, i, n) {
        var o = this;
        this.setData({
            showNotifyHtml: t,
            notifyHtmlStyleTemplateContents: e(i),
            showNotify: !1
        }), setTimeout(function() {
            o.setData({
                showNotifyHtml: !1
            });
        }, n || 3e3);
    }
};