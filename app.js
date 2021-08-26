import fn from './commons/fn.js'
App({
  onLaunch() {
    /** 若本地储存没有 id 信息，则获取 */
    if (!wx.getStorageSync('userid').unionid)
      fn.login();
    wx.setStorageSync('userSelfID', '10010');
    // wx.request({
    //   url: 'https://lmssee.cn:3000/im/im',
    //   method: 'POST',
    //   data: {
    //     userid: wx.getStorageSync('userSelfID'),
    //     expire: 3600000,
    //     userBuf: null
    //   },
    //   success: (data) => {
    //     wx.setStorageSync('userSig', data.data.data);
    //     console.log(data.data.data);
    //   }
    // })
     wx.setStorageSync('userSig', 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwoYGBoYwieKU7MSCgswUJStDEwMDUzMDQ0sTiExJZm4qUNTMyNLSzMDc0BwimlpRkFkEFDc2MwABqCGZ6UBjC5LTDNwTSx0rEvPNiqvMTMyjCn30y-1KPAvdQ40y833yPb3NwwwiylzNkm2VagFu2TAq');
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