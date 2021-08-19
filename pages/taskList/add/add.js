// pages/taskList/add/add.js
Page({
  data: {
    content: '',
    isMany: false
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
  inputAdd(e) {
    console.log(e);
  },
  getValue(e) {
    console.log(e.detail);
  },
  manySave() {
    this.setData({
      isMany: !this.data.isMany
    })
  },
  saveTask() {
    if (this.data.content == '') return wx.showToast({
      title: '空无法提交',
      icon: "error"
    })
    let list = [];
    if (wx.getStorageSync('taskList')) {
      list = list.concat(wx.getStorageSync('taskList'));
    }
    list.push({ c: this.data.content, S: 0, node: '' });
    wx.setStorage({
      key: "taskList",
      data: list
    })
    this.setData({
      content: ''
    });
    if (!this.data.isMany) {
      wx.redirectTo({
        url: '/pages/taskList/home/home'
      })
    }
  }
})