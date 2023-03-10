import {config} from "../config.js";
import {HTTP} from "../utils/http.js";
class FileModel extends HTTP {
    selectFile(that, filename, type, catalog, catalogActive, title) {
        wx.showActionSheet({
            itemList: ["预览","下载"],
            success:res => {
                if (res.tapIndex == 0) {
                    //预览
                    var url = "/pages/viewer/viewer?src="+config.appUrl+"/viewer/web/viewer.html&file="+filename;
                    wx.navigateTo({
                        url: url
                    });
                }else if(res.tapIndex == 1) {//下载

                    wx.getStorage({
                        key: 'userInfo',
                        success: res => {
                            if (res.data != undefined && res.data != "") {
                                //已授权登陆
                                var tip = catalog.join(" ") + " " + catalogActive + " " + title;
                                tip = tip.trim();
                                //判读下载量是否已经达到3
                                var count = wx.getStorageSync('count');
                                if (count && count%3==0) {
                                    that.setData({
                                        show: true,
                                        downFileData: {
                                            filename: filename,
                                            type: type,
                                            tip: tip
                                        }
                                    });
                                } else {
                                    this.downFile(filename, type, tip);
                                }
                            }else {
                                this._modal(that);
                            }
                        },
                        fail: res=> {
                            this._modal(that);
                        }
                    });
                    
                }
            }
        });
    }

    downFile(filename,type,tip) {
        wx.showLoading({
            title: '正在下载',
            mask: true
        });
        //下载
        var filePath = config.appUrl + filename;
        wx.downloadFile({
            url: filePath,
            fileType: "pdf",
            success: res=> {
                if (res.statusCode != 200) {
                    wx.hideLoading();
                    wx.showToast({
                        title: '下载失败!',
                        icon: 'none'
                    });
                    return;
                }
                wx.saveFile({
                    tempFilePath: res.tempFilePath,
                    success: res => {
                        var position = filename.lastIndexOf("/");
                        var title = filename.substring(position + 1);

                        var file = {
                            type: type,
                            title: title,
                            src: res.savedFilePath,
                            tip: tip
                        }

                        var fileData = wx.getStorageSync("file");
                        if(!fileData) {
                            fileData = new Array();
                        }
                        fileData.unshift(file);
                        
                        var count = fileData.length;

                        wx.setStorageSync("file", fileData);
                        wx.setStorageSync("count", count);
                        wx.showToast({
                            title: '下载成功，请在下载记录中查看!',
                            icon: 'none',
                            duration: 3000,
                            mask: true
                        });                      
                    },
                    fail: function (res) {
                        wx.showToast({
                            title: '保存文件失败!下载总文件不能超过10M',
                            icon: 'none',
                            mask: true
                        });
                    }
                })
            },
            fail: function (res) {
                wx.showToast({
                    title: '下载文件失败！',
                    icon: 'none',
                    mask: true
                });
            },
            complete: function (res) {
                wx.hideLoading();
            }
        });
    }

    _modal(that) {
        that.setData({
            authShow: true
        });
    }
}

export { FileModel }