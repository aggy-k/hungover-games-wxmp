const app = getApp();
const API = require('../../../utils/api-request.js');

Page({

  data: {
    editPlayer: false,
    styleBlur: "z-index:10; filter:blur(3px);",
    style: "z-index:10;",
    userOnly: false
  },

  onLoad: function (options) {
    wx.showLoading({
      title: 'Loading signups..',
    });
    console.log(options)

    this.setData({
      userId: app.globalData.userId
    })

    const game_id = options.game_id;
    this.setData({ game_id: game_id })
    const url = `${app.globalData.url}games/${game_id}` + ((options.user_only) ? `/usersignups?user_id=${this.data.userId}` : '');

    console.log('url', url)
    const page = this;

    API.getData(page, url) 
      .then(
        res => {
          page.setData(res.data);
          wx.hideLoading();
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
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
    this.onLoad(this.options);
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },

  back: function (e) {
    console.log(e)
    const game_id = e.currentTarget.dataset.game_id;

    wx.navigateBack({
      url: `/pages/games/show/show?id=${game_id}`,
    })
  },

  cancelGame: function (e) {
    const page = this;
    
    const id = e.currentTarget.dataset.id
    const game_id = e.currentTarget.dataset.game_id

    const start_time = new Date(`${e.currentTarget.dataset.start_time}`);

    const last_status = e.currentTarget.dataset.last_status
    console.log('last status', last_status)

    const delta = (start_time - (new Date())) / 3600 / 1000;

    const attendee_status = (((delta < 24) && (last_status === 'Signed-up')) ? 'Late-cancelled' : 'Cancelled')
    console.log(attendee_status)

    const url = `${app.globalData.url}signups/${id}`
    const data = { attendee_status: attendee_status, game_id: game_id }

    wx.showModal({
      title: 'Warning',
      content: 'Do you really want to cancel?',
      cancelText: 'No',
      confirmText: 'Yes',
      success: function (res) {
        if (res.confirm) {
          console.log('User clicks confirm')

          API.putData(page, url, data)
            .then(
              res => {
                page.onLoad(page.options);
                wx.showToast({
                  title: 'Cancelled',
                })
              }
            )
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
    const page = this; 
    const signup_id = this.data.editPlayerSignupId;
    const game_id = this.data.editPlayerGameId;
    const name = e.detail.value.name
    console.log('name', name)
    console.log('id', signup_id)
    const url = `${app.globalData.url}signups/${signup_id}`;
    const data = { player: name, game_id: game_id };

    API.putData(page, url, data)
      .then(
        res => {
          page.setData({
            editPlayer: false
          })
          page.onLoad(page.options);
        }
      )
  },

  closePopup() {
    this.setData({
      editPlayer: false
    })
  }
})