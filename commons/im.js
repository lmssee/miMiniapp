import fn from './fn.js';
import config from './config.js';
import TIM from 'tim-wx-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
/***
 *  on(eventName, handle,context)     
 *          在 login 前调用此监听事件，避免漏掉 SDK 派发事件
 *          context      期望事件 handle 执行的上下文
 *  off(eventName, handler,context,once)
 *            取消事件监听
 *  registerPlugin()      
 *            注册插件
 */
const imfn = {
  /** 
   * 初始化 */
  ini() {
    /** 重建实例 */
    const tim = TIM.create({
      SDKAppID: config.SDKAppID
    });
    /** 日志级别 
     * 0  普通级别，日志量较多，接入时建议使用
     * 1  release SDK 关键信息，生产环境建议使用
     * 2  告警级别，SDK 只输出告警和错误级别的日志
     * 3  错误级别，SDK 只输出错误级别的日志
     * 4  无日志级别，SDK 将不打印日志
     */
    tim.setLogLevel(4);
    /** 赋值给 wx ,创建 全局二级对象 */
    wx.$_tim = tim;
    /** 赋值给 wx ,创建全局 二级 对象 */
    wx.$_TIM = TIM;
    // wx.$_dialogueRoomIsOpen = false;
    /** 注册腾讯云即时通信 IM 上传插件,即时通信 IM SDK 发送图片、语音。视频、文件、等消息时需要上传插件，将文件长传到腾讯云对象储存 */
    wx.$_tim.registerPlugin({
      'tim-upload-plugin': TIMUploadPlugin
    });
    this.login();
  },
  login() {
    const userID = 'tjltest'
    wx.$_tim.login({
      userID,
      userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwiVZOSWpxSVQqeKU7MSCgswUJStDEwMDU3NDU0MDiExqRUFmUSpQ3NTU1MjAACpakpkLEjMztjA0t7A0NYKakpkONDkrJD-Dtbww2CfMKa00yiA8KTg5qjLfNTg7J6MiLMXE1CgkMjIvL0bf36PU1VapFgARaTN*'
    }).then(() => {
      this.registerEvents();
    }).catch((err) => {
      console.log(err);
    });
  },
  /** 事件监听 */
  registerEvents() {
    /** 监听登陆状态 */
    wx.$_tim.on(wx.$_TIM.EVENT.SDK_READY, () => {
      config.imSDKReady = true
    });
    /** 监听未登录状态,此时 SDK 无法再正常工作 */
    wx.$_tim.on(wx.$_TIM.EVENT.SDK_NOT_READY, () => {
      config.imSDKReady = false;
      this.login();
    });
    /** 多端登录，被挤出 */
    wx.$_tim.on(wx.$_TIM.EVENT.KICKED_OUT, this.KickOut);
    /** 出现错误监听 */
    wx.$_tim.on(wx.$_TIM.EVENT.ERROR, this.Error);
    /** 接收消息的单聊、群聊、群提示、群系统通知的新消息，可遍历 event.data 获取消息列表并更新也买你的 消息 */
    wx.$_tim.on(wx.$_TIM.EVENT.MESSAGE_RECEIVED, this.MessageReceived);
    /** 收到自己或好友的资料变更通知 */
    wx.$_tim.on(wx.$_TIM.EVENT.PROFILE_UPDATED, this.ProfileUpdate);
    /** 好友列表发生改变 （ 该接口需要等待 SDK 处于 ready 才可以使用 ） */
    wx.$_tim.on(wx.$_TIM.EVENT.FRIEND_LIST_UPDATE, this.FriendListUpdate);
    /** 黑名单列表更新 */
    wx.$_tim.on(wx.$_TIM.EVENT.BLACKLIST_UPDATED, this.BlackListUpdate);
    /** 网络状态更改 */
    wx.$_tim.on(wx.$_TIM.EVENT.NET_STATE_CHANGE, this.NetStateChange);
    /** 消息已读 */
    wx.$_tim.on(wx.$_TIM.EVENT.MESSAGE_READ_BY_PEER, this.MessageReadByPeer);
    /** 消息被撤回通知 */
    // wx.$_tim.on(wx.$_TIM.EVENT.MESSAGE_REVOKED, this.MessageRevoked);
    /*** 收到消息被第三方回调修改的通知，消息发送方可通过遍历 event.data 获取消息列表数据并更新页面上同 ID 消息的内容 */
    wx.$_tim.on(wx.$_TIM.EVENT.MESSAGE_MODIFIED, this.MessageModified);
    /** 消息列表更新通知 */
    wx.$_tim.on(wx.$_TIM.EVENT.CONVERSATION_LIST_UPDATED, this.ConversationListUpdated);
    /** 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面 */
    wx.$_tim.on(wx.$_TIM.EVENT.GROUP_LIST_UPDATED, this.GroupListUpdate);
    /** 群系统消息 */
    wx.$_tim.on(wx.$_TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, this.GroupSystemNoticeReceived);
    /** 收到好友申请列表更新通知 */
    wx.$_tim.on(wx.$_TIM.EVENT.FRIEND_APPLICATION_LIST_UPDATED, this.FriendApplicationListUpdate);
    /**  收到好友分组列表更新通知 */
    wx.$_tim.on(wx.$_TIM.EVENT.FRIEND_GROUP_LIST_UPDATED, this.FriendGroupListUpdate);
  },
  /** 多端登录，被挤掉线 */
  KickOut() {
    wx.showToast({
      title: '你已被踢下线',
      icon: 'none',
      duration: 500
    })
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/message/dialogueRoom/dialogueRoom',
      })
    }, 500)
  },
  /** 接到消息 
   * 由 tim.on(TIM.EVENT.MESSAGE_RECEVED,callbackfn) 监听
   * 
   *  e (object)
   *  name 事件类型  onMessageReceived
   *  data 具体数据列表
   *          数组（元素为 object 格式）
   */
  MessageReceived(e) {
    console.log(e);
    wx.showToast({
      title: '新消息',
    });
    this.getMessageList().then(o => {
      console.log(o);
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
  /** 错误回调 */
  Error(event) {
    // 网络错误不弹toast && sdk未初始化完全报错
    if (event.data.message && event.data.code && event.data.code !== 2800 && event.data.code !== 2999) {
      console.log(event.message.message);
    }
  },
  /**
   * 网络变化
   */
  checkoutNetState(state) {

  },
  /**
   * */
  NetStateChange(o) {
    switch (o.data.state) {
      case TIM.TYPES.NET_STATE_CONNECTED:
        return {
          title: '已接入网络', duration: 2000
        };
      case TIM.TYPES.NET_STATE_CONNECTING:
        return {
          title: '当前网络不稳定', duration: 2000
        };
      case TIM.TYPES.NET_STATE_DISCONNECTED:
        return {
          title: '当前网络不可用', duration: 2000
        };
      default:
        return ''
    }
  },
  /** 消息对方已读 */
  MessageReadByPeer(event) {
    console.log(event)
  },
  /** 群列表更新
   * 有新人加入或旧人退出
   */
  GroupListUpdate(o) {
    console.log(o);
    // store.commit('updateGroupList', event.data)
  },
  /**
   *  黑名单列表更新 
   * */
  BlackListUpdate(o) {
    console.log(o);
    // store.commit('updateBlacklist', event.data)
  },
  /** 消息被撤回 */
  messageRevoked(e) {
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
   *     默认会话保存时常跟会话最后一条保存时间一致，默认 7 天
   */
  getConverSationList(list) {
    return wx.$_tim.getConversationList(list);
  },
  /** 详细会话信息 
   * 
   *   参数 
   *       id      conversationID    string      会话 ID 
   *   返回值
   *        Promise   
   */
  getConversationInfo(id) {
    return wx.$_tim.getConversationProfile(id);
  },
  /** 删除会话
   *  只删除会话，不会删除信息
   *    参数      id        conversationID
   *    返回值    Promise   
   */
  delConversation(id) {
    return wx.$_tim.deleteConversation(id);
  },
  /** 置顶或取消置顶 */
  listTop(to, isPinned = false) {
    return wx.$_tim.pinConversation({
      conversationID: `C2C${to}`,
      isPinned
    })
  },
  /**  群组列表获取
   * 
   *    参数：
   *        grouProfileFilter     array<string>   群资料过滤器。除默认的群资料外，指定需要拉取得群资料，支持以下值
   *                        TIM.TYPES.GRP_PROFILE_OWNER_ID          群主 id
   *                        TIM.TYPES.GRP_CREATE_TIME               群创建时间
   *                        TIM.TYPES.GRP_PROFILE_LAST_INFO_TIME    最后一次群资料变更时间
   *                        TIM.TYPES.GRP_PROFILE_MEMBER_NUM：群成员数量
   *                        TIM.TYPES.GRP_PROFILE_MAX_MEMBER_NUM：最大群成员数量
   *                        TIM.TYPES.GRP_PROFILE_JOIN_OPTION：申请加群选项
   *                        TIM.TYPES.GRP_PROFILE_INTRODUCTION：群介绍
   *                        TIM.TYPES.GRP_PROFILE_NOTIFICATION：群公告
   *                        TIM.TYPES.GRP_PROFILE_MUTE_ALL_MBRS (全体禁言设置) v2.6.2起支持
   * 
   *  返回值：
   *        Promise       可在 IMRespose.data.gronpList 中获取群组列表
   * 
   */
  getGroupList(o) {
    if (!!o && o === '')
      return wx.$_tim.getGroupList(o);
    else
      return wx.$_tim.getGroupList();
  },
  /** 获取群详细资料
   *  
   *  参数 ：   o   object    
   *                groiupID                    string        群组 ID
   *                groupCustomFieldFilter      Array         过滤器，自定义指定的获取的字段
   * 
   *    返回值
   *        Promise
   *  
   */
  getGroupInfo(o) {
    return wx.$_tim.getGroupProfile(o);
  },
  /***
   * 创建群组
   * 
   *   <该接口在创建 TIM.TYPES.GRP_AVCHATROOM 直播群后，需调用 joinGroup 接口加入群组后，才能进行消息的收发>
   * 参数
   * 
   *          o   object    
   *               name           string        名称，必填，最长 30 字节
   *               type           string        群组类型
   *                                                TIM.TYPES.GRP_WORK         好友工作群
   *                                                TIM.TYPES.GRP_PUBLIC       陌生人社交
   *                                                TIM.TYPES.GRP_MEETING      临时会议
   *                                                TIM.TYPES.GRP_AVCHATROOM   直播群
   *               groupID        String         群 ID ，不填写会自动生成
   *               introduction   String         群介绍，最长 240 字节
   *               notification   String        群公告，最长 300 字节  
   *               avatar         String        群头像 URL，最长 100 字节
   *               maxMemberNum   NUmber        最大成员数，除直播群默认 6000
   *               joinOption     string        加群方式，创建好友工作群/临时会议/直播群不填写
   *                                             TIM.TYPES.JOIN_OPTIONS_FREE_ACCESS  自由加入
   *                                             TIM.TYPES.JOIN_OPTIONS_NEED_PERMISSION
   *                                             TIM.TYPES.JOIN_OPTIONS_DISACLE_APPLY   禁止加入
   *               numberList     Array         促使群成员列表  500
   *                                        userID      成员 ID
   *                                        role        成员身份，选项只有 admin，表示管理员
   *                                        memberCustomFiled   群成员维度
   *               groupCustomField   Array     群组维度自定义字段，默认没有自定义字段
   * 
   *  返回值
   * 
   *            Promise
   * 
   */
  createGroup(o) {
    return wx.$_tim.createGroup(o);
  },
  /** 解散群
   * 
   *    群主不能解散好友工作群
   * 
   * 返回值 
   * 
   *        Promise
   */
  dismissGroup(id) {
    return wx.$_tim.dismissGroup(id);
  },
  /**  更新群资料
   *    参数 
   *          o   object   
   *    *               name           string        名称，必填，最长 30 字节
   *               type           string        群组类型
   *                                                TIM.TYPES.GRP_WORK         好友工作群
   *                                                TIM.TYPES.GRP_PUBLIC       陌生人社交
   *                                                TIM.TYPES.GRP_MEETING      临时会议
   *                                                TIM.TYPES.GRP_AVCHATROOM   直播群
   *               groupID        String         群 ID ，不填写会自动生成
   *               introduction   String         群介绍，最长 240 字节
   *               notification   String        群公告，最长 300 字节  
   *               avatar         String        群头像 URL，最长 100 字节
   *               maxMemberNum   NUmber        最大成员数，除直播群默认 6000
   *               joinOption     string        加群方式，创建好友工作群/临时会议/直播群不填写
   *                                             TIM.TYPES.JOIN_OPTIONS_FREE_ACCESS  自由加入
   *                                             TIM.TYPES.JOIN_OPTIONS_NEED_PERMISSION
   *                                             TIM.TYPES.JOIN_OPTIONS_DISACLE_APPLY   禁止加入
   *               numberList     Array         促使群成员列表  500
   *                                        userID      成员 ID
   *                                        role        成员身份，选项只有 admin，表示管理员
   *                                        memberCustomFiled   群成员维度
   *               groupCustomField   Array     群组维度自定义字段，默认没有自定义字段
   * 
   *  返回值
   *            Promise
   *
   *              
   */
  updateGronpProfile(o) {
    return wx.$_tim.updateGronpProfile(o);
  },
  /**  申请入群
   * 
   *        好友工作群不允许加群，只能通过 addGroupMember 方式加入
   *        TIM.TYPES.GRP_AVCHATROOM（直播群）
   *                  正常加入                   此时 SDK 内接口均可用
   *                  匿名加入(其他群不支持)      不登陆加群，只能收消息
   *         同一用户同时只能加入一个直播群
   * 
   *    参数 
   * 
   *          o     object        
   *                gorupID       
   *                applyMessage          附言
   *                type                  群类型
   *                                   TIM.TYPES.GRP_PUBLIC
   *                                   TIM.TYPES.GRP_MEETING
   *                                   TIM.TYPES.GRP_AVCHATROOM
   *    返回值
   * 
   *            Promise
   *                        status            状态
   *                                  TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL 审核
   *                                  TIM.TYPES.JOIN_STATUS_SUCCESS       成功
   *                                  TIM.TYPES.JOIN_STATUS_IN_GROUP      已在群
   *                         group            群资料
   */
  joinGroup(o) {
    return wx.$_tim.joinGroup(o);
  },
  /** 
   * 退出群组
   * 
   *      群主只能退出好友工作群，此群再无群主
   *    参数：
   * 
   *        id      群 ID
   *    返回值：
   * 
   *       Promise
   */
  quiteGroup(id) {
    return wx.$_tim.quitGroup(id);
  },
  /*** 找群      通过 群 ID 查找群   */
  searchGroupByID(id) {
    return wx.$_tim.searchGroupByID(id);
  },
  /** 转让群
   *        群主权限
   *  参数说明： 
   *          o    object
   *               groupID        群 ID
   *                newOwnerID    新群主 ID
   *  返回值
   *            Promise
   */
  changeGroupOwner(o) {
    return wx.$_tim.changeGroupOwner(o);
  },
  /** 处理加群通知
   *        参数 
   *              o         object
   *                        handleAction          处理结果
   *                        handleMessage         附言
   *                        message               申请入群的消息
   * 
   *      返回值
   *              Promise
   *      
   */
  handleGroupApplication(o) {
    return wx.$_tim.handleGroupApplication(o)
  },
  /** 设置群消息提示类型 
   * 
   * 参数
   *      o         object
   *                groupID       
   *                messageRemindType         群消息类型
   *                                       ITM.TYPES.MSG_REMIND_ACPT_AND_NOTE     接收并抛出，接入侧提示
   *                                       ITM.TYPES.MSG_REMIND_ACPT_NOT_NOTE     接收并抛出，接入侧不提示
   *                                       ITM.TYPES.MSG_REMIND_DISCARD           SDK 拒收
   * 
   */

  setMessageRemindType(o) {
    return wx.$_tim.setMessageRemindType(o);
  },
  /** 群成员管理
   *   -> 2.6.2 开始，该接口支持拉取群成员禁止时间戳，接入侧可根据此值判断成员是否被禁言
   *      低于 2.6.2 版本，该接口获取的群成员的资料仅包括头像、昵称等，能够满足群成员列表的渲染需求
   *      该接口是分页拉取群成员，不能直接拉取所有的人员。获取群的总人数使用 <getGroupPrpfile>
   *    <-
   * 
   * 参数说明：
   *          o   object    
   *                groupID               群组 ID
   *                count                 数量，最大值 100
   *                offset                偏移量
   */
  getGroupMemberList(o) {
    return wx.$_tim.getGroupMemberList(o);
  },
  /** 获取群成员资料 
   *      ->
   *            使用该接口，需要在 SDK 2.2.0 版本之上
   *            每次查询上限 50 
   *      <-
   *  参数说明
   *            o   object
   *                groupID                     群组 ID
   *                userIDList                  要查询的群成员列表
   *                memberCustomFieldFilter     群成员的自定义字段的刷选，可选
   * 
   */
  getGroupMemberInfo(o) {
    return wx.$_tim.getGroupMemberProfile(o);
  },
  /**   添加群成员
   *        ->
   *            TIM.TYPES.GRP_WORK              任何成员都可以邀请其他成员
   *            TIM.TYPES.GRP_PUBLIC            app 管理员才可以           
   *            TIM.TYPES.GRP_MEETING           app 管理员才可以
   *            TIM.TYPES.GRP_AVCHATROOM        不允许任何人加入
   *        <-
   * 
   *  参数说明 ：
   *    o   object
   *        groupID               群 ID  
   *        userIDList            待添加成员的 ID 群组。单次最多添加 300 个成员
   * 
   *  返回值
   *    Promise 
   *        successUserIDList                     添加成功的 userID 
   *        failureUserIDList                     添加失败的 userID
   *        existeduserIDList                     已在群的  userID
   *        group                                接口调用后群资料
   */

  addGroupMember(o) {
    return wx.$_tim.addGroupMember(o);
  },
  /** 删除群成员
   *  参数： 
   *          o     object            
   *                groupID              群组 ID
   *                userIDList           待删除群成员的 ID 列表
   *                reasion               踢人的原因
   * 
   *    返回值
   *          Pomise
   */
  delGroupMember(o) {
    return wx.$_tim.deleteGroupMember(o);
  },
  /**禁言或取消 
   * 
   *    参数 
   *        o   object
   *            groupID         群组 ID
   *            userID          被管理员 ID
   *            muteTime        禁言时间
   */
  setGroupMemberMuteTime(o) {
    return wx.$_tim.setGroupMemberMuteTime(o);
  },
  /*** 设置管理员或撤销管理员
   *  参数说明
   *          o   object  
   *              groupID               群组 ID
   *              userID                用户 ID 
   *              role            
   *                              TIM.TYPES.GRO_MBR_ROLE_ADMIN      群管理员
   *                              TIM.TYPES.GRO_MBR_ROLE_MEMBER     群普通人员
   */
  setGroupMemberRole(o) {
    return wx.$_tim.setGroupMemberRole(o);
  },
  /**修改群名片
   * 
   *  参数说明  
   *        o  object 
   *              groupID         群组 ID
   *              userID          可选。自身群名片
   *              nameCard        
   * 
   *    返回值
   *        Promise
   * 
   */
  setGroupMemberNameCard(o) {
    return wx.$_tim.setGroupMemberNameCard(o);
  },
  /***  修改自定义字段
   * 
   *  参数说明
   *      o   object
   * 
   *            groupID             群组 ID
   *            userID              群成员 ID
   *            memberCustomField   群成员自定义字段
   *                                  key         自定义字段 key
   *                                  value       自定义字段 value
   *  返回值 Promide
   * 
   */
  setGroupMemberCustomFiled(o) {
    return wx.$_tim.setGroupMemberCustomField(o);
  },
  /** 群提示消息
   *      operatorID               执行该操作的用户的 ID
   *      operationType            操作的类型
   *      userIDList               相关的 userID
   *      newGroupProfile           群资料变更，该字段存放变更的群资料
   */
  /**  系统消息 
   * 
   */
  GroupSystemNoticeReceived(o) {
    console.log(o);
  },
  /** 获取我的资料  */
  getMiInfo() {
    return wx.$_tim.getMyProfile();
  },
  /** 
   *  获取其他用户的资料
   * 
   *  参数说明：
   *          o   object
   *        
   *                userIDList        用户列表
   *    
   *          返回值
   *              
   *          Promise
   */
  getOtherInfo(o) {
    return wx.$_tim.getUserProfile(o);
  },
  /** 更新资料
   * 
   *  参数说明：
   *        {nick:'昵称',avatar:'头像地址',gender:wx.$_TIM.TYPES.GENDER_UNKNOWN|wx.$_TIM.TYPES.GENDER_FEMALE|wx.$_TIM.TYPES.GENDER_MALE,selfSIgnature:"个性签名",allowType:$_TIM.TYPES.ALLOW_TYPE_ALLOW_ANY|$_TIM.TYPES.ALLOW_TYPE_NEED_CONFIRM|$_TIM.TYPES.ALLOW_TYPE_DENY_ANY,birthday:20210828,location:'ZZZZ',language:0,messageSettings:0,adminForbidType:wx.$_TIM.TYPES.FORBID_TYPE_NONE|wx.$_TIM.TYPES.FORBID_SEND_OUT,level:0,role:0,profileCUstomFIeld:[]
   * }
   * 
   *          o     object
   *      
   *                nick             昵称
   *                avatar           头像地址
   *                gender           性别
   *                                  TIM.TYPES.GENDER_UNKNOWN    外星人
   *                                  TIM.TYPES.GENDER_FEMALE     女的
   *                                  TIM.TYPES.GENDER_MALE       男的、
   *                  allowType       添加好友是否需要验证
   *                                  TIM.TYPES.ALLOW_TYPE_ALLOW_ANY      直接加
   *                                  TIM.TYPES.ALLOW_TYPE_NEED_CONFIRM   需要验证
   *                                  TIM.TYPES.ALLOW_TYPE_DENY_ANY       拒绝
   *                  birthday        生日
   *                  location        所在地 4 位 unint32_t 表示 的数字
   *                  language        语言
   *                  messageSettings 消息设置,0 表示接收消息,1 表示不接受消息
   *                  adminForbidType 管理员禁止加好友表示
   *                                    TIM.TYPES.FORBID_TYPE_NONE 表示允许加好友，默认值
   *                                    TIM.TYPES.FORBID_TYPE_SEND_OUT 表示禁止该用户发起加好友请求
   *                        level       等级,建议拆分
   *                        role        角色
   *                        profileCustomField  修改自定义字段
   *                                            需要在后台设置
   * 
   */
  updateMiInfo(o) {
    return wx.$_tim.updateMyProfile(o);
  },
  /** 黑名单   */
  getBlackList() {
    return wx.$_tim.getBlacelist()
  },
  /** 加入黑名单    */
  addBlacklist(userIDList) {
    return wx.$_tim.addToBlacklist({
      userIDList
    });
  },
  /** 移除黑名单    */
  removeBlacklist(userIDList) {
    return wx.$_tim.removeFromBlacklist({
      userIDList
    });
  },
  /*** 收到消息被第三方回调修改的通知，消息发送方可通过遍历 event.data 获取消息列表数据并更新页面上同 ID 消息的内容 */
  MessageModified(o) {
    console.log(o);
    return o;
  },
  /** 消息列表发生改变 */
  ConversationListUpdated(o) {
    console.log(o);
    // return o;
  },
  /** 收到自己或好友的资料变更通知 */
  ProfileUpdate(o) {
    console.log(o);
    return o;
  },
  /** 好友列表发生改变 */
  FriendListUpdate(o) {
    console.log(o);
    return o;
  },
  /** 收到好友申请列表更新通知 */
  FriendApplicationListUpdate(o) {
    console.log(o);
    return o;
    // event.name - TIM.EVENT.FRIEND_APPLICATION_LIST_UPDATED
    // friendApplicationList - 好友申请列表 - [FriendApplication]
    // unreadCount - 好友申请的未读数
    // const { friendApplicationList, unreadCount } = event.data;
    // 发送给我的好友申请（即别人申请加我为好友）
    // const applicationSentToMe = friendApplicationList.filter((friendApplication) => friendApplication.type === TIM.TYPES.SNS_APPLICATION_SENT_TO_ME);
    // 我发送出去的好友申请（即我申请加别人为好友）
    // const applicationSentByMe = friendApplicationList.filter((friendApplication) => friendApplication.type === TIM.TYPES.SNS_APPLICATION_SENT_BY_ME);
  },
  /**  收到好友分组列表更新通知 */
  FriendGroupListUpdate(o) {
    // event.name - TIM.EVENT.FRIEND_GROUP_LIST_UPDATED
    // event.data - 存储 FriendGroup 对象的数组 - [FriendGroup]
    console.log(o);
    return o;
  },
  /** 主动获取好友列表 */
  getFriendList() {
    return wx.$_tim.getFriendList();
  },
  /** 主动添加好友 */
  addFriend() {
    return wx.$_tim.addFriend({
      to: '',
      source: 'AddSource_Type_Web',
      remark: '',
      groupName: '',
      wording: '',
      type: wx.$_TIM.TYPES.SNS_ADD_TYPE_BOTH
    });
  },
  /** 主动删除好友  删除的好友数组  默认双向删除 */
  delFriend(userIDList, both = true) {
    return wx.$_deleteFriend({
      userIDList,
      type: both == true ? wx.$_TIM.TYPES.SNS_DELETE_TYPE_BOTH : wx.$_TIM.TYPES.SNS_DELETE_TYPE_SINGLE
    })
  },
  /** 校验好友关系 好友数组 */
  checkFriend(userIDList) {
    return wx.$_tim.checkFriend({
      userIDList,
      type: wx.$_TIM.TYPE.SNS_CHECK_TYPE_BOTH
    });
  },
  /** 获取好友的数据和资料数据 */
  getFriendInfo(userIDList) {
    return wx.$_tim.getFriendProfile({
      userIDList
    })
  },
  /** 更新好友关系链，只支持好友的备注和自定义字段 */
  upFriend(userID, remark) {
    return wx.$_tim.epdateFriend({
      userID,
      remark
    });
  },
  /** 护球好友申请列表 */
  getFriendApplicationList() {
    return wx.$_tim.getFriendApplicationList();
  },
  /** 同意好友申请 */
  agreeFriendApplication(userID, remark) {
    return wx.$_tim.acceptFriendApplication({
      userID,
      remark,
      type: wx.$_TIM.SNS_APPLICATION_AGREE_AND_ADD
    });
  },
  /**  拒绝好友申请 */
  refurdeFriendApplication(userID) {
    return wx.$_tim.refurdeFriendApplication({
      userID
    });
  },
  /** 删除好友申请 */
  delFriendApplication(userID) {
    return wx.$_tim.deleteFriendApplication({
      userID,
      type: wx.$_TIM.TYPES_APPLICATION_SENT_TO_ME
    });
  },
  /** 上报好友申请已读 */
  friendApplicationRead() {
    return wx.$_tim.setFriendApplicationRead();
  },
  /**主动获取好友的分组列表 */
  /*** 其他关于好友的 API  https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#getConversationList */
  /** 发送消息，传入第三参数时为群聊消息*/
  sendMessage(to, text, group = true) {
    /** 创建实例 */
    let msg = wx.$_tim.createTextMessage({
      to,
      conversationType: group == true ? wx.$_TIM.TYPES.CONV_GROUP : wx.$_TIM.TYPES.CONV_C2C,
      payload: {
        text
      }
    });
    /** 发送消息，返回为 Promise 对象 */
    return wx.$_tim.sendMessage(msg, {
      offlinePushInfo: {
        /** 如果对方不在线，则消息将存入漫游，且进行离线推送 */
        title: '您有新的离线消息',
        description: msg,
        /** 离线推送设置 OPPO 手机 8.0 系统以上的渠道 ID */
        androidOPPOChannelID: ''
      }
    });
  },
  /*** 发送消息，仅用于群组消息 */
  sendGroupMessage(to, text, ) {
    let msg = wx.$_tim.createTextAtMessage({
      to,
      conversationType: wx.$_TIM.TYPES.CONV_GROUP,
      payload: {
        text,
        atUserList: [] // 设置为 userID     TIM.TYPES.MSG_AT_ALL @ 所有人
      }

    });
    /** 发送消息 */
    return wx.$_tim.sendMessage(msg);
  },
  /** 发送图片消息 */
  sendImgMessage(to) {
    wx.chooseImage({
      /** 从相册选取图片 */
      sourceType: ['album'],
      count: 1,
      success: (file) => {
        return tim.sendMessage(wx.$_tim.createImageMessage({
          to,
          conversationType: wx.$_TIM.TYPES.CONV_C2C,
          payload: {
            file
          },
          onProgress: (event) => {
            console.log('file uploading:', event);
          }
        }));
      },

    })
    return wx.$_tim.sendMessage(msg);
  },
  /** 音频消息，代添加 */
  /**  */
  /** 消息撤回 */
  delMessage(message) {
    return wx.$_tim.deleteMessage([message]);
  },
  /**  分页拉去消息列表
   * messageList           消息列表
   * nextReqMessageID      续拉时的 ID
   * isClomPleted          表示消息是否拉取完毕
   */
  getMessageList(to, nextReqMessageID = '', group = false) {
    let o = {
      conversationID: group == fasle ? `C2C${to}` : `GROUP${to}`,
      nextReqMessageID,
      count: 20,
    };
    if (nextReqMessageID == '')
      delete o.nextReqMessageID;
    return wx.$_tim.getMessageList(o);
  },
  /** 消息已读，不调用该接口，消息将一直处于未读状态 */
  messageRead(to, group = false) {
    return wx.$_tim.setMessagRead({
      conversationID: group == fasle ? `C2C${to}` : `GROUP${to}`
    });
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

};
export default imfn;