module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1629944172383, function(require, module, exports) {


var fs        =  require('graceful-fs')
  , path      =  require('path')
  , micromatch =  require('micromatch').isMatch
  , toString  =  Object.prototype.toString
  ;


// Standard helpers
function isFunction (obj) {
  return toString.call(obj) === '[object Function]';
}

function isString (obj) {
  return toString.call(obj) === '[object String]';
}

function isUndefined (obj) {
  return obj === void 0;
}

/**
 * Main function which ends up calling readdirRec and reads all files and directories in given root recursively.
 * @param { Object }   opts     Options to specify root (start directory), filters and recursion depth
 * @param { function } callback1  When callback2 is given calls back for each processed file - function (fileInfo) { ... },
 *                                when callback2 is not given, it behaves like explained in callback2
 * @param { function } callback2  Calls back once all files have been processed with an array of errors and file infos
 *                                function (err, fileInfos) { ... }
 */
function readdir(opts, callback1, callback2) {
  var stream
    , handleError
    , handleFatalError
    , errors = []
    , readdirResult = {
        directories: []
      , files: []
    }
    , fileProcessed
    , allProcessed
    , realRoot
    , aborted = false
    , paused = false
    ;

  // If no callbacks were given we will use a streaming interface
  if (isUndefined(callback1)) {
    var api          =  require('./stream-api')();
    stream           =  api.stream;
    callback1        =  api.processEntry;
    callback2        =  api.done;
    handleError      =  api.handleError;
    handleFatalError =  api.handleFatalError;

    stream.on('close', function () { aborted = true; });
    stream.on('pause', function () { paused = true; });
    stream.on('resume', function () { paused = false; });
  } else {
    handleError      =  function (err) { errors.push(err); };
    handleFatalError =  function (err) {
      handleError(err);
      allProcessed(errors, null);
    };
  }

  if (isUndefined(opts)){
    handleFatalError(new Error (
      'Need to pass at least one argument: opts! \n' +
      'https://github.com/paulmillr/readdirp#options'
      )
    );
    return stream;
  }

  opts.root            =  opts.root            || '.';
  opts.fileFilter      =  opts.fileFilter      || function() { return true; };
  opts.directoryFilter =  opts.directoryFilter || function() { return true; };
  opts.depth           =  typeof opts.depth === 'undefined' ? 999999999 : opts.depth;
  opts.entryType       =  opts.entryType       || 'files';

  var statfn = opts.lstat === true ? fs.lstat.bind(fs) : fs.stat.bind(fs);

  if (isUndefined(callback2)) {
    fileProcessed = function() { };
    allProcessed = callback1;
  } else {
    fileProcessed = callback1;
    allProcessed = callback2;
  }

  function normalizeFilter (filter) {

    if (isUndefined(filter)) return undefined;

    function isNegated (filters) {

      function negated(f) {
        return f.indexOf('!') === 0;
      }

      var some = filters.some(negated);
      if (!some) {
        return false;
      } else {
        if (filters.every(negated)) {
          return true;
        } else {
          // if we detect illegal filters, bail out immediately
          throw new Error(
            'Cannot mix negated with non negated glob filters: ' + filters + '\n' +
            'https://github.com/paulmillr/readdirp#filters'
          );
        }
      }
    }

    // Turn all filters into a function
    if (isFunction(filter)) {

      return filter;

    } else if (isString(filter)) {

      return function (entryInfo) {
        return micromatch(entryInfo.name, filter.trim());
      };

    } else if (filter && Array.isArray(filter)) {

      if (filter) filter = filter.map(function (f) {
        return f.trim();
      });

      return isNegated(filter) ?
        // use AND to concat multiple negated filters
        function (entryInfo) {
          return filter.every(function (f) {
            return micromatch(entryInfo.name, f);
          });
        }
        :
        // use OR to concat multiple inclusive filters
        function (entryInfo) {
          return filter.some(function (f) {
            return micromatch(entryInfo.name, f);
          });
        };
    }
  }

  function processDir(currentDir, entries, callProcessed) {
    if (aborted) return;
    var total = entries.length
      , processed = 0
      , entryInfos = []
      ;

    fs.realpath(currentDir, function(err, realCurrentDir) {
      if (aborted) return;
      if (err) {
        handleError(err);
        callProcessed(entryInfos);
        return;
      }

      var relDir = path.relative(realRoot, realCurrentDir);

      if (entries.length === 0) {
        callProcessed([]);
      } else {
        entries.forEach(function (entry) {

          var fullPath = path.join(realCurrentDir, entry)
            , relPath  = path.join(relDir, entry);

          statfn(fullPath, function (err, stat) {
            if (err) {
              handleError(err);
            } else {
              entryInfos.push({
                  name          :  entry
                , path          :  relPath   // relative to root
                , fullPath      :  fullPath

                , parentDir     :  relDir    // relative to root
                , fullParentDir :  realCurrentDir

                , stat          :  stat
              });
            }
            processed++;
            if (processed === total) callProcessed(entryInfos);
          });
        });
      }
    });
  }

  function readdirRec(currentDir, depth, callCurrentDirProcessed) {
    var args = arguments;
    if (aborted) return;
    if (paused) {
      setImmediate(function () {
        readdirRec.apply(null, args);
      })
      return;
    }

    fs.readdir(currentDir, function (err, entries) {
      if (err) {
        handleError(err);
        callCurrentDirProcessed();
        return;
      }

      processDir(currentDir, entries, function(entryInfos) {

        var subdirs = entryInfos
          .filter(function (ei) { return ei.stat.isDirectory() && opts.directoryFilter(ei); });

        subdirs.forEach(function (di) {
          if(opts.entryType === 'directories' || opts.entryType === 'both' || opts.entryType === 'all') {
            fileProcessed(di);
          }
          readdirResult.directories.push(di);
        });

        entryInfos
          .filter(function(ei) {
            var isCorrectType = opts.entryType === 'all' ?
              !ei.stat.isDirectory() : ei.stat.isFile() || ei.stat.isSymbolicLink();
            return isCorrectType && opts.fileFilter(ei);
          })
          .forEach(function (fi) {
            if(opts.entryType === 'files' || opts.entryType === 'both' || opts.entryType === 'all') {
              fileProcessed(fi);
            }
            readdirResult.files.push(fi);
          });

        var pendingSubdirs = subdirs.length;

        // Be done if no more subfolders exist or we reached the maximum desired depth
        if(pendingSubdirs === 0 || depth === opts.depth) {
          callCurrentDirProcessed();
        } else {
          // recurse into subdirs, keeping track of which ones are done
          // and call back once all are processed
          subdirs.forEach(function (subdir) {
            readdirRec(subdir.fullPath, depth + 1, function () {
              pendingSubdirs = pendingSubdirs - 1;
              if(pendingSubdirs === 0) {
                callCurrentDirProcessed();
              }
            });
          });
        }
      });
    });
  }

  // Validate and normalize filters
  try {
    opts.fileFilter = normalizeFilter(opts.fileFilter);
    opts.directoryFilter = normalizeFilter(opts.directoryFilter);
  } catch (err) {
    // if we detect illegal filters, bail out immediately
    handleFatalError(err);
    return stream;
  }

  // If filters were valid get on with the show
  fs.realpath(opts.root, function(err, res) {
    if (err) {
      handleFatalError(err);
      return stream;
    }

    realRoot = res;
    readdirRec(opts.root, 0, function () {
      // All errors are collected into the errors array
      if (errors.length > 0) {
        allProcessed(errors, readdirResult);
      } else {
        allProcessed(null, readdirResult);
      }
    });
  });

  return stream;
}

module.exports = readdir;

}, function(modId) {var map = {"./stream-api":1629944172384}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629944172384, function(require, module, exports) {


var stream = require('readable-stream');
var util = require('util');

var Readable = stream.Readable;

module.exports = ReaddirpReadable;

util.inherits(ReaddirpReadable, Readable);

function ReaddirpReadable (opts) {
  if (!(this instanceof ReaddirpReadable)) return new ReaddirpReadable(opts);

  opts = opts || {};

  opts.objectMode = true;
  Readable.call(this, opts);

  // backpressure not implemented at this point
  this.highWaterMark = Infinity;

  this._destroyed = false;
  this._paused = false;
  this._warnings = [];
  this._errors = [];

  this._pauseResumeErrors();
}

var proto = ReaddirpReadable.prototype;

proto._pauseResumeErrors = function () {
  var self = this;
  self.on('pause', function () { self._paused = true });
  self.on('resume', function () {
    if (self._destroyed) return;
    self._paused = false;

    self._warnings.forEach(function (err) { self.emit('warn', err) });
    self._warnings.length = 0;

    self._errors.forEach(function (err) { self.emit('error', err) });
    self._errors.length = 0;
  })
}

// called for each entry
proto._processEntry = function (entry) {
  if (this._destroyed) return;
  this.push(entry);
}

proto._read = function () { }

proto.destroy = function () {
  // when stream is destroyed it will emit nothing further, not even errors or warnings
  this.push(null);
  this.readable = false;
  this._destroyed = true;
  this.emit('close');
}

proto._done = function () {
  this.push(null);
}

// we emit errors and warnings async since we may handle errors like invalid args
// within the initial event loop before any event listeners subscribed
proto._handleError = function (err) {
  var self = this;
  setImmediate(function () {
    if (self._paused) return self._warnings.push(err);
    if (!self._destroyed) self.emit('warn', err);
  });
}

proto._handleFatalError = function (err) {
  var self = this;
  setImmediate(function () {
    if (self._paused) return self._errors.push(err);
    if (!self._destroyed) self.emit('error', err);
  });
}

function createStreamAPI () {
  var stream = new ReaddirpReadable();

  return {
      stream           :  stream
    , processEntry     :  stream._processEntry.bind(stream)
    , done             :  stream._done.bind(stream)
    , handleError      :  stream._handleError.bind(stream)
    , handleFatalError :  stream._handleFatalError.bind(stream)
  };
}

module.exports = createStreamAPI;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1629944172383);
})()
//miniprogram-npm-outsideDeps=["graceful-fs","path","micromatch","readable-stream","util"]
//# sourceMappingURL=index.js.map