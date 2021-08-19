// pages/vote/voteDetail/voteDetail.js
Page({
  data: {
    list: '',
    num: 1,
    isEnd: false,
    isOwn: true,
    isVote:false
  },
  onLoad: function (options) {
    let _this = this;
    let o = options;
    if (o.own != 1 && !new RegExp(`${wx.getStorageSync('userid').unionid}`,'img').test(o.id)) {
      this.setData({
        'isOwn': false
      })
    }
    this.getList(o.id, _this);
    wx.request({
      url: 'https://lmssee.cn:3000/api/wx/vote/user/',
      data:{
        'WXunionid':wx.getStorageSync('userid').unionid
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
    this.getList(this.data.list.uid, this);
  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {
    return {
      'title': this.data.list.title,
      path: '/pages/vote/voteDetail/voteDetail?id=' + this.data.list.uid + '&own=0'
    }
  },
  stopImmediately(e) {
    const _this = this;
    wx.request({
      url: 'https://lmssee.cn:3000/api/wx/vote/stop',
      method: 'POST',
      data: {
        uid: e.currentTarget.dataset.a
      },
      success(r) {
        _this.getList(e.currentTarget.dataset.a, _this);
      },
      fail(r) {
        console.log(r);
      }
    });
  },
  getList(id, _this) {
    wx.request({
      url: "https://lmssee.cn:3000/api/wx/vote/voteDetail",
      data: {
        uid: id,
        pid: wx.getStorageSync('userid').unionid
      },
      method: "GET",
      success(r) {
        _this.setData({
          'list': r.data[0]
        });
        for (let i = 0; i < _this.data.list.list.length; i++) {
          _this.data.num += _this.data.list.list.S;
        }
        _this.setData({
          'num': _this.data.num
        })

      },
      fail(err) {
        console.log(err);
      }
    })
  } 
})