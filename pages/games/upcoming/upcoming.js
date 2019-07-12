// pages/games/upcoming/upcoming.js
const app = getApp();
const API = require('../../../utils/api-request.js');

Page({

  data: {
    week: app.globalData.week,
    month: app.globalData.month,
    clickedInfo: false
  },

  onLoad: function (options) {
    
  },

  onReady: function () {

  },

  onShow: function () {
    wx.showLoading({
      title: 'Loading...',
    })
    this.getPageData();
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

  getPageData: function() {
    const page = this
    // const url = app.globalData.url;
    const url_path = `${app.globalData.url}games?is_private=false`

    setTimeout(function() {
      API.getData(page, url_path)
        .then(
          res => {
            const games = res.data.games
            console.log('resdata', res.data)
            const now = new Date();

            games.forEach(function (game) {
              game.start_time = page.setDateTime(game.start_time)
              game.end_time = page.setDateTime(game.end_time)
              game.signup_date = page.setDateTime(game.signup_date)
              game.signup_time = new Date(game.signup_time)
              // game.signup_opens = (now >= game.signup_time)
            });
            page.setData({ games: games });

            wx.hideLoading();
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();

            console.log(page.data.games)

            console.log(page.data.games[0].signup_time, now)
            console.log('signup time vs now', (page.data.now >= page.data.games[0].signup_time))
          }
        )   
    }, 500)
   
    console.log('page data', this.data)
  },

  showGame: function (e) {
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

  onUnload: function () {

  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: 'Refreshing..',
    })
    
    this.getPageData();
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },

  clickInfo: function () {
    this.setData({ clickedInfo: true })
  },

  cancelInfo: function () {
    this.setData({ clickedInfo: false })
  },

  navToGameInfo: function () {
    wx.navigateTo({
      url: '/pages/info/game_info',
    })
    this.setData({ clickedInfo: false })
  },

  navToAppInfo: function () {
    wx.navigateTo({
      url: '/pages/info/app_info',
    })
    this.setData({ clickedInfo: false })
  },

})