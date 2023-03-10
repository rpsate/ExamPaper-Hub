// components/ad/ad.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        src: {
            type: "String",
            value: "./images/adv.png"
        },
        time: {
            type: "Number",
            value: 5
        },
        url: {
            type: "String",
            value: ""
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        hidden: false
    },
    lifetimes: {
        ready: function() {
            var time = this.data.time;
            var interval = setInterval(()=>{
                if(--time>=0) {
                    this.setData({
                        time: time
                    });
                }else {
                    clearInterval(interval);
                    this.setData({
                        hidden: true
                    });
                }
            },1000);
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        goDetail:function(res) {
            if(this.data.url != "") {
                wx.navigateTo({
                    url: '/pages/viewer/viewer?title=关于我们&src=' + this.data.url
                });
            }
        }
    }
})
