// pages/location/detail/detail.js
Page({
  data: {
    markers: [],
    polyline: [],
    includePoints: []
  },
  onLoad: function (options) {
    let markers, polyline;
    markers = wx.getStorageSync('runnerListDetailContent').markers;
    polyline = wx.getStorageSync('runnerListDetailContent').polyline;
    this.setData({
      markers,
      polyline
    });
    this.data.includePoints  =    this.data.markers.map(i =>{
       return {
         latitude:i.latitude,
         longitude:i.longitude
       }
    });
 this.setData({
   includePoints:this.data.includePoints
 })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onShareAppMessage: function () {

  }
})