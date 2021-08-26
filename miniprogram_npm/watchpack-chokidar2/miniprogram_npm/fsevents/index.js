module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1629944172377, function(require, module, exports) {
/*
 ** © 2014 by Philipp Dunkel <pip@pipobscure.com>
 ** Licensed under MIT License.
 */

/* jshint node:true */


if (process.platform !== 'darwin')
  throw new Error('Module \'fsevents\' is not compatible with platform \'' + process.platform + '\'');

var Native = require("bindings")("fse");

var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var inherits = require('util').inherits;

function FSEvents(path, handler) {
  EventEmitter.call(this);

  Object.defineProperty(this, '_impl', {
    value: new Native.FSEvents(String(path || ''), handler),
    enumerable: false,
    writable: false
  });
}

inherits(FSEvents, EventEmitter);
proxies(FSEvents, Native.FSEvents);

module.exports = watch;
module.exports.getInfo = getInfo;
module.exports.FSEvents = Native.FSEvents;
module.exports.Constants = Native.Constants;

var defer = global.setImmediate || process.nextTick;

function watch(path) {
  var fse = new FSEvents(String(path || ''), handler);
  EventEmitter.call(fse);
  return fse;

  function handler(path, flags, id) {
    defer(function() {
      fse.emit('fsevent', path, flags, id);
      var info = getInfo(path, flags);
      info.id = id;
      if (info.event === 'moved') {
        fs.stat(info.path, function(err, stat) {
          info.event = (err || !stat) ? 'moved-out' : 'moved-in';
          fse.emit('change', path, info);
          fse.emit(info.event, path, info);
        });
      } else {
        fse.emit('change', path, info);
        fse.emit(info.event, path, info);
      }
    });
  }
}

function proxies(ctor, target) {
  Object.keys(target.prototype).filter(function(key) {
    return typeof target.prototype[key] === 'function';
  }).forEach(function(key) {
    ctor.prototype[key] = function() {
      this._impl[key].apply(this._impl, arguments);
      return this;
    }
  });
}

function getFileType(flags) {
  if (Native.Constants.kFSEventStreamEventFlagItemIsFile & flags) return 'file';
  if (Native.Constants.kFSEventStreamEventFlagItemIsDir & flags) return 'directory';
  if (Native.Constants.kFSEventStreamEventFlagItemIsSymlink & flags) return 'symlink';
}

function getEventType(flags) {
  if (Native.Constants.kFSEventStreamEventFlagItemRemoved & flags) return 'deleted';
  if (Native.Constants.kFSEventStreamEventFlagItemRenamed & flags) return 'moved';
  if (Native.Constants.kFSEventStreamEventFlagItemCreated & flags) return 'created';
  if (Native.Constants.kFSEventStreamEventFlagItemModified & flags) return 'modified';
  if (Native.Constants.kFSEventStreamEventFlagRootChanged & flags) return 'root-changed';

  return 'unknown';
}

function getFileChanges(flags) {
  return {
    inode: !! (Native.Constants.kFSEventStreamEventFlagItemInodeMetaMod & flags),
    finder: !! (Native.Constants.kFSEventStreamEventFlagItemFinderInfoMod & flags),
    access: !! (Native.Constants.kFSEventStreamEventFlagItemChangeOwner & flags),
    xattrs: !! (Native.Constants.kFSEventStreamEventFlagItemXattrMod & flags)
  };
}

function getInfo(path, flags) {
  return {
    path: path,
    event: getEventType(flags),
    type: getFileType(flags),
    changes: getFileChanges(flags),
    flags: flags
  };
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1629944172377);
})()
//miniprogram-npm-outsideDeps=["bindings","events","fs","util"]
//# sourceMappingURL=index.js.map