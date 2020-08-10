Component({
    properties: {
        title: {
            type: String,
            value: ""
        },
        plantforms: {
            type: Array,
            value: ""
        }
    },
    data: {
        isShow: !1
    },
    methods: {
        hide: function() {
            this.setData({
                isShow: !this.data.isShow
            });
        },
        show: function() {
            this.data.plantforms.length <= 0 ? wx.showModal({
                title: "提示",
                content: "当前没有可分享平台",
                showCancel: !1
            }) : this.setData({
                isShow: !this.data.isShow
            });
        },
        _clickShareViewPlatform: function(t) {
            this.triggerEvent("clickShareViewPlatform", t.currentTarget.dataset.name);
        },
        _clickShareViewCancel: function(t) {
            this.triggerEvent("clickShareViewCancel");
        }
    }
});