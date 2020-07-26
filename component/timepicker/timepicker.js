module.exports = {
    show: function(t, e) {
        for (var s = t.getHours(), i = e.getHours(), u = [], r = [], o = s; o <= i; o++) u.push(o);
        var a = t.getMinutes() + t.getMinutes() % 5;
        if (s != i) for (var n = 0; n < 12; n++) 5 * n >= a && r.push(("0" + 5 * n).substr(-2)); else for (var h = e.getMinutes() - e.getMinutes() % 5, g = 0; g < 12; g++) 5 * g >= a && 5 * g <= h && r.push(("0" + 5 * g).substr(-2));
        this.setData({
            showTimepicker: !0,
            hours: u,
            minutes: r,
            timeValue: [ 0, 0 ],
            hour: u[0],
            deftime: u[0] + ":" + r[0],
            minute: r[0]
        });
    },
    timeChange: function(t, e, s, i, u) {
        if (void 0 !== e) {
            var r = [];
            if (t == s.getHours() && s.getHours() == i.getHours()) for (var o = s.getMinutes() + s.getMinutes() % u, a = i.getMinutes() - i.getMinutes() % u, n = 0; n < 12; n++) n * u >= o && n * u <= a && r.push(("0" + n * u).substr(-2)); else if (t == s.getHours()) for (var o = s.getMinutes() + s.getMinutes() % u, h = 0; h < 12; h++) h * u >= o && r.push(("0" + h * u).substr(-2)); else if (t == i.getHours()) for (var a = i.getMinutes() - i.getMinutes() % u, g = 0; g < 12; g++) g * u <= a && r.push(("0" + g * u).substr(-2)); else for (var f = 0; f < 12; f++) r.push(("0" + f * u).substr(-2));
            this.setData({
                minutes: r,
                hour: t,
                minute: r[e]
            });
        } else console.log("时间选择没有结束,请等待......");
    },
    hide: function() {
        this.setData({
            showTimepicker: !1
        });
    },
    confirm: function() {
        var t = this.data.hour + ":" + this.data.minute;
        this.data.hour && this.data.minute || (t = this.data.deftime), this.setData({
            setTime: t,
            showTimepicker: !1
        });
    }
};