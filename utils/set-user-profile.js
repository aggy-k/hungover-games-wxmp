const setUserProfile = (e, page) => {
  return new Promise(
    (resolve, reject) => {
      const app = getApp();
      const url = app.globalData.url;
      const id = app.globalData.userId;
      console.log(e.detail.userInfo);

      const avatarUrl = e.detail.userInfo.avatarUrl;
      const nickName = e.detail.userInfo.nickName;
      const data = { username: nickName, profile_image: avatarUrl }

      page.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });

      app.globalData.userInfo = e.detail.userInfo;

      wx.request({
        url: `${url}users/${id}`,
        method: 'PUT',
        data: data,
        success: function(res) {
          let data = res.data
          resolve(data)
        },
        fail: function(res) {
          let error = false;
          reject(error);
        }
      })
    }
  )
}

module.exports = {
  setUserProfile: setUserProfile
}