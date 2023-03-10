// components/history/history.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        type: {
            type: "Number",
            value: 3
            /*图标iconId对应值
            //0 考卷
            //1 答案
            //2 评分表*/
            //3 pdf
        },
        title: {
            type: "String",
            value: "title"
        },
        tip: {
            type: "String",
            value: "category"
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        picture: ["./images/pdf_1.png", "./images/pdf_2.png", "./images/pdf_3.png","./images/pdf_0.png"]
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
