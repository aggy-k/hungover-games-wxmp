// pages/games/upcoming/upcoming.js
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
    const page = this
    const url = app.globalData.url;

    wx.request({
      url: `${url}games`,
      success: function (res) {
        const games = res.data.games
        console.log('resdata', res.data)
        const now = new Date();

        games.forEach(function (game) {
          game.start_time = page.setDateTime(game.start_time)
          game.end_time = page.setDateTime(game.end_time)
          game.signup_date = page.setDateTime(game.signup_date)
          game.signup_time = new Date(game.signup_time)
          game.signup_opens = (now >= game.signup_time)
        });
        page.setData({ games: games });
        console.log(page.data.games)

        console.log(page.data.games[0].signup_time, now)
        console.log('signup time vs now', (page.data.now >= page.data.games[0].signup_time))
      },
    })
    console.log('page data', this.data)
  },

  setDateTime: function(dateString) {
    const date = new Date(dateString);
    const weekDay = this.data.week[date.getDay()];
    const day = date.getDate();
    const month = this.data.month[date.getMonth()].slice(0, 3);
    const year = date.getFullYear();
    const time = `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;

    return { weekDay: weekDay, day: day, month: month, year: year, time: time }
  },

  showGame: function (e) {
    // const game_id = e.currentTarget.dataset.space.id
    const game_id = e.currentTarget.dataset.game_id
    wx.navigateTo({
      url: `../show/show?id=${game_id}`,
    })
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