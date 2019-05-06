// pages/manage/signup/signup.js
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
    console.log('onLoad options is', options)
    const game_id = options.game_id;
    this.setData({game_id: game_id})
    const url = app.globalData.url;
    const page = this;

    wx.request({
      url: `${url}games/${game_id}`,
      success(res) {
        console.log('res', res);
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

  back: function (e) {
    console.log(e)
    const game_id = e.currentTarget.dataset.game_id;

    wx.navigateTo({
      url: `/pages/manage/show/show?id=${game_id}`,
    })
  },

  editAttendeeStatus(e) {
    console.log(22, e)
    const id = e.currentTarget.dataset.id
    const game_id = this.data.game_id

    wx.navigateTo({
      url: `../signup_edit/signup_edit?id=${id}&game_id=${game_id}`,
    })
  }
})