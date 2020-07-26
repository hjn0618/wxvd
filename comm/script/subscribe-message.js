var s = require("./helper");

module.exports = {
    paySucSendSubscribeMessage: function() {
        console.log(getApp().globalData.SDKVersion), s._canUseByVersion("2.4.4") && wx.requestSubscribeMessage({
            tmplIds: [ "rAsPEFuE8hl9FuJ4YgjhNSTcMHQYthX0I9HX-mufEic", "T97rPAyhlRNkXc1i_z2iIgTE0Ov9lc2cktR-4svehOc", "3QMDYageTsNN2svQNTFawcEqOXLE-aRKxfGimta-EKo" ],
            success: function(s) {},
            fail: function(s) {
                console.log(s);
            }
        });
    },
    bookingPaySucSendSubscribeMessage: function() {
        s._canUseByVersion("2.4.4") && wx.requestSubscribeMessage({
            tmplIds: [ "7LRAQjQebexuJVo_LsreM3Utaq9sXnRn3RqsxgOrVss", "3QMDYageTsNN2svQNTFawcEqOXLE-aRKxfGimta-EKo", "mD7q_8zqrUrTDKIRPL2ZpId6zg5_dt7U9XfsCuQBtj0" ],
            success: function(s) {},
            fail: function(s) {
                console.log(s);
            }
        });
    },
    signInSubscribeMessage: function() {
        s._canUseByVersion("2.4.4") && wx.requestSubscribeMessage({
            tmplIds: [ "mD7q_8zqrUrTDKIRPL2ZpId6zg5_dt7U9XfsCuQBtj0" ],
            success: function(s) {},
            fail: function(s) {
                console.log(s);
            }
        });
    }
};