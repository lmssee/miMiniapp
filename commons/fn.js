import js from './_js.js';
import config from './config.js';
import _fn from './fn.js';
const fn = {
  data: {
    touch: {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    }
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
      new: '' + nwwyear + '-' + (nwwmonth <= 10 ? '0' + nwwmonth : nwwmonth) + '-' + (nwwday <= 10 ? '0' + nwwday : nwwday)
    }
  },
  getHeight(node) {
    return new Promise((reslove, reject) => {
      wx.createSelectorQuery().select(node).fields({
        size: true,
        scrollOffset: true,
        properties: ['scrollX', 'scrollY'],
        computedStyle: ['margin', 'backgroundColor'],
        context: true,
      }, (res) => {
        if (res)
          reslove(res);
        else reject(res);
      }).exec();
    })
  },
  get(url, data) {
    console.log('post', new Date().toLocaleString(), url, data);
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.domain + url,
        data: data,
        header: {
          "content-type": "application/json"
        },
        method: "GET",
        dataType: "json",
        success: (res) => {
          console.log('get', new Date().toLocaleString(), url, res.data);
          resolve(res.data);
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  },
  payGet(url, data) {
    _fn.showLoading();
    console.log('post', new Date().toLocaleString(), url, data);
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.payDomin + url,
        data: data,
        header: {
          "content-type": "application/json"
        },
        method: "GET",
        dataType: "json",
        success: (res) => {
          console.log('get', new Date().toLocaleString(), url, res.data);
          _fn.hideLoad();
          resolve(res.data);
        },
        fail: (err) => {
          _fn.hideLoad();
          reject(err);
        }
      })
    })
  },
  post(url, data, header) {
    _fn.showLoading();
    if (header == 'json') {
      header = 'application/json';
      data = JSON.stringify(data)
    } else {
      header = 'application/x-www-form-urlencoded';
    }
    console.log('post', new Date().toLocaleString(), url, data);
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.domain + url,
        data,
        header: {
          "Content-Type": header
        },
        method: "POST",
        success: (res) => {
          console.log('get', new Date().toLocaleString(), url, res.data);
          _fn.hideLoad();
          resolve(res.data);
        },
        fail: (err) => {
          _fn.hideLoad();
          reject(err);
        }
      })
    })
  },
  payPost(url, data, header) {
    _fn.showLoading();
    if (header == 'json') {
      header = 'application/json';
      data = JSON.stringify(data)
    } else {
      header = 'application/x-www-form-urlencoded';
    }
    console.log('post', new Date().toLocaleString(), url, data);
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.payDomin + url,
        data,
        header: {
          "Content-Type": header
        },
        method: "POST",
        success: (res) => {
          console.log('get', new Date().toLocaleString(), url, res.data);
          _fn.hideLoad();
          resolve(res.data);
        },
        fail: (err) => {
          _fn.hideLoad();
          reject(err);
        }
      })
    })
  },
  /** 微信支付 */
  gotopay(o) {
    _fn.showLoading();
    return new Promise((resolve, reject) =>
      wx.requestPayment({
        /** 时间戳，从 1970 年 1 月 1 日 00:00:00 至今的秒数，即当前的时间 */
        timeStamp: o.timeStamp,
        /** 随机字符串，长度为32个字符以下 */
        nonceStr: o.nonceStr,
        /*** 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*** */
        package: o.package,
        signType: o.signType,
        paySign: o.paySign,
        success: (res) => {
          console.log('pay', new Date().toLocaleString(), res);
          _fn.hideLoad();
          resolve(res);
          /** errMsg: "requestPayment:ok" */
        },
        fail: (err) => {
          console.log('pay', new Date().toLocaleString(), err);
          _fn.hideLoad();
          reject(err);
        }
      }));
  },
  /** 获取 userSig */
  getUserSig(id) {
    // let data = JSON.stringify({
    //   userId: id
    // });
    // console.log(data);
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.imDomin,
        data: {
          userId: id
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        dataType: "json",
        success: (res) => {
          resolve(res.data);
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  },
  /** 监听手势开始 */
  touchstart(o) {
    _fn.data.touch = {
      startX: Math.floor(o.changedTouches[0].pageX),
      startY: Math.floor(o.changedTouches[0].pageY),
    };
  },
  /** 监听手势结束 
   * 参数说明 ，参数为对象，对象的元素 
   *  o  为必填参数，是点触对象
   *  left          为左滑回调函数，非必须
   *  right         为右滑回调函数，非必须
   *  leftData      为左滑回调函数的参数，也可直接在函数中定义并使用，非必须
   *  rightData     为右滑回调函数的参数，也可直接在函数中定义并使用，非必须
   */
  touchend(o) {
    let x = _fn.data.touch.startX - Math.floor(o.o.changedTouches[0].pageX),
      y = _fn.data.touch.startY - Math.floor(o.o.changedTouches[0].pageY);
    /** 滑动检测 */
    if (x != 0) {
      /** 滑动检测 */
      if (x > 0 && Math.abs(x) > 2 * Math.abs(y)) {
        /** 右滑 */
        if (js.typeOf(o.right) == 'function') {
          if (!!o.rightData)
            o.right(o.rightData);
          else o.right();
        }
        return;
      } else if (x < 0 && (Math.abs(x) > (2 * Math.abs(y)))) {
        /** 左滑 */
        if (js.typeOf(o.left) == 'function') {
          if (!!o.leftData)
            o.left(o.leftData);
          else o.left();
        }
        return;
      }
    };
    _fn.data.touch = {
      startX: 0,
      startY: 0,
    };
  },
  /** 简单的左滑返回上一页（具体返回页面信息以路由栈为准） */
  back(o) {
    _fn.touchend({
      o,
      left: () => {
        wx.navigateBack({
          delta: 1,
        });
      }
    });
  },
  goto(o) {
    let url = o;
    if (typeof url != 'string') {
      url = url.currentTarget.dataset.u
    } else {
      url = o;
    }
    wx.navigateTo({
      url
    })
  },
  testID(code) {
    code += '';
    let city = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北 ",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏 ",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外 "
    };
    let pass = {
      msg: '',
      success: true
    };
    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/i.test(code)) {
      pass = {
        msg: '身份证号格式错误',
        success: false
      }
    } else if (!city[code.substr(0, 2)]) {
      pass = {
        msg: '地址编码错误',
        success: false
      }
    } else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        let sum = 0;
        for (let i = 0; i < 17; i++)
          sum += code[i] * factor[i];
        let last = parity[sum % 11];
        if (sum % 11 != 2 && parity[sum % 11] != Number(code[17]) || (sum % 11) == 2 && code[17] != 'x' && code[17] != 'X') {
          pass = {
            msg: "身份证输入错误",
            success: false
          }
        }
      }
    }
    return pass;
  },
  idCardForAge(UUserCard) {
    let age;
    const myDate = new Date();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate();
    if (UUserCard.length == 18) {
      age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
      if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
        age++;
      }
    } else {
      age = myDate.getFullYear() - UUserCard.substring(6, 8) - 1901;
      if (UUserCard.substring(8, 10) < month || UUserCard.substring(8, 10) == month && UUserCard.substring(10, 12) <= day) {
        age++;
      }
    }
    return age;
  },
  showLoading() {
    wx.showLoading({
      title: '请稍等',
      mask: true
    });
  },
  hideLoad() {
    wx.hideLoading();
  },
  showInfo(msg, d = 0, time = 1195) {
    let icon = ['success', 'error', 'loading', 'none'];
    setTimeout(() => {
      wx.showToast({
        title: msg,
        icon: icon[d],
        mask: true,
        duration: time
      });
    }, 5);
  },
  cycle(fn, data, n) {
    let a = fn.apply(_fn, data);
    if (a.then && a.catch && a.finally && n > 1) {
      return new Promise((res, rej) => a.then(() => res(a)).catch(() => _fn.cycle(fn, data, --n)).finally(() => (n == 2) && res(a)));
    }
  },
  /** px 转换为 rpx */
  pxTRpx(n) {
    return n * 750 / config.windowWidth;
  }
};
export default fn;