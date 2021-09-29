// miniprogram/pages/index/sleepClock/sleepClock.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hour:'',
    minutes:'',
    second:'',
    preTime:'',
    username:app.getUserInfo()
  },
  getPreTime(){
    wx.cloud.callFunction({
      name: "getMyType",
      data: {
          name: "mySleepClock"
      },
      success: res => {
        let preTime = res.result.data[0][this.data.username];
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
          let para = JSON.parse(data);
          app.callFunctiom('dbAdd','mySleepClock','',para).then(res=>{
            console.log('res',res);
            if(res.result == null){
              data = '{\"' + app.getUserInfo() + '\":\"' + app.nowtime() + '\"}';
              para = JSON.parse(data);
              app.callFunctiom('dbSet','mySleepClock',date,para).then(res1=>{     
                wx.showToast({
                  title: '更新打卡',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNowTime();
    this.getPreTime();
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