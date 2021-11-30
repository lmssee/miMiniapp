import config from '../../../commons/config.js';
let recorderManager = wx.getRecorderManager();
// 录音部分参数 小程序文档
const recordOptions = {
  duration: 60000, // 录音的时长，单位 ms，最大值 600000（10 分钟）
  sampleRate: 44100, // 采样率
  numberOfChannels: 1, // 录音通道数
  encodeBitRate: 192000, // 编码码率
  format: 'aac' // 音频格式，选择此格式创建的音频消息，可以在即时通信 IM 全平台（Android、iOS、微信小程序和Web）互通
};
Page({
  data: {
    // friendId: '656212200867758080', //朋友账号
    friendId: '', //朋友账号
    friendName: '', //朋友名字
    friendAvatarUrl: '', //朋友头像
    messages: [], // 消息集合
    complete: 0, // 是否还有历史消息可以拉取，1 - 表示没有，0 - 表示有
    content: '', // 输入框的文本值
    lock: false, // 发送消息锁 true - 加锁状态 false - 解锁状态
    scroll_height: wx.getSystemInfoSync().windowHeight - 54,
    reply_height: 0,
    /** 更多 */
    moreShow: true,
    /** 用户信息 */
    userData: [],
    /***  */
    audioPng: "",
    audioGif: "",
    audioState: true,
    /**
     * 历史消息消息集合（结构如下）：
     * nextReqMessageID 用于续拉，分页续拉时需传入该字段。
     * isCompleted 表示是否已经拉完所有消息。
     */
    nextReqMessageID: "", //下一份信息 ID
    isCompleted: "",
    isFirstGetList: true,
    audioContext: null,
    opration: true,
    touchBtn: false,
    recording: false,
    stopflag: false,
    cancelRecord: false,
    refreshTime: '',
    ScrollLoading: 0,
    audioIndex: null,
    sendBtn: true,
  },
  onLoad(o) {
    this.data.friendId = o.friendId || 'tjl1234567';
    this.data.messages = []; // 清空历史消息
    let audioContext = wx.createInnerAudioContext(); // 语音消息
    /** 设置语音消息 */
    this.setData({
      audioContext
    });
    // 将某会话下所有未读消息已读上报
    wx.$_tim.on(wx.$_TIM.EVENT.SDK_READY, () => {
      wx.$_tim.on(wx.$_TIM.EVENT.MESSAGE_RECEIVED, this.MessageReceived);
      wx.$_tim.setMessageRead({
        conversationID: `C2C${this.data.friendId}`
      });
    })
  },
  onShow() {
    // 获取当前聊天的历史列表
    wx.$_tim.on(wx.$_TIM.EVENT.SDK_READY, () => {
      this.getMessageList();
      // 监听录音结束yu 
      recorderManager.onStop((res) => {
        if (this.data.recording) {
          if (this.data.cancelRecord) {
            wx.hideToast()
            this.setData({
              cancelRecord: false
            })
          } else {
            // 创建消息实例，接口返回的实例可以上屏
            const message = wx.$_tim.createAudioMessage({
              to: this.data.friendId,
              conversationType: wx.$_TIM.TYPES.CONV_C2C,
              payload: {
                file: res
              },
              onProgress: (event) => {}
            });
            //  发送消息
            let promise = wx.$_tim.sendMessage(message);
            promise.then((imResponse) => {
              // 发送成功
              this.addMessage(imResponse.data.message, this)
            }).catch((imError) => {
              // 发送失败
              wx.hideToast();
              wx.showToast({
                title: '消息发送失败',
                icon: 'error'
              });
            });
            this.setData({
              recording: false
            })
          }
        } else {
          wx.showToast({
            title: '说话时间太短',
            duration: 1000,
            image: ''
            /** 差一张图片 */
          })
        }
      });
      this.scrollToBottom();
    });
  },
  onHide() {
    /** 清除定时器 */
    wx.$_tim.off(wx.$_TIM.EVENT.MESSAGE_RECEIVED, this.MessageReceived);
  },
  onUnload() {
    /** 清除定时器 */
    clearInterval(this.data.timeOutCum.imReady);
    clearInterval(this.data.timeOutCum.getMessageList);
    wx.$_tim.off(wx.$_TIM.EVENT.MESSAGE_RECEIVED, this.MessageReceived);
  },
  /** 接收到新消息回调 */
  MessageReceived(e) {
    if (e.data[0].from == this.data.friendId) {
      this.addMessage(e.data[0]);
      this.scrollToBottom();
      wx.$_tim.setMessageRead({
        conversationID: `C2C${this.data.friendId}`
      });
    }
  },
  /**  获取消息列表 */
  getMessageList() {
    // 获取 SDK 的 ready 信息
    wx.$_tim.getMessageList({
      conversationID: `C2C${this.data.friendId}`, //会话列表传递过来的参数
      count: 15
    }).then((imResponse) => {
      const messageList = imResponse.data.messageList; // 消息列表。
      this.setData({
        nextReqMessageID: imResponse.data.nextReqMessageID, // 用于续拉，分页续拉时需传入该字段。
        isCompleted: imResponse.data.isCompleted // 表示是否已经拉完所有消息。
      })
      this.handlerHistoryMsgs(messageList);
      this.scrollToBottom();
    });
  },
  /** 获取文本的消息 */
  getContent(e) {
    this.setData({
      content: e.detail.value,
      sendBtn: e.detail.value == "" ?
        true : false
    })
  },
  /**  发送消息  */
  sendMsg(e) {
    if (this.data.content == "") {
      wx.showToast({
        title: '请输入内容',
        duration: 1000,
        icon: 'none'
      });
      return;
    }
    // 2. 发送消息
    wx.$_tim.sendMessage(wx.$_tim.createTextMessage({
      to: this.data.friendId,
      conversationType: wx.$_TIM.TYPES.CONV_C2C,
      payload: {
        text: this.data.content
      }
    })).then((imResponse) => {
      // 发送成功
      this.addMessage(imResponse.data.message)
      this.setData({
        sendBtn: true
      })
    }).catch((imError) => {
      console.log(imError);
      console.log(78);
      // 发送失败
    });
  },
  /**  刷新文本消息 */
  addMessage(msg) {
    var messages = this.data.messages;
    messages.push(msg);
    this.setData({
      messages: messages,
      content: '' // 清空输入框文本
    })
    this.scrollToBottom();
  },
  /** 发送图片消息 */
  sendImg() {
    wx.chooseImage({
      sourceType: ['album'], // 从相册选择
      count: 1, // 只选一张，目前 SDK 不支持一次发送多张图片
      success: (res) => {
        wx.$_tim.sendMessage(wx.$_tim.createImageMessage({
          to: this.data.friendId,
          conversationType: wx.$_TIM.TYPES.CONV_C2C,
          payload: {
            file: res
          },
          onProgress: (e) => {
            console.log('图片', e);
          }
        })).then((imResponse) => {
          // 发送成功
          this.addMessage(imResponse.data.message)
        }).catch((err) => {
          console.log('图片发送失败', err);
        });
      }
    })
  },
  /** 滚动到底部 */
  scrollToBottom() {
    this.setData({
      toView: 'row_' + (this.data.messages.length - 1)
    });
  },
  /** 预览图片 */
  previewImage(e) {
    let current = e.currentTarget.dataset.src;
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls: [current]
    })
  },
  // 录制语音
  startAudio() {
    wx.showToast({
      title: '上滑取消发送',
      duration: 10000,
      image: '../image/cancel.png'
    })
    this.setData({
      touchBtn: true
    })
    if (this.data.stopFlag) {
      return;
    }
    recorderManager.start(recordOptions);
    recorderManager.onError((errMsg) => {});
  },
  // # 利用长按判断录音是否太短
  onLongpress() {
    this.setData({
      recording: true
    })
  },
  // 发送录音
  onTouchEnd() {
    wx.hideToast();
    this.setData({
      touchBtn: false
    });
    if (this.data.stopFlag) {
      return;
    }
    if (this.data.recording) {
      recorderManager.stop();
    } else {
      this.setData({
        stopFlag: true
      });
      setTimeout(() => {
        recorderManager.stop();
        this.setData({
          stopFlag: false
        })
      }, 400);
    }
  },
  // 播放语音
  openAudio(audio) {
    let index = audio.currentTarget.dataset.eventid
    this.setData({
      audioIndex: index
    })
    this.data.audioContext.src = audio.currentTarget.dataset.comkey
    this.data.audioContext.autoplay = true;
    this.data.audioContext.play()
    this.data.audioContext.onPlay((res) => {})
    this.data.audioContext.onEnded(() => {
      wx.hideToast()
      this.setData({
        audioIndex: null
      })
      console.log("语音结束了")
    })
    this.data.audioContext.onError((res) => {})
  },
  // 上滑取消
  onTouchMove(e) {
    if (e.touches[0].clientY < 520) {
      // # 取消发送
      this.setData({
        cancelRecord: true
      });
      wx.showToast({
        title: '松开，取消发送',
        duration: 10000,
        image: ''
        /** 差一张图片 */
      })
    } else {
      // # 不取消
      wx.hideToast();
      wx.showToast({
        title: '上滑取消发送',
        duration: 10000,
        image: '../image/cancel.png'
      })
      this.setData({
        cancelRecord: false
      })
    }
  },
  // 下拉加载聊天记录
  refresh(e) {
    if (this.data.ScrollLoading == 1) { //防止多次触发
      return false
    }
    if (e.detail.scrollTop < 1) {
      this.setData({
        ScrollLoading: 1
      });
      wx.showLoading({
        title: '加载中',
      });
      setTimeout(() => {
        wx.$_tim.getMessageList({
          conversationID: `C2C${this.data.friendId}`,
          nextReqMessageID: this.data.nextReqMessageID,
          count: 15
        }).then((imResponse) => {
          this.setData({
            nextReqMessageID: imResponse.data.nextReqMessageID, // 用于续拉，分页续拉时需传入该字段
            isCompleted: imResponse.data.isCompleted, // 表示是否已经拉完所有消息。
            messages: imResponse.data.messageList.concat(this.data.messages) // 消息列表。
          })
          wx.hideLoading()
          this.setData({
            ScrollLoading: 0
          })
          this.handlerHistoryMsgs(messageList, this);
        });
      }, 800);
    }
  },
  // 切换
  Audio() {
    this.setData({
      opration: false
    })
  },
  keyboard() {
    this.setData({
      opration: true
    })
  },
  /** 更多点击 */
  moreClick() {
    if (this.data.moreShow) {
      this.setData({
        moreShow: false,
        reply_height: 92,
        scroll_height: this.data.scroll_height - 92
      })
    }
  },
  /** 获取焦点 */
  bindfocus() {
    this.setData({
      moreShow: true,
      reply_height: 0,
      scroll_height: wx.getSystemInfoSync().windowHeight - 54
    })
  },
  /**  发送表情消息 */
  sendFaceMsssage(e) {
    wx.sendMessage(wx.$_tim.createFaceMessage({
      /** 聊天对象 */
      to: this.data.friendId,
      /**  会话类型
       *  单聊
       *        TIM.TYPES.CONV_C2C
       *  群聊
       *        TIM.TYPES.CONV_GROUP
       */
      conversationType: wx.$_TIM.TYPE_C2C,
      /** 优先级 
       * 下面是默认级别
       */
      priority: wx.$_TIM.TYPES.MSG_PRIORITY_NORMAL,
      /** 消息体 (object)
       * index     表情索引
       * data      额外数据
       */
      payload: {
        index: 1,
        /** 表情索引 */
        data: 'tt00' /** String 额外数据 */
      }
    }));
  },
  /** 发送自定义消息 */
  sendDIYMessage(e) {
    /** 自定义消息发送 */
    wx.$_tim.sendMessage({
      /** 消息实例 */
      message: '',
      /** 消息发送选择 */
      options: {
        /** 消息指发送给在线的人 */
        onlineUserOnly: '',
        /*** 离线消息，仅在 安卓和 ios 下支持 */
        // offliePashInfo:{
        // }
      }
    });
  },
  /** 消息撤回 */
  revokeMessage(e) {
    wx.$_tim.revokeMessage({}).then(o => {
      wx.showToast({
        title: '消息已撤回',
      })
      console.log('消息撤回成功');
    }).catch(err => {
      wx.showToast({
        title: '消息未撤回',
      })
      console.log('撤回消息失败', err);
    });
  },
  /** 重发消息 */
  resendMessage(e) {
    wx.$_tim.resendMessage({
      /** 消息实例 */
      message: ''
    }).then((o) => {
      console.log(o.data);
    }).catch((err) => {
      console.log('消息重发err', err);
    })
  },
  /** 历史消息处理 */
  handlerHistoryMsgs(message) {
    let messages = this.data.messages || [];
    messages = message.concat(messages);
    this.setData({
      messages
    });
  }
});