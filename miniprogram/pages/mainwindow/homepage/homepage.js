// client/pages/mainwindow/homepage/homepage.js
const app = getApp();
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  // data: {
  // circular: true,
  //   imgUrls: [
  //     '../../../images/1.jpg',
  //     '../../../images/1.jpg',
  //     // 'https://sm.ms/image/UAFDMQPpnqVz8XG',
  //     // 'https://sm.ms/image/UAFDMQPpnqVz8XG'
  //   ],
  //   links: [
  //     '../orders/orders',
  //     '../orders/orders',
  //     // '../orders/orders',
  //     // '../orders/orders'
  //   ]
  // },
  data: {
    province: '',
    city: '',
    latitude: '',
    longitude: '',
    getLocal: true,
    imgUrls: [
      'http://m.qpic.cn/psb?/V12p8Tks3RZSb7/FP*g4VYkT3Fd4H6Qk28xiXs1dI*5TC3g10Ep4PVH2p4!/b/dDABAAAAAAAA&bo=xQLdAQAAAAARBys!&rf=viewer_4',
      'http://m.qpic.cn/psb?/V12p8Tks3RZSb7/rgaP4eJ6*Lq5y9j4617VaQD9XA8IBXY1bAJRNA42TBE!/b/dFMBAAAAAAAA&bo=IAPPAQAAAAARB90!&rf=viewer_4',
    ],
    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,
  },

  toSearchPage() {
    wx.navigateTo({
      url: '../search/search',
    })
  },

  toCitiesPage() {
    wx.navigateTo({
      url: '../cities/cities',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    qqmapsdk = new QQMapWX({
      key: 'I4QBZ-YZQ6O-WKMWW-SJFAR-23GZJ-C3BCU' //这里自己的key秘钥进行填充
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if(this.data.getLocal){
      let vm = this;
      vm.getUserLocation();
      this.setData({getLocal: false})
    }else{
      this.setData({ city: app.globalData.city})
      this.setData({ province: app.globalData.province })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  getUserLocation: function() {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function() {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function(res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function(latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        })

      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        // console.log(res);
      }
    });
  },

  formSubmit: function(e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.navigateTo({
      url: '../trains/trains?home-city=' + e.detail.value.city
    })
  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
})