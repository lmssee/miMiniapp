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
    wx.$_TIM = TIM;     
    wx.$_sdkAppID = config.SDKAppID;     
    wx.$_tim.registerPlugin({     
      'tim-upload-plugin': TIMUploadPlugin     
    });     
    this.registerEvents(wx.$_tim);     
  },     
  /** 事件监听 */     
  registerEvents(tim) {     
    /** 收到离线消息和会话列表的同步完毕的通知，接入侧可以调用 sendMessage  等接口鉴权*/     
    tim.on(wx.$_TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);     
    /** SDK 未初始化完毕，会导致所以功能不能使用 */     
    tim.on(wx.$_TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this);     
    /*** 多端登录被挤退 */     
    tim.on(wx.$_TIM.EVENT.KICKED_OUT, this.kickOut, this);     
    /** 出现错误，可以获取错误码和错误信息 */     
    tim.on(wx.$_TIM.EVENT.ERROR, this.onError, this);     
    /** 收到推送的单聊、群聊、群提示、群系统、可通过遍历  event.data 获取消息列表的数据并 */     
    tim.on(wx.$_TIM.EVENT.MESSAGE_RECEIVED, this.messageReceived, this);     
    /** 消息被撤回 */     
    tim.on(wx.$_TIM.EVENT.MESSAGE_REVOKED, this.onMessageRevoked, this);     
    /** SDK 收到对端已读的消息通知，即已读回执。 */     
    tim.on(wx.$_TIM.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer, this);     
    /** 收到会话列表的更新的通知，可通过遍历 event.data 获取会话列表的数据并渲染  */     
    tim.on(wx.$_TIM.EVENT.CONVERSATION_LIST_UPDATED, this.convListUpdate, this);     
    /** 收到群组列表的更新，并通过遍历 event.data 获取群组的列表并渲染到页面 */     
    tim.on(wx.$_TIM.EVENT.GROUP_LIST_UPDATED, this.groupListUpdate, this);     
    /** 收到黑名单列表更新的通知 */     
    tim.on(wx.$_TIM.EVENT.BLACKLIST_UPDATED, this.blackListUpdate, this);     
    /**  收到自己或好友的资料的更新  */     
    tim.on(wx.$_TIM.EVENT.NET_PROFILE_UPDATED, (event) => {}, this);     
    /**  网络变化  */     
    tim.on(wx.$_TIM.EVENT.NET_STATE_CHANGE, this.netStateChange, this);     
    /** 群组系统消息 */     
    tim.on(wx.$_TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, this.groupSystemNoticeReceived);     
  },     
  /** * 登录     
   *   参数说明     
   *          o   object           
   *              userID                      用户的 ID     
   *              userSig                     用户个人的 usreSig     
   */     
  login(o) {     
    return wx.$_tim.login(o);     
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
        console.log(res);     
        // store.commit('updateMyInfo', res.data)     
      })     
      wx.$$_tim.getBlacklist().then(res => {     
        console.log(res);     
        // store.commit('setBlacklist', res.data)     
      })     
    }     
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
  /** 网络状态发生变化     
   *       
   *    event.name     TIM.EVENT.NET_STATE_CHANGE     
   *                    TIM.TYPES.NET_STATE_CONNECTED     
   *                    TIM.TYPES.NET_STATE_CONNECTING     
   *                    TIM.TYPES.NET_STATE_DISCONNECTED     
   * */     
  netStateChange(event) {     
    console.log(event.data.state)     
    // store.commit('showToast', checkoutNetState(event.data.state))     
  },     
  /** 对方已读回执     
   *      
   */     
  onMessageReadByPeer(event) {     
    console.log(event)     
  },     
  /**列表更新     
   *      
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
  /** 创建文本信息口      
   *      
   *    参数说明     
   *      
   *            o     object     
   *      
   *                  to                            消息接收方的 userID 或 groupID     
   *                  conversationType              会话类型     
   *                                                TIM.TYPES.CONV_C2C (端到端)或 TIM.TYPES.CONV_GROUP     
   *                  priority                      消息优先级     
   *                  payload           object      消息内容容器     
   *                                                text       消息文本     
   */     
  createTextMessage(o){     
   
    return  wx.$_tim.createTextMessage(o);     
  },
  /** 选图  
   *    选择图片发送
   *  参数说明:
   *            o     object    
   *                  to                        接收方
   *                  type                      类型
   * 
   *                                                  TIM.TYPES.CONV_C2C
   *                                                  TIM.TYPES.CONV_GROUP
   *                  priority                  优先级  
   *                  body                      消息体  
   *                  onprogress                上传进度  (回调函数)      
   *  */    
  chooseImage(o){
     wx.chooseImage({
          sourceType:['album'],
          count:1,
          success:(res)=>{
                this.createImageMessage({
                  to:o.to,
                  conversationType:o.type,
                        priority:o.priority,
                        payload:o.body,
                        onProgress:o.onProgress
                })
          }
    });
  } 
  ,     
  /** 创建图片消息  
   *            o     object     
   *                  to                            消息接收方的 userID 或 groupID       
   *                  conversationType              会话类型     
   *                                                TIM.TYPES.CONV_C2C (端到端)或   
   *                                                TIM.TYPES.CONV_GROUP     
   *                  priority                      消息优先级  
   *                                                默认 TIM.TYPES.MSG_PRIORITY_NORMAL      
   *                  payload           object      消息内容容器     
   *                                                file       图片文本   
   *                                                   chooseImage 接口的 success 回调函数  
   *                  onProgerss                    获取上传的进度  
   * 
   */     
  createImageMessage(o){

  }
   ,
  /**   发送消息体     
   *      
   *  可以是文本，语音，图片，文件等       
   *    参数          
   *          o      object        
   *    返回值       
   *          Promise      
   */     
  sendMessage(o){     
  return   wx.$_tim.sendMessage(o);     
  }     
  ,     
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
   *      
   */     
  delConversation(id) {     
    return wx.$_tim.deleteConversation(id);     
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
  /*** 找群      
   *      
   *  通过 群 ID 查找群     
   */     
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
  groupSystemNoticeReceived(o) {     
    console.log(o);     
  },     
  /** 获取我的资料     
   */     
  getMifInfo() {     
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
  /** 黑名单     
   *      
   */     
  getBlacklist() {     
    return wx.$_tim.getBlacelist()     
  },     
  /** 加入黑名单      
   *      
   * 参数说明     
   *            o      userIDList   带加入黑名单的 userID 列表     
   */     
  addBlacklist(o) {     
    return wx.$_tim.addToBlacklist(o);     
  },     
  /** 移除黑名单      
   *      
   *  参数说明:     
   *        o       object     
   */     
  removeBlacklist(o) {     
    return wx.$_tim.removeFromBlacklist(o);     
  },     
  /** 登出      
   * 清理账号信息并退出     
   * 返回值     
   *      Promise     
   */     
  logout() {     
    return wx.$_tim.logout();     
  }     
     
};     
export default imfn;