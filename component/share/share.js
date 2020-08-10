Component({
    properties: {
        fromPage: {
            type: String,
            value: ""
        },
        show: {
            type: Boolean,
            value: !1,
            observer: "_setIsShow"
        },
        orderTime: {
            type: Number,
            value: 0
        },
        redPacketData: {
            type: Object,
            value: null
        }
    },
    data: {
        startTime: null,
        endTime: null,
        isShow: !1,
        sameDay: null
    },
    lifetimes: {
        created: function() {
            console.log("share created");
        },
        attached: function() {
            this.setData({
                startTime: getApp().getDateTimeStartAndEnd(new Date()).startTime,
                endTime: getApp().getDateTimeStartAndEnd(new Date()).endTime
            }), console.log("share attached");
        },
        ready: function() {
            this.setData({
                sameDay: this._isTheSameDay()
            }), console.log("share ready");
        },
        moved: function() {
            console.log("share moved");
        },
        detached: function() {
            console.log("share detached");
        }
    },
    pageLifetimes: {
        show: function() {
            console.log("pageLifetimes show");
        },
        hide: function() {
            console.log("pageLifetimes hide");
        },
        resize: function() {
            console.log("pageLifetimes resize");
        }
    },
    methods: {
        _setIsShow: function(e, t) {
            this.setData({
                isShow: e
            });
        },
        _isTheSameDay: function() {
            var e = new Date().getTime();
            return e >= this.data.startTime && e <= this.data.endTime;
        },
        goShare: function() {
            var e = "mini_kfcp_orderdetail_share_click";
            "paysuccess" == this.data.fromPage && (e = "mini_kfcp_waitingpayment_share_click"), 
            getApp().onTdEvent({
                id: e
            }), getApp().navigateToMiniProgram({
                appId: this.data.redPacketData.appid,
                path: this.data.redPacketData.link
            }).then(function(e) {
                console.log("navigateToMiniProgram", e);
            }).catch(function(e) {});
        }
    }
});