var t = {
    yAxisWidth: 15,
    yAxisSplit: 5,
    xAxisHeight: 15,
    xAxisLineHeight: 15,
    legendHeight: 15,
    yAxisTitleWidth: 15,
    padding: 12,
    columePadding: 3,
    fontSize: 10,
    dataPointShape: [ "diamond", "circle", "triangle", "rect" ],
    colors: [ "#7cb5ec", "#f7a35c", "#434348", "#90ed7d", "#f15c80", "#8085e9" ],
    pieChartLinePadding: 25,
    pieChartTextPadding: 15,
    xAxisTextPadding: 3,
    titleColor: "#333333",
    titleFontSize: 20,
    subtitleColor: "#999999",
    subtitleFontSize: 15,
    toolTipPadding: 3,
    toolTipBackground: "#000000",
    toolTipOpacity: .7,
    toolTipLineHeight: 14,
    radarGridCount: 3,
    radarLabelTextMargin: 15
};

function e(t, e) {
    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
    for (var i = Object(t), n = 1; n < arguments.length; n++) {
        var a = arguments[n];
        if (null != a) for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (i[o] = a[o]);
    }
    return i;
}

var i = {
    toFixed: function(t, e) {
        return e = e || 2, this.isFloat(t) && (t = t.toFixed(e)), t;
    },
    isFloat: function(t) {
        return t % 1 != 0;
    },
    approximatelyEqual: function(t, e) {
        return Math.abs(t - e) < 1e-10;
    },
    isSameSign: function(t, e) {
        return Math.abs(t) === t && Math.abs(e) === e || Math.abs(t) !== t && Math.abs(e) !== e;
    },
    isSameXCoordinateArea: function(t, e) {
        return this.isSameSign(t.x, e.x);
    },
    isCollision: function(t, e) {
        return t.end = {}, t.end.x = t.start.x + t.width, t.end.y = t.start.y - t.height, 
        e.end = {}, e.end.x = e.start.x + e.width, e.end.y = e.start.y - e.height, !(e.start.x > t.end.x || e.end.x < t.start.x || e.end.y > t.start.y || e.start.y < t.end.y);
    }
};

function n(t, e, i) {
    if (isNaN(t)) throw new Error("[wxCharts] unvalid series data!");
    i = i || 10, e = e || "upper";
    for (var n = 1; i < 1; ) i *= 10, n *= 10;
    for (t = "upper" === e ? Math.ceil(t * n) : Math.floor(t * n); t % i != 0; ) "upper" === e ? t++ : t--;
    return t / n;
}

function a(t, e, i) {
    function n(t) {
        for (;t < 0; ) t += 2 * Math.PI;
        for (;t > 2 * Math.PI; ) t -= 2 * Math.PI;
        return t;
    }
    return t = n(t), (e = n(e)) > (i = n(i)) && (i += 2 * Math.PI, t < e && (t += 2 * Math.PI)), 
    t >= e && t <= i;
}

function o(t, e) {
    function i(t, e) {
        return !(!t[e - 1] || !t[e + 1]) && (t[e].y >= Math.max(t[e - 1].y, t[e + 1].y) || t[e].y <= Math.min(t[e - 1].y, t[e + 1].y));
    }
    var n = null, a = null, o = null, r = null;
    if (e < 1 ? (n = t[0].x + .2 * (t[1].x - t[0].x), a = t[0].y + .2 * (t[1].y - t[0].y)) : (n = t[e].x + .2 * (t[e + 1].x - t[e - 1].x), 
    a = t[e].y + .2 * (t[e + 1].y - t[e - 1].y)), e > t.length - 3) {
        var s = t.length - 1;
        o = t[s].x - .2 * (t[s].x - t[s - 1].x), r = t[s].y - .2 * (t[s].y - t[s - 1].y);
    } else o = t[e + 1].x - .2 * (t[e + 2].x - t[e].x), r = t[e + 1].y - .2 * (t[e + 2].y - t[e].y);
    return i(t, e + 1) && (r = t[e + 1].y), i(t, e) && (a = t[e].y), {
        ctrA: {
            x: n,
            y: a
        },
        ctrB: {
            x: o,
            y: r
        }
    };
}

function r(t, e, i) {
    return {
        x: i.x + t,
        y: i.y - e
    };
}

function s(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10, i = (t = (t = String(t)).split(""), 
    0);
    return t.forEach(function(t) {
        /[a-zA-Z]/.test(t) ? i += 7 : /[0-9]/.test(t) ? i += 5.5 : /\./.test(t) ? i += 2.7 : /-/.test(t) ? i += 3.25 : /[\u4e00-\u9fa5]/.test(t) ? i += 10 : /\(|\)/.test(t) ? i += 3.73 : /\s/.test(t) ? i += 2.5 : /%/.test(t) ? i += 8 : i += 10;
    }), i * e / 10;
}

function l(t) {
    return t.reduce(function(t, e) {
        return (t.data ? t.data : t).concat(e.data);
    }, []);
}

function h(t, e, i) {
    return Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2) <= Math.pow(i, 2);
}

function c(t) {
    var e = [], i = [];
    return t.forEach(function(t, n) {
        null !== t ? i.push(t) : (i.length && e.push(i), i = []);
    }), i.length && e.push(i), e;
}

function f(t, e, i) {
    if (!1 === e.legend) return {
        legendList: [],
        legendHeight: 0
    };
    var n = [], a = 0, o = [];
    return t.forEach(function(t) {
        var i = 30 + s(t.name || "undefined");
        a + i > e.width ? (n.push(o), a = i, o = [ t ]) : (a += i, o.push(t));
    }), o.length && n.push(o), {
        legendList: n,
        legendHeight: n.length * (i.fontSize + 8) + 5
    };
}

function d(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, i = 0, n = 0;
    return t.forEach(function(t) {
        t.data = null === t.data ? 0 : t.data, i += t.data;
    }), t.forEach(function(t) {
        t.data = null === t.data ? 0 : t.data, t._proportion_ = t.data / i * e;
    }), t.forEach(function(t) {
        t._start_ = n, n += 2 * t._proportion_ * Math.PI;
    }), t;
}

