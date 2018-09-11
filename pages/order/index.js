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
    userInfo: {},
    orderList: [],
    arrears: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  onReady: function() {
  
  },
  onShow: function() {
    // 每次点击进来都要重新加载的东西有：
    // 余额、订单列表、订单状态、未结算金额
    let than = this;
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        if (res.errMsg) {
          console.log(res.data.over_money);
          than.setData({
            userInfo: res.data
          });
          than.getOrderList(res.data.id);
        }
      }
    })
  },
  getOrderList (userId) {
    let than = this;
    wx.request({
      url: 'https://zytao.cc/server/snack/admin.php/api/getOrderList',
      method: 'POST',
      data: JSON.stringify({
        id: userId
      }),
      success: function (res) {
        console.log(res);
        if (res.statusCode === 200) {
          than.setData({
            orderList: res.data
          });
          if (res.data != null) {
            let nowMoney = 0;
            for (const iterator of res.data) {
              if (!iterator.bill){
                nowMoney += parseInt(iterator.pro_price * 10)
              }
            }
            than.setData({
              arrears: nowMoney / 10
            });
          }
        }
      },
      fail: function () {},
      complete: function () {}
    });
  }
})
