// miniprogram/pages/mainwindow/rooms/checkGuest/checkGuest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guestName:'管政',
    sex:'男',
    birthDate:'1999-0-00',
    IDNumber:'1111111'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data);
      that.setData({
        guestName:data.guestName
      });
      console.log(that.data.guestName);
    });
    db.collection('guests').where({
      guestName: that.data.guestName
    }).get({
      success(res) {
        // res.data 包含该记录的数据
        console.log(res.data);
        that.setData({
          sex:res.data.sex,
          birthDate:res.data.birthDate,
          IDNumber:res.data.IDNumber
        })
        //console.log(that.data.roomArray);
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