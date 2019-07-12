// pages/games/edit/edit.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    date: '2019-01-01',
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
    const url = app.globalData.url;
    const page = this;
    console.log('options', this.options)
    const id = this.options.id
    // const id = 16;

    wx.request({
      url: `${url}games/${id}`,
      method: 'get',
      success(res) {
        console.log('res', res)

        const data = res.data;

        page.setData(data)
        console.log('res.data', res.data)
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

  bindDateChange: function (e) {
    console.log('picker send selection modified. The carry value is ', e.detail.value)
    const date = new Date(e.detail.value)
    const minusSix = new Date(date.setDate(date.getDate() - 6));
    this.setData({
      date: e.detail.value,
      signUpDate: minusSix.getFullYear() + '-' + ('0' + (minusSix.getMonth() + 1)).slice(-2) + '-' + ('0' + minusSix.getDate()).slice(-2)
    })
  },

  bindSignUpDateChange: function (e) {
    console.log('picker send selection modified. The carry value is ', e.detail.value)
    const date = new Date(e.detail.value)
    this.setData({
      // date: e.detail.value,
      signUpDate: e.detail.value
    })
  },

  bindSignUpTimeChange: function (e) {
    console.log('picker send selection modified. The carry value is ', e.detail.value)
    this.setData({
      signUpTime: e.detail.value
    })
  },

  bindStartTimeChange: function (e) {
    console.log('picker send selection modified. The carry value is ', e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },

  bindEndTimeChange: function (e) {
    console.log('picker send selection modified. The carry value is ', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },

  radioChange: function (e) {
    console.log('a change event occurred on radio; carry value is: ', e.detail.value)
  },

  changeIsPrivate: function (e) {
    console.log('a change event occurred on radio; carry value is: ', e.detail.value)
  },

  formSubmit(e) {
    const url = app.globalData.url;
    const page = this;
    const game_id = page.data.id;
    console.log(e)

    const data = e.detail.value
    const date = data.date
    const start_time = `${data.date} ${data.startTime} +0800`
    const end_time = `${data.date} ${data.endTime} +0800`
    const signup_time = `${data.signUpDate} ${data.signUpTime} +0800`
    const max_capacity = parseInt(data.maxCapacity)
    // const location = data.location
    const description = data.description
    const announcement = data.announcement

    const is_active = data.isActive
    const is_private = (data.isPrivate === "true")


    // const user_id = 1; // for testing purposes only
    const user_id = app.globalData.userId
    console.log('start time', start_time)

    const games = {
      date: date,
      start_time: start_time,
      end_time: end_time,
      signup_time: signup_time,
      max_capacity: max_capacity,
      // location: location,
      description: description,
      announcement: announcement,
      user_id: user_id,
      is_active: is_active,
      is_private: is_private
    }

    wx.request({
      url: `${url}games/${game_id}`,
      method: 'PUT',
      data: games,
      success(res) {
        console.log('put res', res);
        wx.navigateBack({
          url: `/pages/manage/show/show?id=${game_id}`,
        })
      }
    })
  },

  cancelSubmit: function(e) {
    console.log(e)
    const id = e.currentTarget.dataset.id
    wx.navigateBack({
      url: `/pages/manage/show/show?id=${id}`,
    })
  }
})