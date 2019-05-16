// pages/landing/landing.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    const url = app.globalData.url;
    const id = app.globalData.userId;

    // DATA TO UPDATE AVATAR & NICKNAME IN DB 
    const avatarUrl = e.detail.userInfo.avatarUrl;
    const nickName = e.detail.userInfo.nickName;
    const data = {username: nickName, profile_image: avatarUrl}

    wx.request({
      url: `${url}users/${id}`,
      method: 'PUT',
      data: data,
      success(res) {
        wx.switchTab({
          url: '../games/upcoming/upcoming',
        });
      }
    })
  }
})
