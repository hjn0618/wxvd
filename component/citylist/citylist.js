function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = require("../../comm/script/model");

module.exports = {
    show: function() {
        var t = this;
        this.getGps(), a.getCities(function(a) {
            t._formatCities({
                groupBy: "nameen",
                display: [ "districtName", "name" ],
                hotCities: a.data.hotCities,
                allCities: a.data.allCities,
                searchBy: [ "districtName", "name" ]
            });
            var e = wx.createSelectorQuery();
            e.select("#citySideTop") && e.select("#citySideTop").boundingClientRect(function(t) {
                t && getApp().globalData.currPage && getApp().globalData.currPage.setData({
                    citySideTop: t.top || 0
                });
            }).exec(), e.select("#citySideOne") && e.select("#citySideOne").boundingClientRect(function(t) {
                t && getApp().globalData.currPage && getApp().globalData.currPage.setData({
                    citySideOne: t.height || 0
                });
            }).exec();
        });
    },
    hide: function() {
        getApp().globalData.currPage.setData({
            citylistVisble: !1
        });
    },
    _sort: function(t, a) {
        if (t) return t.sort(function(t, e) {
            return (t[a] ? t[a] : "_").toUpperCase().charCodeAt(0) - (e[a] ? e[a] : "_").toUpperCase().charCodeAt(0);
        });
    },
    _formatCities: function(t) {
        for (var a = this._sort(t.allCities, t.groupBy), e = null, i = [ "hot" ], o = 0; o < a.length; o++) {
            for (var l = a[o], r = "", s = 0; s < t.searchBy.length; s++) l[t.searchBy[s]] && (r += l[t.searchBy[s]]);
            var c = "", g = l[t.display[0]];
            c += null != g && "" != g ? g + "(" + l[t.display[1]] + ")" : l[t.display[1]];
            var n = !1, p = l[t.groupBy].toUpperCase().charAt(0);
            p != e && (n = !0, e = p, i.push(p)), l.__search__ = r.toUpperCase(), l.__shown__ = !0, 
            l.__display__ = c, l.__group__ = p, l.__first__ = n;
        }
        var u = t.hotCities;
        if (u) for (var y = 0; y < u.length; y++) {
            for (var h = u[y], c = "", d = 0; d < t.display.length; d++) c += h[t.display[d]];
            h.__display__ = c;
        }
        u.unshift({
            __display__: "热门城市",
            __first__: !0,
            __group__: "热门"
        }), getApp().globalData.currPage.setData({
            hotCities: u,
            cities: a,
            chosenGroup: "热门",
            cityscrollHeight: getApp().globalData.height - 333,
            citylistVisble: !0,
            hotaz: i
        });
    },
    handlerTouchMove: function(t) {
        var a = getApp().globalData.currPage.data.hotaz, e = getApp().globalData.currPage.data.citySideTop, i = (t.touches[0] || {}).pageY - e, o = getApp().globalData.currPage.data.citySideOne, l = Math.ceil(i / o);
        l = l >= 27 ? 26 : l - 1, getApp().globalData.currPage.data.toView != a[l] && getApp().globalData.currPage.setData({
            toView: a[l]
        });
    },
    chooseCitylistCity: function(t) {
        var a = getApp(), e = t.currentTarget.dataset, i = !1;
        a.globalData.chosenCity ? a.globalData.chosenCity.cityname == e.cityname && (i = !0) : a.globalData.gspCity.cityname == e.cityname && (i = !0), 
        i || e.citycode && e.cityname && (a.globalData.chosenCity = {
            citycode: e.citycode,
            cityname: e.cityname
        }), a.globalData.isdif = i, this.hide(), getApp().globalData.currPage.setData({
            keyword: ""
        }), getApp().globalData.currPage.onShow("chooseCity");
    },
    getGpsCity: function() {
        var t = getApp();
        a.gpscity({
            mylat: t.globalData.latitude ? t.globalData.latitude : "",
            mylng: t.globalData.longitude ? t.globalData.longitude : ""
        }, function(a) {
            0 == a.data.errorCode && (getApp().globalData.currPage.setData({
                gpsCity: JSON.parse(a.data.cityInfo),
                visiable: !1
            }), t.globalData.gspCity.citycode = JSON.parse(a.data.cityInfo).citycode, t.globalData.gspCity.cityname = JSON.parse(a.data.cityInfo).name);
        });
    },
    getGpsByhand: function() {
        getGps(!0);
    },
    getGps: function(t) {
        var a = getApp();
        a.globalData.latitude ? this.getGpsCity() : a.getLocation(this.getGpsCity, null, t);
    },
    searchCity: function(a) {
        var e = a.detail.value ? a.detail.value.trim() : "", i = getApp().globalData.currPage.data.cities, o = [];
        if (i) for (r = 0; r < i.length; r++) i[r].__search__.toUpperCase().search(e.toUpperCase()) >= 0 || 0 == i[r].abbr.toUpperCase().search(e.toUpperCase()) || !e ? (i[r].__shown__ = !0, 
        o.push({
            di: r,
            nm: i[r].__display__
        })) : i[r].__shown__ = !1;
        if (0 == o.length) {
            var l;
            wx.showToast((l = {
                icon: "none",
                title: "找不到城市：" + e
            }, t(l, "icon", "none"), t(l, "duration", 2e3), l));
        } else if (e) for (var r = 0; r < o.length; r++) if (2 == o[r].nm.split("(").length) for (var s = 0; s < o.length; s++) if (o[r].nm.split("(")[1] == o[s].nm + ")") {
            i[o[r].di].__shown__ = !1;
            break;
        }
        getApp().globalData.currPage.setData({
            cities: i,
            keyword: e,
            scrollHeight: getApp().globalData.height - (e ? 110 : 180)
        });
    }
};