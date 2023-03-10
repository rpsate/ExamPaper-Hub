// pages/home/home.js
import { AdvertModel } from "../../models/advert.js";
var advertModel = new AdvertModel();

Page({
    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        advertModel.getAdvert({
            success: (res,imagePath) => {
                //请求成功，图片缓存
                var data = JSON.stringify(res.parameter);
                var imgPath = JSON.stringify(imagePath);
                setTimeout(function (res) {
                    wx.reLaunch({
                        url: '../index/index?data='+data+'&img='+imgPath,
                    });
                }, 1000);
            },
            fail: function() {
                setTimeout(function () {
                    wx.reLaunch({
                        url: '../index/index'
                    });
                }, 1000);
            }
        });
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

    }
})