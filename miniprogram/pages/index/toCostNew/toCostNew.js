// miniprogram/pages/index/toCostNew/toCostNew.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    allData:[],
    formList:[],
    cost:{},
    selectdate:'',
    allCost:0
  },
  //调用云函数
  callFunctiom(name,db,_id,data){
    console.log("name,db,_id,data",name,db,_id,data);
    return wx.cloud.callFunction({
      name: name,
      data:{
        db: db,
        _id:_id,
        data: data,
      }
    })
  },
  //刷新页面
  reflesh(){
    this.onLoad();
  },
  //页面跳转
  toUrl: function(e) {
    let url = e.target.dataset.url;
    wx.navigateTo({
      url: url
    });
  },
  //监听输入框
  onChange(e) {
    let value = e.detail.value;
    let prop = e.currentTarget.dataset.prop;
    let id = e.currentTarget.dataset.id; 
    let cost = this.data.cost;
    cost[id][prop] = value;
    cost[id].cost = 0;
    for(let key in cost[id]){
      if(key != 'cost'){
        cost[id].cost = parseFloat(cost[id][key]) + parseFloat(cost[id].cost);
        cost[id].cost = cost[id].cost.toFixed(2);
      }
    }
    console.log(cost)   //data-prop 绑定的字符串，以此来确定改变的是哪个变量
    this.setData({
      cost: cost
    })
    this.calAllCost();
  },

  calAllCost(){
    let allCost = 0,
    cost = this.data.cost;
    for(let key in cost){
      allCost = parseFloat(allCost) + parseFloat(cost[key].cost);
    }
    this.setData({
      allCost: allCost.toFixed(2)
    })
  },

  //获取选择日期的数据
  getCostData(selectdate){
    wx.showLoading({
      title: '获取数据中……',
    })
    console.log('selectdate',selectdate);
    let _this = this;
    this.callFunctiom('dbGet','myCostNew',selectdate,{}).then(res=>{
      console.log('1111111887',res);
      let result = res.result;
      if(result != null){
        _this.setData({
          cost:result.data.cost
        })
      }else{
        _this.formatFormCost(this.data.allData);
      }
    }).catch(err=>{
      this.formatFormCost(this.data.allData);
    }).finally(p=>{
      this.calAllCost();
      wx.hideLoading()
    })
    this.setData({
        selectdate: selectdate
    });
  },
  //日期选中回调
  select: function(e) {
    let selectdate = e.detail;
    this.getCostData(selectdate);
},
  //保存改变数据
  saveCost(){
    let cost = this.data.cost;
    let nowtime = app.nowtime();
    let para = {};
    para._id = this.data.selectdate;
    para.cost = cost;
    let para1 = {};
    para1.cost = cost;
    // console.log(para._id,para1);
    wx.showLoading({
      title: '正在保存……',
    })
    //云函数调用
    this.callFunctiom('dbAdd','myCostNew',para._id,para).then(res=>{
      // console.log("success",res);
      //调用成功
      if(res.result == null){
        this.callFunctiom('dbSet','myCostNew',para._id,para1).then(res=>{
          // console.log('1111111',res);
        })
      }
    }).catch(err => {
      console.log('failAdd',err)
      this.callFunctiom('dbSet','myCostNew',para._id,para1).then(res=>{
        // console.log('1111111',res);
      })
    }).finally(p=>{
      wx.hideLoading()
    })
  },

  //折叠面板
  showContent(e){
    let index = e.currentTarget.dataset.index;
    console.log(index);
    let delBtnList = this.data.delBtnList;
    delBtnList[index] = !delBtnList[index];
    this.setData({
      delBtnList:delBtnList
    })
    console.log(delBtnList)
  },
  //获取用户信息
  getUserInfo(){
    var a = this;
    wx.getStorage({
      key: "username",
      success: function(t) {
          console.log(t.data), a.setData({
              username: t.data
          });
      }
    })
  },
  //格式化消费信息
  formatFormCost(data){
    let exception = ["_openid","username","_id","detail"];
    let cost = {};
    for(let i = 0; i < data.length; i++){
      let costTemp = {};
      costTemp.cost = 0;
      for(let key in data[i]){
        let flag = false;
        for(let j = 0; j < exception.length; j++){
          if(key == exception[j]){
            flag = true;
            break;
          }
        }
        if(!flag){
          costTemp[key] = 0;
        }
      }
      cost[data[i]._id] = costTemp;
    }
    // console.log(cost);
    this.setData({
      cost:cost
    })
  },
  formatFormList(data){
    let delBtnList = [];
    let exception = ["_openid","username","_id","detail"];
    let newData = [];
    let cost = {};
    for(let i = 0; i < data.length; i++){
      delBtnList.push(false);
      let costTemp = {};
      costTemp.cost = 0;
      let list = [],temp = {};
      for(let key in data[i]){
        let flag = false;
        for(let j = 0; j < exception.length; j++){
          if(key == exception[j]){
            flag = true;
            break;
          }
        }
        if(flag){
          temp[key] = data[i][key];
        }else{
          list.push(key);
          costTemp[key] = 0;
        }
      }
      // console.log('costTemp',costTemp,data[i]._id)
      cost[data[i]._id] = costTemp;
      temp.list = list;
      newData.push(temp);
    }

    console.log(newData,cost);
    this.setData({
      formList:newData,
      delBtnList:delBtnList,
      // cost:cost
    })
  },

  getFormList(){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: "getMyType",
      data: {
          name: "myFormList"
      },
      success: res => {
        // console.log('getFormList',res.result.data);
        this.setData({
          allData:res.result.data
        });
        this.formatFormList(res.result.data);
        wx.hideLoading();
      },
      fail:err=>{
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
    this.getFormList();
    let nowtime = app.nowtime();
    nowtime = nowtime.substring(0,10);
    this.getCostData(nowtime);
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