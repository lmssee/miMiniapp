import config from './config.js';
import fn from './fn.js';
import js from './_js.js';
const user = {
  /*** 获取用户的 unionid  */
  login() {
    wx.login({
      timeout: 1200,
      success(res) {
        if (res.code) {
          // wx.setStorageSync('userCode', res.code);
          fn.post('auth/getUserInfoByJsCode', {
            code: res.code
          }).then(o => {
            // config.userOpenid = o.data.msg.openid;
            config.userid = o.data.msg.wxUserId;
            config.phone = o.data.msg.phone;
            wx.setStorageSync('userOpenid', o.data.msg.openid);
            wx.setStorageSync('userid', o.data.msg.wxUserId);
            wx.setStorageSync('unionid', o.data.msg.unionid);
            wx.setStorageSync('phone', o.data.msg.phone);
          });
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  /*** 获取用户的信息 */
  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        lang: "zh_CN",
        desc: "展示用户信息",
        success: (res) => {
          resolve(res);
        },
        fail: (error) => {
          try {
            reject(error);
          } catch (err) {
            console.log(err);
          }
        }
      })
    })
  },
  getPhone(e) {
    return new Promise((resolve, reject) => {
      this.___getPhone().then(o => {
        fn.post('auth/getPhone', {
          code: o,
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData
        }).then(endValue => {
          resolve(endValue);
        }).catch((endErr) => {
          reject(endErr);
        });
      });
    });
  },
  ___getPhone() {
    return new Promise((resolve, reject) => {
      wx.login({
        timeout: 1200,
        success(res) {
          if (res.code) {
            resolve(res.code);
          }
        },
        fail(err) {
          reject(err);
        }
      });
    });
  },
  loginOr(o) {
    config.nest = o.currentTarget.dataset.u;
    if (config.phone == '')
      fn.goto(`/pages/login/loginHome/login`);
    else
      fn.goto(o);
  },
};
export default user;