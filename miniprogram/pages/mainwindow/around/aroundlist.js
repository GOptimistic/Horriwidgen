var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
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
        latitude: options.latitude,
        longitude:options.longitude,
      }
    })
    qqmapsdk.reverseGeocoder({
      location:{
        latitude: location.latitude,
        longitude:location.longitude,
      },
      success: function (res) {//成功后的回调
        var res = res.result;
        var mks = [];

        //当get_poi为0时或者为不填默认值时，检索目标位置，按需使用
        mks.push({ // 获取返回结果，放到mks数组中
          title: res.address,
          id: 0,
          latitude: res.location.lat,
          longitude: res.location.lng,
          iconPath: '../../../images/icons/location.png',//图标路径
          width: 20,
          height: 20,
          callout: { //在markers上展示地址名称，根据需求是否需要
            content: res.address,
            color: '#000',
            display: 'ALWAYS'
          }
        });
        that.setData({ //设置markers属性和地图位置poi，将结果在地图展示
          markers: mks,
          textData: {
            name: res.formatted_addresses.recommend,
            desc: res.address
          }

          // poi: {
          //   latitude: res.location.lat,
          //   longitude: res.location.lng
          // }
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
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
      },
      complete: function (res) {
        console.log("完成");
      }
    });
  },
  aroundPlace: function(e) {
    var loc = e.currentTarget.dataset.loc;
    console.log(loc);
    wx.navigateTo({
      url: './aroundplace?latitude=' + loc.lat + '&longitude=' + loc.lng,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})