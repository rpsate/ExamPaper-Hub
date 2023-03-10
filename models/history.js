class HistoryModel {
    openFile(src) {
        wx.openDocument({
            filePath: src
        });
    }

    deleteFile(params) {
        wx.showModal({
            title: '温馨提示',
            content: '确定删除'+params.fileData[params.id].title+'吗？',
            showCancel: true,
            success: res => {
                if(res.confirm) {
                    wx.removeSavedFile({
                        filePath: params.src,
                        success: res => {
                            wx.showToast({
                                title: '删除成功！',
                                icon: 'none'
                            });
                            var fileData = params.fileData;
                            fileData.splice(params.id, 1);
                            var count = fileData.length;
                            wx.setStorageSync("file", fileData);
                            wx.setStorageSync("count", count)
                            params.success && params.success(fileData);
                        }
                    });
                }
            }
        })
    }
}

export { HistoryModel};