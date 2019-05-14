// pages/games/me_edit/me_edit.js
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
    const url = app.globalData.url;
    const page = this;
    const user_id = app.globalData.userId;

    wx.request({
      url: `${url}users/${user_id}`,
      success(res) {
        page.setData(res.data)
      }
    })

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

  formSubmit(e) {
    const url = app.globalData.url;
    const user_id = app.globalData.userId;

    console.log(e)
    const first_name = e.detail.value.firstName;
    const last_name = e.detail.value.lastName;
    const quote = e.detail.value.quote;
    const data = { 
      first_name: first_name,
      last_name: last_name,
      quote: quote
    }

    wx.request({
      url: `${url}users/${user_id}`,
      method: "PUT",
      data: data,
      success(res) {
        wx.reLaunch({
          url: '/pages/games/me/me?id=' + user_id,
        })
      }
    })
  },

  cancelSubmit(e) {
    const user_id = app.globalData.userId;

    wx.switchTab({
      url: '/pages/games/me/me?id=' + user_id,
    })
  },
})