function x(t, e, i, n, a, o) {
    return t.map(function(t) {
        return null === t ? null : (t.width = (e - 2 * a.columePadding) / i, o.extra.column && o.extra.column.width && +o.extra.column.width > 0 ? t.width = Math.min(t.width, +o.extra.column.width) : t.width = Math.min(t.width, 25), 
        t.x += (n + .5 - i / 2) * t.width, t);
    });
}

function u(t, e, i) {
    var n = i.yAxisWidth + i.yAxisTitleWidth, a = (e.width - 2 * i.padding - n) / (e.enableScroll ? Math.min(5, t.length) : t.length), o = [], r = i.padding + n, s = e.width - i.padding;
    return t.forEach(function(t, e) {
        o.push(r + e * a);
    }), !0 === e.enableScroll ? o.push(r + t.length * a) : o.push(s), {
        xAxisPoints: o,
        startX: r,
        endX: s,
        eachSpacing: a
    };
}

function g(t, e, i, n, a, o, r) {
    var s = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 1, l = [], h = o.height - 2 * r.padding - r.xAxisHeight - r.legendHeight;
    return t.forEach(function(t, c) {
        if (null === t) l.push(null); else {
            var f = {};
            f.x = n[c] + Math.round(a / 2);
            var d = h * (t - e) / (i - e);
            d *= s, f.y = o.height - r.xAxisHeight - r.legendHeight - Math.round(d) - r.padding, 
            l.push(f);
        }
    }), l;
}

function p(t, e, i) {
    var a = l(t);
    a = a.filter(function(t) {
        return null !== t;
    });
    var o = Math.min.apply(this, a), r = Math.max.apply(this, a);
    if ("number" == typeof e.yAxis.min && (o = Math.min(e.yAxis.min, o)), "number" == typeof e.yAxis.max && (r = Math.max(e.yAxis.max, r)), 
    o === r) {
        var s = r || 1;
        o -= s, r += s;
    }
    for (var h = function(t, e) {
        var i = 0, a = e - t;
        return {
            minRange: n(t, "lower", i = a >= 1e4 ? 1e3 : a >= 1e3 ? 100 : a >= 100 ? 10 : a >= 10 ? 5 : a >= 1 ? 1 : a >= .1 ? .1 : .01),
            maxRange: n(e, "upper", i)
        };
    }(o, r), c = h.minRange, f = [], d = (h.maxRange - c) / i.yAxisSplit, x = 0; x <= i.yAxisSplit; x++) f.push(c + d * x);
    return f.reverse();
}

function y(t, e, n) {
    var a = p(t, e, n), o = n.yAxisWidth, r = a.map(function(t) {
        return t = i.toFixed(t, 2), t = e.yAxis.format ? e.yAxis.format(Number(t)) : t, 
        o = Math.max(o, s(t) + 5), t;
    });
    return !0 === e.yAxis.disabled && (o = 0), {
        rangesFormat: r,
        ranges: a,
        yAxisWidth: o
    };
}

function v(t, e, i, n) {
    n.beginPath(), n.setStrokeStyle("#ffffff"), n.setLineWidth(1), n.setFillStyle(e), 
    "diamond" === i ? t.forEach(function(t, e) {
        null !== t && (n.moveTo(t.x, t.y - 4.5), n.lineTo(t.x - 4.5, t.y), n.lineTo(t.x, t.y + 4.5), 
        n.lineTo(t.x + 4.5, t.y), n.lineTo(t.x, t.y - 4.5));
    }) : "circle" === i ? t.forEach(function(t, e) {
        null !== t && (n.moveTo(t.x + 3.5, t.y), n.arc(t.x, t.y, 4, 0, 2 * Math.PI, !1));
    }) : "rect" === i ? t.forEach(function(t, e) {
        null !== t && (n.moveTo(t.x - 3.5, t.y - 3.5), n.rect(t.x - 3.5, t.y - 3.5, 7, 7));
    }) : "triangle" === i && t.forEach(function(t, e) {
        null !== t && (n.moveTo(t.x, t.y - 4.5), n.lineTo(t.x - 4.5, t.y + 4.5), n.lineTo(t.x + 4.5, t.y + 4.5), 
        n.lineTo(t.x, t.y - 4.5));
    }), n.closePath(), n.fill(), n.stroke();
}

function m(t, e, i, n) {
    var a = e.data;
    n.beginPath(), n.setFontSize(i.fontSize), n.setFillStyle("#666666"), t.forEach(function(t, i) {
        if (null !== t) {
            var o = e.format ? e.format(a[i]) : a[i];
            n.fillText(o, t.x - s(o) / 2, t.y - 2);
        }
    }), n.closePath(), n.stroke();
}

