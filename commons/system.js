const sys = {
  /** 获取页面的信息，包括展示页面的宽高 */
  getSystemInfo() {
    wx.getSystemInfoAsync({
      success: (r) => {
        console.log(r);
      },
    })
  },
  versionUpdata() {
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate();
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate();
      // wx.showModal({
      //   title: '更新提示',
      //   content: '新版本已经准备好，是否重启应用？',
      //   success(res) {
      //     if (res.confirm) {
      //       // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      //     }
      //   }
      // })
    })
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  }

};
export default sys;