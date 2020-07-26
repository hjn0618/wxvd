module.exports = {
    showConfirm: function(c, t, o, e, n, i, s, f) {
        this.setData({
            title: c,
            content: t,
            confirm: o,
            cancel: e,
            cancelcb: n,
            confirmcb: i,
            showLuckybagConfirm: !0,
            isLeft: s || !1,
            closexcb: f || !1
        });
    }
};