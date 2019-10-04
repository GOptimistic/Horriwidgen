// client/pages/mainwindow/homepage/homepage.js
Page({

  /**
   * 页面的初始数据
   */
  // data: {
  // swiperCurrent: 0,
  // indicatorDots: true,
  // autoplay: true,
  // interval: 3000,
  // duration: 800,
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
  // changeIndicatorDots: function (e) {
  //   this.setData({
  //     indicatorDots: !this.data.indicatorDots
  //   })
  // },
  // changeAutoplay: function (e) {
  //   this.setData({
  //     autoplay: !this.data.autoplay
  //   })
  // },
  // intervalChange: function (e) {
  //   this.setData({
  //     interval: e.detail.value
  //   })
  // },
  // durationChange: function (e) {
  //   this.setData({
  //     duration: e.detail.value
  //   })
  // },
  toSearchPage(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  }
})