// pages/manage/test/test.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    array: [1,2,3,4,5,6,7,8,9,10,11],
    i: 3
  },

  loadMore: function() {
    var i = this.data.i + 3
    this.setData({
      myArray: this.data.array.slice(0, i),
      i: i
    })
  },

  getAccessToken: function() {
    const url = app.globalData.url;
    const page = this;

    wx.request({
      url: `${url}access`,
      method: 'get',
      success(res) {
        console.log('access is', res)
        const accessToken = res.data.access.access_token
        page.setData({
          accessToken: accessToken
        })
      }
    })
  },

  sendMessage: function() {
    const accessToken = this.data.accessToken
    const url = `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${accessToken}`
    const openId = "oMQEp47Uri3g3ox5rr-ozUiPSI70"

    wx.request({
      url: `${url}`,
      method: 'post',
      data: {
        touser: openId,
        template_id: "evQHk5IQDU_n1s5YsfICPk9tmq0wAEtlLKgte3qvB7s",
        form_id: "send",
        data: {
          "keyword1": {
            "value": "Aggy"
          },
          "keyword2": {
            "value": "Archery"
          },
          "keyword3": {
            "value": "Cages"
          },
          "keyword4": {
            "value": "May 16th, 2019, 8pm"
          }
        }
      },
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log('fail', res)
      }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log('array length', this.data.array.length)
    var myArray = this.data.array.slice(0, 3)
    this.setData({
      myArray: myArray
    })
    console.log(myArray)
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

  }
})