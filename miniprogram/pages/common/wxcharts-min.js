function t(t, e) {
    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
    for (var i = Object(t), n = 1; n < arguments.length; n++) {
        var a = arguments[n];
        if (null != a) for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (i[o] = a[o]);
    }
    return i;
}

function e(t, e, i) {
    if (isNaN(t)) throw new Error("[wxCharts] unvalid series data!");
    i = i || 10, e = e || "upper";
    for (var n = 1; i < 1; ) i *= 10, n *= 10;
    for (t = "upper" === e ? Math.ceil(t * n) : Math.floor(t * n); t % i != 0; ) "upper" === e ? t++ : t--;
    return t / n;
}

function i(t, e, i) {
    function n(t) {
        for (;t < 0; ) t += 2 * Math.PI;
        for (;t > 2 * Math.PI; ) t -= 2 * Math.PI;
        return t;
    }
    return t = n(t), (e = n(e)) > (i = n(i)) && (i += 2 * Math.PI, t < e && (t += 2 * Math.PI)), 
    t >= e && t <= i;
}

function n(t, e) {
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

function a(t, e, i) {
    return {
        x: i.x + t,
        y: i.y - e
    };
}

function o(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10, i = (t = (t = String(t)).split(""), 
    0);
    return t.forEach(function(t) {
        /[a-zA-Z]/.test(t) ? i += 7 : /[0-9]/.test(t) ? i += 5.5 : /\./.test(t) ? i += 2.7 : /-/.test(t) ? i += 3.25 : /[\u4e00-\u9fa5]/.test(t) ? i += 10 : /\(|\)/.test(t) ? i += 3.73 : /\s/.test(t) ? i += 2.5 : /%/.test(t) ? i += 8 : i += 10;
    }), i * e / 10;
}

function r(t) {
    return t.reduce(function(t, e) {
        return (t.data ? t.data : t).concat(e.data);
    }, []);
}

function s(t, e, i) {
    return Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2) <= Math.pow(i, 2);
}

function l(t) {
    var e = [], i = [];
    return t.forEach(function(t, n) {
        null !== t ? i.push(t) : (i.length && e.push(i), i = []);
    }), i.length && e.push(i), e;
}

function h(t, e, i) {
    if (!1 === e.legend) return {
        legendList: [],
        legendHeight: 0
    };
    var n = [], a = 0, r = [];
    return t.forEach(function(t) {
        var i = 30 + o(t.name || "undefined");
        a + i > e.width ? (n.push(r), a = i, r = [ t ]) : (a += i, r.push(t));
    }), r.length && n.push(r), {
        legendList: n,
        legendHeight: n.length * (i.fontSize + 8) + 5
    };
}

function c(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, i = 0, n = 0;
    return t.forEach(function(t) {
        t.data = null === t.data ? 0 : t.data, i += t.data;
    }), t.forEach(function(t) {
        t.data = null === t.data ? 0 : t.data, t._proportion_ = t.data / i * e;
    }), t.forEach(function(t) {
        t._start_ = n, n += 2 * t._proportion_ * Math.PI;
    }), t;
}

function f(t, e, i, n, a, o) {
    return t.map(function(t) {
        return null === t ? null : (t.width = (e - 2 * a.columePadding) / i, o.extra.column && o.extra.column.width && +o.extra.column.width > 0 ? t.width = Math.min(t.width, +o.extra.column.width) : t.width = Math.min(t.width, 25), 
        t.x += (n + .5 - i / 2) * t.width, t);
    });
}

