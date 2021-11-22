getApp();

Page({
    data: {
        userInfo: {},
        mode: [ "联系客服", "意见反馈" ]
    },
    createCollections(){
        wx.showLoading({
          title: '初始化中',
        });
        const db = wx.cloud.database();
        let collections = ['myCost','myCostNew','myFilm','myFormList','myPeriod','mySleepClock','myType','myWish'];
        let arr = [];
        for(let i = 0; i < collections.length; i++){
            arr.push(
                wx.cloud.callFunction({
                    name: 'dbCreate',
                    data:{
                        db: collections[i],
                    }
                })
            );
        }
        Promise.all(arr)
        .then(res=>{
            wx.hideLoading({});
            wx.showToast({
                title: '初始化成功',
            })
            console.log(res);
        }).catch(err=>{
            wx.hideLoading({});
            wx.showToast({
                title: '初始化失败',
            })
            console.log('err',err);
        });
    },
        // wx.cloud.database();
    onLoad: function() {
        var s = this;
        wx.login({
            success: function() {
                wx.getUserInfo({
                    success: function(e) {
                        s.setData({
                            userInfo: e.userInfo
                        });
                    }
                });
            }
        });
    }
});