# TradingArea 

* 图片资源路径
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