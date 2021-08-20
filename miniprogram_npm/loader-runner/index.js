module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1629437952823, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var fs = require("fs");
var readFile = fs.readFile.bind(fs);
var loadLoader = require("./loadLoader");

function utf8BufferToString(buf) {
	var str = buf.toString("utf-8");
	if(str.charCodeAt(0) === 0xFEFF) {
		return str.substr(1);
	} else {
		return str;
	}
}

function splitQuery(req) {
	var i = req.indexOf("?");
	if(i < 0) return [req, ""];
	return [req.substr(0, i), req.substr(i)];
}

function dirname(path) {
	if(path === "/") return "/";
	var i = path.lastIndexOf("/");
	var j = path.lastIndexOf("\\");
	var i2 = path.indexOf("/");
	var j2 = path.indexOf("\\");
	var idx = i > j ? i : j;
	var idx2 = i > j ? i2 : j2;
	if(idx < 0) return path;
	if(idx === idx2) return path.substr(0, idx + 1);
	return path.substr(0, idx);
}

function createLoaderObject(loader) {
	var obj = {
		path: null,
		query: null,
		options: null,
		ident: null,
		normal: null,
		pitch: null,
		raw: null,
		data: null,
		pitchExecuted: false,
		normalExecuted: false
	};
	Object.defineProperty(obj, "request", {
		enumerable: true,
		get: function() {
			return obj.path + obj.query;
		},
		set: function(value) {
			if(typeof value === "string") {
				var splittedRequest = splitQuery(value);
				obj.path = splittedRequest[0];
				obj.query = splittedRequest[1];
				obj.options = undefined;
				obj.ident = undefined;
			} else {
				if(!value.loader)
					throw new Error("request should be a string or object with loader and object (" + JSON.stringify(value) + ")");
				obj.path = value.loader;
				obj.options = value.options;
				obj.ident = value.ident;
				if(obj.options === null)
					obj.query = "";
				else if(obj.options === undefined)
					obj.query = "";
				else if(typeof obj.options === "string")
					obj.query = "?" + obj.options;
				else if(obj.ident)
					obj.query = "??" + obj.ident;
				else if(typeof obj.options === "object" && obj.options.ident)
					obj.query = "??" + obj.options.ident;
				else
					obj.query = "?" + JSON.stringify(obj.options);
			}
		}
	});
	obj.request = loader;
	if(Object.preventExtensions) {
		Object.preventExtensions(obj);
	}
	return obj;
}

function runSyncOrAsync(fn, context, args, callback) {
	var isSync = true;
	var isDone = false;
	var isError = false; // internal error
	var reportedError = false;
	context.async = function async() {
		if(isDone) {
			if(reportedError) return; // ignore
			throw new Error("async(): The callback was already called.");
		}
		isSync = false;
		return innerCallback;
	};
	var innerCallback = context.callback = function() {
		if(isDone) {
			if(reportedError) return; // ignore
			throw new Error("callback(): The callback was already called.");
		}
		isDone = true;
		isSync = false;
		try {
			callback.apply(null, arguments);
		} catch(e) {
			isError = true;
			throw e;
		}
	};
	try {
		var result = (function LOADER_EXECUTION() {
			return fn.apply(context, args);
		}());
		if(isSync) {
			isDone = true;
			if(result === undefined)
				return callback();
			if(result && typeof result === "object" && typeof result.then === "function") {
				return result.then(function(r) {
					callback(null, r);
				}, callback);
			}
			return callback(null, result);
		}
	} catch(e) {
		if(isError) throw e;
		if(isDone) {
			// loader is already "done", so we cannot use the callback function
			// for better debugging we print the error on the console
			if(typeof e === "object" && e.stack) console.error(e.stack);
			else console.error(e);
			return;
		}
		isDone = true;
		reportedError = true;
		callback(e);
	}

}

function convertArgs(args, raw) {
	if(!raw && Buffer.isBuffer(args[0]))
		args[0] = utf8BufferToString(args[0]);
	else if(raw && typeof args[0] === "string")
		args[0] = new Buffer(args[0], "utf-8"); // eslint-disable-line
}

