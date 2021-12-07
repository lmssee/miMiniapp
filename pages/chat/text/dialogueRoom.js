import fn from "../../../commons/fn";
import config from "../../../commons/config";
import im from "../../../commons/im";
import time from "../../../commons/time";
import imOfDialogueRoom from './imOfDialogueRoom.js';
import heightOfDialogueRoom from './heightOfDialogueRoom.js';

Page({
  data: {
    // friendId: '656212200867758080', //朋友账号
    friendId: '', //朋友账号
    friendName: '', //朋友名字
    friendAvatarUrl: '', //朋友头像
    miAvatarUrl: '', // 我的头像
    messages: [], // 消息集合
    complete: 0, // 是否还有历史消息可以拉取，1 - 表示没有，0 - 表示有
    content: '', // 输入框的文本值
    lock: false, // 发送消息锁 true - 加锁状态 false - 解锁状态
    windowHeight: 0,
    scrollHeight: 0, // 滚动高 
    replyBottom: 22, // 操作栏底部高度
    moreShow: true, // 是否展示拍照、拍摄
    nextReqMessageID: "", //下一份信息 ID
    isCompleted: "", // 是否拉取完毕
    isFirstGetList: true, // 是否是初次拉取
    expressionShow: true, // 表情块
    opration: true,
    touchBtn: false,
    recording: false,
    stopflag: false,
    refreshTime: '', //刷新时间
    ScrollLoading: 0, // 滚动加载
    audioIndex: null,
    sendBtn: true,
    imSDKReady: '',
    isInBottom: true, // 是否在底部
    newMessageButnoInBottom: false, // 新消息但不在底部
    newMessageInBottomShow: 0, // 不在底部新消息条数
    scrollWithAnimation: false, // 滚动动画
    freeCumOfMessage: "" // 免费条数
  },
  onLoad(o) {
    this.data.friendId = o.friendId || 'tjltest';
    // fn.cycle(fn.post, [this.data.friendId], 6).then(o => console.log(o, 'then')).catch(err => console.log(err, 'err')).finally(o => console.log(o, 'finally'));
    this.data.friendName = o.nick || '专属医生';
    this.data.friendAvatarUrl = o.avatarUrl || '/images/icon/doctor.png';
    this.data.imSDKReady = setInterval(() => {
      if (config.imSDKReady == true) {
        this.data.messages = []; // 清空历史消息
        this.getMessageList();
        clearInterval(this.data.imSDKReady);
      }
    }, 100);
  },
  onShow() {
    let windowheight = wx.getSystemInfoSync().windowHeight * 750 / wx.getSystemInfoSync().windowWidth;
    console.log(windowheight);
    this.setData({
      windowheight,
      scrollHeight: windowheight - 275,
      friendName: this.data.friendName,
      friendAvatarUrl: this.data.friendAvatarUrl,
      miAvatarUrl: wx.getStorageSync('userInfo').img || '/images/icon/client.png'
    });
    wx.setNavigationBarTitle({
      title: this.data.friendName || '问诊',
    });
  },
  onUnload() {
    clearInterval(this.data.imSDKReady);
    wx.$_tim.off(wx.$_TIM.EVENT.MESSAGE_RECEIVED, this.MessageReceived);
  },
  /** 接收到新消息回调 */
  MessageReceived(e) {
    if (e.data[0].from == this.data.friendId) {
      this.addMessage(e.data, true);
    }
  },
  /**  获取消息列表 */
  getMessageList() {
    imOfDialogueRoom.getMessageList(this);
  },
  /**  获取文本的消息  */
  getContent() {
    this.setData({
      sendBtn: this.data.content == "" ?
        true : false
    });
  },
  /** 发送消息 */
  sendMsg(e) {
    imOfDialogueRoom.sendMsg(e, this);
  },
  /**  发送图片消息 */
  sendImg() {
    imOfDialogueRoom.sendImg(this);
  },
  /**  发送视频消息 */
  sendVideo() {
    imOfDialogueRoom.sendVedio(this);
  },
  /** 刷新文本消息 */
  addMessage(msg, getNewMessage = false) {
    imOfDialogueRoom.addMessage(msg, getNewMessage, this);
  },
  /*** 滚动到底部并设置已读 */
  scrollToBottomAndRead() {
    imOfDialogueRoom.scrollToBottomAndRead(this);
  },
  /** 滚动到底部 */
  scrollToBottom() {
    imOfDialogueRoom.scrollToBottom(this);
  },
  /** 预览图片或视频 */
  previewMedia(e) {
    let type = e.currentTarget.dataset.type;
    wx.previewMedia({
      current: 0, // 当前显示图片的http链接
      sources: [{
        url: e.currentTarget.dataset.src,
        type
      }],
      showmenu: true
    });
  },
  // 下拉加载聊天记录
  refresh(e) {
    imOfDialogueRoom.refresh(e, this);
  },
  /** 点击更多 */
  moreClick() {
    heightOfDialogueRoom.moreClick(this);
  },
  /** 表情拉取 */
  expressionShowClick() {
    heightOfDialogueRoom.expressionShowClick(this);
  },
  /**  获取焦点 */
  inputOnFocus() {
    heightOfDialogueRoom.inputOnFocus(this);
  },
  /** 输入框回收 */
  _setInputScroll() {
    heightOfDialogueRoom._setInputScroll(this);
  },
  /** 消息处理函数，主要针对于视频时间戳的更正，自定义消息的解析，表情的解析（第二参数为设置时间戳，5 分钟为节点）1 首次拉取 2 发送或新消息 3con */
  alterMessage(messages, n) {
    return imOfDialogueRoom.alterMessage(messages, n, this);
  },
  /** 文字复制 */
  copyTextOfDialogue(e) {
    let messages = e.currentTarget.dataset.data,
      msg = '';
    for (let i = 0, j = messages.length; i < j; i++) {
      if (messages[i].name == 'span')
        msg += messages[i].text
      else
        msg += '🙃'
    }
    wx.setClipboardData({
      data: msg,
    })
  }
});