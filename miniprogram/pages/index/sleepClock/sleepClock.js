// miniprogram/pages/index/sleepClock/sleepClock.js
const app = getApp();
var wxcharts = require('../../common/wxcharts.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hour:'',
    minutes:'',
    second:'',
    preTime:'',
    selectInd:0,
    tabinf:[
      {
        id:0,
        img:'cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/睡觉1.png',
        img1:'cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/睡觉.png',
        title:'打卡'
      },
      {
        id:1,
        img:'cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/统计1.png',
        img1:'cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/统计.png',
        title:'统计'
      }
    ],
    username:app.getUserInfo(),
    bear:[],
    peach:[],
    allClock:[],
    categories:[],
    series:[]
  },
  getPreTime(){
    wx.cloud.callFunction({
      name: "getMyType",
      data: {
          name: "mySleepClock",
          order:'_id'
      },
      success: res => {
        console.log(res);
        let d = res.result.data,preTime = '';
        for(let i = 0; i < d.length; i++){
          if(d[i][this.data.username]){
            preTime = d[0][this.data.username];
            break;
          }
        }
        this.setData({
          preTime:preTime
        })
      },
      fail: err => {
        console.log('err',err);
      }
    })
  },
  getNowTime(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    // console.log(this.addZero(hour) + ':' + this.addZero(minutes) + ':' + this.addZero(second));
    this.setData({
      hour:this.addZero(hour),
      minutes:this.addZero(minutes),
      second:this.addZero(second)
    })
    this.refleshTime(hour,minutes,second);
  },
  refleshTime(hour,minutes,second){
    second = parseInt(second) + 1;
    if(second >= 60){
      second -= 60;
      minutes = parseInt(minutes) + 1;
      if(minutes >= 60){
        minutes -= 60;
        hour = parseInt(hour) + 1;
        if(hour == 24) hour = 0;
      }
    }
    this.setData({
      hour:this.addZero(hour),
      minutes:this.addZero(minutes),
      second:this.addZero(second)
    })
    setTimeout(() => {
      this.refleshTime(hour,minutes,second);
    }, 1000);
  },
  addZero(str){
    if(str < 10){
      str = '0' + str;
    }
    return str;
  },
  judgeDay(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    let res = '';
    if(hour > 20){
      res = year + '-' + this.addZero(month) + '-' + this.addZero(day);
      // res += this.addZero(hour) + ':' + this.addZero(minutes) + ':' + this.addZero(second);
      return res;
    }
    if(hour < 6){
      res = year + '-' + this.addZero(month) + '-' + this.addZero(day);
      res = app.getYesterday(res);
      // res += ' ' + this.addZero(hour) + ':' + this.addZero(minutes) + ':' + this.addZero(second);
      return res;
    }
    return false;
  },
  clock(){
    const _this = this;
    let date = this.judgeDay();
    if(this.judgeDay() == false){
      wx.showToast({
        title: '当前不是打卡时间',
      })
      return;
    }
    let data = '{\"_id\":\"' + date + '\",\"' + app.getUserInfo() + '\":\"' + app.nowtime() + '\"}';
    wx.showModal({
      title: '打卡',
      content: '确定打卡吗？',
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在打卡……',
          })
          let para = JSON.parse(data);
          app.callFunctiom('dbAdd','mySleepClock','',para).then(res=>{
            console.log('res',res);
            if(res.result == null){
              data = '{\"' + app.getUserInfo() + '\":\"' + app.nowtime() + '\"}';
              para = JSON.parse(data);
              app.callFunctiom('dbUpdate','mySleepClock',date,para).then(res1=>{     
                wx.showToast({
                  title: '打卡成功',
                })
                _this.setData({
                  preTime:app.nowtime()
                })
              }).catch(err1 => {
                wx.showToast({
                  title: '打卡失败',
                  icon: 'none'
                })
                console.log('err',err1);
              })
            }else{
              wx.showToast({
                title: '打卡成功',
              })
              _this.setData({
                preTime:app.nowtime()
              })
            }
          }).catch(err=>{
            wx.showToast({
              title: '打卡失败',
              icon: 'none'
            })
            console.log('err',err);
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  changeTabs(e){
    const ind = e.detail.ind;
    this.setData({
      selectInd:ind
    })
    if(ind == 1){
      this.drawImg(this.data.series,this.data.categories);
    }
    console.log(e);
  },
  lineCharts: function(series, canvasId, categories, title) {
    var i = 320;
    try {
        i = wx.getSystemInfoSync().windowWidth;
    } catch (e) {
        console.error("getSystemInfoSync failed!");
    }
    new wxcharts({
        canvasId: canvasId,
        type: "line",
        categories: categories,
        series: series,
        yAxis: {
            title: title,
            format: function(e) {
                return e.toFixed(2);
            },
            min: 0,
            max: 24
        },
        width: i,
        height: 300
    });
},
drawImg(series,categories){
  let canvasId = 'lineCanvas',title="打卡时间";
  console.log(series,categories);
  // let series = [{
  //   name: '成交量',
  //   data:['111','123','432'],
  //   color: "#2E3E5B"
  // }];
  // let categories = ['篮球','羽毛球','乒乓球'];
  this.lineCharts(series, canvasId, categories, title)
},
formatClock(data){
  let bear = [],peach = [],date = [];
  for(let i = 0; i < data.length && i < 7; i++){
    let a = '',b = '';
    if(data[i]['郑勇涛']){
      a = data[i]['郑勇涛'].split(' ')[1].split(':');
    }
    if(data[i]['李嘉丽']){
      b = data[i]['李嘉丽'].split(' ')[1].split(':');
    }
    date.push(data[i]['_id']);
    a ? bear.push((parseInt(a[0]) + (parseInt(a[1]) / 60) + (parseInt(a[2]) / 3600)).toFixed(2)) : '';
    b ? peach.push((parseInt(b[0]) + (parseInt(b[1]) / 60) + (parseInt(b[2]) / 3600)).toFixed(2)) : '';
  }
  let series = [{
    name: '熊先生',
    data:bear,
    color: "#2E3E5B"
  },{
    name: '桃小姐',
    data:peach,
    color: "pink"
  }];
  // console.log(series,date);
  // this.drawImg(series,date);
  this.setData({
    series:series,
    categories:date
  })
},
getAllClock(){
  wx.cloud.callFunction({
    name: "getMyType",
    data: {
        name: "mySleepClock",
        order:'_id',
        orderRule:'asc'
    },
    success: res => {
      console.log(res);
      let d = res.result.data,preTime = '';
      for(let i = 0; i < d.length; i++){
        if(d[i][this.data.username]){
          preTime = d[0][this.data.username];
          break;
        }
      }
      this.setData({
        preTime:preTime,
        allClock:res.result.data
      })
      this.formatClock(res.result.data);
    },
    fail: err => {
      console.log('err',err);
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '获取数据中',
    })
    this.getNowTime();
    // this.getPreTime();
    this.getAllClock();
    wx.hideLoading({
      success: (res) => {},
    })
    // console.log('getTomorrow',app.getTomorrow('2021-12-32'));
    // console.log('getToday',app.getToday('yyyy-mm-dd hh:MM:ss'));
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

  }
})