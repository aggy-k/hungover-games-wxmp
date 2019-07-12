// pages/games/show/show.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    week: app.globalData.week,
    month: app.globalData.month,
    markers: [{
      iconPath: "/images/hg_logo_marker.png",
      id: 0,
      latitude: 31.235168,
      longitude: 121.452879,
      width: 30,
      height: 30
    }],
  },

  mapShow: function () {
    wx.openLocation({//​使用微信内置地图查看位置。
      latitude: this.data.gameInfo.location.lat, // 31.235168,//要去的纬度-地址
      longitude: this.data.gameInfo.location.long, // 121.452879,//要去的经度-地址
      name: this.data.gameInfo.location.name,
      address: this.data.gameInfo.location.address
    })
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
    if (!this.data.game_id) {
      this.setData({
        game_id: this.options.id
      })
    }
    console.log(`game id is ${this.data.game_id}`)
    // load signup data for this game_id if user already signed up
    // How to handle 2 signups?

    const page = this
    wx.request({
      url: app.globalData.url + `games/${page.data.game_id}`,
      success: function (res) {
        const game = res.data
        game.start_time = page.setDateTime(game.start_time)
        game.end_time = page.setDateTime(game.end_time)
        game.signup_time = page.setDateTime(game.signup_time)

        const long = game.location.long
        const lat = game.location.lat

        page.setData({
          gameInfo: game,
          markers: [{
            height: 30,
            width: 30,
            iconPath: "/images/hg_logo_marker.png",
            id: 0,
            latitude: lat,
            longitude: long
          }]
        });
        console.log(page.data.gameInfo)
      },
    })
    console.log('markers', this.data.markers)
    console.log('show page data', this.data)
  },

  setDateTime: function (dateString) {
    const date = new Date(dateString);
    const weekDay = this.data.week[date.getDay()];
    const day = date.getDate();
    const month = this.data.month[date.getMonth()];
    const year = date.getFullYear();
    const time = `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;

    return { weekDay: weekDay, day: day, month: month, year: year, time: time }
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
    this.onLoad()
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
    let shareMessage = {
      title: "Join the game!",        
　　　　path: `/pages/games/show/show?id=${this.data.game_id}`        
　　　}

    return shareMessage;
  },

  editGame: function(e) {
    console.log('e', e)
    const game_id = e.currentTarget.dataset.game_id;

    wx.navigateTo({
      url: `/pages/manage/edit/edit?id=${game_id}`,
    })
  },

  back: function() {
    wx.navigateTo({
      url: '/pages/manage/index/index',
    })
  }
})