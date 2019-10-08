// client/pages/mainwindow/orders/orders.js
var app = getApp();
Page({

  /* 页面的初始数据 */
  data: {

    winWidth: 0,
    winHeight: 0,
    // tab切换   
    currentTab: 0,
  },

  /** 
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    console.log(app.globalData);
    if (!app.globalData.isChecked) {
      wx.redirectTo({
        url: "../../camera2/camera2?page=orders"
      })
    }
    var that = this;
    var util = require('../../../utils/util.js');
    const db = wx.cloud.database();
    db.collection('orders').where({
      isPay: false
    })
    .get({
      success: function(res) {
        console.log(res.data)
        for (let c in res.data) {
          let date = util.formatTime(res.data[c].startDate)
          res.data[c].startDate = date
        }
        for (let c in res.data) {
          let date = util.formatTime(res.data[c].finishDate)
          res.data[c].finishDate = date
        }
        var notPayArray = res.data
        that.setData({
          notPayArray: notPayArray
        })
        console.log(notPayArray)
      }
    })
    db.collection('orders').where({
      isComplete: false
    })
      .get({
        success: function (res) {
          console.log(res.data)
          for (let c in res.data) {
            let date = util.formatTime(res.data[c].startDate)
            res.data[c].startDate = date
          }
          for (let c in res.data) {
            let date = util.formatTime(res.data[c].finishDate)
            res.data[c].finishDate = date
          }
          var notCompArray = res.data
          that.setData({
            notCompArray: notCompArray
          })
          console.log(notCompArray)
        }
      })
    db.collection('orders').where({
      isEvaluate: false
    })
      .get({
        success: function (res) {
          console.log(res.data)
          for (let c in res.data) {
            let date = util.formatTime(res.data[c].startDate)
            res.data[c].startDate = date
          }
          for (let c in res.data) {
            let date = util.formatTime(res.data[c].finishDate)
            res.data[c].finishDate = date
          }
          var notEvaArray = res.data
          that.setData({
            notEvaArray: notEvaArray
          })
          console.log(notEvaArray)
        }
      })
    db.collection('orders').get({
      success(res) {
        // res.data 包含该记录的数据
        for (let c in res.data) {
          let date = util.formatTime(res.data[c].startDate)
          res.data[c].startDate= date
        }
        for (let c in res.data) {
          let date = util.formatTime(res.data[c].finishDate)
          res.data[c].finishDate = date
        }
        var orderarray = res.data;
        that.setData({
          orderArray: orderarray
        })
      }
    });
    /**  
     * 获取系统信息  
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /**  
      * 滑动切换tab  
      */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**  
   * 点击tab切换  
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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