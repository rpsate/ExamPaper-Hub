// components/superList/superList.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        type: {
            type: "Number",
            value: "0"
            /*列表类型
            0 普通类型，无button
            1 季节型 button
            2 pdf型 button
            */
        },
        title: {
            type: "String",
            value: ""
        },
        btns: {
            type: "Array"
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        icon: ["./images/sm_document.png","./images/sm_pdf.png"]

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onSelectSubject: function(res) {
            if(this.properties.type == 0) {
                this.triggerEvent("selectSubject",{},{});
            }
        },
        onSelectClass: function(res) {
            var id = res.currentTarget.id;
            this.triggerEvent("selectClass",{btnId: id},{});
        }
    }
})