function P(t, e, n, a, o, l) {
    var h = o + n.pieChartLinePadding, c = [], f = null;
    t.map(function(t) {
        return {
            arc: 2 * Math.PI - (t._start_ + 2 * Math.PI * t._proportion_ / 2),
            text: t.format ? t.format(+t._proportion_.toFixed(2)) : i.toFixed(100 * t._proportion_) + "%",
            color: t.color
        };
    }).forEach(function(t) {
        var e = Math.cos(t.arc) * h, a = Math.sin(t.arc) * h, r = Math.cos(t.arc) * o, l = Math.sin(t.arc) * o, d = e >= 0 ? e + n.pieChartTextPadding : e - n.pieChartTextPadding, x = a, u = s(t.text), g = x;
        f && i.isSameXCoordinateArea(f.start, {
            x: d
        }) && (g = d > 0 ? Math.min(x, f.start.y) : e < 0 ? Math.max(x, f.start.y) : x > 0 ? Math.max(x, f.start.y) : Math.min(x, f.start.y)), 
        d < 0 && (d -= u);
        var p = {
            lineStart: {
                x: r,
                y: l
            },
            lineEnd: {
                x: e,
                y: a
            },
            start: {
                x: d,
                y: g
            },
            width: u,
            height: n.fontSize,
            text: t.text,
            color: t.color
        };
        f = function(t, e) {
            if (e) for (;i.isCollision(t, e); ) t.start.x > 0 ? t.start.y-- : t.start.x < 0 ? t.start.y++ : t.start.y > 0 ? t.start.y++ : t.start.y--;
            return t;
        }(p, f), c.push(f);
    }), c.forEach(function(t) {
        var e = r(t.lineStart.x, t.lineStart.y, l), i = r(t.lineEnd.x, t.lineEnd.y, l), o = r(t.start.x, t.start.y, l);
        a.setLineWidth(1), a.setFontSize(n.fontSize), a.beginPath(), a.setStrokeStyle(t.color), 
        a.setFillStyle(t.color), a.moveTo(e.x, e.y);
        var s = t.start.x < 0 ? o.x + t.width : o.x, h = t.start.x < 0 ? o.x - 5 : o.x + 5;
        a.quadraticCurveTo(i.x, i.y, s, o.y), a.moveTo(e.x, e.y), a.stroke(), a.closePath(), 
        a.beginPath(), a.moveTo(o.x + t.width, o.y), a.arc(s, o.y, 2, 0, 2 * Math.PI), a.closePath(), 
        a.fill(), a.beginPath(), a.setFillStyle("#666666"), a.fillText(t.text, h, o.y + 3), 
        a.closePath(), a.stroke(), a.closePath();
    });
}

function S(t, e, i, n) {
    var a = i.padding, o = e.height - i.padding - i.xAxisHeight - i.legendHeight;
    n.beginPath(), n.setStrokeStyle("#cccccc"), n.setLineWidth(1), n.moveTo(t, a), n.lineTo(t, o), 
    n.stroke(), n.closePath();
}

function T(t, i, n, a) {
    n.save(), t._scrollDistance_ && 0 !== t._scrollDistance_ && !0 === t.enableScroll && n.translate(t._scrollDistance_, 0), 
    t.tooltip && t.tooltip.textList && t.tooltip.textList.length && 1 === a && function(t, i, n, a, o) {
        var r = !1;
        (i = e({
            x: 0,
            y: 0
        }, i)).y -= 8;
        var l = t.map(function(t) {
            return s(t.text);
        }), h = 9 + 4 * a.toolTipPadding + Math.max.apply(null, l), c = 2 * a.toolTipPadding + t.length * a.toolTipLineHeight;
        i.x - Math.abs(n._scrollDistance_) + 8 + h > n.width && (r = !0), o.beginPath(), 
        o.setFillStyle(n.tooltip.option.background || a.toolTipBackground), o.setGlobalAlpha(a.toolTipOpacity), 
        r ? (o.moveTo(i.x, i.y + 10), o.lineTo(i.x - 8, i.y + 10 - 5), o.lineTo(i.x - 8, i.y + 10 + 5), 
        o.moveTo(i.x, i.y + 10), o.fillRect(i.x - h - 8, i.y, h, c)) : (o.moveTo(i.x, i.y + 10), 
        o.lineTo(i.x + 8, i.y + 10 - 5), o.lineTo(i.x + 8, i.y + 10 + 5), o.moveTo(i.x, i.y + 10), 
        o.fillRect(i.x + 8, i.y, h, c)), o.closePath(), o.fill(), o.setGlobalAlpha(1), t.forEach(function(t, e) {
            o.beginPath(), o.setFillStyle(t.color);
            var n = i.x + 8 + 2 * a.toolTipPadding, s = i.y + (a.toolTipLineHeight - a.fontSize) / 2 + a.toolTipLineHeight * e + a.toolTipPadding;
            r && (n = i.x - h - 8 + 2 * a.toolTipPadding), o.fillRect(n, s, 4, a.fontSize), 
            o.closePath();
        }), o.beginPath(), o.setFontSize(a.fontSize), o.setFillStyle("#ffffff"), t.forEach(function(t, e) {
            var n = i.x + 8 + 2 * a.toolTipPadding + 4 + 5;
            r && (n = i.x - h - 8 + 2 * a.toolTipPadding + 4 + 5);
            var s = i.y + (a.toolTipLineHeight - a.fontSize) / 2 + a.toolTipLineHeight * e + a.toolTipPadding;
            o.fillText(t.text, n, s + a.fontSize);
        }), o.stroke(), o.closePath();
    }(t.tooltip.textList, t.tooltip.offset, t, i, n), n.restore();
}

function A(t, e, i, n) {
    var a = u(t, e, i), o = a.xAxisPoints, r = (a.startX, a.endX, a.eachSpacing), l = e.height - i.padding - i.xAxisHeight - i.legendHeight, h = l + i.xAxisLineHeight;
    n.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && n.translate(e._scrollDistance_, 0), 
    n.beginPath(), n.setStrokeStyle(e.xAxis.gridColor || "#cccccc"), !0 !== e.xAxis.disableGrid && ("calibration" === e.xAxis.type ? o.forEach(function(t, e) {
        e > 0 && (n.moveTo(t - r / 2, l), n.lineTo(t - r / 2, l + 4));
    }) : o.forEach(function(t, e) {
        n.moveTo(t, l), n.lineTo(t, h);
    })), n.closePath(), n.stroke();
    var c = e.width - 2 * i.padding - i.yAxisWidth - i.yAxisTitleWidth, f = Math.min(t.length, Math.ceil(c / i.fontSize / 1.5)), d = Math.ceil(t.length / f);
    t = t.map(function(t, e) {
        return e % d != 0 ? "" : t;
    }), 0 === i._xAxisTextAngle_ ? (n.beginPath(), n.setFontSize(i.fontSize), n.setFillStyle(e.xAxis.fontColor || "#666666"), 
    t.forEach(function(t, e) {
        var a = r / 2 - s(t) / 2;
        n.fillText(t, o[e] + a, l + i.fontSize + 5);
    }), n.closePath(), n.stroke()) : t.forEach(function(t, a) {
        n.save(), n.beginPath(), n.setFontSize(i.fontSize), n.setFillStyle(e.xAxis.fontColor || "#666666");
        var h = s(t), c = r / 2 - h, f = function(t, e, i) {
            var n = t, a = i - e, o = n + (i - a - n) / Math.sqrt(2);
            return {
                transX: o *= -1,
                transY: (i - a) * (Math.sqrt(2) - 1) - (i - a - n) / Math.sqrt(2)
            };
        }(o[a] + r / 2, l + i.fontSize / 2 + 5, e.height), d = f.transX, x = f.transY;
        n.rotate(-1 * i._xAxisTextAngle_), n.translate(d, x), n.fillText(t, o[a] + c, l + i.fontSize + 5), 
        n.closePath(), n.stroke(), n.restore();
    }), n.restore();
}

