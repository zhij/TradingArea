//pay.js
var App = getApp();
Page({
    data: {
        globalData: App.globalData, // 获取全局变量
        userInfo: {}, // 微信给出的基本信息,通过getUserInfo获取
        payData: {}, // 支付数据
        messageContent: '', // 留言信息
        messageContentCatch: '', // 留言信息缓存，只有点击确认后才会同步到messageContent里去
        addMessageBtnWord: '添加留言', // 留言按钮的文字
        inputStatus: true, // 信息输入状态
        keyBoardStatus: true, // 键盘弹窗的状态值
        messageStatus: false, // 信息弹窗的状态值
        keyBoardAnimation: '', // 键盘动画
        messageAnimation: '', // 留言窗口动画
        messageMaskAnimation: '', //留言窗口黑色背景动画
        keyValue: '', // 用户输入的数据
        keyDiscountValue: '0.00', // 折扣后数据
        keyDiscountContent: '暂无优惠', // 折扣计算后显示的折扣内容
        keyPointStatus: false, // 键盘中的小数点禁止状态，false为不禁止，true为禁止，防止多次输入小数点
        keyNumStatus: false, // 键盘中数字的禁止状态, false为不禁止，true为禁止，必要时可以禁用数字输入
    },
    onLoad: function(options) {
        console.log(App.globalData);
        var that = this;
            // 拿到微信给出的基本信息https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html
        App.getUserInfo(function(userInfo) {
                //更新微信用户基本数据
                that.setData({
                    userInfo: userInfo
                });
            });
            // 请求后台数据，拿到商家信息和用户在公司服务器的数据
        wx.request({
                url: 'http://localhost:3456/initData', //仅为示例，并非真实的接口地址
                success: function(res) {
                    that.setData({
                        payData: res.data
                    });
                }
            });
            //  optins可以拿到二维码中的参数，以对象形式出现
        var option = options;
    },
    // 自定义事件
    // 键盘toggle事件
    showKeyBoardFn: function() {
        // 创建一个动画
        var animation = wx.createAnimation({
                transformOrigin: "50% 50%",
                duration: 500,
                timingFunction: "ease",
                delay: 0
            });
            // 动画序列
        animation.translateY(0).step();
            //  通过动画实例的export方法导出动画数据传递给组件的animation属性
        this.setData({
            keyBoardAnimation: animation.export(),
            inputStatus: false
        });

    },
    hideKeyBoardFn: function() {
        // 创建一个动画
        var animation = wx.createAnimation({
                transformOrigin: "50% 50%",
                duration: 500,
                timingFunction: "ease",
                delay: 0
            });
            // 动画序列
        animation.translateY(400).step();
            //  通过动画实例的export方法导出动画数据传递给组件的animation属性
        this.setData({
            keyBoardAnimation: animation.export(),
        });
        if (this.data.keyValue === '') {
            this.setData({
                inputStatus: true
            });
        }
    },
    // 留言toggle事件
    showAddMessageFn: function() {
        this.setData({
                messageStatus: true
            });
            // 创建一个动画（message内容框的动画）
        var animation = wx.createAnimation({
                transformOrigin: "50% 50%",
                duration: 500,
                timingFunction: "ease",
                delay: 0
            });
            // 动画序列
        animation.translateY(0).opacity(1).step();
            //  通过动画实例的export方法导出动画数据传递给组件的animation属性
        this.setData({
            messageAnimation: animation.export()
        });

        // 创建一个动画(messageMask的动画)
        var animationMask = wx.createAnimation({
                transformOrigin: "50% 50%",
                duration: 500,
                timingFunction: "ease",
                delay: 0
            });
            // 动画序列
        animationMask.opacity(0.5).step();
            //  通过动画实例的export方法导出动画数据传递给组件的animation属性
        this.setData({
            messageMaskAnimation: animationMask.export()
        });

    },
    messageAreaInputFn: function(event) {
        console.log(event.detail.value);
        var val = event.detail.value;
        this.setData({
            messageContentCatch: val
        });
    },
    // 用户留言信息取消按钮
    hideMessageFn: function() {
        var that = this;
            // 创建一个动画
        var animation = wx.createAnimation({
                transformOrigin: "50% 50%",
                duration: 500,
                timingFunction: "ease",
                delay: 0
            });
            // 动画序列
        animation.translateY(200).opacity(0).step();
            //  通过动画实例的export方法导出动画数据传递给组件的animation属性
        this.setData({
            messageAnimation: animation.export()
        });

        // 创建一个动画(messageMask的动画)
        var animationMask = wx.createAnimation({
                transformOrigin: "50% 50%",
                duration: 500,
                timingFunction: "ease",
                delay: 0
            });
            // 动画序列
        animationMask.opacity(0).step();
            //  通过动画实例的export方法导出动画数据传递给组件的animation属性
        this.setData({
            messageMaskAnimation: animationMask.export()
        });

        setTimeout(function() {
            that.setData({
                messageStatus: false
            });
        }, 600);

    },
    // 用户留言信息确认按钮
    submitMessageFn: function() {
        var messageContentCatch = this.data.messageContentCatch;
        if (messageContentCatch !== '') {
            this.setData({
                messageContent: messageContentCatch,
                // messageStatus: false,
                addMessageBtnWord: '修改'
            });
        } else {
            this.setData({
                messageContent: messageContentCatch,
                // messageStatus: false,
                addMessageBtnWord: '添加留言'
            });
        }
        var that = this;
            // 创建一个动画
        var animation = wx.createAnimation({
                transformOrigin: "50% 50%",
                duration: 500,
                timingFunction: "ease",
                delay: 0
            });
            // 动画序列
        animation.translateY(200).opacity(0).step();
            //  通过动画实例的export方法导出动画数据传递给组件的animation属性
        this.setData({
                messageAnimation: animation.export()
            });
            // 创建一个动画(messageMask的动画)
        var animationMask = wx.createAnimation({
                transformOrigin: "50% 50%",
                duration: 500,
                timingFunction: "ease",
                delay: 0
            });
            // 动画序列
        animationMask.opacity(0).step();
            //  通过动画实例的export方法导出动画数据传递给组件的animation属性
        this.setData({
            messageMaskAnimation: animationMask.export()
        });
        setTimeout(function() {
            that.setData({
                messageStatus: false
            });
        }, 600);
    },
    // 键盘数字按键
    keyTapFn: function(event) {
        // console.log(event.target.dataset.keynum)
        var reg = /^(([0-9]+)|[\.][0-9]{0,1}|([0-9]+\.[0-9]{0,1}))$/;
        var val = event.target.dataset.keynum || event.currentTarget.dataset.keynum || '';
            // console.log(this.data.keyValue)
        val = this.data.keyValue + val;

        if (parseFloat(val) > 10000000) {
            console.log("超出数据范围啦");
        } else {
            if (val.indexOf('.') >= 0) {
                // console.log("有小数点啦")
                this.setData({
                    keyPointStatus: true
                });
            } else {
                // console.log("没有小数点啦")
                this.setData({
                    keyPointStatus: false
                });
            }
            // console.log("检测状态为：" + reg.test(val))
            // console.log(val)

            if (!reg.test(val) && val !== '') {
                this.setData({
                    keyNumStatus: true
                });
            } else {
                this.setData({
                    keyNumStatus: false
                });
            }
            this.discountFn(val);
            this.setData({
                keyValue: val
            });

        }

    },
    // 键盘删除按键
    keyDeleteFn: function() {
        // console.log("122删除啦")
        console.log(typeof this.data.keyValue);
        var val = this.data.keyValue;
        var reg = /^(([0-9]+)|^[\.][0-9]{0,1}|([0-9]+\.[0-9]{0,1}))$/;
        val = val.substring(0, val.length - 1);
        console.log(val);
        if (parseFloat(val) > 10000000) {
            console.log("超出数据范围啦");
        } else {
            if (val.indexOf('.') >= 0) {
                // console.log("有小数点啦")
                this.setData({
                    keyPointStatus: true
                });
            } else {
                // console.log("没有小数点啦")
                this.setData({
                    keyPointStatus: false
                });
            }
            // console.log("检测状态为：" + reg.test(val))
            if (!reg.test(val) && val !== '') {
                // console.log("巴巴爸爸吧吧")
                this.setData({
                    keyNumStatus: true
                });
            } else {
                this.setData({
                    keyNumStatus: false
                });
            }
            // 更新输入数据
            this.setData({
                keyValue: val
            });
            // 更新折扣后数据
            this.discountFn(val);
        }
    },
    // 折扣计算算法
    discountFn: function(val) {
        // console.log(this.data.payData.user.discountData)
        var valNum = parseFloat(val);
        var discountData = this.data.payData.user.discountData;
        var discountResultCatch = {
            key: 0,
            result: 0
        };
        console.log('折扣前价格' + val);
        if (typeof discountData === "object") {
            discountData.forEach(function(item, key) {
                var vals = 0;
                if (item.type === 1) {
                    // console.log("我开始算优惠券的折扣啦")
                    if (valNum >= item.limit) {
                        // console.log("满足条件了哦")
                        vals = valNum - item.discont;
                        vals = vals.toFixed(2);
                        console.log("优惠券结果" + vals);
                        if (vals > discountResultCatch.result) {
                            discountResultCatch.key = key;
                            discountResultCatch.result = vals;
                        }
                    } else {
                        vals = valNum;
                        vals = vals.toFixed(2);
                        console.log("只有" + vals + ",还不够" + item.limit + "无法使用优惠券");
                        if (vals > discountResultCatch.result) {
                            discountResultCatch.key = key;
                            discountResultCatch.result = vals;
                        }
                    }
                } else if (item.type === 2) {
                    vals = Math.floor(valNum / item.limit) * item.discont;
                    vals = valNum - vals;
                    vals = vals.toFixed(2);
                    console.log("每满减结果-----" + vals);
                    if (vals < discountResultCatch.result) {
                        if (discountData[discountResultCatch.key].type != 3) {
                            discountResultCatch.key = key;
                            discountResultCatch.result = vals;
                        }
                    }
                } else if (item.type === 3) {
                    vals = valNum * item.discont;
                    vals = vals.toFixed(2);
                    console.log("折扣结果-----" + vals);
                    if (vals <= discountResultCatch.result) {
                        discountResultCatch.key = key;
                        discountResultCatch.result = vals;
                    }
                }

            });
            console.log(discountResultCatch);
            console.log(discountData[discountResultCatch.key]);
        }
        if (discountResultCatch.result !== 0 || discountResultCatch.result !== '0') {
            this.setData({
                keyDiscountValue: discountResultCatch.result,
                keyDiscountContent: discountData[discountResultCatch.key].content
            });
        } else {
            this.setData({
                keyDiscountValue: discountResultCatch.result,
                keyDiscountContent: "暂无优惠"
            });
        }



    },
    // 拉起支付功能
    wxPayBtnFn: function() {
        console.log("支付啦");
            // 商户系统和微信支付系统主要交互：
            // 主要流程：（图）https://pay.weixin.qq.com/wiki/doc/api/img/wxa-7-2.jpg
            // 1、小程序内调用登录接口，获取到用户的openid,api参见公共api【小程序登录API】https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=20161122
            // 2、商户server调用支付统一下单，api参见公共api【统一下单API】https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1
            // 3、商户server调用再次签名，api参见公共api【再次签名】https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7
            // 4、商户server接收支付通知，api参见公共api【支付结果通知API】https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_7
            // 5、商户server查询支付结果，api参见公共api【查询订单API】https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_2
            // wx.requestPayment({
            //     'timeStamp': '1230000109',【前端生成】
            //     'nonceStr': '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',【】 //随机算法 https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_3
            //     'package': 'prepay_id=12312333333333333', 【后台给】统一下单接口返回的 prepay_id 参数值 https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1
            //     'signType': 'MD5',
            //     'paySign': '', https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_3 【后台给】
            //     'success': function(res) {},
            //     'fail': function(res) {}
            // })
            // 主要流程  把交易额，优惠信息，时间戳，留言等信息传递给后台，
            // 后台拿到aoopenId,生成商户订单，调用统一下单API，返回 prepay_id,整合数据签名后返回给前端小程序（5个参数和sign）
            // 前端吊起支付 wx.requestPayment，返回支付结果，展示支付结果。支付完成。。。

        wx.navigateTo({
            url: "../paysuccess/paysuccess"
        });
    },
    onShareAppMessage: function() {
        return {
            title: '自定义分享标题',
            path: '/pages/index/index'
        };
    }
});
