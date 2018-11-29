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
    productList: []
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
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let than = this;
    wx.request({
      url: 'https://zytao.cc/server/snack/admin.php/product/getProductList',
      method: 'POST',
      success: function (res) {
        if (res.statusCode === 200) {
          than.setData({
            productList: res.data
          })
        }
      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
      }
    })
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let than = this;
    wx.showNavigationBarLoading();
    wx.request({
      url: 'https://zytao.cc/server/snack/admin.php/product/getProductList',
      method: 'POST',
      success: function (res) {
        if (res.statusCode === 200) {
          than.setData({
            productList: res.data
          });
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        }
      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
      }
    })
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
