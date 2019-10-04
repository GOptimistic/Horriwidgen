const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

// 计算日期
// today 初始日期
// null 即默认当天日期
// addDayCount 往后几天  -1即昨天 0即当天 1即明天 
function getDateStr(today, addDayCount) {
  var dd;
  if (today) {
    dd = new Date(today);
  } else {
    dd = new Date();
  }
  dd.setDate(dd.getDate() + addDayCount); //获取AddDayCount天后的日期 
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1; //获取当前月份的日期 
  var d = dd.getDate();
  if (m < 10) {
    m = '0' + m;
  };
  if (d < 10) {
    d = '0' + d;
  };
  return y + "-" + m + "-" + d;
}

// 所有的api路径
const api = {
  // API基础Path
  base: 'https://api.it120.cc/fstzk/',
  // banner图
  banner: "https://api.it120.cc/fstzk/banner/list",
  //产品列表
  productList: "https://api.it120.cc/fstzk/shop/goods/list",
  // 产品详情
  detail: "https://api.it120.cc/fstzk/shop/goods/detail",
  // 登录
  login: "https://api.it120.cc/fstzk/user/m/login",
  // 注册
  register: "https://api.it120.cc/fstzk/user/m/register",
  // 评论
  comment: "https://api.it120.cc/fstzk/comment/list",
  // 所有优惠卷
  coupons: "https://api.it120.cc/fstzk/discounts/coupons",
  // 领取优惠卷
  getcoupons: "https://api.it120.cc/fstzk/discounts/fetch",
  // 我的优惠卷
  mydiscounts: "https://api.it120.cc/fstzk/discounts/my",
};
// 获取数据
function getData(url, data) {
  wx.request({
    url: api.base + url,
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function(res) {
      console.log(res.data.data);
    },
    fail: function(err) {
      consoe.log(err)
    },
    complete: function() {

    }
  })
};
// 获得banner图
function getBanner(data, that) {
  wx.request({
    url: api.banner,
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function(res) {
      // console.log(res.data.data);
      that.setData({
        imgUrls: res.data.data,
      })
    },
    fail: function(err) {
      consoe.log(err)
    },
    complete: function() {

    }
  })
};
// 产品列表
function getProductList(data, that) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: api.productList,
    data: data,
    header: {
      "content-type": "application/json",
    },
    success: function(res) {
      // 判断是否有更多数据
      if (res.data.data.length < that.data.pageSize) {
        that.setData({
          more: false,
        })
      }
      let productList = that.data.productList.concat(res.data.data);
      that.setData({
        productList: productList,
      })
      wx.hideLoading();
    },
    fail: function(err) {
      console.log(err)
    }
  })
};
// 产品详情
function getProductDetail(data, that) {
  wx.request({
    url: api.detail,
    data: data,
    header: {
      "content-type": "applicatopm/json",
    },
    success: function(res) {
      console.log(res.data.data.basicInfo);
      let basicInfo = that.data.basicInfo;
      basicInfo.push(res.data.data.basicInfo);
      that.setData({
        basicInfo: basicInfo
      })
    },
    fail: function(err) {
      console.log(err);
    }
  })
};
// 登录事件
function login(data, that) {
  wx.request({
    url: api.login,
    data: data,
    header: {
      "content-type": "applicatopm/json",
    },
    success: function(res) {
      console.log(res);
      if (res.data.code == 0) {
        wx.showModal({
          title: '提示',
          content: '登录成功',
        })
        that.setData({
          islogin: true
        })
        wx.setStorageSync("token", res.data.data.token);
        wx.setStorageSync("islogin", true);
      }
    },
    fail: function(err) {
      console.log(err);
    }
  })
};
// 注册事件
function register(data, that) {
  wx.request({
    url: api.register,
    data: data,
    header: {
      "content-type": "applicatopm/json",
    },
    success: function(res) {
      if (res.code = 10000) {
        wx.showModal({
          title: '提示',
          content: '用户已注册',
          success: function(res) {
            if (res.confirm) {
              that.setData({
                login: true
              })
            }
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '注册成功',
          success: function(res) {
            if (res.confirm) {
              that.setData({
                login: true
              })
            }
          }
        })
      }
    },
    fail: function(err) {
      console.log(err);
    }
  })
};
// 获取评论
function getcomment(data, that) {
  wx.request({
    url: api.comment,
    data: data,
    header: {
      "content-type": "application/json"
    },
    success: function(res) {
      if (res.data.data.length < that.data.pageSize) {
        that.setData({
          more: false
        })
      } else {
        that.setData({
          more: true
        })
      }
      let comment = that.data.comment;
      comment = comment.concat(res.data.data);
      that.setData({
        comment: comment
      })
    },
    fail: function(err) {
      console.log(err)
    }
  })
};

function mydiscountsfun(data, that) {
  wx.request({
    url: api.mydiscounts,
    data: data,
    header: {
      "content-typu": "application/json"
    },
    success: function(res) {
      console.log(res.data.data);
      that.setData({
        coupon: res.data.data
      })
    },
    fail: function(err) {
      console.log(err);
    }
  })
}

module.exports = {
  formatTime,
  showBusy,
  showSuccess,
  showModel,
  getDateStr,
  getData,
  getBanner,
  getProductList,
  getProductDetail,
  login,
  register,
  getcomment,
  mydiscountsfun,
}