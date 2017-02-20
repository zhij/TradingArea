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
        },
        messageContent: '',
        addMessageBtnWord: '添加留言',
        keyBoardStatus: false,
        messageStatus: false
    },
    onLoad: function() {
        // console.log(App.globalData.imageServerUrl)
        let that = this
        wx.request({
            url: 'http://localhost:3456/user', //仅为示例，并非真实的接口地址
            success: function(res) {
                console.log(res.data)
                that.setData({
                    'payData.userData': res.data
                })
            }
        })
    },
    getData: function() {
        console.log("11")
    },
    // 自定义事件
    // 键盘toggle事件
    showKeyBoardFn: function() {
        this.setData({
            keyBoardStatus: true
        })
    },
    hideKeyBoardFn: function() {
        this.setData({
            keyBoardStatus: false
        })
    },
    // 留言toggle事件
    showAddMessageFn: function() {
        this.setData({
            messageStatus: true
        })
    },
    hideMessageFn: function() {
        this.setData({
            messageStatus: false
        })
    },
    submitsMessageFn: function() {
        console.log("111")
            // this.setData({
            //     messageStatus: false
            // })
    },
    onShareAppMessage: function() {
        return {
            title: '自定义分享标题',
            path: '/pages/index/index'
        }
    }
})