function b(t, e, i) {
    for (var n = t.height - 2 * e.padding - e.xAxisHeight - e.legendHeight, a = Math.floor(n / e.yAxisSplit), o = e.yAxisWidth + e.yAxisTitleWidth, r = e.padding + o, s = t.width - e.padding, l = [], h = 0; h < e.yAxisSplit; h++) l.push(e.padding + a * h);
    l.push(e.padding + a * e.yAxisSplit + 2), i.beginPath(), i.setStrokeStyle(t.yAxis.gridColor || "#cccccc"), 
    i.setLineWidth(1), l.forEach(function(t, e) {
        i.moveTo(r, t), i.lineTo(s, t);
    }), i.closePath(), i.stroke();
}

function M(t, e, i, n) {
    if (!0 !== e.yAxis.disabled) {
        var a = y(t, e, i).rangesFormat, o = i.yAxisWidth + i.yAxisTitleWidth, r = e.height - 2 * i.padding - i.xAxisHeight - i.legendHeight, l = Math.floor(r / i.yAxisSplit), h = i.padding + o, c = e.width - i.padding, f = e.height - i.padding - i.xAxisHeight - i.legendHeight;
        n.setFillStyle(e.background || "#ffffff"), e._scrollDistance_ < 0 && n.fillRect(0, 0, h, f + i.xAxisHeight + 5), 
        n.fillRect(c, 0, e.width, f + i.xAxisHeight + 5);
        for (var d = [], x = 0; x <= i.yAxisSplit; x++) d.push(i.padding + l * x);
        n.stroke(), n.beginPath(), n.setFontSize(i.fontSize), n.setFillStyle(e.yAxis.fontColor || "#666666"), 
        a.forEach(function(t, e) {
            var a = d[e] ? d[e] : f;
            n.fillText(t, i.padding + i.yAxisTitleWidth, a + i.fontSize / 2);
        }), n.closePath(), n.stroke(), e.yAxis.title && function(t, e, i, n) {
            var a = i.xAxisHeight + (e.height - i.xAxisHeight - s(t)) / 2;
            n.save(), n.beginPath(), n.setFontSize(i.fontSize), n.setFillStyle(e.yAxis.titleFontColor || "#333333"), 
            n.translate(0, e.height), n.rotate(-90 * Math.PI / 180), n.fillText(t, a, i.padding + .5 * i.fontSize), 
            n.stroke(), n.closePath(), n.restore();
        }(e.yAxis.title, e, i, n);
    }
}

function _(t, e, i, n) {
    if (e.legend) {
        var a = f(t, e, i).legendList;
        a.forEach(function(t, a) {
            var o = 0;
            t.forEach(function(t) {
                t.name = t.name || "undefined", o += 15 + s(t.name) + 15;
            });
            var r = (e.width - o) / 2 + 5, l = e.height - i.padding - i.legendHeight + a * (i.fontSize + 8) + 5 + 8;
            n.setFontSize(i.fontSize), t.forEach(function(t) {
                switch (e.type) {
                  case "line":
                    n.beginPath(), n.setLineWidth(1), n.setStrokeStyle(t.color), n.moveTo(r - 2, l + 5), 
                    n.lineTo(r + 17, l + 5), n.stroke(), n.closePath(), n.beginPath(), n.setLineWidth(1), 
                    n.setStrokeStyle("#ffffff"), n.setFillStyle(t.color), n.moveTo(r + 7.5, l + 5), 
                    n.arc(r + 7.5, l + 5, 4, 0, 2 * Math.PI), n.fill(), n.stroke(), n.closePath();
                    break;

                  case "pie":
                  case "ring":
                    n.beginPath(), n.setFillStyle(t.color), n.moveTo(r + 7.5, l + 5), n.arc(r + 7.5, l + 5, 7, 0, 2 * Math.PI), 
                    n.closePath(), n.fill();
                    break;

                  default:
                    n.beginPath(), n.setFillStyle(t.color), n.moveTo(r, l), n.rect(r, l, 15, 10), n.closePath(), 
                    n.fill();
                }
                r += 20, n.beginPath(), n.setFillStyle(e.extra.legendTextColor || "#333333"), n.fillText(t.name, r, l + 9), 
                n.closePath(), n.stroke(), r += s(t.name) + 10;
            });
        });
    }
}

