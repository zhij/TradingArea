//detail.js
var app = getApp()
Page({
    data: {
        globalData: App.globalData, // 获取全局变量
        userInfo: {}, // 微信给出的基本信息,通过getUserInfo获取
        detailData: {} // 从自己服务器获取的详细数据
    },
    onLoad: function(options) {
        console.log(options)
    },
    onShareAppMessage: function() {
        return {
            title: '自定义分享标题',
            path: '/pages/index/index'
        }
    }
})