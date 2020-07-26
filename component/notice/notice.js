module.exports = {
    showNotice: function(t, e, o, i, n, c) {
        this.setData({
            noticeTitle: t,
            noticeContent: e,
            noticeConfirm: o,
            noticeCancel: i,
            noticeConfirmCb: n,
            noticeCancelCb: c,
            showNotice: !0
        });
    }
};