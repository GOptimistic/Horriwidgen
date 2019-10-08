// var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
// var qqmapsdk;
// var startlat;
// var startlng;

// Page({
//   data: {
//     height: "400",
//     perimeter: []
//   },
//   onLoad: function (options) {
//     var address = options.address;
//     // 实例化API核心类
//     qqmapsdk = new QQMapWX({
//       key: 'I4QBZ-YZQ6O-WKMWW-SJFAR-23GZJ-C3BCU'
//     });
//     this.addressGeocoder(address);
//   },
//   search: function (e) {
//     var _this = this;
//     var a = e.target.dataset.type;
//     //console.log("a="+a);
//     _this.nearby_search(a);
//   },
//   //根据地址转为经纬度
//   addressGeocoder: function (address) {
//     var _this = this;
//     qqmapsdk.geocoder({
//       address: address,
//       success: function (res) {
//         console.log("res=" + res);
//         var res = res.result;
//         var latitude = res.location.lat;
//         var longitude = res.location.lng;
//         //根据地址解析在地图上标记解析地址位置
//         _this.setData({
//           markers: [{
//             id: 0,
//             title: res.title,
//             latitude: latitude,
//             longitude: longitude,
//             iconPath: '../../../images/icons/around.png',
//             width: 20,
//             height: 20
//           }],
//           poi: {
//             latitude: latitude,
//             longitude: longitude
//           },
//           startlat: latitude,
//           startlng: longitude
//         });
//       },
//       fail: function (error) {
//         console.error("error=" + error);
//       },
//       complete: function (res) {
//         console.log("complete=" + res);
//       }
//     })
//   },
//   //周边地点搜索
//   nearby_search: function (keyword) {
//     var _this = this;
//     qqmapsdk.search({
//       keyword: keyword,
//       location: _this.data.poi,
//       success: function (res) {
//         var obj = JSON.stringify(res);
//         console.log("obj=" + obj);
//         var mks = [];
//         for (var i = 0; i < res.data.length; i++) {
//           mks.push({
//             title: res.data[i].location.lat,
//             id: res.data[i].id,
//             latitude: res.data[i].location.lat,
//             longitude: res.data[i].location.lng,
//             iconPath: "../../../images/icons/around.png",
//             width: 20,
//             height: 20,
//             callout: {
//               content: res.data[i].title,
//               color: '#000',
//               display: 'ALWAYS'
//             }
//           })
//         }
//         _this.setData({
//           //markers:mks
//           markers: mks,
//           perimeter: res.data
//         })
//       },
//       fail: function (res) {
//         console.log("fail=" + res);
//       },
//       complete: function (res) {
//         console.log("complete=" + res);
//       }

//     });
//   },
//   gotoHere: function (res) {
//     var obj = JSON.stringify(res);
//     console.log("gotoHere=" + obj);
//   },
//   onShow: function () {

//   }
// })


//var amapFile = require('../../../utils/amap-wx.js'); 
// Page({
//   data: { 
//     formIdArr: [], 
//     showmark: false, 
//     aroundList: [
//       { 
//         name: '美食', 
//         id: '090100' 
//       }, 
//       { 
//         name: '医生', 
//         id: '090300'
//       }
//       ],
//     markersData: [], 
//     textData: {}, 
//     status: null, 
//     latitude: null, 
//     longitude: null, 
//     markers: [], 
//     points: [], 
//     location: '', 
//     name: '', 
//     address: '', 
//   }, 
//   onLoad: function () {
//     var _this = this;
//     _this.setData({ 
//       showmark: false, 
//       }
//     );      
//     //小程序获取当前位置api,下面的图片路径请自行按照个人文件路径添加      
//     wx.getLocation({        
//       type: 'gcj02',        
//       success(data) {           
//         if (data) {            
//           _this.setData({              
//             latitude: data.latitude,              
//             longitude: data.longitude,              
//             markers: [{                
//               id: 0,                
//               latitude: data.latitude,                
//               longitude: data.longitude,                
//               iconPath: '../../../images/icons/location.png',
//               width: 32,                
//               height: 32              
//             }]            
//           });          
//         }       
//       }     
//     });     
//   },    
//   makertap: function (e) {      
//     var id = e.markerId;     
//     var that = this;      
//     that.showMarkerInfo(that.data.markersData, id);    
//   },    
//   showMarkerInfo: function (data, i) {      
//     var that = this;      
//     that.setData({        
//       showmark: true      
//     }      
//   );      
//   that.setData({        
//     textData: {          
//       name: data[i].name,          
//       desc: data[i].address        
//     }      
//   });          
// },    
// getType(e) {
//   //获取选择的附近关键词，同时更新状态           
//   this.setData({         
//     status: e.currentTarget.dataset.type,        
//     showmark: false         
//   });      
//   this.getAround(e.currentTarget.dataset.keywords, e.currentTarget.dataset.type);    
// },       
// getAround(keywords, types) {
//   //通过关键词获取附近的点，只取前十个，同时保证十个点在地图中显示      
//   var _this = this;      
//   var myAmap = new amap.AMapWX({
//     key: '772c0218b25ab3e814ae50ccd24d8978' });   
//     myAmap.getPoiAround({        
//     iconPath: '../../../images/icons/location.png',        
//     iconPathSelected: '../../../images/icons/location.png',        
//     querykeywords: keywords,        
//     querytypes: types,        
//     location: _this.data.location,        
//     success(data) {          
//       if (data.markers) {            
//         _this.setData({              
//           markersData: data.markers            
//         })                       
//         var markers = [], points = [];            
//         for (var value of data.markers) {                            
//           if (value.id == 0) {                
//             _this.setData({                  
//               name: value.name,                  
//               address: value.address,                
//             })              
//           }              
//         markers.push({                
//           id: value.id,                
//           latitude: value.latitude,                
//           longitude: value.longitude,                
//           title: value.name,                
//           iconPath: value.iconPath,                
//           width: 25,                
//           height: 25,                
//           anchor: { x: .5, y: 1 },              
//         });              
//         points.push({                
//           latitude: value.latitude,                
//           longitude: value.longitude              
//         })            
//       }            
//       _this.setData({             
//         markers: markers,              
//         points: points            
//       })          
//     }        
//   }, 
//   fail: function (info) {          
//     wx.showToast({ title: info })        
//   }      
// })    
// },
// })
// 引入SDK核心类
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data:{
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
        var latitude = res.latitude        
        var longitude = res.longitude             
        that.setData({ 
          longitude: longitude, 
          latitude: latitude, 
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
    // 调用接口
    var that = this;
    qqmapsdk.search({
      keyword: '酒店',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
    qqmapsdk.reverseGeocoder({
      success: function(res) {//成功后的回调
        console.log(res);
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
          //markers: mks,
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
})

