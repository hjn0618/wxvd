function e(e) {
    return e.length > 50 ? e.slice(e.length - 50, e.length) : e;
}

function n(e, n) {
    for (var t in n) for (var o in e) t === o && (e[o] = n[t]);
    return e;
}

function t() {
    (c = JSON.parse(JSON.stringify(a))).Accelerometer = e(c.Accelerometer), c.Compass = e(c.Compass), 
    c.Gyroscope = e(c.Gyroscope), c.DeviceMotion = e(c.DeviceMotion);
}

var o = {}, c = [], s = wx.getSystemInfoSync().SDKVersion, i = {
    brand: "",
    model: "",
    pixelRatio: "",
    screenWidth: "",
    screenHeight: "",
    windowWidth: "",
    windowHeight: "",
    language: "",
    version: "",
    system: "",
    platform: "",
    benchmarkLevel: ""
}, r = {
    scene: "",
    referrerInfo: {}
}, u = "https://fp.hwwt8.com", a = {
    Accelerometer: [],
    Compass: [],
    Gyroscope: [],
    DeviceMotion: []
}, f = function(e, n) {
    e = e.split("."), n = n.split(".");
    for (var t = Math.max(e.length, n.length); e.length < t; ) e.push("0");
    for (;n.length < t; ) n.push("0");
    for (var o = 0; o < t; o++) {
        var c = parseInt(e[o]), s = parseInt(n[o]);
        if (c > s) return 1;
        if (c < s) return -1;
    }
    return 0;
}, p = new Promise(function(e, n) {
    wx.getSystemInfo({
        success: function(n) {
            e(n);
        }
    });
}), w = new Promise(function(e, n) {
    e(f(s, "2.1.2") >= 0 ? wx.getLaunchOptionsSync() : "");
}), l = null;

l = f(s, "1.2.0") >= 0 ? wx.getSetting({
    success: function(e) {
        e.authSetting["scope.userLocation"] && new Promise(function(e, n) {
            wx.getLocation({
                type: "gcj02",
                success: function(n) {
                    e(n);
                }
            });
        });
    },
    fail: function(e) {
        resolve("");
    }
}) : new Promise(function(e, n) {
    e("");
});

var h = new Promise(function(e, n) {
    "ios" === i.platform ? wx.getBatteryInfo({
        success: function(n) {
            e(n);
        }
    }) : e("");
}), g = new Promise(function(e, n) {
    wx.getNetworkType({
        success: function(n) {
            e(n);
        }
    });
}), m = new Promise(function(e, n) {
    f(s, "1.2.0") >= 0 ? wx.getScreenBrightness({
        success: function(n) {
            e(n);
        }
    }) : e("");
}), x = new Promise(function(e, n) {
    f(s, "1.6.0") >= 0 ? wx.startWifi({
        success: function(n) {
            wx.getConnectedWifi({
                success: function(n) {
                    e(n);
                },
                fail: function(n) {
                    e("");
                }
            });
        },
        fail: function(n) {
            e("");
        }
    }) : e("");
}), y = new Promise(function(e, n) {
    f(s, "1.1.0") >= 0 ? wx.openBluetoothAdapter({
        success: function(n) {
            wx.startBluetoothDevicesDiscovery({
                services: [],
                success: function(n) {
                    wx.getBluetoothDevices({
                        success: function(n) {
                            e(n);
                        }
                    });
                },
                fail: function(n) {
                    e("");
                }
            });
        },
        fail: function(n) {
            e("");
        }
    }) : e("");
}), d = function(e) {
    wx.getStorage({
        key: "openId",
        success: function(t) {
            t.data && (o.openId = t.data, Promise.all([ p, w, l, h, g, m, x, y ]).then(function(t) {
                o.SystemInfo = n(i, t[0]), o.LaunchOptionsSync = n(r, t[1]), o.Location = t[2], 
                o.BatteryInfo = t[3], o.Network = t[4].networkType, o.ScreenBright = t[5].value, 
                o.Wifi = t[6], o.Bluetooth = t[7], o.sdkVersion = "1.0.4", o.appletType = e || "wechat", 
                wx.request({
                    url: u + "/api/v1/wechat-info",
                    method: "post",
                    header: {
                        "content-type": "application/json"
                    },
                    data: o,
                    dataType: "json",
                    success: function(e) {},
                    fail: function(e) {},
                    error: function(e) {}
                });
            }).catch(function(e) {}));
        }
    });
}, v = function() {
    f(s, "1.1.0") >= 0 && (wx.stopAccelerometer(), wx.stopCompass(), wx.stopBluetoothDevicesDiscovery()), 
    f(s, "2.3.0") >= 0 && (wx.stopGyroscope(), wx.stopDeviceMotionListening()), t();
};

module.exports = {
    getBasicInfo: d,
    setActionInfo: function() {
        wx.getStorage({
            key: "openId",
            success: function(e) {
                e.data && (wx.onAccelerometerChange(function(e) {
                    a.Accelerometer.push(e);
                }), wx.onCompassChange(function(e) {
                    a.Compass.push(e);
                }), f(s, "2.3.0") >= 0 ? (wx.startGyroscope({
                    success: function(e) {
                        wx.onGyroscopeChange(function(e) {
                            a.Gyroscope.push(e);
                        });
                    }
                }), wx.startDeviceMotionListening({
                    success: function(e) {
                        wx.onDeviceMotionChange(function(e) {
                            a.DeviceMotion.push(e);
                        });
                    }
                })) : (a.Gyroscope = [], a.DeviceMotion = []));
            }
        });
    },
    getActionInfo: function() {
        wx.getStorage({
            key: "openId",
            success: function(e) {
                e.data && (v(), a.sdkVersion = "1.0.4", a.appletType = "wechat", wx.getStorage({
                    key: "openId",
                    success: function(e) {
                        a.openId = e.data;
                    }
                }), wx.request({
                    url: u + "/api/v1/app-action",
                    method: "post",
                    header: {
                        "content-type": "application/json"
                    },
                    data: c,
                    dataType: "json",
                    success: function(e) {},
                    fail: function(e) {},
                    error: function(e) {}
                }));
            }
        });
    },
    commit: v,
    init: function(e, n) {
        u = e, wx.setStorage({
            key: "openId",
            data: n || ""
        }), d("WeChatStart");
    }
};