Component({
    properties: {
        plateTitle: {
            type: String,
            value: "沪"
        },
        licensePlateTitle: {
            type: String,
            value: ""
        },
        isMove: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        plateList1: [ "京", "沪", "鄂", "湘", "川", "渝", "粤", "闽", "晋", "黑" ],
        plateList2: [ "津", "浙", "豫", "赣", "贵", "青", "琼", "宁", "吉", "蒙" ],
        plateList3: [ "冀", "苏", "皖", "桂", "云", "陕", "甘", "藏", "新", "辽" ],
        plateList4: [ "鲁" ],
        licensePlateNumList1: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ],
        licensePlateNumList2: [ "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P" ],
        licensePlateNumList3: [ "A", "S", "D", "F", "G", "H", "J", "K", "Z", "X" ],
        licensePlateNumList4: [ "C", "V", "B", "N", "M", "L", "澳", "港", "学", "dele" ]
    },
    methods: {
        plateTitleTap: function(e) {
            if (this.data.isMove) {
                this.setData({
                    isMove: !1
                });
                var t = e.target.dataset.plate;
                this.triggerEvent("plateTitleSelection", {
                    plateTitle: t
                });
            }
        },
        licensePlateTitleTap: function(e) {
            var t = e.currentTarget.dataset.plate;
            "I" !== t && ("dele" === t ? this.triggerEvent("licensePlateTitleDeleTap", {
                licensePlateTitle: t
            }) : this.triggerEvent("licensePlateTitleTap", {
                licensePlateTitle: t
            }));
        },
        plateSureButonClick: function() {
            this.triggerEvent("plateSureButonClick");
        },
        licensePlateSureButonClick: function() {
            this.triggerEvent("licensePlateSureButonClick");
        }
    }
});