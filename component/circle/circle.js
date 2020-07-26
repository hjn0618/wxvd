Component({
    properties: {
        second: {
            type: Number,
            value: 30
        },
        leftTime: {
            type: Number,
            value: 0
        },
        isTimeCountDown: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        configInnerText: function(e) {
            var t = "";
            if (this.data.isTimeCountDown) {
                var a = Math.floor(e % 60), n = Math.floor(e / 60);
                t = (n = n < 10 ? "0" + n : n) + ":" + (a = a < 10 ? "0" + a : a);
            } else t = e < 10 ? "0" + e : e;
            this.setData({
                innerText: t
            });
        }
    },
    canvasIdErrorCallback: function(e) {
        console.error(e.detail.errMsg);
    },
    detached: function(e) {
        this.data.intervalT && clearInterval(this.data.intervalT);
    },
    ready: function(e) {
        function t(e) {
            i.setLineWidth(5), i.setStrokeStyle("#D62F35"), i.setLineCap("round"), i.beginPath(), 
            i.arc(50, 50, 44, 1.5 * Math.PI, .5 * -Math.PI + 2 * Math.PI * (n - e) / n, !0), 
            i.stroke(), i.draw();
        }
        var a = this, n = a.data.second, r = a.data.second - a.data.leftTime;
        if (r <= 0) a.triggerEvent("countDownEnd", {}); else {
            var o = wx.createCanvasContext("innerCanvass", a), i = wx.createCanvasContext("outerCanvass", a);
            a.configInnerText(r), o.setLineWidth(5), o.setStrokeStyle("#eee"), o.setLineCap("round"), 
            o.beginPath(), o.arc(50, 50, 44, 0, 2 * Math.PI, !0), o.stroke(), o.draw(), t(r);
            var s = setInterval(function() {
                r >= 0 ? (a.configInnerText(r), t(r), r -= 1) : (clearInterval(s), a.triggerEvent("countDownEnd", {}));
            }, 1e3);
            a.data.intervalT = s;
        }
    }
});