function iteratePitchingLoaders(options, loaderContext, callback) {
	// abort after last loader
	if(loaderContext.loaderIndex >= loaderContext.loaders.length)
		return processResource(options, loaderContext, callback);

	var currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];

	// iterate
	if(currentLoaderObject.pitchExecuted) {
		loaderContext.loaderIndex++;
		return iteratePitchingLoaders(options, loaderContext, callback);
	}

	// load loader module
	loadLoader(currentLoaderObject, function(err) {
		if(err) {
			loaderContext.cacheable(false);
			return callback(err);
		}
		var fn = currentLoaderObject.pitch;
		currentLoaderObject.pitchExecuted = true;
		if(!fn) return iteratePitchingLoaders(options, loaderContext, callback);

		runSyncOrAsync(
			fn,
			loaderContext, [loaderContext.remainingRequest, loaderContext.previousRequest, currentLoaderObject.data = {}],
			function(err) {
				if(err) return callback(err);
				var args = Array.prototype.slice.call(arguments, 1);
				if(args.length > 0) {
					loaderContext.loaderIndex--;
					iterateNormalLoaders(options, loaderContext, args, callback);
				} else {
					iteratePitchingLoaders(options, loaderContext, callback);
				}
			}
		);
	});
}

function processResource(options, loaderContext, callback) {
	// set loader index to last loader
	loaderContext.loaderIndex = loaderContext.loaders.length - 1;

	var resourcePath = loaderContext.resourcePath;
	if(resourcePath) {
		loaderContext.addDependency(resourcePath);
		options.readResource(resourcePath, function(err, buffer) {
			if(err) return callback(err);
			options.resourceBuffer = buffer;
			iterateNormalLoaders(options, loaderContext, [buffer], callback);
		});
	} else {
		iterateNormalLoaders(options, loaderContext, [null], callback);
	}
}

function iterateNormalLoaders(options, loaderContext, args, callback) {
	if(loaderContext.loaderIndex < 0)
		return callback(null, args);

	var currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];

	// iterate
	if(currentLoaderObject.normalExecuted) {
		loaderContext.loaderIndex--;
		return iterateNormalLoaders(options, loaderContext, args, callback);
	}

	var fn = currentLoaderObject.normal;
	currentLoaderObject.normalExecuted = true;
	if(!fn) {
		return iterateNormalLoaders(options, loaderContext, args, callback);
	}

	convertArgs(args, currentLoaderObject.raw);

	runSyncOrAsync(fn, loaderContext, args, function(err) {
		if(err) return callback(err);

		var args = Array.prototype.slice.call(arguments, 1);
		iterateNormalLoaders(options, loaderContext, args, callback);
	});
}

exports.getContext = function getContext(resource) {
	var splitted = splitQuery(resource);
	return dirname(splitted[0]);
};

