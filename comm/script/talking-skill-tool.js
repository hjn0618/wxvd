module.exports = {
    content: function(r, t, e, n) {
        var o = wx.getStorageSync("orderStatusWord");
        if (!(r && t && e && n && o)) return "";
        var u = r + "_" + t + "_" + e + "_" + n;
        return o[u] ? o[u] : "";
    }
};