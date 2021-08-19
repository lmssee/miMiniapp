// pages/index/system/system.js
Page({
  data: {
    levelText: '电量显示',
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
  makePhonrCall() {
    wx.makePhoneCall({
      phoneNumber: '18411000420',
      success() {
        console.log(123);
      }
    })
  },
  addPhonContact() {
    wx.addPhoneContact({
      firstName: '谭二狗',
      mobilePhoneNumber: '18134140420'
    })
  },
  getbatteryInfo(e) {
    wx.getBatteryInfo({
      success: (result) => {
        this.setData({
          levelText: '电量' + result.level + '充电 ing ：' + (result.isCharging ? '是' : '否')
        });
      },
    })
  },
  setCiphoard() {
    wx.setClipboardData({
      data: '你好，谭二狗',
      success(res) {
        wx.getClipboardData({
          success: (res) => {
            console.log('you get it ' + res.data);
          },
        })
      }
    })
  },
  setScreenBrightness() {
    wx.setScreenBrightness({
      value: 0.5,
      success(res) {
        console.log(res);
      }
    });
    wx.getScreenBrightness({
      success: (o) => {
        console.log(o);
        wx.showModal({
          title: '亮度',
          content: o.value.toString(),
          cancelColor: 'cancelColor',
        });
        wx.setKeepScreenOn({
          keepScreenOn: true,
          success(o) {
            wx.showModal({
              title: '屏幕常量',
              content: 'Yes',
              cancelColor: 'cancelColor',
            });
          }
        });
      }
    })
  },
  startAccelerometer() {
    wx.startAccelerometer({
      interval: 'game',
      success(res) {
        wx.onAccelerometerChange((r) => {
          console.log(r.s + ' ' + r.y + ' ' + r.z);
        })
        setTimeout(() => {
          wx.stopAccelerometer({
            success: (res) => {
              console.log('关闭加速计');
            },
          })
        }, 1000)
      }
    })
  },
  startCompass() {
    wx.startCompass({
      success: (res) => {
        wx.onCompassChange((r) => {
            console.log(r.accuracy);
            console.log(r.direction);
          }),
          setTimeout(() => {
            wx.stopCompass({
              success: (res) => {
                wx.showToast({
                  title: 'title',
                })
                console.log('罗盘已关闭');
              },
            })
          }, 800);
      },
    })
  },
  startDeviceMotionListening() {
    wx.startDeviceMotionListening({
      interval: 'ui',
      success(res) {
        wx.onDeviceMotionChange((r) => {
          console.log(r.alpha);
          console.log(r.beta);
          console.log(r.gamma);
        })
        setTimeout(() => {
          wx.stopDeviceMotionListening({
            success: (res) => {
              wx.showModal({
                title: '设备方向',
                content: '监听已关闭',
                cancelColor: 'cancelColor',
              })
            },
          })
        }, 1200);
      }
    })
  },
  startGyroscope() {
    wx.startGyroscope({
      interval: 'game',
      success(r) {
        wx.onGyroscopeChange((r) => {
          console.log(r);
        });
        setTimeout(() => {
          wx.stopGyroscope({
            success: (res) => {
              wx.showModal({
                title: '陀螺仪',
                content: '监听已关闭',
                cancelColor: 'cancelColor',
              })
            },
          })
        }, 800);
      }
    })
  },
  vibrateShort() {
    wx.vibrateShort({
      success: (res) => {
        wx.showToast({
          title: '震动开始',
          duration: 800
        });
        setTimeout(() => {
          wx.vibrateLong({
            success: (res) => {
              wx.showToast({
                title: '震动结束',
                duration: 600
              })
            },
          }), 600
        });
      },
    })
  },
  scanCode(){
    wx.scanCode({
      onlyFromCamera: true,
      scanType:['qrCode','barCode'],
      complete(res){
        console.log(res.result);
        console.log(res.scanType);
        console.log(res.charSet);
        console.log(res.rawData);
      }
    })
  }
})