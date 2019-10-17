// 引入SDK核心类
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data:{
    latitude:"",
    longitude:"",
    textData: {},
  },
   

  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'I4QBZ-YZQ6O-WKMWW-SJFAR-23GZJ-C3BCU'
    });
    var that = this
    wx.showLoading({
      title: "定位中",
      mask: true
    })
    wx.getLocation({
      type: 'gcj02',
      altitude: true,//高精度定位
      //定位成功，更新定位结果
      success: function (res) {              
        that.setData({ 
          longitude: res.longitude, 
          latitude: res.latitude, 
        }) 
      },
      //定位失败回调      
      fail:function(){        
        wx.showToast({          
          title:"定位失败",          
          icon:"none"        
        })      
      },       
      complete:function(){        
        //隐藏定位中信息进度        
        wx.hideLoading()     
      }     
    })  
  },
  onShow: function () {
    var that=this;
    qqmapsdk.reverseGeocoder({
      success: function(res) {//成功后的回调
        var res = res.result;
        var mks = [];

        //当get_poi为0时或者为不填默认值时，检索目标位置，按需使用
        mks.push({ // 获取返回结果，放到mks数组中
          title: res.address,
          id: 0,
          latitude: res.location.lat,
          longitude: res.location.lng,
          iconPath: '../../../images/icons/location.png',//图标路径
          width: 40,
          height: 40,
          // callout: { //在markers上展示地址名称，根据需求是否需要
          //   content: res.address,
          //   color: '#000',
          //   display: 'ALWAYS'
          // }
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
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    })
  },
  toAroundlist:function(){
    var that = this;
    
    wx.navigateTo({
      url: './aroundlist?latitude=' + that.data.latitude + '&longitude=' + that.data.longitude,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})