function E(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, o = e.extra.pie || {};
    t = d(t, a);
    var r = {
        x: e.width / 2,
        y: (e.height - i.legendHeight) / 2
    }, l = Math.min(r.x - i.pieChartLinePadding - i.pieChartTextPadding - i._pieTextMaxLength_, r.y - i.pieChartLinePadding - i.pieChartTextPadding);
    if (e.dataLabel ? l -= 10 : l -= 2 * i.padding, (t = t.map(function(t) {
        return t._start_ += (o.offsetAngle || 0) * Math.PI / 180, t;
    })).forEach(function(t) {
        n.beginPath(), n.setLineWidth(2), n.setStrokeStyle("#ffffff"), n.setFillStyle(t.color), 
        n.moveTo(r.x, r.y), n.arc(r.x, r.y, l, t._start_, t._start_ + 2 * t._proportion_ * Math.PI), 
        n.closePath(), n.fill(), !0 !== e.disablePieStroke && n.stroke();
    }), "ring" === e.type) {
        var h = .6 * l;
        "number" == typeof e.extra.ringWidth && e.extra.ringWidth > 0 && (h = Math.max(0, l - e.extra.ringWidth)), 
        n.beginPath(), n.setFillStyle(e.background || "#ffffff"), n.moveTo(r.x, r.y), n.arc(r.x, r.y, h, 0, 2 * Math.PI), 
        n.closePath(), n.fill();
    }
    if (!1 !== e.dataLabel && 1 === a) {
        for (var c = !1, f = 0, x = t.length; f < x; f++) if (t[f].data > 0) {
            c = !0;
            break;
        }
        c && P(t, 0, i, n, l, r);
    }
    return 1 === a && "ring" === e.type && function(t, e, i) {
        var n = t.title.fontSize || e.titleFontSize, a = t.subtitle.fontSize || e.subtitleFontSize, o = t.title.name || "", r = t.subtitle.name || "", l = t.title.color || e.titleColor, h = t.subtitle.color || e.subtitleColor, c = o ? n : 0, f = r ? a : 0;
        if (r) {
            var d = s(r, a), x = (t.width - d) / 2 + (t.subtitle.offsetX || 0), u = (t.height - e.legendHeight + a) / 2;
            o && (u -= (c + 5) / 2), i.beginPath(), i.setFontSize(a), i.setFillStyle(h), i.fillText(r, x, u), 
            i.stroke(), i.closePath();
        }
        if (o) {
            var g = s(o, n), p = (t.width - g) / 2 + (t.title.offsetX || 0), y = (t.height - e.legendHeight + n) / 2;
            r && (y += (f + 5) / 2), i.beginPath(), i.setFontSize(n), i.setFillStyle(l), i.fillText(o, p, y), 
            i.stroke(), i.closePath();
        }
    }(e, i, n), {
        center: r,
        radius: l,
        series: t
    };
}

function F(t, e, n, a) {
    var o, h, c = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, f = e.extra.radar || {}, d = function(t) {
        for (var e = 2 * Math.PI / t, i = [], n = 0; n < t; n++) i.push(e * n);
        return i.map(function(t) {
            return -1 * t + Math.PI / 2;
        });
    }(e.categories.length), x = {
        x: e.width / 2,
        y: (e.height - n.legendHeight) / 2
    }, u = Math.min(x.x - (o = e.categories, h = o.map(function(t) {
        return s(t);
    }), Math.max.apply(null, h) + n.radarLabelTextMargin), x.y - n.radarLabelTextMargin);
    u -= n.padding, a.beginPath(), a.setLineWidth(1), a.setStrokeStyle(f.gridColor || "#cccccc"), 
    d.forEach(function(t) {
        var e = r(u * Math.cos(t), u * Math.sin(t), x);
        a.moveTo(x.x, x.y), a.lineTo(e.x, e.y);
    }), a.stroke(), a.closePath();
    for (var g = function(t) {
        var e = {};
        a.beginPath(), a.setLineWidth(1), a.setStrokeStyle(f.gridColor || "#cccccc"), d.forEach(function(i, o) {
            var s = r(u / n.radarGridCount * t * Math.cos(i), u / n.radarGridCount * t * Math.sin(i), x);
            0 === o ? (e = s, a.moveTo(s.x, s.y)) : a.lineTo(s.x, s.y);
        }), a.lineTo(e.x, e.y), a.stroke(), a.closePath();
    }, p = 1; p <= n.radarGridCount; p++) g(p);
    return function(t, e, i, n, a) {
        var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1, s = a.extra.radar || {};
        s.max = s.max || 0;
        var h = Math.max(s.max, Math.max.apply(null, l(n))), c = [];
        return n.forEach(function(n) {
            var a = {};
            a.color = n.color, a.data = [], n.data.forEach(function(n, s) {
                var l = {};
                l.angle = t[s], l.proportion = n / h, l.position = r(i * l.proportion * o * Math.cos(l.angle), i * l.proportion * o * Math.sin(l.angle), e), 
                a.data.push(l);
            }), c.push(a);
        }), c;
    }(d, x, u, t, e, c).forEach(function(t, i) {
        if (a.beginPath(), a.setFillStyle(t.color), a.setGlobalAlpha(.6), t.data.forEach(function(t, e) {
            0 === e ? a.moveTo(t.position.x, t.position.y) : a.lineTo(t.position.x, t.position.y);
        }), a.closePath(), a.fill(), a.setGlobalAlpha(1), !1 !== e.dataPointShape) {
            var o = n.dataPointShape[i % n.dataPointShape.length];
            v(t.data.map(function(t) {
                return t.position;
            }), t.color, o, a);
        }
    }), function(t, e, n, a, o, l) {
        var h = a.extra.radar || {};
        e += o.radarLabelTextMargin, l.beginPath(), l.setFontSize(o.fontSize), l.setFillStyle(h.labelColor || "#666666"), 
        t.forEach(function(t, h) {
            var c = {
                x: e * Math.cos(t),
                y: e * Math.sin(t)
            }, f = r(c.x, c.y, n), d = f.x, x = f.y;
            i.approximatelyEqual(c.x, 0) ? d -= s(a.categories[h] || "") / 2 : c.x < 0 && (d -= s(a.categories[h] || "")), 
            l.fillText(a.categories[h] || "", d, x + o.fontSize / 2);
        }), l.stroke(), l.closePath();
    }(d, u, x, e, n, a), {
        center: x,
        radius: u,
        angleList: d
    };
}

function w(t, e) {
    e.draw();
}

