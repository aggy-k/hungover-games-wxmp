// pages/games/show/show.js
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
    // Testing only, to be removed
    this.setData({
      game_id: 1
    })

    // load signup data for this game_id if user already signed up
    // How to handle 2 signups?
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
    const page = this;
    console.log(page)
    const url = app.globalData.url;
    console.log(e.detail.target.dataset)
    const game_id = e.detail.target.dataset.game_id
    console.log(game_id)
    const user_id = 1;
    const attendee_status = 'signed-up'

    wx.request({
      url: `${url}signups?game_id=${game_id}&user_id=${user_id}`,
      method: 'POST',
      data: {"attendee_status": attendee_status},
      success(res) {
        // wx.reLaunch({
        //   url: page,
        // })
      }
    })
  }
})