module.exports = {
    mwosDomain: "https://orders.kfc.com.cn/mwos/rest/wx/",
    riskUrl: "https://fp.hwwt8.com",
    abUrl: "https://ab.hwwt8.com"
}, Promise.prototype.finally = Promise.prototype.finally || function(t) {
    function r() {
        try {
            t && t();
        } catch (t) {
            console.error(t);
        }
    }
    var o = this.constructor;
    return this.then(function(t) {
        return r(), o.resolve(t);
    }, function(t) {
        return r(), o.reject(t);
    });
};