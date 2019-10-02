// client/pages/mainwindow/rooms/rooms.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomID:102,
    roomType:'标间',
    guestName:'管政',
    guestPhone:'15651853776'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      env: 'hotel-a54584',
      traceUser: true
    });
    const that = this;
    const db = wx.cloud.database();
    db.collection('rooms').doc('XLfIT4nnuWjci1UL').get({
      success(res) {
        // res.data 包含该记录的数据
        console.log(res.data.roomID);
        that.setData({
          roomID: res.data.roomID,
          roomType: res.data.type,
          guestName: res.data.guestName,
          guestPhone: res.data.guestPhone,          
        });
      }
    });

  },
  add:function(){
    const db = wx.cloud.database();
    var anum = 0;
    db.collection('rooms').doc('XLfIT4nnuWjci1UL').get({
      success(res) {
        // res.data 包含该记录的数据
        anum = res.data.roomID;
        console.log('before');
        console.log(this);
        console.log(anum);
      }
    });
    console.log('after');
    console.log(anum);
    this.setData({
      roomID: anum
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