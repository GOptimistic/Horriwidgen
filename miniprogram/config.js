/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://123456.qcloud.la';

var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`
  },

/*https://www.cnblogs.com/cain-z/p/9302170.html
  port: "3306",
  rootPathname: '',

  //appId
  appId: 'wx50acaa0ce009206d',

  //app secret

  //是否使用腾讯云代理登录小程序
  useQcloudLogin: true,

  mysql: {
    host: "localhost",
    port: "3306",
    user: "root",
    db: "hotel",
    pass: "wx50acaa0ce009206d",
    char: "utf8mb4"
  },

  // cos:{
  //   region:'ap-beijing',
  //   fileBucket:'qcloudtest',
  //   uploadFolder:''
  // }

  */
};

module.exports = config;