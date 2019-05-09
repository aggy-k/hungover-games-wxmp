// pages/games/registered/registered.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    cancelText: ["I'm lame", "I'm a chicken"],
    isUpcoming: true
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
    const url = app.globalData.url;
    const page = this;
    const user_id = app.globalData.userId;
    page.setData({ userId: user_id })
    // const user_id = 1;
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
        console.log(res)
        page.setData(res.data)
        
      }
    })
    console.log('page.data', page.data)
    // wx.request({
    //   url: `${url}users/${user_id}/signups`,
    //   method: 'GET',
    //   success(res) {
    //     console.log('res', res);
    //     const signups = res.data.signups
    //     const pastSignups = res.data.pastSignups

    //     page.setData({
    //       signups: signups,
    //       pastSignups: pastSignups
    //       });
    //     console.log('signups', signups)
    //     console.log('past signups', pastSignups)
    //   }
    // })
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
    // const game_id = e.currentTarget.dataset.space.id
    const game_id = e.currentTarget.dataset.game_id
    wx.navigateTo({
      url: `../show/show?id=${game_id}`,
    })
  }
})