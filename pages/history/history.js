// pages/history/history.js
import {HistoryModel} from "../../models/history";
var historyModel = new HistoryModel();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fileData: []

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var fileData = wx.getStorageSync("file");
        if (!fileData) {
            fileData = new Array();
        }
        this.setData({
            fileData: fileData
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

    },
    goViewer: function(res) {
        var id = res.currentTarget.id;
        var fileData = this.data.fileData;
        var src = fileData[id].src;
        wx.showActionSheet({
            itemList: ["打开","删除"],
            success:res => {
                if (res.tapIndex == 0) {
                    historyModel.openFile(src);
                }else if (res.tapIndex == 1) {
                    historyModel.deleteFile({
                        src: src,
                        fileData: fileData,
                        id: id,
                        success: res => {
                            this.setData({fileData: fileData});
                        }
                    })
                }
            }
        })
    }
})