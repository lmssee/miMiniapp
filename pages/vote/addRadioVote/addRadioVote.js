import fn from '../../../commons/fn.js';
Page({
  data: {
    userInfo: '',
    title: '',
    formDesc: '',
    optionsList: [{
      name: '',
      S: 0
    }, {
      name: '',
      S: 0
    }],
    checkDate: '',
    startDate: '',
    endDate: '',
    isNick: true,
    isRadio: true,
    submitIsAble:true
  },
  onLoad: function (options) {
    const _this = this;
    let o = options;
    if (o.isRadio == 0) {
      this.setBarText(0);
    }
    if (o.isRadio == 1) {
      this.setBarText(1);
    }
    const day = this.dateToDate(5);
    this.setData({
      'checkDate': day.new,
      'startDate': day.now,
      'endDate': day.new
    });
    this.setData({
      'userInfo': wx.getStorageSync('userInfo').userInfo
    })
  },
  onReady: function () {},
  onShow: function () {},
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
  addOption() {
    let a = this.data.optionsList;
    a.push({
      name: '',
      S: 1
    });
    this.setData({
      optionsList: a
    })
  },
  delOptionItem(e) {
    let a = this.data.optionsList;
    a.splice(e.currentTarget.dataset.optionindex, 1);
    this.setData({
      optionsList: a
    })
  },
  saveData(e) {
    let a = this.data.optionsList;
    a[e.currentTarget.dataset.optionindex].name = e.detail.value;
    this.setData({
      optionsList: a
    })
  },
  delItem(e) {
    this.data.optionsList.splice(e.detail, 1);
    let a = this.data.optionsList;
    this.setData({
      'optionsList': a
    });
  },
  copyItem(e) {
    this.data.optionsList.push(JSON.parse(JSON.stringify(this.data.optionsList[e.detail])));
    let a = this.data.optionsList
    this.setData({
      'optionsList': a
    });
  },
  setEndDate(e) {
    this.setData({
      'checkDate': e.detail.value
    })
  },
  changeIsNick() {
    this.data.isNick = !this.data.isNick;
  },
  submitVote() {
 
    const _this = this;
    if (this.data.title == '') {
      return wx.showToast({
        title: 'title 为空',
        icon: 'none',
        duration: 800
      })
    } else if (this.data.optionsList.length < 2) {
      return wx.showToast({
        title: '列表项太少',
        icon: 'none',
        duration: 800
      })
    }  
     this.setData({
      'submitIsAble':false
    })
    let user;
    wx.request({
      url: "https://lmssee.cn:3000/api/wx/vote",
      method: "POST",
      dataType: 'json',
      data: {
        pid: wx.getStorageSync('userid').unionid,
        title: this.data.title,
        desc:this.data.formDesc,
        list: this.data.optionsList,
        startTime: this.data.startDate,
        endTime: this.data.endDate,
        isNick: this.data.isNick == true ? 1 : 0,
        isRadio: this.data.isRadio == true ? 1 : 0
      },
      success(res) {
        console.log(res);
        if (res.data.success == true) {
          wx.showToast({
            title: '上传成功',
          });
          _this.resetVote();
          wx.redirectTo({
            url: '/pages/vote/home/home',
          });
          _this.setData({
            'submitIsAble':true
          })
        } else
          wx.showToast({
            title: '发生错误',
            icon: 'none'
          });
          _this.setData({
            'submitIsAble':true
          })
      },
      fail(err) {
        console.log(err);
        _this.setData({
          'submitIsAble':true
        })
      }
    })

  },
  resetVote() {
    this.setData({
      title: '',
      formDesc: '',
      optionsList: [{
        name: '',
        S: 0
      }],
      checkDate: this.dateToDate(5).new,
      startDate: this.dateToDate().now,
      endDate: this.dateToDate(5).new,
      isNick: true,
    })
  },
  changeIsVideo() {
    this.data.isRadio = !this.data.isRadio;
    wx.setNavigationBarTitle({
      title: this.data.isRadio == 1 ? "单选投票创建页":"多选投票创建页"
    })
  },
  setBarText(d) {
    if (d == 0) {
      wx.setNavigationBarTitle({
        title: '多选投票创建页',
      })
      this.setData({
        isRadio:false
      })
    }
    if (d == 1) {
      wx.setNavigationBarTitle({
        title: '单选投票创建页',
      })
      this.setData({
        isRadio:true
      })
    }
  },
  dateToDate(d = 0, m = 0, y = 0) {
    let a = fn.dateToDate(d,m,y)
  return a;
  },
  login() {
    fn.wxLogin()
  }
})