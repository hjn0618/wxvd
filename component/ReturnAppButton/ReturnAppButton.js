Component({
    properties: {},
    data: {
        appName: null
    },
    lifetimes: {
        attached: function() {
            var t = this, a = getApp();
            a.globalData.returnAppReady && a.globalData.returnAppReady.then(function(a) {
                t.setData({
                    appName: a
                });
            });
        },
        detached: function() {}
    },
    pageLifetimes: {
        show: function() {
            getApp().globalData.returnAppReady || this.setData({
                appName: null
            });
        },
        hide: function() {},
        resize: function(t) {}
    },
    methods: {
        launchAppError: function(t) {
            console.log(t);
        },
        close: function() {
            this.setData({
                appName: null
            }), getApp().globalData.returnAppReady = null;
        }
    }
});