var a = require("../../comm/script/model"), e = require("../../comm/script/helper"), t = (require("../citylist/citylist"), 
null);

module.exports = {
    data: {
        agreeProtocol: !0,
        name: "",
        code: "",
        pwd: "",
        validateCaptcha: ""
    },
    show: function(a) {
        var e = getApp().globalData.chosenCity;
        getApp().globalData.currPage.setData({
            city: e ? e.cityname : "",
            registerVisble: !0,
            phone: a,
            visiable: !1,
            gender: 0,
            selectM: "on",
            selectW: "",
            bindWechat: !0,
            firstCode: !0,
            waitTime: 0,
            seePassword: !1,
            showProtocol: !1,
            agreeProtocol: !0,
            registerscrollHeight: getApp().globalData.height - 269
        });
    },
    hide: function() {
        getApp().globalData.currPage.setData({
            registerVisble: !1
        });
    },
    onShow: function() {
        getApp().globalData.getValidateCaptcha && ("register" == this.data.action ? this.register() : "sendSms" == this.data.action && this.sendCode(), 
        getApp().globalData.getValidateCaptcha = null);
    },
    register: function() {
        var t = getApp(), o = this;
        if (o.setData({
            action: "register"
        }), getApp().globalData.currPage.data.agreeProtocol) if (e._validCellPhone(getApp().globalData.currPage.data.phone)) if (e._validCode(o.data.code)) if (e._validPassword(o.data.pwd)) if (getApp().globalData.currPage.data.city) if (e._validName(o.data.name)) {
            var r = t.getOpenId(), i = t.getUnionId();
            r ? a.setPassword({
                phone: getApp().globalData.currPage.data.phone,
                pwd: o.data.pwd,
                code: o.data.code,
                customerName: o.data.name,
                cityName: getApp().globalData.currPage.data.city,
                gender: getApp().globalData.currPage.data.gender,
                freeLogin: !1,
                weChatUnionId: i,
                weChatOpenId: r
            }, function(e) {
                getApp().globalData.currPage.setData({
                    visiable: !1
                }), 0 == e.data.errorCode || 11009 == e.data.errorCode ? (t.globalData.phone = o.data.phone, 
                t.globalData.user = e.data.user, o.hide(), getApp().globalData.currPage.setData({
                    visiable: !1
                })) : 80001 == e.data.errorCode || 10003 == e.data.errorCode ? a.gotoCapthca(e.data) : 80006 == e.data.errorCode || 10007 == e.data.errorCode ? a.gotoCapthca(e.data) : 89999 == e.data.errorCode ? wx.showToast({
                    title: "您暂时被禁止注册本网站会员",
                    icon: "none",
                    duration: 2e3
                }) : wx.showToast({
                    title: e.data.errorMsg,
                    icon: "none",
                    duration: 3e3
                });
            }) : t.getUserInfo();
        } else wx.showToast({
            title: "请输入正确的昵称",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请选择城市",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请输入正确的密码",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请输入正确的验证码",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请输入正确的手机号",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请阅读并同意用户协议",
            icon: "none",
            duration: 2e3
        });
    },
    setGender: function(a) {
        this.data.gender = a.target.dataset.gender, 0 == this.data.gender ? getApp().globalData.currPage.setData({
            selectW: "un",
            selectM: "on"
        }) : getApp().globalData.currPage.setData({
            selectM: "un",
            selectW: "on"
        });
    },
    pwdInput: function(a) {
        this.data.pwd = a.detail.value;
    },
    nameInput: function(a) {
        this.data.name = a.detail.value;
    },
    codeInput: function(a) {
        this.data.code = a.detail.value;
    },
    sendCode: function() {
        var o = this;
        o.setData({
            action: "sendSms"
        }), e._validCellPhone(getApp().globalData.currPage.data.phone) ? a.sendVerificationCode({
            phone: getApp().globalData.currPage.data.phone,
            smsType: "register",
            validateCaptcha: getApp().globalData.getValidateCaptcha
        }, function(e) {
            if (0 == e.data.errorCode) {
                wx.showToast({
                    title: "已发送短信验证码",
                    icon: "none",
                    duration: 2e3
                }), getApp().globalData.currPage.setData({
                    visiable: !1
                }), getApp().globalData.currPage.setData({
                    firstCode: !1,
                    waitTime: 60
                }), t && clearInterval(t);
                var r = 60;
                t = setInterval(function() {
                    r <= 0 ? t && clearInterval(t) : getApp().globalData.currPage.setData({
                        waitTime: --r
                    });
                }, 1e3);
            } else 1934 == e.data.errorCode ? o.refreshImgCode() : 80001 == e.data.errorCode || 10003 == e.data.errorCode ? a.gotoCapthca(e.data) : 80006 == e.data.errorCode || 10007 == e.data.errorCode ? a.gotoCapthca(e.data) : 89999 == e.data.errorCode ? wx.showToast({
                title: "您暂时被禁止发送短信验证码",
                icon: "none",
                duration: 2e3
            }) : wx.showToast({
                title: e.data.errorMsg,
                icon: "none",
                duration: 2e3
            });
        }) : wx.showToast({
            title: "请输入正确的手机号",
            icon: "none",
            duration: 2e3
        });
    },
    toggleBindWeChat: function() {
        getApp().globalData.currPage.setData({
            bindWechat: !getApp().globalData.currPage.data.bindWechat
        });
    },
    showpassword: function() {
        getApp().globalData.currPage.setData({
            seePassword: !getApp().globalData.currPage.data.seePassword
        });
    },
    closeProtocol: function() {
        getApp().globalData.currPage.setData({
            showProtocol: !1
        });
    },
    agreeProtocol: function() {
        getApp().globalData.currPage.setData({
            showProtocol: !1,
            agreeProtocol: !0
        });
    },
    showProtocol: function() {
        getApp().globalData.currPage.setData({
            showProtocol: !0
        });
    },
    toggleProtocol: function() {
        getApp().globalData.currPage.setData({
            agreeProtocol: !getApp().globalData.currPage.data.agreeProtocol
        });
    },
    refreshImgCode: function() {
        var e = this;
        a.sendImageVerificationCode({
            phone: e.data.phone
        }, function(a) {
            loading.hide.call(e), 0 == a.data.errorCode && e.setData({
                imgUrl: a.data.imageVerityCode
            });
        });
    },
    gotoCapthcaSlide: function() {
        var a = this;
        wx.createSelectorQuery().select("#phone").fields({
            properties: [ "value" ]
        }, function(e) {
            wx.navigateTo({
                url: "../captcha/captcha-slide?phone=" + a.data.phone,
                fail: function(a) {
                    wx.hideLoading();
                }
            });
        }).exec();
    },
    gotoCapthcaClick: function() {
        wx.createSelectorQuery().select("#phone").fields({
            properties: [ "value" ]
        }, function(a) {
            wx.navigateTo({
                url: "../captcha/captcha-click?phone=" + _this.data.phone,
                fail: function(a) {
                    wx.hideLoading();
                }
            });
        }).exec();
    }
};