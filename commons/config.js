/**
 * 本文件是小程序的数据配置文件，方便更改所有数据
 * 
 */
const domain = 'https://420l275795.zicp.fun/';
const windowHeight = wx.getSystemInfoSync().windowHeight
const windowWidth= wx.getSystemInfoSync().windowWidth
const config = {
     // domain: 'http://192.168.199.144:8088/applet/',
     /** 普通的请求接口的地址 */
     domain: domain + 'applet/',
     /** 支付的接口地址 */
     payDomin: domain + 'payment/',
     /** 获取 im 的 userSig */
     imDomin: domain + 'applet/tencentIm/getUserSig',
     /** 用户的 id */
     userid: '',
     /*** 用户生成的 userSig */
     userSig: '',
     /** 用户的手机号，用于判断是否需要台哦到登录接口 */
     phone: '',
     /** 由于需要设置的中间页面，这是下一个页面的路由 */
     nest: '',
     SDKAppID: 1400571510, //im id 即时通信 SDKAppID
     // SDKAppID: 1400560194, //im id 即时通信 SDKAppID
     imSDKReady: false, // SDK 是否加载完毕
     windowHeight,
     windowWidth,
};
export default config;