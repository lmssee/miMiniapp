Page({
  data: {
    list: {},
    order:{}
  },

  onLoad: function (options) {
    this.setData({
      list: wx.getStorageSync('storeDetailPage')
    })
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
  addCum() {
    this.changeCum(+1);
  },
  reduceCum() {
    this.changeCum(-1);
  },
  changeCum(n) {
    if (!this.data.list.cum) {
      this.data.list.cum = 0
    }
    this.data.list.cum = this.data.list.cum * 1 + n * 1
    this.setData({
      'list.cum': this.data.list.cum
    });
    let a = wx.getStorageSync('order');
    if (!a[this.data.list._id]) {
      a[this.data.list._id] = this.data.list
    }
    if (this.data.list.cum != 0)
      a[this.data.list._id].cum = this.data.list.cum;
    else
      delete(a[this.data.list._id]);
    wx.setStorageSync('order', a);
    wx.setStorageSync('storeDetailPage', this.data.list)
  }
})