// pages/manage/test/test.js
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