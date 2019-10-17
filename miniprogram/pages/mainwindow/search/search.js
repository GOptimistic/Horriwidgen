// miniprogram/pages/mainwindow/search/search.js
const app = getApp()
var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 入住时间
    occupancy: null,
    // 离开时间
    leave: null,
    occupancy_s: '',
    leave_s:'',
    city: '',
    productList: '',
    pageSize: 8,
    more: true,
    page: 1,
    name: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 产品列表
    let that = this;
    const db = wx.cloud.database();
    db.collection('rooms').get({
      success(res) {
        // res.data 包含该记录的数据
        console.log(res.data);
        that.setData({
          productList: res.data
        })
        //console.log(that.data.roomArray);
      }
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
    // 获得入住时间及离店时间
    let value = wx.getStorageSync('time');
    console.log(value);
    let occupancy, leave;
    let occupancy_s, leave_s;
    // 判断是否已选择入住及离开时间
    if (value) {
      occupancy_s = value[0].substring(5, 11);
      leave_s = value[1].substring(5, 11);
      occupancy = value[0];
      leave = value[1];
      this.setData({
        occupancy: occupancy,
        leave: leave,
        occupancy_s: occupancy_s,
        leave_s: leave_s,
      });
    } else {
      // 未选择，默认当天及次日
      occupancy = util.getDateStr(null, 0);
      leave = util.getDateStr(null, 1);
      occupancy_s = util.getDateStr(null, 0).substring(5, 11);
      leave_s = util.getDateStr(null, 1).substring(5, 11);
      this.setData({
        occupancy: occupancy,
        leave: leave,
        occupancy_s: occupancy_s,
        leave_s: leave_s
      });
    }

    this.setData({
      city: app.globalData.city
    })
  },

  book: function(e) {
    console.log("book");
    console.log(app.globalData.isChecked);
    if (!app.globalData.isChecked) {
      wx.navigateTo({
        url: "../../camera2/camera2?page=search"
      })
    }
    var app2 = getApp();
    console.log(e);
    if (app2.globalData.isChecked){
      console.log(app2.globalData.guestPhone);
      let that = this;
      const db2 = wx.cloud.database();
      db2.collection('guests').where({guestPhone: app2.globalData.guestPhone}).get({
        success(res) {
          // res.data 包含该记录的数据
          console.log(res.data);
          that.setData({
            name: res.data[0].guestName
          })
          console.log(that.data.name);
        },
        fail(res){
          console.log('falied');
        }
      });
      var start_date = new Date(this.data.occupancy.replace(/-/g, "/"));
      var end_date = new Date(this.data.leave.replace(/-/g, "/"));
      var days = end_date.getTime() - start_date.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24));
      console.log('id'+e.currentTarget.dataset.roomId);
      console.log('type' + e.currentTarget.dataset.roomType);
      console.log('price' + e.currentTarget.dataset.price);
      const db = wx.cloud.database();
      db.collection('orders').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          finishDate: new Date(this.data.leave),
          guestName: this.data.name,
          guestPhone: app2.globalData.guestPhone,
          isComplete: false,
          isEvaluate: false,
          isPay: false,
          orderDate: new Date(util.getDateStr(null, 0)),
          orderdates: day,
          roomId: e.currentTarget.dataset.roomid,
          roomType: e.currentTarget.dataset.roomtype,
          singlePrice: e.currentTarget.dataset.price,
          startDate: new Date(this.data.occupancy),
          totalPrice: day * e.currentTarget.dataset.price,
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000//持续的时间

          })
        },
        fail: function (res) {
          console.log('fail');
        }
      })
    };
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

  getmore: function() {
    let that = this;
    that.setData({
      page: ++that.data.page
    })
    console.log(that.data.page);
    let productData = {
      categoryId: 17355,
      page: that.data.page,
      pageSize: that.data.pageSize,
    }
    util.getProductList(productData, that);
  }
})