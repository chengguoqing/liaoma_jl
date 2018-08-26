// pages/list_de/list_de.js
import base from "../../utils/base.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sd: "",
    srr_df: 0,
    ma_sdfg: "",
    type_e: "",
    liao_id: 0,
    pageNo: 1,
    is_dsrt: false,
    code_d: "",
    femsd_sd: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var code_d = options.code_r,
      th = this
    this.setData({
      srr_df: code_d,
      type_e: options.type_e,
      liao_id: options.code_r,
      code_d: code_d
    })

    var login_wer = JSON.parse(wx.getStorageSync('x_login'))
    this.setData({
      ma_sdfg: login_wer.data.img_url_qr
    })

    this.get_liao()

    this.liaoinfo()

  },
  liaoinfo() {
    var x_get_resource_info = {},
      th = this,
      code_d = this.data.code_d
    x_get_resource_info.id = code_d
    base.ajax("x_get_resource_info", x_get_resource_info, function(data) {
      th.setData({
        sd: data.data
      })
    })
  },
  get_liao() {
    let x_get_resource_order = {},
      pageNo = this.data.pageNo,
      femsd_sd = this.data.femsd_sd,
      th = this,
      is_dsrt = this.data.is_dsrt
    x_get_resource_order.id = this.data.srr_df
    x_get_resource_order.pageNo = pageNo
    base.ajax("x_get_resource_order", x_get_resource_order, function(data) {
      data.data.map(a => {
        a.timedf = base.time_er(a.create_time)
        femsd_sd.push(a)
      })
      if (data.data.length < 10) {
        th.setData({
          is_dsrt: true
        })
      }
      th.setData({
        femsd_sd: femsd_sd
      })
    })
  },

  yijian() {
    var liao_id = this.data.liao_id,
      x_one_notice = {}
    x_one_notice.id = liao_id

    wx.showModal({
      title: '提示',
      content: '关注公众号才能收到通知',
      success: function(res) {
        if (res.confirm) {
          base.ajax("x_one_notice", x_one_notice, function(data) {
            wx.showToast({
              title: data.msg,
              icon: 'none',
              duration: 2000
            })
          })

        }

      }

    })
  },
  suy_deertty() { //关闭按钮触发
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  yitkus() {

    var liao_id = this.data.liao_id,
      th = this,
      x_one_notice = {}
    x_one_notice.id = liao_id


    wx.showModal({
      title: '提示',
      content: '确定要发起一键退款？',
      success: function(res) {
        if (res.confirm) {
          base.ajax("a_one_refund", x_one_notice, function(data) {

            wx.showModal({
              title: '提示',
              showCancel: false,
              content: data.msg,
              success: function (res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '/pages/list_de/list_de?code_r=' + liao_id
                  })
                }
              }
            })

         



          })
        }
      }
    })






  },



  baocun(e) {
    let url_e = "",
      ma_sdfg = this.data.ma_sdfg,
      sd = this.data.sd


    url_e = ma_sdfg + sd.img_url



    wx.getImageInfo({
      src: url_e,
      success: function(sres) {
        wx.saveImageToPhotosAlbum({
          filePath: sres.path,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'none',
              duration: 2000
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


    let pageNo = this.data.pageNo,
      is_dsrt = this.data.is_dsrt
    if (!is_dsrt) {
      ++pageNo
      this.setData({
        pageNo: pageNo
      })
      this.get_liao()
    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})