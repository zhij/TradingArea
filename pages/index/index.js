//index.js
var App = getApp()
Page({
    data: {
        globalData: App.globalData, // 获取全局变量
        userInfo: {}, // 微信给出的基本信息,通过getUserInfo获取
        userData: {} // 从自己服务器获取的详细数据
    },
    // 自定义事件
    getTransInfoFn: function(event) {
        let val = event.target.dataset.transid || event.currentTarget.dataset.transid || ''
        if (val != '') {
            wx.navigateTo({
                url: "../detail/detail?transid=" + val
            })
        }
    },
    onLoad: function() {
        console.log('onLoad')
        var that = this
            //调用应用实例的方法获取全局数据
        App.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            });
        });
        // 请求后台数据，拿到商家信息和用户在公司服务器的数据
        wx.request({
            url: 'http://192.168.2.200:3456/user', //仅为示例，并非真实的接口地址
            success: function(res) {
                that.setData({
                    userData: res.data
                })
            }
        })
    },
    onShareAppMessage: function() {
        return {
            title: '自定义分享标题',
            path: '/pages/index/index'
        }
    }
})