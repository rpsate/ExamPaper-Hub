import {config} from "../config.js";

//错误提示
var tips = {
    1: "抱歉，出现未知错误",
    106: "科目Id不能为空",
    107: "年份不能为空",
    108: "科目Id不能为空",
    109: "题目id不能为空",
    110: "下载用户id不能为空",
    111: "文件类型不能为空",
    112: "下载文件名不能为空"
}

class HTTP {
    request(params) {
        if(params.loading) {
            wx.showLoading({
                title: '加载中······',
                mask: true
            });
        }
        wx.request({
            url: config.appUrl + params.url,
            data: params.data,
            method: "POST",
            dataType: 'json',
            responseType: 'text',
            header: {
                "content-type": "application/json;charset=utf-8"
            },
            success: (res)=> {
                if (params.loading) {
                    wx.hideLoading();
                }
                var code = res.statusCode.toString();
                if(code.startsWith('2')) {
                    params.success && params.success(res.data);
                }else {
                    this._showError(res.data.error_code);
                }
            },
            fail: (res)=> {
                if (params.loading) {
                    wx.hideLoading();
                }
                this._showError(1);
                params.fail && params.fail(res);
            }
        });
    }

    _showError(error_code) {
        if(!error_code) {
            error_code = 1;
        }
        wx.showToast({
            title: tips[error_code],
            icon: 'none',
            duration: 2000
        })
    }
};

export {HTTP};