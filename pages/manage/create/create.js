// pages/games/create/create.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    index: 0,
    maxCapacity: 28,
    signUpTime: '12:00 PM',
    gameStatus: true,
    startTime: "17:30",
    endTime: "19:30"

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const currentDate = new Date();
    new Date(currentDate.setDate(currentDate.getDate() + 7));
    const tomorrow = new Date();
    new Date(tomorrow.setDate(tomorrow.getDate() + 1));
    console.log('tomorrow', tomorrow)


    this.setData({
      date: currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2),
      signUpDate: tomorrow.getFullYear() + '-' + ('0' + (tomorrow.getMonth() + 1)).slice(-2) + '-' + ('0' + tomorrow.getDate()).slice(-2)
    })
    const url = app.globalData.url;
    const page = this;

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

  // bindPickerChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   const index = e.detail.value
  //   this.setData({
  //     index: index
  //   })
  //   if (index < (this.data.timeslots.length)) {
  //     const signUpTime = this.data.timeslots[index].signup_time
  //     const startTime = this.data.timeslots[index].start_time
  //     const endTime = this.data.timeslots[index].end_time

  //     this.setData({
  //       signUpTime: signUpTime,
  //       startTime: startTime,
  //       endTime: endTime
  //     })
  //   }
  // },
  bindDateChange: function (e) {
    console.log('picker send selection modified. The carry value is ', e.detail.value)
    const date = new Date(e.detail.value)
    const minusSix = new Date(date.setDate(date.getDate() - 6));
    this.setData({
      date: e.detail.value,
      signUpDate: minusSix.getFullYear() + '-' + ('0' + (minusSix.getMonth() + 1)).slice(-2) + '-' + ('0' + minusSix.getDate()).slice(-2)
    })
  },

  bindSignUpDateChange: function(e) {
    console.log('picker send selection modified. The carry value is ', e.detail.value)
    const date = new Date(e.detail.value)
    this.setData({
      // date: e.detail.value,
      signUpDate: e.detail.value
    })
  },

  bindSignUpTimeChange: function(e) {
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

  formSubmit(e) {
    const url = app.globalData.url;
    const page = this;
    console.log(e)

    const data = e.detail.value
    const date = data.date
    const start_time = `${data.date} ${data.startTime}`
    const end_time = `${data.date} ${data.endTime}`
    const signup_time = `${data.signUpDate} ${data.signUpTime}`
    const max_capacity = parseInt(data.maxCapacity)
    const location = data.location
    const description = data.description
    const announcement = data.announcement

    const is_active = data.isActive

    const user_id = 1; // for testing purposes only
    // const user_id = app.globalData.userId
    console.log('start time', start_time)

    const games = {
      date: date,
      start_time: start_time,
      end_time: end_time,
      signup_time: signup_time,
      max_capacity: max_capacity,
      location: location,
      description: description,
      announcement: announcement,
      user_id: user_id,
      is_active: is_active
    }

    wx.request({
      url: `${url}games`,
      method: 'POST',
      data: games,
      success(res) {
        console.log('post res', res)
        const id = res.data.id
        wx.navigateTo({
          // url: `/pages/games/show/show?id=${id}`,
          url: '/pages/manage/index/index'
        })
      }
    })
  },

  cancelSubmit: function() {
    wx.navigateTo({
      url: '/pages/manage/index/index',
    })
  }
})