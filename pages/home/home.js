const app = getApp()
const fetch = app.fetch

Page({
  data: {
    imageResPath: getApp().globalData.imageResPath,
    bannerVos: []
  },
  onLoad: function (options) {
    var bannerVos = null
    var _this = this
    var callback = () => {
      wx.showLoading({
        title: '努力加载中',
        mask: true
      })
      fetch('api.do',{param:'home'},'get').then(data => {
        wx.hideLoading()
        // console.log(data.bannerVos)
        _this.initBannerVos(data.bannerVos)

      }, () => {
        callback()
      })
    }

    if (app.userInfoReady) {
      callback()
    } else {
      app.userInfoReadyCallback = callback
    }
  },
  initBannerVos: function (data) {
    console.log(data)
    var _this = this
    data.forEach(function (item, index) {
      data[index].__imageUrl__ = _this.data.imageResPath + data[index].imageUrl;
      console.log(data)
    })
    _this.setData({
      bannerVos:data
    })
  },
  preOrder: function () {
    wx.navigateTo({
      url: '/pages/menu/menu',
    })
  }
})