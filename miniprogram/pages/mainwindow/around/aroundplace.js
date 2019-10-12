var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    textData: {},
    location: {
      latitude: "",
      longitude: "",
    }
  },


  onLoad: function (options) {
    var that = this;
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'I4QBZ-YZQ6O-WKMWW-SJFAR-23GZJ-C3BCU'
    });

    that.setData({
      location: {
        latitude: options.latitude,
        longitude: options.longitude
      }
    })
  },
})