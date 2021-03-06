// client/pages/mainwindow/rooms/rooms.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkInOut:'入住',
    lockUnlock:'锁门',
    lockDis:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    console.log(app.globalData);
    if (!app.globalData.isChecked) {
      wx.redirectTo({
        url: "../../camera2/camera2?page=rooms"
      })
    }
    if (app.globalData.isIN){
      that.setData({
        checkInOut: '退房',
        lockUnlock: '开锁',
        lockDis: false
      })
    }
    const db = wx.cloud.database();
    db.collection('orders').where({
      guestPhone:app.globalData.guestPhone,
      isComplete:false
    }).get({
      success(res) {
        // res.data 包含该记录的数据
        console.log(res.data);
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
    var guestName = e.currentTarget.dataset.guestname;
    var roomID = e.currentTarget.dataset.roomid;
    //console.log(checkInfo);
    wx.navigateTo({
      url: './checkGuest/checkGuest?inout='+inout+'&guestName='+guestName+'&roomID='+roomID,
      //url: '../../camera2/camera2',
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