// pages/games/show/show.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    week: app.globalData.week,
    month: app.globalData.month
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      game_id: options.id
    })
    console.log(`game id is ${this.data.game_id}`)
    // load signup data for this game_id if user already signed up
    // How to handle 2 signups?

    const page = this
    wx.request({
      url: app.globalData.url + `games/${page.data.game_id}`,
      success: function (res) {
        const game = res.data
        game.start_time = page.setDateTime(game.start_time)
        game.end_time = page.setDateTime(game.end_time)
        game.signup_time = page.setDateTime(game.signup_time)

        page.setData({ gameInfo: game });
        console.log(page.data.gameInfo)
      },
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

  setDateTime: function (dateString) {
    const date = new Date(dateString);
    const weekDay = this.data.week[date.getDay()];
    const day = date.getDate();
    const month = this.data.month[date.getMonth()];
    const year = date.getFullYear();
    const time = `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;

    return { weekDay: weekDay, day: day, month: month, year: year, time: time }
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
    console.log('console logging Page')
    console.log(page)
    const url = app.globalData.url;
    const game_id = e.target.dataset.game_id
    console.log('signing up for game id' + game_id)
    console.log(app.globalData)
    // const user_id = app.globalData.userId; 
    const user_id = 1;
    const attendee_status = 'Signed-up'

    wx.request({
      url: `${url}signups?game_id=${game_id}&user_id=${user_id}`,
      method: 'POST',
      data: {"attendee_status": attendee_status},
      success(res) {
        // wx.reLaunch({
        //   url: page,
        // })
        wx.switchTab({
          url: '../registered/registered',
        })
      }
    });
    
  },
})