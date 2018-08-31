//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 获取到微信code和用户信息后拼在一起发到后台
    // 后台会返回用户信息和openid
    this.wxLogin().then(code => {
      this.wxGetUserInfo().then(userInfor => {
        userInfor.wxCode = code;
        wx.request({
          url: 'https://zytao.cc/server/snack/admin.php/api/getOpenId',
          method: 'POST',
          data: JSON.stringify(userInfor),
          success: function (res) {
            console.log(res)
          },
          fail: function () {},
          complete: function () {}
        })
      })
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