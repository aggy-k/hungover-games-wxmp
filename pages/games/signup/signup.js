// pages/manage/signup/signup.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    editPlayer: false,
    styleBlur: "z-index:10; filter:blur(3px);",
    style: "z-index:10;"
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      userId: app.globalData.userId
    })

    console.log('userId', this.data.userId)
    console.log('onLoad options is', options)
    const game_id = options.game_id;
    this.setData({ game_id: game_id })
    const url = app.globalData.url;
    const page = this;

    wx.request({
      url: `${url}games/${game_id}`,
      success(res) {
        console.log('res', res);
        page.setData(res.data)
      }
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
    wx.showNavigationBarLoading()
    this.onLoad({ game_id: this.data.game_id })
    setTimeout(function () { wx.hideNavigationBarLoading() }, 1500)
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

  back: function (e) {
    console.log(e)
    const game_id = e.currentTarget.dataset.game_id;

    wx.navigateTo({
      url: `/pages/games/show/show?id=${game_id}`,
    })
  },

  cancelGame: function (e) {
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
                url: '../registered/registered?cancelToast=true',
              })
            }
          })
        } else if (res.cancel) {
          console.log('User clicks cancel')
        }
      }
    })
  },

  changePlayer(e) {
    console.log(e)
    this.setData({
      editPlayer: true,
      editPlayerSignupId: e.currentTarget.dataset.signup_id,
      editPlayerName: e.currentTarget.dataset.player_name,
      editPlayerGameId: e.currentTarget.dataset.game_id
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  updatePlayer(e) {
    const url = app.globalData.url;
    const page = this; 
    const signup_id = this.data.editPlayerSignupId;
    const game_id = this.data.editPlayerGameId;
    const name = e.detail.value.name
    console.log('name', name)
    console.log('id', signup_id)

    wx.request({
      url: `${url}signups/${signup_id}`,
      method: 'PUT',
      data: {player: name, game_id: game_id},
      success(res) {
        page.setData({
          editPlayer: false
        })
        wx.reLaunch({
          url: `/pages/games/signup/signup?game_id=${game_id}`,
        })
      }
    })
    
  },

  closePopup() {
    this.setData({
      editPlayer: false
    })
  }
})