var t = require("../../comm/script/luckybag").isluckyBagBreakfast;

Component({
    properties: {
        item: {
            type: Object
        }
    },
    data: {
        isluckyBagBreakfast: !1
    },
    attached: function() {
        this.setData({
            isluckyBagBreakfast: this.properties.item.classId && t(this.properties.item)
        });
    },
    detached: function() {},
    methods: {}
});