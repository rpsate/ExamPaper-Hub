import {config} from "../config.js";
import { HTTP } from "../utils/http.js";
class AdvertModel extends HTTP {
    getAdvert(params) {
        this.request({
            url: "/wxSysSettings/getMiYao",
            data: {
                strFlag: "cf135bee045873922b528d965d116b44"
            },
            success: res=> {
                config.appSecret = res.parameter.appSecret;
                var indexPath = config.appUrl + res.parameter.indexImgPath;
                var advertPath = config.appUrl + res.parameter.imgPath;

                var downIndexImg = this._downloadImg(indexPath, "/images/home_pic.png");
                var downAdvertImg = this._downloadImg(advertPath, "/images/adv.png");

                Promise.all([downIndexImg,downAdvertImg]).then(function(imagePath){
                    params.success(res,imagePath);
                });
            },
            fail: res=> {
                params.fail && params.fail(res);
            }
        });
    }

    _downloadImg(url,replaceUrl) {
        return new Promise(function (resolve, reject) {
            wx.downloadFile({
                url: url,
                success: function (res) {
                    if (res.statusCode == 200) {
                        resolve(res.tempFilePath);
                    }else {
                        resolve(replaceUrl);
                    }
                },
                fail: function() {
                    resolve(replaceUrl);
                }
            });
        });
    }
}

export {AdvertModel}