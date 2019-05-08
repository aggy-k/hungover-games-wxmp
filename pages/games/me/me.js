// pages/games/me/me.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      userAdmin: app.globalData.userAdmin
    });
    console.log('hello from console')
    console.log(this.data.userInfo)
    console.log(app.globalData.userAdmin)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }, 

  gameRules(e) {
    wx.navigateTo({
      url: `../../gameRules/gameRules`
    })
  }, 

  manageIndex(e) {
    wx.navigateTo({
      url: `../../manage/index/index`,
    })
  },
})