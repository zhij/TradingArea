//app.js
App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    getUserInfo: function(cb) {
        var that = this
        var wxData = {
            encryptedData: '',
            iv: '',
            codes: '',
            AppId: 'wx3bc001723c7eaf34',
            AppSecret: '06a84bc6e62767bf1933079459faf09a',
            openId: '',
            sessionKey: '',
        };

        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            var decodeData = '';
            //调用登录接口
            wx.login({
                success: function(code) {
                    // console.log(code)
                    wxData.codes = code.code;

                    // console.log('-----' + iv);
                    wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + wxData.AppId + '&secret=' + wxData.AppSecret + '&js_code=' + wxData.codes + '&grant_type=authorization_code',
                        success: function(res) {
                            console.log(res);
                            wxData.openId = res.data.openid;
                            wxData.sessionKey = res.data.session_key;
                            wx.getUserInfo({
                                success: function(res) {
                                    console.log("--------")
                                    console.log(res)
                                    wxData.encryptedData = res.encryptedData;
                                    wxData.iv = res.iv;
                                    console.log(wxData);
                                    that.globalData.userInfo = res.userInfo
                                    typeof cb == "function" && cb(that.globalData.userInfo)

                                    // 调取解密接口
                                    wx.request({
                                        url: 'https://tmapi.lifeq.com.cn/xcx/dataDecrypt',
                                        method: 'POST',
                                        header: {
                                            'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        dataType: 'json',
                                        data: {
                                            appId: wxData.AppId,
                                            sessionKey: wxData.sessionKey,
                                            iv: wxData.iv,
                                            encryptedData: wxData.encryptedData

                                        },
                                        success: function(data) {
                                            console.log(data.data);
                                            decodeData = data.data;
                                            console.log(typeof decodeData);
                                            // console.log(JSON.parse("'" + decodeData + "'"));
                                            console.log(JSON.parse('{"status_code":"0","status_msg":"success","obj":{"decryped_code":0,"decryped_content":{"openId":"oGPcX0cO5MV4AGnJ2hTbLdo9hqcA","nickName":"\u5218\u6587\u6587","gender":1,"language":"zh_CN","city":"Guangzhou","province":"Guangdong","country":"CN","avatarUrl":"http:\/\/wx.qlogo.cn\/mmopen\/vi_32\/8vuiatnzbeVcCjthdGtCebRMmeyvC0oqVtEPyCHIibQLUKg9etlAtibJJ2XeHNckFCPwusM3IZichv5ibibfGVA2NlNg\/0","unionId":"oeWyUt73diUrFQUD-r2ttf2ld-YI","watermark":{"timestamp":1488283755,"appid":"wx3bc001723c7eaf34"}}},"list":[]}'));
                                        }
                                    })
                                }
                            })
                        }
                    })

                }
            })
        }
    },
    globalData: {
        userInfo: null,
        // imageServerUrl: 'http://192.168.2.172:34567',
        imageServerUrl: 'http://demo.jqstudy.cn/',

    }
})