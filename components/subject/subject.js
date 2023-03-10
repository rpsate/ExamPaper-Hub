// components/subject/subject.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        iconId: {
            type: "Number",
            value: 0
        },
        title: {
            type: "String",
            value: "ALevel"
        },
        tip: {
            type: "String",
            value: "历届真题"
        },
        disable: {
            type: "Boolean",
            value: false
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        picture: ["./images/home_document.png", "./images/home_lecture.png", "./images/home_order.png"]

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
