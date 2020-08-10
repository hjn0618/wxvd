var e = require("./tdweapp-conf.js"), t = e.config.getUidUrl, n = e.config.requestUrl, a = [ "3", "0", "3" ], i = {
    device: !0,
    network: !0,
    uid: !0
}, o = {
    sdk: {
        version: a[0],
        minorVersion: a[1],
        build: a[2],
        platform: "Weapp",
        partner: ""
    },
    app: {
        versionCode: e.config.versionCode || "1",
        versionName: e.config.versionName || "1.0.0",
        installTime: 0,
        displayName: e.config.appName,
        appKey: e.config.appkey,
        uniqueId: e.config.wxAppid,
        channel: ""
    },
    device: {
        type: "mobile",
        softwareConfig: {},
        hardwareConfig: {},
        deviceId: {}
    },
    networks: [ {
        type: "wifi",
        available: !1,
        connected: !1
    }, {
        type: "cellular",
        available: !1,
        connected: !1,
        current: []
    }, {
        type: "unknown",
        available: !1,
        connected: !1
    } ],
    locations: [ {} ],
    appContext: {}
}, s = {
    firstInit: !1,
    initTime: 0,
    sessionId: "",
    sessionStartTime: 0,
    appLaunchInfo: null,
    sendFailTimes: 0,
    Store: {
        set: function(e, t) {
            return wx.setStorageSync("TDSDK_" + e, t), !0;
        },
        get: function(e) {
            return wx.getStorageSync("TDSDK_" + e);
        },
        remove: function(e) {
            return wx.removeStorageSync("TDSDK_" + e), !0;
        }
    },
    random: function() {
        for (var e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", t = e.length, n = "", a = 0; a < 12; a++) n += e.charAt(Math.floor(Math.random() * t));
        return n;
    },
    timestamp: function() {
        return new Date().getTime();
    },
    deviceId: function() {
        return "weapp-" + this.timestamp() + "-" + this.random();
    },
    getEventId: function(e) {
        if (!e && !/0{1}/.test(e)) return "";
        var t = "";
        try {
            t = e.toString();
        } catch (n) {
            try {
                t = JSON.stringify(e);
            } catch (e) {}
        }
        return t.split(" ")[0].slice(0, 64);
    },
    addStoreData: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = "EVENT_" + s.sessionId, n = s.Store.get(t);
        n = n && n.length ? n.concat(e) : e, s.Store.set(t, n), n.length >= 30 && (d.sessionContinue(), 
        d.startLoop());
    },
    eventHandle: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (e) {
            var n = getCurrentPages(), a = n[n.length - 1], i = {
                eventId: e,
                label: a.__route__,
                count: 1,
                startTime: s.timestamp()
            };
            if ("WeappShare" === e) {
                i.shareTickets = t.shareTickets;
                var o = JSON.parse(JSON.stringify(a.options || {}));
                o.user = s.deviceId, o.title = t.title, o.desc = t.desc, o.path = t.path, i.params = o;
            }
            s.addStoreData([ i ]);
        }
    },
    getCacheData: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = Object.keys(e), n = [], a = [];
        return t.length && t.forEach(function(t) {
            var i = e[t];
            i && i.sendFail && i.data && (n = n.concat(i.data), a.push(t));
        }), {
            data: n,
            keys: a
        };
    },
    sendCacheList: {},
    updateSendTime: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        return e.forEach(function(n, a) {
            n.action && n.action.data && (e[a].action.data.start = t);
        }), e;
    },
    getRequestData: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = JSON.parse(JSON.stringify(e)), n = s.sendCacheList;
        if (Object.keys(n).length) {
            var a = s.getCacheData(n);
            t = t.concat(a.data), a.keys.forEach(function(e) {
                return delete n[e];
            });
        }
        var i = t.length;
        if (i) {
            var o = [];
            i >= 30 ? (JSON.stringify(t) > 61440 && o.push(t.splice(0, i / 2)), o.push(t)) : o.push(t), 
            o.forEach(function(e) {
                var t = s.timestamp();
                n[t] = {
                    data: e,
                    sendFail: !1
                };
                var a = s.updateSendTime(e, s.timestamp());
                s.request(t, a);
            });
        }
    },
    request: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        wx.request({
            url: n,
            data: JSON.stringify(t),
            method: "POST",
            success: function(t) {
                200 === t.statusCode && (delete s.sendCacheList[e], s.sendFailTimes = 0, l.appIsHide || (clearTimeout(d.timeout), 
                d.timeout = null, d.startLoop()));
            },
            fail: function() {
                l.appIsHide ? (s.Store.set("RESEND_" + e, t), delete s.sendCacheList[e]) : (s.sendCacheList[e].sendFail = !0, 
                s.sendFailTimes < 5 && s.sendFailTimes++);
            }
        });
    }
}, r = {
    isFirst: !0,
    init: function() {
        var e = this, t = s.Store.get("deviceId"), n = s.Store.get("uid");
        if (n) {
            var a = t || n;
            e.setData(a, n);
        } else new Promise(this.getOpenid).then(function(n) {
            var a = void 0;
            t ? a = t : (a = n, s.Store.set("deviceId", n)), e.setData(a, n), s.Store.set("uid", n);
        }).catch(function(n) {
            var a = void 0;
            a = t || s.deviceId(), e.setData(a, ""), s.Store.set("deviceId", a);
        });
    },
    setData: function(e, t) {
        o.device.deviceId = {
            tid: e,
            uid: t
        }, i.uid = !1, d.getAppProfile();
    },
    getOpenid: function(n, a) {
        function i() {
            o.isFirst ? o.reGetOpenid(n, a) : a("error");
        }
        var o = r;
        new Date().getTime(), wx.login({
            timeout: 3e3,
            success: function(a) {
                if (a.code) {
                    var o = t;
                    wx.request({
                        url: o + "/" + e.config.appkey + "/" + a.code,
                        success: function(e) {
                            var t = e.data;
                            t && 200 === t.code && t.message ? n(t.message) : i();
                        },
                        fail: function(e) {
                            i();
                        }
                    });
                } else i();
            },
            fail: function(e) {
                i();
            }
        });
    },
    reGetOpenid: function(e, t) {
        r.isFirst = !1, r.getOpenid(e, t);
    }
}, c = {
    sendTime: 0,
    statusType: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = [], n = JSON.parse(JSON.stringify(o)), a = {
            domain: e.domain,
            name: e.name,
            data: e.data
        };
        n.ts = e.data.start || s.timestamp(), n.action = a, t.push(n), s.getRequestData(t);
    },
    dataType: function(e, t) {
        var n = this.getStoreList(e, t);
        s.getRequestData(n);
    },
    getEventType: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (e.pageEvent) return {
            domain: "page",
            name: "leave"
        };
        if (e.eventId) {
            var t = {};
            switch (e.eventId) {
              case "WeappShare":
                t = {
                    domain: "user",
                    name: "share"
                };
                break;

              case "WeappPullDownRefresh":
                t = {
                    domain: "page",
                    name: "pullDownRefresh"
                };
                break;

              case "WeappReachBottom":
                t = {
                    domain: "page",
                    name: "reachBottom"
                };
                break;

              default:
                t = {
                    domain: "appEvent",
                    name: ""
                };
            }
            return t;
        }
    },
    getStoreList: function(e, t) {
        var n = this, a = [], i = e || s.sessionId, r = JSON.stringify(o), c = s.Store.get("EVENT_" + i);
        return c && c.length && (c.forEach(function(e) {
            var i = n.getEventType(e), o = JSON.parse(r);
            t && o.appContext && (o.appContext.sessionStartTime = t);
            var c = JSON.parse(JSON.stringify(e));
            c.pageEvent && delete c.pageEvent, c.status = 2;
            var u = {
                domain: i.domain,
                name: i.name,
                data: c
            };
            o.ts = c.startTime ? c.startTime : s.timestamp(), o.action = u, a.push(o);
        }), s.Store.remove("EVENT_" + i)), a;
    }
}, u = !1, d = {
    timeout: null,
    init: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        s.appLaunchInfo = t, s.appLaunchInfo.scene = t.scene ? t.scene.toString() : "", 
        r.init(), d.judgeRequireData(), d.getLocalParams(), e.config.getLocation && d.getLocation(), 
        d.getSystemInfo(), d.getNetwork();
    },
    launchRequest: function() {
        var e = {
            first: !0
        };
        c.statusType({
            domain: "app",
            name: "init",
            data: e
        });
    },
    sessionStart: function(e) {
        var t = s.appLaunchInfo || {}, n = {
            status: 1,
            duration: 0,
            name: t.path,
            scene: t.scene,
            query: t.query || {},
            shareTicket: t.shareTicket
        };
        e && d.setNewSession(), n.start = s.Store.get("session_time") || s.timestamp(), 
        n.url = d.getUrl(n.name, n.query), c.statusType({
            domain: "session",
            name: "begin",
            data: n
        });
    },
    getUrl: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = Object.keys(t).sort(function(e, t) {
            return e > t;
        }) || [], a = n.length ? e + "?" : e;
        return n.forEach(function(e, n) {
            0 !== n && (a += "&"), a += e + "=" + t[e];
        }), a;
    },
    sessionContinue: function() {
        c.dataType();
    },
    sessionEnd: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = {
            status: 3,
            start: e.startTime,
            duration: e.duration
        };
        c.statusType({
            domain: "session",
            name: "end",
            data: t
        });
    },
    sendTmpSession: function() {
        d.sessionContinue(), d.startLoop();
    },
    startLoop: function() {
        d.timeout && (clearTimeout(d.timeout), d.timeout = null);
        var e = 3e3 * (s.sendFailTimes + 1);
        d.timeout = setTimeout(function() {
            d.sendTmpSession();
        }, e);
    },
    judgeRequireData: function() {
        o.app.appKey || (o.app.appKey = "", console.error("请填写您在TalkingData申请的App ID")), 
        o.app.displayName || (o.app.displayName = "appname", console.error("请填写您的小程序名称"));
    },
    getLocalParams: function() {
        var e = s.Store.get("initTime");
        e ? s.initTime = e : (s.initTime = s.timestamp(), s.Store.set("initTime", s.initTime), 
        s.firstInit = !0), o.app.installTime = s.initTime;
        var t = s.appLaunchInfo.query || {}, n = t.TDChannelId ? t.TDChannelId : "";
        o.app.channel = n, d.setNewSession();
    },
    setNewSession: function() {
        s.sessionId = s.deviceId(), s.sessionStartTime = s.timestamp(), s.Store.set("session_time", s.sessionStartTime), 
        o.appContext.sessionId = s.sessionId, o.appContext.sessionStartTime = s.sessionStartTime;
    },
    getLaunchInfo: function() {
        var e = JSON.parse(JSON.stringify(d.launchOptions));
        return e.type = "appLaunch", e;
    },
    getAppProfile: function() {
        if (!u) {
            var e = !0;
            [ "device", "network", "uid" ].forEach(function(t) {
                i[t] && (e = !1);
            }), e && (u = !0, this.startRequest());
        }
    },
    startRequest: function() {
        s.firstInit && d.launchRequest(), this.sessionStart(), this.startLoop();
    },
    getLocation: function() {
        wx.getLocation({
            type: "wgs84",
            complete: function(e) {
                if (e.longitude || e.latitude || e.horizontalAccuracy || e.verticalAccuracy) {
                    var t = o.locations[0];
                    t.lng = e.longitude, t.lat = e.latitude, t.hAccuracy = e.horizontalAccuracy, t.vAccuracy = e.verticalAccuracy, 
                    t.speed = e.speed, t.altitude = e.altitude, t.ts = new Date().getTime();
                }
            }
        });
    },
    getNetwork: function() {
        wx.getNetworkType({
            complete: function(e) {
                var t = o.networks, n = e.networkType;
                "wifi" === n ? (t[0].available = !0, t[0].connected = !0) : "unknown" === n ? (t[2].available = !0, 
                t[2].connected = !0) : "none" !== n && (t[1].available = !0, t[1].connected = !0, 
                t[1].current.push({
                    type: n
                })), i.network = !1, d.getAppProfile();
            }
        });
    },
    getSystemInfo: function() {
        wx.getSystemInfo({
            complete: function(e) {
                if (e.model || e.system || e.SDKVersion) {
                    var t = {
                        model: e.model,
                        pixel: e.screenWidth + "*" + e.screenHeight + "*" + e.pixelRatio,
                        densityDpi: e.pixelRatio,
                        brand: e.brand
                    }, n = {
                        os: e.system,
                        local: e.language,
                        language: "zh_CN",
                        osVersionCode: e.version,
                        timezone: -new Date().getTimezoneOffset() / 60,
                        mpVersion: e.SDKVersion
                    };
                    o.device.hardwareConfig = t, o.device.softwareConfig = n;
                }
                i.device = !1, d.getAppProfile();
            }
        });
    }
}, p = {
    event: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = s.getEventId(e.id);
        if (t) {
            var n = {};
            n.eventId = t, n.label = s.getEventId(e.label), n.count = e.count || 1, n.params = e.params, 
            n.startTime = s.timestamp(), s.addStoreData([ n ]);
        }
    },
    share: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        s.eventHandle("WeappShare", e);
    },
    pullDownRefresh: function() {
        s.eventHandle("WeappPullDownRefresh");
    },
    reachBottom: function() {
        s.eventHandle("WeappReachBottom");
    },
    setAccount: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return e.accountId || /0{1}/.test(e.accountId) ? e.accountType || /0{1}/.test(e.accountType) ? void (o.appContext.account = e) : void console.warn("accountType为必填字段！") : void console.warn("accountId为必填字段！");
    }
}, l = {
    isHide2Show: !1,
    appIsHide: !1,
    show: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (l.appIsHide = !1, l.getlastTmpData(), l.isHide2Show) {
            var t = s.Store.get("TMP_time_end_" + s.sessionId), n = e.scene ? e.scene.toString() : "";
            e.scene && n === s.appLaunchInfo.scene ? s.timestamp() - t > 3e4 ? l.sessionRestart(t) : s.Store.remove("TMP_time_end_" + s.sessionId) : (s.appLaunchInfo = e, 
            s.appLaunchInfo.scene = n, l.sessionRestart(t)), l.isHide2Show = !1, d.startLoop();
        }
    },
    sessionRestart: function(e) {
        var t = s.Store.get("TMP_time_start_" + s.sessionId), n = {
            startTime: t,
            duration: parseInt((e - t) / 1e3)
        };
        d.sessionEnd(n), s.Store.remove("TMP_time_start_" + s.sessionId), s.Store.remove("TMP_time_end_" + s.sessionId), 
        s.Store.remove("session_time"), d.sessionStart(!0);
    },
    hide: function() {
        l.appIsHide = !0, clearTimeout(d.timeout), d.timeout = null, d.sessionContinue(), 
        l.isHide2Show = !0, s.Store.set("TMP_time_start_" + s.sessionId, s.Store.get("session_time")), 
        s.Store.set("TMP_time_end_" + s.sessionId, s.timestamp());
    },
    getlastTmpData: function() {
        var e = [], t = wx.getStorageInfoSync().keys || [], n = void 0, a = void 0;
        t && t.length && (n = t.filter(function(e) {
            return e.indexOf("TDSDK_EVENT") > -1;
        }), a = t.filter(function(e) {
            return e.indexOf("TDSDK_RESEND") > -1;
        })), n && n.length && (n.forEach(function(t) {
            var n = {};
            t.split("_")[2], n.id = t.split("_")[2], n.time = n.id.split("-")[1], e.push(n);
        }), l.sendLastTmpData(e)), a && a.length && a.forEach(function(e) {
            wx.getStorage({
                key: e,
                success: function(t) {
                    s.getRequestData(t.data), wx.removeStorage({
                        key: e,
                        success: function(e) {}
                    });
                }
            });
        });
    },
    sendLastTmpData: function() {
        (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function(e) {
            c.dataType(e.id, e.time);
        });
    }
}, m = {
    curPagePath: "",
    refer: "",
    pageTime: 0,
    pageQuery: {},
    show: function() {
        var e = getCurrentPages(), t = e[e.length - 1];
        "" !== m.curPagePath && (m.refer = m.curPagePath), m.curPagePath = t.__route__, 
        m.pageTime = s.timestamp(), m.pageQuery = t.options;
    },
    hide: function() {
        var e = [ {
            name: m.curPagePath,
            from: m.refer || "",
            query: m.pageQuery,
            scene: s.appLaunchInfo.scene,
            duration: parseInt((s.timestamp() - m.pageTime) / 1e3),
            startTime: m.pageTime,
            pageEvent: !0
        } ];
        s.addStoreData(e);
    }
}, f = {
    App: {
        onLaunch: d.init,
        onShow: l.show,
        onHide: l.hide
    },
    Page: {
        onShow: m.show,
        onHide: m.hide,
        onUnload: m.hide
    },
    Event: {
        event: p.event,
        share: p.share,
        pullDownRefresh: p.pullDownRefresh,
        reachBottom: p.reachBottom,
        setAccount: p.setAccount
    }
};

module.exports = f;