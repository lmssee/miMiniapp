import config from './config.js';
/***
 *  该文件是由腾讯提供的测试生成 UserSig 文件
 *  用于不使用后端的情况下获取 UserSig
 *  该文件仅在测试版本下引入
 */
global.webpackJsonpMpvue([19],{
  /***/ "dutN":
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  "use strict";
  /* harmony export (binding) */ 
  __webpack_require__.d(__webpack_exports__, "a", function() { return _SDKAPPID; });
  /* harmony export (binding) */
   __webpack_require__.d(__webpack_exports__, "b", function() { return genTestUserSig; });
  /* harmony import */ 
  var __WEBPACK_IMPORTED_MODULE_0__lib_generate_test_usersig_es_min_js__ = __webpack_require__("n7IX");
  /*eslint-disable*/
  const _SDKAPPID = 0;
  const _SECRETKEY = '';
 
  function genTestUserSig(userID) {
    var SDKAPPID = _SDKAPPID;
    /**
     * 签名过期时间，建议不要设置的过短
     * <p>
     * 时间单位：秒
     * 默认时间：7 x 24 x 60 x 60 = 604800 = 7 天
     */
    var EXPIRETIME = 604800;
    var SECRETKEY = config.IMkey;
    var generator = new __WEBPACK_IMPORTED_MODULE_0__lib_generate_test_usersig_es_min_js__["a" /* default */](SDKAPPID, SECRETKEY, EXPIRETIME);
    var userSig = generator.genTestUserSig(userID);
    return {
      sdkappid: SDKAPPID,
      userSig: userSig
    };
  }
  /***/ })
  });