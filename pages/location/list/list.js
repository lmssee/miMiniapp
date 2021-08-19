import fn from '../../../commons/fn.js';
Page({
  data: {
    list: [],
    num: 0,
    amount: 20,
    last: false,
    delAlert: false
  },
  onLoad: function (options) {
    this.data.delAlert = wx.getStorageSync('runnerLietDelAlert') || false
    console.log(this.data.delAlert);
  },
  onReady: function () {},
  onShow: function () {
    this.getlist();
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {
    if (!this.data.last)
      this.getlist();
  },
  onShareAppMessage: function () {

  },
  getlist() {
    wx.request({
      url: 'https://lmssee.cn:3000/api/wx/runner',
      method: "GET",
      data: {
        l: this.data.amount,
        m: ++this.data.num,
        pid: wx.getStorageSync('userid').unionid
      },
      success: (r) => {
        if (r.data.l * (r.data.m - 1) > r.data.count || r.data.data.length == 0) {
          wx.showToast({
            title: '没有更多数据'
          })
          this.data.num--;
          this.setData({
            last: true
          })
        }
        let a = this.data.list;
        r.data.data.map(i => {
          for (let j = 0; j < 3; j++) {
            i.time[j] = fn.numberToTime(i.time[j]);
          }
        })
        a = a.concat(r.data.data);
        this.setData({
          list: a
        })
      }
    })
  },
  goToDetail(e) {
    wx.showNavigationBarLoading();
    wx.setStorage({
      key: 'runnerListDetailContent',
      data: e.currentTarget.dataset.a,
      success:()=>{
        wx.hideNavigationBarLoading();
        wx.redirectTo({
          url: '/pages/location/detail/detail'
        })
      }
    });
  },
  delThisDeail(e) {
    if (!this.data.delAlert)
      wx.showModal({
        title: '警告',
        content: '删除数据无法找回',
        cancelColor: '#00ffff',
        cancelText: '不再显示',
        confirmText: '已知晓',
        success: (r) => {
          if (r.confirm)
            this.del(e)
          else {
            this.setData({
              delAlert: true
            })
            wx.setStorage({
              key: 'runnerLietDelAlert',
              data: true
            })
            this.del(e);
          }
        }
      })
    else this.del(e);
  },
  del(e) {
    wx.request({
      url: 'https://lmssee.cn:3000/api/wx/runner/del',
      method: "POST",
      data: {
        _id: e.currentTarget.dataset.a['_id']
      },
      success: () => {
        let a = this.data.list;
        a.splice(e.currentTarget.dataset.b, 1);
        this.setData({
          list: a
        })
      }
    })
  }
})