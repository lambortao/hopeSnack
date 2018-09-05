// pages/order/index.js
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  onReady: function() {
    let than = this;
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        if (res.errMsg) {
          than.setData({
            userInfo: res.data
          });
        }
      }
    })
  },
  onShow: function() {
    // 每次点击进来都要重新加载的东西有：
    // 余额、订单列表、订单状态、未结算金额
    console.log('xx');
  }
})
