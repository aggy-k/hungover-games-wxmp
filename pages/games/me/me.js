// pages/games/me/me.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    adminTab: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      userAdmin: app.globalData.userAdmin
    });
    console.log('hello from console')
    console.log(this.data.userInfo)
    console.log(app.globalData.userAdmin)

    const url = app.globalData.url;
    const page = this;
    const id = app.globalData.userId;

    wx.request({
      url: `${url}users/${id}`,
      success(res) {
        console.log(res.data)
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

  gameRules(e) {
    wx.navigateTo({
      url: `../../gameRules/gameRules`
    })
  }, 

  manageIndex(e) {
    wx.navigateTo({
      url: `../../manage/index/index`,
    })
  },

  toggleAdminTab(e) {
    if (this.data.adminTab === true) {
      this.setData({
        adminTab: false
      })
      console.log('adminTab', this.data.adminTab)
    } else {
      this.setData({
        adminTab: true
      })
      console.log('adminTab', this.data.adminTab)
    }
    
  },

  gameRules() {
    wx.navigateTo({
      url: '/pages/gameRules/index/index',
    })
  },

  updateGameRules() {
    wx.navigateTo({
      url: '/pages/gameRules/edit/edit',
    })
  },

  meEdit(e) {
    const user_id = app.globalData.userId;

    wx.navigateTo({
      url: '/pages/games/me_edit/me_edit?user_id=' + user_id
    })
  }
})