var L = {
    easeIn: function(t) {
        return Math.pow(t, 3);
    },
    easeOut: function(t) {
        return Math.pow(t - 1, 3) + 1;
    },
    easeInOut: function(t) {
        return (t /= .5) < 1 ? .5 * Math.pow(t, 3) : .5 * (Math.pow(t - 2, 3) + 2);
    },
    linear: function(t) {
        return t;
    }
};

function k(t) {
    this.isStop = !1, t.duration = void 0 === t.duration ? 1e3 : t.duration, t.timing = t.timing || "linear";
    var e = "undefined" != typeof requestAnimationFrame ? requestAnimationFrame : "undefined" != typeof setTimeout ? function(t, e) {
        setTimeout(function() {
            var e = +new Date();
            t(e);
        }, e);
    } : function(t) {
        t(null);
    }, i = null, n = function(a) {
        if (null === a || !0 === this.isStop) return t.onProcess && t.onProcess(1), void (t.onAnimationFinish && t.onAnimationFinish());
        if (null === i && (i = a), a - i < t.duration) {
            var o = (a - i) / t.duration;
            o = (0, L[t.timing])(o), t.onProcess && t.onProcess(o), e(n, 17);
        } else t.onProcess && t.onProcess(1), t.onAnimationFinish && t.onAnimationFinish();
    };
    n = n.bind(this), e(n, 17);
}

