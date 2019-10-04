// client/pages/mainwindow/rooms/rooms.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const db = wx.cloud.database();
    /*db.collection('rooms').doc('XLfIT4nnuWjci1UL').get({
      success(res) {
        // res.data 包含该记录的数据
        console.log(res.data.roomID);
        that.setData({
          roomID: res.data.roomID,
          roomType: res.data.roomType,
          guestName: res.data.guestName,
          guestPhone: res.data.guestPhone,
        });
      }
    });*/
    db.collection('rooms').get({
      success(res) {
        // res.data 包含该记录的数据
        var roomArray = res.data;
        that.setData({
          roomArray:roomArray
        })
        //console.log(that.data.roomArray);
      }
    });
  },
  checkInOut:function(e){
    //console.log('hhh');
    var checkInfo = {};//包含入住人姓名以及房号
    var inout = e.currentTarget.dataset.inout;
    checkInfo.guestName = e.currentTarget.dataset.guestname;
    checkInfo.roomID = e.currentTarget.dataset.roomid;
    //console.log(checkInfo);
    wx.navigateTo({
      url: './checkGuest/checkGuest',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: checkInfo })
      }
    })
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