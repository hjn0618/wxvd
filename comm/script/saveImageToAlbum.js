module.exports = {
    saveImageToAlbum: function(s) {
        var o = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.writePhotosAlbum"] ? o.saveImageToUserPhotosAlbum(s) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        o.saveImageToUserPhotosAlbum(s);
                    },
                    fail: function() {
                        wx.openSetting({
                            success: function(s) {}
                        });
                    }
                });
            }
        });
    },
    saveImageToUserPhotosAlbum: function(s) {
        wx.saveImageToPhotosAlbum({
            filePath: s,
            success: function(s) {
                wx.showToast({
                    title: "保存图片成功"
                });
            },
            fail: function(s) {
                wx.showToast({
                    title: "保存图片失败"
                });
            }
        });
    }
};