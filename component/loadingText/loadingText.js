module.exports = {
    show: function() {
        this.setData({
            visiableText: !0
        });
    },
    hide: function() {
        this.setData({
            visiableText: !1
        });
    }
};