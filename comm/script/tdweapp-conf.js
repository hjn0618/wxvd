var e = require("../../app_config"), r = {
    handlerUrl: e.mwosDomain.replace("https://", ""),
    proAry: [ "porder", "porders", "order", "orders" ],
    isDomain: "",
    appKey: {
        uat: "0FEF97A1501F4D03B0371DA236018CE8",
        prod: "77A8E21850E24965930017FB83A8AC22"
    },
    appName: {
        uat: "KFC PreOrder UAT",
        prod: "KFC PreOrder"
    },
    getAppKey: function() {
        return this.appKey[this.isDomain];
    },
    getAppName: function() {
        return this.appName[this.isDomain];
    },
    getDomain: function() {
        return e.mwosDomain.replace("https://", "");
    },
    init: function() {
        this.isDomain = "uat";
        for (var e = 0; e < this.proAry.length; e++) if (0 === this.handlerUrl.toLowerCase().indexOf(this.proAry[e].toLowerCase())) {
            this.isDomain = "prod";
            break;
        }
    }
};

r.init(), exports.config = {
    appkey: r.getAppKey(),
    appName: r.getAppName(),
    versionName: "versionName",
    versionCode: "versionCode",
    wxAppid: "wx23dde3ba32269caa",
    getLocation: !1,
    autoOnPullDownRefresh: !1,
    autoOnReachBottom: !1,
    getUidUrl: "https://trackingprd.hwwt8.com/miniprogram-gateway/wechat",
    requestUrl: "https://trackingprd.hwwt8.com/g/a"
};