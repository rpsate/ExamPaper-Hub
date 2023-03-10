// components/nav/nav.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        catalog: {
            type: "Array"
        },
        active: {
            type: "String",
            value: ""
        }

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        goHome: function(res) {
            wx.navigateBack({
                delta: 1
            })
        },
        navigation: function(res) {
            var id = parseInt(res.currentTarget.id);
            var backLength = this.properties.catalog.length - id;
            this.triggerEvent("back", {
                id: id, 
                backLength: backLength
            }, {});
        }
    }
})
