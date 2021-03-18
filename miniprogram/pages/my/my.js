getApp();

Page({
    data: {
        userInfo: {},
        mode: [ "联系客服", "意见反馈" ]
    },
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