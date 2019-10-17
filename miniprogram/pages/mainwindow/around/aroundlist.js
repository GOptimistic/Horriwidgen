var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aroundsearch:"",
    location:{
      latitude:"",
      longitude:"",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    qqmapsdk = new QQMapWX({
      key: 'I4QBZ-YZQ6O-WKMWW-SJFAR-23GZJ-C3BCU'
    });
    that.setData({
      location:{
        latitude:options.latitude,
        longitude:options.longitude,
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
    
  },


  // 搜索周边
  aroundSearch:function(e){
    var that=this
    this.setData({
      aroundsearch:e.detail.value,
    })
    console.log(this.data.aroundsearch)
    qqmapsdk.search({
      keyword: that.data.aroundsearch,
      location: that.data.location,
      success: function (res) {
        console.log("成功");
        console.log(res);
        that.setData({
          aroundArray:res.data,
        })
      },
      fail: function (res) {
        console.log("失败");
        that.setData({
          aroundArray: "",
        })
      },
      complete: function (res) {
        console.log("完成");
      }
    });
  },
  aroundPlace: function(e) {
    var loc = e.currentTarget.dataset.loc;
    var locname = e.currentTarget.dataset.locname;
    console.log(loc);    
    let plugin = requirePlugin('routePlan');
    let key = 'I4QBZ-YZQ6O-WKMWW-SJFAR-23GZJ-C3BCU';  //使用在腾讯位置服务申请的key
    let referer = 'horriwidgen';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': locname,
      'latitude': loc.lat,
      'longitude': loc.lng
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });

  },

  // backfill: function (e) {
  //   var id = e.currentTarget.id;
  //   for (var i = 0; i < this.data.suggestion.length; i++) {
  //     if (i == id) {
  //       this.setData({
  //         backfill: this.data.suggestion[i].title
  //       });
  //     }
  //   }
  // },

  // //触发关键词输入提示事件
  // getsuggest: function (e) {
  //   var _this = this;
  //   //调用关键词提示接口
  //   qqmapsdk.getSuggestion({
  //     //获取输入框值并设置keyword参数
  //     keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
  //     region: app.globalData.city,
  //     location: _this.data.location.latitude + ',' + _this.data.location.longitude,
  //     success: function (res) {//搜索成功后的回调
  //     console.log(_this.data.location.latitude + ',' + _this.data.location.longitude);
  //       console.log(res);
  //       var sug = [];
  //       for (var i = 0; i < res.data.length; i++) {
  //         sug.push({ // 获取返回结果，放到sug数组中
  //           title: res.data[i].title,
  //           id: res.data[i].id,
  //           addr: res.data[i].address,
  //           city: res.data[i].city,
  //           district: res.data[i].district,
  //           latitude: res.data[i].location.lat,
  //           longitude: res.data[i].location.lng
  //         });
  //       }
  //       _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
  //         suggestion: sug
  //       });
  //     },
  //     fail: function (error) {
  //       console.error(error);
  //     },
  //     complete: function (res) {
  //       console.log(res);
  //     }
  //   });
  //}
})