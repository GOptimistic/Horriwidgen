// pages/date/date.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: new Array,// 住宿时间 
    occupancy: [0, 0],//入住时间下标集合
    leave: [0, 1],//离开时间下标集合
    iDays: 1,//住宿天数
    isorder: false,//判断是否从产品详情页跳转而来，是的话回复订单页面，否则返回上一页
    id: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dateData();
    this.setData({
      isorder: options.isorder,
      id: options.id
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
  dateData: function () {
    let dataAll = [];//总日历数据
    let dataAll2 = [];//总日历数据
    let dataMonth = [];//月日历数据
    let date = new Date;//当前日期
    let year = date.getFullYear();//当前年
    let week = date.getDay();//当天星期几
    let weeks = [];
    let month = date.getMonth() + 1;//当前月份
    let day = date.getDate();//当天
    let daysCount = 60;//一共显示多少天
    let dayscNow = 0;//计数器
    let monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];//月份列表
    let nowMonthList = [];//本年剩余年份
    for (let i = month; i < 13; i++) {
      nowMonthList.push(i);
    }
    let yearList = [year];//年份最大可能
    for (let i = 0; i < daysCount / 365 + 2; i++) {
      yearList.push(year + i + 1);
    }
    let leapYear = function (Year) {//判断是否闰年 
      if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
        return (true);
      } else { return (false); }
    }
    for (let i = 0; i < yearList.length; i++) {//遍历年
      let mList;
      if (yearList[i] == year) {//判断当前年份
        mList = nowMonthList;
      } else {
        mList = monthList;
      }
      for (let j = 0; j < mList.length; j++) {//循环月份
        dataMonth = [];
        let t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let t_days_thisYear = [];
        if (yearList[i] == year) {
          for (let m = 0; m < nowMonthList.length; m++) {
            t_days_thisYear.push(t_days[mList[m] - 1]);
          }
          t_days = t_days_thisYear;
        } else {
          t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }
        for (let k = 0; k < t_days[j]; k++) {//循环每天
          dayscNow++;
          let nowData;
          if (dayscNow < daysCount) {//如果计数器没满
            let days = k + 1;
            if (days < 10) {
              days = "0" + days;
            }
            if (yearList[i] == year && mList[j] == month) {//判断当年当月
              if (k + 1 >= day) {
                nowData = {
                  year: yearList[i],
                  month: mList[j],
                  day: k + 1,
                  date: yearList[i] + "" + mList[j] + days,
                  selected: 0,
                  center: 0,
                  re: yearList[i] + "-" + mList[j] + "-" + days,
                }
                dataMonth.push(nowData);
                if (k + 1 == day) {
                  let date = new Date(yearList[i] + "-" + mList[j] + "-" + (k + 1))
                  let weekss = date.getDay()//获取每个月第一天是周几
                  weeks.push(weekss)
                }
              }
            } else {//其他情况
              nowData = {//组装自己需要的数据
                year: yearList[i],
                month: mList[j],
                day: k + 1,
                date: yearList[i] + "" + mList[j] + days,
                selected: 0,
                re: yearList[i] + "-" + mList[j] + "-" + days,
              }
              dataMonth.push(nowData);
              if (k == 0) {
                let date = new Date(yearList[i] + "-" + mList[j] + "-" + k + 1);
                let weekss = date.getDay();//获取每个月第一天是周几
                weeks.push(weekss);
              }
            }
          } else {
            break
          }
        }
        dataAll.push(dataMonth);
      }
    }
    for (let i = 0; i < dataAll.length; i++) {
      if (dataAll[i].length != 0) {
        dataAll2.push(dataAll[i]);
      }
    }
    this.setData({
      date: dataAll2,
      dates: dataAll2,
      weeks: weeks
    })
    this.cachefun();
  },
  // 查看是否有本地缓存，有则初始化入住及离开时间
  cachefun: function () {
    let value = wx.getStorageSync('times');
    if (value) {
      let selected1 = "date[" + value[0][0] + "][" + value[0][1] + "].selected";
      let selected2 = "date[" + value[1][0] + "][" + value[1][1] + "].selected";
      this.setData({
        occupancy: value[0],
        leave: value[1],
        [selected1]: 1,
        [selected2]: 1,
      })
      this.daycenterfun(value[1], value[0]);
    } else {
      let selected1 = "date[0][0].selected";
      let selected2 = "date[0][1].selected";
      this.setData({
        [selected1]: 1,
        [selected2]: 1,
      })
    }
  },
  // 修改入住时间
  occupancyfun: function (index, indexs) {
    let selected = "date[" + index + "][" + indexs + "].selected";
    let occupancy = [index, indexs];
    this.setData({
      [selected]: 1,
      occupancy: occupancy
    })
  },
  // 修改离开时间
  leavefun: function (index, indexs) {
    let selected = "date[" + index + "][" + indexs + "].selected";
    let leave = [index, indexs];
    let occupancy = this.data.occupancy;
    // 判断入住时间是否早于离开时间
    if (occupancy[0] == leave[0]) {
      if (occupancy[1] > leave[1]) {
        leave = occupancy;
        occupancy = [index, indexs];
      }
    } else {
      if (occupancy[0] > leave[0]) {
        leave = occupancy;
        occupancy = [index, indexs];
      }
    }
    this.setData({
      [selected]: 1,
      occupancy: occupancy,
      leave: leave
    })
    this.daycenterfun(leave, occupancy);
  },
  // 确定时间后，中间的住宿日子背景更换事件
  daycenterfun: function (leave, occupancy) {
    let center = "";
    // 入住时间及离开时间是否为同一月份
    if (leave[0] == occupancy[0]) {
      for (let i = occupancy[1] + 1; i < leave[1]; i++) {
        center = "date[" + leave[0] + "][" + i + "].center";
        this.setData({
          [center]: 1,
        })
      }
    } else {
      // 将入住时间以后的同一月份日期改为入住状态
      for (let i = occupancy[1] + 1; i < this.data.date[occupancy[0]].length; i++) {
        center = "date[" + occupancy[0] + "][" + i + "].center";
        this.setData({
          [center]: 1,
        })
      }
      // 将入住时间以后的同一月份日期改为入住状态
      for (let i = 0; i < leave[1]; i++) {
        center = "date[" + leave[0] + "][" + i + "].center";
        this.setData({
          [center]: 1,
        })
      }
      // 如果中间还有还有其他月份
      if (leave[0] - occupancy[0] > 1) {
        for (let i = occupancy[0] + 1; i < leave[0]; i++) {
          for (let j = 0; j < this.data.date[i].length; j++) {
            center = "date[" + i + "][" + j + "].center";
            this.setData({
              [center]: 1,
            })
          }
        }
      }
    }
    let center1 = "";
    for (let i = occupancy[1] + 1; i < leave[1]; i++) {
      center = "date[" + leave[0] + "][" + i + "].center";
      this.setData({
        [center]: 1,
      })
    }
  },
  // 清除离开时间，重新选择入住时间,并去除中间的日期提示
  reElectionfun: function (index, indexs) {
    let selected1 = "date[" + this.data.occupancy[0] + "][" + this.data.occupancy[1] + "].selected";
    let selected2 = "date[" + this.data.leave[0] + "][" + this.data.leave[1] + "].selected";
    this.setData({
      leave: null,
      date: this.data.dates
    })
    this.occupancyfun(index, indexs);
  },
  // 修改订房及退房日期
  selectday: function (e) {
    let index = e.currentTarget.dataset.index;
    let indexs = e.currentTarget.dataset.indexs;
    // 判断是否已被选择
    if (this.data.date[index][indexs].selected == 0) {
      // 没选择入住时间
      if (this.data.occupancy == null) {
        this.occupancyfun(index, indexs);
      } else {
        // 未选择离开时间
        if (this.data.leave == null) {
          this.leavefun(index, indexs);
        } else {
          // 重新选择入住时间
          this.reElectionfun(index, indexs);
        }
      }
    }
  },
  // 确认选择事件
  submitbtn: function () {
    let occupancy = this.data.occupancy;
    let leave = this.data.leave;
    let date = this.data.date;
    if (occupancy != null && leave != null) {
      let sDate1 = date[occupancy[0]][occupancy[1]].re;
      let sDate2 = date[leave[0]][leave[1]].re;
      this.Computation(sDate1, sDate2);
    } else {
      // 未选择
      wx.showModal({
        title: '提示',
        content: '请选择住宿时间',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    }
  },
  //返回两个日期之间的天数及入住和离开时间
  Computation: function (sDate1, sDate2) {
    // 计算2个日期之间的天数
    //sDate1和sDate2是2008-12-13格式    
    let aDate, oDate1, oDate2, iDays;
    let time = new Array;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);  //转换为12-13-2008格式    
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);   //把相差的毫秒数转换为天数    
    console.log("一共住" + iDays + '天');
    // 入住及离开时间数组及缓存
    time.push(sDate1);
    time.push(sDate2);
    wx.setStorageSync("time", time);
    console.log("住宿时间" + time);
    // 本地缓存入住时间下标
    let times = new Array;
    times.push(this.data.occupancy);
    times.push(this.data.leave);
    wx.setStorageSync("times", times);
    this.setData({
      iDays: iDays,
      time: time
    })
    if (this.isorder) {
      wx.navigateTo({
        url: '/pages/order/order?id=' + this.data.id,
      })
    } else {
      wx.navigateBack({ changed: true });//返回上一页
    }
  },
})