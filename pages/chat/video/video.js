// Page({
//   // ...
//   data: {
//       trtcConfig: {
//           sdkAppID: 0, // 开通实时音视频服务创建应用后分配的 SDKAppID
//           userID: 'test_user_001', // 用户 ID，可以由您的帐号系统指定
//           userSig: 'xxxxxxxxxxxx', // 身份签名，相当于登录密码的作用
//           type: 2, // 通话模式
//       },
//   },
//   /**
//   * 生命周期函数--监听页面加载
//   */
//   onLoad: function (options) {
//       // 将初始化后到TRTCCalling实例注册到this.TRTCCalling中，this.TRTCCalling 可使用TRTCCalling所以方法功能。
//       this.TRTCCalling = this.selectComponent('#TRTCCalling-component');
//       // 绑定需要监听到事件
//       this.bindTRTCCallingRoomEvent();
//       // 登录TRTCCalling
//       this.TRTCCalling.login();
//   },
//   /**
//   * 生命周期函数--监听页面卸载
//   */
//   onUnload: function () {
//       // 取消监听事件
//       this.unbindTRTCCallingRoomEvent();
//       // 退出登录
//       this.TRTCCalling.logout();
//   },
//   invitedEvent() {
//       console.log('收到邀请')
//   },

//   hangupEvent() {
//       console.log('挂断')
//   },

//   rejectEvent() {
//       console.log('对方拒绝')
//   },

//   userLeaveEvent() {
//       console.log('用户离开房间')
//   },

//   onRespEvent() {
//       console.log('对方无应答')
//   },

//   callingTimeoutEvent() {
//       console.log('无应答超时')
//   },

//   lineBusyEvent() {
//       console.log('对方忙线')
//   },

//   callingCancelEvent() {
//       console.log('取消通话')
//   },

//   userEnterEvent() {
//       console.log('用户进入房间')
//   },

//   callEndEvent() {
//       console.log('通话结束')
//   },

//   // 绑定 TRTCCalling
//   bindTRTCCallingRoomEvent: function() {
//       const TRTCCallingEvent = this.TRTCCalling.EVENT
//       this.TRTCCalling.on(TRTCCallingEvent.INVITED, this.invitedEvent)
//       // 处理挂断的事件回调
//       this.TRTCCalling.on(TRTCCallingEvent.HANG_UP, this.hangupEvent)
//       this.TRTCCalling.on(TRTCCallingEvent.REJECT, this.rejectEvent)
//       this.TRTCCalling.on(TRTCCallingEvent.USER_LEAVE, this.userLeaveEvent)
//       this.TRTCCalling.on(TRTCCallingEvent.NO_RESP, this.onRespEvent)
//       this.TRTCCalling.on(TRTCCallingEvent.CALLING_TIMEOUT, this.callingTimeoutEvent)
//       this.TRTCCalling.on(TRTCCallingEvent.LINE_BUSY, this.lineBusyEvent)
//       this.TRTCCalling.on(TRTCCallingEvent.CALLING_CANCEL, this.callingCancelEvent)
//       this.TRTCCalling.on(TRTCCallingEvent.USER_ENTER, this.userEnterEvent)
//       this.TRTCCalling.on(TRTCCallingEvent.CALL_END, this.callEndEvent)
//   },
//   // 取消 TRTCCalling 监听事件
//   unbindTRTCCallingRoomEvent() {
//       const TRTCCallingEvent = this.TRTCCalling.EVENT
//       this.TRTCCalling.off(TRTCCallingEvent.INVITED, this.invitedEvent)
//       this.TRTCCalling.off(TRTCCallingEvent.HANG_UP, this.hangupEvent)
//       this.TRTCCalling.off(TRTCCallingEvent.REJECT, this.rejectEvent)
//       this.TRTCCalling.off(TRTCCallingEvent.USER_LEAVE, this.userLeaveEvent)
//       this.TRTCCalling.off(TRTCCallingEvent.NO_RESP, this.onRespEvent)
//       this.TRTCCalling.off(TRTCCallingEvent.CALLING_TIMEOUT, this.callingTimeoutEvent)
//       this.TRTCCalling.off(TRTCCallingEvent.LINE_BUSY, this.lineBusyEvent)
//       this.TRTCCalling.off(TRTCCallingEvent.CALLING_CANCEL, this.callingCancelEvent)
//       this.TRTCCalling.off(TRTCCallingEvent.USER_ENTER, this.userEnterEvent)
//       this.TRTCCalling.off(TRTCCallingEvent.CALL_END, this.callEndEvent)
//   },
//   // ...
// })