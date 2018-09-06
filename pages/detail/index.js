Page({

  /**
   * 组件的初始数据
   */
  data: {
    productData: [],
    imgUrls: [],
    userInfo: [],
    buyAlert: false
  },
  onLoad: function (options) {
    let than = this;
    wx.request({
      url: 'https://zytao.cc/server/snack/admin.php/product/detail',
      method: 'POST',
      data: JSON.stringify({
        id: options.id
      }),
      success: function (res) {
        if (res.statusCode === 200) {
          than.setData({
            productData: res.data[0],
            imgUrls: res.data[0].swiper.split('|')
          });
        }
      },
      fail: function () {},
      complete: function () {}
    });
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        if (res.errMsg) {
          than.setData({
            userInfo: res.data
          });
        }
      }
    });
  },
  buy (e) {
    let lsBuy = wx.getStorageSync('buyAlert');
    if (this.data.productData.length === 0) {
      wx.showToast({
        title: '获取商品信息失败！',
        icon: 'success',
        duration: 5000
      });
      return;
    }
    if (this.data.userInfo.length === 0) {
      wx.showToast({
        title: '获取用户信息失败！',
        icon: 'success',
        duration: 5000
      });
      return;
    }
    let than = this;
    if (lsBuy) {
      this.buybuybuy();
    } else {
      wx.showModal({
        title: '提示',
        content: '该小程序为公司内部使用，外部人员请勿下单',
        showCancel: true,
        cancelText: '不再显示',
        confirmText: '我已知晓',
        success: function(res) {
          if (res.confirm) {
            than.buybuybuy();
          } else if (res.cancel) {
            wx.setStorageSync('buyAlert', true);
            than.buybuybuy();
          }
        }
      })
    }
  },
  buybuybuy: () => {
    wx.showToast({
      title: '下单成功',
      icon: 'success',
      duration: 2000
    });
  }
})
