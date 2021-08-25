// import TIM from 'tim-wx-sdk';
// import COS from "cos-wx-sdk-v5";
// /** 配置文件 */
// import config from '../../commons/config.js';
// // 发送图片、文件等消息需要腾讯云即时通信IM上传插件
// import TIMUploadPlugin from 'tim-upload-plugin';
// let options = {
//   /* 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID */
//   SDKAppID: config.SDKAppID
// };
// /* 创建 SDK 实例，`TIM.create()` 方法对于同一个 `SDKAppID` 只会返回同一份实例 */
// let tim = TIM.create(options); // SDK 实例通常用 tim 表示
// // 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
// tim.setLogLevel(3);
//  // 普通级别，日志量较多，接入时建议使用
// // tim.setLogLevel(1); 
// // release 级别，SDK 输出关键信息，生产环境时建议使用 0
// // 注册 COS SDK 插件
// tim.registerPlugin({
//   'cos-wx-sdk': COS
// });
// // 注册腾讯云即时通信 IM 上传插件
// tim.registerPlugin({
//   'tim-upload-plugin': TIMUploadPlugin
// });
// // 监听事件，例如：
// tim.on(TIM.EVENT.SDK_READY, function (event) {
//   // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
//   // event.name - TIM.EVENT.SDK_READY
// });
// tim.on(TIM.EVENT.MESSAGE_RECEIVED, function (event) {
//   // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
//   // event.name - TIM.EVENT.MESSAGE_RECEIVED
//   // event.data - 存储 Message 对象的数组 - [Message]
// });
// tim.on(TIM.EVENT.MESSAGE_REVOKED, function (event) {
//   // 收到消息被撤回的通知
//   // event.name - TIM.EVENT.MESSAGE_REVOKED
//   // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
// });
// tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, function (event) {
//   // SDK 收到对端已读消息的通知，即已读回执。使用前需要将 SDK 版本升级至 v2.7.0 或以上。仅支持单聊会话。
//   // event.name - TIM.EVENT.MESSAGE_READ_BY_PEER
//   // event.data - event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isPeerRead 属性值为 true
// });
// tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function (event) {
//   // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
//   // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
//   // event.data - 存储 Conversation 对象的数组 - [Conversation]
// });
// tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function (event) {
//   // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
//   // event.name - TIM.EVENT.GROUP_LIST_UPDATED
//   // event.data - 存储 Group 对象的数组 - [Group]
// });
// tim.on(TIM.EVENT.PROFILE_UPDATED, function (event) {
//   // 收到自己或好友的资料变更通知
//   // event.name - TIM.EVENT.PROFILE_UPDATED
//   // event.data - 存储 Profile 对象的数组 - [Profile]
// });
// tim.on(TIM.EVENT.BLACKLIST_UPDATED, function (event) {
//   // 收到黑名单列表更新通知
//   // event.name - TIM.EVENT.BLACKLIST_UPDATED
//   // event.data - 存储 userID 的数组 - [userID]
// });
// tim.on(TIM.EVENT.ERROR, function (event) {
//   // 收到 SDK 发生错误通知，可以获取错误码和错误信息
//   // event.name - TIM.EVENT.ERROR
//   // event.data.code - 错误码
//   // event.data.message - 错误信息
// });
// tim.on(TIM.EVENT.SDK_NOT_READY, function (event) {
//   console.log(2235);
//   // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
//   // event.name - TIM.EVENT.SDK_NOT_READY
// });
// tim.on(TIM.EVENT.KICKED_OUT, function (event) {
//   // 收到被踢下线通知
//   // event.name - TIM.EVENT.KICKED_OUT
//   // event.data.type - 被踢下线的原因，例如:
//   //    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
//   //    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
//   //    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢 （v2.4.0起支持）。 
// });
// tim.on(TIM.EVENT.NET_STATE_CHANGE, function (event) {
//   //  网络状态发生改变（v2.5.0 起支持）。 
//   // event.name - TIM.EVENT.NET_STATE_CHANGE 
//   // event.data.state 当前网络状态，枚举值及说明如下： 
//   //     \- TIM.TYPES.NET_STATE_CONNECTED - 已接入网络 
//   //     \- TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中” 
//   //    \- TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息  
// });
// // 开始登录 
// tim.login({
//   userID: '0001',
//   userSig: '0001'
// });
// const app = getApp();
// let recorderManager = wx.getRecorderManager();
// // 录音部分参数 小程序文档
// const recordOptions = {
//   duration: 60000, // 录音的时长，单位 ms，最大值 600000（10 分钟）
//   sampleRate: 44100, // 采样率
//   numberOfChannels: 1, // 录音通道数
//   encodeBitRate: 192000, // 编码码率
//   format: 'aac' // 音频格式，选择此格式创建的音频消息，可以在即时通信 IM 全平台（Android、iOS、微信小程序和Web）互通
// };
// Page({
//   data: {
//     friendId: '', //朋友账号
//     friendName: '', //朋友名字
//     friendAvatarUrl: '', //朋友头像
//     messages: [], // 消息集合
//     complete: 0, // 是否还有历史消息可以拉取，1 - 表示没有，0 - 表示有
//     content: '', // 输入框的文本值
//     lock: false, // 发送消息锁 true - 加锁状态 false - 解锁状态
//     scroll_height: wx.getSystemInfoSync().windowHeight - 54,
//     reply_height: 0,
//     moreShow: true,
//     userData: [],
//     audioPng: "",
//     audioGif: "",
//     audioState: true,
//     /**
//      * 历史消息消息集合（结构如下）：
//      * nextReqMessageID 用于续拉，分页续拉时需传入该字段。
//      * isCompleted 表示是否已经拉完所有消息。
//      */
//     nextReqMessageID: "", //下一份信息 ID
//     isCompleted: "",
//     isFirstGetList: true,
//     audioContext: null,
//     opration: true,
//     touchBtn: false,
//     recording: false,
//     stopflag: false,
//     cancelRecord: false,
//     refreshTime: '',
//     ScrollLoading: 0,
//     audioIndex: null,
//     sendBtn: true
//   },
//   onLoad: function (options) {
//     options = {
//       friendId: '000253',
//       friendName: "Tom",
//       friendAvatarUrl: ""
//     };

