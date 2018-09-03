Page({
  onLoad: function() {
    return;
    wx.getSetting({
      success: res => {
        // 首先验证是否有读取用户信息的权限
        if (res.authSetting['scope.userInfo']) {
          // 获取授权后再获取用户信息
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo);
            },
            fail: error => {
              console.log(error);
            }
          })
        }
      }
    })
  },
  // 用户手动点击获取信息的接口
  onGetUserinfo: function(res) {
    console.log(res);
  }
})