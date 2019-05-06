// pages/manage/signup_edit/signup_edit.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    index: 0,
    array: ['Signed-up', 'Waitlisted', 'Cancelled', 'Late-cancelled', 'No-show', 'Removed']
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(23, options)
    const url = app.globalData.url;
    const page = this;
    const id = options.id;

    wx.request({
      url: `${url}signups/${id}`,
      success(res) {
        console.log(res)
        page.setData(res.data);
        const array = page.data.array
        let index = array.indexOf(res.data.attendee_status.name)
        console.log('new index', index)
        page.setData({ index: index })
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

  radioChange: function (e) {
    console.log('a change event occurred on radio; carry value is: ', e.detail.value)
  },

  formSubmit: function(e) {
    console.log(e)
    const attendeeStatus = e.detail.value.attendeeStatus

    const url = app.globalData.url;
    const id = this.data.id;
    const game_id = this.data.game.id;
    console.log('this.data', this.data)
    console.log(game_id)
    
    wx.request({
      url: `${url}signups/${id}`,
      method: 'PUT',
      data: {attendee_status: attendeeStatus, game_id: game_id},
      success(res) {
        console.log(res)
        wx.navigateTo({
          url: `/pages/manage/signup/signup?game_id=${game_id}`,
        })
      }
    })
  }
})