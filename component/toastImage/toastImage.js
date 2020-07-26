var e = null, t = null;

Component({
    properties: {
        bg_image: {
            type: String,
            value: ""
        },
        nickname: {
            type: String,
            value: ""
        },
        storename: {
            type: String,
            value: ""
        },
        image: {
            type: String,
            value: ""
        },
        toastImage_fg_width: {
            type: Number,
            value: 560
        },
        toastImage_fg_height: {
            type: Number,
            value: 800
        },
        toastImage_showSaveButton: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        isShow: !1
    },
    detached: function() {},
    methods: {
        hide: function() {
            this.setData({
                isShow: !this.data.isShow
            }), e = null;
        },
        show: function() {
            var a = this;
            if (!e) {
                wx.showLoading({
                    title: "绘制中..."
                });
                var i = new Promise(function(e) {
                    wx.getImageInfo({
                        src: a.data.image,
                        success: function(t) {
                            e(t.path);
                        }
                    });
                }), o = new Promise(function(e) {
                    wx.getImageInfo({
                        src: "https://imgorder.kfc.com.cn/mwos/Version/systemX/share-bg.png",
                        success: function(t) {
                            e(t.path);
                        }
                    });
                }), n = new Promise(function(e) {
                    wx.getImageInfo({
                        src: "https://imgorder.kfc.com.cn/mwos/Version/systemX/Bitmap.png",
                        success: function(t) {
                            e(t.path);
                        }
                    });
                });
                Promise.all([ i, o, n ]).then(function(i) {
                    e = wx.createCanvasContext("shareCanvas", a);
                    a.data.toastImage_fg_height, a.data.toastImage_fg_width;
                    var o = wx.getSystemInfoSync(), n = o.windowWidth, s = o.windowHeight;
                    e.fillStyle = "#fff", e.fillRect(0, 0, n, s), e.drawImage(i[2], 100, 40, 40, 40);
                    var l = {
                        x: 180,
                        y: 50,
                        color: "black",
                        size: 15,
                        align: "center",
                        baseline: "top",
                        text: a.data.storename,
                        bold: !1
                    };
                    a.drawText(l, e), e.drawImage(i[1], 20, 100, n - 40, n - 40), e.setFillStyle("#000");
                    getApp().globalData.userInfo.nickName;
                    var r = {
                        x: 40,
                        y: n + 100,
                        width: n / 2,
                        height: 20,
                        line: 5,
                        color: "#000",
                        size: 18,
                        align: "left",
                        baseline: "top",
                        text: "Hi，" + a.data.nickname + "刚刚用Spire特调制作了一杯饮料，你也来试试吧！",
                        bold: !1
                    };
                    a.textWrap(r, e), e.drawImage(i[0], n - 110 - 20, 90 + n, 110, 110);
                    var c = {
                        x: n - 110 + 30,
                        y: 100 + n + 110,
                        color: "lightGray",
                        size: 12,
                        align: "center",
                        baseline: "top",
                        text: "扫描二维码",
                        bold: !1
                    };
                    a.drawText(c, e);
                    var g = {
                        x: n - 110 + 30,
                        y: 120 + n + 110,
                        color: "lightGray",
                        size: 12,
                        align: "center",
                        baseline: "top",
                        text: "调制属于你的Spire特调",
                        bold: !1
                    };
                    a.drawText(g, e), e.stroke(), e.draw(), wx.canvasToTempFilePath({
                        canvasId: "shareCanvas",
                        success: function(e) {
                            t = e.tempFilePath, wx.showToast({
                                title: "绘制成功"
                            }), a.setData({
                                canvasToTempFilePath: t
                            }), a._clickToastImageClose();
                        },
                        fail: function() {
                            wx.showToast({
                                title: "绘制失败"
                            });
                        },
                        complete: function() {
                            a.setData({
                                isShow: !0
                            }), wx.hideLoading(), wx.hideToast();
                        }
                    }, a);
                });
            }
        },
        drawText: function(e, t) {
            console.log("渲染文字"), t.save(), t.setFillStyle(e.color), t.setFontSize(e.size), t.setTextAlign(e.align), 
            t.setTextBaseline(e.baseline), e.bold && (console.log("字体加粗"), t.fillText(e.text, e.x, e.y - .5), 
            t.fillText(e.text, e.x - .5, e.y)), t.fillText(e.text, e.x, e.y), e.bold && (t.fillText(e.text, e.x, e.y + .5), 
            t.fillText(e.text, e.x + .5, e.y)), t.restore();
        },
        textWrap: function(e, t) {
            console.log("文本换行");
            for (var a = this.getTextLine(e, t), i = 0; i < a.length; i++) if (i < e.line) {
                var o = {
                    x: e.x,
                    y: e.y + i * e.height,
                    color: e.color,
                    size: e.size,
                    align: e.align,
                    baseline: e.baseline,
                    text: a[i],
                    bold: e.bold
                };
                i == e.line - 1 && (o.text = o.text.substring(0, o.text.length - 3) + "......"), 
                this.drawText(o, t);
            }
        },
        getTextLine: function(e, t) {
            t.setFontSize(e.size);
            for (var a = e.text.split(""), i = "", o = [], n = 0; n < a.length; n++) {
                var s = i + a[n];
                t.measureText(s).width > e.width && n > 0 ? (o.push(i), i = a[n]) : i = s, n == a.length - 1 && o.push(i);
            }
            return o;
        },
        close: function() {
            this.setData({
                isShow: !1
            });
        },
        _clickToastImageClose: function(e) {
            this.triggerEvent("clickToastImageClose");
        },
        _clickToastImageSave: function(e) {
            this.triggerEvent("clickToastImageSave", t);
        }
    }
});