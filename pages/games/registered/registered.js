// pages/games/registered/registered.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    isUpcoming: true,
    week: app.globalData.week,
    month: app.globalData.month
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const url = app.globalData.url;
    const page = this;
    // const user_id = app.globalData.userId;
    const user_id = 9;

    page.setData({ userId: user_id })

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

    wx.request({
      url: `${url}games?user_id=${user_id}`,
      method: 'GET',
      success(res) {
        const data = res.data
        data.games.forEach((game) => {
          game.start_time = page.setDateTime(game.start_time)
          game.end_time = page.setDateTime(game.end_time)
        })
        data.pastGames.forEach((game) => {
          game.start_time = page.setDateTime(game.start_time)
          game.end_time = page.setDateTime(game.end_time)
        })
        page.setData(data)
      }
    })
    console.log('page.data', page.data)
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

  cancelGame: function(e) {
    const url = app.globalData.url;
    console.log(e)
    const id = e.currentTarget.dataset.id
    const game_id = e.currentTarget.dataset.game_id
    // const now = new Date();
    // console.log('now', now)
    const start_time = new Date(`${e.currentTarget.dataset.start_time}`);
    // console.log('starttime', start_time)

    const last_status = e.currentTarget.dataset.last_status
    console.log('last status', last_status)
    
    const delta = (start_time - (new Date())) / 3600 / 1000;
    // console.log('delta', delta)
    // console.log(delta < 24)
    const attendee_status = (((delta < 24) && (last_status === 'Signed-up')) ? 'Late-cancelled' : 'Cancelled')
    console.log(attendee_status)
    
    wx.showModal({
      title: 'Warning',
      content: 'Do you really want to cancel?',
      cancelText: 'No',
      confirmText: 'Yes',
      success: function (res) {
        if (res.confirm) {
          console.log('User clicks confirm')
          wx.request({
            url: `${url}signups/${id}`,
            method: 'PUT',
            data: { attendee_status: attendee_status, game_id: game_id },
            success(res) {
              console.log(res)
              wx.reLaunch({
                url: '../registered/registered',
              })
            }
          })
        } else if (res.cancel) {
          console.log('User clicks cancel')
        }
      }
    })
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

  signupCancel: function (data) {
    const url = app.globalData.url;
    wx.request({
      url: `${url}signupcancel`,
      method: 'PUT',
      data: data,
      success(res) {
        console.log(res)
        wx.reLaunch({
          url: './registered',
        })
      }
    })
  },

  confirmModal: function () {
    
  }
})