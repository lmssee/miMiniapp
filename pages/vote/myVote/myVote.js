// pages/vote/myVote/myVote.js
Page({
  data: {
    list: [],

  },
  onLoad: function (options) {
    const _this = this;
    wx.request({
      url: 'https://lmssee.cn:3000/api/wx/vote/',
      method: "GET",
      data:{
        'user':wx.getStorageSync('userid').unionid
      },
      success(res) {
       _this.setData({
         'list':res.data[0]
       })
      }
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
  goToVoteDetail(e){
    wx.navigateTo({
      url: "/pages/vote/voteDetail/voteDetail?id="+e.currentTarget.dataset.a.uid+"&own=1"
    })
  }
})