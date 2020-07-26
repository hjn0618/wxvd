const app = getApp()
const fetch = app.fetch
var categoryHeight = [] // 右列表各分类高度数组

Page({
  data: {
    imageResPath: getApp().globalData.imageResPath,
    defaultClassIndex: 0,
    tapIndex: 0,
    leftIndex: 0,
    menuVoList: [],
    cartList: {},
    cartPrice: 0,
    cartNumber: 0,
    cartBall: {
      show: false,
      x: 0,
      y: 0
    },

    isShowCartList: false,
    promotion: {'k':50,
                'v':5}
  },
  changingCategory: false, // 是否正在切换左侧激活的分类（防止滚动过快时切换迟缓）
  shopcartAnimate: null,
  onLoad: function(options) {
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('api.do?param=list').then(data => {
      wx.hideLoading()
      for (var i in data.list) {
        this.setData({
          defaultClassIndex: i
        })
        break
      }
      this.setData({
        menuVoList: data.data,
        
        // promotion: data.promotion[0]
      }, () => {
        var query = wx.createSelectorQuery()
        var top = 0
        query.select('.section-2').boundingClientRect(rect => {
          top = rect.top
        })
        query.selectAll('.classTip').boundingClientRect(res => {
          res.forEach(rect => {
            categoryHeight[rect.id.substring(rect.id.indexOf('_') + 1)] = rect.top - top
            // console.log(rect.top - top)
          })
        })
        query.exec()
      })
    }, () => {
      this.onLoad()
    })
    this.shopcartAnimate = shopcartAnimate('.operate-shopcart-icon', this)
  },
  tapCategory: function(e) {
    var index = e.currentTarget.dataset.index
    this.changingCategory = true
    this.setData({
      defaultClassIndex: index,
      tapIndex: index
    }, () => {
      console.log(index)
      if (index > 4) {
        this.setData({
          leftIndex: index
        })
      } else {
        this.setData({
          leftIndex: 0
        })
      }
      this.changingCategory = false
    })
  },
  onFoodScroll: function(e) {
    // console.log("onFoodScroll")
    var scrollTop = e.detail.scrollTop
    var defaultClassIndex = 0
    categoryHeight.forEach((item, i) => {
      if (scrollTop >= item) {
        defaultClassIndex = i
      }
    })
    if (!this.changingCategory) {
      this.changingCategory = true
      this.setData({
        defaultClassIndex: defaultClassIndex,
      }, () => {
        this.changingCategory = false
      })
    }
  },
  scrolltolower: function() {
    this.setData({
      defaultClassIndex: categoryHeight.length - 1
    })
  },
  getMenuClassVo: function(a,b,c) {
    var _this = this
    // console.log(_this.data.menuVoList)
    return c >= 0 ? _this.data.menuVoList[a].childClassList[b] : _this.data.menuVoList[a].menuVoList[b];
  },

  setQuantity :function(a,b,c, num){
    var _this = this
    var list = _this.data.menuVoList
    if (c >= 0){
      console.log("add22")
      list[a].childClassList[b].__quantity__ = list[a].childClassList[b].__quantity__ == null ? 1: num 
      console.log( list[a].childClassList[b].__quantity__)
    }
    else
    {
      console.log("add22")
      list[a].menuVoList[b].__quantity__ = list[a].menuVoList[b].__quantity__ == null ? 1: num
      console.log( list[a].menuVoList[b].__quantity__)
    }

    this.setData({
      menuVoList:list
    })

  },
  addToCart: function(e) {
    console.log("addToCart")
    
    var _this = this

    var a = e.currentTarget.dataset.classindex
    var b = e.currentTarget.dataset.menuindex
    var c = e.currentTarget.dataset.labelindex
    
    console.log(a,b,c)
    var food = _this.getMenuClassVo(a,b,c)
    console.log(food)
    var id = food.linkId
  //   var category_id = e.currentTarget.dataset.category_id
  //   var food = this.data.menuVoList[category_id].food[id]
    var cartList = this.data.cartList
    if (cartList[id]) {
      ++cartList[id].number
    } else {
      cartList[id] = {
        id: id,
        name: food.descCn,
        price: food.price,
        number: 1
      }
    }
    console.log(cartList[id])
    this.shopcartAnimate.show(e)
    this.setData({
      cartList: cartList,
      cartPrice: this.data.cartPrice + cartList[id].price,
      cartNumber: this.data.cartNumber + 1,
    })
    _this.setQuantity(a,b,c, cartList[id].number)
  },
  decToCart: function(e) {
    console.log("decToCart")
    
    var _this = this

    var a = e.currentTarget.dataset.classindex
    var b = e.currentTarget.dataset.menuindex
    var c = e.currentTarget.dataset.labelindex
    
    console.log(a,b,c)
    var food = _this.getMenuClassVo(a,b,c)
    console.log(food)
    var id = food.linkId

    var cartList = this.data.cartList
    if (cartList[id]) {
      --cartList[id].number
    } 


    this.shopcartAnimate.show(e)

    this.setData({
      cartList: cartList,
      cartPrice: this.data.cartPrice - cartList[id].price,
      cartNumber: this.data.cartNumber - 1,
    })
    _this.setQuantity(a,b,c,cartList[id].number)
  },
  showCartList: function() {
    if (this.data.cartNumber > 0) {
      this.setData({
        isShowCartList: !this.data.isShowCartList
      })
    }
  },
  cartNumberDec: function(e) {
    var id = e.currentTarget.dataset.id
    var cartList = this.data.cartList
    if (cartList[id]) {
      var price = cartList[id].price
      if (cartList[id].number > 1) {
        --cartList[id].number
      } else {
        delete cartList[id]
      }
      this.setData({
        cartList: cartList,
        cartNumber: --this.data.cartNumber,
        cartPrice: this.data.cartPrice - price
      })
      if (this.data.cartNumber <= 0) {
        this.setData({
          isShowCartList: false,
        })
      }
    }
  },
  cartNumberAdd: function(e) {
    var id = e.currentTarget.dataset.id
    var cartList = this.data.cartList
    ++cartList[id].number
    this.setData({
      cartList: cartList,
      cartNumber: ++this.data.cartNumber,
      cartPrice: this.data.cartPrice + cartList[id].price,
    })
  },
  cartClear: function() {
    this.setData({
      cartList: {},
      cartNumber: 0,
      cartPrice: 0,
      isShowCartList: false,
    })
  },
  order: function() {
    if (this.data.cartNumber === 0) {
      return
    }
    wx.showLoading({
      title: '正在生成订单'
    })
    fetch('food/order', {
      order: this.data.cartList
    }, 'POST').then(data => {
      wx.navigateTo({
        url: '/pages/order/checkout/checkout?order_id=' + data.order_id
      })
    }, () => {
      this.order()
    })
  }
})

