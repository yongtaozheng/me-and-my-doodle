const app = getApp();
Page({
    data: {
        buttonList: [ {
            bimg: app.getImgSrc('消费记录1.png'),
            btap: "toCostNew",
            url:"toCostNew/toCostNew",
            btip: "消费记录"
        },{
            bimg: app.getImgSrc('睡觉.png'),
            btap: "toSleep",
            url:"sleepClock/sleepClock",
            btip: "睡觉打卡"
        },{
            bimg: app.getImgSrc('标签.png'),
            btap: "toType",
            url:"typePage/typePage",
            btip: "查看标签"
        }, {
            bimg: app.getImgSrc('消费.png'),
            btap: "toCost",
            url:"costPage/costPage",
            btip: "查看消费"
        }, {
            bimg: app.getImgSrc('打卡.png'),
            btap: "toDo",
            url:"todoPage/todoPage",
            btip: "打卡清单"
        }, {
            bimg: app.getImgSrc('电影.png'),
            btap: "toFilm",
            url:"filmPage/filmPage",
            btip: "观影清单"
        }, {
            bimg: app.getImgSrc('留言1.png'),
            btap: "",
            url:"todo",
            btip: "留言板"
        }, {
            bimg: app.getImgSrc('生理期助手.png'),
            btap: "toPhysiologicalPeriod",
            url:"physiologicalPeriodPage/physiologicalPeriodPage",
            btip: "嘟嘟辛苦日"
        }, {
            bimg: app.getImgSrc('纪念日.png'),
            btap: "",
            url:"todo",
            btip: "纪念日"
        }, {
            bimg: app.getImgSrc('许愿树1.png'),
            btap: "toWishTree",
            url:"wishTreePage/wishTreePage",
            btip: "许愿树"
        }, {
            bimg: app.getImgSrc('敬请期待.png'),
            btap: "",
            url:"todo",
            btip: "敬请期待"
        } ],
        hiddenmodalput: !1,
        tip: "登录",
        tpassword: ""
    },
    inputUsername: function(t) {
        this.setData({
            username: t.detail.value
        });
    },
    inputPassword: function(t) {
        var o = "", i = t.detail.value.length, a = t.detail.value, e = this.data.tpassword, n = e.length;
        n > i ? e = e.substr(0, i) : e += a.substr(n, i - n);
        for (var d = 0; d < i; d++) o += "*";
        this.setData({
            password: o,
            tpassword: e
        });
    },
    confirm: function(t) {
        console.log("onLoad",app.getUserConfig());
        const users = app.getUserConfig();
        let o = this.data.username, i = this.data.tpassword;
        users[o] != undefined && users[o].password == i ? (wx.setStorage({
            key: "username",
            data: o
        }), wx.showToast({
            title: "欢迎" + users[o].nickName,
            icon: "success"
        }), wx.showTabBar({
            animation: !0
        }), this.setData({
            hiddenmodalput: !0
        })) : wx.showToast({
            title: "登录失败",
            icon: "none"
        });
    },
    onLoad: function(t) {
        var o = this;
        wx.getStorage({
            key: "username",
            success: function(t) {
                console.log(t.data), o.setData({
                    hiddenmodalput: !0
                });
            },
            fail: function(t) {
                console.log(t), o.setData({
                    hiddenmodalput: !1
                }), wx.hideTabBar({
                    animation: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        wx.removeStorage({
            key: "usename",
            success: function(t) {
                console.log(t);
            }
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    toUrl(e){
        console.log(e);
        let url = e.target.dataset.url;
        if(url == 'todo'){
            wx.showToast({
              title: '敬请期待',
            })
            return;
        }
        wx.navigateTo({
            url: url
        });
    },
});