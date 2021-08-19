// pages/index/form/form.js
Page({
  data: {
    inputTest: '',
    switchValue: false,
    endTime: '',
    modelValue: '',
    forList: [1, 2, 3, 4]
  },
  onLoad: function (options) {
    wx.createIntersectionObserver().relativeToViewport().observe('#form', (res) => {
      res.id // 目标节点 id
      res.dataset // 目标节点 dataset
      res.intersectionRatio // 相交区域占目标节点的布局区域的比例
      res.intersectionRect // 相交区域
      res.intersectionRect.left // 相交区域的左边界坐标
      res.intersectionRect.top // 相交区域的上边界坐标
      res.intersectionRect.width // 相交区域的宽度
      res.intersectionRect.height // 相交区域的高度
      console.log(res);
    })
  },
  onReady: function () {
    const query = wx.createSelectorQuery();
    query.select('#form').boundingClientRect((res) => {
      res.top;
      // console.log(res.top);
    });
    query.selectViewport().scrollOffset((res) => {
      res.scrollTop;
      // console.log(res.scrollTop);
    });
    query.exec();
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
  onInputVlueChange(e) {
    this.setData({
      inputTest: e.detail.value
    });
    console.log(this.data.inputTest);
  },
  switchValueChange(e) {
    this.setData({
      switchValue: e.detail.value
    })
  },
  onPickerValueChange(e) {
    this.setData({
      endTime: e.detail.value
    })
  }
})