App({
  fetch: require('utils/fetch.js'),
  onLaunch: function (a) {
    
    var token = wx.getStorageSync('MYTOKEN')
    console.log("token="+ token)

    this.appGetUsetInfo()
    this.checkLogin()
    this.getSysInfo()
    
  },
  checkLogin : function(){
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    this.fetch('/weps/service/user/check_login_state','','POST').then(data => {
      console.log('登录检验')
      console.log(data)
      if (data.header.code === 200) {
        this.userIsLogin = true
      } else if(data.header.code === 401) {
        this.login({
          success: () => {
            this.userIsLogin = true
          },
          fail: () => {
            this.checkLogin()
          }
        })
      }else {

      }
    }, () => {
      this.checkLogin()
    })
  },
  login: function(option){
    console.log("登录")
    wx.login({
      success: (res)=>{
        console.log(res.code)
        this.fetch("weps/service/user/wx_login",{'code':res.code},"POST").then(data =>{
          console.log(data)
          if (data.header.code === 200){

           option.success()
          }
        }),() =>{
          option.fail()
        }
      },
      fail: (res) => {
        wx.showModal({
          title: "是否重新登入?",
          confirmText: '是',
          success: res => {
            if (res.confirm) {
              option.fail()
            }
          }
        })
      },
      complete:(res)=>{
        wx.hideLoading()
      }
    })
  },
  appGetUsetInfo:function(){
    // 获取用户信息
    console.log("获取用户信息")
    wx.getSetting({ 
      success: res => {
        console.log("authSetting="+ res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {             
              // 可以将 res 发送给后台解码出 unionId
              this.userInfoReady = true
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        // else{
        //   wx.navigateTo({
        //     url: '/pages/index/index',
        //   })
        // }
      }
    })
  },
  getSysInfo: function () {
    var _that = this
    wx.getSystemInfo({
      success:(res)=>
      {
        console.log(res)
        this.globalData.isfullScreen = res['model'].indexOf("iPhone X") != -1 ? true:false
        this.globalData.systemInfo = res
      },
      
      fail:(res)=>{},
      complete: (res) => {},
    })
    console.log(this.globalData.systemInfo['model'])
  },
  userInfoReady:false,
  userIsLogin:false,
  globalData: {
    imageResPath: "http://10.10.10.115:7788/static/gapplets/images/",
    userInfo: {},
    systemInfo:[],
    isfullScreen:false,
  }
})