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
    selectdate:''
  },
  toUrl: function(e) {
    let url = e.target.dataset.url;
    wx.navigateTo({
      url: url
  });
  },
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
  },

  saveCost(){

  },

  select: function(e) {
    let _this = this;
    let selectdate = e.detail;
    wx.cloud.database().collection('myCostNew').doc(selectdate).get({
      success: res=> {
        console.log(res.data)
        _this.setData({
          cost:res.data.cost
        })
      },
      fail:err=>{
        _this.formatFormCost(this.data.allData);
      }
    })
    this.setData({
        selectdate: selectdate
    });
},

saveCost(){
  let cost = this.data.cost;
  let nowtime = app.nowtime();
  let para = {};
  para._id = this.data.selectdate;
  para.cost = cost;
  wx.cloud.database().collection("myCostNew").add({
    data:para,
    success: res=>{
      // console.log(res)
    },
    fail:err=>{
      let para1 = {};
      para1.cost = cost;
      console.log(para._id,para1);
      wx.cloud.database().collection('myCostNew').doc(para._id).set({
        data:para1,
        success: res1=>{
          // console.log(res1)
        },
        fail:err1=>{
          console.log(err1)
        }
      })
    }
  })
},

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
    console.log(cost);
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