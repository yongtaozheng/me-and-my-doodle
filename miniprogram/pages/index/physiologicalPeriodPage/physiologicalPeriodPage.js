var e = getApp();

Page({
    data: {
        flag: 0,
        choose: 0
    },
    select: function(e) {
        this.setData({
            selectdate: e.detail
        }), -1 == wx.getStorageSync("calendarDate").indexOf(e.detail) ? this.setData({
            title: "添加标记"
        }) : this.setData({
            title: "删除标记"
        });
    },
    add: function(e) {
        var t = this.data, a = this, n = this.data.selectdate, o = wx.getStorageSync("calendarDate");
        console.log("----------------", n, o), -1 == o.indexOf(n) ? wx.showModal({
            cancelColor: "red",
            cancelText: "取消",
            confirmColor: "green",
            confirmText: "添加",
            content: n,
            showCancel: !0,
            title: "添加标记",
            success: function(e) {
                if (e.confirm) {
                    try {
                        o.push(n);
                    } catch (e) {
                        o = [ n ];
                    }
                    wx.setStorage({
                        key: "calendarDate",
                        data: o
                    }), console.log("用户点击确定"), wx.cloud.database().collection("myPeriod").add({
                        data: {
                            date: n,
                            username: t.username
                        },
                        success: function(e) {
                            wx.showModal({
                                title: "新建记录",
                                content: "添加成功",
                                showCancel: !1
                            }), a.onLoad(), a.selectComponent("#calendar").thisMonth(), a.setData({
                                title: "删除标记"
                            });
                        },
                        fail: console.error
                    });
                } else e.cancel && console.log("用户点击取消");
            },
            fail: function(e) {},
            complete: function(e) {}
        }) : wx.showModal({
            cancelColor: "red",
            cancelText: "取消",
            confirmColor: "green",
            confirmText: "删除",
            content: n,
            showCancel: !0,
            title: "删除标记",
            success: function(e) {
                if (e.confirm) {
                    console.log("用户点击确定");
                    var t = wx.cloud.database();
                    console.log(a.data.myPeriod[o.indexOf(n)], o.indexOf(n));
                    var c = a.data.myPeriod[o.indexOf(n)]._id;
                    console.log(c), t.collection("myPeriod").doc(c).remove({
                        success: function(e) {
                            wx.showModal({
                                title: "删除记录",
                                content: "删除成功",
                                showCancel: !1
                            }), a.onLoad(), a.selectComponent("#calendar").thisMonth(), a.setData({
                                title: "添加标记"
                            });
                        },
                        fail: console.error
                    }), o.splice(o.indexOf(n), 1), wx.setStorage({
                        key: "calendarDate",
                        data: o
                    });
                } else e.cancel && console.log("用户点击取消");
            },
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    changeTab: function(e) {
        var t = e.currentTarget.dataset.id, a = "观影清单";
        1 == t && (a = "观影记录"), this.setData({
            choose: t,
            title: a
        });
    },
    onLoad: function(t) {
        var a = this, n = this;
        wx.getStorage({
            key: "username",
            success: function(e) {
                n.setData({
                    username: e.data
                });
            },
            fail: function(e) {
                console.log(e);
            }
        }), wx.cloud.callFunction({
            name: "getMyType",
            data: {
                name: "myPeriod"
            },
            success: function(t) {
                for (var o = [], c = 0; c < t.result.data.length; c++) o.push(t.result.data[c].date);
                wx.setStorage({
                    key: "calendarDate",
                    data: o
                }), console.log("myPeriod:", t.result.data);
                var l = t.result.data;
                l = l.sort(function(e, t) {
                    return e.date.replace(/-/g, "") - t.date.replace(/-/g, "");
                });
                var s = new Date(l[l.length - 1].date.replace(/-/g, "/")), 
                    i = new Date(), 
                    d = i.getFullYear(), 
                    r = i.getMonth()+1, 
                    u = i.getDate(), 
                    f = new Date(d + "/" + r + "/" + u), 
                    g = Math.abs(s.getTime() - f.getTime()), 
                    h = parseInt(g / 864e5);
                console.log(s,f);
                n.setData({
                    myPeriod: l,
                    lastday: l[l.length - 1].date,
                    distance: h
                });
                for (var m = [], w = l[0].date, x = 0, D = 0; D < l.length - 1; D++) e.nextdate(l[D].date) != l[D + 1].date || D == l.length - 2 ? (m.push({}), 
                D == l.length - 2 ? m[m.length - 1].date = w + " ~ " + l[D + 1].date : m[m.length - 1].date = w + " ~ " + l[D].date, 
                m[m.length - 1].num = x + 1, w = l[D + 1].date, x = 1) : x++;
                m = m.reverse(), a.setData({
                    huizong: m
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});