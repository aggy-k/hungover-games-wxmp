let getData = (page, url) => {
  return new Promise(
    (resolve, reject) => {
      wx.request({
        url: url,
        success(res) {
          resolve(res)
        },
        fail(res) {
          let error = false
          reject(error)
        }
      })
    }
  )
}

let putData = (page, url, data) => {
  return new Promise(
    (resolve, reject) => {
      wx.request({
        url: url,
        method: 'PUT',
        data: data,
        success(res) {
          resolve(res)
        },
        fail(res) {
          let error = false
          reject(error)
        }
      })
    }
  )
}

let postData = (page, url, data) => {
  return new Promise(
    (resolve, reject) => {
      wx.request({
        url: url,
        method: 'POST',
        data: data,
        success(res) {
          resolve(res)
        },
        fail(res) {
          let error = false
          reject(error)
        }
      })
    }
  )
}

module.exports = {
  getData: getData,
  putData: putData,
  postData: postData
}