// pages/index/index.js
import base from "../../utils/base.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateer: "",
    time_sd: "",
    gouxun_s: "",
    is_ssdff_a: "",
    is_ssdff_b: "",
    is_ssdff_c: "",
    is_liao: "",
    s_kj_der: [],
    moban_ds: 9,
    is_sdf:true,
    dingjia: [{
      name: "免费",
      num: 0,
      cls: "act"
    }, {
      name: "1元",
      num: 1,
      cls: ""
    }, {
      name: "5元",
      num: 5,
      cls: ""
    }, {
      name: "18元",
      num: 18,
      cls: ""
    }, {
      name: "38元",
      num: 38,
      cls: ""
    }, {
      name: "68元",
      num: 68,
      cls: ""
    }, {
      name: "88元",
      num: 88,
      cls: ""
    }, {
      name: "188元",
      num: 188,
      cls: ""
    }],
    title: "", //标题
    introduce: "", //简介 
    content: "", //内容
    img: [],
    is_hide:true,
    price: 0, //价格
    is_refund: 0, //是否退款0不退款1有退款
    expire_time_str: "", //过期时间（非必填）
    color_s: "#DE3319", // 二维码上半色
    color_x: "#FD4626", // 二维码下半色
    mh_edfge: ""
  },
  sclm_ddrt() { //生成料码按钮触发
  
    if (!this.data.title) { 
      wx.showToast({
        title: '请输入标题',
        icon: "none",
        duration: 2000
      }) 
      return
    }

    if (!this.data.content && this.data.img.length <= 0) {
      wx.showToast({
        title: '请输入文字或上传图片',
        icon: 'none',
        duration: 2000
      })
      return
    }



    let x_add_resource = {}
    x_add_resource.title = this.data.title
    x_add_resource.introduce = this.data.introduce
    x_add_resource.content = this.data.content
    x_add_resource.img = this.data.img.join(",")
    x_add_resource.price = this.data.price
    x_add_resource.color_s = this.data.color_s
    x_add_resource.color_x = this.data.color_x
    x_add_resource.is_refund = this.data.is_refund
    x_add_resource.expire_time_str = this.data.dateer + " " + this.data.time_sd

    base.ajax("x_add_resource", x_add_resource, function(data) {



      wx.redirectTo({
        url: '/pages/list_de/list_de?type_e=1&code_r=' + data.data
      })
    })





  },
  fangda_dr(e) { //放大图片
    let imger = e.currentTarget.dataset.imger,
      s_kj_der = this.data.s_kj_der
    console.log(imger)
    wx.previewImage({
      current: imger, // 当前显示图片的http链接
      urls: s_kj_der // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    var login_wer = JSON.parse(wx.getStorageSync('x_login'))

    if (login_wer.data.is_hide == 1) {
      this.setData({ is_hide: false })
    }


    





  },
  gettitle(e) {
    this.setData({
      title: e.detail.value
    })

  },
  get_introduce(e) {
    this.setData({
      introduce: e.detail.value
    })
  },
  get_content(e) {
    this.setData({
      content: e.detail.value
    })
  },
  get_price(e) {
    var df_ddf = e.detail.value
    df_ddf = base.xiaoshu({
      value: df_ddf
    })
    console.log(df_ddf)
    this.setData({
      price: df_ddf
    })
  },






  xzmb_erert() {
    let moban_ds = this.data.moban_ds
    wx.navigateTo({
      url: '/pages/xzmb/xzmb?id_s=' + moban_ds
    })
  },
  shg_deert() { //上传图片
    let th = this,
      s_kj_der = this.data.s_kj_der,
      img = this.data.img
    wx.chooseImage({
      success: function(res) {


        var login_wer = JSON.parse(wx.getStorageSync('x_login'))


        res.tempFilePaths.map(a => {
          s_kj_der.push(a)
          wx.uploadFile({
            url: 'https://lmjl.ttkgou.com/lmjl_core/xcx/x_img_upload_one', //仅为示例，非真实的接口地址
            filePath: a,
            name: 'file',
            formData: {
              'token': login_wer.data.token
            },
            success: function(res) {
              let sf_ddr = JSON.parse(res.data)
              console.log(sf_ddr.data)
              img.push(sf_ddr.data)


              console.log(img)

              th.setData({
                s_kj_der: s_kj_der,
                img: img
              })



            }
          })
        })





        // res.tempFilePaths.map(a => {
        //   s_kj_der.push(a)
        // })
        // 

      }

    })
  },
  dsf_derty(e) { //删除图片
    let idx = e.currentTarget.dataset.idx,
      s_kj_der = this.data.s_kj_der,
      img = this.data.img
    img.splice(idx, 1);
    s_kj_der.splice(idx, 1);
    this.setData({
      s_kj_der: s_kj_der,
      img: img
    })
  },
  sddf_dsr(e) {
    let is_liao = this.data.is_liao
    let idx = e.currentTarget.dataset.idx
    if (is_liao) {
      is_liao = false
    } else {
      is_liao = true
    }


    // if (idx!=1){

    //   wx.navigateTo({
    //     url: '/pages/wenzi/wenzi'
    //   })

    // }else{
    //   wx.setStorageSync('wenzi', '')
    // }



    this.setData({
      is_liao: is_liao
    })
  },
  f_is_ssdff_a() {
    let gouxun_s = this.data.is_ssdff_a
    if (gouxun_s) {
      gouxun_s = false
    } else {
      gouxun_s = true
    }
    this.setData({
      is_ssdff_a: gouxun_s
    })
  },
  f_is_ssdff_b() {
    let gouxun_s = this.data.is_ssdff_b
    if (gouxun_s) {
      gouxun_s = false
    } else {
      gouxun_s = true
    }
    this.setData({
      is_ssdff_b: gouxun_s
    })
  },
  f_is_ssdff_c() {
    let gouxun_s = this.data.is_ssdff_c
    if (gouxun_s) {
      gouxun_s = false
    } else {
      gouxun_s = true
    }
    this.setData({
      is_ssdff_c: gouxun_s
    })
  },
  gu_seert() {
    let gouxun_s = this.data.gouxun_s,
      asd_drr = 0
    if (gouxun_s) {
      gouxun_s = false
    } else {
      gouxun_s = true
      asd_drr = 1
    }
    this.setData({
      gouxun_s: gouxun_s,
      is_refund: asd_drr
    })
  },
  qingdf() { //清空按钮触发
    this.setData({
      dateer: '',
      time_sd: ''
    })
  },
  bindDateChange(e) {
    this.setData({
      dateer: e.detail.value
    })
  },
  bindDateChange_er(e) {
    this.setData({
      time_sd: e.detail.value
    })
  },
  sd_drrtt(e) {
    let idx = e.currentTarget.dataset.idx,
      dingjia = this.data.dingjia
    dingjia.map(a => {
      a.cls = ""
    })
    dingjia[idx].cls = "act"
    this.setData({
      dingjia: dingjia,
      price: dingjia[idx].num
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log(3333)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    if (wx.getStorageSync('id_s')) {
      var yanse = wx.getStorageSync('yanse')
      yanse = yanse.split(",")
      this.setData({
        moban_ds: wx.getStorageSync('id_s'),
        color_s: yanse[0],
        color_x: yanse[1]
      })
    }
    if (wx.getStorageSync('wenzi')) {
      this.setData({
        content: wx.getStorageSync('wenzi')
      })
    }
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