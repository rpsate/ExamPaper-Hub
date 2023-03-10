// pages/personal/personal.js
import { configUrl } from "../../config";
import { SwitchTabbarModel } from "../../models/switchTabbar.js";
import { LoginModel} from "../../models/login.js";
var switchTabbarModel = new SwitchTabbarModel();
var loginModel = new LoginModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        historyList: [
            ["./images/ic_me_recent.png", "下载记录"]
        ],
        otherList: [
            ["./images/ic_me_aboutus.png", "关于我们"],
            ["./images/ic_me_question.png", "常见问题"],
            ["./images/ic_me_contact.png", "在线客服"]
        ],
        userInfo: {
            avatarUrl:null,
            nickName: "学霸同学"
        },
        login: false,
        count: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
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
        switchTabbarModel.switchTabbar.call(this, 2);

        if (!this.data.login) {
            this.login();
        }

        var count = wx.getStorageSync("count");
        if (!count) {
            count = 0;
        }
        this.setData({
            count: count
        });
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
    getUserInfo: function(res) {
        var userInfo = res.detail.userData.detail.userInfo;
        if(userInfo) {
            wx.setStorage({
                key: 'userInfo',
                data: userInfo
            });
            this.setData({
                userInfo: userInfo,
                login: true
            });
            //把数据提交到后台
            loginModel.login(userInfo);
        }
    },
    goHistory: function(res) {
        wx.navigateTo({
            url: '/pages/history/history',
        });
    },
    goOther: function(res) {
        var id = res.detail.id;
        if(id==0) {//关于我们
            var url = "/pages/viewer/viewer?title=关于我们&src=" + configUrl.aboutUrl
        }else {//常见问题
            var url = "/pages/viewer/viewer?title=常见问题&src=" + configUrl.questionUrl
        }
        wx.navigateTo({
            url: url
        });
    },
    login: function(res) {
        wx.getStorage({
            key: 'userInfo',
            success: res => {
                if (res.data != undefined && res.data != "") {
                    this.setData({
                        userInfo: res.data,
                        login: true
                    });
                }
            }
        });
    }
})