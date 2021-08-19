Page({
  data: {
    list: '',
    d: '',
    n: 0
  },
  onLoad: function (o) {
    this.setData({
      list: wx.getStorageSync('taskList'),
      d: wx.getStorageSync('taskList')[o.id],
      n: o.id
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
  saveData() {
    this.data.list.splice(this.data.n, 1, this.data.d);
    wx.setStorage({
      key:"taskList",
      data:this.data.list,
      success:()=>{
        wx.redirectTo({
          url: '/pages/taskList/home/home?S=' + this.data.d.S
        })
      },
      fail:()=>{
        wx.showToast({
          title: '保存失败'
        })
      }
    })
  },
  cInput(e) {
    this.data.d.c = e.detail.value;
    this.setData({
      d: this.data.d
    })
  },
  nodeInput(e) {
    this.data.d.note = e.detail.value;
    this.setData({
      d: this.data.d
    })
  }
})