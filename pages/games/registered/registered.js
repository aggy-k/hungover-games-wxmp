// pages/games/registered/registered.js
const app = getApp();
const API = require('../../../utils/api-request.js');

Page({

  data: {
    isUpcoming: true,
    week: app.globalData.week,
    month: app.globalData.month
  },

  onLoad: function (options) {
    wx.showLoading({
      title: 'Loading..',
    })
    console.log('onload info passed', options)
    app.userInfoReadyCallback = res => {
      console.log('userInfoReadyCallback: ', res.userInfo);
    }

    wx.setNavigationBarTitle({
      title: "Your Games"
    })
    if (app.globalData.userId) {
      console.log('logged in through app.js')
      this.setData({ userId: app.globalData.userId })
      this.getSignups()
    } else {
      app.toLogin().then((res) => {
        console.log('logged in through #page.js')
        this.setData({ userId: app.globalData.userId })
        this.getSignups()
      });
    }

    console.log('page data', this.data)

    if (options.toast === 'true') {
      wx.showToast({
        title: 'Signed-up',
        icon: 'success',
        duration: 2000
      });
    } else if (options.cancelToast === 'true') {
      wx.showToast({
        title: 'Cancelled',
        icon: 'success',
        duration: 2000
      });
    }
  },

  showToast: function(text) {
    const page = this;

    wx.showToast({
      title: text,
      icon: 'success',
      duration: 1000
    });
    setTimeout(() => {
      page.onLoad(page.options);
    }, 1000)
  },

  showModal: function(data) {
    const page = this; 

    wx.showModal({
      title: 'Warning',
      content: 'Do you really want to cancel?',
      cancelText: 'No',
      confirmText: 'Yes',
      success: function (res) {
        if (res.confirm) {
          console.log('User clicks confirm')
          page.signupCancel(data)
        } else if (res.cancel) {
          console.log('User clicks cancel')
        }
      }
    })  
  },

  getSignups: function() {
    
    const user_id = this.data.userId
    const page = this;
    const url = `${app.globalData.url}games?user_id=${user_id}`

    API.getData(page, url)
      .then(
        res => {
          const data = res.data
          data.games.forEach((game) => {
            game.start_time = page.setDateTime(game.start_time)
            game.end_time = page.setDateTime(game.end_time)
          })
          data.pastGames.forEach((game) => {
            game.start_time = page.setDateTime(game.start_time)
            game.end_time = page.setDateTime(game.end_time)
          })
          page.setData(data);
          wx.hideLoading();
        }
      )

  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.onLoad({ toast: "false", cancelToast: "false" })
    setTimeout(function () { wx.hideNavigationBarLoading() }, 1500)
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

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

  showPastSignups() {
    this.setData({isUpcoming: false})
  },

  showSignups() {
    this.setData({isUpcoming: true})
  }, 

  showGame: function (e) {
    const game_id = e.currentTarget.dataset.gameId
    wx.navigateTo({
      url: `../show/show?id=${game_id}`,
    })
  },

  cancelSignUp: function (e) {
    const page = this
    console.log('cancel sign up')
    const gameId = e.currentTarget.dataset.gameId
    const userId = this.data.userId
    const attendeeStatus = 'Signed-up'
    const data = {
      game_id: gameId,
      user_id: userId,
      attendee_status: attendeeStatus
    }
    console.log(data)

    page.showModal(data);
  }, 

  cancelWaitlist: function (e) {
    const page = this
    console.log('cancel waitlist')
    const gameId = e.currentTarget.dataset.gameId
    const userId = this.data.userId
    const attendeeStatus = 'Waitlisted'
    const data = {
      game_id: gameId,
      user_id: userId,
      attendee_status: attendeeStatus
    }
    console.log(data)
    page.showModal(data);
  },

  signupCancel: function (data) {
    const url = app.globalData.url + 'signupcancel';
    const page = this;

    API.putData(page, url, data)
      .then(
        res => {
          page.showToast('Cancelled'); 
        }
      )
  },
})