function d(t, e, i) {
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

function x(t, e, i, n, a, o, r) {
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

function u(t, i, n) {
    var a = r(t);
    a = a.filter(function(t) {
        return null !== t;
    });
    var o = Math.min.apply(this, a), s = Math.max.apply(this, a);
    if ("number" == typeof i.yAxis.min && (o = Math.min(i.yAxis.min, o)), "number" == typeof i.yAxis.max && (s = Math.max(i.yAxis.max, s)), 
    o === s) {
        var l = s || 1;
        o -= l, s += l;
    }
    for (var h = function(t, i) {
        var n, a = i - t;
        return {
            minRange: e(t, "lower", n = a >= 1e4 ? 1e3 : a >= 1e3 ? 100 : a >= 100 ? 10 : a >= 10 ? 5 : a >= 1 ? 1 : a >= .1 ? .1 : .01),
            maxRange: e(i, "upper", n)
        };
    }(o, s), c = h.minRange, f = [], d = (h.maxRange - c) / n.yAxisSplit, x = 0; x <= n.yAxisSplit; x++) f.push(c + d * x);
    return f.reverse();
}

function g(t, e, i) {
    var n = u(t, e, i), a = i.yAxisWidth, r = n.map(function(t) {
        return t = C.toFixed(t, 2), t = e.yAxis.format ? e.yAxis.format(Number(t)) : t, 
        a = Math.max(a, o(t) + 5), t;
    });
    return !0 === e.yAxis.disabled && (a = 0), {
        rangesFormat: r,
        ranges: n,
        yAxisWidth: a
    };
}

function p(t, e, i, n) {
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

function y(t, e, i, n) {
    var a = e.data;
    n.beginPath(), n.setFontSize(i.fontSize), n.setFillStyle("#666666"), t.forEach(function(t, i) {
        if (null !== t) {
            var r = e.format ? e.format(a[i]) : a[i];
            n.fillText(r, t.x - o(r) / 2, t.y - 2);
        }
    }), n.closePath(), n.stroke();
}

function v(t, e, i, n, r, s) {
    var l = r + i.pieChartLinePadding, h = [], c = null;
    t.map(function(t) {
        return {
            arc: 2 * Math.PI - (t._start_ + 2 * Math.PI * t._proportion_ / 2),
            text: t.format ? t.format(+t._proportion_.toFixed(2)) : C.toFixed(100 * t._proportion_) + "%",
            color: t.color
        };
    }).forEach(function(t) {
        var e = Math.cos(t.arc) * l, n = Math.sin(t.arc) * l, a = Math.cos(t.arc) * r, s = Math.sin(t.arc) * r, f = e >= 0 ? e + i.pieChartTextPadding : e - i.pieChartTextPadding, d = n, x = o(t.text), u = d;
        c && C.isSameXCoordinateArea(c.start, {
            x: f
        }) && (u = f > 0 ? Math.min(d, c.start.y) : e < 0 ? Math.max(d, c.start.y) : d > 0 ? Math.max(d, c.start.y) : Math.min(d, c.start.y)), 
        f < 0 && (f -= x);
        var g = {
            lineStart: {
                x: a,
                y: s
            },
            lineEnd: {
                x: e,
                y: n
            },
            start: {
                x: f,
                y: u
            },
            width: x,
            height: i.fontSize,
            text: t.text,
            color: t.color
        };
        c = function(t, e) {
            if (e) for (;C.isCollision(t, e); ) t.start.x > 0 ? t.start.y-- : t.start.x < 0 ? t.start.y++ : t.start.y > 0 ? t.start.y++ : t.start.y--;
            return t;
        }(g, c), h.push(c);
    }), h.forEach(function(t) {
        var e = a(t.lineStart.x, t.lineStart.y, s), o = a(t.lineEnd.x, t.lineEnd.y, s), r = a(t.start.x, t.start.y, s);
        n.setLineWidth(1), n.setFontSize(i.fontSize), n.beginPath(), n.setStrokeStyle(t.color), 
        n.setFillStyle(t.color), n.moveTo(e.x, e.y);
        var l = t.start.x < 0 ? r.x + t.width : r.x, h = t.start.x < 0 ? r.x - 5 : r.x + 5;
        n.quadraticCurveTo(o.x, o.y, l, r.y), n.moveTo(e.x, e.y), n.stroke(), n.closePath(), 
        n.beginPath(), n.moveTo(r.x + t.width, r.y), n.arc(l, r.y, 2, 0, 2 * Math.PI), n.closePath(), 
        n.fill(), n.beginPath(), n.setFillStyle("#666666"), n.fillText(t.text, h, r.y + 3), 
        n.closePath(), n.stroke(), n.closePath();
    });
}

function m(t, e, i, n) {
    var a = i.padding, o = e.height - i.padding - i.xAxisHeight - i.legendHeight;
    n.beginPath(), n.setStrokeStyle("#cccccc"), n.setLineWidth(1), n.moveTo(t, a), n.lineTo(t, o), 
    n.stroke(), n.closePath();
}

function P(e, i, n, a) {
    n.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && n.translate(e._scrollDistance_, 0), 
    e.tooltip && e.tooltip.textList && e.tooltip.textList.length && 1 === a && function(e, i, n, a, r) {
        var s = !1;
        (i = t({
            x: 0,
            y: 0
        }, i)).y -= 8;
        var l = e.map(function(t) {
            return o(t.text);
        }), h = 9 + 4 * a.toolTipPadding + Math.max.apply(null, l), c = 2 * a.toolTipPadding + e.length * a.toolTipLineHeight;
        i.x - Math.abs(n._scrollDistance_) + 8 + h > n.width && (s = !0), r.beginPath(), 
        r.setFillStyle(n.tooltip.option.background || a.toolTipBackground), r.setGlobalAlpha(a.toolTipOpacity), 
        s ? (r.moveTo(i.x, i.y + 10), r.lineTo(i.x - 8, i.y + 10 - 5), r.lineTo(i.x - 8, i.y + 10 + 5), 
        r.moveTo(i.x, i.y + 10), r.fillRect(i.x - h - 8, i.y, h, c)) : (r.moveTo(i.x, i.y + 10), 
        r.lineTo(i.x + 8, i.y + 10 - 5), r.lineTo(i.x + 8, i.y + 10 + 5), r.moveTo(i.x, i.y + 10), 
        r.fillRect(i.x + 8, i.y, h, c)), r.closePath(), r.fill(), r.setGlobalAlpha(1), e.forEach(function(t, e) {
            r.beginPath(), r.setFillStyle(t.color);
            var n = i.x + 8 + 2 * a.toolTipPadding, o = i.y + (a.toolTipLineHeight - a.fontSize) / 2 + a.toolTipLineHeight * e + a.toolTipPadding;
            s && (n = i.x - h - 8 + 2 * a.toolTipPadding), r.fillRect(n, o, 4, a.fontSize), 
            r.closePath();
        }), r.beginPath(), r.setFontSize(a.fontSize), r.setFillStyle("#ffffff"), e.forEach(function(t, e) {
            var n = i.x + 8 + 2 * a.toolTipPadding + 4 + 5;
            s && (n = i.x - h - 8 + 2 * a.toolTipPadding + 4 + 5);
            var o = i.y + (a.toolTipLineHeight - a.fontSize) / 2 + a.toolTipLineHeight * e + a.toolTipPadding;
            r.fillText(t.text, n, o + a.fontSize);
        }), r.stroke(), r.closePath();
    }(e.tooltip.textList, e.tooltip.offset, e, i, n), n.restore();
}

function S(t, e, i, n) {
    var a = d(t, e, i), r = a.xAxisPoints, s = (a.startX, a.endX, a.eachSpacing), l = e.height - i.padding - i.xAxisHeight - i.legendHeight, h = l + i.xAxisLineHeight;
    n.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && n.translate(e._scrollDistance_, 0), 
    n.beginPath(), n.setStrokeStyle(e.xAxis.gridColor || "#cccccc"), !0 !== e.xAxis.disableGrid && ("calibration" === e.xAxis.type ? r.forEach(function(t, e) {
        e > 0 && (n.moveTo(t - s / 2, l), n.lineTo(t - s / 2, l + 4));
    }) : r.forEach(function(t, e) {
        n.moveTo(t, l), n.lineTo(t, h);
    })), n.closePath(), n.stroke();
    var c = e.width - 2 * i.padding - i.yAxisWidth - i.yAxisTitleWidth, f = Math.min(t.length, Math.ceil(c / i.fontSize / 1.5)), x = Math.ceil(t.length / f);
    t = t.map(function(t, e) {
        return e % x != 0 ? "" : t;
    }), 0 === i._xAxisTextAngle_ ? (n.beginPath(), n.setFontSize(i.fontSize), n.setFillStyle(e.xAxis.fontColor || "#666666"), 
    t.forEach(function(t, e) {
        var a = s / 2 - o(t) / 2;
        n.fillText(t, r[e] + a, l + i.fontSize + 5);
    }), n.closePath(), n.stroke()) : t.forEach(function(t, a) {
        n.save(), n.beginPath(), n.setFontSize(i.fontSize), n.setFillStyle(e.xAxis.fontColor || "#666666");
        var h = o(t), c = s / 2 - h, f = function(t, e, i) {
            var n = t, a = i - e, o = n + (i - a - n) / Math.sqrt(2);
            return {
                transX: o *= -1,
                transY: (i - a) * (Math.sqrt(2) - 1) - (i - a - n) / Math.sqrt(2)
            };
        }(r[a] + s / 2, l + i.fontSize / 2 + 5, e.height), d = f.transX, x = f.transY;
        n.rotate(-1 * i._xAxisTextAngle_), n.translate(d, x), n.fillText(t, r[a] + c, l + i.fontSize + 5), 
        n.closePath(), n.stroke(), n.restore();
    }), n.restore();
}

function T(t, e, i) {
    for (var n = t.height - 2 * e.padding - e.xAxisHeight - e.legendHeight, a = Math.floor(n / e.yAxisSplit), o = e.yAxisWidth + e.yAxisTitleWidth, r = e.padding + o, s = t.width - e.padding, l = [], h = 0; h < e.yAxisSplit; h++) l.push(e.padding + a * h);
    l.push(e.padding + a * e.yAxisSplit + 2), i.beginPath(), i.setStrokeStyle(t.yAxis.gridColor || "#cccccc"), 
    i.setLineWidth(1), l.forEach(function(t, e) {
        i.moveTo(r, t), i.lineTo(s, t);
    }), i.closePath(), i.stroke();
}

function A(t, e, i, n) {
    if (!0 !== e.yAxis.disabled) {
        var a = g(t, e, i).rangesFormat, r = i.yAxisWidth + i.yAxisTitleWidth, s = e.height - 2 * i.padding - i.xAxisHeight - i.legendHeight, l = Math.floor(s / i.yAxisSplit), h = i.padding + r, c = e.width - i.padding, f = e.height - i.padding - i.xAxisHeight - i.legendHeight;
        n.setFillStyle(e.background || "#ffffff"), e._scrollDistance_ < 0 && n.fillRect(0, 0, h, f + i.xAxisHeight + 5), 
        n.fillRect(c, 0, e.width, f + i.xAxisHeight + 5);
        for (var d = [], x = 0; x <= i.yAxisSplit; x++) d.push(i.padding + l * x);
        n.stroke(), n.beginPath(), n.setFontSize(i.fontSize), n.setFillStyle(e.yAxis.fontColor || "#666666"), 
        a.forEach(function(t, e) {
            var a = d[e] ? d[e] : f;
            n.fillText(t, i.padding + i.yAxisTitleWidth, a + i.fontSize / 2);
        }), n.closePath(), n.stroke(), e.yAxis.title && function(t, e, i, n) {
            var a = i.xAxisHeight + (e.height - i.xAxisHeight - o(t)) / 2;
            n.save(), n.beginPath(), n.setFontSize(i.fontSize), n.setFillStyle(e.yAxis.titleFontColor || "#333333"), 
            n.translate(0, e.height), n.rotate(-90 * Math.PI / 180), n.fillText(t, a, i.padding + .5 * i.fontSize), 
            n.stroke(), n.closePath(), n.restore();
        }(e.yAxis.title, e, i, n);
    }
}

function b(t, e, i, n) {
    e.legend && h(t, e, i).legendList.forEach(function(t, a) {
        var r = 0;
        t.forEach(function(t) {
            t.name = t.name || "undefined", r += 15 + o(t.name) + 15;
        });
        var s = (e.width - r) / 2 + 5, l = e.height - i.padding - i.legendHeight + a * (i.fontSize + 8) + 5 + 8;
        n.setFontSize(i.fontSize), t.forEach(function(t) {
            switch (e.type) {
              case "line":
                n.beginPath(), n.setLineWidth(1), n.setStrokeStyle(t.color), n.moveTo(s - 2, l + 5), 
                n.lineTo(s + 17, l + 5), n.stroke(), n.closePath(), n.beginPath(), n.setLineWidth(1), 
                n.setStrokeStyle("#ffffff"), n.setFillStyle(t.color), n.moveTo(s + 7.5, l + 5), 
                n.arc(s + 7.5, l + 5, 4, 0, 2 * Math.PI), n.fill(), n.stroke(), n.closePath();
                break;

              case "pie":
              case "ring":
                n.beginPath(), n.setFillStyle(t.color), n.moveTo(s + 7.5, l + 5), n.arc(s + 7.5, l + 5, 7, 0, 2 * Math.PI), 
                n.closePath(), n.fill();
                break;

              default:
                n.beginPath(), n.setFillStyle(t.color), n.moveTo(s, l), n.rect(s, l, 15, 10), n.closePath(), 
                n.fill();
            }
            s += 20, n.beginPath(), n.setFillStyle(e.extra.legendTextColor || "#333333"), n.fillText(t.name, s, l + 9), 
            n.closePath(), n.stroke(), s += o(t.name) + 10;
        });
    });
}

function M(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, r = e.extra.pie || {};
    t = c(t, a);
    var s = {
        x: e.width / 2,
        y: (e.height - i.legendHeight) / 2
    }, l = Math.min(s.x - i.pieChartLinePadding - i.pieChartTextPadding - i._pieTextMaxLength_, s.y - i.pieChartLinePadding - i.pieChartTextPadding);
    if (e.dataLabel ? l -= 10 : l -= 2 * i.padding, (t = t.map(function(t) {
        return t._start_ += (r.offsetAngle || 0) * Math.PI / 180, t;
    })).forEach(function(t) {
        n.beginPath(), n.setLineWidth(2), n.setStrokeStyle("#ffffff"), n.setFillStyle(t.color), 
        n.moveTo(s.x, s.y), n.arc(s.x, s.y, l, t._start_, t._start_ + 2 * t._proportion_ * Math.PI), 
        n.closePath(), n.fill(), !0 !== e.disablePieStroke && n.stroke();
    }), "ring" === e.type) {
        var h = .6 * l;
        "number" == typeof e.extra.ringWidth && e.extra.ringWidth > 0 && (h = Math.max(0, l - e.extra.ringWidth)), 
        n.beginPath(), n.setFillStyle(e.background || "#ffffff"), n.moveTo(s.x, s.y), n.arc(s.x, s.y, h, 0, 2 * Math.PI), 
        n.closePath(), n.fill();
    }
    if (!1 !== e.dataLabel && 1 === a) {
        for (var f = !1, d = 0, x = t.length; d < x; d++) if (t[d].data > 0) {
            f = !0;
            break;
        }
        f && v(t, 0, i, n, l, s);
    }
    return 1 === a && "ring" === e.type && function(t, e, i) {
        var n = t.title.fontSize || e.titleFontSize, a = t.subtitle.fontSize || e.subtitleFontSize, r = t.title.name || "", s = t.subtitle.name || "", l = t.title.color || e.titleColor, h = t.subtitle.color || e.subtitleColor, c = r ? n : 0, f = s ? a : 0;
        if (s) {
            var d = o(s, a), x = (t.width - d) / 2 + (t.subtitle.offsetX || 0), u = (t.height - e.legendHeight + a) / 2;
            r && (u -= (c + 5) / 2), i.beginPath(), i.setFontSize(a), i.setFillStyle(h), i.fillText(s, x, u), 
            i.stroke(), i.closePath();
        }
        if (r) {
            var g = o(r, n), p = (t.width - g) / 2 + (t.title.offsetX || 0), y = (t.height - e.legendHeight + n) / 2;
            s && (y += (f + 5) / 2), i.beginPath(), i.setFontSize(n), i.setFillStyle(l), i.fillText(r, p, y), 
            i.stroke(), i.closePath();
        }
    }(e, i, n), {
        center: s,
        radius: l,
        series: t
    };
}

function _(t, e, i, n) {
    var s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, l = e.extra.radar || {}, h = function(t) {
        for (var e = 2 * Math.PI / t, i = [], n = 0; n < t; n++) i.push(e * n);
        return i.map(function(t) {
            return -1 * t + Math.PI / 2;
        });
    }(e.categories.length), c = {
        x: e.width / 2,
        y: (e.height - i.legendHeight) / 2
    }, f = Math.min(c.x - (function(t) {
        var e = t.map(function(t) {
            return o(t);
        });
        return Math.max.apply(null, e);
    }(e.categories) + i.radarLabelTextMargin), c.y - i.radarLabelTextMargin);
    f -= i.padding, n.beginPath(), n.setLineWidth(1), n.setStrokeStyle(l.gridColor || "#cccccc"), 
    h.forEach(function(t) {
        var e = a(f * Math.cos(t), f * Math.sin(t), c);
        n.moveTo(c.x, c.y), n.lineTo(e.x, e.y);
    }), n.stroke(), n.closePath();
    for (var d = 1; d <= i.radarGridCount; d++) !function(t) {
        var e = {};
        n.beginPath(), n.setLineWidth(1), n.setStrokeStyle(l.gridColor || "#cccccc"), h.forEach(function(o, r) {
            var s = a(f / i.radarGridCount * t * Math.cos(o), f / i.radarGridCount * t * Math.sin(o), c);
            0 === r ? (e = s, n.moveTo(s.x, s.y)) : n.lineTo(s.x, s.y);
        }), n.lineTo(e.x, e.y), n.stroke(), n.closePath();
    }(d);
    return function(t, e, i, n, o) {
        var s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1, l = o.extra.radar || {};
        l.max = l.max || 0;
        var h = Math.max(l.max, Math.max.apply(null, r(n))), c = [];
        return n.forEach(function(n) {
            var o = {};
            o.color = n.color, o.data = [], n.data.forEach(function(n, r) {
                var l = {};
                l.angle = t[r], l.proportion = n / h, l.position = a(i * l.proportion * s * Math.cos(l.angle), i * l.proportion * s * Math.sin(l.angle), e), 
                o.data.push(l);
            }), c.push(o);
        }), c;
    }(h, c, f, t, e, s).forEach(function(t, a) {
        if (n.beginPath(), n.setFillStyle(t.color), n.setGlobalAlpha(.6), t.data.forEach(function(t, e) {
            0 === e ? n.moveTo(t.position.x, t.position.y) : n.lineTo(t.position.x, t.position.y);
        }), n.closePath(), n.fill(), n.setGlobalAlpha(1), !1 !== e.dataPointShape) {
            var o = i.dataPointShape[a % i.dataPointShape.length];
            p(t.data.map(function(t) {
                return t.position;
            }), t.color, o, n);
        }
    }), function(t, e, i, n, r, s) {
        var l = n.extra.radar || {};
        e += r.radarLabelTextMargin, s.beginPath(), s.setFontSize(r.fontSize), s.setFillStyle(l.labelColor || "#666666"), 
        t.forEach(function(t, l) {
            var h = {
                x: e * Math.cos(t),
                y: e * Math.sin(t)
            }, c = a(h.x, h.y, i), f = c.x, d = c.y;
            C.approximatelyEqual(h.x, 0) ? f -= o(n.categories[l] || "") / 2 : h.x < 0 && (f -= o(n.categories[l] || "")), 
            s.fillText(n.categories[l] || "", f, d + r.fontSize / 2);
        }), s.stroke(), s.closePath();
    }(h, f, c, e, i, n), {
        center: c,
        radius: f,
        angleList: h
    };
}

function E(t, e) {
    e.draw();
}

function F(t) {
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
            o = (0, H[t.timing])(o), t.onProcess && t.onProcess(o), e(n, 17);
        } else t.onProcess && t.onProcess(1), t.onAnimationFinish && t.onAnimationFinish();
    };
    n = n.bind(this), e(n, 17);
}

function w(t, e, i, a) {
    var r = this, s = e.series, u = e.categories, v = h(s = function(t, e) {
        var i = 0;
        return t.map(function(t) {
            return t.color || (t.color = e.colors[i], i = (i + 1) % e.colors.length), t;
        });
    }(s, i), e, i).legendHeight;
    i.legendHeight = v;
    var w = g(s, e, i).yAxisWidth;
    if (i.yAxisWidth = w, u && u.length) {
        var L = function(t, e, i) {
            var n = {
                angle: 0,
                xAxisHeight: i.xAxisHeight
            }, a = d(t, e, i).eachSpacing, r = t.map(function(t) {
                return o(t);
            }), s = Math.max.apply(this, r);
            return s + 2 * i.xAxisTextPadding > a && (n.angle = 45 * Math.PI / 180, n.xAxisHeight = 2 * i.xAxisTextPadding + s * Math.sin(n.angle)), 
            n;
        }(u, e, i), k = L.xAxisHeight, H = L.angle;
        i.xAxisHeight = k, i._xAxisTextAngle_ = H;
    }
    "pie" !== t && "ring" !== t || (i._pieTextMaxLength_ = !1 === e.dataLabel ? 0 : function(t) {
        t = c(t);
        var e = 0;
        return t.forEach(function(t) {
            var i = t.format ? t.format(+t._proportion_.toFixed(2)) : C.toFixed(100 * t._proportion_) + "%";
            e = Math.max(e, o(i));
        }), e;
    }(s));
    var I = e.animation ? 1e3 : 0;
    switch (this.animationInstance && this.animationInstance.stop(), t) {
      case "line":
        this.animationInstance = new F({
            timing: "easeIn",
            duration: I,
            onProcess: function(t) {
                T(e, i, a);
                var o = function(t, e, i, a) {
                    var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, r = g(t, e, i).ranges, s = d(e.categories, e, i), h = s.xAxisPoints, c = s.eachSpacing, f = r.pop(), u = r.shift(), v = [];
                    return a.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && a.translate(e._scrollDistance_, 0), 
                    e.tooltip && e.tooltip.textList && e.tooltip.textList.length && 1 === o && m(e.tooltip.offset.x, e, i, a), 
                    t.forEach(function(t, r) {
                        var s = x(t.data, f, u, h, c, e, i, o);
                        if (v.push(s), l(s).forEach(function(i, o) {
                            a.beginPath(), a.setStrokeStyle(t.color), a.setLineWidth(2), 1 === i.length ? (a.moveTo(i[0].x, i[0].y), 
                            a.arc(i[0].x, i[0].y, 1, 0, 2 * Math.PI)) : (a.moveTo(i[0].x, i[0].y), "curve" === e.extra.lineStyle ? i.forEach(function(t, e) {
                                if (e > 0) {
                                    var o = n(i, e - 1);
                                    a.bezierCurveTo(o.ctrA.x, o.ctrA.y, o.ctrB.x, o.ctrB.y, t.x, t.y);
                                }
                            }) : i.forEach(function(t, e) {
                                e > 0 && a.lineTo(t.x, t.y);
                            }), a.moveTo(i[0].x, i[0].y)), a.closePath(), a.stroke();
                        }), !1 !== e.dataPointShape) {
                            var d = i.dataPointShape[r % i.dataPointShape.length];
                            p(s, t.color, d, a);
                        }
                    }), !1 !== e.dataLabel && 1 === o && t.forEach(function(t, n) {
                        y(x(t.data, f, u, h, c, e, i, o), t, i, a);
                    }), a.restore(), {
                        xAxisPoints: h,
                        calPoints: v,
                        eachSpacing: c
                    };
                }(s, e, i, a, t), h = o.xAxisPoints, c = o.calPoints, f = o.eachSpacing;
                r.chartData.xAxisPoints = h, r.chartData.calPoints = c, r.chartData.eachSpacing = f, 
                S(u, e, i, a), b(e.series, e, i, a), A(s, e, i, a), P(e, i, a, t), E(0, a);
            },
            onAnimationFinish: function() {
                r.event.trigger("renderComplete");
            }
        });
        break;

      case "column":
        this.animationInstance = new F({
            timing: "easeIn",
            duration: I,
            onProcess: function(t) {
                T(e, i, a);
                var n = function(t, e, i, n) {
                    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, o = g(t, e, i).ranges, r = d(e.categories, e, i), s = r.xAxisPoints, l = r.eachSpacing, h = o.pop(), c = o.shift();
                    return n.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && n.translate(e._scrollDistance_, 0), 
                    t.forEach(function(o, r) {
                        var d = x(o.data, h, c, s, l, e, i, a);
                        d = f(d, l, t.length, r, i, e), n.beginPath(), n.setFillStyle(o.color), d.forEach(function(t, a) {
                            if (null !== t) {
                                var o = t.x - t.width / 2 + 1, r = e.height - t.y - i.padding - i.xAxisHeight - i.legendHeight;
                                n.moveTo(o, t.y), n.rect(o, t.y, t.width - 2, r);
                            }
                        }), n.closePath(), n.fill();
                    }), t.forEach(function(o, r) {
                        var d = x(o.data, h, c, s, l, e, i, a);
                        d = f(d, l, t.length, r, i, e), !1 !== e.dataLabel && 1 === a && y(d, o, i, n);
                    }), n.restore(), {
                        xAxisPoints: s,
                        eachSpacing: l
                    };
                }(s, e, i, a, t), o = n.xAxisPoints, l = n.eachSpacing;
                r.chartData.xAxisPoints = o, r.chartData.eachSpacing = l, S(u, e, i, a), b(e.series, e, i, a), 
                A(s, e, i, a), E(0, a);
            },
            onAnimationFinish: function() {
                r.event.trigger("renderComplete");
            }
        });
        break;

      case "area":
        this.animationInstance = new F({
            timing: "easeIn",
            duration: I,
            onProcess: function(t) {
                T(e, i, a);
                var o = function(t, e, i, a) {
                    var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, r = g(t, e, i).ranges, s = d(e.categories, e, i), h = s.xAxisPoints, c = s.eachSpacing, f = r.pop(), u = r.shift(), v = e.height - i.padding - i.xAxisHeight - i.legendHeight, P = [];
                    return a.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && a.translate(e._scrollDistance_, 0), 
                    e.tooltip && e.tooltip.textList && e.tooltip.textList.length && 1 === o && m(e.tooltip.offset.x, e, i, a), 
                    t.forEach(function(t, r) {
                        var s = x(t.data, f, u, h, c, e, i, o);
                        if (P.push(s), l(s).forEach(function(i) {
                            if (a.beginPath(), a.setStrokeStyle(t.color), a.setFillStyle(t.color), a.setGlobalAlpha(.6), 
                            a.setLineWidth(2), i.length > 1) {
                                var o = i[0], r = i[i.length - 1];
                                a.moveTo(o.x, o.y), "curve" === e.extra.lineStyle ? i.forEach(function(t, e) {
                                    if (e > 0) {
                                        var o = n(i, e - 1);
                                        a.bezierCurveTo(o.ctrA.x, o.ctrA.y, o.ctrB.x, o.ctrB.y, t.x, t.y);
                                    }
                                }) : i.forEach(function(t, e) {
                                    e > 0 && a.lineTo(t.x, t.y);
                                }), a.lineTo(r.x, v), a.lineTo(o.x, v), a.lineTo(o.x, o.y);
                            } else {
                                var s = i[0];
                                a.moveTo(s.x - c / 2, s.y), a.lineTo(s.x + c / 2, s.y), a.lineTo(s.x + c / 2, v), 
                                a.lineTo(s.x - c / 2, v), a.moveTo(s.x - c / 2, s.y);
                            }
                            a.closePath(), a.fill(), a.setGlobalAlpha(1);
                        }), !1 !== e.dataPointShape) {
                            var d = i.dataPointShape[r % i.dataPointShape.length];
                            p(s, t.color, d, a);
                        }
                    }), !1 !== e.dataLabel && 1 === o && t.forEach(function(t, n) {
                        y(x(t.data, f, u, h, c, e, i, o), t, i, a);
                    }), a.restore(), {
                        xAxisPoints: h,
                        calPoints: P,
                        eachSpacing: c
                    };
                }(s, e, i, a, t), h = o.xAxisPoints, c = o.calPoints, f = o.eachSpacing;
                r.chartData.xAxisPoints = h, r.chartData.calPoints = c, r.chartData.eachSpacing = f, 
                S(u, e, i, a), b(e.series, e, i, a), A(s, e, i, a), P(e, i, a, t), E(0, a);
            },
            onAnimationFinish: function() {
                r.event.trigger("renderComplete");
            }
        });
        break;

      case "ring":
      case "pie":
        this.animationInstance = new F({
            timing: "easeInOut",
            duration: I,
            onProcess: function(t) {
                r.chartData.pieData = M(s, e, i, a, t), b(e.series, e, i, a), E(0, a);
            },
            onAnimationFinish: function() {
                r.event.trigger("renderComplete");
            }
        });
        break;

      case "radar":
        this.animationInstance = new F({
            timing: "easeInOut",
            duration: I,
            onProcess: function(t) {
                r.chartData.radarData = _(s, e, i, a, t), b(e.series, e, i, a), E(0, a);
            },
            onAnimationFinish: function() {
                r.event.trigger("renderComplete");
            }
        });
    }
}

function L() {
    this.events = {};
}

var k = {
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
}, C = {
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
}, H = {
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

F.prototype.stop = function() {
    this.isStop = !0;
}, L.prototype.addEventListener = function(t, e) {
    this.events[t] = this.events[t] || [], this.events[t].push(e);
}, L.prototype.trigger = function() {
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

var I = function(e) {
    e.title = e.title || {}, e.subtitle = e.subtitle || {}, e.yAxis = e.yAxis || {}, 
    e.xAxis = e.xAxis || {}, e.extra = e.extra || {}, e.legend = !1 !== e.legend, e.animation = !1 !== e.animation;
    var i = t({}, k);
    i.yAxisTitleWidth = !0 !== e.yAxis.disabled && e.yAxis.title ? i.yAxisTitleWidth : 0, 
    i.pieChartLinePadding = !1 === e.dataLabel ? 0 : i.pieChartLinePadding, i.pieChartTextPadding = !1 === e.dataLabel ? 0 : i.pieChartTextPadding, 
    this.opts = e, this.config = i, this.context = wx.createCanvasContext(e.canvasId), 
    this.chartData = {}, this.event = new L(), this.scrollOption = {
        currentOffset: 0,
        startTouchX: 0,
        distance: 0
    }, w.call(this, e.type, e, i, this.context);
};

I.prototype.updateData = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    this.opts.series = e.series || this.opts.series, this.opts.categories = e.categories || this.opts.categories, 
    this.opts.title = t({}, this.opts.title, e.title || {}), this.opts.subtitle = t({}, this.opts.subtitle, e.subtitle || {}), 
    w.call(this, this.opts.type, this.opts, this.config, this.context);
}, I.prototype.stopAnimation = function() {
    this.animationInstance && this.animationInstance.stop();
}, I.prototype.addEventListener = function(t, e) {
    this.event.addEventListener(t, e);
}, I.prototype.getCurrentDataIndex = function(t) {
    var e = t.touches && t.touches.length ? t.touches : t.changedTouches;
    if (e && e.length) {
        var n = e[0], a = n.x, o = n.y;
        return "pie" === this.opts.type || "ring" === this.opts.type ? function(t, e) {
            var n = -1;
            if (s(t, e.center, e.radius)) {
                var a = Math.atan2(e.center.y - t.y, t.x - e.center.x);
                a = -a;
                for (var o = 0, r = e.series.length; o < r; o++) {
                    var l = e.series[o];
                    if (i(a, l._start_, l._start_ + 2 * l._proportion_ * Math.PI)) {
                        n = o;
                        break;
                    }
                }
            }
            return n;
        }({
            x: a,
            y: o
        }, this.chartData.pieData) : "radar" === this.opts.type ? function(t, e, i) {
            var n = 2 * Math.PI / i, a = -1;
            if (s(t, e.center, e.radius)) {
                var o = function(t) {
                    return t < 0 && (t += 2 * Math.PI), t > 2 * Math.PI && (t -= 2 * Math.PI), t;
                }, r = Math.atan2(e.center.y - t.y, t.x - e.center.x);
                (r *= -1) < 0 && (r += 2 * Math.PI), e.angleList.map(function(t) {
                    return o(-1 * t);
                }).forEach(function(t, e) {
                    var i = o(t - n / 2), s = o(t + n / 2);
                    s < i && (s += 2 * Math.PI), (r >= i && r <= s || r + 2 * Math.PI >= i && r + 2 * Math.PI <= s) && (a = e);
                });
            }
            return a;
        }({
            x: a,
            y: o
        }, this.chartData.radarData, this.opts.categories.length) : function(t, e, i, n) {
            var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0, o = -1;
            return function(t, e, i) {
                return t.x < e.width - i.padding && t.x > i.padding + i.yAxisWidth + i.yAxisTitleWidth && t.y > i.padding && t.y < e.height - i.legendHeight - i.xAxisHeight - i.padding;
            }(t, i, n) && e.forEach(function(e, i) {
                t.x + a > e && (o = i);
            }), o;
        }({
            x: a,
            y: o
        }, this.chartData.xAxisPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
    }
    return -1;
}, I.prototype.showToolTip = function(e) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if ("line" === this.opts.type || "area" === this.opts.type) {
        var n = this.getCurrentDataIndex(e), a = this.scrollOption.currentOffset, o = t({}, this.opts, {
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
        w.call(this, o.type, o, this.config, this.context);
    }
}, I.prototype.scrollStart = function(t) {
    t.touches[0] && !0 === this.opts.enableScroll && (this.scrollOption.startTouchX = t.touches[0].x);
}, I.prototype.scroll = function(e) {
    if (e.touches[0] && !0 === this.opts.enableScroll) {
        var i = e.touches[0].x - this.scrollOption.startTouchX, n = this.scrollOption.currentOffset, a = function(t, e, i, n) {
            var a = n.width - i.padding - e.xAxisPoints[0], o = e.eachSpacing * n.categories.length, r = t;
            return t >= 0 ? r = 0 : Math.abs(t) >= o - a && (r = a - o), r;
        }(n + i, this.chartData, this.config, this.opts);
        this.scrollOption.distance = i = a - n;
        var o = t({}, this.opts, {
            _scrollDistance_: n + i,
            animation: !1
        });
        w.call(this, o.type, o, this.config, this.context);
    }
}, I.prototype.scrollEnd = function(t) {
    if (!0 === this.opts.enableScroll) {
        var e = this.scrollOption, i = e.currentOffset, n = e.distance;
        this.scrollOption.currentOffset = i + n, this.scrollOption.distance = 0;
    }
}, module.exports = I;