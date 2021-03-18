Page({
    data: {
        buttonList: [ {
            bimg: "cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/标签.png",
            btap: "toType",
            btip: "查看标签"
        }, {
            bimg: "cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/消费.png",
            btap: "toCost",
            btip: "查看消费"
        }, {
            bimg: "cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/打卡.png",
            btap: "toDo",
            btip: "打卡清单"
        }, {
            bimg: "cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/电影.png",
            btap: "toFilm",
            btip: "观影清单"
        }, {
            bimg: "cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/留言1.png",
            btap: "",
            btip: "留言板"
        }, {
            bimg: "cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/生理期助手.png",
            btap: "toPhysiologicalPeriod",
            btip: "嘟嘟辛苦日"
        }, {
            bimg: "cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/纪念日.png",
            btap: "",
            btip: "纪念日"
        }, {
            bimg: "cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/许愿树1.png",
            btap: "toWishTree",
            btip: "许愿树"
        }, {
            bimg: "cloud://it-cloud-hdrd7.6974-it-cloud-hdrd7-1300036058/记账本/敬请期待.png",
            btap: "",
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
        var o = this.data.username, i = this.data.tpassword;
        console.log(o, i), "郑勇涛" == o && "zhengyongtao" == i ? (wx.setStorage({
            key: "username",
            data: "郑勇涛"
        }), wx.showToast({
            title: "欢迎熊先生",
            icon: "success"
        }), wx.showTabBar({
            animation: !0
        }), this.setData({
            hiddenmodalput: !0
        })) : "李嘉丽" == o && "lijiali" == i ? (wx.setStorage({
            key: "username",
            data: "李嘉丽"
        }), wx.showToast({
            title: "欢迎桃小姐",
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
    toType: function(t) {
        wx.navigateTo({
            url: "typePage/typePage"
        });
    },
    toCost: function(t) {
        wx.navigateTo({
            url: "costPage/costPage"
        });
    },
    toFilm: function(t) {
        wx.navigateTo({
            url: "filmPage/filmPage"
        });
    },
    toDo: function(t) {
        wx.navigateTo({
            url: "todoPage/todoPage"
        });
    },
    toWishTree: function(t) {
        wx.navigateTo({
            url: "wishTreePage/wishTreePage"
        });
    },
    toPhysiologicalPeriod: function(t) {
        wx.navigateTo({
            url: "physiologicalPeriodPage/physiologicalPeriodPage"
        });
    }
});