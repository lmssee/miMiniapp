import fn from './commons/fn.js';
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
registerEvents(wx.$_tim);
// 注册监听事件
function registerEvents(tim) {
  tim.on(TIM.EVENT.SDK_READY, onReadyStateUpdate, this)
  tim.on(TIM.EVENT.SDK_NOT_READY, onReadyStateUpdate, this)
  tim.on(TIM.EVENT.KICKED_OUT, kickOut, this)
  tim.on(TIM.EVENT.ERROR, onError, this)
  tim.on(TIM.EVENT.MESSAGE_RECEIVED, messageReceived, this)
  tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, convListUpdate, this)
  tim.on(TIM.EVENT.GROUP_LIST_UPDATED, groupListUpdate, this)
  tim.on(TIM.EVENT.BLACKLIST_UPDATED, blackListUpdate, this)
  tim.on(TIM.EVENT.NET_STATE_CHANGE, netStateChange, this)
  tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, onMessageReadByPeer, this)
}

function onReadyStateUpdate({
  name
}) {
  const isSDKReady = (name === TIM.EVENT.SDK_READY)
  if (isSDKReady) {
    wx.$$_tim.getMyProfile().then(res => {
      // store.commit('updateMyInfo', res.data)
    })
    wx.$$_tim.getBlacklist().then(res => {
      // store.commit('setBlacklist', res.data)
    })
  }
  // store.commit('setSdkReady', isSDKReady)
}

function kickOut(event) {
  // store.dispatch('resetStore')
  wx.showToast({
    title: '你已被踢下线',
    icon: 'none',
    duration: 1500
  })
  setTimeout(() => {
    wx.reLaunch({
      url: '../login/main'
    })
  }, 500)
}

function onError(event) {
  // 网络错误不弹toast && sdk未初始化完全报错
  if (event.data.message && event.data.code && event.data.code !== 2800 && event.data.code !== 2999) {
    // store.commit('showToast', {
    //   title: event.data.message,
    //   duration: 2000
    // })
  }
}

function checkoutNetState(state) {
  switch (state) {
    case TIM.TYPES.NET_STATE_CONNECTED:
      return {
        title: '已接入网络', duration: 2000
      }
      case TIM.TYPES.NET_STATE_CONNECTING:
        return {
          title: '当前网络不稳定', duration: 2000
        }
        case TIM.TYPES.NET_STATE_DISCONNECTED:
          return {
            title: '当前网络不可用', duration: 2000
          }
          default:
            return ''
  }
}

function netStateChange(event) {
  console.log(event.data.state)
  // store.commit('showToast', checkoutNetState(event.data.state))
}

function onMessageReadByPeer(event) {
  console.log(event)
}

function messageReceived(event) {
  for (let i = 0; i < event.data.length; i++) {
    let item = event.data[i]
    if (item.type === TYPES.MSG_GRP_TIP) {
      if (item.payload.operationType) {
        $bus.$emit('groupNameUpdate', item.payload)
      }
    }
  }
  // store.dispatch('onMessageEvent', event)
}

function convListUpdate(event) {
  // store.commit('updateAllConversation', event.data)
}

function groupListUpdate(event) {
  // store.commit('updateGroupList', event.data)
}

function blackListUpdate(event) {
  // store.commit('updateBlacklist', event.data)
}

// 获取系统信息
// let sysInfo = wx.getSystemInfoSync();
// store.commit('setSystemInfo', sysInfo)

// 初始化通话信息   
// store.commit('setCalling', false)
// store.commit('setCallData', {
//   action: '',
//   data: {}
// })

// 本地mock发送一条消息用于当前渲染
function mockLocalMessage(options) {
  // const customData = {
  //   businessID: 1,
  //   inviteID: options.inviteID,
  //   inviter: options.inviter,
  //   actionType: options.actionType,
  //   inviteeList: options.inviteeList,
  //   data: {}
  // }
  // const message = wx.$$_tim.createCustomMessage({
  //   to: options.to,
  //   conversationType: options.isFromGroup ? 'GROUP' : 'C2C',
  //   payload: {
  //     data: JSON.stringify(customData),
  //     description: '',
  //     extension: ''
  //   }
  // })
  // message.status = 'success'
  // store.commit('sendMessage', message)
}