function C(t, e, n, a) {
    var r = this, l = e.series, h = e.categories, p = f(l = function(t, e) {
        var i = 0;
        return t.map(function(t) {
            return t.color || (t.color = e.colors[i], i = (i + 1) % e.colors.length), t;
        });
    }(l, n), e, n).legendHeight;
    n.legendHeight = p;
    var P = y(l, e, n).yAxisWidth;
    if (n.yAxisWidth = P, h && h.length) {
        var L = function(t, e, i) {
            var n = {
                angle: 0,
                xAxisHeight: i.xAxisHeight
            }, a = u(t, e, i).eachSpacing, o = t.map(function(t) {
                return s(t);
            }), r = Math.max.apply(this, o);
            return r + 2 * i.xAxisTextPadding > a && (n.angle = 45 * Math.PI / 180, n.xAxisHeight = 2 * i.xAxisTextPadding + r * Math.sin(n.angle)), 
            n;
        }(h, e, n), C = L.xAxisHeight, H = L.angle;
        n.xAxisHeight = C, n._xAxisTextAngle_ = H;
    }
    "pie" !== t && "ring" !== t || (n._pieTextMaxLength_ = !1 === e.dataLabel ? 0 : function(t) {
        t = d(t);
        var e = 0;
        return t.forEach(function(t) {
            var n = t.format ? t.format(+t._proportion_.toFixed(2)) : i.toFixed(100 * t._proportion_) + "%";
            e = Math.max(e, s(n));
        }), e;
    }(l));
    var I = e.animation ? 1e3 : 0;
    switch (this.animationInstance && this.animationInstance.stop(), t) {
      case "line":
        this.animationInstance = new k({
            timing: "easeIn",
            duration: I,
            onProcess: function(t) {
                b(e, n, a);
                var i = function(t, e, i, n) {
                    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, r = y(t, e, i).ranges, s = u(e.categories, e, i), l = s.xAxisPoints, h = s.eachSpacing, f = r.pop(), d = r.shift(), x = [];
                    return n.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && n.translate(e._scrollDistance_, 0), 
                    e.tooltip && e.tooltip.textList && e.tooltip.textList.length && 1 === a && S(e.tooltip.offset.x, e, i, n), 
                    t.forEach(function(t, r) {
                        var s = g(t.data, f, d, l, h, e, i, a);
                        if (x.push(s), c(s).forEach(function(i, a) {
                            n.beginPath(), n.setStrokeStyle(t.color), n.setLineWidth(2), 1 === i.length ? (n.moveTo(i[0].x, i[0].y), 
                            n.arc(i[0].x, i[0].y, 1, 0, 2 * Math.PI)) : (n.moveTo(i[0].x, i[0].y), "curve" === e.extra.lineStyle ? i.forEach(function(t, e) {
                                if (e > 0) {
                                    var a = o(i, e - 1);
                                    n.bezierCurveTo(a.ctrA.x, a.ctrA.y, a.ctrB.x, a.ctrB.y, t.x, t.y);
                                }
                            }) : i.forEach(function(t, e) {
                                e > 0 && n.lineTo(t.x, t.y);
                            }), n.moveTo(i[0].x, i[0].y)), n.closePath(), n.stroke();
                        }), !1 !== e.dataPointShape) {
                            var u = i.dataPointShape[r % i.dataPointShape.length];
                            v(s, t.color, u, n);
                        }
                    }), !1 !== e.dataLabel && 1 === a && t.forEach(function(t, o) {
                        m(g(t.data, f, d, l, h, e, i, a), t, i, n);
                    }), n.restore(), {
                        xAxisPoints: l,
                        calPoints: x,
                        eachSpacing: h
                    };
                }(l, e, n, a, t), s = i.xAxisPoints, f = i.calPoints, d = i.eachSpacing;
                r.chartData.xAxisPoints = s, r.chartData.calPoints = f, r.chartData.eachSpacing = d, 
                A(h, e, n, a), _(e.series, e, n, a), M(l, e, n, a), T(e, n, a, t), w(0, a);
            },
            onAnimationFinish: function() {
                r.event.trigger("renderComplete");
            }
        });
        break;

      case "column":
        this.animationInstance = new k({
            timing: "easeIn",
            duration: I,
            onProcess: function(t) {
                b(e, n, a);
                var i = function(t, e, i, n) {
                    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, o = y(t, e, i).ranges, r = u(e.categories, e, i), s = r.xAxisPoints, l = r.eachSpacing, h = o.pop(), c = o.shift();
                    return n.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && n.translate(e._scrollDistance_, 0), 
                    t.forEach(function(o, r) {
                        var f = g(o.data, h, c, s, l, e, i, a);
                        f = x(f, l, t.length, r, i, e), n.beginPath(), n.setFillStyle(o.color), f.forEach(function(t, a) {
                            if (null !== t) {
                                var o = t.x - t.width / 2 + 1, r = e.height - t.y - i.padding - i.xAxisHeight - i.legendHeight;
                                n.moveTo(o, t.y), n.rect(o, t.y, t.width - 2, r);
                            }
                        }), n.closePath(), n.fill();
                    }), t.forEach(function(o, r) {
                        var f = g(o.data, h, c, s, l, e, i, a);
                        f = x(f, l, t.length, r, i, e), !1 !== e.dataLabel && 1 === a && m(f, o, i, n);
                    }), n.restore(), {
                        xAxisPoints: s,
                        eachSpacing: l
                    };
                }(l, e, n, a, t), o = i.xAxisPoints, s = i.eachSpacing;
                r.chartData.xAxisPoints = o, r.chartData.eachSpacing = s, A(h, e, n, a), _(e.series, e, n, a), 
                M(l, e, n, a), w(0, a);
            },
            onAnimationFinish: function() {
                r.event.trigger("renderComplete");
            }
        });
        break;

      case "area":
        this.animationInstance = new k({
            timing: "easeIn",
            duration: I,
            onProcess: function(t) {
                b(e, n, a);
                var i = function(t, e, i, n) {
                    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, r = y(t, e, i).ranges, s = u(e.categories, e, i), l = s.xAxisPoints, h = s.eachSpacing, f = r.pop(), d = r.shift(), x = e.height - i.padding - i.xAxisHeight - i.legendHeight, p = [];
                    return n.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && n.translate(e._scrollDistance_, 0), 
                    e.tooltip && e.tooltip.textList && e.tooltip.textList.length && 1 === a && S(e.tooltip.offset.x, e, i, n), 
                    t.forEach(function(t, r) {
                        var s = g(t.data, f, d, l, h, e, i, a);
                        if (p.push(s), c(s).forEach(function(i) {
                            if (n.beginPath(), n.setStrokeStyle(t.color), n.setFillStyle(t.color), n.setGlobalAlpha(.6), 
                            n.setLineWidth(2), i.length > 1) {
                                var a = i[0], r = i[i.length - 1];
                                n.moveTo(a.x, a.y), "curve" === e.extra.lineStyle ? i.forEach(function(t, e) {
                                    if (e > 0) {
                                        var a = o(i, e - 1);
                                        n.bezierCurveTo(a.ctrA.x, a.ctrA.y, a.ctrB.x, a.ctrB.y, t.x, t.y);
                                    }
                                }) : i.forEach(function(t, e) {
                                    e > 0 && n.lineTo(t.x, t.y);
                                }), n.lineTo(r.x, x), n.lineTo(a.x, x), n.lineTo(a.x, a.y);
                            } else {
                                var s = i[0];
                                n.moveTo(s.x - h / 2, s.y), n.lineTo(s.x + h / 2, s.y), n.lineTo(s.x + h / 2, x), 
                                n.lineTo(s.x - h / 2, x), n.moveTo(s.x - h / 2, s.y);
                            }
                            n.closePath(), n.fill(), n.setGlobalAlpha(1);
                        }), !1 !== e.dataPointShape) {
                            var u = i.dataPointShape[r % i.dataPointShape.length];
                            v(s, t.color, u, n);
                        }
                    }), !1 !== e.dataLabel && 1 === a && t.forEach(function(t, o) {
                        m(g(t.data, f, d, l, h, e, i, a), t, i, n);
                    }), n.restore(), {
                        xAxisPoints: l,
                        calPoints: p,
                        eachSpacing: h
                    };
                }(l, e, n, a, t), s = i.xAxisPoints, f = i.calPoints, d = i.eachSpacing;
                r.chartData.xAxisPoints = s, r.chartData.calPoints = f, r.chartData.eachSpacing = d, 
                A(h, e, n, a), _(e.series, e, n, a), M(l, e, n, a), T(e, n, a, t), w(0, a);
            },
            onAnimationFinish: function() {
                r.event.trigger("renderComplete");
            }
        });
        break;

      case "ring":
      case "pie":
        this.animationInstance = new k({
            timing: "easeInOut",
            duration: I,
            onProcess: function(t) {
                r.chartData.pieData = E(l, e, n, a, t), _(e.series, e, n, a), w(0, a);
            },
            onAnimationFinish: function() {
                r.event.trigger("renderComplete");
            }
        });
        break;

      case "radar":
        this.animationInstance = new k({
            timing: "easeInOut",
            duration: I,
            onProcess: function(t) {
                r.chartData.radarData = F(l, e, n, a, t), _(e.series, e, n, a), w(0, a);
            },
            onAnimationFinish: function() {
                r.event.trigger("renderComplete");
            }
        });
    }
}

function H() {
    this.events = {};
}

k.prototype.stop = function() {
    this.isStop = !0;
}, H.prototype.addEventListener = function(t, e) {
    this.events[t] = this.events[t] || [], this.events[t].push(e);
}, H.prototype.trigger = function() {
    for (var t = arguments.length, e = Array(t), i = 0; i < t; i++) e[i] = arguments[i];
    var n = e[0], a = e.slice(1);
    this.events[n] && this.events[n].forEach(function(t) {
        try {
            t.apply(null, a);
        } catch (t) {
            console.error(t);
        }
    });
};

var I = function(i) {
    i.title = i.title || {}, i.subtitle = i.subtitle || {}, i.yAxis = i.yAxis || {}, 
    i.xAxis = i.xAxis || {}, i.extra = i.extra || {}, i.legend = !1 !== i.legend, i.animation = !1 !== i.animation;
    var n = e({}, t);
    n.yAxisTitleWidth = !0 !== i.yAxis.disabled && i.yAxis.title ? n.yAxisTitleWidth : 0, 
    n.pieChartLinePadding = !1 === i.dataLabel ? 0 : n.pieChartLinePadding, n.pieChartTextPadding = !1 === i.dataLabel ? 0 : n.pieChartTextPadding, 
    this.opts = i, this.config = n, this.context = wx.createCanvasContext(i.canvasId), 
    this.chartData = {}, this.event = new H(), this.scrollOption = {
        currentOffset: 0,
        startTouchX: 0,
        distance: 0
    }, C.call(this, i.type, i, n, this.context);
};

