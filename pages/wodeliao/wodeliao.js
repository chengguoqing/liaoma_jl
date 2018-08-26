// pages/wodeliao/wodeliao.js
import base from "../../utils/base.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_mm: 0,
    isgeng_d: false, //没有更多数据了
    isgeng_d_er: false,
    is_msd: [{
      name: "我卖的料",
      cls: "act"
    }, {
      name: "我买的料",
      cls: ""
    }],
    x_remove_resource: [],
    page_sdf: 1,
    pageNo_er: 1,
    x_get_order_list_d: [] //我买的料



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var login_wer = JSON.parse(wx.getStorageSync('x_login')),
      is_msd=[{
        name: "我生成的料",
        cls: "act"
      }, {
          name: "我看过的料",
          cls: ""
        }]

    if (login_wer.data.is_hide == 1) {
      
      this.setData({ is_msd: is_msd })
    }

  },

  sd_ddrfgfxv(e) {
    let idx = e.currentTarget.dataset.idx,
      is_msd = this.data.is_msd
    is_msd.map(a => {
      a.cls = ""
    })
    is_msd[idx].cls = "act"

    if (idx == 0) {
      this.get_mai_liao()
    } else {
      this.get_maier()
    }
    this.setData({
      is_msd: is_msd,
      is_mm: idx
    })
  },


  get_maier() {

    let x_get_order_list = {},
      th = this,
      isgeng_d_er = this.data.isgeng_d_er,
      x_get_order_list_d = this.data.x_get_order_list_d
    x_get_order_list.pageNo = this.data.pageNo_er
    base.ajax("x_get_order_list", x_get_order_list, function(data) {
      data.data.map(a => {
        a.timedf = base.time_er(a.create_time)
        x_get_order_list_d.push(a)
      })

      if (data.data.length < 10) {
        isgeng_d_er = true
      }


      th.setData({
        x_get_order_list_d: x_get_order_list_d,
        isgeng_d_er: isgeng_d_er
      })

    })

  },
  delect_er(e) { //我买的料删除
    var ssd_ceet = {},
      th = this,
      idx = e.currentTarget.dataset.idx,
      sd_dft_rr = this.data.x_get_order_list_d
    ssd_ceet.id = e.currentTarget.dataset.idr,

      wx.showModal({
        title: '提示',
        content: '确定是否删除这条记录？',
        success: function(res) {
          if (res.confirm) {
            base.ajax("x_remove_order", ssd_ceet, function(data) {
              sd_dft_rr.splice(idx, 1);
              th.setData({
                x_get_order_list_d: sd_dft_rr
              })
            })
          }
        }

      })

  },
  get_mai_liao() { //我卖的料
    var x_remove = {},
      th = this,
      isgeng_d = this.data.isgeng_d,
      x_remove_resource = this.data.x_remove_resource
    x_remove.pageNo = this.data.page_sdf

    base.ajax("x_get_resource_list", x_remove, function(data) {
      data.data.map(a => {

        if (a.is_expire == 2) {
          a.zhuangts = "已过期"
        }
        if (a.is_refund == 1) {
          a.zhuangts = "有退款"
        }
        if (a.is_refund == 2) {
          a.zhuangts = "已退款"
        }

        if (0 == a.sale || '2' == a.is_refund || ('2' == a.is_expire && '0' == a.is_refund) || a.valid_time > 6) {
          a.dele_d = true
        }

        a.timedf = base.time_er(a.create_time)
        x_remove_resource.push(a)

      })
      if (data.data.length < 10) {
        isgeng_d = true
      }

      th.setData({
        isgeng_d: isgeng_d
      })
      th.setData({
        x_remove_resource: x_remove_resource
      })
    })
  },

  delect(e) { //删除
    var ssd_ceet = {},
      th = this,
      idx = e.currentTarget.dataset.idx,
      sd_dft_rr = this.data.x_remove_resource
    ssd_ceet.id = e.currentTarget.dataset.idr,

      wx.showModal({
        title: '提示',
        content: '确定是否删除这条记录？',
        success: function(res) {
          if (res.confirm) {
            base.ajax("x_remove_resource", ssd_ceet, function(data) {
              sd_dft_rr.splice(idx, 1);
              th.setData({
                x_remove_resource: sd_dft_rr
              })
            })
          }
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
    this.setData({
      page_sdf: 1,
      pageNo_er: 1,
      x_remove_resource: [],
      x_get_order_list_d: []
    })
    this.get_mai_liao()
    this.get_maier()
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
    if (this.data.is_mm == 0) {
      let page_sdf = this.data.page_sdf,
        isgeng_d = this.data.isgeng_d
      if (!isgeng_d) {
        ++page_sdf
        this.setData({
          page_sdf: page_sdf
        })
        this.get_mai_liao()
      }
    } else {

      let page_sdf = this.data.pageNo_er,
        isgeng_d = this.data.isgeng_d_er
      if (!isgeng_d) {
        ++page_sdf
        this.setData({
          pageNo_er: page_sdf
        })
        this.get_maier()
      }




    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})