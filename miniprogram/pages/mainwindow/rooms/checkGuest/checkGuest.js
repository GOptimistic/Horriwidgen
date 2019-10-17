// miniprogram/pages/mainwindow/rooms/checkGuest/checkGuest.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guestName:'',
    sex:'',
    birthDate:'',
    IDNumber:'',
    roomID: '',
  },

  confirmCheckin(){
    var that = this;
    app.globalData.isIN = true;
    wx.reLaunch({
      url: '../rooms'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var util = require('../../../../utils/util.js');
    console.log(options);    
    const db = wx.cloud.database();
    that.setData({
      guestName: options.guestName,
      roomID: options.roomID
    });
    console.log(that.data);
    db.collection('guests').where({
      guestName: that.data.guestName
    }).get({
      success(res) {
        // res.data 包含该记录的数据
        console.log(res.data);
        that.setData({
          sex:res.data[0].sex,
          birthDate: util.formatTime(res.data[0].birthDate),
          IDNumber:res.data[0].IDNumber,
          roomID: res.data[0].roomID
        })
        console.log(that.data);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})