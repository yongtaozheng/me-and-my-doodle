App({
    onLaunch: function() {
        wx.cloud ? wx.cloud.init({
            traceUser: !0
        }) : console.error("请使用 2.2.3 或以上的基础库以使用云能力"), this.globalData = {};
    },
    getWeek: function(e) {
        var t = e, a = t.getDay() || 7;
        t.setDate(t.getDate() - a + 1 + 5);
        var r = new Date(t.getFullYear(), 0, 1), n = r.getDay(), g = 1;
        0 != n && (g = 7 - n + 1), r = new Date(t.getFullYear(), 0, 1 + g);
        var u = Math.ceil((t.valueOf() - r.valueOf()) / 864e5);
        return Math.ceil(u / 7) + 1;
    },
    nextdate: function(e) {
        var t = e;
        t = t.replace(/-/g, "/");
        var a = new Date(t);
        return a.setDate(a.getDate() + 1), a.getFullYear() + "-" + (a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1) + "-" + (a.getDate() < 10 ? "0" + a.getDate() : a.getDate());
    },
    nowtime: function(e) {
        var t = Date.parse(new Date());
        t /= 1e3;
        var a = new Date(1e3 * t), r = a.getFullYear();
        if ("y" == e) return r;
        var n = a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1;
        if ("M" == e) return n;
        var g = a.getDate() < 10 ? "0" + a.getDate() : a.getDate();
        if ("d" == e) return g;
        var u = a.getHours() < 10 ? "0" + a.getHours() : a.getHours();
        if ("h" == e) return u;
        var o = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
        if ("m" == e) return o;
        var i = a.getSeconds();
        return "s" == e ? i : "t" == e ? r + "-" + n + "-" + g : "st" == e ? r + "/" + n + "/" + g : r + "-" + n + "-" + g + "-" + u + ":" + o + ":" + i;
    }
});