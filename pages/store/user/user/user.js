 Page({
   data: {

   },
   /** 
    *    初始化打印顺序为 （）
    *  
    *         load -  show - ready
    *  
    *    跳转其他页面触发 （入栈）
    *    
    *         hide
    *   
    *    返回上一页面  （出栈）
    * 
    *         unload
    * 
    *   */
   onLoad: function (options) {
     console.log('load');
   },
   onReady: function () {
     console.log('reeady');
   },
   onShow: function () {
     console.log('show');
   },
   onHide: function () {
     console.log('hide');

   },
   onUnload: function () {
     console.log(Unload);
   },
   onPullDownRefresh: function () {

   },

   onReachBottom: function () {

   },

   onShareAppMessage: function () {

   }
 })