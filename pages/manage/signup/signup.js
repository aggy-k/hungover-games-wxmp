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
    console.log('onLoad options is', this.options)
    const game_id = this.options.game_id;
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

  back: function (e) {
    console.log(e)
    const game_id = e.currentTarget.dataset.game_id;

    wx.navigateTo({
      url: `/pages/manage/show/show?id=${game_id}`,
    })
  },

  editAttendeeStatus(e) {
    console.log(22, e)
    const id = e.currentTarget.dataset.id
    const game_id = this.data.game_id

    wx.navigateTo({
      url: `../signup_edit/signup_edit?id=${id}&game_id=${game_id}`,
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
      data: { player: name, game_id: game_id },
      success(res) {
        page.setData({
          editPlayer: false
        })
        wx.reLaunch({
          url: `/pages/manage/signup/signup?game_id=${game_id}`,
        })
      }
    })

  },

  closePopup() {
    this.setData({
      editPlayer: false
    })
  },

  switchChange(e) {
    console.log(e)
    const signup_id = e.currentTarget.dataset.signup_id
    const game_id = this.data.game_id
    const url = app.globalData.url;
    const isPaid = e.detail.value

    wx.request({
      url: `${url}signups/${signup_id}`,
      method: 'PUT',
      data: { is_paid: isPaid, game_id: game_id },
      success(res) {
        console.log(res)
      }
    })
  }
})