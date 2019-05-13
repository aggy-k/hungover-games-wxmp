//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const host = this.globalData.url;

    // 登录
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
            console.log(11, res)
            this.globalData.userId = res.data.userId
            this.globalData.userAdmin = res.data.userAdmin
          },
          fail: (res) => {
            console.log(12, res)
          }
        })
      }
    })
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
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    // url: 'http://localhost:3000/api/v1/',
    url: 'https://hungover-games.tuitu-tech.cn/api/v1/',
    week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    attendeesStatuses: ['Signed-up', 'Waitlisted', 'Cancelled', 'Late-cancelled', 'No-show', 'Removed',]
  }
})