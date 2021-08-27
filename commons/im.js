import fn from './fn.js';
import config from './config.js';
import TIM from 'tim-wx-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
// import store from './store/index.js';
const imfn = {
  /** 
   * 初始化 */
  ini() {
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
    this.registerEvents(wx.$_tim);
  },
  /** 事件监听 */
  registerEvents(tim) {
    tim.on(wx.$_TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
    tim.on(wx.$_TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this);
    tim.on(wx.$_TIM.EVENT.KICKED_OUT, this.kickOut, this);
    tim.on(wx.$_TIM.EVENT.ERROR, this.onError, this);
    tim.on(wx.$_TIM.EVENT.MESSAGE_RECEIVED, this.messageReceived, this);
    tim.on(wx.$_TIM.EVENT.CONVERSATION_LIST_UPDATED, this.convListUpdate, this);
    tim.on(wx.$_TIM.EVENT.GROUP_LIST_UPDATED, this.groupListUpdate, this);
    tim.on(wx.$_TIM.EVENT.BLACKLIST_UPDATED, this.blackListUpdate, this);
    tim.on(wx.$_TIM.EVENT.NET_STATE_CHANGE, this.netStateChange, this);
    tim.on(wx.$_TIM.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer, this);
    tim.on(wx.$_TIM.EVENT.MESSAGE_REVOKED, this.onMessageRevoked, this);
    console.log(tim);
  },
  /** 多端登录，被挤掉线 */
  kickOut(e) {
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
  },

  /** 状态监听 */
  onReadyStateUpdate({
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
  },
  /** 接到消息 
   * 由 tim.on(TIM.EVENT.MESSAGE_RECEVED,callbackfn) 监听
   * 
   *  e (object)
   *  name 事件类型  onMessageReceived
   *  data 具体数据列表
   *          数组（元素为 object 格式）
   *           
   * 
   */
  messageReceived(e) {
    console.log(e);
    wx.showToast({
      title: '新消息',
    });
  },
  /** 解析表情信息 */
  parseText(payload) {
    let renderDom = []
    // 文本消息
    let temp = payload.text
    let left = -1
    let right = -1
    while (temp !== '') {
      left = temp.indexOf('[')
      right = temp.indexOf(']')
      switch (left) {
        case 0:
          if (right === -1) {
            renderDom.push({
              name: 'text',
              text: temp
            })
            temp = ''
          } else {
            let _emoji = temp.slice(0, right + 1)
            if (emojiMap[_emoji]) { // 如果您需要渲染表情包，需要进行匹配您对应[呲牙]的表情包地址
              renderDom.push({
                name: 'img',
                src: emojiUrl + emojiMap[_emoji]
              })
              temp = temp.substring(right + 1)
            } else {
              renderDom.push({
                name: 'text',
                text: '['
              })
              temp = temp.slice(1)
            }
          }
          break
        case -1:
          renderDom.push({
            name: 'text',
            text: temp
          })
          temp = ''
          break
        default:
          renderDom.push({
            name: 'text',
            text: temp.slice(0, left)
          })
          temp = temp.substring(left)
          break
      }
    }
    return renderDom
  },
  /** 解析系统消息 */
  parseGroupSystemNotice(payload) {
    const groupName =
      payload.groupProfile.groupName || payload.groupProfile.groupID
    switch (payload.operationType) {
      case 1:
        return `${payload.operatorID} 申请加入群组：${groupName}`
      case 2:
        return `成功加入群组：${groupName}`
      case 3:
        return `申请加入群组：${groupName}被拒绝`
      case 4:
        return `被管理员${payload.operatorID}踢出群组：${groupName}`
      case 5:
        return `群：${groupName} 已被${payload.operatorID}解散`
      case 6:
        return `${payload.operatorID}创建群：${groupName}`
      case 7:
        return `${payload.operatorID}邀请你加群：${groupName}`
      case 8:
        return `你退出群组：${groupName}`
      case 9:
        return `你被${payload.operatorID}设置为群：${groupName}的管理员`
      case 10:
        return `你被${payload.operatorID}撤销群：${groupName}的管理员身份`
      case 255:
        return '自定义群系统通知'
    }
  },
  /** 错误回调 */
  onError(event) {
    // 网络错误不弹toast && sdk未初始化完全报错
    if (event.data.message && event.data.code && event.data.code !== 2800 && event.data.code !== 2999) {
      // store.commit('showToast', {
      //   title: event.data.message,
      //   duration: 2000
      // })
    }
  },
  /**
   * 网络变化
   */
  checkoutNetState(state) {
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
  },
  /**
   * */
  netStateChange(event) {
    console.log(event.data.state)
    // store.commit('showToast', checkoutNetState(event.data.state))
  },
  /** 
   * 消息读取
   */
  onMessageReadByPeer(event) {
    console.log(event)
  },
  /**
   * 列表更新
   */
  convListUpdate(event) {
    // store.commit('updateAllConversation', event.data)
  },
  /** 群列表更新
   * 有新人加入或旧人退出
   */
  groupListUpdate(event) {
    // store.commit('updateGroupList', event.data)
  },
  /**
   *  黑名单列表更新 
   * */
  blackListUpdate(event) {
    // store.commit('updateBlacklist', event.data)
  },
  /** 消息被撤回 */
  onMessageRevoked(e) {
    wx.showToast({
      title: '消息被撤回',
    });
    console.log(e);
    /***
   * // 获取会话的消息列表时遇到被撤回的消息
let promise = tim.getMessageList({conversationID: 'C2Ctest', count: 15});
promise.then(function(imResponse) {
const messageList = imResponse.data.messageList; // 消息列表
messageList.forEach(function(message) {
  if (message.isRevoked) {
    // 处理被撤回的消息
  } else {
    // 处理普通消息
  }
});
});
   */
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
  ,
  /**
   * 本地mock发送一条消息用于当前渲染
   * 
   */
  mockLocalMessage(options) {
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
  },

  /** 
   *  TRTCCalling事件监听
   */
  bindTRTCCallingRoomEvent(TRTCCalling) {
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
    // TRTCCalling.on(TRTCCallingEvent.CALLING_CANCsEL, () => {
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
  },
  /** 解析群消息  */
  parseGroupTipContent(payload) {
    switch (payload.operationType) {
      case this.TIM.TYPES.GRP_TIP_MBR_JOIN:
        return `群成员：${payload.userIDList.join(',')}，加入群组`
      case this.TIM.TYPES.GRP_TIP_MBR_QUIT:
        return `群成员：${payload.userIDList.join(',')}，退出群组`
      case this.TIM.TYPES.GRP_TIP_MBR_KICKED_OUT:
        return `群成员：${payload.userIDList.join(',')}，被${payload.operatorID}踢出群组`
      case this.TIM.TYPES.GRP_TIP_MBR_SET_ADMIN:
        return `群成员：${payload.userIDList.join(',')}，成为管理员`
      case this.TIM.TYPES.GRP_TIP_MBR_CANCELED_ADMIN:
        return `群成员：${payload.userIDList.join(',')}，被撤销管理员`
      default:
        return '[群提示消息]'
    }
  },
  /**  获取对话列表  
   *                -- 可用于拉取历史消息记录
   *  参数说明    o (object)
   *    conversation      string     会话 ID . 组成方式 C2C + userID (单聊)
   *                                                   GROUP + groupID (群聊)
   *                                                   @TIM#SYSTEM 系统消息通知会话
   *   nextReqMessageID   String     用于分页连续拉取的消息的 ID。第一次拉取时该字段可不填写
   *                                 每次调用该接口都会返回该字段，续拉时将返回字段填入即可
   *    count             Number    拉取的数量，默认值和最大为 15 ，即每一次最多拉取 15 条消息
   *      
   *    
   *    续拉时需要传入 上一次拉取的 nextReqMessageID ，即返回的 data.next.nextReqMessageID
   * 
   *  返回值（data）：
   *      messageList         消息列表
   *      nextReqMessageID   下次拉取所需 ID
   *      isComplated         是否拉取完毕
   *   getMessageList.then((o)=>{}).catch((err)=>{})
   */
  getMessageList(o) {
    return wx.$_tim.getMessageList({
      o
    })
  },
  /** 消息已读 
   * 必须手动调用才会将消息切换到已读状态 
   * 
   *    参数  o (object)
   * 
   *     options   消息内容的容器
   *        
   *        payload     string          会话 ID ，会话 ID 组成方式 ： C2C + userID (单聊)
   *                                                                FROUP + groupID （群聊）
   *                                                                @TIM#SYSTEM  (系统通知)
   */
  setMessageRead(o) {
    return wx.$_tim.setMessageRead(o);
  },
  /** 获取会话列表
   *     <important> 该列表获取到资料不完整。但是能够满足列表的渲染需求（仅包括头像、昵称等）
   *   返回 Promise 
   *     默认会话保存市场跟会话最后一条保存时间一致，默认 7 天
   */
  getConverSationList(o) {
    return wx.$_tim.getConverSationList();
  },
  /** 详细会话信息 
   * 
   *   参数 
   *       id      conversationID    string      会话 ID 
   *   返回值
   *        Promise   
   */
  getConversationProfile(id) {
    return wx.$_tim.getConversationProfile(id);
  },
  /** 删除会话
   *  只删除会话，不会删除信息
   *    参数      id        conversationID
   *    返回值    Promise   
   * 
   */
  deleteConversation(id) {
    wx.$_tim.deleteConversation(id);
  }

};
export default imfn;