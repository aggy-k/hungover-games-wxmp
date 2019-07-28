// pages/info/chat_info.js
Page({

  /**
   * Page initial data
   */
  data: {

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

  saveImage: function() {
    const current = 'https://hungovergames.cn/assets/account_qr-d3caf9f12fed812065e8f980a82fb999ba1795b8fd72c9c6bb9311a5ec816fdd.png'
    wx.previewImage({
      current: current,
      urls: [current],
    })
    // wx.saveImageToPhotosAlbum({
    //   filePath: '/images/account_qr.png',
    // })
  }
})