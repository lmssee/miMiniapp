import fn from './commons/fn.js';
/** 自定义配置文件 */
import config from './commons/config.js';    
import TIM from 'tim-wx-sdk';
import COS from "cos-wx-sdk-v5";
/* 发送图片、文件等消息需要腾讯云即时通信IM上传插件 */
import TIMUploadPlugin from 'tim-upload-plugin';
/**
 * 处理历史消息 
 */
function handlerHistoryMsgs(result, that) {
  var historyMsgs = that.data.messages;
  result.forEach(item => {
    historyMsgs.push(item)
  })
  // historyMsgs.push(result[0])
  that.setData({
    messages: historyMsgs,
  })
  // 将某会话下所有未读消息已读上报
  let promise = tim.setMessageRead({
    conversationID: that.data.conversationID
  });
  promise.then(function (imResponse) {
    // 已读上报成功
  }).catch(function (imError) {
    // 已读上报失败
  });
}
let options = {
  /*   SDKAppID  */
  SDKAppID: config.SDKAppID
};
let tim = TIM.create(options);
tim.setLogLevel(4); // 日志 级别
tim.registerPlugin({
  'cos-wx-sdk': COS /** 解析 */
});
// 注册腾讯云即时通信 IM 上传插件
tim.registerPlugin({
  'tim-upload-plugin': TIMUploadPlugin
});

// 开始登录 
tim.login({
  userID: wx.getStorageSync('userSelfID'),
  userSig: wx.getStorageSync('userSig')
}).then((m) => {
  console.log('登录信息');
  console.log(m);
  // 监听事件，例如：
  tim.on(TIM.EVENT.SDK_READY, function (e) {
    // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
    // event.name - TIM.EVENT.SDK_READY
    console.log('收到离线消息和会话列表同步完毕通知');
    console.log(e);
    console.log('');
  });
  tim.on(TIM.EVENT.MESSAGE_RECEIVED, function (e) {
    // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
    // event.name - TIM.EVENT.MESSAGE_RECEIVED
    // event.data - 存储 Message 对象的数组 - [Message]
    console.log('收到推送的单聊、群聊、群提示、群系统通知的新消息');
    console.log(e);
    console.log('');
  });
  tim.on(TIM.EVENT.MESSAGE_REVOKED, function (e) {
    // 收到消息被撤回的通知
    // event.name - TIM.EVENT.MESSAGE_REVOKED
    // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
    console.log('收到消息被撤回的通知');
    console.log(e);
    console.log('');
  });
  tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, function (e) {
    // SDK 收到对端已读消息的通知，即已读回执。使用前需要将 SDK 版本升级至 v2.7.0 或以上。仅支持单聊会话。
    // event.name - TIM.EVENT.MESSAGE_READ_BY_PEER
    // event.data - event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isPeerRead 属性值为 true
    console.log('收到对端已读消息的通知，即已读回执。');
    console.log(e);
    console.log('');
  });
  tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function (e) {
    // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
    // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
    // event.data - 存储 Conversation 对象的数组 - [Conversation]
    console.log('收到会话列表更新通知');
    console.log(e);
    console.log('');
  });
  tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function (e) {
    // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
    // event.name - TIM.EVENT.GROUP_LIST_UPDATED
    // event.data - 存储 Group 对象的数组 - [Group]
    console.log(' 收到群组列表更新通知');
    console.log(e);
    console.log('');
  });
  tim.on(TIM.EVENT.PROFILE_UPDATED, function (e) {
    // 收到自己或好友的资料变更通知
    // event.name - TIM.EVENT.PROFILE_UPDATED
    // event.data - 存储 Profile 对象的数组 - [Profile]
    console.log('收到自己或好友的资料变更通知');
    console.log(e);
    console.log('');
  });
  tim.on(TIM.EVENT.BLACKLIST_UPDATED, function (e) {
    // 收到黑名单列表更新通知
    // event.name - TIM.EVENT.BLACKLIST_UPDATED
    // event.data - 存储 userID 的数组 - [userID]
    console.log('收到黑名单列表更新通知');
    console.log(e);
    console.log('');
  });
  tim.on(TIM.EVENT.ERROR, function (e) {
    // 收到 SDK 发生错误通知，可以获取错误码和错误信息
    // event.name - TIM.EVENT.ERROR
    // event.data.code - 错误码
    // event.data.message - 错误信息
    console.log(' 收到 SDK 发生错误通知');
    console.log(e);
    console.log('');
  });
  tim.on(TIM.EVENT.SDK_NOT_READY, function (e) {
    // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
    // event.name - TIM.EVENT.SDK_NOT_READY
    console.log(' 收到 SDK 进入 not ready 状态通知');
    console.log(e);
    console.log('');
  });
  tim.on(TIM.EVENT.KICKED_OUT, function (e) {
    // 收到被踢下线通知
    // event.name - TIM.EVENT.KICKED_OUT
    // event.data.type - 被踢下线的原因，例如:
    //    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
    //    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
    //    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢 （v2.4.0起支持）
    console.log('收到被踢下线通知');
    console.log(e);
    console.log('');
    wx.showToast({
      title: '已退出其它端登录',
      duration:1200,
      icon:'error'
    })
  });
  tim.on(TIM.EVENT.NET_STATE_CHANGE, function (e) {
    //  网络状态发生改变（v2.5.0 起支持）。 
    // event.name - TIM.EVENT.NET_STATE_CHANGE 
    // event.data.state 当前网络状态，枚举值及说明如下： 
    //     \- TIM.TYPES.NET_STATE_CONNECTED - 已接入网络 
    //     \- TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中” 
    //    \- TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息  
    console.log('网络状态发生改变');
    console.log(e);
    console.log('');
  });
  /**
  *    tim.logout(); 退出登录或切换账号时需要停止监听
   * 
   */
}).catch((e) => {
  console.log('error:', e);
  console.log('');
});
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
     wx.setStorageSync('userSig', 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwoYGBoYwieKU7MSCgswUJStDEwMDUzMDQ0sTiExJZm4qUNTMyNLSzMDc0BwimlpRkFkEFDc2MwABqCGZ6UBjC5LTDNwTSx0rEvPNiqvMTMyjCn30y-1KPAvdQ40y833yPb3NwwwiylzNkm2VagFu2TAq');
     
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