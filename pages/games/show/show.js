// pages/games/show/show.js
const app = getApp();
const SUP = require('../../../utils/set-user-profile.js');
const API = require('../../../utils/api-request.js');

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
    canSignUp: false,
    signUpBtnText: 'Sign up',
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
    wx.showLoading({
      title: 'Loading game..',
    })
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

    if (!this.data.game_id) {
      this.setData({
        // userId: app.globalData.userId,
        game_id: options.id
      })
      this.getPageData();
    }
  },

  getPageData: function() {

    const page = this
    const path = `${app.globalData.url}games/${page.data.game_id}`

    setTimeout(function() {
      API.getData(page, path)
        .then(
          res => {
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

            wx.hideLoading();
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();

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
          })
    }, 1500)     
  },

  onReady: function () {

  },

  onShow: function () {
    const options = this.options;
    wx.showLoading({
      title: 'Loading game..',
    })

    if (!this.data.game_id) {
      this.setData({
        game_id: options.id
      })
    }
    this.getPageData();
    
  },

  onHide: function () {

  },

  onUnload: function () {
    
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title: 'Refreshing..',
    })
    this.getPageData();
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function (res) {

  },

  formSubmit: function(e) {
    const page = this;
    let canSignUp = !page.data.canSignUp
    console.log('can sign up disabled?', canSignUp)
 
    page.setData({
      canSignUp: canSignUp,
      signUpBtnText: 'Signing up..'
    })
    wx.showLoading({
      title: 'Signing up..',
    })
    SUP.setUserProfile(e, this).then(
        res => {
          const page = this;
          const game_id = e.target.dataset.game_id
          console.log('signing up for game id ' + game_id)
          const user_id = app.globalData.userId;
          const url = `${app.globalData.url}signups`;
          const data = { game_id: game_id, user_id: user_id };

          API.postData(page, url, data).then(
            res => {
              setTimeout(function () {
                wx.hideLoading();
                wx.showToast({
                  title: 'Signed-up',
                  icon: 'success',
                  duration: 2000
                });
                canSignUp = !page.data.canSignUp
                console.log('can sign up disabled?', canSignUp)
                let signUpBtnText = `Sign up again`
                page.setData({
                  canSignUp: canSignUp,
                  signUpBtnText: signUpBtnText
                })
                page.getPageData()
              }, 4000);
            })
        }
      )
    
  },

  showMySignups() {
    const game_id = this.data.game_id
    wx.navigateTo({
      url: `/pages/games/signup/signup?game_id=${game_id}&user_only=true`,
    })
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
  },
})