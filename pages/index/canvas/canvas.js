// pages/index/canvas/canvas.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onReady: function () {
    const c = wx.createCanvasContext('c');
    c.arc(100, 75, 50, 0, 2 * Math.PI);
    c.fillStyle = "#0f0";
    c.fill();
    c.draw(false, () => {
      wx.canvasToTempFilePath({
        canvasId: 'c',
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        destWidth: 200,
        destHeight: 200,
        success(res) {
          console.log(res);
          console.log('canvas 已保存');
        }
      })
    });
    /***
     *  获取上下文
     * 
     *    wx.createCanvasContext(canvas-id)
     *     .fillStyle = ''       填充色
     *     .moveTo(x,y)          移动画笔到
     *     .lineTo(x,y)          绘制到
     *     .stroke()             线条闭合并显示线条
     *     .fillRect(x,y,X,Y)    矩形
     *     .arc(x,y,Ox,Oy,degstart,degend)  圆弧
     *     .fill()               自动首尾闭合
     *     .fillText(text,x,y)   绘制文字
     *     .drawImage(img,x,y,width,height)  绘制图像
     * 
     * 
     *     .draw()                   绘制,若传入参数 true ,则表示保留上一次作图
     *     wx.canvasToTempFilePath   需要在 .draw() 第二个参数使用
     */

    wx.canvasGetImageData({
      canvasId: 'c',
      height: 200,
      width: 200,
      x: 0,
      y: 0,
      success(res) {
        console.log(res);
        console.log(
          '数据以获取'
        );
        wx.canvasPutImageData({
          canvasId: 'd',
          data: res.data,
          height: 200,
          width: 200,
          x: 0,
          y: 0,
        })
      }
    });


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

})