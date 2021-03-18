Component({
    properties: {
        tabinf: {
            type: Array,
            value: []
        }
    },
    data: {
        tabind: 0
    },
    methods: {
        changeTab: function(t) {
            var a = t.currentTarget.dataset.id;
            this.setData({
                tabind: a
            }), this.triggerEvent("changeTabs", {
                ind: a
            });
        }
    }
});