import fn from './commons/fn.js'
App({
  onLaunch() {
    /** 若本地储存没有 id 信息，则获取 */
    if (!wx.getStorageSync('userid').unionid)
      fn.login();
  },
  globalData: {
    userInfo: null
  },
  onShow() {
  },
  onHide() {
  },
  onError() {
    wx.showToast({
      title: '未知错误',
      duration: 1200
    })
  }
})