//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },

/*https://blog.csdn.net/qq_38191191/article/details/80913933
    onLoad: function(){
      wx.request({
        url: 'http://dev.cfo-mentor.com/menter/resources/views/demo/132.php', //服务器地址
        data: {
          name: 'bob'//请求参数
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    }
    */
  onLoad: function () {
    wx.request({
      url: 'http://horiwidgen.com', //服务器地址
      data: {
        name: 'bob'//请求参数
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})