//     this.setData({
//       friendId: options.friendId,
//       friendName: options.friendName,
//       friendAvatarUrl: options.friendAvatarUrl,
//       conversationID: options.conversationID
//     });
//     console.log(options);
//     wx.setNavigationBarTitle({
//       title: options.friendName
//     });
//     var that = this;

//     wx.setStorageSync('userData', JSON.stringify({
//       id: '123',
//       name: 'Jerry',
//       avatarUrl: ''
//     }));
//     var userData = JSON.parse(wx.getStorageSync('userData'));
//     that.data.messages = []; // 清空历史消息
//     let audioContext = wx.createInnerAudioContext();
//     this.setData({
//       userData,
//       audioContext
//     });
//     // 将某会话下所有未读消息已读上报
//     let promise = tim.setMessageRead({
//       conversationID: options.conversationID
//     });
//     promise.then(function (imResponse) {
//       // 已读上报成功
//     }).catch(function (imError) {
//       // 已读上报失败
//     });
//   },
//   onShow: function () {
//     let that = this;
//     // 获取当前聊天的历史列表
//     that.getMessageList();
//     that.scrollToBottom();
//     // 获取收到的单聊信息
//     let onMessageReceived = function (event) {
//       // event.data - 存储 Message 对象的数组 - [Message]
//       let msgList = that.data.messages
//       handlerHistoryMsgs(event.data, that)
//       that.scrollToBottom();
//     };
//     tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived)
//     // 监听录音结束
//     recorderManager.onStop(function (res) {
//       if (that.data.recording) {
//         if (that.data.cancelRecord) {
//           wx.hideToast()
//           that.setData({
//             cancelRecord: false
//           })
//         } else {
//           // 创建消息实例，接口返回的实例可以上屏
//           const message = tim.createAudioMessage({
//             to: that.data.friendId,
//             conversationType: TIM.TYPES.CONV_C2C,
//             payload: {
//               file: res
//             },
//             onProgress: function (event) {}
//           });
//           //  发送消息
//           let promise = tim.sendMessage(message);
//           promise.then(function (imResponse) {
//             // 发送成功
//             that.addMessage(imResponse.data.message, that)
//           }).catch(function (imError) {
//             // 发送失败
//           });
//           that.setData({
//             recording: false
//           })
//         }
//       } else {
//         wx.showToast({
//           title: '说话时间太短',
//           duration: 1000,
//           image: '../image/err.png'
//         })
//       }
//     });
//   },
//   onUnload: function () {},
//   /**
//    * 获取消息列表
//    */
//   getMessageList() {
//     let that = this;
//     let cb = tim.getMessageList({
//       conversationID: '', //会话列表传递过来的参数
//       count: 15
//     })
//     cb.then(function (imResponse) {
//       const messageList = imResponse.data.messageList; // 消息列表。
//       const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
//       const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
//       that.setData({
//         nextReqMessageID: nextReqMessageID,
//         isCompleted: isCompleted
//       })
//       handlerHistoryMsgs(messageList, that);
//       that.scrollToBottom();
//     });
//   },
//   /**
//    * 获取文本的消息
//    */
//   getContent: function (e) {
//     if (e.detail.value == "") {
//       this.setData({
//         sendBtn: true
//       })
//     } else {
//       this.setData({
//         sendBtn: false
//       })
//     }
//     console.log(e)
//     var that = this;
//     that.setData({
//       content: e.detail.value
//     })
//   },
//   /**
//    * 发送消息
//    */
//   sendMsg: function (e) {
//     if (this.data.content == "") {
//       wx.showToast({
//         title: '请输入内容',
//         duration: 1000,
//         icon: 'none'
//       })
//       return
//     }
//     var that = this
//     // 发送文本消息，Web 端与小程序端相同
//     // 1. 创建消息实例，接口返回的实例可以上屏
//     let message = tim.createTextMessage({
//       to: this.data.friendId,
//       conversationType: TIM.TYPES.CONV_C2C,
//       payload: {
//         text: this.data.content
//       }
//     });
//     // 2. 发送消息
//     let promise = tim.sendMessage(message);
//     promise.then(function (imResponse) {
//       // 发送成功
//       that.addMessage(imResponse.data.message, that)
//       that.setData({
//         sendBtn: true
//       })
//     }).catch(function (imError) {
//       // 发送失败
//     });
//   },
//   /**
//    * 刷新文本消息
//    */
//   addMessage: function (msg, that) {
//     var messages = that.data.messages;
//     messages.push(msg);
//     that.setData({
//       messages: messages,
//       content: '' // 清空输入框文本
//     })
//     that.scrollToBottom();
//   },
//   /**
//    * 发送图片消息
//    */
//   sendImg() {
//     let that = this;
//     wx.chooseImage({
//       sourceType: ['album'], // 从相册选择
//       count: 1, // 只选一张，目前 SDK 不支持一次发送多张图片
//       success: function (res) {
//         // 2. 创建消息实例，接口返回的实例可以上屏
//         let message = tim.createImageMessage({
//           to: that.data.friendId,
//           conversationType: TIM.TYPES.CONV_C2C,
//           payload: {
//             file: res
//           },
//           onProgress: function (event) {}
//         });
//         // 3. 发送图片
//         let promise = tim.sendMessage(message);
//         promise.then(function (imResponse) {
//           // 发送成功
//           that.addMessage(imResponse.data.message, that)
//         }).catch(function (imError) {
//           // 发送失败
//         });
//       }
//     })
//   },
//   scrollToBottom: function () {
//     this.setData({
//       toView: 'row_' + (this.data.messages.length - 1)
//     });
//   },
//   previewImage(e) {
//     let src = '';
//     wx.previewImage({
//       current: e.currentTarget.dataset.src, // 当前显示图片的http链接
//       urls: [e.currentTarget.dataset.src]
//     })
//   },
//   // 录制语音
//   startAudio: function () {
//     wx.showToast({
//       title: '上滑取消发送',
//       duration: 10000,
//       image: '../image/cancel.png'
//     })
//     this.setData({
//       touchBtn: true
//     })
//     if (this.data.stopFlag) {
//       return;
//     }
//     recorderManager.start(recordOptions);
//     recorderManager.onError(function (errMsg) {});
//   },
//   // # 利用长按判断录音是否太短
//   onLongpress() {
//     this.setData({
//       recording: true
//     })
//   },
//   // 发送录音
//   onTouchEnd: function () {
//     wx.hideToast()
//     let that = this;
//     that.setData({
//       touchBtn: false
//     })
//     if (that.data.stopFlag) {
//       return;
//     }
//     if (that.data.recording) {
//       recorderManager.stop();
//     } else {
//       that.setData({
//         stopFlag: true
//       })
//       setTimeout(() => {
//         recorderManager.stop();
//         that.setData({
//           stopFlag: false
//         })
//       }, 400);
//     }
//   },
//   // 播放语音
//   openAudio(audio) {
//     console.log(audio)
//     let index = audio.currentTarget.dataset.eventid
//     this.setData({
//       audioIndex: index
//       // audioState:false
//     })
//     this.data.audioContext.src = audio.currentTarget.dataset.comkey
//     this.data.audioContext.autoplay = true;
//     this.data.audioContext.play()
//     this.data.audioContext.onPlay((res) => {})
//     this.data.audioContext.onEnded(() => {
//       wx.hideToast()
//       this.setData({
//         audioIndex: null
//       })
//       console.log("语音结束了")
//     })
//     this.data.audioContext.onError((res) => {})
//   },
//   // 上滑取消
//   onTouchMove(e) {
//     if (e.touches[0].clientY < 520) {
//       // # 取消发送
//       this.setData({
//         cancelRecord: true
//       });
//       wx.showToast({
//         title: '松开，取消发送',
//         duration: 10000,
//         image: '../image/cancel.png'
//       })
//     } else {
//       // # 不取消
//       wx.hideToast()
//       wx.showToast({
//         title: '上滑取消发送',
//         duration: 10000,
//         image: '../image/cancel.png'
//       })
//       this.setData({
//         cancelRecord: false
//       })
//     }
//   },
//   // 下拉加载聊天记录
//   refresh: function (e) {
//     let that = this
//     if (that.data.ScrollLoading == 1) { //防止多次触发
//       return false
//     }
//     if (e.detail.scrollTop < 1) {
//       that.setData({
//         ScrollLoading: 1
//       })
//       wx.showLoading({
//         title: '加载中',
//       })
//       setTimeout(() => {
//         let promise = tim.getMessageList({
//           conversationID: that.data.conversationID,
//           nextReqMessageID: that.data.nextReqMessageID,
//           count: 15
//         });
//         promise.then(function (imResponse) {
//           const newMessageList = imResponse.data.messageList; // 消息列表。
//           const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
//           const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
//           that.setData({
//             nextReqMessageID: nextReqMessageID,
//             isCompleted: isCompleted,
//             messages: newMessageList.concat(that.data.messages)
//           })
//           wx.hideLoading()
//           that.setData({
//             ScrollLoading: 0
//           })
//           // handlerHistoryMsgs(messageList, that);
//         });
//       }, 800);
//     }
//     // setTimeout(function(){
//     //   var date = new Date();
//     // },300);
//   },
//   // 切换
//   Audio() {
//     this.setData({
//       opration: false
//     })
//   },
//   keyboard() {
//     this.setData({
//       opration: true
//     })
//   },
//   moreClick() {
//     if (this.data.moreShow) {
//       this.setData({
//         moreShow: false,
//         reply_height: 92,
//         scroll_height: this.data.scroll_height - 92
//       })
//     }
//   },
//   bindfocus() {
//     this.setData({
//       moreShow: true,
//       reply_height: 0,
//       scroll_height: wx.getSystemInfoSync().windowHeight - 54
//     })
//   }
// })
// /**
//  * 处理历史消息 
//  */
// function handlerHistoryMsgs(result, that) {
//   var historyMsgs = that.data.messages;
//   result.forEach(item => {
//     historyMsgs.push(item)
//   })
//   // historyMsgs.push(result[0])
//   that.setData({
//     messages: historyMsgs,
//   })
//   // 将某会话下所有未读消息已读上报
//   let promise = tim.setMessageRead({
//     conversationID: that.data.conversationID
//   });
//   promise.then(function (imResponse) {
//     // 已读上报成功
//   }).catch(function (imError) {
//     // 已读上报失败
//   });
// }