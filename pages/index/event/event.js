// pages/index/event/event.js
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
  windowResize() {
    wx.showModal({
      title: '窗口变化',
      content: 'wx.onWindowResize',
      cancelText: 'enen',
      cancelColor: 'cancelColor',
    })
  },
  keyborderheightchanges() {
    wx.showModal({
      title: '键盘变化',
      content: 'wx.onKeyboardHeightChange',
      cancelText: 'enen',
      cancelColor: 'cancelColor',
    })
  },
  captureScreen() {
    wx.showModal({
      title: '截屏',
      content: 'wx.onUserCaptureScreen',
      cancelText: 'enen',
      cancelColor: 'cancelColor',
    })
  },
  MemoryWarning(){
    wx.showModal({
      cancelColor: 'cancelColor',
      title:'内存监听',
      content:' wx.onMemoryWarning',
      cancelText:'enen'
    })
   
  }
})