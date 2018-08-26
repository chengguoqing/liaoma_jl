// pages/shouru/shouru.js
import base from "../../utils/base.js"
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    sd:"",
    user_info:"",
    is_hide:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var login_wer = JSON.parse(wx.getStorageSync('x_login'))
    this.setData({ user_info: login_wer.data.userInfo})
    if (login_wer.data.is_hide == 1) {
      this.setData({ is_hide: false })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var th = this
    base.ajax("x_get_account", {}, function (data) {
      th.setData({ sd: data.data })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})