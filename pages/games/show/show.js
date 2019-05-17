// pages/games/show/show.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    week: app.globalData.week,
    month: app.globalData.month,
    markers: [{
      iconPath: "/images/hg_logo_marker.png",
      id: 0,
      latitude: 31.235168,
      longitude: 121.452879,
      width: 30,
      height: 30
    }],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        }
      })
    }

    this.setData({
      // userId: app.globalData.userId,
      game_id: options.id
    })

    const page = this
    wx.request({
      url: app.globalData.url + `games/${page.data.game_id}`,
      success: function (res) {
        const game = res.data
        game.start_time = page.setDateTime(game.start_time)
        game.end_time = page.setDateTime(game.end_time)
        game.signup_time = page.setDateTime(game.signup_time)

        const long = game.location.long
        const lat = game.location.lat

        let userSignedUp = 0
        let userWaitlisted = 0

        game.attendees.forEach((a) => {
          if ((a.userId === app.globalData.userId) && (a.attendeeStatus === "Signed-up")) {
            userSignedUp += 1
          } else if ((a.userId === app.globalData.userId) && (a.attendeeStatus === "Waitlisted")) {
            userWaitlisted += 1
          }
        })

        page.setData({
          gameInfo: game,
          userSignedUp: userSignedUp,
          userWaitlisted: userWaitlisted,
          markers: [{
            height: 30,
            width: 30,
            iconPath: "/images/hg_logo_marker.png",
            id: 0,
            latitude: lat,
            longitude: long
          }]
        });
        console.log('userSignedUp', page.data.userSignedUp)
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
  onShareAppMessage: function (res) {

  },

  formSubmit: function(e) {
    app.updateUserInfo(e)
    const page = this;
    const url = app.globalData.url;
    const game_id = e.target.dataset.game_id
    console.log('signing up for game id ' + game_id)
    const user_id = app.globalData.userId; 

    // const attendee_status = ((this.data.gameInfo.maxCapacity >= this.data.gameInfo.attendeesCount) ? 'Signed-up' : 'Waitlisted')
    // console.log('attendee status', attendee_status)

    wx.request({
      url: `${url}signups`,
      method: 'POST',
      data: {game_id: game_id, user_id: user_id},
      success(res) {
        wx.reLaunch({
          url: '../registered/registered?toast=true',
        })
      }
    });
  },

  toHome() {
    app.toHome()
  }, 

  mapShow: function () {
    wx.openLocation({//​使用微信内置地图查看位置。
      latitude: this.data.gameInfo.location.lat, // 31.235168,//要去的纬度-地址
      longitude: this.data.gameInfo.location.long, // 121.452879,//要去的经度-地址
      name: this.data.gameInfo.location.name,
      address: this.data.gameInfo.location.address
    })
  },

  setDateTime: function (dateString) {
    const date = new Date(dateString);
    const weekDay = this.data.week[date.getDay()];
    const day = date.getDate();
    const month = this.data.month[date.getMonth()];
    const year = date.getFullYear();
    const time = `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;

    return { weekDay: weekDay, day: day, month: month, year: year, time: time }
  }
})