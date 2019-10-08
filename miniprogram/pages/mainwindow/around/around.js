// // client/pages/mainwindow/around/around.js
// const app = getApp()
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     longitude: 116.4965075, 
//     latitude: 40.006103, 
//     speed: 0, 
//     accuracy: 0 
//   },
//   //事件处理函数
//   bindViewTap: function () {
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function () {
//     var that = this
//     wx.showLoading({
//       title: "定位中",
//       mask: true
//     })
//     wx.getLocation({
//       type: 'gcj02',
//       altitude: true,//高精度定位
//       //定位成功，更新定位结果
//       success: function (res) { 
//         var latitude = res.latitude        
//         var longitude = res.longitude        
//         var speed = res.speed        
//         var accuracy = res.accuracy               
        
//         that.setData({ 
//           longitude: longitude, 
//           latitude: latitude, 
//           speed: speed, 
//           accuracy: accuracy 
//         }) 
//       },
//       //定位失败回调      
//       fail:function(){        
//         wx.showToast({          
//           title:"定位失败",          
//           icon:"none"        
//         })      
//       },       
//       complete:function(){        
//         //隐藏定位中信息进度        
//         wx.hideLoading()     
//       }     
//     })  
//    },
   
//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })


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


var amapFile = require('../../../utils/amap-wx.js'); 
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
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {}
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  onLoad: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: '772c0218b25ab3e814ae50ccd24d8978' });
    myAmapFun.getPoiAround({
      iconPathSelected: '../../../images/icons/selectedaround.png', 
      iconPath: '../../../images/icons/aound.png', 
      success: function (data) {
        markersData = data.markers;
        that.setData({
          markers: markersData
        });
        that.setData({
          latitude: markersData[0].latitude
        });
        that.setData({
          longitude: markersData[0].longitude
        });
        that.showMarkerInfo(markersData, 0);
      },
      fail: function (info) {
        wx.showModal({ title: info.errMsg })
      }
    })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../../images/icons/selectedaround.png";
      } else {
        data[j].iconPath = "../../../images/icons/around.png"; 
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }

})
