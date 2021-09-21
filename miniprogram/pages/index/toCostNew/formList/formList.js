// miniprogram/pages/index/toCostNew/formList/formList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput:true,
    hiddenmodalput1:true,
    theme:'',
    mark:'',
    tip:'添加表单',
    username:'',
    formList:'',
    delBtnList:[],
    delBtnShow:false,
    item:'',
    addItemId:'',
    addItemIndex:''
  },
  showDelFormItem(){
    this.setData({
      delBtnShow:!this.data.delBtnShow
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
  deleteItem(e){
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let _this = this;
    wx.showModal({
      title: '删除',
      content: '确定删除\"'+ id +'\"',
      success (res) {
        if (res.confirm) {
          const db = wx.cloud.database()
          const _ = db.command
          db.collection('myFormList').doc(id).remove({
              success:res=>{
                let delBtnList = _this.data.delBtnList;
                let formList = _this.data.formList;
                delBtnList.splice(index,1);
                formList.splice(index,1);
                _this.setData({
                  delBtnList:delBtnList,
                  formList:formList
                })
              },
              fail:console.error
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //添加表单弹窗
  showAddFormItem(){
    this.setData({
      hiddenmodalput:false
    })
  },
  //添加项目弹窗
  showAddFormItemItem(e){
    // console.log(e);
    this.setData({
      addItemId:e.currentTarget.dataset.id,
      addItemIndex:e.currentTarget.dataset.index
    })
    this.setData({
      hiddenmodalput1:false
    })
  },

  removeItem(e){
    const _this = this;
    let addItemId = e.currentTarget.dataset.id,
        addItemIndex = e.currentTarget.dataset.index,
        item = e.currentTarget.dataset.item;
    // console.log(this.data.allData,addItemId,addItemIndex,addItemIndex2);
    let para = this.data.allData[addItemIndex];
    delete para[item];
    delete para._openid;
    delete para._id;
    console.log(para);
    wx.showModal({
      title: '移除项目',
      content: '确定移除'+ item +'',
      success (res) {
        if (res.confirm) {
          const db = wx.cloud.database()
          const _ = db.command
          db.collection('myFormList').doc(addItemId).set({
              data:para
          }).then(res=>{
            _this.getFormList();
          })
          .catch(console.error)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //取消表单弹窗
  cancelAddFormItem(){
    this.setData({
      hiddenmodalput:true
    })
  },

  //取消项目弹窗
  cancelAddFormItemItem(e){
    this.setData({
      hiddenmodalput1:true
    })
  },
  //添加表单
  confirmAddFormItem(e){
    let _this = this;
    wx.cloud.database().collection("myFormList").add({
      data: {
        _id:this.data.theme,
        // typename: this.data.theme,
        detail: this.data.mark,
        username: this.data.username
      },
      success: function(a) {
          wx.showModal({
              title: "添加表单",
              content: "已成功添加到表单列表中",
              showCancel: !1
          });
          _this.setData({
            hiddenmodalput:true
          });
          _this.getFormList();
      },
      fail: console.error
    });
  },
  //添加项目
  confirmAddFormItemItem(e){
    let _this = this;
    let item = this.data.item;
    let addItemId = this.data.addItemId;
    let addItemIndex = this.data.addItemIndex;
    let para = {};
    para[item] = item;
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('myFormList').doc(addItemId).update({
        data:para
    }).then(res=>{
      _this.getFormList();
    })
    .catch(console.error)
    this.setData({
      hiddenmodalput1:true
    })
  },
  
  inputItem: function(t) {
    this.setData({
      item: t.detail.value
    });
  },

  inputTheme: function(t) {
    this.setData({
        theme: t.detail.value
    });
  },

  inputMark: function(t) {
    this.setData({
        mark: t.detail.value
    });
  },

  formatFormList(data){
    let delBtnList = [];
    let exception = ["_openid","username","_id","detail"];
    let newData = [];
    for(let i = 0; i < data.length; i++){
      delBtnList.push(false);
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
        }
      }
      temp.list = list;
      newData.push(temp);
    }
    console.log(newData);
    this.setData({
      formList:newData,
      delBtnList:delBtnList
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
        console.log('getFormList',res.result.data);
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