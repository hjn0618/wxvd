var e = getApp();

Component({
    properties: {
        title: {
            type: String,
            value: ""
        },
        isMenu: {
            type: Boolean,
            value: !1
        },
        showBack: {
            type: String,
            value: ""
        },
        recommend: {
            type: Object,
            value: {}
        },
        hasRecommend: {
            type: Boolean,
            value: !1
        },
        showRecommend: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        deftitle: "肯德基自助点餐",
        imageResPath: e.globalData.imageResPath
    },
    attached: function() {
        this.setData({
            statusBarHeight: e.globalData.wxSysInfo.statusBarHeight,
            navbarHeight: e.globalData.navbarHeight
        });
    },
    methods: {
        recommend: function() {
            this.triggerEvent("recommend");
        },
        menuBack: function() {
            this.triggerEvent("menuBack");
        },
        _navback: function() {
            wx.navigateBack();
        },
        _backhome: function() {
            wx.switchTab({
                url: "/pages/home/home"
            });
        }
    }
});