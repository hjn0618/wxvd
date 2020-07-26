Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {}, t = function() {
    return getApp() && getApp().globalData || {};
};

e.setObject = function(e, _) {
    var S = t().__SESSION_STORAGE__ || {};
    S[e] = _, t().__SESSION_STORAGE__ = S;
}, e.getObject = function(e) {
    return (t().__SESSION_STORAGE__ || {})[e];
}, exports.default = e;