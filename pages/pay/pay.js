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
        // console.log(App.globalData.imageServerUrl)
        wx.request({
            url: 'https://api.jqstudy.cn/testjson', //仅为示例，并非真实的接口地址
            success: function(res) {
                console.log(res.data.data.name)
            }
        })
    },
    getData: function() {
        console.log("11")
    },
    onShareAppMessage: function() {
        return {
            title: '自定义分享标题',
            path: '/pages/index/index'
        }
    }
})