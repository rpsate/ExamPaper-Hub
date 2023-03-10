// components/modal/modal.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: "String",
            value: "温馨提示"
        },
        content: {
            type: "String",
            value: "亲爱的用户，MIM已为您整理了历年真题资料，咨询客服即可免费领取哦~"
        },
        cancelText: {
            type: "String",
            value: "暂不领取"
        },
        confirmText: {
            type: "String",
            value: "立即免费领取"
        },
        openType: {
            type: "String",
            value: "contact"
        },
        show: {
            type: "Boolean",
            value: false
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
        getUserInfo: function(res) {
            this.triggerEvent("getUserInfo", {
                userData: res
            }, {});
        },
        cancel: function (res) {
            this.setData({
                show: false
            });
            this.triggerEvent("cancel", {}, {});
        },
        confirm: function (res) {
            this.setData({
                show: false
            });
            this.triggerEvent("confirm", {}, {});
        }
    }
})
