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
    /** 每次展示更新检测 */
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },
  onHide() {},
  onError() {
    wx.showToast({
      title: '未知错误',
      duration: 1200
    })
  }

})