function shopcartAnimate(iconClass, page) {
  var busPos = {}
  wx.createSelectorQuery().select(iconClass).boundingClientRect(rect => {
    console.log(rect)
    busPos.x = rect.left + 15
    busPos.y = rect.top
  }).exec()
  return {
    show: function(e) {
      var finger = {
        x: e.touches[0].clientX - 10,
        y: e.touches[0].clientY - 10
      }
      var topPoint = {}
      if (finger.y < busPos.y) {
        topPoint.y = finger.y - 150
      } else {
        topPoint.y = busPos.y - 150
      }
      topPoint.x = Math.abs(finger.x - busPos.x) / 2
      if (finger.x > busPos.x) {
        topPoint.x = (finger.x - busPos.x) / 2 + busPos.x
      } else {
        topPoint.x = (busPos.x - finger.x) / 2 + finger.x
      }
      var linePos = bezier([busPos, topPoint, finger], 30)
      var bezier_points = linePos.bezier_points
      page.setData({
        'cartBall.show': true,
        'cartBall.x': finger.x,
        'cartBall.y': finger.y
      })
      var len = bezier_points.length
      var index = len
      let i = index - 1
      var timer = setInterval(function() {
        i = i - 5
        if (i < 1) {
          clearInterval(timer)
          page.setData({
            'cartBall.show': false
          })
          return
        }
        page.setData({
          'cartBall.show': true,
          'cartBall.x': bezier_points[i].x,
          'cartBall.y': bezier_points[i].y
        })
      }, 50)
    }
  }

  function bezier(pots, amount) {
    var pot
    var lines
    var ret = []
    var points
    for (var i = 0; i <= amount; ++i) {
      points = pots.slice(0)
      lines = []
      while (pot = points.shift()) {
        if (points.length) {
          lines.push(pointLine([pot, points[0]], i / amount))
        } else if (lines.length > 1) {
          points = lines
          lines = []
        } else {
          break
        }
      }
      ret.push(lines[0])
    }

    function pointLine(points, rate) {
      var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance
      var ret = []
      pointA = points[0]
      pointB = points[1]
      xDistance = pointB.x - pointA.x
      yDistance = pointB.y - pointA.y
      pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2)
      tan = yDistance / xDistance
      radian = Math.atan(tan)
      tmpPointDistance = pointDistance * rate
      ret = {
        x: pointA.x + tmpPointDistance * Math.cos(radian),
        y: pointA.y + tmpPointDistance * Math.sin(radian)
      }
      return ret
    }
    return {
      bezier_points: ret
    }
  }
}