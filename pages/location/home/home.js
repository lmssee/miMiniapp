let resetTimeout, countdownTime;
Page({
  data: {
    authFailed: false,
    backgroundLocation: false,
    distance: 0,
    latitude: 0,
    longitude: 0,
    status: 'stop',
    countingNum: 0,
    polyline: [],
    markers: [],
    setting: {},
    recodeTime: '',
    isSettingContentShow: false,
    time: {
      startTime: 0,
      endTime: 0,
      durationTime: 0
    },
    settingDetail: [{
        a: 'showLocation',
        name: '定位显示',
        S: true,
        disabled: false
      },
      {
        a: 'enable3D',
        name: '3D 展示',
        S: false,
        disabled: false
      }, {
        a: 'showCompass',
        name: '指南针',
        S: true,
        disabled: false
      },
      {
        a: 'showScale',
        name: '比例尺',
        S: true,
        disabled: false
      }, {
        a: 'enableOverlooking',
        name: '俯视',
        S: false,
        disabled: false
      },
      {
        a: 'enableZoom',
        name: '缩放',
        S: true,
        disabled: false
      },
      {
        a: 'enableScroll',
        name: '拖动',
        S: true,
        disabled: false
      },
      {
        a: 'enableRotate',
        name: '旋转',
        S: true,
        disabled: false
      },
      {
        a: 'enableTraffic',
        name: '路况',
        S: false,
        disabled: false
      },
      {
        a: 'enableBuilding',
        name: '建筑',
        S: true,
        disabled: false
      }, {
        a: 'enableSatellite',
        name: '卫星图',
        S: false,
        disabled: false
      }, {
        a: 'enablePoi',
        name: 'POI 点',
        S: false,
        disabled: false
      }
    ]
  },
  onLoad: function (options) {

  },
  onReady: function () {
    if (!wx.getStorageSync('locationSetting')) {
      /** 配置设置 */
      wx.showToast({
        title: 'title',
        title: '该提示仅提示一次,若没清除存储的话 ',
        duration: 1200,
        complete: () => {
          let a = {};
          for (let i = 0; i < this.data.settingDetail.length; i++) {
            a[this.data.settingDetail[i].a] = this.data.settingDetail[i].S
          }
          this.setData({
            setting: a
          });
          a = null;
          wx.setStorageSync('locationSetting', this.data.setting);
        }
      });
    } else {
      let a = wx.getStorageSync('locationSetting');
      for (let i = 0; i < Object.keys(a).length; i++) {
        this.data.settingDetail[i].S = a[Object.keys(a)[i]];
      }
      this.setData({
        setting: a,
        settingDetail: this.data.settingDetail
      });
      a = null;
    }
    /** 授权查看 */
    wx.authorize({
      scope: 'scope.userLocationBackground',
      complete: () => {
        wx.getSetting({
          withSubscriptions: true,
          success: (r) => {
            this.analyzeAuthorization(r.authSetting);
          }
        })
      }
    })
  },
  onShow: function () {
    /** 屏幕常亮  */
    wx.setKeepScreenOn({
      keepScreenOn: (true)
    })
  },
  onShareAppMessage: function () {},
  analyzeAuthorization(d) {
    if (d['scope.userLocation'] && d['scope.userLocationBackground']) {
      this.setData({
        authFailed: false,
        backgroundLocation: false
      });
      this.getUserLocation();
    } else if (d['scope.userLocation'] && !d['scope.userLocationBackground']) {
      this.setData({
        authFailed: false,
        backgroundLocation: true
      });
      this.getUserLocation();
    } else if (!d['scope.userLocation']) {
      this.setData({
        authFailed: true,
        backgroundLocation: true
      });
    }
  },
  /** 在设置中设置权限信息 */
  reGetLocation() {
    wx.openSetting({
      withSubscriptions: true,
      success: (r) => {
        this.analyzeAuthorization(r.authSetting);
      },
      fail: () => {
        this.setData({
          authFailed: true,
          backgroundLocation: true
        })
      }
    })
  },
  /** 获取用户位置信息并设置到屏幕中央 */
  getUserLocation() {
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      success: (r) => {
        this.setData({
          latitude: r.latitude,
          longitude: r.longitude
        });
      },
      fail: () => {}
    })
  },
  /** 点击开始跑步 */
  startRun() {
    wx.setNavigationBarTitle({
      title: 'are you ready?'
    });
    wx.showModal({
      cancelColor: '#0fff0f',
      title: '开始跑步',
      content: '准备跑步了么',
      confirmText: '开始跑步',
      success: (r) => {
        if (r.confirm) {
          this.countdown();
          this.data.time.startTime = this.data.time.endTime = Date.now();
        } else {
          wx.setNavigationBarTitle({
            title: 'running for life'
          });
        }
      },
      fail: (r) => {
        wx.setNavigationBarTitle({
          title: 'running for life'
        });
      }
    })
  },
  /** 倒计时 */
  countdown() {
    wx.setNavigationBarTitle({
      title: 'wait a moment'
    })
    this.setData({
      status: 'countdown',
      countingNum: 3
    })
    countdownTime = setInterval(() => {
      if (this.data.countingNum > 1) {
        this.setData({
          countingNum: this.data.countingNum - 1
        })
      } else {
        clearInterval(countdownTime);
        countdownTime = null;
        this.running();
      }
    }, 1000);
  },
  /** 跑步中 */
  running() {
    this.data.time.endTime = Date.now();
    wx.setNavigationBarTitle({
      title: 'running'
    })
    let polyline = this.data.polyline;
    polyline.push({
      points: [],
      color: '#00ffff',
      width: 3
    });
    this.setData({
      polyline,
      status: 'running',
      countingNum: 3
    });
    if (!this.data.backgroundLocation) {
      wx.startLocationUpdateBackground({
        success: () => {
          this.locationchange();
        },
        fail: () => {
          this.running();
        }
      })
    } else {
      wx.startLocationUpdate({
        success: () => {
          this.locationchange();
        },
        fail: () => {
          this.running()
        }
      })
    }
  },
  /** 监听位置变化 */
  locationchange() {
    wx.onLocationChange(this.onLocationChange)
  },
  /** 位置变化回调函数  */
  onLocationChange(r) {
    let markers = this.data.markers;
    const mN = Math.floor(markers.length / 2) + 1;
    markers.push({
      latitude: r.latitude,
      longitude: r.longitude,
      zIndex: true,
      callout: {
        content: 'hi , ' + mN,
        color: '#0fff00',
        bgColor: '#000000',
        display: "ALWARS",
        borderRadius: '50%',
      }
    });
    this.setData({
      markers,
      latitude: r.latitude,
      longitude: r.longitude,
    });
    this.recordPoint(r)
  },
  /** 跳转 */
  runRecord() {
    wx.redirectTo({
      url: '/pages/location/list/list',
    })
  },
  /** 记录用户 */
  recordPoint(d) {
    let polyline = this.data.polyline;
    let points = polyline[polyline.length - 1].points;
    points.push({
      latitude: d.latitude,
      longitude: d.longitude
    });
    this.setData({
      polyline
    })
  },
  /** 暂停 */
  pauseRun() {
    wx.showModal({
      title: '小憩',
      content: '休息片刻',
      success: (r) => {
        if (!!r.confirm) {
          let last = Date.now();
          wx.setNavigationBarTitle({
            title: 'take a break'
          });
          this.setData({
            status: 'pause'
          });
          this.data.time.durationTime += (last - this.data.time.endTime);
          wx.offLocationChange(this.onLocationChange);
          wx.stopLocationUpdate();
        }
      }
    })
  },
  /** 停止跑步 */
  stopRun() {
    wx.showModal({
      title: 'End of run ?',
      content: '终止跑步',
      success: (r) => {
        if (!!r.confirm) {
          let last = Date.now();
          wx.setNavigationBarTitle({
            title: 'running for life'
          });
          this.data.time.durationTime += (last - this.data.time.endTime);
          wx.offLocationChange(this.onLocationChange);
          wx.stopLocationUpdate();
          let a = wx.getStorageSync('runRecodeList') || [];
          a.unshift({
            time: this.data.time,
            markers: this.data.markers,
            polyline: this.data.polyline
          })
          this.saveData(a);
        }
      }
    })
  },
  /** 保存到云端 */
  saveData(d) {
    wx.request({
      url: 'https://lmssee.cn:3000/api/wx/runner',
      method: "POST",
      data: {
        pid: wx.getStorageSync('userid').unionid,
        time: [d[0].time.startTime, d[0].time.endTime, d[0].time.durationTime],
        markers: d[0].markers,
        polyline: d[0].polyline
      },
      success: (r) => {
        this.setData({
          status: 'stop',
          polyline: [],
          markers: []
        })
      },
      fail: () => {
        wx.showToast({
          title: '保存失败',
        })
      }
    })
  },
  /** 打开设置 */
  showSettingContent() {
    this.setData({
      isSettingContentShow: true
    })
  },
  /** 隐藏设置 */
  hiddenSettingContent() {
    this.setData({
      isSettingContentShow: false
    })
  },
  /** 修改地图设置并保存到 storage */
  changeSetting(e) {
    if (e.currentTarget.dataset.c.disabled) return false;
    this.data.settingDetail[e.currentTarget.dataset.b].S = !this.data.settingDetail[e.currentTarget.dataset.b].S;
    let a = wx.getStorageSync('locationSetting');
    a[e.currentTarget.dataset.a] = this.data.settingDetail[e.currentTarget.dataset.b].S;
    wx.setStorageSync('locationSetting', a);
    this.setData({
      settingDetail: this.data.settingDetail,
      setting: {
        [e.currentTarget.dataset.a]: this.data.settingDetail[e.currentTarget.dataset.b].S
      }
    });
  },
  /** 调整地图 */
  onRegionChange(e) {
    if (this.data.status === 'stop') {
      if (resetTimeout) {
        clearTimeout(resetTimeout);
        resetTimeout = null;
      }
      if (e.type === 'end' && (e.causedBy === 'drag') || e.causedBy === 'scale') {
        resetTimeout = setTimeout(() => {
          this.getUserLocation();
          resetTimeout = null;
        }, 8000);
      }
    }
  }
})