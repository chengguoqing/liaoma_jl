import base from "../../utils/base.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    s_kj_der: [],
    img: [], //图片
    content: "", //内容
    title: "",
    id_r: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      title: options.title,
      id_r: options.liao_id
    })

  },

  fangda_dr(e) { //放大图片
    let imger = e.currentTarget.dataset.imger,
      s_kj_der = this.data.s_kj_der
    wx.previewImage({
      current: imger, // 当前显示图片的http链接
      urls: s_kj_der // 需要预览的图片http链接列表
    })
  },
  qzuijia() { //确认追加按钮触发
    let img = this.data.img,
      content = this.data.content,
      id_r = this.data.id_r

    if (!content && img.length <= 0) {
      wx.showToast({
        title: '请输入文字或上传图片',
        icon: 'none',
        duration: 2000
      })
      return
    }

    let x_add_content = {}
    x_add_content.id = id_r
    x_add_content.content = content
    x_add_content.img = img.join(",")
    base.ajax("x_add_content", x_add_content, function(data) {
      wx.showToast({
        title: '追加成功',
        icon: 'none',
        duration: 2000,
        success: function() {
          wx.redirectTo({
            url: '/pages/xiangqing/xiangqing?id_r=' + id_r
          })
        }
      })
    })



  },
  get_content(e) {
    this.setData({
      content: e.detail.value
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
      s_kj_der: s_kj_der
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
    this.setData({
      is_liao: is_liao
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