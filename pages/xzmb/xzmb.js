// pages/xzmb/xzmb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xz_dsf: [{
      id: 1,
      cls: "act",
      yanse: '#FE761E,#EC3004'
    }, {
      id: 2,
      cls: "",
        yanse: "#F13C06,#FFB669"
    }, {
      id: 3,
      cls: "",
        yanse: "#AB3482,#FCD8B7"
    }, {
      id: 4,
      cls: "",
        yanse: "#8763DA,#CFD5DF"
    }, {
      id: 5,
      cls: "",
        yanse: "#E14AAD,#30B0FE"
    }, {
      id: 6,
      cls: "",
        yanse: "#2D2F3C,#FF8041"
    }, {
      id: 7,
      cls: "",
        yanse: "#46B7B5,#D55326"
    }, {
      id: 8,
      cls: "",
        yanse: "#3DC7DA,#B2D501"
    }, {
      id: 9,
      cls: "",
        yanse: "#DE3319,#FD4626"
    }, {
      id: 10,
      cls: "",
      yanse: "#FE0000,#FB8B03"
    }]
  },
  sd_ddfgs(e) {
    let idx = e.currentTarget.dataset.idx,
      xz_dsf = this.data.xz_dsf
    xz_dsf.map(a => {
      a.cls = ""
    })
    xz_dsf[idx - 1].cls = "act"
    this.setData({
      xz_dsf: xz_dsf
    })
    wx.setStorageSync('id_s', idx)
    wx.setStorageSync('yanse', xz_dsf[idx - 1].yanse)
    wx.switchTab({
      url: '/pages/index/index?id_s=' + idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id_s = options.id_s - 1,
      xz_dsf = this.data.xz_dsf
    xz_dsf.map(a => {
      a.cls = ""
    })
    xz_dsf[id_s].cls = "act"
    this.setData({
      xz_dsf: xz_dsf
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