I.prototype.updateData = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    this.opts.series = t.series || this.opts.series, this.opts.categories = t.categories || this.opts.categories, 
    this.opts.title = e({}, this.opts.title, t.title || {}), this.opts.subtitle = e({}, this.opts.subtitle, t.subtitle || {}), 
    C.call(this, this.opts.type, this.opts, this.config, this.context);
}, I.prototype.stopAnimation = function() {
    this.animationInstance && this.animationInstance.stop();
}, I.prototype.addEventListener = function(t, e) {
    this.event.addEventListener(t, e);
}, I.prototype.getCurrentDataIndex = function(t) {
    var e = t.touches && t.touches.length ? t.touches : t.changedTouches;
    if (e && e.length) {
        var i = e[0], n = i.x, o = i.y;
        return "pie" === this.opts.type || "ring" === this.opts.type ? function(t, e) {
            var i = -1;
            if (h(t, e.center, e.radius)) {
                var n = Math.atan2(e.center.y - t.y, t.x - e.center.x);
                n = -n;
                for (var o = 0, r = e.series.length; o < r; o++) {
                    var s = e.series[o];
                    if (a(n, s._start_, s._start_ + 2 * s._proportion_ * Math.PI)) {
                        i = o;
                        break;
                    }
                }
            }
            return i;
        }({
            x: n,
            y: o
        }, this.chartData.pieData) : "radar" === this.opts.type ? function(t, e, i) {
            var n = 2 * Math.PI / i, a = -1;
            if (h(t, e.center, e.radius)) {
                var o = function(t) {
                    return t < 0 && (t += 2 * Math.PI), t > 2 * Math.PI && (t -= 2 * Math.PI), t;
                }, r = Math.atan2(e.center.y - t.y, t.x - e.center.x);
                (r *= -1) < 0 && (r += 2 * Math.PI), e.angleList.map(function(t) {
                    return t = o(-1 * t);
                }).forEach(function(t, e) {
                    var i = o(t - n / 2), s = o(t + n / 2);
                    s < i && (s += 2 * Math.PI), (r >= i && r <= s || r + 2 * Math.PI >= i && r + 2 * Math.PI <= s) && (a = e);
                });
            }
            return a;
        }({
            x: n,
            y: o
        }, this.chartData.radarData, this.opts.categories.length) : function(t, e, i, n) {
            var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0, o = -1;
            return function(t, e, i) {
                return t.x < e.width - i.padding && t.x > i.padding + i.yAxisWidth + i.yAxisTitleWidth && t.y > i.padding && t.y < e.height - i.legendHeight - i.xAxisHeight - i.padding;
            }(t, i, n) && e.forEach(function(e, i) {
                t.x + a > e && (o = i);
            }), o;
        }({
            x: n,
            y: o
        }, this.chartData.xAxisPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
    }
    return -1;
}, I.prototype.showToolTip = function(t) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if ("line" === this.opts.type || "area" === this.opts.type) {
        var n = this.getCurrentDataIndex(t), a = this.scrollOption.currentOffset, o = e({}, this.opts, {
            _scrollDistance_: a,
            animation: !1
        });
        if (n > -1) {
            var r = function(t, e) {
                var i = [];
                return t.forEach(function(t) {
                    if (null !== t.data[e] && void 0 !== t.data[e]) {
                        var n = {};
                        n.color = t.color, n.name = t.name, n.data = t.format ? t.format(t.data[e]) : t.data[e], 
                        i.push(n);
                    }
                }), i;
            }(this.opts.series, n);
            if (0 !== r.length) {
                var s = function(t, e, i, n) {
                    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}, o = t.map(function(t) {
                        return {
                            text: a.format ? a.format(t, n[i]) : t.name + ": " + t.data,
                            color: t.color
                        };
                    }), r = [], s = {
                        x: 0,
                        y: 0
                    };
                    return e.forEach(function(t) {
                        void 0 !== t[i] && null !== t[i] && r.push(t[i]);
                    }), r.forEach(function(t) {
                        s.x = Math.round(t.x), s.y += t.y;
                    }), s.y /= r.length, {
                        textList: o,
                        offset: s
                    };
                }(r, this.chartData.calPoints, n, this.opts.categories, i), l = s.textList, h = s.offset;
                o.tooltip = {
                    textList: l,
                    offset: h,
                    option: i
                };
            }
        }
        C.call(this, o.type, o, this.config, this.context);
    }
}, I.prototype.scrollStart = function(t) {
    t.touches[0] && !0 === this.opts.enableScroll && (this.scrollOption.startTouchX = t.touches[0].x);
}, I.prototype.scroll = function(t) {
    if (t.touches[0] && !0 === this.opts.enableScroll) {
        var i = t.touches[0].x - this.scrollOption.startTouchX, n = this.scrollOption.currentOffset, a = function(t, e, i, n) {
            var a = n.width - i.padding - e.xAxisPoints[0], o = e.eachSpacing * n.categories.length, r = t;
            return t >= 0 ? r = 0 : Math.abs(t) >= o - a && (r = a - o), r;
        }(n + i, this.chartData, this.config, this.opts);
        this.scrollOption.distance = i = a - n;
        var o = e({}, this.opts, {
            _scrollDistance_: n + i,
            animation: !1
        });
        C.call(this, o.type, o, this.config, this.context);
    }
}, I.prototype.scrollEnd = function(t) {
    if (!0 === this.opts.enableScroll) {
        var e = this.scrollOption, i = e.currentOffset, n = e.distance;
        this.scrollOption.currentOffset = i + n, this.scrollOption.distance = 0;
    }
}, module.exports = I;