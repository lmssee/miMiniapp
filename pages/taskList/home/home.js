// pages/taskList/home/home.js
Page({
  data: {
    tab: 0,
    taskList: [],
    tabLeftEmpty: true,
    tabRightEmpty: true,
    tabLeftCheck: true,
    addMove: false,
    startTouchPointer: 0,
    endTouchPointer: 0
  },
  onLoad: function (o) {
    if(!!o && o.S == 1)
     this.setData({
      tabLeftCheck:false
     })
  },
  onReady: function () {

  },
  onShow: function () {
    this.getTodoList();
  },
  getTodoList() {
    const taskList = wx.getStorageSync('taskList') || [];
    const tabLeftEmpty = taskList.filter(item => item.S == 0).length === 0;
    const tabRightEmpty = taskList.filter(item => item.S == 1).length === 0;
    this.setData({
      taskList,
      tabLeftEmpty,
      tabRightEmpty
    })
  },
  tabLeftCheckIsTrue() {
    this.setData({
      'tabLeftCheck': true
    })
  },
  tabLeftCheckIsFalse() {
    this.setData({
      'tabLeftCheck': false
    })
  },
  gotoAddTask() {
    this.setData({
      'addMove': true
    })
    setTimeout(() => {
      this.setData({
        'addMove': false
      })
    }, 800);
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/taskList/add/add',
      })
    }, 802);
  },
  taskOver(e) {
    this.data.taskList[e.detail].S = 1;
    wx.setStorageSync('taskList', this.data.taskList);
    this.setData({
      taskList: this.data.taskList
    });
    this.getTodoList();
  },
  taskNoOver(e) {
    this.data.taskList[e.detail].S = 0;
    wx.setStorageSync('taskList', this.data.taskList);
    this.setData({
      taskList: this.data.taskList
    });
    this.getTodoList();
  },
  taskDel(e) {
    this.data.taskList.splice(e.detail, 1);
    wx.setStorageSync('taskList', this.data.taskList);
    this.setData({
      taskList: this.data.taskList
    });
    this.getTodoList();
  },
  changeTask(e) {
    wx.redirectTo({
      url: '/pages/taskList/change/change?id=' + e.currentTarget.dataset.a 
    })
    this.getTodoList();
  },
  startTouch(e) {
    this.data.startTouchPointer = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };
  },
  endTouch(e) {
    this.data.endTouchPointer = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };
    let x = this.data.endTouchPointer.x - this.data.startTouchPointer.x;
    let y = Math.abs(this.data.endTouchPointer.y - this.data.startTouchPointer.y);
    if (Math.abs(x) > 2 * y) {
      this.setData({
        'tabLeftCheck': !this.data.tabLeftCheck
      })
    }
  }
})