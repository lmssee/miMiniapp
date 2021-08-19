// pages/index/location/location.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  getLocation() {
    wx.getLocation({
      altitude: 'false',
      type: 'wgs84',
      success(res) {
        console.log(res);
      }
    })
  },
  openLocation() {
    wx.getLocation({
      altitude: 'false',
      type: 'wgs84',
      success(res) {
        const la = res.latitude,
          lo = res.longitude;
        wx.openLocation({
          latitude: la,
          longitude: lo,
          scale: 18
        })
      }
    })
  },
  chooseLocation() {
    wx.getLocation({
      altitude: 'false',
      type: 'wgs84',
      success(res) {
        const la = res.latitude,
          lo = res.longitude;
        wx.openLocation({
          latitude: la,
          longitude: lo,
          scale: 18,
          success(res) {
            wx.chooseLocation({
              success(res) {
                console.log(res.name);
                console.log(res.address);
                console.log(res.latitute);
                console.log(res.longitude);
              }
            })
          }
        })
      }
    })
  }
})