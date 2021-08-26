module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1629944172165, function(require, module, exports) {
var native = require('crypto')

var checkParameters = require('./lib/precondition')
var defaultEncoding = require('./lib/default-encoding')
var toBuffer = require('./lib/to-buffer')

function nativePBKDF2 (password, salt, iterations, keylen, digest, callback) {
  checkParameters(iterations, keylen)
  password = toBuffer(password, defaultEncoding, 'Password')
  salt = toBuffer(salt, defaultEncoding, 'Salt')

  if (typeof digest === 'function') {
    callback = digest
    digest = 'sha1'
  }
  if (typeof callback !== 'function') throw new Error('No callback provided to pbkdf2')

  return native.pbkdf2(password, salt, iterations, keylen, digest, callback)
}

function nativePBKDF2Sync (password, salt, iterations, keylen, digest) {
  checkParameters(iterations, keylen)
  password = toBuffer(password, defaultEncoding, 'Password')
  salt = toBuffer(salt, defaultEncoding, 'Salt')
  digest = digest || 'sha1'
  return native.pbkdf2Sync(password, salt, iterations, keylen, digest)
}

/* istanbul ignore next */
if (!native.pbkdf2Sync || native.pbkdf2Sync.toString().indexOf('keylen, digest') === -1) {
  exports.pbkdf2Sync = require('./lib/sync')
  exports.pbkdf2 = require('./lib/async')

// native
} else {
  exports.pbkdf2Sync = nativePBKDF2Sync
  exports.pbkdf2 = nativePBKDF2
}

}, function(modId) {var map = {"./lib/precondition":1629944172166,"./lib/default-encoding":1629944172167,"./lib/to-buffer":1629944172168,"./lib/sync":1629944172169,"./lib/async":1629944172170}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629944172166, function(require, module, exports) {
var MAX_ALLOC = Math.pow(2, 30) - 1 // default in iojs

module.exports = function (iterations, keylen) {
  if (typeof iterations !== 'number') {
    throw new TypeError('Iterations not a number')
  }

  if (iterations < 0) {
    throw new TypeError('Bad iterations')
  }

  if (typeof keylen !== 'number') {
    throw new TypeError('Key length not a number')
  }

  if (keylen < 0 || keylen > MAX_ALLOC || keylen !== keylen) { /* eslint no-self-compare: 0 */
    throw new TypeError('Bad key length')
  }
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629944172167, function(require, module, exports) {
var defaultEncoding
/* istanbul ignore next */
if (global.process && global.process.browser) {
  defaultEncoding = 'utf-8'
} else if (global.process && global.process.version) {
  var pVersionMajor = parseInt(process.version.split('.')[0].slice(1), 10)

  defaultEncoding = pVersionMajor >= 6 ? 'utf-8' : 'binary'
} else {
  defaultEncoding = 'utf-8'
}
module.exports = defaultEncoding

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629944172168, function(require, module, exports) {
var Buffer = require('safe-buffer').Buffer

module.exports = function (thing, encoding, name) {
  if (Buffer.isBuffer(thing)) {
    return thing
  } else if (typeof thing === 'string') {
    return Buffer.from(thing, encoding)
  } else if (ArrayBuffer.isView(thing)) {
    return Buffer.from(thing.buffer)
  } else {
    throw new TypeError(name + ' must be a string, a Buffer, a typed array or a DataView')
  }
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629944172169, function(require, module, exports) {
var sizes = {
  md5: 16,
  sha1: 20,
  sha224: 28,
  sha256: 32,
  sha384: 48,
  sha512: 64,
  rmd160: 20,
  ripemd160: 20
}

var createHmac = require('create-hmac')
var Buffer = require('safe-buffer').Buffer

var checkParameters = require('./precondition')
var defaultEncoding = require('./default-encoding')
var toBuffer = require('./to-buffer')

function pbkdf2 (password, salt, iterations, keylen, digest) {
  checkParameters(iterations, keylen)
  password = toBuffer(password, defaultEncoding, 'Password')
  salt = toBuffer(salt, defaultEncoding, 'Salt')

  digest = digest || 'sha1'

  var DK = Buffer.allocUnsafe(keylen)
  var block1 = Buffer.allocUnsafe(salt.length + 4)
  salt.copy(block1, 0, 0, salt.length)

  var destPos = 0
  var hLen = sizes[digest]
  var l = Math.ceil(keylen / hLen)

  for (var i = 1; i <= l; i++) {
    block1.writeUInt32BE(i, salt.length)

    var T = createHmac(digest, password).update(block1).digest()
    var U = T

    for (var j = 1; j < iterations; j++) {
      U = createHmac(digest, password).update(U).digest()
      for (var k = 0; k < hLen; k++) T[k] ^= U[k]
    }

    T.copy(DK, destPos)
    destPos += hLen
  }

  return DK
}

module.exports = pbkdf2

}, function(modId) { var map = {"./precondition":1629944172166,"./default-encoding":1629944172167,"./to-buffer":1629944172168}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629944172170, function(require, module, exports) {
var Buffer = require('safe-buffer').Buffer

var checkParameters = require('./precondition')
var defaultEncoding = require('./default-encoding')
var sync = require('./sync')
var toBuffer = require('./to-buffer')

var ZERO_BUF
var subtle = global.crypto && global.crypto.subtle
var toBrowser = {
  sha: 'SHA-1',
  'sha-1': 'SHA-1',
  sha1: 'SHA-1',
  sha256: 'SHA-256',
  'sha-256': 'SHA-256',
  sha384: 'SHA-384',
  'sha-384': 'SHA-384',
  'sha-512': 'SHA-512',
  sha512: 'SHA-512'
}
var checks = []
function checkNative (algo) {
  if (global.process && !global.process.browser) {
    return Promise.resolve(false)
  }
  if (!subtle || !subtle.importKey || !subtle.deriveBits) {
    return Promise.resolve(false)
  }
  if (checks[algo] !== undefined) {
    return checks[algo]
  }
  ZERO_BUF = ZERO_BUF || Buffer.alloc(8)
  var prom = browserPbkdf2(ZERO_BUF, ZERO_BUF, 10, 128, algo)
    .then(function () {
      return true
    }).catch(function () {
      return false
    })
  checks[algo] = prom
  return prom
}
var nextTick
function getNextTick () {
  if (nextTick) {
    return nextTick
  }
  if (global.process && global.process.nextTick) {
    nextTick = global.process.nextTick
  } else if (global.queueMicrotask) {
    nextTick = global.queueMicrotask
  } else if (global.setImmediate) {
    nextTick = global.setImmediate
  } else {
    nextTick = global.setTimeout
  }
  return nextTick
}
function browserPbkdf2 (password, salt, iterations, length, algo) {
  return subtle.importKey(
    'raw', password, { name: 'PBKDF2' }, false, ['deriveBits']
  ).then(function (key) {
    return subtle.deriveBits({
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: {
        name: algo
      }
    }, key, length << 3)
  }).then(function (res) {
    return Buffer.from(res)
  })
}

function resolvePromise (promise, callback) {
  promise.then(function (out) {
    getNextTick()(function () {
      callback(null, out)
    })
  }, function (e) {
    getNextTick()(function () {
      callback(e)
    })
  })
}
module.exports = function (password, salt, iterations, keylen, digest, callback) {
  if (typeof digest === 'function') {
    callback = digest
    digest = undefined
  }

  digest = digest || 'sha1'
  var algo = toBrowser[digest.toLowerCase()]

  if (!algo || typeof global.Promise !== 'function') {
    getNextTick()(function () {
      var out
      try {
        out = sync(password, salt, iterations, keylen, digest)
      } catch (e) {
        return callback(e)
      }
      callback(null, out)
    })
    return
  }

  checkParameters(iterations, keylen)
  password = toBuffer(password, defaultEncoding, 'Password')
  salt = toBuffer(salt, defaultEncoding, 'Salt')
  if (typeof callback !== 'function') throw new Error('No callback provided to pbkdf2')

  resolvePromise(checkNative(algo).then(function (resp) {
    if (resp) return browserPbkdf2(password, salt, iterations, keylen, algo)

    return sync(password, salt, iterations, keylen, digest)
  }), callback)
}

}, function(modId) { var map = {"./precondition":1629944172166,"./default-encoding":1629944172167,"./sync":1629944172169,"./to-buffer":1629944172168}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1629944172165);
})()
//miniprogram-npm-outsideDeps=["crypto","safe-buffer","create-hmac"]
//# sourceMappingURL=index.js.map