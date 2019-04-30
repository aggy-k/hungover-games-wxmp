// pages/manage/index/index.js
const app = getApp()

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
        const games = res.data
        games.forEach(function (game) {
          game.start_time = page.setDateTime(game.start_time)
          game.end_time = page.setDateTime(game.end_time)
          game.signup_date = page.setDateTime(game.signup_date)
        });
        page.setData({ games: games });
        console.log(page.data.games)
      },
    })
  },

  setDateTime: function (dateString) {
    const date = new Date(dateString);
    const weekDay = this.data.week[date.getDay()];
    const day = date.getDate();
    const month = this.data.month[date.getMonth()].slice(0, 3);
    const year = date.getFullYear();
    const time = `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;

    return { weekDay: weekDay, day: day, month: month, year: year, time: time }
  },

  showGame: function (e) {
    const game_id = e.currentTarget.dataset.space.id
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

  }, 

  gameCreate(e) {
    const user_id = 1;
    
    wx.navigateTo({
      url: `../create/create?user_id=${user_id}`,
    })
  },
})