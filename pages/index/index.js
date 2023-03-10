// pages/index/index.js
import { configUrl} from "../../config";
import { SwitchTabbarModel} from "../../models/switchTabbar.js";

var switchTabbarModel = new SwitchTabbarModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        subjects: [
            [0,"ALevel","历届真题集",false],
            [0,"IGCSE","历届真题集",false],
            [0,"IB","历届真题集",false],
            [0,"AP","历届真题集",false],
            [1,"解题中心","名师在线",false]
        ],
        advertData: null,
        imagePath: ["../../images/home_pic.png","../../images/adv.png"]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(options.data) {
            var advertData = JSON.parse(options.data);
            this.setData({
                advertData: advertData
            });

            configUrl.aboutUrl = advertData.aboutUrl;
            configUrl.questionUrl = advertData.questionUrl;
        }
        if(options.img) {
            var imagePath = JSON.parse(options.img);
            this.setData({
                imagePath: imagePath
            });
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        switchTabbarModel.switchTabbar.call(this,0);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    goIndexUrl: function (res) {
        var url = this.data.advertData.indexUrl;
        if(url != (""||undefined)) {
            wx.navigateTo({
                url: '/pages/viewer/viewer?title=view&src=' + url
            });
        }
    },
    goSubject: function(res) {
        var courseId = parseInt(res.currentTarget.id) + 1;
        //获取科目
        var title = res.currentTarget.dataset.title;
        var disable = res.currentTarget.dataset.disable;
        if (!disable) {
            wx: wx.navigateTo({
                url: '/pages/subject/subject?title=' + title + "&courseId=" + courseId
            });
        }
    }
})