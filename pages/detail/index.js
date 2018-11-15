Page({

  /**
   * 组件的初始数据
   */
  data: {
    productData: [],
    imgUrls: [],
    userInfo: [],
    buyAlert: false,
    buyButton: {
      content: '立即购买',
      type: 'primary',
      disabled: false
    }
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
          wx.setNavigationBarTitle({
            title: res.data[0].name 
          })
          than.setData({
            productData: res.data[0],
            imgUrls: res.data[0].swiper.split('|')
          });
          if (res.data[0].stock == 0) {
            than.soldOut();
          }
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
  soldOut () {
    wx.showToast({
      title: '该商品已售罄',
      image: '../../images/alert.png',
      duration: 2000
    });
    this.setData({
      buyButton: {
        content: '已售罄',
        type: 'primary',
        disabled: true
      }
    });
  },
  buy (e) {
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
    wx.showModal({
      title: '提示',
      content: '无需线上付款，点击确定下单即可生成一个新的订单',
      showCancel: true,
      cancelText: '取消下单',
      confirmText: '确认下单',
      success: function (res) {
        if (res.confirm) {
          than.buybuybuy(than.data.productData, than.data.userInfo);
        }
      }
    })
  },
  countDown (than, count) {
    if (count == 0) {
      than.setData({
        buyButton: {
          content: '立即购买',
          type: 'primary',
          disabled: false
        }
      });
      return;
    } else {
      than.setData({
        buyButton: {
          content: count,
          type: 'primary',
          disabled: true
        }
      });
    }
    
    setTimeout(()=>{
      count--;
      than.countDown(than, count);
    }, 1000);
  },
  buybuybuy (pro, user) {
    let than = this;
    wx.request({
      url: 'https://zytao.cc/server/snack/admin.php/product/order',
      method: 'POST',
      data: JSON.stringify({
        product: {
          id: pro.id,
          name: pro.name,
          price: pro.price
        },
        userinfo: user.id
      }),
      success: function (res) {
        if (res.statusCode === 200) {
          if (res.data.stock == 0) {
            than.soldOut();
          } else {
            than.countDown(than, 8);
            // 更新前端显示的账户余额
            wx.getStorage({
              key: 'userInfo',
              success: res => {
                if (res.errMsg) {
                  let oldMoney = Number(res.data.over_money);
                  let proPrice = Number(pro.price);
                  if (oldMoney >= proPrice) {
                    res.data.over_money = oldMoney - proPrice;
                  } else {
                    res.data.over_money = oldMoney;
                  }
                  wx.setStorage({
                    key: 'userInfo',
                    data: res.data
                  });
                }
              }
            });
            wx.showToast({
              title: '自己去拿~',
              icon: 'success',
              duration: 2000
            });
          }
        }
      },
      fail: function () {},
      complete: function () {}
    });
  }
})