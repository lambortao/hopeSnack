Page({
  data: {
    openid: ''
  },
  onLoad: function() {
    // 获取openid，到后台去查询该用户是否为第一次登录
    let than = this;
    this.wxLogin().then(code => {
      wx.request({
        url: 'https://zytao.cc/server/snack/admin.php/api/findUser',
        method: 'POST',
        data: JSON.stringify(code),
        success: function (res) {
          if (typeof res.data == 'string') {
            // 未注册，将openID抛出去，等待用户授权完成后到后台注册
            than.openid = res.data;
          } else {
            // 已经注册，直接进入小程序

          }
        }
      })
    });
  },
  // 用户手动点击获取信息的接口
  onGetUserinfo: function(e) {
    let userInfo = e.detail.userInfo;
    userInfo.openid = this.openid;
    console.log(userInfo);
    wx.request({
      url: 'https://zytao.cc/server/snack/admin.php/api/saveUserInfo',
      method: 'POST',
      data: JSON.stringify(userInfo),
      success: function (res) {
        console.log(res.data);
      },
      fail: function () {},
      complete: function () {}
    })
  },
  // 获取用户识别code
  wxLogin: function () {
    return new Promise ((resP, rejP) => {
      wx.login({
        success: res => {
          if (res.code) {
            resP(res.code);
          }
        }        
      })
    })
  },
  // 获取用户个人信息
  wxGetUserInfo: function () {
    return new Promise((resP, rej) => {
      // 获取授权
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 获取授权后再获取用户信息
            wx.getUserInfo({
              success: res => {
                resP(res.userInfo);
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
    })
  }
})