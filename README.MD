# TradingArea 

### 图片资源路径

> 所有图片资源采用引用路径，从而减少项目文件大小。

```
//开启一个单独的文件服务器
http-server -p 34567 
// 修改host，使用image.oven.com 来作为图片网址
127.0.0.1 image.oven.com
// 定义全局的变量保存图片服务器路径
globalData: {
    imageServerUrl: 'http://image.oven.com:34567',
}
// 使用全局变量
var App = getApp() // 获取小程序实例
// js中使用
avatar: App.globalData.imageServerUrl + '/shoplogo.png'
// wxml文件中使用
globalData: App.globalData, // 将全局的变量赋值给当前页面的data内
<image src="{{payData.shopData.avatar}}"></image>
或者
<image src="{{globalData.imageServerUrl}}/mylogo.png"></image>
```
移动端测试时不能用本地的图片服务器，需要将图片素材放置在公网上的服务器内。
本人使用demo.jqstudy.cn 域名 暂存图片等资源。


### 数据接口
```
{
    "initData": {
        "user": {
            "openId": 100001,
            "name": "我是用户名字",
            "avatar": "http://192.168.2.172:34567/mylogo.png",
            "discountData": [{
                "type": 1, // 优惠券类型，满100立减5元类型
                "content": "满100减5元", // 优惠券内容
                "limit": 100, // 使用的条件
                "discont": 5, // 优惠的金额
                "status": true // 优惠券是否可用
            }, {
                "type": 2, // 会员特权，每满100减5元类型
                "content": "每满100减3元", // 优惠内容
                "limit": 100, // 使用的条件
                "discont": 5 // 优惠的金额
            }, {
                "type": 3, // 会员折扣，金牌粉丝9.2折类型
                "content": "金牌粉丝9.2折", // 优惠券内容
                "discont": 0.92 // 优惠的折扣
            }]
        },
        "shop": {
            "openId": 200001,
            "name": "我是店铺名字",
            "avatar": "http://192.168.2.172:34567/mylogo.png"
        }
    }
}
```