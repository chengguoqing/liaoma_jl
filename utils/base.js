exports.openid = 0

exports.animation = wx.createAnimation({
  duration: 1000,
  timingFunction: 'ease',
})
// this.setData({ shdizsd: base.pup_bottom(-300)})
exports.pup_bottom = function (zb) { 
  var animation = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease',
  })
  animation.translateY(zb + "px").step()
  return animation.export()
}
var yan = { 
  mail: function (vs_s) {
    var sd_sf = false
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/ //验证邮箱
    if (re.test(vs_s)) {
      sd_sf = true
    }
    return sd_sf;
  },
  phone: function (vs_s) {
    var sd_sf = false
    if (vs_s.match(/^13[0-9]{9}|15[0-9]{9}|17[0-9]{9}|18[0-9]{9}$/) && vs_s.length == 11) {
      sd_sf = true
    }
    return sd_sf;
  },
  car_t: function (vs_s) {
    var sd_sf = false
    var re = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
    if (re.test(vs_s)) {
      sd_sf = true
    }
    return sd_sf;
  }
}
exports.yan = yan
exports.chengshi = function (e) {
  this.setData({
    region: e.detail.value
  })
}
exports.cls = function (arr, b) {
  let arr_e = arr
  arr_e.map(function (a) {
    a.cls = ""
  })
  arr_e[b].cls = "act"
  return arr_e
}

exports.dsf_sd_s = function (target) {
  var scrollT = document.documentElement.scrollTop
}

exports.time_er = function (val){
  var crtTime = new Date(val);
  return dateFtt("yyyy-MM-dd hh:mm:ss", crtTime);
}


function dateFtt(fmt, date) { //author: meizz   
  var o = {
    "M+": date.getMonth() + 1,                 //月份   
    "d+": date.getDate(),                    //日   
    "h+": date.getHours(),                   //小时   
    "m+": date.getMinutes(),                 //分   
    "s+": date.getSeconds(),                 //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
} 


exports.ajax = function (ur_l, dat_a, callbrealk) {
  try{
    var login_wer = JSON.parse(wx.getStorageSync('x_login'))
    dat_a.token =  login_wer.data.token
    console.log(login_wer)
  }catch(e){

  }  
 
  wx.showLoading({  
    icon: "none", 
    title:"处理中...", 
    mask:true
  })
  //'https://lmjl.ttkgou.com/lmjl_core/xcx/'
  wx.request({ 
    url: 'https://lmjl.ttkgou.com/lmjl_core/xcx/' + ur_l, //仅为示例，并非真实的接口地址
    data: dat_a,
    header: {
      'content-type': 'application/json'
    },   
    dataType: "json",  
    success: function (res) {  
      wx.hideLoading()
      if (res.data.code =="0001"){
        wx.setStorageSync('x_login','')
        wx.navigateTo({
          url: '/pages/star/star'
        })
      }
      if (res.data.code !="0000"){
        wx.showToast({
          title: res.data.msg , 
          icon: "none",
          duration: 2000
        }) 
        return
      }
      callbrealk(res.data)
    },error(){
      console.log("请求错误")
    }
  })
}



exports.xiaoshu=function(obj) {//只能输入小数点和整数
  //得到第一个字符是否为负号
  var t = obj.value.charAt(0);
  //先把非数字的都替换掉，除了数字和. 
  obj.value = obj.value.replace(/[^\d\.]/g, '');
  //必须保证第一个为数字而不是. 
  obj.value = obj.value.replace(/^\./g, '');
  //保证只有出现一个.而没有多个. 
  obj.value = obj.value.replace(/\.{2,}/g, '.');
  //保证.只出现一次，而不能出现两次以上 
  obj.value = obj.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
  //如果第一位是负号，则允许添加
  return obj.value

}