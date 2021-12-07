import config from './config.js';
import TIM from 'tim-wx-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
import trtc from './trtc';

const imfn = {
  ini() {
    /** 重建实例 */
    const tim = TIM.create({
      SDKAppID: config.SDKAppID
    });
    tim.setLogLevel(4);
    /** 赋值给 wx ,创建 全局二级对象 */
    wx.$_tim = tim;
    /** 赋值给 wx ,创建全局 二级 对象 */
    wx.$_TIM = TIM;
    /** 注册腾讯云即时通信 IM 上传插件,即时通信 IM SDK 发送图片、语音。视频、文件、等消息时需要上传插件，将文件长传到腾讯云对象储存 */
    wx.$_tim.registerPlugin({
      'tim-upload-plugin': TIMUploadPlugin
    });
    this.registerEvents();
    this.login();
  },
  login() {
    // const userID = 'tjl1234567'
    const userID = '660156896044384257';
    const userSig = 'eJwtzUELgkAQBeD-sueQmXVn1xG6GB0EE7KI9Ca4xhKFqIUW-ffMPM73Hm-e4pgcvKdtRSikB2I1366y997VbmatAUkHrEEpP1CSzNLqqmvZNK4SISoAMkgI-8QOjWvt5EQkARbt3e1n2g98aRjMsuIu0xPejVhgdupiybwd0yJSrKNzmm0eSdnno40xefE*p6Fbi88XgJsyTg__';
    // fn.getUserSig(userID).then(o => {
    //   console.log(o.data.userSig);
    //   wx.$_tim.login({
    //     userID,
    //     userSig: o.data.userSig
    //   }).then((o) => {
    //     this.registerEvents(wx.$_tim);
    //   }).catch((imerr) => {
    //     console.log('im login errror', imerr);
    //   });
    // });
    wx.$_tim.login({
      userID,
      userSig
    }).then(() => {
      config.userSig = userSig;
    }).catch(() => {});
  },
  /** 事件监听 */
  registerEvents() {
    /** 监听登陆状态 */
    wx.$_tim.on(wx.$_TIM.EVENT.SDK_READY, () => {
      config.imSDKReady = true;
      trtc.ini();
    });
    /** 监听未登录状态,此时 SDK 无法再正常工作 */
    wx.$_tim.on(wx.$_TIM.EVENT.SDK_NOT_READY, () => config.imSDKReady = false);
    /** 多端登录，被挤出 */
    wx.$_tim.on(wx.$_TIM.EVENT.KICKED_OUT, this.KickOut);
    /** 出现错误监听 */
    wx.$_tim.on(wx.$_TIM.EVENT.ERROR, this.Error);
    /*** 聊天列表更新 */
    wx.$_tim.on(wx.$_TIM.EVENT.CONVERSATION_LIST_UPDATED, this.ConvListUpdate);
    /** 接收消息的单聊、群聊、群提示、群系统通知的新消息，可遍历 event.data 获取消息列表并更新的 消息 */
    wx.$_tim.on(wx.$_TIM.EVENT.MESSAGE_RECEIVED, this.MessageReceived);
    /** 网络状态更改 */
    wx.$_tim.on(wx.$_TIM.EVENT.NET_STATE_CHANGE, this.NetStateChange);
    /** 消息已读 */
    wx.$_tim.on(wx.$_TIM.EVENT.MESSAGE_READ_BY_PEER, this.MessageReadByPeer);
    /*** 收到消息被第三方回调修改的通知，消息发送方可通过遍历 event.data 获取消息列表数据并更新页面上同 ID 消息的内容 */
    wx.$_tim.on(wx.$_TIM.EVENT.MESSAGE_MODIFIED, this.MessageModified);
  },
  /** 多端登录，被挤掉线 */
  KickOut() {
    wx.showToast({
      title: '你已被踢下线',
      icon: 'none',
      duration: 500
    });
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/message/dialogueRoom/dialogueRoom',
      });
    }, 500);
  },
  /** 接到消息 
   * 由 tim.on(TIM.EVENT.MESSAGE_RECEVED,callbackfn) 监听
   * 
   *  e (object)
   *  name 事件类型  onMessageReceived
   *  data 具体数据列表
   *          数组（元素为 object 格式）
   */
  MessageReceived(o) {
    wx.vibrateShort({
      type: 'heavy',
    });
    console.log(o);
  },
  /** 错误回调 */
  Error(event) {
    // 网络错误不弹toast && sdk未初始化完全报错
    if (event.data.message && event.data.code && event.data.code !== 2800 && event.data.code !== 2999) {
      console.log(event.message.message);
    }
  },
  /** 网络变化  */
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
  /** 列表更新 */
  ConvListUpdate(event) {
    console.log(event);
  },
  /*** 收到消息被第三方回调修改的通知，消息发送方可通过遍历 event.data 获取消息列表数据并更新页面上同 ID 消息的内容 */
  MessageModified(o) {
    console.log(o);
    return o;
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
  /** 消息已读，不调用该接口，消息将一直处于未读状态 */
  messageRead(to, group = false) {
    return wx.$_tim.setMessageRead({
      conversationID: group == false ? `C2C${to}` : `GROUP${to}`
    });
  },
  /** 获取会话列表
   *     <important> 该列表获取到资料不完整。但是能够满足列表的渲染需求（仅包括头像、昵称等）
   *   返回 Promise 
   *     默认会话保存时常跟会话最后一条保存时间一致，默认 7 天
   */
  getConverSationList(list) {
    return wx.$_tim.getConversationList(list);
  },
  /** 详细会话信息    */
  getConversationInfo(id) {
    return wx.$_tim.getConversationProfile(id);
  },

  /**主动获取好友的分组列表 */
  /*** 其他关于好友的 API  https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#getConversationList */
  /** 发送消息，传入第三参数时为群聊消息*/
  sendMessage(to, text, group = false) {
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