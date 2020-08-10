var t = require("../../comm/script/luckybag"), i = t.setVue, a = t.getAllVueKey, e = t.usePaySuccessPromotion, p = t.endPaySuccessDownTiming, o = t.getPaySuccessConfig;

Component({
    properties: {},
    data: {
        title: "6折福袋砸中您啦",
        timeStr: "",
        timeItem: {},
        content: "",
        show: !1,
        detailTip: ""
    },
    attached: function() {
        i(this, a().LuckyBagPaySucessPopup), console.log("getApp().globalData.imageResPath", getApp().globalData.imageResPath), 
        this.setData({
            detailTip: (o().popup || {}).countdown || "",
            imageResPath: getApp().globalData.imageResPath
        });
    },
    detached: function() {
        i(null, a().LuckyBagPaySucessPopup);
    },
    methods: {
        close: function() {
            this.showPopup(!1);
        },
        showPopup: function(t) {
            t ? getApp().onTdEvent({
                id: "mini_kfcp_waitingpayment_fudaipopup_load",
                params: {
                    product2: this.data.item.linkId
                }
            }) : getApp().onTdEvent({
                id: "mini_kfcp_waitingpayment_fudaipopupclose_click"
            }), this.setData({
                show: !!t
            });
        },
        usePromotion: function() {
            getApp().onTdEvent({
                id: "mini_kfcp_waitingpayment_fudaipopupbuy_click",
                params: {
                    product2: this.data.item.linkId
                }
            }), e(this.data.item);
        },
        goDetail: function() {
            getApp().onTdEvent({
                id: "mini_kfcp_waitingpayment_fudaipopupdetail_click"
            }), p(!1), wx.navigateTo({
                url: "/pages/luckybag/luckybag-rules?isfromPaysuccess=" + !0
            });
        },
        toastTD: function() {
            getApp().onTdEvent({
                id: "mini_kfcp_waitingpayment_fudaisoldout_click",
                params: {
                    product2: this.data.item.linkId
                }
            });
        }
    }
});