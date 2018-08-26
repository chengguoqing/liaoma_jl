// pages/mingxi/mingxi.js
import base from "../../utils/base.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1,
    sd_kis: [],
    is_dsrt: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_mx()
  },
  get_mx() {
    let pageNo = this.data.pageNo,
      x_get_transfer_list = {},
      th = this,
      sd_kis = this.data.sd_kis

    x_get_transfer_list.pageNo = pageNo
    base.ajax("x_get_account_list", x_get_transfer_list, function (data) {
      data.data.map(a => {
        a.timedf = base.time_er(a.create_time)
        if (a.type == '1'){
          a.amount = "+" + a.amount
        }
        if (a.type == '2') {
          a.amount = "(消费)-" + a.amount
        }
        if (a.type == '3') {
          a.amount = "(退款)+" + a.amount
        }
        if (a.type == '4') {
          a.amount = "(退款)-" + a.amount
        }


        sd_kis.push(a)
      })
      if (data.data.length < 10) {
        th.setData({
          is_dsrt: true
        })
      }
      th.setData({
        sd_kis: sd_kis
      })
    })
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

    let pageNo = this.data.pageNo,
      is_dsrt = this.data.is_dsrt
    if (!is_dsrt) {
      ++pageNo
      this.setData({
        pageNo: pageNo
      })
      this.get_mx()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})