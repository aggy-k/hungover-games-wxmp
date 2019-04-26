// pages/games/create/create.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    index: 0,
    date: '2019-1-1',
    maxCapacity: 28,
    signUpTime: '12:00 PM',
     
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const currentDate = new Date();
    new Date(currentDate.setDate(currentDate.getDate() + 7));
    const tomorrow = new Date();
    new Date(tomorrow.setDate(tomorrow.getDate() + 1));
    console.log('tomorrow',tomorrow)
    
    this.setData({
      date: `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`,
      signUpDate: `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`
    })
    const url = app.globalData.url;
    const page = this;

    wx.request({
      url: `${url}timeslots`,
      success(res) {
        console.log(res)
        let data = res.data

        let timeslotsArray = []

        // timeslotsArray.push('Select Timeslot')
        data.forEach((t) => {
          timeslotsArray.push(`${t.day} ${t.start_time} - ${t.end_time}`)
        })
        
        timeslotsArray.push('Other')

        page.setData({
          timeslots: res.data,
          timeslotsArray: timeslotsArray,
          startTime: res.data[0].start_time,
          endTime: res.data[0].end_time
        })
        console.log('timeslots', page.data.timeslots)
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

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const index = e.detail.value
    this.setData({
      index: index
    })
    if (index < (this.data.timeslots.length)) {
      const signUpTime = this.data.timeslots[index].signup_time
      const startTime = this.data.timeslots[index].start_time
      const endTime = this.data.timeslots[index].end_time

      this.setData({
        signUpTime: signUpTime,
        startTime: startTime,
        endTime: endTime
      })
    }
  },
  bindDateChange: function (e) {
    console.log('picker send selection modified. The carry value is ', e.detail.value)
    const date = new Date(e.detail.value)
    const minusSix = new Date(date.setDate(date.getDate() - 6));
    this.setData({
      date: e.detail.value,
      // signUpDate: `${minusSix.getFullYear()}-${minusSix.getMonth() + 1}-${minusSix.getDate()}`,
      signUpDate: minusSix.getFullYear() + '-' + ('0' + (minusSix.getMonth() + 1)).slice(-2) + '-' + ('0' + minusSix.getDate()).slice(-2)
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
    const start_time = data.startTime
    const end_time = data.endTime
    const signup_time = `${data.signUpDate} ${data.signUpTime}`
    const max_capacity = parseInt(data.maxCapacity)
    const user_id = 1;
    const games = {
      date: date,
      start_time: start_time,
      end_time: end_time,
      signup_time: signup_time,
      max_capacity: max_capacity,
      user_id: user_id,
      is_active: true
    }
    // const games = {
    //   max_capacity: max_capacity, user_id: 1
    // }
    

    wx.request({
      url: `${url}games`,
      method: 'POST',
      data: games,
      success(res) {

      }
    })
  }
})