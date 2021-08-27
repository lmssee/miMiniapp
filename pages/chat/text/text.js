let recorderManager = wx.getRecorderManager();
// 录音部分参数 小程序文档
const recordOptions = {
  login: false,
  duration: 60000, // 录音的时长，单位 ms，最大值 600000（10 分钟）
  sampleRate: 44100, // 采样率
  numberOfChannels: 1, // 录音通道数
  encodeBitRate: 192000, // 编码码率
  format: 'aac' // 音频格式，选择此格式创建的音频消息，可以在即时通信 IM 全平台（Android、iOS、微信小程序和Web）互通
};
Page({
  data: {
    friendId: '', //朋友账号
    friendName: '', //朋友名字
    friendAvatarUrl: '', //朋友头像
    messages: [], // 消息集合
    complete: 0, // 是否还有历史消息可以拉取，1 - 表示没有，0 - 表示有
    content: '', // 输入框的文本值
    lock: false, // 发送消息锁 true - 加锁状态 false - 解锁状态
    scroll_height: wx.getSystemInfoSync().windowHeight - 54,
    reply_height: 0,
    moreShow: true,
    userData: [],
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
    userList: ['user001', 'user002', 'user003', 'user004',
      'user005', 'user006', "user007", 'user008',
      'user009', 'user010'
    ],
    sigList: [
      'eJwtzEELgjAYxvHvsmsh76bTEjoUUiB2UiG6CW7rVYy1mZnRd8-U4-N74P8hWZI6nTAkJMwBsp42luLeosSJn1YYALpctqwLrbEkIfUAuA90682P6DUaMTrnnAHArC02f-NdADdglC8VVGN5sOdcgTrJ9JJdV29J*zw2G4yjR-eqGhwOIijqY3VLov2OfH92bTJ0', '	eJwtzMsOgjAQheF36dqQoVAqJG69gYZEF*qOpIOMoCktKsH47iKwPN*fnA87JgfnhYZFjDvAZsMmhY*Gchr4adEA8ClZVWZak2KR6wOIANzQHwu2mgz2LoTgADBqQ-e-BR6AJ7mc1NK1f*52dVyHSFgZsTpd8lZuTXqex8suqWTmrTdpsX8XtxJNuWDfH3VMMn4_',
      'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwqXFqUUGBsZQqeKU7MSCgswUJStDEwMDUzMDQ0sTiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxIzMwYaYW5kYQo1JTMdaLJXjL6vd2JkgZeTkbZzVZZpRaJLcUBUmHOwf6Rziqm-RWpJUkBonkVejkWRo61SLQCFTDGk', 'eJwtzEELgjAYxvHvsnPIO92cCl0SloQHoyDqZmzWi2ZjmibRd8-U4-N74P8hx-TgdNqSiLgOkNW0Uem6xQInfjXaArDlalSZG4OKRJQBcB9oyOZHvw1aPTrn3AWAWVt8-M33ADzhhsFSwdtYju9yoCZNhc1DTLb7JK7q4XrOZFddxLAJSrl79v2pYBlbk*8PaBMx4g__', 'eJwtzD0PgjAUheH-0tmQC7QgJA4oSxEGxYF0k7SSGyOSC-gR43*3AuN5TvJ*2CkvnYchFjPPAbaaNmrTDnjBicfeEIBYrl5fz12HmsUutxqAG-H5Ma8OyVgXQngAMOuAt78FPoAf*hAtFWxsGdttmpdrSfXzmGWcwiRJd6oepSpkIclT72Y4lFWl9vcN*-4AW9cxmQ__', 'eJwtzFELgjAUhuH-cm4LO9ucpdBtEEgSCQ3pJtnKgzZksxKi-56pl9-zwfuBPD0FL*MgAR4gLMdN2tiObjTy0xuHGM2X1-W1bUlDwkJEGSGLw*kxfUvODC6l5Ig4aUePv0UCUawFZ3OF7kP5stp4XZiiUrZZVJh3xz4tS2Y9lYo3mTqn2c7HfP8Wh3oL3x*fiTIz', 'eJwtzEELgjAYxvHvsnPI6*YUhS4V1CENbJl4UzbzRUzdNILou2fq8fk98P8Qcb5aL6VJQKgFZDNvlOo5YIkzj0ZpAG*9jKzzrkNJAtsB4C7YvrM86t2hVpNzzikALDpg8zeXATCPMbpW8DGVT6ItR7q-t1lzGMLokvS3qtoVWX5MRZbGSSzSXkfGhH69Jd8fdU8ycQ__', 'eJwtzEELgjAYxvHvsnPI6*ZmCR2CooR50Aqrm7gZr5GsabGIvnumHp-fA-8POci999KWRIR6QGbDRqWbDisc*NlqCzCfrlbdCmNQkcgPALgAfxGMj3YGre6dc04BYNQO738TDICFLGBTBa992eSizDHcVbXcZlzGaXFxKpGZSZozdZvy8U5P9bqOj*lqSb4-aIQx7g__', 'eJwtzEELgjAYxvHvsnPo63TWhA7ZpcIiKsjCS7WVr1HJtqQVffdMPT6-B-4fsknWTiUViQh1gPSajULeDZ6x4aeWCoB3lxbXQ1miIJEXALAQPB60j3yVqGTtjDEKAK0avP0t9AH8vs9oV8FLXc7cyXLKczXWJxuDLZKioo883nKTuWaxO6bzNFh5dv8e2dlgSL4-zDIycw__', 'eJw1zEELgjAYxvHvsquhr5tbKHTxMIosBb0IXsItedNiTK0g*u6Z1vH5PfB-kSLJ3bu2JCLUBbKaNyp9G-CMM4*9tuD-r161J2NQkcgPALgAPwyWRz8NWj0555wCwKIDXr8mGABbM8F*FWymsqCyqB3RjWGMj7ryZJdB06aVd7xkjt3mB0jCWJY7mpb7YEPeH6VEMNo_'
    ],
    selectUser: '选择用户',
    selectfriendShow: false,
    selectFriend: '选择朋友',
    friendList: [],
  },
  onLoad: function (options) {
    options = {
      friendId: '000253',
      friendName: "Tom",
      friendAvatarUrl: ""
    };
    this.setData({
      friendId: options.friendId,
      friendName: options.friendName,
      friendAvatarUrl: options.friendAvatarUrl,
      conversationID: options.conversationID
    });
    wx.setNavigationBarTitle({
      title: options.friendName
    });
    var that = this;
    wx.setStorageSync('userData', JSON.stringify({
      id: '123',
      name: 'Jerry',
      avatarUrl: ''
    }));
    var userData = JSON.parse(wx.getStorageSync('userData'));
    that.data.messages = []; // 清空历史消息
    let audioContext = wx.createInnerAudioContext();
    this.setData({
      userData,
      audioContext
    });
    // 将某会话下所有未读消息已读上报
    let promise = wx.$_tim.setMessageRead({
      conversationID: options.conversationID
    });
    promise.then(function (imResponse) {
      // 已读上报成功
    }).catch(function (imError) {
      // 已读上报失败
    });
  },
  onShow: function () {
    let that = this;
    // 获取当前聊天的历史列表
    // that.getMessageList();
    that.scrollToBottom();
    // 获取收到的单聊信息
    let onMessageReceived = function (event) {
      // event.data - 存储 Message 对象的数组 - [Message]
      let msgList = that.data.messages
      handlerHistoryMsgs(event.data, that)
      that.scrollToBottom();
    };
    wx.$_tim.on(wx.$_TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived)
    // 监听录音结束
    recorderManager.onStop(function (res) {
      if (that.data.recording) {
        if (that.data.cancelRecord) {
          wx.hideToast()
          that.setData({
            cancelRecord: false
          })
        } else {
          // 创建消息实例，接口返回的实例可以上屏
          const message = wx.$_tim.createAudioMessage({
            to: that.data.friendId,
            conversationType: TIM.TYPES.CONV_C2C,
            payload: {
              file: res
            },
            onProgress: function (event) {}
          });
          //  发送消息
          let promise = wx.$_tim.sendMessage(message);
          promise.then(function (imResponse) {
            // 发送成功
            that.addMessage(imResponse.data.message, that)
          }).catch(function (imError) {
            // 发送失败
            wx.hideToast();
            wx.showToast({
              title: '消息发送失败',
              icon: 'error'
            });
          });
          that.setData({
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
  },
  onUnload: function () {},
  /**
   * 获取消息列表
   */
  getMessageList() {
    let that = this;
    console.log(wx.$_TIM.EVENT.SDK_READY);
    // 获取 SDK 的 ready 信息
    wx.$_tim.getMessageList({
      conversationID: '', //会话列表传递过来的参数
      count: 15
    }).then(function (imResponse) {
      console.log(wx.$_TIM.EVENT.SDK_READY);
      const messageList = imResponse.data.messageList; // 消息列表。
      const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
      that.setData({
        nextReqMessageID: nextReqMessageID,
        isCompleted: isCompleted
      })
      handlerHistoryMsgs(messageList, that);
      that.scrollToBottom();
    });
  },
  /**
   * 获取文本的消息
   */
  getContent: function (e) {
    if (e.detail.value == "") {
      this.setData({
        sendBtn: true
      })
    } else {
      this.setData({
        sendBtn: false
      })
    }
    var that = this;
    that.setData({
      content: e.detail.value
    })
  },
  /**
   * 发送消息
   */
  sendMsg: function (e) {
    if (this.data.content == "") {
      wx.showToast({
        title: '请输入内容',
        duration: 1000,
        icon: 'none'
      });
      return;
    }
    var that = this;
    console.log(this.data.content);
    // 2. 发送消息
    wx.$_tim.sendMessage(wx.$_tim.createTextMessage({
      to: this.data.friendId,
      conversationType: wx.$_TIM.TYPES.CONV_C2C,
      payload: {
        text: this.data.content
      }
    })).then(function (imResponse) {
      // 发送成功
      console.log(456);
      that.addMessage(imResponse.data.message, that)
      that.setData({
        sendBtn: true
      })
    }).catch(function (imError) {
      console.log(imError);
      console.log(78);
      // 发送失败
    });
  },
  /**
   * 刷新文本消息
   */
  addMessage: function (msg, that) {
    var messages = that.data.messages;
    messages.push(msg);
    that.setData({
      messages: messages,
      content: '' // 清空输入框文本
    })
    that.scrollToBottom();
  },
  /**
   * 发送图片消息
   */
  sendImg() {
    let that = this;
    wx.chooseImage({
      sourceType: ['album'], // 从相册选择
      count: 1, // 只选一张，目前 SDK 不支持一次发送多张图片
      success: function (res) {
        wx.$_tim.sendMessage(wx.$_tim.createImageMessage({
          to: that.data.friendId,
          conversationType: wx.$_TIM.TYPES.CONV_C2C,
          payload: {
            file: res
          },
          onProgress: function (e) {
            console.log('图片', e);
          }
        })).then((imResponse) => {
          // 发送成功
          that.addMessage(imResponse.data.message, that)
        }).catch(function (err) {
          console.log('图片发送失败', err);
        });
      }
    })
  },
  scrollToBottom: function () {
    this.setData({
      toView: 'row_' + (this.data.messages.length - 1)
    });
  },
  /** 预览图片 */
  previewImage(e) {
    let src = '';
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src]
    })
  },
  // 录制语音
  startAudio: function () {
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
    recorderManager.onError(function (errMsg) {});
  },
  // # 利用长按判断录音是否太短
  onLongpress() {
    this.setData({
      recording: true
    })
  },
  // 发送录音
  onTouchEnd: function () {
    wx.hideToast()
    let that = this;
    that.setData({
      touchBtn: false
    })
    if (that.data.stopFlag) {
      return;
    }
    if (that.data.recording) {
      recorderManager.stop();
    } else {
      that.setData({
        stopFlag: true
      })
      setTimeout(() => {
        recorderManager.stop();
        that.setData({
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
      // audioState:false
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
      wx.hideToast()
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
  refresh: function (e) {
    let that = this
    if (that.data.ScrollLoading == 1) { //防止多次触发
      return false
    }
    if (e.detail.scrollTop < 1) {
      that.setData({
        ScrollLoading: 1
      })
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(() => {
        let promise = wx.$_tim.getMessageList({
          conversationID: that.data.conversationID,
          nextReqMessageID: that.data.nextReqMessageID,
          count: 15
        });
        promise.then(function (imResponse) {
          const newMessageList = imResponse.data.messageList; // 消息列表。
          const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
          const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
          that.setData({
            nextReqMessageID: nextReqMessageID,
            isCompleted: isCompleted,
            messages: newMessageList.concat(that.data.messages)
          })
          wx.hideLoading()
          that.setData({
            ScrollLoading: 0
          })
          // handlerHistoryMsgs(messageList, that);
        });
      }, 800);
    }
    setTimeout(function () {
      var date = new Date();
    }, 300);
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
  moreClick() {
    if (this.data.moreShow) {
      this.setData({
        moreShow: false,
        reply_height: 92,
        scroll_height: this.data.scroll_height - 92
      })
    }
  },
  bindfocus() {
    this.setData({
      moreShow: true,
      reply_height: 0,
      scroll_height: wx.getSystemInfoSync().windowHeight - 54
    })
  },
  changeUser(e) {
    let v = e.detail.value;
    this.data.friendList = JSON.parse(JSON.stringify(this.data.userList));
    this.data.friendList.splice(v, 1);
    this.setData({
      friendList: this.data.friendList,
      selectfriendShow: true,
      selectUser: this.data.userList[v],
    });
    wx.setNavigationBarTitle({
      title: this.data.userList[v],
    });
    wx.$_tim.login({
      userID: this.data.userList[v],
      userSig: this.data.sigList[v]
    }).then((o) => {

      if (o.data.repeatLogin === true) {
        console.log(o.data.errInfo);
      }
      // this.getMessageList();
    }).catch((imerr) => {
      console.log('login errror', imerr);
    });
    return;
  },
  changefriend(e) {
    let a = e.detail.value;
    console.log(this.data.friendList[a]);
    this.data.selectFriend = this.data.friendList[a]
    this.setData({
      friendId: this.data.friendList[a]
    });
    wx.setNavigationBarTitle({
      title: `${this.data.selectUser}->${this.data.selectFriend}`,
    })
    this.setData({
      login: true
    })
  },
  sendFaceMsssage(e) {
    wx.sendMessage(wx.$_tim.createFaceMessage({
      /** 聊天对象 */
      to: friendId,
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
    wx.$_tim.revokeMessage({

    }).then(o => {
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
  resendMessage(e) {
    wx.$_tim.resendMessage({
      /** 消息实例 */
      message: ''
    }).then((o) => {
      console.log(o.data);
    }).catch((err) => {
      console.log('消息重发err', err);
    })
  }


})
/** 
 * tim.logout(); 
 *    登出即时通信 
 * */