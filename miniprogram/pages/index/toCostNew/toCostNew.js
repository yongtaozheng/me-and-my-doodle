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
    allCost:0,
    chooseTabbar:'0',
    allCostList:{},
    bearCostList:{},
    peachCostList:{},
    tabbar:[
      {
        id:1,
        name:'熊先生',
        icon:'cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/熊熊.png'
      },
      {
        id:2,
        name:'桃小姐',
        icon:'cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/桃子.png'
      },{
        id:3,
        name:'嘟嘟',
        icon:'cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/情侣.png'
      }
    ]
  },
  //调用云函数
  callFunctiom(name,db,_id,data){
    // console.log("name,db,_id,data",name,db,_id,data);
    return wx.cloud.callFunction({
      name: name,
      data:{
        db: db,
        _id:_id,
        data: data,
      }
    })
  },
  tabClick(e){
    let id = e.target.dataset.id;
    // console.log(e);
      this.setData({
        chooseTabbar:id
      })
    if(id == 1){
      this.setData({
        cost:this.data.bearCostList,
      })
    }else if(id == 2){
      this.setData({
        cost:this.data.peachCostList,
      })
    }else{
      this.calAllCostList();
      this.setData({
        cost:this.data.allCostList,
      })
    }
    this.calAllCost();
  },
  //刷新页面
  reflesh(){
    this.onLoad();
  },
  //wxShowToast
  wxShowToast(title='成功',icon='success',duration='1000'){
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration
    })
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
        cost[id].cost = parseFloat(cost[id].cost) + (parseFloat(cost[id][key]) || 0);
        if(cost[id].cost != 0) cost[id].cost = cost[id].cost.toFixed(2);
      }
    }
    // console.log(cost)   //data-prop 绑定的字符串，以此来确定改变的是哪个变量
    this.setData({
      cost: cost
    })
    this.calAllCost();
  },
  bindblur(e){
    let value = e.detail.value;
    let prop = e.currentTarget.dataset.prop;
    let id = e.currentTarget.dataset.id; 
    let cost = this.data.cost;
    // console.log('bindblur',value);
    if(isNaN(value) || (value == '')){
      cost[id][prop] = 0;
      this.setData({
        cost: cost
      })
    }
    this.calAllCost();
  },

  calAllCost(){
    // console.log('calAllCost');
    let allCost = 0,
    cost = this.data.cost;
    for(let key in cost){
      allCost = parseFloat(allCost) + (parseFloat(cost[key].cost) || 0);
    }
    if(allCost != 0) allCost = allCost.toFixed(2);
    this.setData({
      allCost: allCost
    })
  },

  calAllCostList(){
    // console.log('calAllCostList');
    let allCostList = this.data.allCostList;
    let bear = this.data.bearCostList;
    let peach = this.data.peachCostList;
    for(let key in allCostList){
      for(let key1 in allCostList[key]){
        allCostList[key][key1] = parseFloat(bear[key][key1]) + parseFloat(peach[key][key1]);
        allCostList[key][key1] = allCostList[key][key1].toFixed(2);
      }
    }
    this.setData({
      allCostList:allCostList
    })
    if(this.data.chooseTabbar == 3){
      this.setData({
        cost: allCostList
      })
      this.calAllCost();
    }
  },

  //获取选择日期的数据
  getCostData(selectdate){
    wx.showLoading({
      title: '获取数据中……',
    })
    let _this = this;
    this.callFunctiom('dbGet','myCostNew',selectdate,{}).then(res=>{
      // console.log('getCostData',res);
      let result = res.result;
      if(result != null){
        _this.formatFormCost(this.data.allData,result.data.cost||{},3);
        _this.formatFormCost(this.data.allData,result.data.bearCost||{},1);
        _this.formatFormCost(this.data.allData,result.data.peachCost||{},2);
      }else{
        _this.formatFormCost(this.data.allData,{},1);
        _this.formatFormCost(this.data.allData,{},2);
        _this.formatFormCost(this.data.allData,{},3);
      }
    }).catch(err=>{
      console.log('err',err);
      this.formatFormCost(this.data.allData,{},3);
      _this.formatFormCost(this.data.allData,{},2);
      _this.formatFormCost(this.data.allData,{},3);
    }).finally(p=>{
      this.calAllCost();
      setTimeout(() => {
        wx.hideLoading();
        this.calAllCostList();
      }, 200);
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
    let para1 = {};
    para.bearCost = this.data.bearCostList;
    para.peachCost = this.data.peachCostList;
    para.allCostList = this.data.allCostList;
    para1.bearCost = this.data.bearCostList;
    para1.peachCost = this.data.peachCostList;
    para1.allCostList = this.data.allCostList;
    para._id = this.data.selectdate;
    wx.showLoading({
      title: '正在保存……',
    })
    //云函数调用
    this.callFunctiom('dbAdd','myCostNew',para._id,para).then(res=>{
      //调用成功
      if(res.result == null){
        this.callFunctiom('dbSet','myCostNew',para._id,para1).then(res=>{
          // this.wxShowToast('已保存','success','1000');
        }).catch(err1=>{
          console.log("err1",err1);
          // this.wxShowToast('保存失败','error','1000');
        })
      }else{
        // this.wxShowToast('已保存','success','1000');
      }
    }).catch(err => {
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
    let delBtnList = this.data.delBtnList;
    delBtnList[index] = !delBtnList[index];
    this.setData({
      delBtnList:delBtnList
    })
  },
  //获取用户信息
  getUserInfo(){
    var a = this;
    wx.getStorage({
      key: "username",
      success: function(t) {
          a.setData({
              username: t.data,
              chooseTabbar: t.data == '郑勇涛' ? '1' : '2'
          });
      }
    })
  },
  //需要排除的key
  exceptionKey(exception = ["_openid","username","_id","detail"], key){
    for(let j = 0; j < exception.length; j++){
      if(key == exception[j]){
        return true;
      }
    }
    return false;
  },
  //格式化消费信息
  formatFormCost(data,cost,flag){
    //需要排除的key
    let exception = ["_openid","username","_id","detail"];
    for(let i = 0; i < data.length; i++){
      let costTemp = {};
      costTemp.cost = 0;
      //初始化表单为0
      for(let key in data[i]){
        if(!this.exceptionKey(exception,key)){
          costTemp[key] = 0;
        }
      }
      //新增项
      if(cost[data[i]._id] == undefined){
        cost[data[i]._id] = costTemp;
      }else{
        for(let key in costTemp){
          cost[data[i]._id][key] = parseFloat(costTemp[key]) + parseFloat(cost[data[i]._id][key]);
          cost[data[i]._id][key] = cost[data[i]._id][key].toFixed(2);
        }
      }
    }
    if(flag == 1){
      this.setData({
        bearCostList:cost
      })
    }else if(flag == 2){
      this.setData({
        peachCostList:cost
      })
    }else{
      this.setData({
        allCostList:cost
      })
    }
    // console.log("flag=",flag,'chooseTabbar=',this.data.chooseTabbar);
    if(flag == this.data.chooseTabbar){
      this.setData({
        cost:cost
      })
    }
  },
  //格式化列表
  formatFormList(data){
    let delBtnList = [];
    let exception = ["_openid","username","_id","detail"];
    let newData = [];
    for(let i = 0; i < data.length; i++){
      delBtnList.push(false);
      let list = [],temp = {};
      for(let key in data[i]){
        if(this.exceptionKey(exception,key)){
          temp[key] = data[i][key];
        }else{
          list.push(key);
        }
      }
      temp.list = list;
      newData.push(temp);
    }
    this.setData({
      formList:newData,
      delBtnList:delBtnList
    })
        wx.hideLoading();
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
        this.setData({
          allData:res.result.data
        });
        this.formatFormList(res.result.data);
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
    // this.getCostData(nowtime);
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