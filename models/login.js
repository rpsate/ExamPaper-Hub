import { config} from "../config.js";
import { HTTP} from "../utils/http.js";
class LoginModel extends HTTP {
    login(userInfo) {
        wx.login({
            success: res => {
                var getOpenId = new Promise(resolve => {
                    this.request({
                        url: "/wxUser/getOpenId",
                        data: {
                            appId: config.appID,
                            appSecret: config.appSecret,
                            code: res.code
                        },
                        success: res => {
                            var data = res.parameter
                            data = JSON.parse(data);
                            resolve(data.openid);
                        }
                    });
                });

                getOpenId.then(openId => {
                    this.request({
                        url: "/wxUser/register",
                        loading: false,
                        data: {
                            openId: openId,
                            name: userInfo.nickName,
                            sex: userInfo.gender,
                            userUrl: userInfo.avatarUrl,
                            address: userInfo.province + " " + userInfo.city
                        }
                    });
                })
            }
        });
        
    }
}

export {LoginModel}