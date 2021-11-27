import imfn from './commons/im.js';
import fn from './commons/fn.js';

App({
  onLaunch() {
    /** 初始化 即时通讯 */
    imfn.ini();
  },
  onShow() {
    /** 每次展示更新检测 */
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady();
  },
  onHide() {},
  onError() {
    wx.showToast({
      title: '未知错误',
      duration: 1200
    })
  }

})