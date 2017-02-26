//detail.js
var app = getApp();
Page({
    data: {
        globalData: App.globalData, // 获取全局变量
        userInfo: {}, // 微信给出的基本信息,通过getUserInfo获取
        detailData: {} // 从自己服务器获取的详细数据
    },
    // 自定义事件
    makePhoneCall: function(event) {
        var phoneNumber = event.target.dataset.phone || event.currentTarget.dataset.phone || '';
        if (phoneNumber !== '') {
            wx.makePhoneCall({
                phoneNumber: phoneNumber //真实的电话号码
            });
        }
    },
    // 跳转到支付页面
    goPayFn: function() {
        wx.redirectTo({
            url: "../pay/pay"
        });
    },
    onLoad: function(options) {
        console.log(options);
        var transid = options.transid;
        var that = this;
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            });
        });
        // 请求后台数据，拿到商家信息和用户在公司服务器的数据
        wx.request({
            url: 'http://localhost:3456/records?transid=' + transid, //仅为示例，并非真实的接口地址
            success: function(res) {
                that.setData({
                    detailData: res.data[0]
                });
                console.log(that.detailData);
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: '自定义分享标题',
            path: '/pages/index/index'
        };
    }
});
