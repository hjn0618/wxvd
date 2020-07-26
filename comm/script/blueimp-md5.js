var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
};

!function(t) {
    function r(n, t) {
        var r = (65535 & n) + (65535 & t);
        return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r;
    }
    function o(n, t, o, e, u, f) {
        return r(function(n, t) {
            return n << t | n >>> 32 - t;
        }(r(r(t, n), r(e, f)), u), o);
    }
    function e(n, t, r, e, u, f, c) {
        return o(t & r | ~t & e, n, t, u, f, c);
    }
    function u(n, t, r, e, u, f, c) {
        return o(t & e | r & ~e, n, t, u, f, c);
    }
    function f(n, t, r, e, u, f, c) {
        return o(t ^ r ^ e, n, t, u, f, c);
    }
    function c(n, t, r, e, u, f, c) {
        return o(r ^ (t | ~e), n, t, u, f, c);
    }
    function i(n, t) {
        var o, i, d, l, a;
        n[t >> 5] |= 128 << t % 32, n[14 + (t + 64 >>> 9 << 4)] = t;
        var h = 1732584193, m = -271733879, y = -1732584194, p = 271733878;
        for (o = 0; o < n.length; o += 16) m = c(m = c(m = c(m = c(m = f(m = f(m = f(m = f(m = u(m = u(m = u(m = u(m = e(m = e(m = e(m = e(d = m, y = e(l = y, p = e(a = p, h = e(i = h, m, y, p, n[o], 7, -680876936), m, y, n[o + 1], 12, -389564586), h, m, n[o + 2], 17, 606105819), p, h, n[o + 3], 22, -1044525330), y = e(y, p = e(p, h = e(h, m, y, p, n[o + 4], 7, -176418897), m, y, n[o + 5], 12, 1200080426), h, m, n[o + 6], 17, -1473231341), p, h, n[o + 7], 22, -45705983), y = e(y, p = e(p, h = e(h, m, y, p, n[o + 8], 7, 1770035416), m, y, n[o + 9], 12, -1958414417), h, m, n[o + 10], 17, -42063), p, h, n[o + 11], 22, -1990404162), y = e(y, p = e(p, h = e(h, m, y, p, n[o + 12], 7, 1804603682), m, y, n[o + 13], 12, -40341101), h, m, n[o + 14], 17, -1502002290), p, h, n[o + 15], 22, 1236535329), y = u(y, p = u(p, h = u(h, m, y, p, n[o + 1], 5, -165796510), m, y, n[o + 6], 9, -1069501632), h, m, n[o + 11], 14, 643717713), p, h, n[o], 20, -373897302), y = u(y, p = u(p, h = u(h, m, y, p, n[o + 5], 5, -701558691), m, y, n[o + 10], 9, 38016083), h, m, n[o + 15], 14, -660478335), p, h, n[o + 4], 20, -405537848), y = u(y, p = u(p, h = u(h, m, y, p, n[o + 9], 5, 568446438), m, y, n[o + 14], 9, -1019803690), h, m, n[o + 3], 14, -187363961), p, h, n[o + 8], 20, 1163531501), y = u(y, p = u(p, h = u(h, m, y, p, n[o + 13], 5, -1444681467), m, y, n[o + 2], 9, -51403784), h, m, n[o + 7], 14, 1735328473), p, h, n[o + 12], 20, -1926607734), y = f(y, p = f(p, h = f(h, m, y, p, n[o + 5], 4, -378558), m, y, n[o + 8], 11, -2022574463), h, m, n[o + 11], 16, 1839030562), p, h, n[o + 14], 23, -35309556), y = f(y, p = f(p, h = f(h, m, y, p, n[o + 1], 4, -1530992060), m, y, n[o + 4], 11, 1272893353), h, m, n[o + 7], 16, -155497632), p, h, n[o + 10], 23, -1094730640), y = f(y, p = f(p, h = f(h, m, y, p, n[o + 13], 4, 681279174), m, y, n[o], 11, -358537222), h, m, n[o + 3], 16, -722521979), p, h, n[o + 6], 23, 76029189), y = f(y, p = f(p, h = f(h, m, y, p, n[o + 9], 4, -640364487), m, y, n[o + 12], 11, -421815835), h, m, n[o + 15], 16, 530742520), p, h, n[o + 2], 23, -995338651), y = c(y, p = c(p, h = c(h, m, y, p, n[o], 6, -198630844), m, y, n[o + 7], 10, 1126891415), h, m, n[o + 14], 15, -1416354905), p, h, n[o + 5], 21, -57434055), y = c(y, p = c(p, h = c(h, m, y, p, n[o + 12], 6, 1700485571), m, y, n[o + 3], 10, -1894986606), h, m, n[o + 10], 15, -1051523), p, h, n[o + 1], 21, -2054922799), y = c(y, p = c(p, h = c(h, m, y, p, n[o + 8], 6, 1873313359), m, y, n[o + 15], 10, -30611744), h, m, n[o + 6], 15, -1560198380), p, h, n[o + 13], 21, 1309151649), y = c(y, p = c(p, h = c(h, m, y, p, n[o + 4], 6, -145523070), m, y, n[o + 11], 10, -1120210379), h, m, n[o + 2], 15, 718787259), p, h, n[o + 9], 21, -343485551), 
        h = r(h, i), m = r(m, d), y = r(y, l), p = r(p, a);
        return [ h, m, y, p ];
    }
    function d(n) {
        var t, r = "", o = 32 * n.length;
        for (t = 0; t < o; t += 8) r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
        return r;
    }
    function l(n) {
        var t, r = [];
        for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1) r[t] = 0;
        var o = 8 * n.length;
        for (t = 0; t < o; t += 8) r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
        return r;
    }
    function a(n) {
        var t, r, o = "0123456789abcdef", e = "";
        for (r = 0; r < n.length; r += 1) t = n.charCodeAt(r), e += o.charAt(t >>> 4 & 15) + o.charAt(15 & t);
        return e;
    }
    function h(n) {
        return unescape(encodeURIComponent(n));
    }
    function m(n) {
        return function(n) {
            return d(i(l(n), 8 * n.length));
        }(h(n));
    }
    function y(n, t) {
        return function(n, t) {
            var r, o, e = l(n), u = [], f = [];
            for (u[15] = f[15] = void 0, 16 < e.length && (e = i(e, 8 * n.length)), r = 0; r < 16; r += 1) u[r] = 909522486 ^ e[r], 
            f[r] = 1549556828 ^ e[r];
            return o = i(u.concat(l(t)), 512 + 8 * t.length), d(i(f.concat(o), 640));
        }(h(n), h(t));
    }
    function p(n, t, r) {
        return t ? r ? y(t, n) : function(n, t) {
            return a(y(n, t));
        }(t, n) : r ? m(n) : function(n) {
            return a(m(n));
        }(n);
    }
    "function" == typeof define && define.amd ? define(function() {
        return p;
    }) : "object" == ("undefined" == typeof module ? "undefined" : n(module)) && module.exports ? module.exports = p : t.md5 = p;
}(void 0);