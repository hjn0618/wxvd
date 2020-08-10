const app = getApp()
const fetch = app.fetch

Page({
  data: {
    userInfoReady:'',
    auther:'',
    userInfo:'',
    wel:"上午好",
    imageResPath: app.globalData.imageResPath,
    bannerVos: [],
    serviceBases:[],
    bannerVFIs:[],
    serviceMores:[]
  },
  onLoad: function (options) {

    this.getHomePage()


    app.userInfoReadyCallback = (res) =>{
      console.log('回调')
      this.setData({
        userInfoReady:true,
        userInfo: app.globalData.userInfo
      })
    };
    
  },
  getHomePage : function(){
    wx.showLoading({
      title: '努力加载中',
      mask: true
    })
    fetch('weps/service/home','','get').then(data => {
      wx.hideLoading()
      console.log(data)
      this.setData({
        bannerVos:data.body.bannerVos,
        serviceBases: data.body.serviceBase,
        serviceMores:data.body.serviceMore,
        bannerVFIs: data.body.bannerVFI
      })
    }, () => {
      this.gethomePage()
    })
  },
  preOrder: function () {
    this.setData({
      auther:true
    })
    // wx.navigateTo({
    //   url: '/pages/menu/menu',
    // })
  },
  pageNavTo: function (e){
    // console.log(e)
    var _that = this
    var param = e.currentTarget.dataset.index;
    console.log(param)
    switch(param)
    {
      case 0:
        break;
      case 1:
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/order/order',
        })
    }
  }
})