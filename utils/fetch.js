const config = require('./config')
module.exports = function(path, data, method) {
  var token = wx.getStorageSync('MYTOKEN')
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.url + path,
      method: method,
      data: data,
      header: {
        'content-type':'application/json;charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': token ?  'Bearer '+ token : ''
      },
      success: res => {
        if ( res.data.body && res.data.body.token !== undefined ) {
          token = res.data.body.token
          // console.log(res.data.body.token)
          wx.setStorageSync('MYTOKEN', token)
        }
        if (res.statusCode !== 200) {
          console.log(res.statusCode)
          fail('服务器异常', reject)
          return
        }
        if (res.data.header.code === 0) {
          console.log(res.data.header.msg)
          fail(res.data.header.msg, reject)
          return
        }
        resolve(res.data)
      },
      fail: function() {
        fail('加载数据失败', reject)
      }
    })
  })
  function fail(title, callback) {
    wx.hideLoading()
    wx.showModal({
      title: title,
      confirmText: '重试',
      success: res => {
        if (res.confirm) {
          callback()
        }
      }
    })
  }
}