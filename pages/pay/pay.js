//pay.js
var App = getApp()
Page({
    data: {
        globalData: App.globalData, // 获取全局变量
        payData: { // 支付数据
            userData: { // 用户数据
                openId: '100001', //
                name: '进击的工程师', //
                avatar: '' //
            },
            shopData: { // 商家数据
                openId: '2000001',
                name: '程序员超市',
                avatar: App.globalData.imageServerUrl + '/shoplogo.png'
            }
        }
    },
    onLoad: function() {
        console.log(App.globalData.imageServerUrl)
    },
    onShareAppMessage: function() {
        return {
            title: '自定义分享标题',
            path: '/pages/index/index'
        }
    }
})