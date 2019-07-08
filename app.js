//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.toLogin()
    
  // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
                console.log('app wx.getSetting userInfo callback')
              }
            }
          })
        }
      }
    })
    console.log('this', this)
  },

  updateUserInfo: function(e) {
    const url = this.globalData.url;
    const id = this.globalData.userId;

    // DATA TO UPDATE AVATAR & NICKNAME IN DB 
    const avatarUrl = e.detail.userInfo.avatarUrl;
    const nickName = e.detail.userInfo.nickName;
    const data = { username: nickName, profile_image: avatarUrl }

    wx.request({
      url: `${url}users/${id}`,
      method: 'PUT',
      data: data,
      success(res) {
        console.log('avatar & nickname updated in db')
        wx.navigateBack({
        })
      }
    })
    this.globalData.userInfo = e.detail.userInfo
  },

  toLogin: function() {
    console.log('Called login function in app.js')
    const host = this.globalData.url;
    const _this = this
    return new Promise(function (resolve, reject) {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log('Logging in');
          console.log(res)
          const code = res.code;
          console.log('code', code)

          wx.request({
            url: host + 'login',
            method: 'POST',
            data: {
              code: code
            },
            success: (res) => {
              _this.globalData.userId = res.data.userId
              _this.globalData.userAdmin = res.data.userAdmin
              resolve(res)
            },
            fail: (res) => {
              console.log(12, res)
              reject(res)
            }
          })
        }
      })
    })
  },

  toHome: function() {
    console.log('navigate to home')
    wx.switchTab({
      url: '/pages/games/upcoming/upcoming',
    })
  },

  globalData: {
    userInfo: null,
    // url: 'http://localhost:3000/api/v1/',
    url: 'https://hungovergames.cn/api/v1/',
    week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    attendeesStatuses: ['Signed-up', 'Waitlisted', 'Cancelled', 'Late-cancelled', 'No-show', 'Removed',]
  }
})