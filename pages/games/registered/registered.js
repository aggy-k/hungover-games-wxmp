// pages/games/registered/registered.js
Page({

  /**
   * Page initial data
   */
  data: {
    cancelText: ["I'm lame", "I'm a chicken"]
  },

  test: function () {
    const array = ["I'm lame", "I'm a chicken"]
    const num = Math.floor(Math.random() * array.length)
    return array[num]
  }, 

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
    // const page = this
    // wx.request({
    //   url: 'http://localhost:3000/api/v1/games',
    //   success: function (res) {
    //     const games = res.data
    //     games.forEach(function (game) {
    //       game.start_time = page.setDateTime(game.start_time)
    //       game.end_time = page.setDateTime(game.end_time)
    //       game.signup_date = page.setDateTime(game.signup_date)
    //     });
    //     page.setData({ games: games });
    //     console.log(page.data.games)
    //   },
    // })
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