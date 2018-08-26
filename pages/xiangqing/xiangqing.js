// pages/xiangqing/xiangqing.js
import base from "../../utils/base.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sd: "",
    content_l: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var x_get_resource_detail = {},
      th = this,
      content_l = this.data.content_l
    x_get_resource_detail.id = options.id_r
    base.ajax("x_get_resource_detail", x_get_resource_detail, function(data) {

      data.data.content_l.map(a => {
        a.timedf = base.time_er(a.create_time)
        a.imgder = []
        try {
          a.img.split(",").map(b => {
            if (b) {
              var sd_deret = JSON.parse(wx.getStorageSync('x_login')).data.img_url
              sd_deret += b
              console.log(sd_deret)
              a.imgder.push(sd_deret)
            }
          })
        } catch (e) {

        }
        String.prototype.my_eer=function(f,e){
          var reg=new RegExp(f,'g')
          return this.replace(reg,e)
        }
        a.content = a.content.my_eer('&nbsp;', "")
        a.content = a.content.my_eer('<br/>', "\n")
        content_l.push(a)
      })


      th.setData({
        sd: data.data.resource,
        content_l: content_l
      })
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