function e(e) {
    switch (e) {
      case "shoppingCart":
        return 1;

      case "recommend":
        return 2;

      case "menu":
        return 3;

      case "detail":
        return 4;

      case "settlement":
        return 5;

      case "upgrade":
        return 6;
    }
}

function t(e) {
    switch (e) {
      case "add":
        return 1;

      case "remove":
        return 2;

      case "unfold":
        return 3;

      case "fold":
        return 4;

      case "addTradeup":
        return 5;

      case "removeTradeup":
        return 6;

      case "enterDetail":
        return 7;
    }
}

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = require("../../comm/script/md5"), o = getApp(), n = o.globalData.frontLogUrl;

module.exports = {
    sendRecTracking: function(c) {
        if (c && n) {
            var s = o.globalData.user ? o.globalData.user.phoneDescription : o.globalData.phone ? o.globalData.phone : "";
            c.transactionId = o.globalData.order.id ? o.globalData.order.id : "", c.userCode = s ? a.MD5(s).toUpperCase() : "", 
            c.systemTime = new Date().getTime(), c.brand = "KFC_PRE", c.channel = o.globalData.order.channelName, 
            c.page = e(c.page), c.action = t(c.action), c.items && "object" === r(c.items) && (c.items = JSON.stringify(c.items)), 
            wx.request({
                url: n,
                data: c,
                method: "GET",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                success: function(e) {
                    console.log("sendRecTracking", e);
                },
                fail: function(e) {
                    console.log("sendRecTracking error");
                }
            });
        }
    }
};