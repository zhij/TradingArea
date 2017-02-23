//paysuccess.js
var App = getApp()
Page({
    data: {
        globalData: App.globalData, // 获取全局变量
        userInfo: {}, // 微信给出的基本信息,通过getUserInfo获取
        payData: {}
    },
    // 自定义事件
    // 跳转到首页
    goHomeFn: function() {
        wx.redirectTo({
            url: "../index/index"
        })
    },
    // 跳转到支付页面
    goPayFn: function() {
        wx.redirectTo({
            url: "../pay/pay"
        })
    },
    onLoad: function(options) {
        console.log(this.data.globalData)
        let that = this
        App.getUserInfo(function(userInfo) {
            console.log(userInfo)
                //更新微信用户基本数据
            that.setData({
                userInfo: userInfo
            })
        });
        // 请求后台数据，拿到商家信息和用户在公司服务器的数据
        wx.request({
            url: 'http://localhost:3456/successData', //仅为示例，并非真实的接口地址
            success: function(res) {
                that.setData({
                    payData: res.data
                })
            }
        })
    }
})