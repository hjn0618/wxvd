Component({
    properties: {
        isShowTooltipTableware: {
            type: Boolean,
            value: !1,
            observer: "_setIsShow"
        },
        noChooseTip: {
            type: String,
            value: ""
        }
    },
    data: {
        isShow: !1
    },
    methods: {
        _setIsShow: function(t, e) {
            var o = this;
            if (!0 === t) this.setData({
                isShow: t
            }, function() {
                var t = wx.createAnimation({
                    duration: 0
                });
                t.opacity(0).step(), o.setData({
                    animationFade: t.export()
                }), (t = wx.createAnimation({
                    duration: 500
                })).opacity(1).step(), o.setData({
                    animationFade: t.export()
                });
            }); else {
                var a = wx.createAnimation({
                    duration: 300
                });
                a.opacity(0).step(), this.setData({
                    animationFade: a.export()
                }), setTimeout(function() {
                    o.setData({
                        isShow: t
                    });
                }, 300);
            }
        },
        close: function() {
            this.triggerEvent("closeTooltip");
        }
    }
});