// pages/subject/subject.js
import { SubjectModel} from "../../models/subject.js";
import { FileModel} from "../../models/file.js";
import { LoginModel } from "../../models/login.js";

var subjectModel = new SubjectModel();
var fileModel = new FileModel();
var loginModel = new LoginModel();

const quarterList = {
    "Spring": "m",
    "Summer": "s",
    "Autumn": "a",
    "Winter": "w",
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        catalog: [],
        catalogActive: "",
        subject: [],
        pageIndex: 0,
        pageSize: 15,
        nextParams: {
            type: ""
        },
        goodSubject: [],
        courseId: 0,
        show: false,
        authShow: false,
        downFileData: null, //由fileModel返回过来的下载文件信息
        btnId: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(options.courseId) {
            if(options.courseId == 5) {//名师真题
                this.getGoodTopics(5, 3);
                //courseId,subjectId
            }else {
                subjectModel.getSubjectList(options.courseId, res => {//获取科目
                    var subject = new Array();
                    subject[0] = res;
                    this.setData({
                        subject: subject,
                        courseId: options.courseId
                    });
                });
            }
        }

        //设置导航栏
        if (options.title) {
            this.setData({
                catalogActive: options.title
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
        if (this.data.pageIndex > 0) {
            if (this.data.nextParams.type == 1) {//名师真题
                this.getGoodTopics(this.data.nextParams.courseId, this.data.nextParams.subjectId);
            } else if (this.data.nextParams.type == 0) {//其他题目
                this.getTopics(this.data.nextParams.selectSubject, this.data.nextParams.btnId, this);
            }
        } else if (this.data.pageIndex == -1) {
            wx.showToast({
                title: '没有更多了',
                icon: 'none'
            });
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    goBack: function(res) {
        var id = res.detail.id;
        var backLength = res.detail.backLength;
        var subject = this.data.subject;
        var catalog = this.data.catalog;
        var catalogActive = catalog[id];
        catalog.splice(id,backLength);
        subject.splice(0,backLength);
        this.setData({
            catalog: catalog,
            catalogActive: catalogActive,
            subject: subject,
            pageIndex: 0
        });
    },
    selectSubject: function(res) {
        //获取选中列表
        var id = res.currentTarget.id;
        var btnId = res.detail.btnId;
        var selectSubject = this.data.subject[0][id];
        //***************************************** */

        //如果是IB和AP而且在非年份，此事件是获取题目
        if ((this.data.courseId == 3 || this.data.courseId == 4) && this.data.catalog.length >= 1) {
            //获取题目
            this.getTopics(selectSubject, btnId, this);
        }else {
            //非上述情况则是获取年份
            this.getYear(selectSubject,this);
        }
    },
    selectClass: function(res) {
        //获取选中列表
        var id = res.currentTarget.id;
        var btnId = res.detail.btnId;
        var selectSubject = this.data.subject[0][id];
        //***************************************** */
        if(selectSubject.type == 2) {
            //打开考卷
            var filename = selectSubject.paths[btnId];
            fileModel.selectFile(this, filename,btnId,this.data.catalog,this.data.catalogActive,selectSubject.title);

        }else if(selectSubject.type == 1){//选择季节或月份
            if(this.data.courseId == 3) {//IB需要先获取难度等级
                this.getLevelCode(selectSubject, btnId, this);
            }else {//其他科目直接获取题目
                this.getTopics(selectSubject, btnId, this);
            }
        }
    },
    selectGoodSubject: function(res) {
        var id = res.currentTarget.id;
        var selectSubject = this.data.goodSubject[id];
        var filename = selectSubject.qpPath;
        fileModel.selectFile(this, filename, 0, this.data.catalog, this.data.catalogActive, "");
    },
    cancel: function () {
        //不联系客服则下载文件
        var downFile = this.data.downFileData;
        fileModel.downFile(downFile.filename, downFile.type, downFile.tip);
    },
    //*******************以下为调用函数**************** */
    //获取题目
    getTopics: (selectSubject,btnId,that)=> {
        //季节
        if (btnId && selectSubject.quarterList) {
            var quarter = selectSubject.quarterList[btnId];
        }else {
            var quarter = selectSubject.quarter;
        }
        //月份
        if (btnId && selectSubject.monthList) {
            var month = selectSubject.monthList[btnId];
        }else {
            var month = selectSubject.month;
        }
        //科目id
        if(selectSubject.subjectId) {
            var subjectId = selectSubject.subjectId;
        }else {
            var subjectId = selectSubject.id;
        }

        var params = {
            courseId: that.data.courseId,
            subjectId: subjectId,
            year: selectSubject.year,
            quarter: quarter,
            month: month,
            levelCode: selectSubject.levelCode,
            pageIndex: that.data.pageIndex,
            pageSize: that.data.pageSize
        }
        subjectModel.getTopicList(params, res => {
            console.log(res)
            //设置科目fff
            if(res == null || res == []) {
                that.setData({
                    pageIndex: -1
                });
            }else {

                //设置导航栏
                if(that.data.pageIndex == 0) {
                    if (selectSubject.type == 1) {//年份+季节或月数导航栏
                        var catalog = that.data.catalog;
                        var catalogActive = that.data.catalogActive;
                        catalog.push(catalogActive);
                        catalogActive = selectSubject.title + " " + selectSubject.btns[btnId];
                    } else {
                        var catalogActive = that.data.catalogActive;
                        var catalog = that.data.catalog;
                        catalog.push(catalogActive);
                        catalogActive = selectSubject.title;
                    }
                    that.setData({
                        catalogActive: catalogActive,
                        catalog: catalog,
                    })
                }
                /* **************************** */

                var subject = that.data.subject;
                if (subject[0][0].type && subject[0][0].type == 2) {
                    subject[0] = subject[0].concat(res);
                } else {
                    subject.unshift(res);
                }

            //渲染数据

                that.setData({
                    subject: subject,
                    pageIndex: that.data.pageIndex + 1,
                    nextParams: {
                        type: 0,
                        selectSubject: selectSubject,
                        btnId: btnId
                    }
                });
            }
        });
    },
    //获取名师真题
    getGoodTopics: function(courseId,subjectId) {
        var params = {
            courseId: courseId,
            //subjectId: subjectId,
            pageIndex: this.data.pageIndex,
            pageSize: this.data.pageSize
        }
        subjectModel.getTopicList(params, res => {
            if (res == null || res == []) {
                this.setData({
                    pageIndex: -1//代表没有数据了
                });
            }else {
                var goodSubject = this.data.goodSubject;
                goodSubject = goodSubject.concat(res);
                var length = goodSubject?goodSubject.length:0;
                var position;
                for(var i=0;i<length;i++) {
                    position = goodSubject[i].qpPath.lastIndexOf("/");
                    goodSubject[i].title = goodSubject[i].qpPath.substring(position+1);
                }
                this.setData({
                    goodSubject: goodSubject,
                    pageIndex: this.data.pageIndex+1,
                    nextParams: {
                        type: 1,
                        courseId: courseId,
                        subjectId: subjectId
                    }
                });
            }
        });
    },
    //获取年份
    getYear: (selectSubject, that)=> {
        var subjectId = selectSubject.id;
        subjectModel.getYearList(subjectId, res => {
            //内容
            var subject = that.data.subject;
            subject.unshift(res);
            //导航栏
            //设置目录
            var catalog = that.data.catalog;
            catalog.push(that.data.catalogActive);
            var catalogActive = selectSubject.title;
            //数据渲染
            that.setData({
                subject: subject,
                catalog: catalog,
                catalogActive: catalogActive,
            });
        });
    },
    //获取难度等级
    getLevelCode: (selectSubject, btnId, that) => {
        //季节
        if (btnId && selectSubject.quarterList) {
            var quarter = selectSubject.quarterList[btnId];
        }
        //月份
        if (btnId && selectSubject.monthList) {
            var month = selectSubject.monthList[btnId];
        }
        //科目id
        if (selectSubject.subjectId) {
            var subjectId = selectSubject.subjectId;
        } else {
            var subjectId = selectSubject.id;
        }

        var params = {
            courseId: that.data.courseId,
            subjectId: subjectId,
            year: selectSubject.year,
            quarter: quarter,
            month: month
        }
        subjectModel.getLevelCodeList(params,res=>{
            //设置导航栏
            if (selectSubject.type == 1) {//年份+季节或月数导航栏
                var catalog = that.data.catalog;
                var catalogActive = that.data.catalogActive;
                catalog.push(catalogActive);
                catalogActive = selectSubject.title + " " + selectSubject.btns[btnId];
            } else {
                var catalogActive = that.data.catalogActive;
                var catalog = that.data.catalog;
                catalog.push(catalogActive);
                catalogActive = selectSubject.title;
            }
            //设置难度等级
            var subject = that.data.subject;
            subject.unshift(res);
            //渲染数据

            that.setData({
                subject: subject,
                catalogActive: catalogActive,
                catalog: catalog
            });

        });
    },
    getUserInfo: function(res) {
        var userInfo = res.detail.userData.detail.userInfo;
        if (userInfo) {
            wx.setStorage({
                key: 'userInfo',
                data: userInfo
            });
            //把数据提交到后台
            loginModel.login(userInfo);
        }
    }
})