exports.runLoaders = function runLoaders(options, callback) {
	// read options
	var resource = options.resource || "";
	var loaders = options.loaders || [];
	var loaderContext = options.context || {};
	var readResource = options.readResource || readFile;

	//
	var splittedResource = resource && splitQuery(resource);
	var resourcePath = splittedResource ? splittedResource[0] : undefined;
	var resourceQuery = splittedResource ? splittedResource[1] : undefined;
	var contextDirectory = resourcePath ? dirname(resourcePath) : null;

	// execution state
	var requestCacheable = true;
	var fileDependencies = [];
	var contextDependencies = [];

	// prepare loader objects
	loaders = loaders.map(createLoaderObject);

	loaderContext.context = contextDirectory;
	loaderContext.loaderIndex = 0;
	loaderContext.loaders = loaders;
	loaderContext.resourcePath = resourcePath;
	loaderContext.resourceQuery = resourceQuery;
	loaderContext.async = null;
	loaderContext.callback = null;
	loaderContext.cacheable = function cacheable(flag) {
		if(flag === false) {
			requestCacheable = false;
		}
	};
	loaderContext.dependency = loaderContext.addDependency = function addDependency(file) {
		fileDependencies.push(file);
	};
	loaderContext.addContextDependency = function addContextDependency(context) {
		contextDependencies.push(context);
	};
	loaderContext.getDependencies = function getDependencies() {
		return fileDependencies.slice();
	};
	loaderContext.getContextDependencies = function getContextDependencies() {
		return contextDependencies.slice();
	};
	loaderContext.clearDependencies = function clearDependencies() {
		fileDependencies.length = 0;
		contextDependencies.length = 0;
		requestCacheable = true;
	};
	Object.defineProperty(loaderContext, "resource", {
		enumerable: true,
		get: function() {
			if(loaderContext.resourcePath === undefined)
				return undefined;
			return loaderContext.resourcePath + loaderContext.resourceQuery;
		},
		set: function(value) {
			var splittedResource = value && splitQuery(value);
			loaderContext.resourcePath = splittedResource ? splittedResource[0] : undefined;
			loaderContext.resourceQuery = splittedResource ? splittedResource[1] : undefined;
		}
	});
	Object.defineProperty(loaderContext, "request", {
		enumerable: true,
		get: function() {
			return loaderContext.loaders.map(function(o) {
				return o.request;
			}).concat(loaderContext.resource || "").join("!");
		}
	});
	Object.defineProperty(loaderContext, "remainingRequest", {
		enumerable: true,
		get: function() {
			if(loaderContext.loaderIndex >= loaderContext.loaders.length - 1 && !loaderContext.resource)
				return "";
			return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(function(o) {
				return o.request;
			}).concat(loaderContext.resource || "").join("!");
		}
	});
	Object.defineProperty(loaderContext, "currentRequest", {
		enumerable: true,
		get: function() {
			return loaderContext.loaders.slice(loaderContext.loaderIndex).map(function(o) {
				return o.request;
			}).concat(loaderContext.resource || "").join("!");
		}
	});
	Object.defineProperty(loaderContext, "previousRequest", {
		enumerable: true,
		get: function() {
			return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(function(o) {
				return o.request;
			}).join("!");
		}
	});
	Object.defineProperty(loaderContext, "query", {
		enumerable: true,
		get: function() {
			var entry = loaderContext.loaders[loaderContext.loaderIndex];
			return entry.options && typeof entry.options === "object" ? entry.options : entry.query;
		}
	});
	Object.defineProperty(loaderContext, "data", {
		enumerable: true,
		get: function() {
			return loaderContext.loaders[loaderContext.loaderIndex].data;
		}
	});

	// finish loader context
	if(Object.preventExtensions) {
		Object.preventExtensions(loaderContext);
	}

	var processOptions = {
		resourceBuffer: null,
		readResource: readResource
	};
	iteratePitchingLoaders(processOptions, loaderContext, function(err, result) {
		if(err) {
			return callback(err, {
				cacheable: requestCacheable,
				fileDependencies: fileDependencies,
				contextDependencies: contextDependencies
			});
		}
		callback(null, {
			result: result,
			resourceBuffer: processOptions.resourceBuffer,
			cacheable: requestCacheable,
			fileDependencies: fileDependencies,
			contextDependencies: contextDependencies
		});
	});
};

}, function(modId) {var map = {"./loadLoader":1629437952824}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952824, function(require, module, exports) {
var LoaderLoadingError = require("./LoaderLoadingError");

module.exports = function loadLoader(loader, callback) {
	if(typeof System === "object" && typeof System.import === "function") {
		System.import(loader.path).catch(callback).then(function(module) {
			loader.normal = typeof module === "function" ? module : module.default;
			loader.pitch = module.pitch;
			loader.raw = module.raw;
			if(typeof loader.normal !== "function" && typeof loader.pitch !== "function") {
				return callback(new LoaderLoadingError(
					"Module '" + loader.path + "' is not a loader (must have normal or pitch function)"
				));
			}
			callback();
		});
	} else {
		try {
			var module = require(loader.path);
		} catch(e) {
			// it is possible for node to choke on a require if the FD descriptor
			// limit has been reached. give it a chance to recover.
			if(e instanceof Error && e.code === "EMFILE") {
				var retry = loadLoader.bind(null, loader, callback);
				if(typeof setImmediate === "function") {
					// node >= 0.9.0
					return setImmediate(retry);
				} else {
					// node < 0.9.0
					return process.nextTick(retry);
				}
			}
			return callback(e);
		}
		if(typeof module !== "function" && typeof module !== "object") {
			return callback(new LoaderLoadingError(
				"Module '" + loader.path + "' is not a loader (export function or es6 module)"
			));
		}
		loader.normal = typeof module === "function" ? module : module.default;
		loader.pitch = module.pitch;
		loader.raw = module.raw;
		if(typeof loader.normal !== "function" && typeof loader.pitch !== "function") {
			return callback(new LoaderLoadingError(
				"Module '" + loader.path + "' is not a loader (must have normal or pitch function)"
			));
		}
		callback();
	}
};

}, function(modId) { var map = {"./LoaderLoadingError":1629437952825}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952825, function(require, module, exports) {


class LoadingLoaderError extends Error {
	constructor(message) {
		super(message);
		this.name = "LoaderRunnerError";
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = LoadingLoaderError;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1629437952823);
})()
//miniprogram-npm-outsideDeps=["fs"]
//# sourceMappingURL=index.js.map