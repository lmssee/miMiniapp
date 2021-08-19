const fn = {
  /*** 获取用户的 unionid  */
  login() {
    wx.login({
      timeout: 1200,
      success(res) {
        if (res.code) {
          wx.request({
            url: 'https://lmssee.cn:3000/api/wx/id/',
            method: "POST",
            dataType: 'json',
            data: {
              code: res.code,
              number: 123
            },
            success(res) {
              wx.setStorageSync('userid', JSON.parse(res.data.data))
            },
            fail(err) {
              console.log(err);
            }
          })
          wx.showToast({
            title: '登录',
            icon: 'success'
          })
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  /*** 获取用户的信息 */
  getUserInfo() {
    wx.getUserProfile({
      lang: "zh_CN",
      desc: "展示用户信息",
      success(res) {
        wx.setStorageSync('userInfo', res);
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  /** 输入 日 月 年 ，然后返回当前日期和输入数据后的 "YYYY-MM-DD" 格式日期 */
  dateToDate(d = 0, m = 0, y = 0) {
    const
      now = new Date(),
      year = now.getFullYear(),
      month = now.getMonth() + 1,
      day = now.getDate(),
      nww = new Date(year + y, month + m, day + d),
      nwwyear = nww.getFullYear(),
      nwwmonth = nww.getMonth(),
      nwwday = nww.getDate();
    return {
      now: '' + year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day),
      new: '' + nwwyear + '-' + (nwwmonth < 10 ? '0' + nwwmonth : nwwmonth) + '-' + (nwwday < 10 ? '0' + nwwday : nwwday)
    }
  },
  /** 获取页面的信息，包括展示页面的宽高 */
  getSystemInfo() {
    wx.getSystemInfoAsync({
      success: (r) => {
        console.log(r);
      },
    })
  },
  /** 根据毫秒数换算时间 */
  numberToTime(d) {
    d *=1;
    if (d.toString().length == 13) {
      return new Date(d).toLocaleString();
    } else {
      let h = Math.floor(d / 3600000),
        m = Math.floor((d % 3600000) / 60000),
        s = Math.floor(((d%3630000)%60000 )/ 1000);
      return (h == 0 ? '' : h + ' 小时 ') + (m == 0 ? '' : (m < 10 ? '0' + m : m) + ' 分 ') + (s < 10 ? '0' + s : s ) + ' 秒';
    }
  }

};
export default fn;