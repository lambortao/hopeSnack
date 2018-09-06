Page({

  /**
   * 组件的初始数据
   */
  data: {
    imgUrls: [
      'https://placeimg.com/750/540/any',
      'https://placeimg.com/750/540/any',
      'https://placeimg.com/750/540/any',
      'https://placeimg.com/750/540/any'
    ]
  },
  onLoad: function (options) {
    console.log(options.id);
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
