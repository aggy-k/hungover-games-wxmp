// pages/gameRules/edit/edit.js
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
    
    wx.request({
      url: `${url}game_rules`,
      method: 'get',
      success(res) {
        page.setData(res.data)
      }
    })

  },

  saveRules(e) {
    const url = app.globalData.url;
    const page = this;

    const title = e.detail.value.title
    const content = e.detail.value.content
    const data = { title: title, content: content, user_id: 4}
    console.log(data)

    wx.request({
      url: `${url}game_rules`,
      method: 'post',
      data: data,
      success(res) {
        wx.reLaunch({
          url: '/pages/gameRules/index/index',
        })
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

  }
})