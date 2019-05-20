// pages/games/me/me.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    // userInfo: {},
    adminTab: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  loadData: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      userAdmin: app.globalData.userAdmin
    });

    const url = app.globalData.url;
    const page = this;
    const id = app.globalData.userId;

    wx.request({
      url: `${url}users/${id}`,
      success(res) {
        console.log('loaded data', res.data)
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
  onShow: function (option) {
    if (app.globalData.userInfo) {
      console.log('logged in through app.js')
      this.loadData()
    } else {
      app.toLogin().then((res) => {
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              console.log(res)
            } 
            // else {
            //   wx.navigateTo({
            //     url: '/pages/login/login',
            //   })
            // }
          }
        })
        console.log('logged in through #page.js')
        this.loadData()
        console.log('saved data', this.data)
      });
    }
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
    this.onShow()
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
  }, 

  getUserInfo: function(e) {
    app.updateUserInfo(e)
    wx.reLaunch({
      url: '/pages/games/me/me',
    })
  }
})