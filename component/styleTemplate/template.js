module.exports = {
    createContent: function(t, e, n) {
        return {
            text: t,
            style: e,
            class: n
        };
    },
    createImageTag: function(t, e, n) {
        return {
            tagType: "image",
            src: t,
            text: "",
            tagStyle: e,
            tagClass: n
        };
    },
    setContents: function(t) {
        this.setData({
            styleTemplateContents: t
        });
    },
    addContent: function(t, e) {
        var n = this.data.styleTemplateContents;
        t ? (n || (this.setData({
            styleTemplateContents: []
        }), n = this.data.styleTemplateContents), void 0 == e ? n.push(t) : n.splice(e, 0, t)) : console.warn("[styleTemplate] 参数'conent' 不能为空 ");
    },
    modifyContent: function(t, e, n) {
        var s = this.data.styleTemplateContents;
        t ? s && s.length > e ? n ? s[e][n] = t[n] : s[e] = t : console.warn("[styleTemplate] 修改失败 index: " + e + ", type: " + n) : console.warn("[styleTemplate] 参数'conent' 不能为空 ");
    },
    deleteContent: function(t, e) {
        var n = this.data.styleTemplateContents;
        n && index ? n.splice(index, e || 1) : console.warn("[styleTemplate] 参数'index' 不能为空 ");
    },
    cleanContents: function() {
        this.setData({
            styleTemplateContents: []
        });
    }
};