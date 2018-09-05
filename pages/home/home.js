Page({
  data: {
    openid: '',
    userInfo: {},
    buttonBool: true,
    loading: true,
    disabled: true,
    buttonText: '加载中...',
    guide: ''
  },
  setLoading: function() {
    this.setData({
      loading: true,
      disabled: true,
      buttonText: '授权获取中...'
    })
  },
  goStoreIndex: function() {
    setTimeout(() => {
      wx.switchTab({
        url: '../index/index'
      })
    }, 500);
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
          console.log(res.data);
          if (typeof res.data == 'string') {
            // 未注册，将openID抛出去，等待用户授权完成后到后台注册
            than.openid = res.data;
            than.setData({
              loading: false,
              disabled: false,
              buttonText: '点击获取授权',
              guide: '为保证正常使用，请点击下方的授权按钮，并在微信授权弹窗点击允许。'
            })
          } else {
            // 已经注册，直接进入小程序
            than.setData({
              buttonBool: false,
              userInfo: res.data,
              loading: false,
              disabled: false,
              guide: '欢迎光临~'
            });
            than.goStoreIndex();
          }
        }
      });
    });
  },
  // 用户手动点击获取信息的接口
  onGetUserinfo: function(e) {
    let userInfo = e.detail.userInfo;
    userInfo.openid = this.openid;
    console.log(userInfo);
    let than = this;
    wx.request({
      url: 'https://zytao.cc/server/snack/admin.php/api/saveUserInfo',
      method: 'POST',
      data: JSON.stringify(userInfo),
      success: function (res) {
        than.setData({
          buttonBool: false,
          userInfo: res.data,
          guide: '欢迎光临~'
        });
        than.goStoreIndex();
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