// TRTCCalling事件监听
function bindTRTCCallingRoomEvent(TRTCCalling) {
  // const TRTCCallingEvent = TRTCCalling.EVENT
  // // 被邀请
  // TRTCCalling.on(TRTCCallingEvent.INVITED, async (event) => {
  // const {
  //   sponsor,
  //   userIDList
  // } = event.data
  // const avatarList = await getUserProfile([sponsor, ...userIDList])
  // store.commit('setCallData', {
  //   ...event.data,
  //   avatarList: avatarList,
  //   action: 'invited'
  // })
  // store.commit('setCalling', true)
  // // 接收方来电时在落地页时不能调用wx.switchTab
  // if (store.getters.currentPage === '/pages/index/main') {
  //   return
  // }
  // wx.switchTab({
  //   url: '/pages/index/main'
  // })
  // })
  // TRTCCalling.on(TRTCCallingEvent.CALL_END, (event) => {
  // const message = (event.data && event.data.message) || undefined
  // if (message) {
  //   store.commit('sendMessage', message)
  // }
  // $bus.$emit('call-end', {
  //   callingFlag: false,
  //   incomingCallFlag: false
  // })
  // })
  // 有人拒接
  // TRTCCalling.on(TRTCCallingEvent.REJECT, (event) => {
  // const {
  //   isFromGroup = false
  // } = store.getters.callData
  // // 1v1通话时需要通过此事件处理UI
  // if (!isFromGroup) {
  //   $bus.$emit('call-reject', {
  //     callingFlag: false
  //   })
  //   // }
  // })
  // // 对方挂断
  // TRTCCalling.on(TRTCCallingEvent.USER_LEAVE, () => {
  //   // TRTCCalling.hangup()
  //   wx.showToast({
  //     title: '对方已挂机',
  //     icon: 'none',
  //     duration: 1200
  //   })
  // })
  // // 被邀请方不在线无应答
  // TRTCCalling.on(TRTCCallingEvent.NO_RESP, (event) => {
  // const {
  //   data: {
  //     groupID = '',
  //     inviteID,
  //     inviter,
  //     inviteeList
  //   }
  // } = event
  // const {
  //   isFromGroup = false
  // } = store.getters.callData
  // // 1v1和多人通话被邀请方都离线无应答时
  // // 需要给邀请方本地发送一条给被邀请方或群组无应答消息上屏
  // const options = {
  //   inviteID: inviteID,
  //   inviter: inviter,
  //   actionType: 5,
  //   inviteeList: inviteeList,
  //   to: !isFromGroup ? inviteeList[0] : groupID,
  //   isFromGroup: isFromGroup
  // }
  //   // mockLocalMessage(options)
  // })
  // // 被邀请方在线无应答
  // TRTCCalling.on(TRTCCallingEvent.CALLING_TIMEOUT, (event) => {
  // const {
  //   data: {
  //     groupID = '',
  //     inviteID,
  //     inviter,
  //     userIDList
  //   }
  // } = event
  // // const {
  // //   isFromGroup = false
  // // } = store.getters.callData
  // // 被邀请方在线无应答时，需要给被邀请方本地发送一条给邀请方无应答消息上屏
  // if (store.getters.myInfo.userID !== inviter && store.getters.myInfo.userID === userIDList[0]) {
  //   const options = {
  //     inviteID: inviteID,
  //     inviter: inviter,
  //     actionType: 5,
  //     inviteeList: userIDList,
  //     to: isFromGroup ? groupID : inviter,
  //     isFromGroup: isFromGroup
  //   }
  //   mockLocalMessage(options)
  // }
  //   // // 多人通话且通话至少有一人已接受邀请,这种情况下无法判断超时用户是在线还是离线,对消息暂不做上屏处理
  // })
  // // 忙线中
  // TRTCCalling.on(TRTCCallingEvent.LINE_BUSY, () => {
  // $bus.$emit('line-busy', {
  //   callingFlag: false,
  //   incomingCallFlag: false
  //   // })
  // })
  // // 取消通话
  // TRTCCalling.on(TRTCCallingEvent.CALLING_CANCEL, () => {
  // $bus.$emit('call-cancel', {
  //   incomingCallFlag: false
  //   // })
  // })
  // // 远端进入房间
  // TRTCCalling.on(TRTCCallingEvent.USER_ENTER, () => {
  //   $bus.$emit('user-enter', {
  //     inviteCallFlag: false
  //   })
  // })
}

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