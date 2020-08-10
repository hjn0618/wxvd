var a = require("../../comm/script/model"), t = require("../../component/loading/loading"), e = wx.getSystemInfoSync().windowWidth / 750;

Component({
    properties: {
        showScard: {
            type: Boolean,
            value: !1
        },
        orderid: {
            type: String,
            value: ""
        },
        storecode: {
            type: String,
            value: ""
        }
    },
    data: {
        myCanvas: null,
        eventStarted: !1,
        winningResult: {},
        hasMovieTicket: !1,
        cinema: "",
        scratched: !1
    },
    ready: function() {
        this.initCanvas();
    },
    methods: {
        initCanvas: function() {
            this.setData({
                myCanvas: wx.createCanvasContext("myCanvas", this)
            }), this.data.myCanvas.drawImage("../../images/guaguale.png", 0, 0, 660 * e, 360 * e), 
            this.data.myCanvas.globalCompositeOperation = "destination-out", this.data.myCanvas.draw(), 
            this.setData({
                winningResult: "https://imgorder.kfc.com.cn/mwos/Version/bg-prize_before.png"
            });
        },
        eventStart: function(e) {
            var i = this;
            if (!i.data.eventStarted) {
                var n = getApp().globalData.currPage;
                i.data.eventStarted = !0, i.setWinningResult(), a.getActivityInfo({
                    orderId: i.data.orderid,
                    storeCode: i.data.storecode,
                    channelId: "wx",
                    activityName: "stratchCardActivity"
                }, function(a) {
                    if (t.hide.call(n), 0 == a.data.errorCode) {
                        var e = a.data.activityDetail;
                        if (e) {
                            if ("NULL" === e.typeCode) return void (i.data.winningResult = "https://imgorder.kfc.com.cn/mwos/Version/img-prize_error.png");
                            if ("dyq" === e.typeCode) {
                                var s = "";
                                e.list && e.list.length > 0 && (s = e.list[0].name + "(" + e.list[0].address + ")"), 
                                s && s.length > 20 && (s = s.substring(0, 19) + "..."), i.data.cinema = s, i.data.scratched && i.setData({
                                    hasMovieTicket: !0,
                                    cinema: s
                                });
                            }
                            i.data.winningResult = e.prizeBigImage;
                        }
                    } else i.data.winningResult = "https://imgorder.kfc.com.cn/mwos/Version/img-prize_error.png";
                }, !0);
            }
        },
        eventMove: function(a) {
            if (!this.data.scratched) {
                var t = a.changedTouches[0].x, e = a.changedTouches[0].y;
                this.data.myCanvas.beginPath(), this.data.myCanvas.arc(t, e, 15, 0, 2 * Math.PI, !0), 
                this.data.myCanvas.fill(), this.data.myCanvas.draw(!0);
            }
        },
        eventUp: function(a) {
            if (!this.data.scratched) {
                var t = this;
                wx.canvasGetImageData({
                    canvasId: "myCanvas",
                    x: 0,
                    y: 0,
                    width: 660 * e,
                    height: 360 * e,
                    success: function(a) {
                        for (var e = 0, i = 3; i < a.data.length; i += 4) 0 === a.data[i] && e++;
                        e >= a.data.length / 16 && (t.setData({
                            scratched: !0
                        }), t.data.myCanvas.draw(), t.setData({
                            winningResult: t.data.winningResult
                        }), !t.data.hasMovieTicket && t.data.cinema && t.setData({
                            hasMovieTicket: !0,
                            cinema: t.data.cinema
                        }));
                    },
                    fail: function(a) {
                        console.log(a);
                    }
                }, this);
            }
        },
        closeScard: function() {
            this.triggerEvent("closescard");
        },
        setWinningResult: function() {
            this.triggerEvent("wrevent");
        },
        privateTouch: function() {}
    }
});