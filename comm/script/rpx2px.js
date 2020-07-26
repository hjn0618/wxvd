var t = wx.getSystemInfoSync().windowWidth / 750;

module.exports = function(e) {
    return t * e;
};