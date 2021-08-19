// pages/index/recorder/recorder.js
Page({
  data: {
    corderManager: ['获取权限', '开始', '暂停', '继续', '终止'],
    corderManagerNum: 0,
    corderManagerText: '',
    InnerAudioContext: ['能够播放', '开始', '跳到 3.1s', '停止', '销毁'],
    InnerAudioContextNum: 0,
    InnerAudioContextText: '',
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },

  onShow: function () {
    this.setData({
      corderManagerText: this.data.corderManager[this.data.corderManagerNum],
      corderManagerNum: this.data.corderManagerNum + 1,
      InnerAudioContextText: this.data.InnerAudioContext[this.data.InnerAudioContextNum],
      InnerAudioContextNum: this.data.InnerAudioContextNum + 1,
    });
  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  getRecorderManager() {
    const corderManager = wx.getRecorderManager();
    this.setData({
      corderManagerNum: this.data.corderManagerNum > 3 ? 0 : this.data.corderManagerNum + 1,
      corderManagerText: this.data.corderManager[this.data.corderManagerNum]
    });
    switch (this.data.corderManagerNum) {
      case (0):
        break;
      case (1):
        corderManager.start({
          duration: 60000,
          sampleRate: 8000,
          numberOfChannels: 2,
          encodeBitRate: 48000,
          format: "aac",
          frameSize: 2,
          audioSource: 'auto'
        });
        break;
      case (2):
        corderManager.pause()
        break;
      case (3):
        corderManager.resume();
        break;
      default:
        corderManager.stop();
        break;
    }
    corderManager.onStart((res) => {
      console.log(res);
      console.log('录音开始');
    });
    corderManager.onPause((res) => {
      console.log(res);
      console.log('录音暂停');
    });
    corderManager.onResume((res) => {
      console.log(res);
      console.log('录音继续');
    });
    corderManager.onStop((res) => {
      console.log(res);
      console.log('录音结束');
    });
    corderManager.onError((err) => {
      console.log(err);
    });
    corderManager.onFrameRecorded((res) => {
      console.log('res');
      console.log('当录音结束时大小。设置 frameSize 时才会回调该函数');
    });
    corderManager.onInterruptionBegin((res) => {
      console.log(res);
      console.log('当录音因意外暂停时触发事件');
    });
    corderManager.onInterruptionEnd((res) => {
      console.log(res);
      console.log('录音因意外结束后又开始重新录音');
    });
  },
  getAvailableAudioSources() {
    wx.getAvailableAudioSources({
      success: (result) => {
        console.log(result);
        wx.showToast({
          title: '获取音频输入元API',
          duration: 2000,
          icon: "success",
          complete(result) {
            console.log(result);
          },
        })
      },
    })
  },
  createInnerAudioContext() {
    const createInnerAudioContext = wx.createInnerAudioContext();
    createInnerAudioContext.autoplay = true;
    createInnerAudioContext.src = 'https://lmssee.cn:3000/mp/烦恼歌.mp3';
    createInnerAudioContext.startTime = 0;
    createInnerAudioContext.loop = true;
    createInnerAudioContext.obeyMuteSwitch = false;
    createInnerAudioContext.volume = 0.2;
    console.log(createInnerAudioContext.duration);
    console.log(createInnerAudioContext.currentTime);
    console.log(createInnerAudioContext.paused);
    console.log(createInnerAudioContext.buffered);
    switch (this.data.InnerAudioContextNum) {
      case 0:
        createInnerAudioContext.play();
        break;
      case 1:
        createInnerAudioContext.pause();
        break;
      case 2:
        createInnerAudioContext.seek(3.1);
        break;
      case 3:
        createInnerAudioContext.stop();
        break;
      default:
        createInnerAudioContext.destroy();
        break;
    }
    createInnerAudioContext.onCanplay(() => {
      console.log('能够播放');
    });
    createInnerAudioContext.onPlay((res) => {
      console.log('开始播放');
    });
    createInnerAudioContext.onWaiting(() => {
      console.log('正在等待');
    });
    createInnerAudioContext.onTimeUpdate(() => {
      console.log('播放进行中');
    });
    createInnerAudioContext.onPause(() => {
      console.log('暂停');
    });
    createInnerAudioContext.onSeeking(() => {
      console.log('发生跳转');
    });
    createInnerAudioContext.onSeeked(() => {
      console.log('跳转');
    });
    createInnerAudioContext.onStop(() => {
      console.log('停止');
    });
    createInnerAudioContext.onEnded(() => {
      console.log('结束');
    });
    createInnerAudioContext.onError(() => {
      console.log('播放错误');
    });
    this.setData({
      InnerAudioContextNum: this.data.InnerAudioContextNum > 3 ? 0 : this.data.InnerAudioContextNum + 1,
      InnerAudioContextText: this.data.InnerAudioContext[this.data.InnerAudioContextNum]
    });
  },
  backgroundAudioManager() {
    wx.showModal({
      title:'背音提要',
      content: '需要在 app.json 中添加  "requiredBackgroundModes": ["audio"]',
    })
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.title = '烦恼歌';
    backgroundAudioManager.epname = '不烦恼';
    backgroundAudioManager.singer = '学友哥'
    backgroundAudioManager.coverImgUrl = 'https://lmssee.cn/image/lm.png';
    backgroundAudioManager.webUrl = 'https://lmssee.cn/image/lm.png';
    backgroundAudioManager.protocol = 'hls';
    backgroundAudioManager.startime = 20;
    backgroundAudioManager.src = 'https:/lmssee.cn:3000/mp/烦恼歌.mp3';
    console.log(backgroundAudioManager.duration);
    console.log(backgroundAudioManager.currentTime);
    console.log(backgroundAudioManager.paused);
    console.log(backgroundAudioManager.buffered);
    backgroundAudioManager.play();
    // backgroundAudioManager.pause();
    // backgroundAudioManager.seek(3.1);
    // backgroundAudioManager.stop();
    backgroundAudioManager.onCanplay(() => {
      console.log('背景能够播放');
    })
    backgroundAudioManager.onPlay(() => {
      console.log('背景播放');
    })
    backgroundAudioManager.onNext(() => {
      console.log('背景播放下一曲');
    })
    backgroundAudioManager.onWaiting(() => {
      console.log('背景播放等待');
    })
    backgroundAudioManager.onTimeUpdate(() => {
      console.log('背景播放ing');
    })
    backgroundAudioManager.onPause(() => {
      console.log('暂停');
    })
    backgroundAudioManager.onSeeking(() => {
      console.log('背景播放跳转');
    })
    backgroundAudioManager.onSeeked(() => {
      console.log('背景播放跳转了');
    })
    backgroundAudioManager.onStop(() => {
      console.log('背景播放停止');
    })
    backgroundAudioManager.onEnded(() => {
      console.log('背景播放结束');
    })
    backgroundAudioManager.onError(() => {
      console.log('背景播放error');
    })
  }
  // wx.onAudioInterruptionBegin((res) => {})
  // wx.onAudioInterruptionEnd((res) => {})
})