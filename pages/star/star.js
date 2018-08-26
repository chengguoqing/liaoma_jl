// pages/star/star.js
import base from "../../utils/base.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this



    this.getUserInfo()
  }, 
  getUserInfo: function(cb) { 
 
    wx.login({
      success: function (code) { 
        console.log()
        wx.getUserInfo({
          success: function (res) {
            var x_login = {}
            x_login.iv = res.iv
            x_login.encryptedData = res.encryptedData
            x_login.code = code.code
            base.ajax("x_login", x_login, function (data) {
              wx.setStorageSync('x_login', JSON.stringify(data))
              wx.switchTab({
                url: '/pages/index/index'
              })
            })
          }
        })
      }
    })

  },
  /** 
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})