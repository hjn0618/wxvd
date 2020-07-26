Component({
    properties: {
        broadcastList: {
            type: Array,
            value: []
        }
    },
    data: {},
    methods: {
        _broadcastClose: function() {
            this.triggerEvent("close", {}, {});
        }
    }
});