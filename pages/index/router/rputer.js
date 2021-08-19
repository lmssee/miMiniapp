// pages/index/router/rputer.js
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
  onNavigate(){
    wx.navigateTo({
      url: '../../logs/logs'
      /**  
       *   
       *   wx.navigateTo();     跳转
       *   
       *   wx.navigateBack();   回退
       *    
       *                        delta    次数 返回几个,若大于栈中总数量,返回首页
       *   
       *   wx.redirectTo();   去向哪个页面,不包括 TabBar
       *  
       *   wx.reLaunch();   去向任何地址,并清除所有栈
       *  
       *   wx.switchTab();  去除非 tabBar 地址,并跳转到 tabBar 页面
       * 
       *   wx.navigateToMiniProgram 接口可以打开另一个小程序,需要在
       *       app.json 的全局配置中设置需要跳转的 appId 
       *     
       */
    })
  }
})