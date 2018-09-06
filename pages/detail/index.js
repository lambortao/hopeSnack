Page({

  /**
   * 组件的初始数据
   */
  data: {
    productData: [],
    imgUrls: []
  },
  onLoad: function (options) {
    console.log(options.id);
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
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    buy () {
      wx.showModal({
        title: '提示',
        content: '该小程序为公司内部使用，外部人员请勿下单',
        showCancel: false,
        confirmText: '知道了',
        success: function(res) {
          if (res.confirm) {
            wx.showToast({
              title: '下单成功',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
    }
  }
})
