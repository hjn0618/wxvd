var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : e(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
}, n = {
    domain: "appadhoc.com",
    getFlags: "https://experiment.appadhoc.com/get_flags_async",
    tracker: "https://tracker.appadhoc.com/tracker",
    forceExp: "https://experiment.appadhoc.com/force_clients",
    rebuildDomain: function(e) {
        n.getFlags = e.getFlagsURL, n.tracker = e.trackerURL, n.forceExp = e.forceExpURL;
    }
}, r = function() {
    function e() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
    }
    return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e();
}, o = {
    set: function(e, t) {
        return wx.setStorageSync(e, t);
    },
    get: function(e) {
        return wx.getStorageSync(e);
    }
}, i = {
    indexOf: function(e, t) {
        var n = e.length >>> 0, r = Number(t) || 0;
        for ((r = r < 0 ? Math.ceil(r) : Math.floor(r)) < 0 && (r += n); r < n; r++) if (r in e && e[r] === t) return r;
        return -1;
    },
    uniquePush: function(e, t) {
        -1 === i.indexOf(e, t) && e.push(t);
    }
}, a = function() {
    var e = {
        sdk_api_version: "2.0",
        sdk_version: "2.1.0",
        OS: "wx",
        os_version: "",
        os_version_name: "",
        device_model: "",
        country: "",
        language: "",
        locale: "",
        display_height: "",
        display_width: "",
        screen_size: "",
        app_version: ""
    };
    try {
        var t = wx.getSystemInfoSync(), n = t.language.split("_");
        e.OS = -1 < t.system.toLowerCase().indexOf("ios") ? "iOS" : "google_android", e.os_version_name = e.os_version = t.system.split(" ")[1], 
        e.device_model = t.model, e.country = n[1], e.language = n[0], e.locale = t.language, 
        e.display_height = t.windowHeight, e.display_width = t.windowWidth, e.screen_size = t.pixelRatio;
    } catch (e) {}
    return e;
}(), s = void 0, u = void 0, c = {}, f = [], l = [], p = null, d = null, m = null, g = [];

g.run = function(e) {
    for (;0 < g.length; ) {
        var t = g.shift();
        "function" == typeof t && t(e);
    }
};

var h = function e(t) {
    if (!e.start) {
        e.start = !0;
        var r = {
            app_key: s,
            client_id: u,
            summary: a,
            custom: c
        };
        wx.request({
            url: n.getFlags,
            data: r,
            header: {
                "content-type": "application/json"
            },
            method: "POST",
            complete: function(n) {
                if (e.start = !1, 200 == n.statusCode) {
                    var r = n.data;
                    if (!r) return;
                    if (r.hasOwnProperty("error_code")) throw new Error(r.reason_display);
                    var o = [], i = [];
                    r.experiments && r.experiments.forEach(function(e, t) {
                        e.name || (e.name = e.id), o.push(e.id), i.push({
                            id: e.id,
                            flags: e.flags,
                            name: e.name
                        });
                    }), p = o, d = i, m = r.flags, "function" == typeof t && t(), g.run(_(m));
                }
            }
        });
    }
};

h.start = !1;

var y = function(e) {
    var t = !1;
    i.indexOf(f, e) < 0 ? f.push(e) : t = !0, 0 < (l = v(f, l)).length && (t || x());
}, v = function(e, t) {
    for (var n = 0, r = d.length; n < r; n++) {
        var o = d[n], a = o.flags;
        if (a && a.length) {
            for (var s = 0, u = 0, c = a.length; u < c; u++) {
                var f = a[u];
                -1 < i.indexOf(e, f) && s++;
            }
            s == a.length && i.uniquePush(t, o.id);
        }
    }
    return t.slice();
}, _ = function(e) {
    if (!e) throw new Error("init flags object error");
    return {
        get: function(t) {
            var n = e[t];
            return e.hasOwnProperty(t) && y(t), n;
        }
    };
}, w = function() {
    var e = arguments, r = void 0, o = [];
    if (e[0] instanceof Array) {
        var i = e[0];
        r = e[1];
        var f = Math.round(new Date().getTime() / 1e3), p = 0 == l.length ? [ "CONTROL" ] : l;
        i.forEach(function(e) {
            var n = void 0, r = void 0;
            if ("string" == typeof e) n = e, r = 1; else {
                if ("object" !== (void 0 === e ? "undefined" : t(e)) || null == e) throw new Error("increment params error");
                n = e.key, r = e.val;
            }
            o.push({
                key: n,
                value: r,
                timestamp: f,
                experiment_ids: p
            });
        });
    } else {
        if ("string" != typeof e[0]) throw new Error("increment params error");
        r = e[2], o = [ {
            key: e[0],
            value: e[1],
            timestamp: Math.round(new Date().getTime() / 1e3),
            experiment_ids: 0 == l.length ? [ "CONTROL" ] : l
        } ];
    }
    var d = {
        app_key: s,
        client_id: u,
        summary: a,
        custom: c,
        stats: o
    };
    wx.request({
        url: n.tracker,
        data: d,
        header: {
            "content-type": "application/json"
        },
        method: "POST",
        complete: function(e) {
            var t = !1;
            200 == e.statusCode || (t = !0), "function" == typeof r && r(t);
        }
    });
}, x = function() {
    w("Event-GET_EXPERIMENT_FLAGS", 1);
};

module.exports = {
    init: function(e, t) {
        var n = "ADHOC_MEMBERSHIP_CLIENT_ID";
        if (!e) throw new Error("Needs an appKey, get it from web console please.");
        t = (t = t || o.get(n)) || r(), o.set(n, t), u = t, s = e, h();
    },
    getExperimentFlags: function(e) {
        null == p && null == d && null == m ? g.push(e) : e(_(m));
    },
    increment: function() {
        w.apply(void 0, arguments);
    },
    setCustomTags: function(e) {
        for (var t in e) c[t] = e[t];
    },
    setAPI: function(e) {
        n.rebuildDomain(e);
    },
    getMatchedExpIds: function() {
        return l;
    },
    getMatchedExps: function() {
        for (var e = [], t = 0; t < (l || []).length; t++) for (var n = 0; n < (d || []).length; n++) l[t] == d[n].id && e.push(d[n]);
        return e;
    }
};