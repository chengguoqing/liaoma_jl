//app.js
var base = require("./utils/base.js");
App({
  onLaunch: function() {
    wx.checkSession({
      success: function() {
        if (!wx.getStorageSync('x_login')){
          wx.navigateTo({
            url: '/pages/star/star'
          })
        }
      },
      fail: function() {
        wx.setStorageSync('x_login', '')
        wx.navigateTo({
          url: '/pages/star/star'
        })
     
      }
    })
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  doLogin: function(callback = () => {}) {
    let that = this;
    wx.login({
      success: function(loginRes) {
        if (loginRes) {
          //获取用户信息
          wx.getUserInfo({
            withCredentials: true, //非必填  默认为true
            success: function(infoRes) {
              console.log(infoRes, '>>>');
              //请求服务端的登录接口
              wx.request({
                url: api.loginUrl,
                data: {
                  code: loginRes.code, //临时登录凭证
                  rawData: infoRes.rawData, //用户非敏感信息
                  signature: infoRes.signature, //签名
                  encrypteData: infoRes.encryptedData, //用户敏感信息
                  iv: infoRes.iv //解密算法的向量
                },
                success: function(res) {
                  console.log('login success');
                  res = res.data;
                  if (res.result == 0) {
                    that.globalData.userInfo = res.userInfo;
                    wx.setStorageSync('userInfo', JSON.stringify(res.userInfo));
                    wx.setStorageSync('loginFlag', res.skey);
                    console.log("skey=" + res.skey);
                    callback();
                  } else {
                    that.showInfo('res.errmsg');
                  }
                },
                fail: function(error) {
                  //调用服务端登录接口失败
                  // that.showInfo('调用接口失败');
                  console.log(error);
                }
              });
            }
          });
        } else {

        }
      }



    })
  },

  globalData: {
    userInfo: null
  }
})