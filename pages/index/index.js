//index.js
//获取应用实例
const app = getApp()
// pages/index/src/tools.js
var util = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    productList: [],
    showProductList: [],
    tagActive: 0,
    productTagList: [{
      id: '0',
      intro: '全部',
      name: 'all'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getProductList(function() {});
    this.getProductTagList();
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  getProductList(fun) {
    let than = this;
    wx.request({
      url: 'https://zytao.cc/server/snack/admin.php/product/getProductList',
      method: 'POST',
      success: function (res) {
        if (res.statusCode === 200) {
          than.setData({
            productList: res.data
          });
          than.clickTag('all');
          fun();
        }
      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
      }
    });
  },
  getProductTagList() {
    let than = this;
    wx.request({
      url: 'https://zytao.cc/server/snack/admin.php/product/getProductTagList',
      method: 'POST',
      success: function (res) {
        if (res.statusCode === 200) {
          than.setData({
            productTagList: [{
              id: '0',
              intro: '全部',
              name: 'all'
            }]
          })
          res.data = than.data.productTagList.concat(res.data);
          // 取余，防止对不齐
          let yu = res.data.length % 3;
          if (yu > 0) {
            let yux = yu == 1 ? 2 : 1;
            for (let i = 0; i < yux; i++) {
              res.data.push('');
            }
          }
          than.setData({
            productTagList: res.data
          })
        }
      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
      }
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  // 点击切换分类
  clickTag(event) {
    if (event == 'all') {
      this.setData({
        showProductList: this.data.productList,
        tagActive: 0
      });
    } else {
      let tag = event.target.dataset.tag;
      if (tag == undefined) {
        return;
      } else if (tag == 'all') {
        this.setData({
          showProductList: this.data.productList,
          tagActive: 0
        });
      } else {
        let newList = [];
        let pos = event.target.dataset.pos;
        for (var key in this.data.productList) {
          if (this.data.productList[key].tag.indexOf(tag) > -1) {
            newList.push(this.data.productList[key]);
          }
        }
        this.setData({
          showProductList: newList,
          tagActive: pos
        });
      }
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getProductList(function() {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    });
  },

  startPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
