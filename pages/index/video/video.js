// pages/index/video/video.js
Page({
  data: {
    titleList: ['获取', '暂停', '播放', '跳转到', '加速', '全屏'],
    titleNum: 0,
    title: ''
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    this.setData({
      title: this.data.titleList[0]
    })
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
  saveVideoToPhotosAlbum() {
    wx.saveVideoToPhotosAlbum({
      filePath: 'l.mp4',
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log(res);
      },
      complete(res) {
        console.log(res);
      }
    })
  },
  chooseVideo() {
    wx.chooseVideo({
      camera: 'back',
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 60,
      success(res) {
        console.log(res);
      }
    })
  },
  changeNum() {
    this.setData({
      titleNum: this.data.titleNum > 4 ? 0 : this.data.titleNum + 1,
      title: this.data.titleList[this.data.titleNum]
    });
    const v = wx.createVideoContext('v' );
    console.log(this.data.titleNum);
    switch(this.data.titleNum -1){
      case 0:v;break;
      case 1:v.pause();break;
      case 2:v.play();break;
      case 3:v.seek(5);break;
      case 4:v.playbackRate(2);break;
      case 5:v.requestFullScreen({direction:0});break;
      case 6:v.sendDanmu({
        text:'nihao',
        color:'#0f0'
      });break;
      case 7:v.showStatusBar();break;
      case 8:v.hideStatusBar();break;
      default:v.stop();break;
    }
  }
})