import TRTC from 'trtc-wx-sdk';
import config from './config';
const trtc = {
  ini() {
    // this.onLoad();  
  },
  onLoad() {
    wx.$_trtc = new TRTC();
    this.setData({
      // rtcConfig 是初始化参数，返回初始化后的推流状态，需要与模板相结合，
      //可参照 pusherAttributes[https://cloud.tencent.com/document/product/647/17018#pusherAttributes]说明设置
      pusher: this.TRTC.createPusher(rtcConfig).pusherAttributes
    })
    // 这里需要绑定一系列的事件监听方法，下文会详细介绍
    // 收到视频流新增的通知
    wx.$_trtc.on(EVENT.REMOTE_VIDEO_ADD, (event) => {
      const {
        player
      } = event.data
      // 开始播放远端的视频流，默认是不播放的
      let playerList = this.TRTC.setPlayerAttributes(player.id, {
        'muteVideo': false
      })
      this.setData({
        playerList: playerList,
      })
    });

  },
  _pusherStateChangeHandler(event) {
    this.TRTC.pusherEventHandler(event)
  },
  _pusherNetStatusHandler(event) {
    this.TRTC.pusherNetStatusHandler(event)
  },
  _pusherErrorHandler(event) {
    this.TRTC.pusherErrorHandler(event)
  },
  _pusherBGMStartHandler(event) {
    this.TRTC.pusherBGMStartHandler(event)
  },
  _pusherBGMProgressHandler(event) {
    this.TRTC.pusherBGMProgressHandler(event)
  },
  _pusherBGMCompleteHandler(event) {
    this.TRTC.pusherBGMCompleteHandler(event)
  },
  _pusherAudioVolumeNotify(event) {
    this.TRTC.pusherAudioVolumeNotify(event)
  },

  _playerStateChange(event) {
    this.TRTC.playerEventHandler(event)
  },
  _playerFullscreenChange(event) {
    this.TRTC.playerFullscreenChange(event)
  },
  _playerNetStatus(event) {
    this.TRTC.playerNetStatus(event)
  },
  _playerAudioVolumeNotify(event) {
    this.TRTC.playerAudioVolumeNotify(event)
  },
  /** 进入视频并开始推流 */
  enterRoom(options) {
    wx.$_trtc.enterRoom({
      sdkAppID: config.SDKAppID,
      userID: '660156896044384257', //当前进房用户的userID
      userSig: config.userSig, // 您服务端生成的userSig
      roomID: 1234, // 您进房的房间号，
      enableMic: true, // 进房默认开启音频上行
      enableCamera: true, // 进房默认开启视频上行
    });
    wx.$_trtc.getPusherInstance().start() // 开始进行推流
  },
  /*** 退出房间 */
  exitRoom() {
    wx.$_trtc.exitRoom();
    // this.setData({
    //   pusher: result.pusher,
    //   playerList: result.playerList,
    // });
  },
};
export default trtc;