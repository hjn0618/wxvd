Component({
    properties: {
        showQrcode: {
            type: Boolean,
            value: !1
        },
        diningQRCodeImage: {
            type: String,
            value: ""
        },
        systemxItems: {
            type: Array,
            value: []
        }
    },
    data: {
        isShow: !1,
        opacity: 1,
        percentage: 1
    },
    lifetimes: {
        created: function() {},
        ready: function() {}
    },
    pageLifetimes: {
        show: function() {},
        hide: function() {}
    },
    methods: {
        close: function() {
            this.setData({
                showQrcode: !1
            });
        },
        share: function(e) {
            this.triggerEvent("share", e.currentTarget.dataset.index);
        },
        college: function(e) {
            this.triggerEvent("college", e.currentTarget.dataset.index);
        },
        canceCollege: function(e) {
            this.triggerEvent("canceCollege", e.currentTarget.dataset.index);
        },
        scroll: function(e) {
            if (!(Math.abs(e.detail.deltaY) > 100)) {
                e.detail.scrollTop, e.detail.scrollTop;
                var t = e.detail.scrollTop;
                if (t < 50 && t > 0) {
                    var a = 1 - .01 * t;
                    this.setData({
                        percentage: a.toFixed(1)
                    });
                }
            }
        }
    }
});