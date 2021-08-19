// pages/index/camera/camera.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

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
  clickPhoto(){
    console.log(123);
    const cameta = wx.createCameraContext('c');
    cameta.takePhoto({
      quality:'high',
      success(res){
        console.log(res);
      },
      fail(res){
        console.log(res);
      }
    })
  },
  clickRecord(){
    const  c = wx.createCameraContext('c');
    c.startRecord({
      timeoutCallback(res){
        console.log(res.tempThumbPath);
        console.log(res.tempVideoPath);
      },
      success(){
        console.log('开始录像');
      }
    });
    c.stopRecord({
      success(res){
        console.log(res.tempVideoPath);
        console.log(res.tempThumbPath);
      }
    });
    c.onCameraFrame((res)=>{
      console.log(res);
    }).start();
    c.onCameraFrame((res)=>{
      console.log(res);
    }).stop();
  }
})