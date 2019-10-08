//用于识别用户
var app = getApp();
Page({
  data: {
    base64: "",
    token: "",
    msg: "",
    src: "",//图片的链接
  },
  onLoad: function (options) {
    this.setData({
      msg:options.page
    })
    console.log(this.data.msg);
  },

  //拍照并编码
  takePhoto() {
    //拍照
    var that = this;
    //拍照
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'low',
      success: (res) => {
        this.setData({
          src: res.tempImagePath//获取图片
        })
        
        //图片base64编码
        wx.getFileSystemManager().readFile({
          filePath: this.data.src, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            this.setData({
              base64: res.data
            });
          }
        })
      }//拍照成功结束

    })//调用相机结束

    //acess_token获取
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token', //真实的接口地址
      data: {
        grant_type: 'client_credentials',
        client_id: 'U7I5a6XoS9kz8UYRRWuRnhw4',
        client_secret: 'gB3i28dLSAyAZ8QNwGGxvapxWFcCmIIk'//用自己的
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        
        that.setData({
          token: res.data.access_token//获取到token
        });
        //console.log(that.data.src);
        //console.log(that.data.base64);
        //console.log(this.data.base64);
        //console.log(that.data.token);
        wx.request({
          url: 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' + that.data.token,
          method: 'POST',
          data: {
            image: that.data.base64,
            image_type: 'BASE64',
            group_id_list: 'horriwidgen'//自己建的用户组id
          },
          header: {
            'Content-Type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data);
            if (res.data.result.user_list[0].score > 90) {
              wx.showToast({
                title: '验证通过',
                icon: 'success',
                duration: 1000
              })
              app.globalData.guestPhone = res.data.result.user_list[0].user_id;
              app.globalData.isChecked = true;
              console.log(that.data.msg=="rooms");
              //验证通过，跳转至UI页面
              if(that.data.msg == "rooms"){
                wx.reLaunch({
                  url: "../mainwindow/rooms/rooms"
                });
              }
              switch (that.data.msg){
                case "rooms":
                  wx.reLaunch({
                    url: "../mainwindow/rooms/rooms"
                  });
                  break;
                case  "orders":
                  wx.reLaunch({
                    url: "../mainwindow/orders/orders"
                  });
                  break;
                case "me":
                  wx.reLaunch({
                    url: "../mainwindow/me/me"
                  });
                  break;
                default:
                  wx.reLaunch({
                    url: "../mainwindow/homepage/homepage"
                  });
              }
              console.log(app.globalData);
            }
          }
        });
      }
    })

    //上传人脸进行 比对
    

    wx.showToast({
      title: '请重试',
      icon: 'loading',
      duration: 500
    });
  },
  error(e) {
    console.log(e.detail)
  }
})