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
    showOrderList: [],
    arrears: 0,
    currentTab: 0
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
          if (!res.data.avatarUrl) {
            res.data.avatarUrl = '../../images/head.png';
          }
          than.setData({
            userInfo: res.data
          });
          than.getOrderList(res.data.id, function () {
            than.clickTab(null);
          });
        }
      }
    });
  },
  getOrderList (userId, fun) {
    let than = this;
    wx.request({
      url: 'https://zytao.cc/server/snack/admin.php/api/getOrderList',
      method: 'POST',
      data: JSON.stringify({
        id: userId
      }),
      success: function (res) {
        if (res.statusCode === 200) {
          if (res.data != null) {
            than.setData({
              orderList: res.data
            });
            let nowMoney = 0;
            for (const iterator of res.data) {
              if (!iterator.bill){
                nowMoney += parseInt(iterator.pro_price * 10)
              }
            }
            than.setData({
              arrears: nowMoney / 10
            });
            fun();
          }
        }
      },
      fail: function () {},
      complete: function () {}
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let than = this;
    wx.showNavigationBarLoading();
    wx.request({
      url: 'https://zytao.cc/server/snack/admin.php/api/getUserIntegral',
      method: 'POST',
      data: JSON.stringify({
        openid: this.data.userInfo.openid
      }),
      success: function (res) {
        if (res.statusCode === 200) {
          than.setData({
            userInfo: res.data[0]
          });
          wx.setStorage({
            key: 'userInfo',
            data: res.data[0]
          });
        }
      },
      fail: function () { },
      complete: function () { }
    })
    than.getOrderList(this.data.userInfo.id, function () {
      than.setData({
        currentTab: 0
      });
      than.clickTab(null);
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    });
  },
  clickTab(event) {
    var pos;
    if (event) {
      console.log(event);
      pos = event.target.dataset.pos;
    } else {
      pos = 0;
    }
    this.setData({
      currentTab: pos
    });
    var newList = [];
    for(var key in this.data.orderList) {
      if (this.data.orderList[key].status == pos) {
        newList.push(this.data.orderList[key]);
      }
    }
    this.setData({
      showOrderList: newList
    });
  }
})
