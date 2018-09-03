//app.js
App({
  onLaunch: function () {
    // 打开debug
    wx.setEnableDebug({
        enableDebug: true
    });
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    
    // 获取openid，到后台去查询该用户是否为第一次登录
    let than = this;
    this.wxLogin().then(code => {
      wx.request({
        url: 'https://zytao.cc/server/snack/admin.php/api/findUser',
        method: 'POST',
        data: JSON.stringify(code),
        success: function (res) {
          if (typeof res.data == 'string') {
            console.log('未注册');
            than.wxGetUserInfo().then(userInfor => {
              console.log(userInfor);
              // wx.request({
              //   url: 'https://zytao.cc/server/snack/admin.php/api/getOpenId',
              //   method: 'POST',
              //   data: JSON.stringify(userInfor),
              //   success: function (res) {
              //     console.log(res.data);
              //   },
              //   fail: function () {},
              //   complete: function () {}
              // })
            });
          } else {
            console.log('已注册');
          }
          // if (res.data.hasOwnProperty('id')) {
          //   // 从数据库中取出数据
          //   if (res.data.nickName == null && res.data.avatarUrl == null) {
          //     // 数据库中只有openID却没有用户信息的情况下，还需要去拉取用户信息

          //   } else {
          //     // 否则就直接进入index页面

          //   }
          // } else {
          //   // 数据库中没有数据，就开启首屏点击按钮
          //   return;
           
          // }
        }
      })
    });
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