import fn from './commons/fn.js';
import imfn from './commons/im.js';
import config from './commons/config.js';
import TIM from 'tim-wx-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
// import store from './store/index.js';
const tim = TIM.create({
  SDKAppID: config.SDKAppID
});
tim.setLogLevel(4);
wx.$_tim = tim;
// wx.store = store;
wx.$_TIM = TIM;
wx.$_sdkAppID = config.SDKAppID;
wx.$_tim.registerPlugin({
  'tim-upload-plugin': TIMUploadPlugin
});
imfn.registerEvents(wx.$_tim);
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