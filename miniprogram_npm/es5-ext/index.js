module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1629437952299, function(require, module, exports) {


module.exports = {
	global: require("./global"),
	optionalChaining: require("./optional-chaining"),
	safeToString: require("./safe-to-string"),
	toShortStringRepresentation: require("./to-short-string-representation"),

	array: require("./array"),
	boolean: require("./boolean"),
	date: require("./date"),
	error: require("./error"),
	function: require("./function"),
	iterable: require("./iterable"),
	json: require("./json"),
	math: require("./math"),
	number: require("./number"),
	object: require("./object"),
	promise: require("./promise"),
	regExp: require("./reg-exp"),
	string: require("./string")
};

}, function(modId) {var map = {"./global":1629437952300,"./optional-chaining":1629437952301,"./safe-to-string":1629437952304,"./to-short-string-representation":1629437952306,"./array":1629437952307,"./boolean":1629437952408,"./date":1629437952410,"./error":1629437952428,"./function":1629437952440,"./iterable":1629437952459,"./json":1629437952464,"./math":1629437952469,"./number":1629437952529,"./object":1629437952543,"./promise":1629437952595,"./reg-exp":1629437952602,"./string":1629437952620}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952300, function(require, module, exports) {
var naiveFallback = function () {
	if (typeof self === "object" && self) return self;
	if (typeof window === "object" && window) return window;
	throw new Error("Unable to resolve global `this`");
};

module.exports = (function () {
	if (this) return this;

	// Unexpected strict mode (may happen if e.g. bundled into ESM module)

	// Fallback to standard globalThis if available
	if (typeof globalThis === "object" && globalThis) return globalThis;

	// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
	// In all ES5+ engines global object inherits from Object.prototype
	// (if you approached one that doesn't please report)
	try {
		Object.defineProperty(Object.prototype, "__global__", {
			get: function () { return this; },
			configurable: true
		});
	} catch (error) {
		// Unfortunate case of updates to Object.prototype being restricted
		// via preventExtensions, seal or freeze
		return naiveFallback();
	}
	try {
		// Safari case (window.__global__ works, but __global__ does not)
		if (!__global__) return naiveFallback();
		return __global__;
	} finally {
		delete Object.prototype.__global__;
	}
})();

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952301, function(require, module, exports) {


var isValue = require("./object/is-value");

var slice = Array.prototype.slice;

// eslint-disable-next-line no-unused-vars
module.exports = function (value, propertyName1/*, …propertyNamen*/) {
	var propertyNames = slice.call(arguments, 1), index = 0, length = propertyNames.length;
	while (isValue(value) && index < length) value = value[propertyNames[index++]];
	return index === length ? value : undefined;
};

}, function(modId) { var map = {"./object/is-value":1629437952302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952302, function(require, module, exports) {


var _undefined = require("../function/noop")(); // Support ES3 engines

module.exports = function (val) { return val !== _undefined && val !== null; };

}, function(modId) { var map = {"../function/noop":1629437952303}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952303, function(require, module, exports) {


// eslint-disable-next-line no-empty-function
module.exports = function () {};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952304, function(require, module, exports) {


var isCallable = require("./object/is-callable");

module.exports = function (value) {
	try {
		if (value && isCallable(value.toString)) return value.toString();
		return String(value);
	} catch (e) {
		return "<Non-coercible to string value>";
	}
};

}, function(modId) { var map = {"./object/is-callable":1629437952305}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952305, function(require, module, exports) {
// Deprecated



module.exports = function (obj) { return typeof obj === "function"; };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952306, function(require, module, exports) {


var safeToString = require("./safe-to-string");

var reNewLine = /[\n\r\u2028\u2029]/g;

module.exports = function (value) {
	var string = safeToString(value);
	// Trim if too long
	if (string.length > 100) string = string.slice(0, 99) + "…";
	// Replace eventual new lines
	string = string.replace(reNewLine, function (char) {
		return JSON.stringify(char).slice(1, -1);
	});
	return string;
};

}, function(modId) { var map = {"./safe-to-string":1629437952304}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952307, function(require, module, exports) {


module.exports = {
	"#": require("./#"),
	"from": require("./from"),
	"generate": require("./generate"),
	"isPlainArray": require("./is-plain-array"),
	"of": require("./of"),
	"toArray": require("./to-array"),
	"validArray": require("./valid-array")
};

}, function(modId) { var map = {"./#":1629437952308,"./from":1629437952349,"./generate":1629437952403,"./is-plain-array":1629437952334,"./of":1629437952404,"./to-array":1629437952355,"./valid-array":1629437952407}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952308, function(require, module, exports) {


module.exports = {
	"@@iterator": require("./@@iterator"),
	"binarySearch": require("./binary-search"),
	"clear": require("./clear"),
	"compact": require("./compact"),
	"concat": require("./concat"),
	"contains": require("./contains"),
	"copyWithin": require("./copy-within"),
	"diff": require("./diff"),
	"eIndexOf": require("./e-index-of"),
	"eLastIndexOf": require("./e-last-index-of"),
	"entries": require("./entries"),
	"exclusion": require("./exclusion"),
	"fill": require("./fill"),
	"filter": require("./filter"),
	"find": require("./find"),
	"findIndex": require("./find-index"),
	"first": require("./first"),
	"firstIndex": require("./first-index"),
	"flatten": require("./flatten"),
	"forEachRight": require("./for-each-right"),
	"keys": require("./keys"),
	"group": require("./group"),
	"indexesOf": require("./indexes-of"),
	"intersection": require("./intersection"),
	"isCopy": require("./is-copy"),
	"isEmpty": require("./is-empty"),
	"isUniq": require("./is-uniq"),
	"last": require("./last"),
	"lastIndex": require("./last-index"),
	"map": require("./map"),
	"remove": require("./remove"),
	"separate": require("./separate"),
	"slice": require("./slice"),
	"someRight": require("./some-right"),
	"splice": require("./splice"),
	"uniq": require("./uniq"),
	"values": require("./values")
};

}, function(modId) { var map = {"./@@iterator":1629437952309,"./binary-search":1629437952313,"./clear":1629437952321,"./compact":1629437952322,"./concat":1629437952323,"./contains":1629437952335,"./copy-within":1629437952340,"./diff":1629437952343,"./e-index-of":1629437952336,"./e-last-index-of":1629437952344,"./entries":1629437952345,"./exclusion":1629437952348,"./fill":1629437952357,"./filter":1629437952360,"./find":1629437952363,"./find-index":1629437952367,"./first":1629437952369,"./first-index":1629437952370,"./flatten":1629437952371,"./for-each-right":1629437952372,"./keys":1629437952373,"./group":1629437952376,"./indexes-of":1629437952377,"./intersection":1629437952378,"./is-copy":1629437952379,"./is-empty":1629437952381,"./is-uniq":1629437952384,"./last":1629437952385,"./last-index":1629437952386,"./map":1629437952387,"./remove":1629437952391,"./separate":1629437952392,"./slice":1629437952393,"./some-right":1629437952396,"./splice":1629437952397,"./uniq":1629437952400,"./values":1629437952401}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952309, function(require, module, exports) {


module.exports = require("./is-implemented")()
	? Array.prototype[require("es6-symbol").iterator]
	: require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952310,"./shim":1629437952311}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952310, function(require, module, exports) {


var iteratorSymbol = require("es6-symbol").iterator;

module.exports = function () {
	var arr = ["foo", 1], iterator, result;
	if (typeof arr[iteratorSymbol] !== "function") return false;
	iterator = arr[iteratorSymbol]();
	if (!iterator) return false;
	if (typeof iterator.next !== "function") return false;
	result = iterator.next();
	if (!result) return false;
	if (result.value !== "foo") return false;
	if (result.done !== false) return false;
	return true;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952311, function(require, module, exports) {


module.exports = require("../values/shim");

}, function(modId) { var map = {"../values/shim":1629437952312}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952312, function(require, module, exports) {


var ArrayIterator = require("es6-iterator/array");
module.exports = function () { return new ArrayIterator(this, "value"); };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952313, function(require, module, exports) {


var toPosInt = require("../../number/to-pos-integer")
  , callable = require("../../object/valid-callable")
  , value    = require("../../object/valid-value")
  , floor    = Math.floor;

module.exports = function (compareFn) {
	var length, low, high, middle;

	value(this);
	callable(compareFn);

	length = toPosInt(this.length);
	low = 0;
	high = length - 1;

	while (low <= high) {
		middle = floor((low + high) / 2);
		if (compareFn(this[middle]) < 0) high = middle - 1;
		else low = middle + 1;
	}

	if (high < 0) return 0;
	if (high >= length) return length - 1;
	return high;
};

}, function(modId) { var map = {"../../number/to-pos-integer":1629437952314,"../../object/valid-callable":1629437952319,"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952314, function(require, module, exports) {


var toInteger = require("./to-integer")
  , max       = Math.max;

module.exports = function (value) { return max(0, toInteger(value)); };

}, function(modId) { var map = {"./to-integer":1629437952315}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952315, function(require, module, exports) {


var sign  = require("../math/sign")
  , abs   = Math.abs
  , floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if (value === 0 || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};

}, function(modId) { var map = {"../math/sign":1629437952316}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952316, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.sign : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952317,"./shim":1629437952318}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952317, function(require, module, exports) {


module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== "function") return false;
	return sign(10) === 1 && sign(-20) === -1;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952318, function(require, module, exports) {


module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || value === 0) return value;
	return value > 0 ? 1 : -1;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952319, function(require, module, exports) {


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952320, function(require, module, exports) {


var isValue = require("./is-value");

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};

}, function(modId) { var map = {"./is-value":1629437952302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952321, function(require, module, exports) {
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear



var value = require("../../object/valid-value");

module.exports = function () {
	value(this).length = 0;
	return this;
};

}, function(modId) { var map = {"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952322, function(require, module, exports) {
// Inspired by: http://documentcloud.github.com/underscore/#compact



var isValue = require("../../object/is-value");

var filter = Array.prototype.filter;

module.exports = function () {
	return filter.call(this, function (val) { return isValue(val); });
};

}, function(modId) { var map = {"../../object/is-value":1629437952302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952323, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Array.prototype.concat : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952324,"./shim":1629437952333}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952324, function(require, module, exports) {


var SubArray = require("../../_sub-array-dummy-safe");

module.exports = function () { return new SubArray().concat("foo") instanceof SubArray; };

}, function(modId) { var map = {"../../_sub-array-dummy-safe":1629437952325}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952325, function(require, module, exports) {


var setPrototypeOf = require("../object/set-prototype-of")
  , isExtensible   = require("./_is-extensible");

module.exports = (function () {
	var SubArray;

	if (isExtensible) return require("./_sub-array-dummy");

	if (!setPrototypeOf) return null;
	SubArray = function () {
		var arr = Array.apply(this, arguments);
		setPrototypeOf(arr, SubArray.prototype);
		return arr;
	};
	setPrototypeOf(SubArray, Array);
	SubArray.prototype = Object.create(Array.prototype, {
		constructor: { value: SubArray, enumerable: false, writable: true, configurable: true }
	});
	return SubArray;
})();

}, function(modId) { var map = {"../object/set-prototype-of":1629437952326,"./_is-extensible":1629437952331,"./_sub-array-dummy":1629437952332}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952326, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Object.setPrototypeOf : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952327,"./shim":1629437952328}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952327, function(require, module, exports) {


var create = Object.create, getPrototypeOf = Object.getPrototypeOf, plainObject = {};

module.exports = function (/* CustomCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf, customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== "function") return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), plainObject)) === plainObject;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952328, function(require, module, exports) {
/* eslint no-proto: "off" */

// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554



var isObject         = require("../is-object")
  , value            = require("../valid-value")
  , objIsPrototypeOf = Object.prototype.isPrototypeOf
  , defineProperty   = Object.defineProperty
  , nullDesc         = { configurable: true, enumerable: false, writable: true, value: undefined }
  , validate;

validate = function (obj, prototype) {
	value(obj);
	if (prototype === null || isObject(prototype)) return obj;
	throw new TypeError("Prototype must be null or an object");
};

module.exports = (function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = objIsPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, "__proto__", nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, "level", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: status.level
	});
})(
	(function () {
		var tmpObj1 = Object.create(null)
		  , tmpObj2 = {}
		  , set
		  , desc = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");

		if (desc) {
			try {
				set = desc.set; // Opera crashes at this point
				set.call(tmpObj1, tmpObj2);
			} catch (ignore) {}
			if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { set: set, level: 2 };
		}

		tmpObj1.__proto__ = tmpObj2;
		if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 2 };

		tmpObj1 = {};
		tmpObj1.__proto__ = tmpObj2;
		if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 1 };

		return false;
	})()
);

require("../create");

}, function(modId) { var map = {"../is-object":1629437952329,"../valid-value":1629437952320,"../create":1629437952330}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952329, function(require, module, exports) {


var isValue = require("./is-value");

var map = { function: true, object: true };

module.exports = function (value) { return (isValue(value) && map[typeof value]) || false; };

}, function(modId) { var map = {"./is-value":1629437952302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952330, function(require, module, exports) {
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804



var create = Object.create, shim;

if (!require("./set-prototype-of/is-implemented")()) {
	shim = require("./set-prototype-of/shim");
}

module.exports = (function () {
	var nullObject, polyProps, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	polyProps = {};
	desc = { configurable: false, enumerable: false, writable: true, value: undefined };
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === "__proto__") {
			polyProps[name] = {
				configurable: true,
				enumerable: false,
				writable: true,
				value: undefined
			};
			return;
		}
		polyProps[name] = desc;
	});
	Object.defineProperties(nullObject, polyProps);

	Object.defineProperty(shim, "nullPolyfill", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: nullObject
	});

	return function (prototype, props) {
		return create(prototype === null ? nullObject : prototype, props);
	};
})();

}, function(modId) { var map = {"./set-prototype-of/is-implemented":1629437952327,"./set-prototype-of/shim":1629437952328}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952331, function(require, module, exports) {


module.exports = (function () {
	var SubArray = require("./_sub-array-dummy")
	  , arr;

	if (!SubArray) return false;
	arr = new SubArray();
	if (!Array.isArray(arr)) return false;
	if (!(arr instanceof SubArray)) return false;

	arr[34] = "foo";
	return arr.length === 35;
})();

}, function(modId) { var map = {"./_sub-array-dummy":1629437952332}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952332, function(require, module, exports) {


var setPrototypeOf = require("../object/set-prototype-of");

module.exports = (function () {
	var SubArray;

	if (!setPrototypeOf) return null;
	SubArray = function () { Array.apply(this, arguments); };
	setPrototypeOf(SubArray, Array);
	SubArray.prototype = Object.create(Array.prototype, {
		constructor: { value: SubArray, enumerable: false, writable: true, configurable: true }
	});
	return SubArray;
})();

}, function(modId) { var map = {"../object/set-prototype-of":1629437952326}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952333, function(require, module, exports) {


var isPlainArray       = require("../../is-plain-array")
  , toPosInt           = require("../../../number/to-pos-integer")
  , isObject           = require("../../../object/is-object")
  , isConcatSpreadable = require("es6-symbol").isConcatSpreadable
  , isArray            = Array.isArray
  , concat             = Array.prototype.concat
  , forEach            = Array.prototype.forEach
  , isSpreadable;

isSpreadable = function (value) {
	if (!value) return false;
	if (!isObject(value)) return false;
	if (value[isConcatSpreadable] !== undefined) {
		return Boolean(value[isConcatSpreadable]);
	}
	return isArray(value);
};

// eslint-disable-next-line no-unused-vars
module.exports = function (item/*, …items*/) {
	var result;
	if (!this || !isArray(this) || isPlainArray(this)) {
		return concat.apply(this, arguments);
	}
	result = new this.constructor();
	if (isSpreadable(this)) {
		forEach.call(this, function (val, i) { result[i] = val; });
	} else {
		result[0] = this;
	}
	forEach.call(arguments, function (arg) {
		var base;
		if (isSpreadable(arg)) {
			base = result.length;
			result.length += toPosInt(arg.length);
			forEach.call(arg, function (val, i) { result[base + i] = val; });
			return;
		}
		result.push(arg);
	});
	return result;
};

}, function(modId) { var map = {"../../is-plain-array":1629437952334,"../../../number/to-pos-integer":1629437952314,"../../../object/is-object":1629437952329}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952334, function(require, module, exports) {


var isArray = Array.isArray, getPrototypeOf = Object.getPrototypeOf;

module.exports = function (obj) {
	var proto;
	if (!obj || !isArray(obj)) return false;
	proto = getPrototypeOf(obj);
	if (!isArray(proto)) return false;
	return !isArray(getPrototypeOf(proto));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952335, function(require, module, exports) {


var indexOf = require("./e-index-of");

module.exports = function (searchElement/*, position*/) {
	return indexOf.call(this, searchElement, arguments[1]) > -1;
};

}, function(modId) { var map = {"./e-index-of":1629437952336}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952336, function(require, module, exports) {


var numberIsNaN       = require("../../number/is-nan")
  , toPosInt          = require("../../number/to-pos-integer")
  , value             = require("../../object/valid-value")
  , indexOf           = Array.prototype.indexOf
  , objHasOwnProperty = Object.prototype.hasOwnProperty
  , abs               = Math.abs
  , floor             = Math.floor;

module.exports = function (searchElement/*, fromIndex*/) {
	var i, length, fromIndex, val;
	if (!numberIsNaN(searchElement)) return indexOf.apply(this, arguments);

	length = toPosInt(value(this).length);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) fromIndex = 0;
	else if (fromIndex >= 0) fromIndex = floor(fromIndex);
	else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

	for (i = fromIndex; i < length; ++i) {
		if (objHasOwnProperty.call(this, i)) {
			val = this[i];
			if (numberIsNaN(val)) return i; // Jslint: ignore
		}
	}
	return -1;
};

}, function(modId) { var map = {"../../number/is-nan":1629437952337,"../../number/to-pos-integer":1629437952314,"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952337, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Number.isNaN : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952338,"./shim":1629437952339}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952338, function(require, module, exports) {


module.exports = function () {
	var numberIsNaN = Number.isNaN;
	if (typeof numberIsNaN !== "function") return false;
	return !numberIsNaN({}) && numberIsNaN(NaN) && !numberIsNaN(34);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952339, function(require, module, exports) {


module.exports = function (value) {
	// eslint-disable-next-line no-self-compare
	return value !== value;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952340, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Array.prototype.copyWithin : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952341,"./shim":1629437952342}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952341, function(require, module, exports) {


module.exports = function () {
	var arr = [1, 2, 3, 4, 5];
	if (typeof arr.copyWithin !== "function") return false;
	return String(arr.copyWithin(1, 3)) === "1,4,5,4,5";
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952342, function(require, module, exports) {
// Taken from: https://github.com/paulmillr/es6-shim/



var toInteger         = require("../../../number/to-integer")
  , toPosInt          = require("../../../number/to-pos-integer")
  , validValue        = require("../../../object/valid-value")
  , objHasOwnProperty = Object.prototype.hasOwnProperty
  , max               = Math.max
  , min               = Math.min;

module.exports = function (target, start/*, end*/) {
	var arr = validValue(this)
	  , end = arguments[2]
	  , length = toPosInt(arr.length)
	  , to
	  , from
	  , fin
	  , count
	  , direction;

	target = toInteger(target);
	start = toInteger(start);
	end = end === undefined ? length : toInteger(end);

	to = target < 0 ? max(length + target, 0) : min(target, length);
	from = start < 0 ? max(length + start, 0) : min(start, length);
	fin = end < 0 ? max(length + end, 0) : min(end, length);
	count = min(fin - from, length - to);
	direction = 1;

	if (from < to && to < from + count) {
		direction = -1;
		from += count - 1;
		to += count - 1;
	}
	while (count > 0) {
		if (objHasOwnProperty.call(arr, from)) arr[to] = arr[from];
		else delete arr[from];
		from += direction;
		to += direction;
		count -= 1;
	}
	return arr;
};

}, function(modId) { var map = {"../../../number/to-integer":1629437952315,"../../../number/to-pos-integer":1629437952314,"../../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952343, function(require, module, exports) {


var value    = require("../../object/valid-value")
  , contains = require("./contains")
  , filter   = Array.prototype.filter;

module.exports = function (other) {
	value(this);
	value(other);
	return filter.call(this, function (item) { return !contains.call(other, item); });
};

}, function(modId) { var map = {"../../object/valid-value":1629437952320,"./contains":1629437952335}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952344, function(require, module, exports) {


var numberIsNaN       = require("../../number/is-nan")
  , toPosInt          = require("../../number/to-pos-integer")
  , value             = require("../../object/valid-value")
  , lastIndexOf       = Array.prototype.lastIndexOf
  , objHasOwnProperty = Object.prototype.hasOwnProperty
  , abs               = Math.abs
  , floor             = Math.floor;

module.exports = function (searchElement/*, fromIndex*/) {
	var i, fromIndex, val;
	if (!numberIsNaN(searchElement)) {
		// Jslint: ignore
		return lastIndexOf.apply(this, arguments);
	}

	value(this);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) fromIndex = toPosInt(this.length) - 1;
	else if (fromIndex >= 0) fromIndex = floor(fromIndex);
	else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

	for (i = fromIndex; i >= 0; --i) {
		if (objHasOwnProperty.call(this, i)) {
			val = this[i];
			if (numberIsNaN(val)) return i; // Jslint: ignore
		}
	}
	return -1;
};

}, function(modId) { var map = {"../../number/is-nan":1629437952337,"../../number/to-pos-integer":1629437952314,"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952345, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Array.prototype.entries : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952346,"./shim":1629437952347}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952346, function(require, module, exports) {


module.exports = function () {
	var arr = [1, "foo"], iterator, result;
	if (typeof arr.entries !== "function") return false;
	iterator = arr.entries();
	if (!iterator) return false;
	if (typeof iterator.next !== "function") return false;
	result = iterator.next();
	if (!result || !result.value) return false;
	if (result.value[0] !== 0) return false;
	if (result.value[1] !== 1) return false;
	if (result.done !== false) return false;
	return true;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952347, function(require, module, exports) {


var ArrayIterator = require("es6-iterator/array");
module.exports = function () { return new ArrayIterator(this, "key+value"); };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952348, function(require, module, exports) {


var value    = require("../../object/valid-value")
  , aFrom    = require("../from")
  , toArray  = require("../to-array")
  , contains = require("./contains")
  , byLength = require("./_compare-by-length")
  , filter   = Array.prototype.filter
  , push     = Array.prototype.push;

module.exports = function (/* …lists*/) {
	var lists, seen, result;
	if (!arguments.length) return aFrom(this);
	push.apply((lists = [this]), arguments);
	lists.forEach(value);
	seen = [];
	result = [];
	lists.sort(byLength).forEach(function (list) {
		result = result
			.filter(function (item) { return !contains.call(list, item); })
			.concat(filter.call(list, function (item) { return !contains.call(seen, item); }));
		push.apply(seen, toArray(list));
	});
	return result;
};

}, function(modId) { var map = {"../../object/valid-value":1629437952320,"../from":1629437952349,"../to-array":1629437952355,"./contains":1629437952335,"./_compare-by-length":1629437952356}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952349, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Array.from : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952350,"./shim":1629437952351}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952350, function(require, module, exports) {


module.exports = function () {
	var from = Array.from, arr, result;
	if (typeof from !== "function") return false;
	arr = ["raz", "dwa"];
	result = from(arr);
	return Boolean(result && result !== arr && result[1] === "dwa");
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952351, function(require, module, exports) {


var iteratorSymbol = require("es6-symbol").iterator
  , isArguments    = require("../../function/is-arguments")
  , isFunction     = require("../../function/is-function")
  , toPosInt       = require("../../number/to-pos-integer")
  , callable       = require("../../object/valid-callable")
  , validValue     = require("../../object/valid-value")
  , isValue        = require("../../object/is-value")
  , isString       = require("../../string/is-string")
  , isArray        = Array.isArray
  , call           = Function.prototype.call
  , desc           = { configurable: true, enumerable: true, writable: true, value: null }
  , defineProperty = Object.defineProperty;

// eslint-disable-next-line complexity, max-lines-per-function
module.exports = function (arrayLike/*, mapFn, thisArg*/) {
	var mapFn = arguments[1]
	  , thisArg = arguments[2]
	  , Context
	  , i
	  , j
	  , arr
	  , length
	  , code
	  , iterator
	  , result
	  , getIterator
	  , value;

	arrayLike = Object(validValue(arrayLike));

	if (isValue(mapFn)) callable(mapFn);
	if (!this || this === Array || !isFunction(this)) {
		// Result: Plain array
		if (!mapFn) {
			if (isArguments(arrayLike)) {
				// Source: Arguments
				length = arrayLike.length;
				if (length !== 1) return Array.apply(null, arrayLike);
				arr = new Array(1);
				arr[0] = arrayLike[0];
				return arr;
			}
			if (isArray(arrayLike)) {
				// Source: Array
				arr = new Array((length = arrayLike.length));
				for (i = 0; i < length; ++i) arr[i] = arrayLike[i];
				return arr;
			}
		}
		arr = [];
	} else {
		// Result: Non plain array
		Context = this;
	}

	if (!isArray(arrayLike)) {
		if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
			// Source: Iterator
			iterator = callable(getIterator).call(arrayLike);
			if (Context) arr = new Context();
			result = iterator.next();
			i = 0;
			while (!result.done) {
				value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, i, desc);
				} else {
					arr[i] = value;
				}
				result = iterator.next();
				++i;
			}
			length = i;
		} else if (isString(arrayLike)) {
			// Source: String
			length = arrayLike.length;
			if (Context) arr = new Context();
			for (i = 0, j = 0; i < length; ++i) {
				value = arrayLike[i];
				if (i + 1 < length) {
					code = value.charCodeAt(0);
					// eslint-disable-next-line max-depth
					if (code >= 0xd800 && code <= 0xdbff) value += arrayLike[++i];
				}
				value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, j, desc);
				} else {
					arr[j] = value;
				}
				++j;
			}
			length = j;
		}
	}
	if (length === undefined) {
		// Source: array or array-like
		length = toPosInt(arrayLike.length);
		if (Context) arr = new Context(length);
		for (i = 0; i < length; ++i) {
			value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
			if (Context) {
				desc.value = value;
				defineProperty(arr, i, desc);
			} else {
				arr[i] = value;
			}
		}
	}
	if (Context) {
		desc.value = null;
		arr.length = length;
	}
	return arr;
};

}, function(modId) { var map = {"../../function/is-arguments":1629437952352,"../../function/is-function":1629437952353,"../../number/to-pos-integer":1629437952314,"../../object/valid-callable":1629437952319,"../../object/valid-value":1629437952320,"../../object/is-value":1629437952302,"../../string/is-string":1629437952354}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952352, function(require, module, exports) {


var objToString = Object.prototype.toString
  , id = objToString.call((function () { return arguments; })());

module.exports = function (value) { return objToString.call(value) === id; };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952353, function(require, module, exports) {


var objToString = Object.prototype.toString
  , isFunctionStringTag = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);

module.exports = function (value) {
	return typeof value === "function" && isFunctionStringTag(objToString.call(value));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952354, function(require, module, exports) {


var objToString = Object.prototype.toString, id = objToString.call("");

module.exports = function (value) {
	return (
		typeof value === "string" ||
		(value &&
			typeof value === "object" &&
			(value instanceof String || objToString.call(value) === id)) ||
		false
	);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952355, function(require, module, exports) {


var from    = require("./from")
  , isArray = Array.isArray;

module.exports = function (arrayLike) { return isArray(arrayLike) ? arrayLike : from(arrayLike); };

}, function(modId) { var map = {"./from":1629437952349}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952356, function(require, module, exports) {
// Used internally to sort array of lists by length



var toPosInt = require("../../number/to-pos-integer");

module.exports = function (arr1, arr2) { return toPosInt(arr1.length) - toPosInt(arr2.length); };

}, function(modId) { var map = {"../../number/to-pos-integer":1629437952314}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952357, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Array.prototype.fill : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952358,"./shim":1629437952359}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952358, function(require, module, exports) {


module.exports = function () {
	var arr = [1, 2, 3, 4, 5, 6];
	if (typeof arr.fill !== "function") return false;
	return String(arr.fill(-1, -3)) === "1,2,3,-1,-1,-1";
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952359, function(require, module, exports) {
// Taken from: https://github.com/paulmillr/es6-shim/



var toInteger  = require("../../../number/to-integer")
  , toPosInt   = require("../../../number/to-pos-integer")
  , validValue = require("../../../object/valid-value")
  , max        = Math.max
  , min        = Math.min;

module.exports = function (value/*, start, end*/) {
	var arr = validValue(this)
	  , start = arguments[1]
	  , end = arguments[2]
	  , length = toPosInt(arr.length)
	  , relativeStart
	  , i;

	start = start === undefined ? 0 : toInteger(start);
	end = end === undefined ? length : toInteger(end);

	relativeStart = start < 0 ? max(length + start, 0) : min(start, length);
	for (i = relativeStart; i < length && i < end; ++i) arr[i] = value;
	return arr;
};

}, function(modId) { var map = {"../../../number/to-integer":1629437952315,"../../../number/to-pos-integer":1629437952314,"../../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952360, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Array.prototype.filter : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952361,"./shim":1629437952362}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952361, function(require, module, exports) {


var SubArray = require("../../_sub-array-dummy-safe")
  , pass     = function () { return true; };

module.exports = function () { return new SubArray().filter(pass) instanceof SubArray; };

}, function(modId) { var map = {"../../_sub-array-dummy-safe":1629437952325}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952362, function(require, module, exports) {


var isPlainArray = require("../../is-plain-array")
  , callable     = require("../../../object/valid-callable")
  , isArray      = Array.isArray
  , filter       = Array.prototype.filter
  , forEach      = Array.prototype.forEach
  , call         = Function.prototype.call;

module.exports = function (callbackFn/*, thisArg*/) {
	var result, thisArg, i;
	if (!this || !isArray(this) || isPlainArray(this)) {
		return filter.apply(this, arguments);
	}
	callable(callbackFn);
	thisArg = arguments[1];
	result = new this.constructor();
	i = 0;
	forEach.call(this, function (val, j, self) {
		if (call.call(callbackFn, thisArg, val, j, self)) result[i++] = val;
	});
	return result;
};

}, function(modId) { var map = {"../../is-plain-array":1629437952334,"../../../object/valid-callable":1629437952319}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952363, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Array.prototype.find : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952364,"./shim":1629437952365}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952364, function(require, module, exports) {


var fn = function (value) { return value > 3; };

module.exports = function () {
	var arr = [1, 2, 3, 4, 5, 6];
	if (typeof arr.find !== "function") return false;
	return arr.find(fn) === 4;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952365, function(require, module, exports) {


var findIndex = require("../find-index/shim");

// eslint-disable-next-line no-unused-vars
module.exports = function (predicate/*, thisArg*/) {
	var index = findIndex.apply(this, arguments);
	return index === -1 ? undefined : this[index];
};

}, function(modId) { var map = {"../find-index/shim":1629437952366}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952366, function(require, module, exports) {


var callable    = require("../../../object/valid-callable")
  , ensureValue = require("../../../object/valid-value")
  , some        = Array.prototype.some
  , apply       = Function.prototype.apply;

module.exports = function (predicate/*, thisArg*/) {
	var k, self;
	self = Object(ensureValue(this));
	callable(predicate);

	return some.call(
		self,
		function (value, index) {
			if (apply.call(predicate, this, arguments)) {
				k = index;
				return true;
			}
			return false;
		},
		arguments[1]
	)
		? k
		: -1;
};

}, function(modId) { var map = {"../../../object/valid-callable":1629437952319,"../../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952367, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Array.prototype.findIndex : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952368,"./shim":1629437952366}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952368, function(require, module, exports) {


var fn = function (value) { return value > 3; };

module.exports = function () {
	var arr = [1, 2, 3, 4, 5, 6];
	if (typeof arr.findIndex !== "function") return false;
	return arr.findIndex(fn) === 3;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952369, function(require, module, exports) {


var firstIndex = require("./first-index");

module.exports = function () {
	var i;
	if ((i = firstIndex.call(this)) !== null) return this[i];
	return undefined;
};

}, function(modId) { var map = {"./first-index":1629437952370}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952370, function(require, module, exports) {


var toPosInt          = require("../../number/to-pos-integer")
  , value             = require("../../object/valid-value")
  , objHasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = function () {
	var i, length;
	if (!(length = toPosInt(value(this).length))) return null;
	i = 0;
	while (!objHasOwnProperty.call(this, i)) {
		if (++i === length) return null;
	}
	return i;
};

}, function(modId) { var map = {"../../number/to-pos-integer":1629437952314,"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952371, function(require, module, exports) {
// Stack grow safe implementation



var ensureValue       = require("../../object/valid-value")
  , isArray           = Array.isArray
  , objHasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = function () {
	var input = ensureValue(this), index = 0, remaining, remainingIndexes, length, i, result = [];
	// Jslint: ignore
	main: while (input) {
		length = input.length;
		for (i = index; i < length; ++i) {
			if (!objHasOwnProperty.call(input, i)) continue;
			if (isArray(input[i])) {
				if (i < length - 1) {
					// eslint-disable-next-line max-depth
					if (!remaining) {
						remaining = [];
						remainingIndexes = [];
					}
					remaining.push(input);
					remainingIndexes.push(i + 1);
				}
				input = input[i];
				index = 0;
				continue main;
			}
			result.push(input[i]);
		}
		if (remaining) {
			input = remaining.pop();
			index = remainingIndexes.pop();
		} else {
			input = null;
		}
	}
	return result;
};

}, function(modId) { var map = {"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952372, function(require, module, exports) {


var toPosInt          = require("../../number/to-pos-integer")
  , callable          = require("../../object/valid-callable")
  , value             = require("../../object/valid-value")
  , objHasOwnProperty = Object.prototype.hasOwnProperty
  , call              = Function.prototype.call;

module.exports = function (cb/*, thisArg*/) {
	var i, self, thisArg;

	self = Object(value(this));
	callable(cb);
	thisArg = arguments[1];

	for (i = toPosInt(self.length) - 1; i >= 0; --i) {
		if (objHasOwnProperty.call(self, i)) call.call(cb, thisArg, self[i], i, self);
	}
};

}, function(modId) { var map = {"../../number/to-pos-integer":1629437952314,"../../object/valid-callable":1629437952319,"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952373, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Array.prototype.keys : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952374,"./shim":1629437952375}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952374, function(require, module, exports) {


module.exports = function () {
	var arr = [1, "foo"], iterator, result;
	if (typeof arr.keys !== "function") return false;
	iterator = arr.keys();
	if (!iterator) return false;
	if (typeof iterator.next !== "function") return false;
	result = iterator.next();
	if (!result) return false;
	if (result.value !== 0) return false;
	if (result.done !== false) return false;
	return true;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952375, function(require, module, exports) {


var ArrayIterator = require("es6-iterator/array");
module.exports = function () { return new ArrayIterator(this, "key"); };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952376, function(require, module, exports) {
// Inspired by Underscore's groupBy:
// http://documentcloud.github.com/underscore/#groupBy



var callable = require("../../object/valid-callable")
  , value    = require("../../object/valid-value")
  , forEach  = Array.prototype.forEach
  , apply    = Function.prototype.apply;

module.exports = function (cb/*, thisArg*/) {
	var result;

	value(this);
	callable(cb);

	result = Object.create(null);
	forEach.call(
		this,
		function (item) {
			var key = apply.call(cb, this, arguments);
			if (!result[key]) result[key] = [];
			result[key].push(item);
		},
		arguments[1]
	);
	return result;
};

}, function(modId) { var map = {"../../object/valid-callable":1629437952319,"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952377, function(require, module, exports) {


var indexOf = require("./e-index-of");

module.exports = function (value/*, fromIndex*/) {
	var result = [], i, fromIndex = arguments[1];
	while ((i = indexOf.call(this, value, fromIndex)) !== -1) {
		result.push(i);
		fromIndex = i + 1;
	}
	return result;
};

}, function(modId) { var map = {"./e-index-of":1629437952336}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952378, function(require, module, exports) {


var value    = require("../../object/valid-value")
  , contains = require("./contains")
  , byLength = require("./_compare-by-length")
  , filter   = Array.prototype.filter
  , push     = Array.prototype.push
  , slice    = Array.prototype.slice;

module.exports = function (/* …list*/) {
	var lists;
	if (!arguments.length) slice.call(this);
	push.apply((lists = [this]), arguments);
	lists.forEach(value);
	lists.sort(byLength);
	return lists.reduce(function (list1, list2) {
		return filter.call(list1, function (item) { return contains.call(list2, item); });
	});
};

}, function(modId) { var map = {"../../object/valid-value":1629437952320,"./contains":1629437952335,"./_compare-by-length":1629437952356}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952379, function(require, module, exports) {


var toPosInt          = require("../../number/to-pos-integer")
  , eq                = require("../../object/eq")
  , value             = require("../../object/valid-value")
  , objHasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = function (other) {
	var i, length;
	value(this);
	value(other);
	length = toPosInt(this.length);
	if (length !== toPosInt(other.length)) return false;
	for (i = 0; i < length; ++i) {
		if (objHasOwnProperty.call(this, i) !== objHasOwnProperty.call(other, i)) {
			return false;
		}
		if (!eq(this[i], other[i])) return false;
	}
	return true;
};

}, function(modId) { var map = {"../../number/to-pos-integer":1629437952314,"../../object/eq":1629437952380,"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952380, function(require, module, exports) {


var numIsNaN = require("../number/is-nan");

module.exports = function (val1, val2) {
	return val1 === val2 || (numIsNaN(val1) && numIsNaN(val2));
};

}, function(modId) { var map = {"../number/is-nan":1629437952337}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952381, function(require, module, exports) {


var ensureArray = require("../../object/ensure-array")
  , firstIndex  = require("./first-index");

module.exports = function () { return firstIndex.call(ensureArray(this)) === null; };

}, function(modId) { var map = {"../../object/ensure-array":1629437952382,"./first-index":1629437952370}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952382, function(require, module, exports) {


var toShortString = require("../to-short-string-representation")
  , isArray       = require("./is-array-like");

module.exports = function (value) {
	if (isArray(value)) return value;
	throw new TypeError(toShortString(value) + " is not a array");
};

}, function(modId) { var map = {"../to-short-string-representation":1629437952306,"./is-array-like":1629437952383}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952383, function(require, module, exports) {


var isFunction = require("../function/is-function")
  , isObject   = require("./is-object")
  , isValue    = require("./is-value");

module.exports = function (value) {
	return (
		(isValue(value) &&
			typeof value.length === "number" &&
			// Just checking ((typeof x === 'object') && (typeof x !== 'function'))
			// won't work right for some cases, e.g.:
			// type of instance of NodeList in Safari is a 'function'
			((isObject(value) && !isFunction(value)) || typeof value === "string")) ||
		false
	);
};

}, function(modId) { var map = {"../function/is-function":1629437952353,"./is-object":1629437952329,"./is-value":1629437952302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952384, function(require, module, exports) {


var indexOf = require("./e-index-of")
  , every   = Array.prototype.every
  , isFirst;

isFirst = function (value, index) { return indexOf.call(this, value) === index; };

module.exports = function () { return every.call(this, isFirst, this); };

}, function(modId) { var map = {"./e-index-of":1629437952336}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952385, function(require, module, exports) {


var lastIndex = require("./last-index");

module.exports = function () {
	var i;
	if ((i = lastIndex.call(this)) !== null) return this[i];
	return undefined;
};

}, function(modId) { var map = {"./last-index":1629437952386}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952386, function(require, module, exports) {


var toPosInt          = require("../../number/to-pos-integer")
  , value             = require("../../object/valid-value")
  , objHasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = function () {
	var i, length;
	if (!(length = toPosInt(value(this).length))) return null;
	i = length - 1;
	while (!objHasOwnProperty.call(this, i)) {
		if (--i === -1) return null;
	}
	return i;
};

}, function(modId) { var map = {"../../number/to-pos-integer":1629437952314,"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952387, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Array.prototype.map : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952388,"./shim":1629437952390}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952388, function(require, module, exports) {


var identity = require("../../../function/identity")
  , SubArray = require("../../_sub-array-dummy-safe");

module.exports = function () { return new SubArray().map(identity) instanceof SubArray; };

}, function(modId) { var map = {"../../../function/identity":1629437952389,"../../_sub-array-dummy-safe":1629437952325}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952389, function(require, module, exports) {


module.exports = function (value) { return value; };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952390, function(require, module, exports) {


var isPlainArray = require("../../is-plain-array")
  , callable     = require("../../../object/valid-callable")
  , isArray      = Array.isArray
  , map          = Array.prototype.map
  , forEach      = Array.prototype.forEach
  , call         = Function.prototype.call;

module.exports = function (callbackFn/*, thisArg*/) {
	var result, thisArg;
	if (!this || !isArray(this) || isPlainArray(this)) {
		return map.apply(this, arguments);
	}
	callable(callbackFn);
	thisArg = arguments[1];
	result = new this.constructor(this.length);
	forEach.call(this, function (val, i, self) {
		result[i] = call.call(callbackFn, thisArg, val, i, self);
	});
	return result;
};

}, function(modId) { var map = {"../../is-plain-array":1629437952334,"../../../object/valid-callable":1629437952319}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952391, function(require, module, exports) {


var indexOf = require("./e-index-of")
  , forEach = Array.prototype.forEach
  , splice  = Array.prototype.splice;

// eslint-disable-next-line no-unused-vars
module.exports = function (itemToRemove/*, …item*/) {
	forEach.call(
		arguments,
		function (item) {
			var index = indexOf.call(this, item);
			if (index !== -1) splice.call(this, index, 1);
		},
		this
	);
};

}, function(modId) { var map = {"./e-index-of":1629437952336}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952392, function(require, module, exports) {


var forEach = Array.prototype.forEach;

module.exports = function (sep) {
	var result = [];
	forEach.call(this, function (val) { result.push(val, sep); });
	result.pop();
	return result;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952393, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Array.prototype.slice : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952394,"./shim":1629437952395}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952394, function(require, module, exports) {


var SubArray = require("../../_sub-array-dummy-safe");

module.exports = function () { return new SubArray().slice() instanceof SubArray; };

}, function(modId) { var map = {"../../_sub-array-dummy-safe":1629437952325}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952395, function(require, module, exports) {


var toInteger         = require("../../../number/to-integer")
  , toPosInt          = require("../../../number/to-pos-integer")
  , isPlainArray      = require("../../is-plain-array")
  , isArray           = Array.isArray
  , slice             = Array.prototype.slice
  , objHasOwnProperty = Object.prototype.hasOwnProperty
  , max               = Math.max;

module.exports = function (start, end) {
	var length, result, i;
	if (!this || !isArray(this) || isPlainArray(this)) {
		return slice.apply(this, arguments);
	}
	length = toPosInt(this.length);
	start = toInteger(start);
	if (start < 0) start = max(length + start, 0);
	else if (start > length) start = length;
	if (end === undefined) {
		end = length;
	} else {
		end = toInteger(end);
		if (end < 0) end = max(length + end, 0);
		else if (end > length) end = length;
	}
	if (start > end) start = end;
	result = new this.constructor(end - start);
	i = 0;
	while (start !== end) {
		if (objHasOwnProperty.call(this, start)) result[i] = this[start];
		++i;
		++start;
	}
	return result;
};

}, function(modId) { var map = {"../../../number/to-integer":1629437952315,"../../../number/to-pos-integer":1629437952314,"../../is-plain-array":1629437952334}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952396, function(require, module, exports) {


var toPosInt          = require("../../number/to-pos-integer")
  , callable          = require("../../object/valid-callable")
  , value             = require("../../object/valid-value")
  , objHasOwnProperty = Object.prototype.hasOwnProperty
  , call              = Function.prototype.call;

module.exports = function (cb/*, thisArg*/) {
	var i, self, thisArg;
	self = Object(value(this));
	callable(cb);
	thisArg = arguments[1];

	for (i = toPosInt(self.length) - 1; i >= 0; --i) {
		if (objHasOwnProperty.call(self, i) && call.call(cb, thisArg, self[i], i, self)) {
			return true;
		}
	}
	return false;
};

}, function(modId) { var map = {"../../number/to-pos-integer":1629437952314,"../../object/valid-callable":1629437952319,"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952397, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Array.prototype.splice : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952398,"./shim":1629437952399}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952398, function(require, module, exports) {


var SubArray = require("../../_sub-array-dummy-safe");

module.exports = function () { return new SubArray().splice(0) instanceof SubArray; };

}, function(modId) { var map = {"../../_sub-array-dummy-safe":1629437952325}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952399, function(require, module, exports) {


var isPlainArray = require("../../is-plain-array")
  , isArray      = Array.isArray
  , splice       = Array.prototype.splice
  , forEach      = Array.prototype.forEach;

// eslint-disable-next-line no-unused-vars
module.exports = function (start, deleteCount/*, …items*/) {
	var arr = splice.apply(this, arguments), result;
	if (!this || !isArray(this) || isPlainArray(this)) return arr;
	result = new this.constructor(arr.length);
	forEach.call(arr, function (val, i) { result[i] = val; });
	return result;
};

}, function(modId) { var map = {"../../is-plain-array":1629437952334}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952400, function(require, module, exports) {


var indexOf = require("./e-index-of")
  , filter  = Array.prototype.filter
  , isFirst;

isFirst = function (value, index) { return indexOf.call(this, value) === index; };

module.exports = function () { return filter.call(this, isFirst, this); };

}, function(modId) { var map = {"./e-index-of":1629437952336}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952401, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Array.prototype.values : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952402,"./shim":1629437952312}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952402, function(require, module, exports) {


module.exports = function () {
	var arr = ["foo", 1], iterator, result;
	if (typeof arr.values !== "function") return false;
	iterator = arr.values();
	if (!iterator) return false;
	if (typeof iterator.next !== "function") return false;
	result = iterator.next();
	if (!result) return false;
	if (result.value !== "foo") return false;
	if (result.done !== false) return false;
	return true;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952403, function(require, module, exports) {


var toPosInt = require("../number/to-pos-integer")
  , value    = require("../object/valid-value")
  , slice    = Array.prototype.slice;

module.exports = function (length/*, …fill*/) {
	var arr, currentLength;
	length = toPosInt(value(length));
	if (length === 0) return [];

	arr = arguments.length < 2 ? [undefined] : slice.call(arguments, 1, 1 + length);

	while ((currentLength = arr.length) < length) {
		arr = arr.concat(arr.slice(0, length - currentLength));
	}
	return arr;
};

}, function(modId) { var map = {"../number/to-pos-integer":1629437952314,"../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952404, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Array.of : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952405,"./shim":1629437952406}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952405, function(require, module, exports) {


module.exports = function () {
	var of = Array.of, result;
	if (typeof of !== "function") return false;
	result = of("foo", "bar");
	return Boolean(result && result[1] === "bar");
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952406, function(require, module, exports) {


var isFunction     = require("../../function/is-function")
  , slice          = Array.prototype.slice
  , defineProperty = Object.defineProperty
  , desc           = { configurable: true, enumerable: true, writable: true, value: null };

module.exports = function (/* …items*/) {
	var result, i, length;
	if (!this || this === Array || !isFunction(this)) return slice.call(arguments);
	result = new this((length = arguments.length));
	for (i = 0; i < length; ++i) {
		desc.value = arguments[i];
		defineProperty(result, i, desc);
	}
	desc.value = null;
	result.length = length;
	return result;
};

}, function(modId) { var map = {"../../function/is-function":1629437952353}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952407, function(require, module, exports) {


var isArray = Array.isArray;

module.exports = function (value) {
	if (isArray(value)) return value;
	throw new TypeError(value + " is not an array");
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952408, function(require, module, exports) {


module.exports = { isBoolean: require("./is-boolean") };

}, function(modId) { var map = {"./is-boolean":1629437952409}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952409, function(require, module, exports) {


var objToString = Object.prototype.toString, id = objToString.call(true);

module.exports = function (value) {
	return (
		typeof value === "boolean" ||
		(typeof value === "object" && (value instanceof Boolean || objToString.call(value) === id))
	);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952410, function(require, module, exports) {


module.exports = {
	"#": require("./#"),
	"ensureTimeValue": require("./ensure-time-value"),
	"isDate": require("./is-date"),
	"isTimeValue": require("./is-time-value"),
	"validDate": require("./valid-date")
};

}, function(modId) { var map = {"./#":1629437952411,"./ensure-time-value":1629437952426,"./is-date":1629437952424,"./is-time-value":1629437952427,"./valid-date":1629437952423}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952411, function(require, module, exports) {


module.exports = {
	copy: require("./copy"),
	daysInMonth: require("./days-in-month"),
	floorDay: require("./floor-day"),
	floorMonth: require("./floor-month"),
	floorYear: require("./floor-year"),
	format: require("./format")
};

}, function(modId) { var map = {"./copy":1629437952412,"./days-in-month":1629437952413,"./floor-day":1629437952414,"./floor-month":1629437952415,"./floor-year":1629437952416,"./format":1629437952417}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952412, function(require, module, exports) {


var getTime = Date.prototype.getTime;

module.exports = function () { return new Date(getTime.call(this)); };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952413, function(require, module, exports) {


var getMonth = Date.prototype.getMonth;

module.exports = function () {
	switch (getMonth.call(this)) {
		case 1:
			return this.getFullYear() % 4 ? 28 : 29;
		case 3:
		case 5:
		case 8:
		case 10:
			return 30;
		default:
			return 31;
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952414, function(require, module, exports) {


var setHours = Date.prototype.setHours;

module.exports = function () {
	setHours.call(this, 0, 0, 0, 0);
	return this;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952415, function(require, module, exports) {


var floorDay = require("./floor-day");

module.exports = function () {
	floorDay.call(this).setDate(1);
	return this;
};

}, function(modId) { var map = {"./floor-day":1629437952414}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952416, function(require, module, exports) {


var floorMonth = require("./floor-month");

module.exports = function () {
	floorMonth.call(this).setMonth(0);
	return this;
};

}, function(modId) { var map = {"./floor-month":1629437952415}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952417, function(require, module, exports) {
/* eslint id-length: "off" */



var pad  = require("../../number/#/pad")
  , date = require("../valid-date")
  , format;

format = require("../../string/format-method")({
	Y: function () { return String(this.getFullYear()); },
	y: function () { return String(this.getFullYear()).slice(-2); },
	m: function () { return pad.call(this.getMonth() + 1, 2); },
	d: function () { return pad.call(this.getDate(), 2); },
	H: function () { return pad.call(this.getHours(), 2); },
	M: function () { return pad.call(this.getMinutes(), 2); },
	S: function () { return pad.call(this.getSeconds(), 2); },
	L: function () { return pad.call(this.getMilliseconds(), 3); }
});

module.exports = function (pattern) { return format.call(date(this), pattern); };

}, function(modId) { var map = {"../../number/#/pad":1629437952418,"../valid-date":1629437952423,"../../string/format-method":1629437952425}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952418, function(require, module, exports) {


var pad      = require("../../string/#/pad")
  , toPosInt = require("../to-pos-integer")
  , toFixed  = Number.prototype.toFixed;

module.exports = function (length/*, precision*/) {
	var precision;
	length = toPosInt(length);
	precision = toPosInt(arguments[1]);

	return pad.call(
		precision ? toFixed.call(this, precision) : this, "0",
		length + (precision ? 1 + precision : 0)
	);
};

}, function(modId) { var map = {"../../string/#/pad":1629437952419,"../to-pos-integer":1629437952314}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952419, function(require, module, exports) {


var toInteger = require("../../number/to-integer")
  , value     = require("../../object/valid-value")
  , repeat    = require("./repeat")
  , abs       = Math.abs
  , max       = Math.max;

module.exports = function (fill/*, length*/) {
	var self = String(value(this)), sLength = self.length, length = arguments[1];

	length = isNaN(length) ? 1 : toInteger(length);
	fill = repeat.call(String(fill), abs(length));
	if (length >= 0) return fill.slice(0, max(0, length - sLength)) + self;
	return self + (sLength + length >= 0 ? "" : fill.slice(length + sLength));
};

}, function(modId) { var map = {"../../number/to-integer":1629437952315,"../../object/valid-value":1629437952320,"./repeat":1629437952420}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952420, function(require, module, exports) {


module.exports = require("./is-implemented")() ? String.prototype.repeat : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952421,"./shim":1629437952422}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952421, function(require, module, exports) {


var str = "foo";

module.exports = function () {
	if (typeof str.repeat !== "function") return false;
	return str.repeat(2) === "foofoo";
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952422, function(require, module, exports) {
// Thanks
// @rauchma http://www.2ality.com/2014/01/efficient-string-repeat.html
// @mathiasbynens https://github.com/mathiasbynens/String.prototype.repeat/blob/4a4b567def/repeat.js



var value     = require("../../../object/valid-value")
  , toInteger = require("../../../number/to-integer");

module.exports = function (count) {
	var str = String(value(this)), result;
	count = toInteger(count);
	if (count < 0) throw new RangeError("Count must be >= 0");
	if (!isFinite(count)) throw new RangeError("Count must be < ∞");

	result = "";
	while (count) {
		if (count % 2) result += str;
		if (count > 1) str += str;
		// eslint-disable-next-line no-bitwise
		count >>= 1;
	}
	return result;
};

}, function(modId) { var map = {"../../../object/valid-value":1629437952320,"../../../number/to-integer":1629437952315}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952423, function(require, module, exports) {


var isDate = require("./is-date");

module.exports = function (value) {
	if (!isDate(value)) throw new TypeError(value + " is not valid Date object");
	return value;
};

}, function(modId) { var map = {"./is-date":1629437952424}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952424, function(require, module, exports) {


var objToString = Object.prototype.toString, id = objToString.call(new Date());

module.exports = function (value) {
	return (
		(value && !isNaN(value) && (value instanceof Date || objToString.call(value) === id)) ||
		false
	);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952425, function(require, module, exports) {


var isCallable = require("../object/is-callable")
  , value      = require("../object/valid-value")
  , call       = Function.prototype.call;

module.exports = function (fmap) {
	fmap = Object(value(fmap));
	return function (pattern) {
		var context = this;
		value(context);
		pattern = String(pattern);
		return pattern.replace(/%([a-zA-Z]+)|\\([\u0000-\uffff])/g, function (
			match,
			token,
			escapeChar
		) {
			var t, result;
			if (escapeChar) return escapeChar;
			t = token;
			while (t && !(result = fmap[t])) t = t.slice(0, -1);
			if (!result) return match;
			if (isCallable(result)) result = call.call(result, context);
			return result + token.slice(t.length);
		});
	};
};

}, function(modId) { var map = {"../object/is-callable":1629437952305,"../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952426, function(require, module, exports) {


var safeToString = require("../safe-to-string")
  , toInteger    = require("../number/to-integer")
  , isTimeValue  = require("./is-time-value");

module.exports = function (value) {
	if (isTimeValue(value)) return toInteger(value);
	throw new TypeError(safeToString(value) + " is not a valid time value");
};

}, function(modId) { var map = {"../safe-to-string":1629437952304,"../number/to-integer":1629437952315,"./is-time-value":1629437952427}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952427, function(require, module, exports) {


module.exports = function (value) {
	try { value = Number(value); }
	catch (e) { return false; }
	if (isNaN(value)) return false;
	if (Math.abs(value) > 8.64e15) return false;
	return true;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952428, function(require, module, exports) {


module.exports = {
	"#": require("./#"),
	"custom": require("./custom"),
	"isError": require("./is-error"),
	"validError": require("./valid-error")
};

}, function(modId) { var map = {"./#":1629437952429,"./custom":1629437952433,"./is-error":1629437952432,"./valid-error":1629437952431}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952429, function(require, module, exports) {


module.exports = { throw: require("./throw") };

}, function(modId) { var map = {"./throw":1629437952430}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952430, function(require, module, exports) {


var error = require("../valid-error");

module.exports = function () { throw error(this); };

}, function(modId) { var map = {"../valid-error":1629437952431}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952431, function(require, module, exports) {


var isError = require("./is-error");

module.exports = function (value) {
	if (!isError(value)) throw new TypeError(value + " is not an Error object");
	return value;
};

}, function(modId) { var map = {"./is-error":1629437952432}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952432, function(require, module, exports) {


var objToString = Object.prototype.toString, id = objToString.call(new Error());

module.exports = function (value) {
	return (value && (value instanceof Error || objToString.call(value) === id)) || false;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952433, function(require, module, exports) {


var assign            = require("../object/assign")
  , isObject          = require("../object/is-object")
  , isValue           = require("../object/is-value")
  , captureStackTrace = Error.captureStackTrace;

module.exports = function (message/*, code, ext*/) {
	var err = new Error(message), code = arguments[1], ext = arguments[2];
	if (!isValue(ext)) {
		if (isObject(code)) {
			ext = code;
			code = null;
		}
	}
	if (isValue(ext)) assign(err, ext);
	if (isValue(code)) err.code = code;
	if (captureStackTrace) captureStackTrace(err, module.exports);
	return err;
};

}, function(modId) { var map = {"../object/assign":1629437952434,"../object/is-object":1629437952329,"../object/is-value":1629437952302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952434, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Object.assign : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952435,"./shim":1629437952436}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952435, function(require, module, exports) {


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952436, function(require, module, exports) {


var keys  = require("../keys")
  , value = require("../valid-value")
  , max   = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

}, function(modId) { var map = {"../keys":1629437952437,"../valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952437, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Object.keys : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952438,"./shim":1629437952439}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952438, function(require, module, exports) {


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952439, function(require, module, exports) {


var isValue = require("../is-value");

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };

}, function(modId) { var map = {"../is-value":1629437952302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952440, function(require, module, exports) {
// Export all modules.



module.exports = {
	"#": require("./#"),
	"constant": require("./constant"),
	"identity": require("./identity"),
	"invoke": require("./invoke"),
	"isArguments": require("./is-arguments"),
	"isFunction": require("./is-function"),
	"noop": require("./noop"),
	"pluck": require("./pluck"),
	"validFunction": require("./valid-function")
};

}, function(modId) { var map = {"./#":1629437952441,"./constant":1629437952456,"./identity":1629437952389,"./invoke":1629437952457,"./is-arguments":1629437952352,"./is-function":1629437952353,"./noop":1629437952303,"./pluck":1629437952458,"./valid-function":1629437952445}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952441, function(require, module, exports) {


module.exports = {
	compose: require("./compose"),
	copy: require("./copy"),
	curry: require("./curry"),
	lock: require("./lock"),
	microtaskDelay: require("./microtask-delay"),
	not: require("./not"),
	partial: require("./partial"),
	spread: require("./spread"),
	toStringTokens: require("./to-string-tokens")
};

}, function(modId) { var map = {"./compose":1629437952442,"./copy":1629437952443,"./curry":1629437952446,"./lock":1629437952448,"./microtask-delay":1629437952449,"./not":1629437952452,"./partial":1629437952453,"./spread":1629437952454,"./to-string-tokens":1629437952455}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952442, function(require, module, exports) {


var isValue  = require("../../object/is-value")
  , callable = require("../../object/valid-callable")
  , aFrom    = require("../../array/from");

var apply = Function.prototype.apply
  , call = Function.prototype.call
  , callFn = function (arg, fn) { return call.call(fn, this, arg); };

module.exports = function (fnIgnored/*, …fnn*/) {
	var fns, first;
	var args = aFrom(arguments);
	fns = isValue(this) ? [this].concat(args) : args;
	fns.forEach(callable);
	fns = fns.reverse();
	first = fns[0];
	fns = fns.slice(1);
	return function (argIgnored) { return fns.reduce(callFn, apply.call(first, this, arguments)); };
};

}, function(modId) { var map = {"../../object/is-value":1629437952302,"../../object/valid-callable":1629437952319,"../../array/from":1629437952349}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952443, function(require, module, exports) {


var mixin         = require("../../object/mixin")
  , validFunction = require("../valid-function")
  , re            = /^\s*function\s*([\0-')-\uffff]+)*\s*\(([\0-(*-\uffff]*)\)\s*\{/;

module.exports = function () {
	var match = String(validFunction(this)).match(re), fn;

	// eslint-disable-next-line no-new-func
	fn = new Function(
		"fn",
		"return function " +
			match[1].trim() +
			"(" +
			match[2] +
			") { return fn.apply(this, arguments); };"
	)(this);
	try { mixin(fn, this); }
	catch (ignore) {}
	return fn;
};

}, function(modId) { var map = {"../../object/mixin":1629437952444,"../valid-function":1629437952445}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952444, function(require, module, exports) {


var value                    = require("./valid-value")
  , defineProperty           = Object.defineProperty
  , getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
  , getOwnPropertyNames      = Object.getOwnPropertyNames
  , getOwnPropertySymbols    = Object.getOwnPropertySymbols;

module.exports = function (target, source) {
	var error, sourceObject = Object(value(source));
	target = Object(value(target));
	getOwnPropertyNames(sourceObject).forEach(function (name) {
		try {
			defineProperty(target, name, getOwnPropertyDescriptor(source, name));
		} catch (e) { error = e; }
	});
	if (typeof getOwnPropertySymbols === "function") {
		getOwnPropertySymbols(sourceObject).forEach(function (symbol) {
			try {
				defineProperty(target, symbol, getOwnPropertyDescriptor(source, symbol));
			} catch (e) { error = e; }
		});
	}
	if (error !== undefined) throw error;
	return target;
};

}, function(modId) { var map = {"./valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952445, function(require, module, exports) {


var isFunction = require("./is-function");

module.exports = function (value) {
	if (!isFunction(value)) throw new TypeError(value + " is not a function");
	return value;
};

}, function(modId) { var map = {"./is-function":1629437952353}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952446, function(require, module, exports) {


var toPosInt     = require("../../number/to-pos-integer")
  , callable     = require("../../object/valid-callable")
  , defineLength = require("../_define-length")
  , slice        = Array.prototype.slice
  , apply        = Function.prototype.apply
  , curry;

curry = function self(fn, length, preArgs) {
	return defineLength(
		function () {
			var args = preArgs
				? preArgs.concat(slice.call(arguments, 0, length - preArgs.length))
				: slice.call(arguments, 0, length);
			return args.length === length ? apply.call(fn, this, args) : self(fn, length, args);
		},
		preArgs ? length - preArgs.length : length
	);
};

module.exports = function (/* Length*/) {
	var length = arguments[0];
	return curry(callable(this), isNaN(length) ? toPosInt(this.length) : toPosInt(length));
};

}, function(modId) { var map = {"../../number/to-pos-integer":1629437952314,"../../object/valid-callable":1629437952319,"../_define-length":1629437952447}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952447, function(require, module, exports) {


var toPosInt = require("../number/to-pos-integer");

var test = function (arg1, arg2) { return arg2; };

var desc, defineProperty, generate, mixin;

try {
	Object.defineProperty(test, "length", {
		configurable: true,
		writable: false,
		enumerable: false,
		value: 1
	});
}
catch (ignore) {}

if (test.length === 1) {
	// ES6
	desc = { configurable: true, writable: false, enumerable: false };
	defineProperty = Object.defineProperty;
	module.exports = function (fn, length) {
		length = toPosInt(length);
		if (fn.length === length) return fn;
		desc.value = length;
		return defineProperty(fn, "length", desc);
	};
} else {
	mixin = require("../object/mixin");
	generate = (function () {
		var cache = [];
		return function (length) {
			var args, i = 0;
			if (cache[length]) return cache[length];
			args = [];
			while (length--) args.push("a" + (++i).toString(36));
			// eslint-disable-next-line no-new-func
			return new Function(
				"fn",
				"return function (" + args.join(", ") + ") { return fn.apply(this, arguments); };"
			);
		};
	})();
	module.exports = function (src, length) {
		var target;
		length = toPosInt(length);
		if (src.length === length) return src;
		target = generate(length)(src);
		try { mixin(target, src); }
		catch (ignore) {}
		return target;
	};
}

}, function(modId) { var map = {"../number/to-pos-integer":1629437952314,"../object/mixin":1629437952444}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952448, function(require, module, exports) {


var callable = require("../../object/valid-callable")
  , apply    = Function.prototype.apply;

module.exports = function (/* …args*/) {
	var fn = callable(this), args = arguments;

	return function () { return apply.call(fn, this, args); };
};

}, function(modId) { var map = {"../../object/valid-callable":1629437952319}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952449, function(require, module, exports) {


var ensurePlainFunction = require("../../object/ensure-plain-function")
  , defineLength        = require("../_define-length")
  , nextTick            = require("next-tick");

var apply = Function.prototype.apply;

module.exports = function () {
	var src = ensurePlainFunction(this);
	return defineLength(function () { nextTick(apply.bind(src, this, arguments)); }, this.length);
};

}, function(modId) { var map = {"../../object/ensure-plain-function":1629437952450,"../_define-length":1629437952447}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952450, function(require, module, exports) {


var safeToString    = require("../safe-to-string")
  , isPlainFunction = require("./is-plain-function");

module.exports = function (value) {
	if (!isPlainFunction(value)) {
		throw new TypeError(safeToString(value) + " is not a plain function");
	}
	return value;
};

}, function(modId) { var map = {"../safe-to-string":1629437952304,"./is-plain-function":1629437952451}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952451, function(require, module, exports) {


var isClassStr = RegExp.prototype.test.bind(/^\s*class[\s{/}]/)
  , fnToString = Function.prototype.toString;

module.exports = function (fn) {
	if (typeof fn !== "function") return false;
	if (typeof fn.call !== "function") return false;
	if (typeof fn.apply !== "function") return false;
	return !isClassStr(fnToString.call(fn));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952452, function(require, module, exports) {


var callable     = require("../../object/valid-callable")
  , defineLength = require("../_define-length")
  , apply        = Function.prototype.apply;

module.exports = function () {
	var fn = callable(this);

	return defineLength(function () { return !apply.call(fn, this, arguments); }, fn.length);
};

}, function(modId) { var map = {"../../object/valid-callable":1629437952319,"../_define-length":1629437952447}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952453, function(require, module, exports) {


var callable     = require("../../object/valid-callable")
  , aFrom        = require("../../array/from")
  , defineLength = require("../_define-length")
  , apply        = Function.prototype.apply;

module.exports = function (/* …args*/) {
	var fn = callable(this), args = aFrom(arguments);

	return defineLength(function () {
		return apply.call(fn, this, args.concat(aFrom(arguments)));
	}, fn.length - args.length);
};

}, function(modId) { var map = {"../../object/valid-callable":1629437952319,"../../array/from":1629437952349,"../_define-length":1629437952447}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952454, function(require, module, exports) {


var callable = require("../../object/valid-callable")
  , apply    = Function.prototype.apply;

module.exports = function () {
	var fn = callable(this);
	return function (args) { return apply.call(fn, this, args); };
};

}, function(modId) { var map = {"../../object/valid-callable":1629437952319}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952455, function(require, module, exports) {


var validFunction = require("../valid-function");

var re1 = /^\s*function[\0-')-\uffff]*\(([\0-(*-\uffff]*)\)\s*\{([\0-\uffff]*)\}\s*$/
  , re2 = /^\s*\(?([\0-'*-\uffff]*)\)?\s*=>\s*(\{?[\0-\uffff]*\}?)\s*$/;

module.exports = function () {
	var str = String(validFunction(this)), data = str.match(re1);
	if (!data) {
		data = str.match(re2);
		if (!data) throw new Error("Unrecognized string format");
		data[1] = data[1].trim();
		if (data[2][0] === "{") data[2] = data[2].trim().slice(1, -1);
	}
	return { args: data[1], body: data[2] };
};

}, function(modId) { var map = {"../valid-function":1629437952445}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952456, function(require, module, exports) {


module.exports = function (value) {
	return function () { return value; };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952457, function(require, module, exports) {


var isCallable = require("../object/is-callable")
  , value      = require("../object/valid-value")
  , slice      = Array.prototype.slice
  , apply      = Function.prototype.apply;

module.exports = function (name/*, …args*/) {
	var args = slice.call(arguments, 1), isFn = isCallable(name);
	return function (obj) {
		value(obj);
		return apply.call(isFn ? name : obj[name], obj, args.concat(slice.call(arguments, 1)));
	};
};

}, function(modId) { var map = {"../object/is-callable":1629437952305,"../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952458, function(require, module, exports) {


var value = require("../object/valid-value");

module.exports = function (name) {
	return function (obj) { return value(obj)[name]; };
};

}, function(modId) { var map = {"../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952459, function(require, module, exports) {


module.exports = {
	forEach: require("./for-each"),
	is: require("./is"),
	validate: require("./validate"),
	validateObject: require("./validate-object")
};

}, function(modId) { var map = {"./for-each":1629437952460,"./is":1629437952462,"./validate":1629437952461,"./validate-object":1629437952463}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952460, function(require, module, exports) {


var forOf      = require("es6-iterator/for-of")
  , isIterable = require("es6-iterator/is-iterable")
  , iterable   = require("./validate")
  , forEach    = Array.prototype.forEach;

module.exports = function (target, cb/*, thisArg*/) {
	if (isIterable(iterable(target))) forOf(target, cb, arguments[2]);
	else forEach.call(target, cb, arguments[2]);
};

}, function(modId) { var map = {"./validate":1629437952461}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952461, function(require, module, exports) {


var is = require("./is");

module.exports = function (value) {
	if (is(value)) return value;
	throw new TypeError(value + " is not an iterable or array-like");
};

}, function(modId) { var map = {"./is":1629437952462}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952462, function(require, module, exports) {


var iteratorSymbol = require("es6-symbol").iterator
  , isValue        = require("../object/is-value")
  , isArrayLike    = require("../object/is-array-like");

module.exports = function (value) {
	if (!isValue(value)) return false;
	if (typeof value[iteratorSymbol] === "function") return true;
	return isArrayLike(value);
};

}, function(modId) { var map = {"../object/is-value":1629437952302,"../object/is-array-like":1629437952383}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952463, function(require, module, exports) {


var isObject = require("../object/is-object")
  , is       = require("./is");

module.exports = function (value) {
	if (is(value) && isObject(value)) return value;
	throw new TypeError(value + " is not an iterable or array-like object");
};

}, function(modId) { var map = {"../object/is-object":1629437952329,"./is":1629437952462}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952464, function(require, module, exports) {


module.exports = { safeStringify: require("./safe-stringify") };

}, function(modId) { var map = {"./safe-stringify":1629437952465}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952465, function(require, module, exports) {


var compact   = require("../array/#/compact")
  , isObject  = require("../object/is-object")
  , toArray   = require("../object/to-array")
  , isArray   = Array.isArray
  , stringify = JSON.stringify;

module.exports = function self(value/*, replacer, space*/) {
	var replacer = arguments[1], space = arguments[2];
	try {
		return stringify(value, replacer, space);
	} catch (e) {
		if (!isObject(value)) return null;
		if (typeof value.toJSON === "function") return null;
		if (isArray(value)) {
			return (
				"[" +
				compact.call(value.map(function (item) { return self(item, replacer, space); })) +
				"]"
			);
		}
		return (
			"{" +
			compact
				.call(
					toArray(value, function (item, key) {
						item = self(item, replacer, space);
						if (!item) return null;
						return stringify(key) + ":" + item;
					})
				)
				.join(",") +
			"}"
		);
	}
};

}, function(modId) { var map = {"../array/#/compact":1629437952322,"../object/is-object":1629437952329,"../object/to-array":1629437952466}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952466, function(require, module, exports) {


var callable  = require("./valid-callable")
  , isValue   = require("./is-value")
  , forEach   = require("./for-each")
  , call      = Function.prototype.call
  , defaultCb = function (value, key) { return [key, value]; };

module.exports = function (obj/*, cb, thisArg, compareFn*/) {
	var a = [], cb = arguments[1], thisArg = arguments[2];
	cb = isValue(cb) ? callable(cb) : defaultCb;

	forEach(
		obj,
		function (value, key, targetObj, index) {
			a.push(call.call(cb, thisArg, value, key, this, index));
		},
		obj, arguments[3]
	);
	return a;
};

}, function(modId) { var map = {"./valid-callable":1629437952319,"./is-value":1629437952302,"./for-each":1629437952467}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952467, function(require, module, exports) {


module.exports = require("./_iterate")("forEach");

}, function(modId) { var map = {"./_iterate":1629437952468}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952468, function(require, module, exports) {
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order



var callable                = require("./valid-callable")
  , value                   = require("./valid-value")
  , bind                    = Function.prototype.bind
  , call                    = Function.prototype.call
  , keys                    = Object.keys
  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb/*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== "function") method = list[method];
		return call.call(method, list, function (key, index) {
			if (!objPropertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};

}, function(modId) { var map = {"./valid-callable":1629437952319,"./valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952469, function(require, module, exports) {


module.exports = {
	acosh: require("./acosh"),
	asinh: require("./asinh"),
	atanh: require("./atanh"),
	cbrt: require("./cbrt"),
	ceil10: require("./ceil-10"),
	clz32: require("./clz32"),
	cosh: require("./cosh"),
	expm1: require("./expm1"),
	floor10: require("./floor-10"),
	fround: require("./fround"),
	hypot: require("./hypot"),
	imul: require("./imul"),
	log10: require("./log10"),
	log2: require("./log2"),
	log1p: require("./log1p"),
	round10: require("./round-10"),
	sign: require("./sign"),
	sinh: require("./sinh"),
	tanh: require("./tanh"),
	trunc: require("./trunc")
};

}, function(modId) { var map = {"./acosh":1629437952470,"./asinh":1629437952473,"./atanh":1629437952476,"./cbrt":1629437952479,"./ceil-10":1629437952482,"./clz32":1629437952489,"./cosh":1629437952492,"./expm1":1629437952495,"./floor-10":1629437952498,"./fround":1629437952499,"./hypot":1629437952504,"./imul":1629437952507,"./log10":1629437952510,"./log2":1629437952513,"./log1p":1629437952516,"./round-10":1629437952519,"./sign":1629437952316,"./sinh":1629437952520,"./tanh":1629437952523,"./trunc":1629437952526}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952470, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.acosh : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952471,"./shim":1629437952472}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952471, function(require, module, exports) {


module.exports = function () {
	var acosh = Math.acosh;
	if (typeof acosh !== "function") return false;
	return acosh(2) === 1.3169578969248166;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952472, function(require, module, exports) {


var log = Math.log, sqrt = Math.sqrt;

module.exports = function (value) {
	if (isNaN(value)) return NaN;
	value = Number(value);
	if (value < 1) return NaN;
	if (value === 1) return 0;
	if (value === Infinity) return value;
	return log(value + sqrt(value * value - 1));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952473, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.asinh : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952474,"./shim":1629437952475}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952474, function(require, module, exports) {


module.exports = function () {
	var asinh = Math.asinh;
	if (typeof asinh !== "function") return false;
	return asinh(2) === 1.4436354751788103;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952475, function(require, module, exports) {


var log = Math.log, sqrt = Math.sqrt;

module.exports = function (value) {
	if (isNaN(value)) return NaN;
	value = Number(value);
	if (value === 0) return value;
	if (!isFinite(value)) return value;
	if (value < 0) {
		value = -value;
		return -log(value + sqrt(value * value + 1));
	}
	return log(value + sqrt(value * value + 1));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952476, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.atanh : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952477,"./shim":1629437952478}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952477, function(require, module, exports) {


module.exports = function () {
	var atanh = Math.atanh;
	if (typeof atanh !== "function") return false;
	return Math.round(atanh(0.5) * 1e15) === 549306144334055;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952478, function(require, module, exports) {


var log = Math.log;

module.exports = function (value) {
	if (isNaN(value)) return NaN;
	value = Number(value);
	if (value < -1) return NaN;
	if (value > 1) return NaN;
	if (value === -1) return -Infinity;
	if (value === 1) return Infinity;
	if (value === 0) return value;
	return 0.5 * log((1 + value) / (1 - value));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952479, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.cbrt : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952480,"./shim":1629437952481}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952480, function(require, module, exports) {


module.exports = function () {
	var cbrt = Math.cbrt;
	if (typeof cbrt !== "function") return false;
	return cbrt(2) === 1.2599210498948732;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952481, function(require, module, exports) {


var pow = Math.pow;

module.exports = function (value) {
	if (isNaN(value)) return NaN;
	value = Number(value);
	if (value === 0) return value;
	if (!isFinite(value)) return value;
	if (value < 0) return -pow(-value, 1 / 3);
	return pow(value, 1 / 3);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952482, function(require, module, exports) {


module.exports = require("./_decimal-adjust")("ceil");

}, function(modId) { var map = {"./_decimal-adjust":1629437952483}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952483, function(require, module, exports) {
// Credit:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
// #Decimal_rounding



var isValue       = require("../object/is-value")
  , ensureInteger = require("../object/ensure-integer");

var split = String.prototype.split;

module.exports = function (type) {
	return function (value/*, exp*/) {
		value = Number(value);
		var exp = arguments[1];
		if (isValue(exp)) exp = ensureInteger(exp);
		if (!value) return value;
		if (!exp) return Math[type](value);
		if (!isFinite(value)) return value;

		// Shift
		var tokens = split.call(value, "e");
		value = Math[type](tokens[0] + "e" + ((tokens[1] || 0) - exp));

		// Shift back
		tokens = value.toString().split("e");
		return Number(tokens[0] + "e" + (Number(tokens[1] || 0) + exp));
	};
};

}, function(modId) { var map = {"../object/is-value":1629437952302,"../object/ensure-integer":1629437952484}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952484, function(require, module, exports) {


var toShortString = require("../to-short-string-representation")
  , isInteger     = require("./is-integer");

module.exports = function (num) {
	if (!isInteger(num)) throw new TypeError(toShortString(num) + " is not a integer");
	return Number(num);
};

}, function(modId) { var map = {"../to-short-string-representation":1629437952306,"./is-integer":1629437952485}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952485, function(require, module, exports) {


var isInteger = require("../number/is-integer")
  , isValue   = require("./is-value");

module.exports = function (arg) {
	if (!isValue(arg)) return false;
	arg = Number(arg);
	return isInteger(arg);
};

}, function(modId) { var map = {"../number/is-integer":1629437952486,"./is-value":1629437952302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952486, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Number.isInteger : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952487,"./shim":1629437952488}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952487, function(require, module, exports) {


module.exports = function () {
	var isInteger = Number.isInteger;
	if (typeof isInteger !== "function") return false;
	return !isInteger("23") && isInteger(34) && !isInteger(32.34);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952488, function(require, module, exports) {
// Credit: http://www.2ality.com/2014/05/is-integer.html



module.exports = function (value) {
	if (typeof value !== "number") return false;
	return value % 1 === 0;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952489, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.clz32 : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952490,"./shim":1629437952491}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952490, function(require, module, exports) {


module.exports = function () {
	var clz32 = Math.clz32;
	if (typeof clz32 !== "function") return false;
	return clz32(1000) === 22;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952491, function(require, module, exports) {


module.exports = function (value) {
	// eslint-disable-next-line no-bitwise
	value >>>= 0;
	return value ? 32 - value.toString(2).length : 32;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952492, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.cosh : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952493,"./shim":1629437952494}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952493, function(require, module, exports) {


module.exports = function () {
	var cosh = Math.cosh;
	if (typeof cosh !== "function") return false;
	return cosh(1) === 1.5430806348152437;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952494, function(require, module, exports) {


var exp = Math.exp;

module.exports = function (value) {
	if (isNaN(value)) return NaN;
	value = Number(value);
	if (value === 0) return 1;
	if (!isFinite(value)) return Infinity;
	return (exp(value) + exp(-value)) / 2;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952495, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.expm1 : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952496,"./shim":1629437952497}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952496, function(require, module, exports) {


module.exports = function () {
	var expm1 = Math.expm1;
	if (typeof expm1 !== "function") return false;
	return expm1(1).toFixed(15) === "1.718281828459045";
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952497, function(require, module, exports) {
// Thanks: https://github.com/monolithed/ECMAScript-6



var exp = Math.exp;

module.exports = function (value) {
	if (isNaN(value)) return NaN;
	value = Number(value);
	if (value === 0) return value;
	if (value === Infinity) return Infinity;
	if (value === -Infinity) return -1;

	if (value > -1.0e-6 && value < 1.0e-6) return value + (value * value) / 2;
	return exp(value) - 1;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952498, function(require, module, exports) {


module.exports = require("./_decimal-adjust")("floor");

}, function(modId) { var map = {"./_decimal-adjust":1629437952483}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952499, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.fround : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952500,"./shim":1629437952501}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952500, function(require, module, exports) {


module.exports = function () {
	var fround = Math.fround;
	if (typeof fround !== "function") return false;
	return fround(1.337) === 1.3370000123977661;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952501, function(require, module, exports) {
/* global Float32Array */

// Credit: https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js



var toFloat32;

if (typeof Float32Array === "undefined") {
	toFloat32 = (function () {
		var pack   = require("../_pack-ieee754")
		  , unpack = require("../_unpack-ieee754");

		return function (value) { return unpack(pack(value, 8, 23), 8, 23); };
	})();
} else {
	toFloat32 = (function () {
		var float32Array = new Float32Array(1);
		return function (num) {
			float32Array[0] = num;
			return float32Array[0];
		};
	})();
}

module.exports = function (value) {
	if (isNaN(value)) return NaN;
	value = Number(value);
	if (value === 0) return value;
	if (!isFinite(value)) return value;

	return toFloat32(value);
};

}, function(modId) { var map = {"../_pack-ieee754":1629437952502,"../_unpack-ieee754":1629437952503}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952502, function(require, module, exports) {
/* eslint no-bitwise: "off" */
// Credit: https://github.com/paulmillr/es6-shim/



var abs = Math.abs
  , floor = Math.floor
  , log = Math.log
  , min = Math.min
  , pow = Math.pow
  , LN2 = Math.LN2
  , roundToEven;

roundToEven = function (num) {
	var whole = floor(num), fraction = num - whole;
	if (fraction < 0.5) return whole;
	if (fraction > 0.5) return whole + 1;
	return whole % 2 ? whole + 1 : whole;
};

// eslint-disable-next-line max-statements, max-lines-per-function
module.exports = function (value, ebits, fbits) {
	var bias = (1 << (ebits - 1)) - 1, sign, e, fraction, i, bits, str, bytes;

	// Compute sign, exponent, fraction
	if (isNaN(value)) {
		// NaN
		// http://dev.w3.org/2006/webapi/WebIDL/#es-type-mapping
		e = (1 << ebits) - 1;
		fraction = pow(2, fbits - 1);
		sign = 0;
	} else if (value === Infinity || value === -Infinity) {
		e = (1 << ebits) - 1;
		fraction = 0;
		sign = value < 0 ? 1 : 0;
	} else if (value === 0) {
		e = 0;
		fraction = 0;
		sign = 1 / value === -Infinity ? 1 : 0;
	} else {
		sign = value < 0;
		value = abs(value);

		if (value >= pow(2, 1 - bias)) {
			e = min(floor(log(value) / LN2), 1023);
			fraction = roundToEven((value / pow(2, e)) * pow(2, fbits));
			if (fraction / pow(2, fbits) >= 2) {
				e += 1;
				fraction = 1;
			}
			if (e > bias) {
				// Overflow
				e = (1 << ebits) - 1;
				fraction = 0;
			} else {
				// Normal
				e += bias;
				fraction -= pow(2, fbits);
			}
		} else {
			// Subnormal
			e = 0;
			fraction = roundToEven(value / pow(2, 1 - bias - fbits));
		}
	}

	// Pack sign, exponent, fraction
	bits = [];
	for (i = fbits; i; i -= 1) {
		bits.push(fraction % 2 ? 1 : 0);
		fraction = floor(fraction / 2);
	}
	for (i = ebits; i; i -= 1) {
		bits.push(e % 2 ? 1 : 0);
		e = floor(e / 2);
	}
	bits.push(sign ? 1 : 0);
	bits.reverse();
	str = bits.join("");

	// Bits to bytes
	bytes = [];
	while (str.length) {
		bytes.push(parseInt(str.substring(0, 8), 2));
		str = str.substring(8);
	}
	return bytes;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952503, function(require, module, exports) {
/* eslint no-bitwise: "off" */
// Credit: https://github.com/paulmillr/es6-shim/



var pow = Math.pow;

module.exports = function (bytes, ebits, fbits) {
	// Bytes to bits
	var bits = [], i, j, bit, str, bias, sign, e, fraction;

	for (i = bytes.length; i; i -= 1) {
		bit = bytes[i - 1];
		for (j = 8; j; j -= 1) {
			bits.push(bit % 2 ? 1 : 0);
			bit >>= 1;
		}
	}
	bits.reverse();
	str = bits.join("");

	// Unpack sign, exponent, fraction
	bias = (1 << (ebits - 1)) - 1;
	sign = parseInt(str.substring(0, 1), 2) ? -1 : 1;
	e = parseInt(str.substring(1, 1 + ebits), 2);
	fraction = parseInt(str.substring(1 + ebits), 2);

	// Produce number
	if (e === (1 << ebits) - 1) return fraction === 0 ? sign * Infinity : NaN;
	if (e > 0) return sign * pow(2, e - bias) * (1 + fraction / pow(2, fbits));
	if (fraction !== 0) return sign * pow(2, -(bias - 1)) * (fraction / pow(2, fbits));
	return sign < 0 ? -0 : 0;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952504, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.hypot : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952505,"./shim":1629437952506}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952505, function(require, module, exports) {


module.exports = function () {
	var hypot = Math.hypot;
	if (typeof hypot !== "function") return false;
	return hypot(3, 4) === 5;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952506, function(require, module, exports) {
// Thanks for hints: https://github.com/paulmillr/es6-shim



var some = Array.prototype.some
  , abs = Math.abs
  , sqrt = Math.sqrt
  , compare = function (val1, val2) { return val2 - val1; }
  , divide = function (value) { return value / this; }
  , add = function (sum, number) { return sum + number * number; };

// eslint-disable-next-line no-unused-vars
module.exports = function (val1, val2/*, …valn*/) {
	var result, numbers;
	if (!arguments.length) return 0;
	some.call(arguments, function (val) {
		if (isNaN(val)) {
			result = NaN;
			return false;
		}
		if (!isFinite(val)) {
			result = Infinity;
			return true;
		}
		if (result !== undefined) return false;
		val = Number(val);
		if (val === 0) return false;
		if (numbers) numbers.push(abs(val));
		else numbers = [abs(val)];
		return false;
	});
	if (result !== undefined) return result;
	if (!numbers) return 0;

	numbers.sort(compare);
	return numbers[0] * sqrt(numbers.map(divide, numbers[0]).reduce(add, 0));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952507, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.imul : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952508,"./shim":1629437952509}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952508, function(require, module, exports) {


module.exports = function () {
	var imul = Math.imul;
	if (typeof imul !== "function") return false;
	return imul(-1, 8) === -8;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952509, function(require, module, exports) {
/* eslint no-bitwise: "off" */

// Thanks: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
//         /Global_Objects/Math/imul



module.exports = function (val1, val2) {
	var xh = (val1 >>> 16) & 0xffff
	  , xl = val1 & 0xffff
	  , yh = (val2 >>> 16) & 0xffff
	  , yl = val2 & 0xffff;

	// The shift by 0 fixes the sign on the high part
	// the final |0 converts the unsigned value into a signed value
	return (xl * yl + (((xh * yl + xl * yh) << 16) >>> 0)) | 0;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952510, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.log10 : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952511,"./shim":1629437952512}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952511, function(require, module, exports) {


module.exports = function () {
	var log10 = Math.log10;
	if (typeof log10 !== "function") return false;
	return log10(2) === 0.3010299956639812;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952512, function(require, module, exports) {


var log = Math.log, LOG10E = Math.LOG10E;

module.exports = function (value) {
	if (isNaN(value)) return NaN;
	value = Number(value);
	if (value < 0) return NaN;
	if (value === 0) return -Infinity;
	if (value === 1) return 0;
	if (value === Infinity) return Infinity;

	return log(value) * LOG10E;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952513, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.log2 : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952514,"./shim":1629437952515}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952514, function(require, module, exports) {


module.exports = function () {
	var log2 = Math.log2;
	if (typeof log2 !== "function") return false;
	return log2(3).toFixed(15) === "1.584962500721156";
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952515, function(require, module, exports) {


var log = Math.log, LOG2E = Math.LOG2E;

module.exports = function (value) {
	if (isNaN(value)) return NaN;
	value = Number(value);
	if (value < 0) return NaN;
	if (value === 0) return -Infinity;
	if (value === 1) return 0;
	if (value === Infinity) return Infinity;

	return log(value) * LOG2E;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952516, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.log1p : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952517,"./shim":1629437952518}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952517, function(require, module, exports) {


module.exports = function () {
	var log1p = Math.log1p;
	if (typeof log1p !== "function") return false;
	return log1p(1) === 0.6931471805599453;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952518, function(require, module, exports) {
// Thanks: https://github.com/monolithed/ECMAScript-6/blob/master/ES6.js



var log = Math.log;

module.exports = function (value) {
	if (isNaN(value)) return NaN;
	value = Number(value);
	if (value < -1) return NaN;
	if (value === -1) return -Infinity;
	if (value === 0) return value;
	if (value === Infinity) return Infinity;

	if (value > -1.0e-8 && value < 1.0e-8) return value - (value * value) / 2;
	return log(1 + value);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952519, function(require, module, exports) {


module.exports = require("./_decimal-adjust")("round");

}, function(modId) { var map = {"./_decimal-adjust":1629437952483}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952520, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.sinh : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952521,"./shim":1629437952522}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952521, function(require, module, exports) {


module.exports = function () {
	var sinh = Math.sinh;
	if (typeof sinh !== "function") return false;
	return sinh(1) === 1.1752011936438014 && sinh(Number.MIN_VALUE) === 5e-324;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952522, function(require, module, exports) {
// Parts of implementation taken from es6-shim project
// See: https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js



var expm1 = require("../expm1")
  , abs   = Math.abs
  , exp   = Math.exp
  , e     = Math.E;

module.exports = function (value) {
	if (isNaN(value)) return NaN;
	value = Number(value);
	if (value === 0) return value;
	if (!isFinite(value)) return value;
	if (abs(value) < 1) return (expm1(value) - expm1(-value)) / 2;
	return ((exp(value - 1) - exp(-value - 1)) * e) / 2;
};

}, function(modId) { var map = {"../expm1":1629437952495}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952523, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.tanh : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952524,"./shim":1629437952525}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952524, function(require, module, exports) {


module.exports = function () {
	var tanh = Math.tanh;
	if (typeof tanh !== "function") return false;
	return tanh(1) === 0.7615941559557649 && tanh(Number.MAX_VALUE) === 1;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952525, function(require, module, exports) {


var exp = Math.exp;

module.exports = function (value) {
	var num1, num2;
	if (isNaN(value)) return NaN;
	value = Number(value);
	if (value === 0) return value;
	if (value === Infinity) return 1;
	if (value === -Infinity) return -1;
	num1 = exp(value);
	if (num1 === Infinity) return 1;
	num2 = exp(-value);
	if (num2 === Infinity) return -1;
	return (num1 - num2) / (num1 + num2);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952526, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Math.trunc : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952527,"./shim":1629437952528}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952527, function(require, module, exports) {


module.exports = function () {
	var trunc = Math.trunc;
	if (typeof trunc !== "function") return false;
	return trunc(13.67) === 13 && trunc(-13.67) === -13;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952528, function(require, module, exports) {


var floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return NaN;
	value = Number(value);
	if (value === 0) return value;
	if (value === Infinity) return Infinity;
	if (value === -Infinity) return -Infinity;
	if (value > 0) return floor(value);
	return -floor(-value);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952529, function(require, module, exports) {


module.exports = {
	"#": require("./#"),
	"EPSILON": require("./epsilon"),
	"isFinite": require("./is-finite"),
	"isInteger": require("./is-integer"),
	"isNaN": require("./is-nan"),
	"isNatural": require("./is-natural"),
	"isNumber": require("./is-number"),
	"isSafeInteger": require("./is-safe-integer"),
	"MAX_SAFE_INTEGER": require("./max-safe-integer"),
	"MIN_SAFE_INTEGER": require("./min-safe-integer"),
	"toInteger": require("./to-integer"),
	"toPosInteger": require("./to-pos-integer"),
	"toUint32": require("./to-uint32")
};

}, function(modId) { var map = {"./#":1629437952530,"./epsilon":1629437952531,"./is-finite":1629437952532,"./is-integer":1629437952486,"./is-nan":1629437952337,"./is-natural":1629437952535,"./is-number":1629437952536,"./is-safe-integer":1629437952537,"./max-safe-integer":1629437952540,"./min-safe-integer":1629437952541,"./to-integer":1629437952315,"./to-pos-integer":1629437952314,"./to-uint32":1629437952542}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952530, function(require, module, exports) {


module.exports = { pad: require("./pad") };

}, function(modId) { var map = {"./pad":1629437952418}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952531, function(require, module, exports) {


module.exports = 2.220446049250313e-16;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952532, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Number.isFinite : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952533,"./shim":1629437952534}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952533, function(require, module, exports) {


module.exports = function () {
	var numberIsFinite = Number.isFinite;
	if (typeof numberIsFinite !== "function") return false;
	return !numberIsFinite("23") && numberIsFinite(34) && !numberIsFinite(Infinity);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952534, function(require, module, exports) {


module.exports = function (value) { return typeof value === "number" && isFinite(value); };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952535, function(require, module, exports) {


var isInteger = require("./is-integer");

module.exports = function (num) { return isInteger(num) && num >= 0; };

}, function(modId) { var map = {"./is-integer":1629437952486}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952536, function(require, module, exports) {


var objToString = Object.prototype.toString, id = objToString.call(1);

module.exports = function (value) {
	return (
		typeof value === "number" ||
		(value instanceof Number || (typeof value === "object" && objToString.call(value) === id))
	);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952537, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Number.isSafeInteger : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952538,"./shim":1629437952539}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952538, function(require, module, exports) {


module.exports = function () {
	var isSafeInteger = Number.isSafeInteger;
	if (typeof isSafeInteger !== "function") return false;
	return !isSafeInteger("23") && isSafeInteger(34232322323) && !isSafeInteger(9007199254740992);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952539, function(require, module, exports) {


var isInteger = require("../is-integer/shim")
  , maxValue  = require("../max-safe-integer")
  , abs       = Math.abs;

module.exports = function (value) {
	if (!isInteger(value)) return false;
	return abs(value) <= maxValue;
};

}, function(modId) { var map = {"../is-integer/shim":1629437952488,"../max-safe-integer":1629437952540}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952540, function(require, module, exports) {


module.exports = Math.pow(2, 53) - 1;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952541, function(require, module, exports) {


module.exports = -(Math.pow(2, 53) - 1);

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952542, function(require, module, exports) {


module.exports = function (value) {
	// eslint-disable-next-line no-bitwise
	return value >>> 0;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952543, function(require, module, exports) {


module.exports = {
	assign: require("./assign"),
	assignDeep: require("./assign-deep"),
	clear: require("./clear"),
	compact: require("./compact"),
	compare: require("./compare"),
	copy: require("./copy"),
	copyDeep: require("./copy-deep"),
	count: require("./count"),
	create: require("./create"),
	ensureArray: require("./ensure-array"),
	ensureFiniteNumber: require("./ensure-finite-number"),
	ensureInteger: require("./ensure-integer"),
	ensureNaturalNumber: require("./ensure-natural-number"),
	ensureNaturalNumberValue: require("./ensure-natural-number-value"),
	ensurePlainFunction: require("./ensure-plain-function"),
	ensurePlainObject: require("./ensure-plain-object"),
	ensurePromise: require("./ensure-promise"),
	ensureThenable: require("./ensure-thenable"),
	entries: require("./entries"),
	eq: require("./eq"),
	every: require("./every"),
	filter: require("./filter"),
	find: require("./find"),
	findKey: require("./find-key"),
	firstKey: require("./first-key"),
	flatten: require("./flatten"),
	forEach: require("./for-each"),
	getPropertyNames: require("./get-property-names"),
	is: require("./is"),
	isArrayLike: require("./is-array-like"),
	isCallable: require("./is-callable"),
	isCopy: require("./is-copy"),
	isCopyDeep: require("./is-copy-deep"),
	isEmpty: require("./is-empty"),
	isFiniteNumber: require("./is-finite-number"),
	isInteger: require("./is-integer"),
	isNaturalNumber: require("./is-natural-number"),
	isNaturalNumberValue: require("./is-natural-number-value"),
	isNumberValue: require("./is-number-value"),
	isObject: require("./is-object"),
	isPlainFunction: require("./is-plain-function"),
	isPlainObject: require("./is-plain-object"),
	isPromise: require("./is-promise"),
	isThenable: require("./is-thenable"),
	isValue: require("./is-value"),
	keyOf: require("./key-of"),
	keys: require("./keys"),
	map: require("./map"),
	mapKeys: require("./map-keys"),
	normalizeOptions: require("./normalize-options"),
	mixin: require("./mixin"),
	mixinPrototypes: require("./mixin-prototypes"),
	primitiveSet: require("./primitive-set"),
	safeTraverse: require("./safe-traverse"),
	serialize: require("./serialize"),
	setPrototypeOf: require("./set-prototype-of"),
	some: require("./some"),
	toArray: require("./to-array"),
	unserialize: require("./unserialize"),
	validateArrayLike: require("./validate-array-like"),
	validateArrayLikeObject: require("./validate-array-like-object"),
	validCallable: require("./valid-callable"),
	validObject: require("./valid-object"),
	validateStringifiable: require("./validate-stringifiable"),
	validateStringifiableValue: require("./validate-stringifiable-value"),
	validValue: require("./valid-value")
};

}, function(modId) { var map = {"./assign":1629437952434,"./assign-deep":1629437952544,"./clear":1629437952547,"./compact":1629437952548,"./compare":1629437952550,"./copy":1629437952552,"./copy-deep":1629437952545,"./count":1629437952553,"./create":1629437952330,"./ensure-array":1629437952382,"./ensure-finite-number":1629437952554,"./ensure-integer":1629437952484,"./ensure-natural-number":1629437952557,"./ensure-natural-number-value":1629437952558,"./ensure-plain-function":1629437952450,"./ensure-plain-object":1629437952561,"./ensure-promise":1629437952562,"./ensure-thenable":1629437952565,"./entries":1629437952566,"./eq":1629437952380,"./every":1629437952569,"./filter":1629437952549,"./find":1629437952570,"./find-key":1629437952571,"./first-key":1629437952572,"./flatten":1629437952573,"./for-each":1629437952467,"./get-property-names":1629437952574,"./is":1629437952575,"./is-array-like":1629437952383,"./is-callable":1629437952305,"./is-copy":1629437952576,"./is-copy-deep":1629437952577,"./is-empty":1629437952578,"./is-finite-number":1629437952555,"./is-integer":1629437952485,"./is-natural-number":1629437952560,"./is-natural-number-value":1629437952559,"./is-number-value":1629437952556,"./is-object":1629437952329,"./is-plain-function":1629437952451,"./is-plain-object":1629437952546,"./is-promise":1629437952563,"./is-thenable":1629437952564,"./is-value":1629437952302,"./key-of":1629437952579,"./keys":1629437952437,"./map":1629437952581,"./map-keys":1629437952582,"./normalize-options":1629437952583,"./mixin":1629437952444,"./mixin-prototypes":1629437952584,"./primitive-set":1629437952585,"./safe-traverse":1629437952586,"./serialize":1629437952587,"./set-prototype-of":1629437952326,"./some":1629437952580,"./to-array":1629437952466,"./unserialize":1629437952589,"./validate-array-like":1629437952590,"./validate-array-like-object":1629437952591,"./valid-callable":1629437952319,"./valid-object":1629437952592,"./validate-stringifiable":1629437952593,"./validate-stringifiable-value":1629437952594,"./valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952544, function(require, module, exports) {


var includes      = require("../array/#/contains")
  , uniq          = require("../array/#/uniq")
  , copyDeep      = require("./copy-deep")
  , objForEach    = require("./for-each")
  , isPlainObject = require("./is-plain-object")
  , ensureValue   = require("./valid-value");

var isArray = Array.isArray, slice = Array.prototype.slice;

var deepAssign = function (target, source) {
	if (target === source) return target;
	if (isPlainObject(target) && isPlainObject(source)) {
		objForEach(source, function (value, key) { target[key] = deepAssign(target[key], value); });
		return target;
	}
	if (isArray(target) && isArray(source)) {
		source.forEach(function (item) {
			if (includes.call(target, item)) return;
			if (isArray(item) || isPlainObject(item)) item = copyDeep(item);
			target.push(item);
		});
		return target;
	}
	if (isPlainObject(source) || isArray(source)) return copyDeep(source);
	return source;
};

module.exports = function (target/*, ...objects*/) {
	return uniq
		.call([ensureValue(target)].concat(slice.call(arguments, 1).map(ensureValue)))
		.reduce(deepAssign);
};

}, function(modId) { var map = {"../array/#/contains":1629437952335,"../array/#/uniq":1629437952400,"./copy-deep":1629437952545,"./for-each":1629437952467,"./is-plain-object":1629437952546,"./valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952545, function(require, module, exports) {


var forEach       = require("./for-each")
  , isPlainObject = require("./is-plain-object")
  , ensureValue   = require("./valid-value")
  , isArray       = Array.isArray;

var copyValue = function (value, ancestors, ancestorsCopy) {
	var mode;
	if (isPlainObject(value)) mode = "object";
	else if (isArray(value)) mode = "array";
	if (!mode) return value;

	var copy = ancestorsCopy[ancestors.indexOf(value)];
	if (copy) return copy;
	copy = mode === "object" ? {} : [];

	ancestors.push(value);
	ancestorsCopy.push(copy);
	if (mode === "object") {
		forEach(value, function (item, key) {
			copy[key] = copyValue(item, ancestors, ancestorsCopy);
		});
	} else {
		value.forEach(function (item, index) {
			copy[index] = copyValue(item, ancestors, ancestorsCopy);
		});
	}
	ancestors.pop();
	ancestorsCopy.pop();

	return copy;
};

module.exports = function (source) { return copyValue(ensureValue(source), [], []); };

}, function(modId) { var map = {"./for-each":1629437952467,"./is-plain-object":1629437952546,"./valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952546, function(require, module, exports) {


var getPrototypeOf = Object.getPrototypeOf
  , prototype = Object.prototype
  , objToString = prototype.toString
  , id = Object().toString();

module.exports = function (value) {
	var proto, valueConstructor;
	if (!value || typeof value !== "object" || objToString.call(value) !== id) {
		return false;
	}
	proto = getPrototypeOf(value);
	if (proto === null) {
		valueConstructor = value.constructor;
		if (typeof valueConstructor !== "function") return true;
		return valueConstructor.prototype !== value;
	}
	return proto === prototype || getPrototypeOf(proto) === null;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952547, function(require, module, exports) {


var keys = require("./keys");

module.exports = function (obj) {
	var error;
	keys(obj).forEach(function (key) {
		try {
			delete this[key];
		} catch (e) {
			if (!error) error = e;
		}
	}, obj);
	if (error !== undefined) throw error;
	return obj;
};

}, function(modId) { var map = {"./keys":1629437952437}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952548, function(require, module, exports) {


var filter  = require("./filter")
  , isValue = require("./is-value");

module.exports = function (obj) {
	return filter(obj, function (val) { return isValue(val); });
};

}, function(modId) { var map = {"./filter":1629437952549,"./is-value":1629437952302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952549, function(require, module, exports) {


var callable = require("./valid-callable")
  , forEach  = require("./for-each")
  , call     = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
	var result = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, targetObj, index) {
		if (call.call(cb, thisArg, value, key, targetObj, index)) result[key] = targetObj[key];
	});
	return result;
};

}, function(modId) { var map = {"./valid-callable":1629437952319,"./for-each":1629437952467}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952550, function(require, module, exports) {


var strCompare = require("../string/#/case-insensitive-compare")
  , isObject   = require("./is-object")
  , isValue    = require("./is-value")
  , numIsNaN   = require("../number/is-nan")
  , resolve
  , typeMap;

typeMap = { undefined: 0, object: 1, boolean: 2, string: 3, number: 4 };

resolve = function (a) {
	if (isObject(a)) {
		if (typeof a.valueOf !== "function") return NaN;
		a = a.valueOf();
		if (isObject(a)) {
			if (typeof a.toString !== "function") return NaN;
			a = a.toString();
			if (typeof a !== "string") return NaN;
		}
	}
	return a;
};

module.exports = function (val1, val2) {
	if (val1 === val2) return 0; // Same

	val1 = resolve(val1);
	val2 = resolve(val2);
	// eslint-disable-next-line eqeqeq
	if (val1 == val2) return typeMap[typeof val1] - typeMap[typeof val2];
	if (!isValue(val1)) return -1;
	if (!isValue(val2)) return 1;
	if (typeof val1 === "string" || typeof val2 === "string") {
		return strCompare.call(val1, val2);
	}
	if (numIsNaN(val1) && numIsNaN(val2)) return 0; // Jslint: ignore
	return Number(val1) - Number(val2);
};

}, function(modId) { var map = {"../string/#/case-insensitive-compare":1629437952551,"./is-object":1629437952329,"./is-value":1629437952302,"../number/is-nan":1629437952337}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952551, function(require, module, exports) {


var toLowerCase = String.prototype.toLowerCase;

module.exports = function (other) {
	return toLowerCase.call(this).localeCompare(toLowerCase.call(String(other)));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952552, function(require, module, exports) {


var aFrom  = require("../array/from")
  , assign = require("./assign")
  , value  = require("./valid-value");

module.exports = function (obj/*, propertyNames, options*/) {
	var copy = Object(value(obj)), propertyNames = arguments[1], options = Object(arguments[2]);
	if (copy !== obj && !propertyNames) return copy;
	var result = {};
	if (propertyNames) {
		aFrom(propertyNames, function (propertyName) {
			if (options.ensure || propertyName in obj) result[propertyName] = obj[propertyName];
		});
	} else {
		assign(result, obj);
	}
	return result;
};

}, function(modId) { var map = {"../array/from":1629437952349,"./assign":1629437952434,"./valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952553, function(require, module, exports) {


var keys = require("./keys");

module.exports = function (obj) { return keys(obj).length; };

}, function(modId) { var map = {"./keys":1629437952437}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952554, function(require, module, exports) {


var isFiniteNumber = require("./is-finite-number")
  , safeToString   = require("../safe-to-string");

module.exports = function (value) {
	if (isFiniteNumber(value)) return Number(value);
	throw new TypeError(safeToString(value) + " does not represent a finite number value");
};

}, function(modId) { var map = {"./is-finite-number":1629437952555,"../safe-to-string":1629437952304}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952555, function(require, module, exports) {


var isNumber = require("./is-number-value");

module.exports = function (value) { return isNumber(value) && isFinite(value); };

}, function(modId) { var map = {"./is-number-value":1629437952556}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952556, function(require, module, exports) {


var isValue = require("./is-value");

module.exports = function (value) {
	if (!isValue(value)) return false;
	try { return !isNaN(value); }
	catch (e) { return false; }
};

}, function(modId) { var map = {"./is-value":1629437952302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952557, function(require, module, exports) {


var isNatural     = require("../number/is-natural")
  , toShortString = require("../to-short-string-representation");

module.exports = function (arg) {
	var num = Number(arg);
	if (!isNatural(num)) throw new TypeError(toShortString(arg) + " is not a natural number");
	return num;
};

}, function(modId) { var map = {"../number/is-natural":1629437952535,"../to-short-string-representation":1629437952306}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952558, function(require, module, exports) {


var isNaturalValue = require("./is-natural-number-value")
  , toShortString  = require("../to-short-string-representation");

module.exports = function (arg) {
	var num = Number(arg);
	if (!isNaturalValue(arg)) throw new TypeError(toShortString(arg) + " is not a natural number");
	return num;
};

}, function(modId) { var map = {"./is-natural-number-value":1629437952559,"../to-short-string-representation":1629437952306}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952559, function(require, module, exports) {


var isNaturalNumber = require("./is-natural-number")
  , isValue         = require("./is-value");

module.exports = function (arg) {
	if (!isValue(arg)) return false;
	return isNaturalNumber(arg);
};

}, function(modId) { var map = {"./is-natural-number":1629437952560,"./is-value":1629437952302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952560, function(require, module, exports) {


var isNatural = require("../number/is-natural");

module.exports = function (arg) { return isNatural(Number(arg)); };

}, function(modId) { var map = {"../number/is-natural":1629437952535}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952561, function(require, module, exports) {


var safeToString  = require("../safe-to-string")
  , isPlainObject = require("./is-plain-object");

module.exports = function (value) {
	if (!isPlainObject(value)) throw new TypeError(safeToString(value) + " is not a plain object");
	return value;
};

}, function(modId) { var map = {"../safe-to-string":1629437952304,"./is-plain-object":1629437952546}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952562, function(require, module, exports) {


var safeToString = require("../safe-to-string")
  , isPromise    = require("./is-promise");

module.exports = function (value) {
	if (!isPromise(value)) throw new TypeError(safeToString(value) + " is not a promise");
	return value;
};

}, function(modId) { var map = {"../safe-to-string":1629437952304,"./is-promise":1629437952563}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952563, function(require, module, exports) {


// In next major this check will also confirm on promise constructor
module.exports = require("./is-thenable");

}, function(modId) { var map = {"./is-thenable":1629437952564}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952564, function(require, module, exports) {


var isCallable = require("./is-callable")
  , isObject   = require("./is-object");

module.exports = function (value) { return isObject(value) && isCallable(value.then); };

}, function(modId) { var map = {"./is-callable":1629437952305,"./is-object":1629437952329}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952565, function(require, module, exports) {


var safeToString = require("../safe-to-string")
  , isThenable   = require("./is-thenable");

module.exports = function (value) {
	if (!isThenable(value)) throw new TypeError(safeToString(value) + " is not a thenable");
	return value;
};

}, function(modId) { var map = {"../safe-to-string":1629437952304,"./is-thenable":1629437952564}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952566, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Object.entries : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952567,"./shim":1629437952568}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952567, function(require, module, exports) {


module.exports = function () {
	try { return Object.entries({ foo: 12 })[0][0] === "foo"; }
	catch (e) { return false; }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952568, function(require, module, exports) {


var ensureValue = require("../valid-value");

module.exports = function (object) {
	ensureValue(object);
	var result = [];
	object = Object(object);
	for (var key in object) {
		if (!propertyIsEnumerable.call(object, key)) continue;
		result.push([key, object[key]]);
	}
	return result;
};

}, function(modId) { var map = {"../valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952569, function(require, module, exports) {


module.exports = require("./_iterate")("every", true);

}, function(modId) { var map = {"./_iterate":1629437952468}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952570, function(require, module, exports) {


var findKey = require("./find-key")
  , isValue = require("./is-value");

// eslint-disable-next-line no-unused-vars
module.exports = function (obj, cb/*, thisArg, compareFn*/) {
	var key = findKey.apply(this, arguments);
	return isValue(key) ? obj[key] : key;
};

}, function(modId) { var map = {"./find-key":1629437952571,"./is-value":1629437952302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952571, function(require, module, exports) {


module.exports = require("./_iterate")(require("../array/#/find"), false);

}, function(modId) { var map = {"./_iterate":1629437952468,"../array/#/find":1629437952363}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952572, function(require, module, exports) {


var value                   = require("./valid-value")
  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (obj) {
	var i;
	value(obj);
	for (i in obj) {
		if (objPropertyIsEnumerable.call(obj, i)) return i;
	}
	return null;
};

}, function(modId) { var map = {"./valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952573, function(require, module, exports) {


var isPlainObject = require("./is-plain-object")
  , forEach       = require("./for-each")
  , process;

process = function self(value, key) {
	if (isPlainObject(value)) forEach(value, self, this);
	else this[key] = value;
};

module.exports = function (obj) {
	var flattened = {};
	forEach(obj, process, flattened);
	return flattened;
};

}, function(modId) { var map = {"./is-plain-object":1629437952546,"./for-each":1629437952467}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952574, function(require, module, exports) {


var uniq                = require("../array/#/uniq")
  , value               = require("./valid-value")
  , push                = Array.prototype.push
  , getOwnPropertyNames = Object.getOwnPropertyNames
  , getPrototypeOf      = Object.getPrototypeOf;

module.exports = function (obj) {
	var keys;
	obj = Object(value(obj));
	keys = getOwnPropertyNames(obj);
	while ((obj = getPrototypeOf(obj))) {
		push.apply(keys, getOwnPropertyNames(obj));
	}
	return uniq.call(keys);
};

}, function(modId) { var map = {"../array/#/uniq":1629437952400,"./valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952575, function(require, module, exports) {
// Implementation credits go to:
// http://wiki.ecmascript.org/doku.php?id=harmony:egal



var numIsNaN = require("../number/is-nan");

module.exports = function (val1, val2) {
	return val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : numIsNaN(val1) && numIsNaN(val2);
};

}, function(modId) { var map = {"../number/is-nan":1629437952337}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952576, function(require, module, exports) {


var eq                      = require("./eq")
  , value                   = require("./valid-value")
  , keys                    = Object.keys
  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (val1, val2) {
	var k1, k2;

	if (eq(value(val1), value(val2))) return true;

	val1 = Object(val1);
	val2 = Object(val2);

	k1 = keys(val1);
	k2 = keys(val2);
	if (k1.length !== k2.length) return false;
	return k1.every(function (key) {
		if (!objPropertyIsEnumerable.call(val2, key)) return false;
		return eq(val1[key], val2[key]);
	});
};

}, function(modId) { var map = {"./eq":1629437952380,"./valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952577, function(require, module, exports) {


var eq            = require("./eq")
  , isPlainObject = require("./is-plain-object")
  , value         = require("./valid-value");

var isArray = Array.isArray
  , keys = Object.keys
  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable
  , objHasOwnProperty = Object.prototype.hasOwnProperty
  , eqArr
  , eqVal
  , eqObj;

eqArr = function (arr1, arr2, recMap) {
	var i, length = arr1.length;
	if (length !== arr2.length) return false;
	for (i = 0; i < length; ++i) {
		if (objHasOwnProperty.call(arr1, i) !== objHasOwnProperty.call(arr2, i)) return false;
		if (!eqVal(arr1[i], arr2[i], recMap)) return false;
	}
	return true;
};

eqObj = function (obj1, obj2, recMap) {
	var k1 = keys(obj1), k2 = keys(obj2);
	if (k1.length !== k2.length) return false;
	return k1.every(function (key) {
		if (!objPropertyIsEnumerable.call(obj2, key)) return false;
		return eqVal(obj1[key], obj2[key], recMap);
	});
};

eqVal = function (val1, val2, recMap) {
	var i, eqX, c1, c2;
	if (eq(val1, val2)) return true;
	if (isPlainObject(val1)) {
		if (!isPlainObject(val2)) return false;
		eqX = eqObj;
	} else if (isArray(val1) && isArray(val2)) {
		eqX = eqArr;
	} else {
		return false;
	}
	c1 = recMap[0];
	c2 = recMap[1];
	i = c1.indexOf(val1);
	if (i === -1) {
		i = c1.push(val1) - 1;
		c2[i] = [];
	} else if (c2[i].indexOf(val2) !== -1) return true;
	c2[i].push(val2);
	return eqX(val1, val2, recMap);
};

module.exports = function (val1, val2) {
	if (eq(value(val1), value(val2))) return true;
	return eqVal(Object(val1), Object(val2), [[], []]);
};

}, function(modId) { var map = {"./eq":1629437952380,"./is-plain-object":1629437952546,"./valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952578, function(require, module, exports) {


var value                   = require("./valid-value")
  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (obj) {
	var i;
	value(obj);
	for (i in obj) {
		// Jslint: ignore
		if (objPropertyIsEnumerable.call(obj, i)) return false;
	}
	return true;
};

}, function(modId) { var map = {"./valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952579, function(require, module, exports) {


var eq   = require("./eq")
  , some = require("./some");

module.exports = function (obj, searchValue) {
	var result;
	return some(obj, function (value, name) {
		if (eq(value, searchValue)) {
			result = name;
			return true;
		}
		return false;
	})
		? result
		: null;
};

}, function(modId) { var map = {"./eq":1629437952380,"./some":1629437952580}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952580, function(require, module, exports) {


module.exports = require("./_iterate")("some", false);

}, function(modId) { var map = {"./_iterate":1629437952468}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952581, function(require, module, exports) {


var callable = require("./valid-callable")
  , forEach  = require("./for-each")
  , call     = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
	var result = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, targetObj, index) {
		result[key] = call.call(cb, thisArg, value, key, targetObj, index);
	});
	return result;
};

}, function(modId) { var map = {"./valid-callable":1629437952319,"./for-each":1629437952467}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952582, function(require, module, exports) {


var callable = require("./valid-callable")
  , forEach  = require("./for-each")
  , call     = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
	var result = {}, thisArg = arguments[2];
	callable(cb);
	forEach(
		obj,
		function (value, key, targetObj, index) {
			result[call.call(cb, thisArg, key, value, this, index)] = value;
		},
		obj
	);
	return result;
};

}, function(modId) { var map = {"./valid-callable":1629437952319,"./for-each":1629437952467}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952583, function(require, module, exports) {


var isValue = require("./is-value");

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};

}, function(modId) { var map = {"./is-value":1629437952302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952584, function(require, module, exports) {


var value = require("./valid-value")
  , mixin = require("./mixin");

var getPrototypeOf = Object.getPrototypeOf;

module.exports = function (target, source) {
	target = Object(value(target));
	source = Object(value(source));
	if (target === source) return target;

	var sources = [];
	while (source && !isPrototypeOf.call(source, target)) {
		sources.unshift(source);
		source = getPrototypeOf(source);
	}

	var error;
	sources.forEach(function (sourceProto) {
		try { mixin(target, sourceProto); } catch (mixinError) { error = mixinError; }
	});
	if (error) throw error;
	return target;
};

}, function(modId) { var map = {"./valid-value":1629437952320,"./mixin":1629437952444}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952585, function(require, module, exports) {


var forEach = Array.prototype.forEach, create = Object.create;

// eslint-disable-next-line no-unused-vars
module.exports = function (arg/*, …args*/) {
	var set = create(null);
	forEach.call(arguments, function (name) { set[name] = true; });
	return set;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952586, function(require, module, exports) {


var value   = require("./valid-value")
  , isValue = require("./is-value");

module.exports = function (obj/*, …names*/) {
	var length, current = 1;
	value(obj);
	length = arguments.length - 1;
	if (!length) return obj;
	while (current < length) {
		obj = obj[arguments[current++]];
		if (!isValue(obj)) return undefined;
	}
	return obj[arguments[current]];
};

}, function(modId) { var map = {"./valid-value":1629437952320,"./is-value":1629437952302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952587, function(require, module, exports) {


var toArray  = require("./to-array")
  , isDate   = require("../date/is-date")
  , isValue  = require("../object/is-value")
  , isRegExp = require("../reg-exp/is-reg-exp");

var isArray = Array.isArray
  , stringify = JSON.stringify
  , objHasOwnProperty = Object.prototype.hasOwnProperty;
var keyValueToString = function (value, key) {
	return stringify(key) + ":" + module.exports(value);
};

var sparseMap = function (arr) {
	var i, length = arr.length, result = new Array(length);
	for (i = 0; i < length; ++i) {
		if (!objHasOwnProperty.call(arr, i)) continue;
		result[i] = module.exports(arr[i]);
	}
	return result;
};

module.exports = function (obj) {
	if (!isValue(obj)) return String(obj);
	switch (typeof obj) {
		case "string":
			return stringify(obj);
		case "number":
		case "boolean":
		case "function":
			return String(obj);
		case "object":
			if (isArray(obj)) return "[" + sparseMap(obj) + "]";
			if (isRegExp(obj)) return String(obj);
			if (isDate(obj)) return "new Date(" + obj.valueOf() + ")";
			return "{" + toArray(obj, keyValueToString) + "}";
		default:
			throw new TypeError("Serialization of " + String(obj) + "is unsupported");
	}
};

}, function(modId) { var map = {"./to-array":1629437952466,"../date/is-date":1629437952424,"../object/is-value":1629437952302,"../reg-exp/is-reg-exp":1629437952588}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952588, function(require, module, exports) {


var objToString = Object.prototype.toString, id = objToString.call(/a/);

module.exports = function (value) {
	return (value && (value instanceof RegExp || objToString.call(value) === id)) || false;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952589, function(require, module, exports) {


var value = require("./valid-value");

module.exports = function (code) {
	// eslint-disable-next-line no-new-func
	return new Function("return " + value(code))();
};

}, function(modId) { var map = {"./valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952590, function(require, module, exports) {


var isArrayLike = require("./is-array-like");

module.exports = function (obj) {
	if (isArrayLike(obj)) return obj;
	throw new TypeError(obj + " is not array-like value");
};

}, function(modId) { var map = {"./is-array-like":1629437952383}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952591, function(require, module, exports) {


var isArrayLike = require("./is-array-like")
  , isObject    = require("./is-object");

module.exports = function (obj) {
	if (isObject(obj) && isArrayLike(obj)) return obj;
	throw new TypeError(obj + " is not array-like object");
};

}, function(modId) { var map = {"./is-array-like":1629437952383,"./is-object":1629437952329}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952592, function(require, module, exports) {


var isObject = require("./is-object");

module.exports = function (value) {
	if (!isObject(value)) throw new TypeError(value + " is not an Object");
	return value;
};

}, function(modId) { var map = {"./is-object":1629437952329}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952593, function(require, module, exports) {


var isCallable = require("./is-callable");

module.exports = function (stringifiable) {
	try {
		if (stringifiable && isCallable(stringifiable.toString)) return stringifiable.toString();
		return String(stringifiable);
	} catch (e) {
		throw new TypeError("Passed argument cannot be stringifed");
	}
};

}, function(modId) { var map = {"./is-callable":1629437952305}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952594, function(require, module, exports) {


var ensureValue   = require("./valid-value")
  , stringifiable = require("./validate-stringifiable");

module.exports = function (value) { return stringifiable(ensureValue(value)); };

}, function(modId) { var map = {"./valid-value":1629437952320,"./validate-stringifiable":1629437952593}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952595, function(require, module, exports) {


module.exports = { "#": require("./#"), "lazy": require("./lazy") };

}, function(modId) { var map = {"./#":1629437952596,"./lazy":1629437952601}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952596, function(require, module, exports) {


module.exports = { asCallback: require("./as-callback"), finally: require("./finally") };

}, function(modId) { var map = {"./as-callback":1629437952597,"./finally":1629437952598}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952597, function(require, module, exports) {


var ensurePlainFunction = require("../../object/ensure-plain-function")
  , ensureThenable      = require("../../object/ensure-thenable")
  , microtaskDelay      = require("../../function/#/microtask-delay");

module.exports = function (callback) {
	ensureThenable(this);
	ensurePlainFunction(callback);
	// Rely on microtaskDelay to escape eventual error swallowing
	this.then(
		microtaskDelay.call(function (value) { callback(null, value); }),
		microtaskDelay.call(function (reason) { callback(reason); })
	);
};

}, function(modId) { var map = {"../../object/ensure-plain-function":1629437952450,"../../object/ensure-thenable":1629437952565,"../../function/#/microtask-delay":1629437952449}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952598, function(require, module, exports) {


module.exports = require("./is-implemented")() ? Promise.prototype.finally : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952599,"./shim":1629437952600}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952599, function(require, module, exports) {


module.exports = function () {
	if (typeof Promise !== "function") return false;
	if (typeof Promise.prototype.finally !== "function") return false;
	return true;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952600, function(require, module, exports) {


var ensurePlainFunction = require("../../../object/ensure-plain-function")
  , isThenable          = require("../../../object/is-thenable")
  , ensureThenable      = require("../../../object/ensure-thenable");

var resolveCallback = function (callback, next) {
	var callbackResult = callback();
	if (!isThenable(callbackResult)) return next();
	return callbackResult.then(next);
};

module.exports = function (callback) {
	ensureThenable(this);
	ensurePlainFunction(callback);
	return this.then(
		function (result) {
			return resolveCallback(callback, function () { return result; });
		},
		function (error) {
			return resolveCallback(callback, function () { throw error; });
		}
	);
};

}, function(modId) { var map = {"../../../object/ensure-plain-function":1629437952450,"../../../object/is-thenable":1629437952564,"../../../object/ensure-thenable":1629437952565}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952601, function(require, module, exports) {


var isFunction = require("../function/is-function");

module.exports = function (executor) {
	var Constructor;
	if (isFunction(this)) {
		Constructor = this;
	} else if (typeof Promise === "function") {
		Constructor = Promise;
	} else {
		throw new TypeError("Could not resolve Promise constuctor");
	}

	var lazyThen;
	var promise = new Constructor(function (resolve, reject) {
		lazyThen = function (onSuccess, onFailure) {
			if (!hasOwnProperty.call(this, "then")) {
				// Sanity check
				throw new Error("Unexpected (inherited) lazy then invocation");
			}

			try { executor(resolve, reject); }
			catch (reason) { reject(reason); }
			delete this.then;
			return this.then(onSuccess, onFailure);
		};
	});

	return Object.defineProperty(promise, "then", {
		configurable: true,
		writable: true,
		value: lazyThen
	});
};

}, function(modId) { var map = {"../function/is-function":1629437952353}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952602, function(require, module, exports) {


module.exports = {
	"#": require("./#"),
	"escape": require("./escape"),
	"isRegExp": require("./is-reg-exp"),
	"validRegExp": require("./valid-reg-exp")
};

}, function(modId) { var map = {"./#":1629437952603,"./escape":1629437952619,"./is-reg-exp":1629437952588,"./valid-reg-exp":1629437952605}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952603, function(require, module, exports) {


module.exports = {
	isSticky: require("./is-sticky"),
	isUnicode: require("./is-unicode"),
	match: require("./match"),
	replace: require("./replace"),
	search: require("./search"),
	split: require("./split")
};

}, function(modId) { var map = {"./is-sticky":1629437952604,"./is-unicode":1629437952606,"./match":1629437952607,"./replace":1629437952610,"./search":1629437952613,"./split":1629437952616}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952604, function(require, module, exports) {


var validRegExp = require("../valid-reg-exp")
  , re          = /\/[a-xz]*y[a-xz]*$/;

module.exports = function () { return Boolean(String(validRegExp(this)).match(re)); };

}, function(modId) { var map = {"../valid-reg-exp":1629437952605}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952605, function(require, module, exports) {


var isRegExp = require("./is-reg-exp");

module.exports = function (value) {
	if (!isRegExp(value)) throw new TypeError(value + " is not a RegExp object");
	return value;
};

}, function(modId) { var map = {"./is-reg-exp":1629437952588}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952606, function(require, module, exports) {


var validRegExp = require("../valid-reg-exp")
  , re          = /\/[a-xz]*u[a-xz]*$/;

module.exports = function () { return Boolean(String(validRegExp(this)).match(re)); };

}, function(modId) { var map = {"../valid-reg-exp":1629437952605}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952607, function(require, module, exports) {


module.exports = require("./is-implemented")() ? RegExp.prototype.match : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952608,"./shim":1629437952609}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952608, function(require, module, exports) {


var re = /foo/;

module.exports = function () {
	if (typeof re.match !== "function") return false;
	return re.match("barfoobar") && !re.match("elo");
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952609, function(require, module, exports) {


var validRegExp = require("../../valid-reg-exp");

module.exports = function (string) {
	validRegExp(this);
	return String(string).match(this);
};

}, function(modId) { var map = {"../../valid-reg-exp":1629437952605}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952610, function(require, module, exports) {


module.exports = require("./is-implemented")() ? RegExp.prototype.replace : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952611,"./shim":1629437952612}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952611, function(require, module, exports) {


var re = /foo/;

module.exports = function () {
	if (typeof re.replace !== "function") return false;
	return re.replace("foobar", "mar") === "marbar";
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952612, function(require, module, exports) {


var validRegExp = require("../../valid-reg-exp");

module.exports = function (string, replaceValue) {
	validRegExp(this);
	return String(string).replace(this, replaceValue);
};

}, function(modId) { var map = {"../../valid-reg-exp":1629437952605}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952613, function(require, module, exports) {


module.exports = require("./is-implemented")() ? RegExp.prototype.search : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952614,"./shim":1629437952615}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952614, function(require, module, exports) {


var re = /foo/;

module.exports = function () {
	if (typeof re.search !== "function") return false;
	return re.search("barfoo") === 3;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952615, function(require, module, exports) {


var validRegExp = require("../../valid-reg-exp");

module.exports = function (string) {
	validRegExp(this);
	return String(string).search(this);
};

}, function(modId) { var map = {"../../valid-reg-exp":1629437952605}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952616, function(require, module, exports) {


module.exports = require("./is-implemented")() ? RegExp.prototype.split : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952617,"./shim":1629437952618}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952617, function(require, module, exports) {


var re = /\|/;

module.exports = function () {
	if (typeof re.split !== "function") return false;
	return re.split("bar|foo")[1] === "foo";
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952618, function(require, module, exports) {


var validRegExp = require("../../valid-reg-exp");

module.exports = function (string) {
	validRegExp(this);
	return String(string).split(this);
};

}, function(modId) { var map = {"../../valid-reg-exp":1629437952605}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952619, function(require, module, exports) {
// Thanks to Andrew Clover:
// http://stackoverflow.com/questions/3561493
// /is-there-a-regexp-escape-function-in-javascript



var re = /[-/\\^$*+?.()|[\]{}]/g;

module.exports = function (str) { return String(str).replace(re, "\\$&"); };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952620, function(require, module, exports) {


module.exports = {
	"#": require("./#"),
	"formatMethod": require("./format-method"),
	"fromCodePoint": require("./from-code-point"),
	"isString": require("./is-string"),
	"random": require("./random"),
	"randomUniq": require("./random-uniq"),
	"raw": require("./raw")
};

}, function(modId) { var map = {"./#":1629437952621,"./format-method":1629437952425,"./from-code-point":1629437952651,"./is-string":1629437952354,"./random":1629437952654,"./random-uniq":1629437952655,"./raw":1629437952656}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952621, function(require, module, exports) {


module.exports = {
	"@@iterator": require("./@@iterator"),
	"at": require("./at"),
	"count": require("./count"),
	"camelToHyphen": require("./camel-to-hyphen"),
	"capitalize": require("./capitalize"),
	"caseInsensitiveCompare": require("./case-insensitive-compare"),
	"codePointAt": require("./code-point-at"),
	"contains": require("./contains"),
	"hyphenToCamel": require("./hyphen-to-camel"),
	"endsWith": require("./ends-with"),
	"indent": require("./indent"),
	"last": require("./last"),
	"normalize": require("./normalize"),
	"pad": require("./pad"),
	"plainReplace": require("./plain-replace"),
	"plainReplaceAll": require("./plain-replace-all"),
	"repeat": require("./repeat"),
	"startsWith": require("./starts-with"),
	"uncapitalize": require("./uncapitalize")
};

}, function(modId) { var map = {"./@@iterator":1629437952622,"./at":1629437952625,"./count":1629437952626,"./camel-to-hyphen":1629437952627,"./capitalize":1629437952628,"./case-insensitive-compare":1629437952551,"./code-point-at":1629437952629,"./contains":1629437952632,"./hyphen-to-camel":1629437952635,"./ends-with":1629437952636,"./indent":1629437952639,"./last":1629437952640,"./normalize":1629437952641,"./pad":1629437952419,"./plain-replace":1629437952645,"./plain-replace-all":1629437952646,"./repeat":1629437952420,"./starts-with":1629437952647,"./uncapitalize":1629437952650}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952622, function(require, module, exports) {


module.exports = require("./is-implemented")()
	? String.prototype[require("es6-symbol").iterator]
	: require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952623,"./shim":1629437952624}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952623, function(require, module, exports) {


var iteratorSymbol = require("es6-symbol").iterator;

module.exports = function () {
	var str = "🙈f", iterator, result;
	if (typeof str[iteratorSymbol] !== "function") return false;
	iterator = str[iteratorSymbol]();
	if (!iterator) return false;
	if (typeof iterator.next !== "function") return false;
	result = iterator.next();
	if (!result) return false;
	if (result.value !== "🙈") return false;
	if (result.done !== false) return false;
	return true;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952624, function(require, module, exports) {


var StringIterator = require("es6-iterator/string")
  , value          = require("../../../object/valid-value");

module.exports = function () { return new StringIterator(value(this)); };

}, function(modId) { var map = {"../../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952625, function(require, module, exports) {
// Based on: https://github.com/mathiasbynens/String.prototype.at
// Thanks @mathiasbynens !



var toInteger  = require("../../number/to-integer")
  , validValue = require("../../object/valid-value");

module.exports = function (pos) {
	var str = String(validValue(this)), size = str.length, cuFirst, cuSecond, nextPos, len;
	pos = toInteger(pos);

	// Account for out-of-bounds indices
	// The odd lower bound is because the ToInteger operation is
	// going to round `n` to `0` for `-1 < n <= 0`.
	if (pos <= -1 || pos >= size) return "";

	// Second half of `ToInteger`
	// eslint-disable-next-line no-bitwise
	pos |= 0;
	// Get the first code unit and code unit value
	cuFirst = str.charCodeAt(pos);
	nextPos = pos + 1;
	len = 1;
	if (
		// Check if it’s the start of a surrogate pair
		cuFirst >= 0xd800 &&
		cuFirst <= 0xdbff && // High surrogate
		size > nextPos // There is a next code unit
	) {
		cuSecond = str.charCodeAt(nextPos);
		if (cuSecond >= 0xdc00 && cuSecond <= 0xdfff) len = 2; // Low surrogate
	}
	return str.slice(pos, pos + len);
};

}, function(modId) { var map = {"../../number/to-integer":1629437952315,"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952626, function(require, module, exports) {


var ensureString = require("../../object/validate-stringifiable-value");

module.exports = function (search) {
	var string = ensureString(this), count = 0, index = 0;

	search = ensureString(search);
	if (!search) throw new TypeError("Search string cannot be empty");
	while ((index = string.indexOf(search, index)) !== -1) {
		++count;
		index += search.length;
	}
	return count;
};

}, function(modId) { var map = {"../../object/validate-stringifiable-value":1629437952594}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952627, function(require, module, exports) {


var replace = String.prototype.replace, re = /([A-Z])/g;

module.exports = function () {
	var str = replace.call(this, re, "-$1").toLowerCase();
	if (str[0] === "-") str = str.slice(1);
	return str;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952628, function(require, module, exports) {


var value = require("../../object/valid-value");

module.exports = function () {
	var str = String(value(this));
	return str.charAt(0).toUpperCase() + str.slice(1);
};

}, function(modId) { var map = {"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952629, function(require, module, exports) {


module.exports = require("./is-implemented")() ? String.prototype.codePointAt : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952630,"./shim":1629437952631}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952630, function(require, module, exports) {


var str = "abc\uD834\uDF06def";

module.exports = function () {
	if (typeof str.codePointAt !== "function") return false;
	return str.codePointAt(3) === 0x1d306;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952631, function(require, module, exports) {
// Based on: https://github.com/mathiasbynens/String.prototype.codePointAt
// Thanks @mathiasbynens !



var toInteger  = require("../../../number/to-integer")
  , validValue = require("../../../object/valid-value");

module.exports = function (pos) {
	var str = String(validValue(this)), length = str.length, first, second;
	pos = toInteger(pos);

	// Account for out-of-bounds indices:
	if (pos < 0 || pos >= length) return undefined;

	// Get the first code unit
	first = str.charCodeAt(pos);
	if (first >= 0xd800 && first <= 0xdbff && length > pos + 1) {
		second = str.charCodeAt(pos + 1);
		if (second >= 0xdc00 && second <= 0xdfff) {
			// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
			return (first - 0xd800) * 0x400 + second - 0xdc00 + 0x10000;
		}
	}
	return first;
};

}, function(modId) { var map = {"../../../number/to-integer":1629437952315,"../../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952632, function(require, module, exports) {


module.exports = require("./is-implemented")() ? String.prototype.contains : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952633,"./shim":1629437952634}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952633, function(require, module, exports) {


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952634, function(require, module, exports) {


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952635, function(require, module, exports) {


var replace = String.prototype.replace, re = /-([a-z0-9])/g;
var toUpperCase = function (ignored, a) { return a.toUpperCase(); };

module.exports = function () { return replace.call(this, re, toUpperCase); };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952636, function(require, module, exports) {


module.exports = require("./is-implemented")() ? String.prototype.endsWith : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952637,"./shim":1629437952638}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952637, function(require, module, exports) {


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.endsWith !== "function") return false;
	return str.endsWith("trzy") === true && str.endsWith("raz") === false;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952638, function(require, module, exports) {


var toInteger = require("../../../number/to-integer")
  , value     = require("../../../object/valid-value")
  , isValue   = require("../../../object/is-value")
  , min       = Math.min
  , max       = Math.max;

module.exports = function (searchString/*, endPosition*/) {
	var self, start, endPos;
	self = String(value(this));
	searchString = String(searchString);
	endPos = arguments[1];
	start =
		(isValue(endPos) ? min(max(toInteger(endPos), 0), self.length) : self.length) -
		searchString.length;
	return start < 0 ? false : self.indexOf(searchString, start) === start;
};

}, function(modId) { var map = {"../../../number/to-integer":1629437952315,"../../../object/valid-value":1629437952320,"../../../object/is-value":1629437952302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952639, function(require, module, exports) {


var isValue = require("../../object/is-value")
  , repeat  = require("./repeat")
  , replace = String.prototype.replace
  , re      = /(\r\n|[\n\r\u2028\u2029])([\u0000-\u0009\u000b-\uffff]+)/g;

module.exports = function (indent/*, count*/) {
	var count = arguments[1];
	indent = repeat.call(String(indent), isValue(count) ? count : 1);
	return indent + replace.call(this, re, "$1" + indent + "$2");
};

}, function(modId) { var map = {"../../object/is-value":1629437952302,"./repeat":1629437952420}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952640, function(require, module, exports) {


var value = require("../../object/valid-value");

module.exports = function () {
	var self = String(value(this)), length = self.length;
	return length ? self[length - 1] : null;
};

}, function(modId) { var map = {"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952641, function(require, module, exports) {


module.exports = require("./is-implemented")() ? String.prototype.normalize : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952642,"./shim":1629437952643}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952642, function(require, module, exports) {


var str = "æøåäüö";

module.exports = function () {
	if (typeof str.normalize !== "function") return false;
	return str.normalize("NFKD") === "æøåäüö";
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952643, function(require, module, exports) {
/* eslint no-bitwise: "off", max-statements: "off", max-lines: "off" */

// Taken from: https://github.com/walling/unorm/blob/master/lib/unorm.js

/*
 * UnicodeNormalizer 1.0.0
 * Copyright (c) 2008 Matsuza
 * Dual licensed under the MIT (MIT-LICENSE.txt) and
 * GPL (GPL-LICENSE.txt) licenses.
 * $Date: 2008-06-05 16:44:17 +0200 (Thu, 05 Jun 2008) $
 * $Rev: 13309 $
 */



var primitiveSet = require("../../../object/primitive-set")
  , validValue   = require("../../../object/valid-value")
  , data         = require("./_data");

var floor = Math.floor
  , forms = primitiveSet("NFC", "NFD", "NFKC", "NFKD")
  , DEFAULT_FEATURE = [null, 0, {}]
  , CACHE_THRESHOLD = 10
  , SBase = 0xac00
  , LBase = 0x1100
  , VBase = 0x1161
  , TBase = 0x11a7
  , LCount = 19
  , VCount = 21
  , TCount = 28
  , NCount = VCount * TCount
  , SCount = LCount * NCount
  , UChar
  , cache = {}
  , cacheCounter = []
  , fromCache
  , fromData
  , fromCpOnly
  , fromRuleBasedJamo
  , fromCpFilter
  , strategies
  , UCharIterator
  , RecursDecompIterator
  , DecompIterator
  , CompIterator
  , createIterator
  , normalize;

UChar = function (cp, feature) {
	this.codepoint = cp;
	this.feature = feature;
};

// Strategies
(function () { for (var i = 0; i <= 0xff; ++i) cacheCounter[i] = 0; })();

fromCache = function (nextStep, cp, needFeature) {
	var ret = cache[cp];
	if (!ret) {
		ret = nextStep(cp, needFeature);
		if (Boolean(ret.feature) && ++cacheCounter[(cp >> 8) & 0xff] > CACHE_THRESHOLD) {
			cache[cp] = ret;
		}
	}
	return ret;
};

fromData = function (next, cp) {
	var hash = cp & 0xff00, dunit = UChar.udata[hash] || {}, feature = dunit[cp];
	return feature ? new UChar(cp, feature) : new UChar(cp, DEFAULT_FEATURE);
};
fromCpOnly = function (next, cp, needFeature) {
	return needFeature ? next(cp, needFeature) : new UChar(cp, null);
};

fromRuleBasedJamo = function (next, cp, needFeature) {
	var char, base, i, arr, SIndex, TIndex, feature, j;
	if (cp < LBase || (LBase + LCount <= cp && cp < SBase) || SBase + SCount < cp) {
		return next(cp, needFeature);
	}
	if (LBase <= cp && cp < LBase + LCount) {
		char = {};
		base = (cp - LBase) * VCount;
		for (i = 0; i < VCount; ++i) {
			char[VBase + i] = SBase + TCount * (i + base);
		}
		arr = new Array(3);
		arr[2] = char;
		return new UChar(cp, arr);
	}

	SIndex = cp - SBase;
	TIndex = SIndex % TCount;
	feature = [];
	if (TIndex === 0) {
		feature[0] = [LBase + floor(SIndex / NCount), VBase + floor((SIndex % NCount) / TCount)];
		feature[2] = {};
		for (j = 1; j < TCount; ++j) {
			feature[2][TBase + j] = cp + j;
		}
	} else {
		feature[0] = [SBase + SIndex - TIndex, TBase + TIndex];
	}
	return new UChar(cp, feature);
};

fromCpFilter = function (next, cp, needFeature) {
	return cp < 60 || (cp > 13311 && cp < 42607)
		? new UChar(cp, DEFAULT_FEATURE)
		: next(cp, needFeature);
};

strategies = [fromCpFilter, fromCache, fromCpOnly, fromRuleBasedJamo, fromData];

UChar.fromCharCode = strategies.reduceRight(function (next, strategy) {
	return function (cp, needFeature) { return strategy(next, cp, needFeature); };
}, null);

UChar.isHighSurrogate = function (cp) { return cp >= 0xd800 && cp <= 0xdbff; };
UChar.isLowSurrogate = function (cp) { return cp >= 0xdc00 && cp <= 0xdfff; };

UChar.prototype.prepFeature = function () {
	if (!this.feature) {
		this.feature = UChar.fromCharCode(this.codepoint, true).feature;
	}
};

UChar.prototype.toString = function () {
	var num;
	if (this.codepoint < 0x10000) return String.fromCharCode(this.codepoint);
	num = this.codepoint - 0x10000;
	return String.fromCharCode(floor(num / 0x400) + 0xd800, (num % 0x400) + 0xdc00);
};

UChar.prototype.getDecomp = function () {
	this.prepFeature();
	return this.feature[0] || null;
};

UChar.prototype.isCompatibility = function () {
	this.prepFeature();
	return Boolean(this.feature[1]) && this.feature[1] & (1 << 8);
};
UChar.prototype.isExclude = function () {
	this.prepFeature();
	return Boolean(this.feature[1]) && this.feature[1] & (1 << 9);
};
UChar.prototype.getCanonicalClass = function () {
	this.prepFeature();
	return this.feature[1] ? this.feature[1] & 0xff : 0;
};
UChar.prototype.getComposite = function (following) {
	var cp;
	this.prepFeature();
	if (!this.feature[2]) return null;
	cp = this.feature[2][following.codepoint];
	return cp ? UChar.fromCharCode(cp) : null;
};

UCharIterator = function (str) {
	this.str = str;
	this.cursor = 0;
};
UCharIterator.prototype.next = function () {
	if (Boolean(this.str) && this.cursor < this.str.length) {
		var cp = this.str.charCodeAt(this.cursor++), d;
		if (
			UChar.isHighSurrogate(cp) &&
			this.cursor < this.str.length &&
			UChar.isLowSurrogate((d = this.str.charCodeAt(this.cursor)))
		) {
			cp = (cp - 0xd800) * 0x400 + (d - 0xdc00) + 0x10000;
			++this.cursor;
		}
		return UChar.fromCharCode(cp);
	}
	this.str = null;
	return null;
};

RecursDecompIterator = function (it, cano) {
	this.it = it;
	this.canonical = cano;
	this.resBuf = [];
};

RecursDecompIterator.prototype.next = function () {
	var recursiveDecomp, uchar;
	recursiveDecomp = function (cano, ucharLoc) {
		var decomp = ucharLoc.getDecomp(), ret, i, a, j;
		if (Boolean(decomp) && !(cano && ucharLoc.isCompatibility())) {
			ret = [];
			for (i = 0; i < decomp.length; ++i) {
				a = recursiveDecomp(cano, UChar.fromCharCode(decomp[i]));
				// Ret.concat(a); //<-why does not this work?
				// following block is a workaround.
				for (j = 0; j < a.length; ++j) ret.push(a[j]);
			}
			return ret;
		}
		return [ucharLoc];
	};
	if (this.resBuf.length === 0) {
		uchar = this.it.next();
		if (!uchar) return null;
		this.resBuf = recursiveDecomp(this.canonical, uchar);
	}
	return this.resBuf.shift();
};

DecompIterator = function (it) {
	this.it = it;
	this.resBuf = [];
};

DecompIterator.prototype.next = function () {
	var cc, uchar, inspt, uchar2, cc2;
	if (this.resBuf.length === 0) {
		do {
			uchar = this.it.next();
			if (!uchar) break;
			cc = uchar.getCanonicalClass();
			inspt = this.resBuf.length;
			if (cc !== 0) {
				for (inspt; inspt > 0; --inspt) {
					uchar2 = this.resBuf[inspt - 1];
					cc2 = uchar2.getCanonicalClass();
					// eslint-disable-next-line max-depth
					if (cc2 <= cc) break;
				}
			}
			this.resBuf.splice(inspt, 0, uchar);
		} while (cc !== 0);
	}
	return this.resBuf.shift();
};

CompIterator = function (it) {
	this.it = it;
	this.procBuf = [];
	this.resBuf = [];
	this.lastClass = null;
};

CompIterator.prototype.next = function () {
	var uchar, starter, composite, cc;
	while (this.resBuf.length === 0) {
		uchar = this.it.next();
		if (!uchar) {
			this.resBuf = this.procBuf;
			this.procBuf = [];
			break;
		}
		if (this.procBuf.length === 0) {
			this.lastClass = uchar.getCanonicalClass();
			this.procBuf.push(uchar);
		} else {
			starter = this.procBuf[0];
			composite = starter.getComposite(uchar);
			cc = uchar.getCanonicalClass();
			if (Boolean(composite) && (this.lastClass < cc || this.lastClass === 0)) {
				this.procBuf[0] = composite;
			} else {
				if (cc === 0) {
					this.resBuf = this.procBuf;
					this.procBuf = [];
				}
				this.lastClass = cc;
				this.procBuf.push(uchar);
			}
		}
	}
	return this.resBuf.shift();
};

createIterator = function (mode, str) {
	switch (mode) {
		case "NFD":
			return new DecompIterator(new RecursDecompIterator(new UCharIterator(str), true));
		case "NFKD":
			return new DecompIterator(new RecursDecompIterator(new UCharIterator(str), false));
		case "NFC":
			return new CompIterator(
				new DecompIterator(new RecursDecompIterator(new UCharIterator(str), true))
			);
		case "NFKC":
			return new CompIterator(
				new DecompIterator(new RecursDecompIterator(new UCharIterator(str), false))
			);
		default:
			throw new Error(mode + " is invalid");
	}
};
normalize = function (mode, str) {
	var it = createIterator(mode, str), ret = "", uchar;
	while ((uchar = it.next())) ret += uchar.toString();
	return ret;
};

/* Unicode data */
UChar.udata = data;

module.exports = function (/* Form*/) {
	var str = String(validValue(this)), form = arguments[0];
	if (form === undefined) form = "NFC";
	else form = String(form);
	if (!forms[form]) throw new RangeError("Invalid normalization form: " + form);
	return normalize(form, str);
};

}, function(modId) { var map = {"../../../object/primitive-set":1629437952585,"../../../object/valid-value":1629437952320,"./_data":1629437952644}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952644, function(require, module, exports) {
/* eslint max-lines: "off", no-sparse-arrays: "off", comma-style: "off" */



module.exports = {
	0: {
		60: [, , { 824: 8814 }],
		61: [, , { 824: 8800 }],
		62: [, , { 824: 8815 }],
		65: [
			, ,
			{
				768: 192,
				769: 193,
				770: 194,
				771: 195,
				772: 256,
				774: 258,
				775: 550,
				776: 196,
				777: 7842,
				778: 197,
				780: 461,
				783: 512,
				785: 514,
				803: 7840,
				805: 7680,
				808: 260
			}
		],
		66: [, , { 775: 7682, 803: 7684, 817: 7686 }],
		67: [, , { 769: 262, 770: 264, 775: 266, 780: 268, 807: 199 }],
		68: [, , { 775: 7690, 780: 270, 803: 7692, 807: 7696, 813: 7698, 817: 7694 }],
		69: [
			, ,
			{
				768: 200,
				769: 201,
				770: 202,
				771: 7868,
				772: 274,
				774: 276,
				775: 278,
				776: 203,
				777: 7866,
				780: 282,
				783: 516,
				785: 518,
				803: 7864,
				807: 552,
				808: 280,
				813: 7704,
				816: 7706
			}
		],
		70: [, , { 775: 7710 }],
		71: [, , { 769: 500, 770: 284, 772: 7712, 774: 286, 775: 288, 780: 486, 807: 290 }],
		72: [, , { 770: 292, 775: 7714, 776: 7718, 780: 542, 803: 7716, 807: 7720, 814: 7722 }],
		73: [
			, ,
			{
				768: 204,
				769: 205,
				770: 206,
				771: 296,
				772: 298,
				774: 300,
				775: 304,
				776: 207,
				777: 7880,
				780: 463,
				783: 520,
				785: 522,
				803: 7882,
				808: 302,
				816: 7724
			}
		],
		74: [, , { 770: 308 }],
		75: [, , { 769: 7728, 780: 488, 803: 7730, 807: 310, 817: 7732 }],
		76: [, , { 769: 313, 780: 317, 803: 7734, 807: 315, 813: 7740, 817: 7738 }],
		77: [, , { 769: 7742, 775: 7744, 803: 7746 }],
		78: [
			, ,
			{
				768: 504,
				769: 323,
				771: 209,
				775: 7748,
				780: 327,
				803: 7750,
				807: 325,
				813: 7754,
				817: 7752
			}
		],
		79: [
			, ,
			{
				768: 210,
				769: 211,
				770: 212,
				771: 213,
				772: 332,
				774: 334,
				775: 558,
				776: 214,
				777: 7886,
				779: 336,
				780: 465,
				783: 524,
				785: 526,
				795: 416,
				803: 7884,
				808: 490
			}
		],
		80: [, , { 769: 7764, 775: 7766 }],
		82: [
			, ,
			{ 769: 340, 775: 7768, 780: 344, 783: 528, 785: 530, 803: 7770, 807: 342, 817: 7774 }
		],
		83: [, , { 769: 346, 770: 348, 775: 7776, 780: 352, 803: 7778, 806: 536, 807: 350 }],
		84: [, , { 775: 7786, 780: 356, 803: 7788, 806: 538, 807: 354, 813: 7792, 817: 7790 }],
		85: [
			, ,
			{
				768: 217,
				769: 218,
				770: 219,
				771: 360,
				772: 362,
				774: 364,
				776: 220,
				777: 7910,
				778: 366,
				779: 368,
				780: 467,
				783: 532,
				785: 534,
				795: 431,
				803: 7908,
				804: 7794,
				808: 370,
				813: 7798,
				816: 7796
			}
		],
		86: [, , { 771: 7804, 803: 7806 }],
		87: [, , { 768: 7808, 769: 7810, 770: 372, 775: 7814, 776: 7812, 803: 7816 }],
		88: [, , { 775: 7818, 776: 7820 }],
		89: [
			, ,
			{
				768: 7922,
				769: 221,
				770: 374,
				771: 7928,
				772: 562,
				775: 7822,
				776: 376,
				777: 7926,
				803: 7924
			}
		],
		90: [, , { 769: 377, 770: 7824, 775: 379, 780: 381, 803: 7826, 817: 7828 }],
		97: [
			, ,
			{
				768: 224,
				769: 225,
				770: 226,
				771: 227,
				772: 257,
				774: 259,
				775: 551,
				776: 228,
				777: 7843,
				778: 229,
				780: 462,
				783: 513,
				785: 515,
				803: 7841,
				805: 7681,
				808: 261
			}
		],
		98: [, , { 775: 7683, 803: 7685, 817: 7687 }],
		99: [, , { 769: 263, 770: 265, 775: 267, 780: 269, 807: 231 }],
		100: [, , { 775: 7691, 780: 271, 803: 7693, 807: 7697, 813: 7699, 817: 7695 }],
		101: [
			, ,
			{
				768: 232,
				769: 233,
				770: 234,
				771: 7869,
				772: 275,
				774: 277,
				775: 279,
				776: 235,
				777: 7867,
				780: 283,
				783: 517,
				785: 519,
				803: 7865,
				807: 553,
				808: 281,
				813: 7705,
				816: 7707
			}
		],
		102: [, , { 775: 7711 }],
		103: [, , { 769: 501, 770: 285, 772: 7713, 774: 287, 775: 289, 780: 487, 807: 291 }],
		104: [
			, ,
			{ 770: 293, 775: 7715, 776: 7719, 780: 543, 803: 7717, 807: 7721, 814: 7723, 817: 7830 }
		],
		105: [
			, ,
			{
				768: 236,
				769: 237,
				770: 238,
				771: 297,
				772: 299,
				774: 301,
				776: 239,
				777: 7881,
				780: 464,
				783: 521,
				785: 523,
				803: 7883,
				808: 303,
				816: 7725
			}
		],
		106: [, , { 770: 309, 780: 496 }],
		107: [, , { 769: 7729, 780: 489, 803: 7731, 807: 311, 817: 7733 }],
		108: [, , { 769: 314, 780: 318, 803: 7735, 807: 316, 813: 7741, 817: 7739 }],
		109: [, , { 769: 7743, 775: 7745, 803: 7747 }],
		110: [
			, ,
			{
				768: 505,
				769: 324,
				771: 241,
				775: 7749,
				780: 328,
				803: 7751,
				807: 326,
				813: 7755,
				817: 7753
			}
		],
		111: [
			, ,
			{
				768: 242,
				769: 243,
				770: 244,
				771: 245,
				772: 333,
				774: 335,
				775: 559,
				776: 246,
				777: 7887,
				779: 337,
				780: 466,
				783: 525,
				785: 527,
				795: 417,
				803: 7885,
				808: 491
			}
		],
		112: [, , { 769: 7765, 775: 7767 }],
		114: [
			, ,
			{ 769: 341, 775: 7769, 780: 345, 783: 529, 785: 531, 803: 7771, 807: 343, 817: 7775 }
		],
		115: [, , { 769: 347, 770: 349, 775: 7777, 780: 353, 803: 7779, 806: 537, 807: 351 }],
		116: [
			, ,
			{ 775: 7787, 776: 7831, 780: 357, 803: 7789, 806: 539, 807: 355, 813: 7793, 817: 7791 }
		],
		117: [
			, ,
			{
				768: 249,
				769: 250,
				770: 251,
				771: 361,
				772: 363,
				774: 365,
				776: 252,
				777: 7911,
				778: 367,
				779: 369,
				780: 468,
				783: 533,
				785: 535,
				795: 432,
				803: 7909,
				804: 7795,
				808: 371,
				813: 7799,
				816: 7797
			}
		],
		118: [, , { 771: 7805, 803: 7807 }],
		119: [, , { 768: 7809, 769: 7811, 770: 373, 775: 7815, 776: 7813, 778: 7832, 803: 7817 }],
		120: [, , { 775: 7819, 776: 7821 }],
		121: [
			, ,
			{
				768: 7923,
				769: 253,
				770: 375,
				771: 7929,
				772: 563,
				775: 7823,
				776: 255,
				777: 7927,
				778: 7833,
				803: 7925
			}
		],
		122: [, , { 769: 378, 770: 7825, 775: 380, 780: 382, 803: 7827, 817: 7829 }],
		160: [[32], 256],
		168: [[32, 776], 256, { 768: 8173, 769: 901, 834: 8129 }],
		170: [[97], 256],
		175: [[32, 772], 256],
		178: [[50], 256],
		179: [[51], 256],
		180: [[32, 769], 256],
		181: [[956], 256],
		184: [[32, 807], 256],
		185: [[49], 256],
		186: [[111], 256],
		188: [[49, 8260, 52], 256],
		189: [[49, 8260, 50], 256],
		190: [[51, 8260, 52], 256],
		192: [[65, 768]],
		193: [[65, 769]],
		194: [[65, 770], , { 768: 7846, 769: 7844, 771: 7850, 777: 7848 }],
		195: [[65, 771]],
		196: [[65, 776], , { 772: 478 }],
		197: [[65, 778], , { 769: 506 }],
		198: [, , { 769: 508, 772: 482 }],
		199: [[67, 807], , { 769: 7688 }],
		200: [[69, 768]],
		201: [[69, 769]],
		202: [[69, 770], , { 768: 7872, 769: 7870, 771: 7876, 777: 7874 }],
		203: [[69, 776]],
		204: [[73, 768]],
		205: [[73, 769]],
		206: [[73, 770]],
		207: [[73, 776], , { 769: 7726 }],
		209: [[78, 771]],
		210: [[79, 768]],
		211: [[79, 769]],
		212: [[79, 770], , { 768: 7890, 769: 7888, 771: 7894, 777: 7892 }],
		213: [[79, 771], , { 769: 7756, 772: 556, 776: 7758 }],
		214: [[79, 776], , { 772: 554 }],
		216: [, , { 769: 510 }],
		217: [[85, 768]],
		218: [[85, 769]],
		219: [[85, 770]],
		220: [[85, 776], , { 768: 475, 769: 471, 772: 469, 780: 473 }],
		221: [[89, 769]],
		224: [[97, 768]],
		225: [[97, 769]],
		226: [[97, 770], , { 768: 7847, 769: 7845, 771: 7851, 777: 7849 }],
		227: [[97, 771]],
		228: [[97, 776], , { 772: 479 }],
		229: [[97, 778], , { 769: 507 }],
		230: [, , { 769: 509, 772: 483 }],
		231: [[99, 807], , { 769: 7689 }],
		232: [[101, 768]],
		233: [[101, 769]],
		234: [[101, 770], , { 768: 7873, 769: 7871, 771: 7877, 777: 7875 }],
		235: [[101, 776]],
		236: [[105, 768]],
		237: [[105, 769]],
		238: [[105, 770]],
		239: [[105, 776], , { 769: 7727 }],
		241: [[110, 771]],
		242: [[111, 768]],
		243: [[111, 769]],
		244: [[111, 770], , { 768: 7891, 769: 7889, 771: 7895, 777: 7893 }],
		245: [[111, 771], , { 769: 7757, 772: 557, 776: 7759 }],
		246: [[111, 776], , { 772: 555 }],
		248: [, , { 769: 511 }],
		249: [[117, 768]],
		250: [[117, 769]],
		251: [[117, 770]],
		252: [[117, 776], , { 768: 476, 769: 472, 772: 470, 780: 474 }],
		253: [[121, 769]],
		255: [[121, 776]]
	},
	256: {
		256: [[65, 772]],
		257: [[97, 772]],
		258: [[65, 774], , { 768: 7856, 769: 7854, 771: 7860, 777: 7858 }],
		259: [[97, 774], , { 768: 7857, 769: 7855, 771: 7861, 777: 7859 }],
		260: [[65, 808]],
		261: [[97, 808]],
		262: [[67, 769]],
		263: [[99, 769]],
		264: [[67, 770]],
		265: [[99, 770]],
		266: [[67, 775]],
		267: [[99, 775]],
		268: [[67, 780]],
		269: [[99, 780]],
		270: [[68, 780]],
		271: [[100, 780]],
		274: [[69, 772], , { 768: 7700, 769: 7702 }],
		275: [[101, 772], , { 768: 7701, 769: 7703 }],
		276: [[69, 774]],
		277: [[101, 774]],
		278: [[69, 775]],
		279: [[101, 775]],
		280: [[69, 808]],
		281: [[101, 808]],
		282: [[69, 780]],
		283: [[101, 780]],
		284: [[71, 770]],
		285: [[103, 770]],
		286: [[71, 774]],
		287: [[103, 774]],
		288: [[71, 775]],
		289: [[103, 775]],
		290: [[71, 807]],
		291: [[103, 807]],
		292: [[72, 770]],
		293: [[104, 770]],
		296: [[73, 771]],
		297: [[105, 771]],
		298: [[73, 772]],
		299: [[105, 772]],
		300: [[73, 774]],
		301: [[105, 774]],
		302: [[73, 808]],
		303: [[105, 808]],
		304: [[73, 775]],
		306: [[73, 74], 256],
		307: [[105, 106], 256],
		308: [[74, 770]],
		309: [[106, 770]],
		310: [[75, 807]],
		311: [[107, 807]],
		313: [[76, 769]],
		314: [[108, 769]],
		315: [[76, 807]],
		316: [[108, 807]],
		317: [[76, 780]],
		318: [[108, 780]],
		319: [[76, 183], 256],
		320: [[108, 183], 256],
		323: [[78, 769]],
		324: [[110, 769]],
		325: [[78, 807]],
		326: [[110, 807]],
		327: [[78, 780]],
		328: [[110, 780]],
		329: [[700, 110], 256],
		332: [[79, 772], , { 768: 7760, 769: 7762 }],
		333: [[111, 772], , { 768: 7761, 769: 7763 }],
		334: [[79, 774]],
		335: [[111, 774]],
		336: [[79, 779]],
		337: [[111, 779]],
		340: [[82, 769]],
		341: [[114, 769]],
		342: [[82, 807]],
		343: [[114, 807]],
		344: [[82, 780]],
		345: [[114, 780]],
		346: [[83, 769], , { 775: 7780 }],
		347: [[115, 769], , { 775: 7781 }],
		348: [[83, 770]],
		349: [[115, 770]],
		350: [[83, 807]],
		351: [[115, 807]],
		352: [[83, 780], , { 775: 7782 }],
		353: [[115, 780], , { 775: 7783 }],
		354: [[84, 807]],
		355: [[116, 807]],
		356: [[84, 780]],
		357: [[116, 780]],
		360: [[85, 771], , { 769: 7800 }],
		361: [[117, 771], , { 769: 7801 }],
		362: [[85, 772], , { 776: 7802 }],
		363: [[117, 772], , { 776: 7803 }],
		364: [[85, 774]],
		365: [[117, 774]],
		366: [[85, 778]],
		367: [[117, 778]],
		368: [[85, 779]],
		369: [[117, 779]],
		370: [[85, 808]],
		371: [[117, 808]],
		372: [[87, 770]],
		373: [[119, 770]],
		374: [[89, 770]],
		375: [[121, 770]],
		376: [[89, 776]],
		377: [[90, 769]],
		378: [[122, 769]],
		379: [[90, 775]],
		380: [[122, 775]],
		381: [[90, 780]],
		382: [[122, 780]],
		383: [[115], 256, { 775: 7835 }],
		416: [[79, 795], , { 768: 7900, 769: 7898, 771: 7904, 777: 7902, 803: 7906 }],
		417: [[111, 795], , { 768: 7901, 769: 7899, 771: 7905, 777: 7903, 803: 7907 }],
		431: [[85, 795], , { 768: 7914, 769: 7912, 771: 7918, 777: 7916, 803: 7920 }],
		432: [[117, 795], , { 768: 7915, 769: 7913, 771: 7919, 777: 7917, 803: 7921 }],
		439: [, , { 780: 494 }],
		452: [[68, 381], 256],
		453: [[68, 382], 256],
		454: [[100, 382], 256],
		455: [[76, 74], 256],
		456: [[76, 106], 256],
		457: [[108, 106], 256],
		458: [[78, 74], 256],
		459: [[78, 106], 256],
		460: [[110, 106], 256],
		461: [[65, 780]],
		462: [[97, 780]],
		463: [[73, 780]],
		464: [[105, 780]],
		465: [[79, 780]],
		466: [[111, 780]],
		467: [[85, 780]],
		468: [[117, 780]],
		469: [[220, 772]],
		470: [[252, 772]],
		471: [[220, 769]],
		472: [[252, 769]],
		473: [[220, 780]],
		474: [[252, 780]],
		475: [[220, 768]],
		476: [[252, 768]],
		478: [[196, 772]],
		479: [[228, 772]],
		480: [[550, 772]],
		481: [[551, 772]],
		482: [[198, 772]],
		483: [[230, 772]],
		486: [[71, 780]],
		487: [[103, 780]],
		488: [[75, 780]],
		489: [[107, 780]],
		490: [[79, 808], , { 772: 492 }],
		491: [[111, 808], , { 772: 493 }],
		492: [[490, 772]],
		493: [[491, 772]],
		494: [[439, 780]],
		495: [[658, 780]],
		496: [[106, 780]],
		497: [[68, 90], 256],
		498: [[68, 122], 256],
		499: [[100, 122], 256],
		500: [[71, 769]],
		501: [[103, 769]],
		504: [[78, 768]],
		505: [[110, 768]],
		506: [[197, 769]],
		507: [[229, 769]],
		508: [[198, 769]],
		509: [[230, 769]],
		510: [[216, 769]],
		511: [[248, 769]],
		66045: [, 220]
	},
	512: {
		512: [[65, 783]],
		513: [[97, 783]],
		514: [[65, 785]],
		515: [[97, 785]],
		516: [[69, 783]],
		517: [[101, 783]],
		518: [[69, 785]],
		519: [[101, 785]],
		520: [[73, 783]],
		521: [[105, 783]],
		522: [[73, 785]],
		523: [[105, 785]],
		524: [[79, 783]],
		525: [[111, 783]],
		526: [[79, 785]],
		527: [[111, 785]],
		528: [[82, 783]],
		529: [[114, 783]],
		530: [[82, 785]],
		531: [[114, 785]],
		532: [[85, 783]],
		533: [[117, 783]],
		534: [[85, 785]],
		535: [[117, 785]],
		536: [[83, 806]],
		537: [[115, 806]],
		538: [[84, 806]],
		539: [[116, 806]],
		542: [[72, 780]],
		543: [[104, 780]],
		550: [[65, 775], , { 772: 480 }],
		551: [[97, 775], , { 772: 481 }],
		552: [[69, 807], , { 774: 7708 }],
		553: [[101, 807], , { 774: 7709 }],
		554: [[214, 772]],
		555: [[246, 772]],
		556: [[213, 772]],
		557: [[245, 772]],
		558: [[79, 775], , { 772: 560 }],
		559: [[111, 775], , { 772: 561 }],
		560: [[558, 772]],
		561: [[559, 772]],
		562: [[89, 772]],
		563: [[121, 772]],
		658: [, , { 780: 495 }],
		688: [[104], 256],
		689: [[614], 256],
		690: [[106], 256],
		691: [[114], 256],
		692: [[633], 256],
		693: [[635], 256],
		694: [[641], 256],
		695: [[119], 256],
		696: [[121], 256],
		728: [[32, 774], 256],
		729: [[32, 775], 256],
		730: [[32, 778], 256],
		731: [[32, 808], 256],
		732: [[32, 771], 256],
		733: [[32, 779], 256],
		736: [[611], 256],
		737: [[108], 256],
		738: [[115], 256],
		739: [[120], 256],
		740: [[661], 256]
	},
	768: {
		768: [, 230],
		769: [, 230],
		770: [, 230],
		771: [, 230],
		772: [, 230],
		773: [, 230],
		774: [, 230],
		775: [, 230],
		776: [, 230, { 769: 836 }],
		777: [, 230],
		778: [, 230],
		779: [, 230],
		780: [, 230],
		781: [, 230],
		782: [, 230],
		783: [, 230],
		784: [, 230],
		785: [, 230],
		786: [, 230],
		787: [, 230],
		788: [, 230],
		789: [, 232],
		790: [, 220],
		791: [, 220],
		792: [, 220],
		793: [, 220],
		794: [, 232],
		795: [, 216],
		796: [, 220],
		797: [, 220],
		798: [, 220],
		799: [, 220],
		800: [, 220],
		801: [, 202],
		802: [, 202],
		803: [, 220],
		804: [, 220],
		805: [, 220],
		806: [, 220],
		807: [, 202],
		808: [, 202],
		809: [, 220],
		810: [, 220],
		811: [, 220],
		812: [, 220],
		813: [, 220],
		814: [, 220],
		815: [, 220],
		816: [, 220],
		817: [, 220],
		818: [, 220],
		819: [, 220],
		820: [, 1],
		821: [, 1],
		822: [, 1],
		823: [, 1],
		824: [, 1],
		825: [, 220],
		826: [, 220],
		827: [, 220],
		828: [, 220],
		829: [, 230],
		830: [, 230],
		831: [, 230],
		832: [[768], 230],
		833: [[769], 230],
		834: [, 230],
		835: [[787], 230],
		836: [[776, 769], 230],
		837: [, 240],
		838: [, 230],
		839: [, 220],
		840: [, 220],
		841: [, 220],
		842: [, 230],
		843: [, 230],
		844: [, 230],
		845: [, 220],
		846: [, 220],
		848: [, 230],
		849: [, 230],
		850: [, 230],
		851: [, 220],
		852: [, 220],
		853: [, 220],
		854: [, 220],
		855: [, 230],
		856: [, 232],
		857: [, 220],
		858: [, 220],
		859: [, 230],
		860: [, 233],
		861: [, 234],
		862: [, 234],
		863: [, 233],
		864: [, 234],
		865: [, 234],
		866: [, 233],
		867: [, 230],
		868: [, 230],
		869: [, 230],
		870: [, 230],
		871: [, 230],
		872: [, 230],
		873: [, 230],
		874: [, 230],
		875: [, 230],
		876: [, 230],
		877: [, 230],
		878: [, 230],
		879: [, 230],
		884: [[697]],
		890: [[32, 837], 256],
		894: [[59]],
		900: [[32, 769], 256],
		901: [[168, 769]],
		902: [[913, 769]],
		903: [[183]],
		904: [[917, 769]],
		905: [[919, 769]],
		906: [[921, 769]],
		908: [[927, 769]],
		910: [[933, 769]],
		911: [[937, 769]],
		912: [[970, 769]],
		913: [, , { 768: 8122, 769: 902, 772: 8121, 774: 8120, 787: 7944, 788: 7945, 837: 8124 }],
		917: [, , { 768: 8136, 769: 904, 787: 7960, 788: 7961 }],
		919: [, , { 768: 8138, 769: 905, 787: 7976, 788: 7977, 837: 8140 }],
		921: [, , { 768: 8154, 769: 906, 772: 8153, 774: 8152, 776: 938, 787: 7992, 788: 7993 }],
		927: [, , { 768: 8184, 769: 908, 787: 8008, 788: 8009 }],
		929: [, , { 788: 8172 }],
		933: [, , { 768: 8170, 769: 910, 772: 8169, 774: 8168, 776: 939, 788: 8025 }],
		937: [, , { 768: 8186, 769: 911, 787: 8040, 788: 8041, 837: 8188 }],
		938: [[921, 776]],
		939: [[933, 776]],
		940: [[945, 769], , { 837: 8116 }],
		941: [[949, 769]],
		942: [[951, 769], , { 837: 8132 }],
		943: [[953, 769]],
		944: [[971, 769]],
		945: [
			, ,
			{
				768: 8048,
				769: 940,
				772: 8113,
				774: 8112,
				787: 7936,
				788: 7937,
				834: 8118,
				837: 8115
			}
		],
		949: [, , { 768: 8050, 769: 941, 787: 7952, 788: 7953 }],
		951: [, , { 768: 8052, 769: 942, 787: 7968, 788: 7969, 834: 8134, 837: 8131 }],
		953: [
			, ,
			{ 768: 8054, 769: 943, 772: 8145, 774: 8144, 776: 970, 787: 7984, 788: 7985, 834: 8150 }
		],
		959: [, , { 768: 8056, 769: 972, 787: 8000, 788: 8001 }],
		961: [, , { 787: 8164, 788: 8165 }],
		965: [
			, ,
			{ 768: 8058, 769: 973, 772: 8161, 774: 8160, 776: 971, 787: 8016, 788: 8017, 834: 8166 }
		],
		969: [, , { 768: 8060, 769: 974, 787: 8032, 788: 8033, 834: 8182, 837: 8179 }],
		970: [[953, 776], , { 768: 8146, 769: 912, 834: 8151 }],
		971: [[965, 776], , { 768: 8162, 769: 944, 834: 8167 }],
		972: [[959, 769]],
		973: [[965, 769]],
		974: [[969, 769], , { 837: 8180 }],
		976: [[946], 256],
		977: [[952], 256],
		978: [[933], 256, { 769: 979, 776: 980 }],
		979: [[978, 769]],
		980: [[978, 776]],
		981: [[966], 256],
		982: [[960], 256],
		1008: [[954], 256],
		1009: [[961], 256],
		1010: [[962], 256],
		1012: [[920], 256],
		1013: [[949], 256],
		1017: [[931], 256]
	},
	1024: {
		1024: [[1045, 768]],
		1025: [[1045, 776]],
		1027: [[1043, 769]],
		1030: [, , { 776: 1031 }],
		1031: [[1030, 776]],
		1036: [[1050, 769]],
		1037: [[1048, 768]],
		1038: [[1059, 774]],
		1040: [, , { 774: 1232, 776: 1234 }],
		1043: [, , { 769: 1027 }],
		1045: [, , { 768: 1024, 774: 1238, 776: 1025 }],
		1046: [, , { 774: 1217, 776: 1244 }],
		1047: [, , { 776: 1246 }],
		1048: [, , { 768: 1037, 772: 1250, 774: 1049, 776: 1252 }],
		1049: [[1048, 774]],
		1050: [, , { 769: 1036 }],
		1054: [, , { 776: 1254 }],
		1059: [, , { 772: 1262, 774: 1038, 776: 1264, 779: 1266 }],
		1063: [, , { 776: 1268 }],
		1067: [, , { 776: 1272 }],
		1069: [, , { 776: 1260 }],
		1072: [, , { 774: 1233, 776: 1235 }],
		1075: [, , { 769: 1107 }],
		1077: [, , { 768: 1104, 774: 1239, 776: 1105 }],
		1078: [, , { 774: 1218, 776: 1245 }],
		1079: [, , { 776: 1247 }],
		1080: [, , { 768: 1117, 772: 1251, 774: 1081, 776: 1253 }],
		1081: [[1080, 774]],
		1082: [, , { 769: 1116 }],
		1086: [, , { 776: 1255 }],
		1091: [, , { 772: 1263, 774: 1118, 776: 1265, 779: 1267 }],
		1095: [, , { 776: 1269 }],
		1099: [, , { 776: 1273 }],
		1101: [, , { 776: 1261 }],
		1104: [[1077, 768]],
		1105: [[1077, 776]],
		1107: [[1075, 769]],
		1110: [, , { 776: 1111 }],
		1111: [[1110, 776]],
		1116: [[1082, 769]],
		1117: [[1080, 768]],
		1118: [[1091, 774]],
		1140: [, , { 783: 1142 }],
		1141: [, , { 783: 1143 }],
		1142: [[1140, 783]],
		1143: [[1141, 783]],
		1155: [, 230],
		1156: [, 230],
		1157: [, 230],
		1158: [, 230],
		1159: [, 230],
		1217: [[1046, 774]],
		1218: [[1078, 774]],
		1232: [[1040, 774]],
		1233: [[1072, 774]],
		1234: [[1040, 776]],
		1235: [[1072, 776]],
		1238: [[1045, 774]],
		1239: [[1077, 774]],
		1240: [, , { 776: 1242 }],
		1241: [, , { 776: 1243 }],
		1242: [[1240, 776]],
		1243: [[1241, 776]],
		1244: [[1046, 776]],
		1245: [[1078, 776]],
		1246: [[1047, 776]],
		1247: [[1079, 776]],
		1250: [[1048, 772]],
		1251: [[1080, 772]],
		1252: [[1048, 776]],
		1253: [[1080, 776]],
		1254: [[1054, 776]],
		1255: [[1086, 776]],
		1256: [, , { 776: 1258 }],
		1257: [, , { 776: 1259 }],
		1258: [[1256, 776]],
		1259: [[1257, 776]],
		1260: [[1069, 776]],
		1261: [[1101, 776]],
		1262: [[1059, 772]],
		1263: [[1091, 772]],
		1264: [[1059, 776]],
		1265: [[1091, 776]],
		1266: [[1059, 779]],
		1267: [[1091, 779]],
		1268: [[1063, 776]],
		1269: [[1095, 776]],
		1272: [[1067, 776]],
		1273: [[1099, 776]]
	},
	1280: {
		1415: [[1381, 1410], 256],
		1425: [, 220],
		1426: [, 230],
		1427: [, 230],
		1428: [, 230],
		1429: [, 230],
		1430: [, 220],
		1431: [, 230],
		1432: [, 230],
		1433: [, 230],
		1434: [, 222],
		1435: [, 220],
		1436: [, 230],
		1437: [, 230],
		1438: [, 230],
		1439: [, 230],
		1440: [, 230],
		1441: [, 230],
		1442: [, 220],
		1443: [, 220],
		1444: [, 220],
		1445: [, 220],
		1446: [, 220],
		1447: [, 220],
		1448: [, 230],
		1449: [, 230],
		1450: [, 220],
		1451: [, 230],
		1452: [, 230],
		1453: [, 222],
		1454: [, 228],
		1455: [, 230],
		1456: [, 10],
		1457: [, 11],
		1458: [, 12],
		1459: [, 13],
		1460: [, 14],
		1461: [, 15],
		1462: [, 16],
		1463: [, 17],
		1464: [, 18],
		1465: [, 19],
		1466: [, 19],
		1467: [, 20],
		1468: [, 21],
		1469: [, 22],
		1471: [, 23],
		1473: [, 24],
		1474: [, 25],
		1476: [, 230],
		1477: [, 220],
		1479: [, 18]
	},
	1536: {
		1552: [, 230],
		1553: [, 230],
		1554: [, 230],
		1555: [, 230],
		1556: [, 230],
		1557: [, 230],
		1558: [, 230],
		1559: [, 230],
		1560: [, 30],
		1561: [, 31],
		1562: [, 32],
		1570: [[1575, 1619]],
		1571: [[1575, 1620]],
		1572: [[1608, 1620]],
		1573: [[1575, 1621]],
		1574: [[1610, 1620]],
		1575: [, , { 1619: 1570, 1620: 1571, 1621: 1573 }],
		1608: [, , { 1620: 1572 }],
		1610: [, , { 1620: 1574 }],
		1611: [, 27],
		1612: [, 28],
		1613: [, 29],
		1614: [, 30],
		1615: [, 31],
		1616: [, 32],
		1617: [, 33],
		1618: [, 34],
		1619: [, 230],
		1620: [, 230],
		1621: [, 220],
		1622: [, 220],
		1623: [, 230],
		1624: [, 230],
		1625: [, 230],
		1626: [, 230],
		1627: [, 230],
		1628: [, 220],
		1629: [, 230],
		1630: [, 230],
		1631: [, 220],
		1648: [, 35],
		1653: [[1575, 1652], 256],
		1654: [[1608, 1652], 256],
		1655: [[1735, 1652], 256],
		1656: [[1610, 1652], 256],
		1728: [[1749, 1620]],
		1729: [, , { 1620: 1730 }],
		1730: [[1729, 1620]],
		1746: [, , { 1620: 1747 }],
		1747: [[1746, 1620]],
		1749: [, , { 1620: 1728 }],
		1750: [, 230],
		1751: [, 230],
		1752: [, 230],
		1753: [, 230],
		1754: [, 230],
		1755: [, 230],
		1756: [, 230],
		1759: [, 230],
		1760: [, 230],
		1761: [, 230],
		1762: [, 230],
		1763: [, 220],
		1764: [, 230],
		1767: [, 230],
		1768: [, 230],
		1770: [, 220],
		1771: [, 230],
		1772: [, 230],
		1773: [, 220]
	},
	1792: {
		1809: [, 36],
		1840: [, 230],
		1841: [, 220],
		1842: [, 230],
		1843: [, 230],
		1844: [, 220],
		1845: [, 230],
		1846: [, 230],
		1847: [, 220],
		1848: [, 220],
		1849: [, 220],
		1850: [, 230],
		1851: [, 220],
		1852: [, 220],
		1853: [, 230],
		1854: [, 220],
		1855: [, 230],
		1856: [, 230],
		1857: [, 230],
		1858: [, 220],
		1859: [, 230],
		1860: [, 220],
		1861: [, 230],
		1862: [, 220],
		1863: [, 230],
		1864: [, 220],
		1865: [, 230],
		1866: [, 230],
		2027: [, 230],
		2028: [, 230],
		2029: [, 230],
		2030: [, 230],
		2031: [, 230],
		2032: [, 230],
		2033: [, 230],
		2034: [, 220],
		2035: [, 230]
	},
	2048: {
		2070: [, 230],
		2071: [, 230],
		2072: [, 230],
		2073: [, 230],
		2075: [, 230],
		2076: [, 230],
		2077: [, 230],
		2078: [, 230],
		2079: [, 230],
		2080: [, 230],
		2081: [, 230],
		2082: [, 230],
		2083: [, 230],
		2085: [, 230],
		2086: [, 230],
		2087: [, 230],
		2089: [, 230],
		2090: [, 230],
		2091: [, 230],
		2092: [, 230],
		2093: [, 230],
		2137: [, 220],
		2138: [, 220],
		2139: [, 220],
		2276: [, 230],
		2277: [, 230],
		2278: [, 220],
		2279: [, 230],
		2280: [, 230],
		2281: [, 220],
		2282: [, 230],
		2283: [, 230],
		2284: [, 230],
		2285: [, 220],
		2286: [, 220],
		2287: [, 220],
		2288: [, 27],
		2289: [, 28],
		2290: [, 29],
		2291: [, 230],
		2292: [, 230],
		2293: [, 230],
		2294: [, 220],
		2295: [, 230],
		2296: [, 230],
		2297: [, 220],
		2298: [, 220],
		2299: [, 230],
		2300: [, 230],
		2301: [, 230],
		2302: [, 230]
	},
	2304: {
		2344: [, , { 2364: 2345 }],
		2345: [[2344, 2364]],
		2352: [, , { 2364: 2353 }],
		2353: [[2352, 2364]],
		2355: [, , { 2364: 2356 }],
		2356: [[2355, 2364]],
		2364: [, 7],
		2381: [, 9],
		2385: [, 230],
		2386: [, 220],
		2387: [, 230],
		2388: [, 230],
		2392: [[2325, 2364], 512],
		2393: [[2326, 2364], 512],
		2394: [[2327, 2364], 512],
		2395: [[2332, 2364], 512],
		2396: [[2337, 2364], 512],
		2397: [[2338, 2364], 512],
		2398: [[2347, 2364], 512],
		2399: [[2351, 2364], 512],
		2492: [, 7],
		2503: [, , { 2494: 2507, 2519: 2508 }],
		2507: [[2503, 2494]],
		2508: [[2503, 2519]],
		2509: [, 9],
		2524: [[2465, 2492], 512],
		2525: [[2466, 2492], 512],
		2527: [[2479, 2492], 512]
	},
	2560: {
		2611: [[2610, 2620], 512],
		2614: [[2616, 2620], 512],
		2620: [, 7],
		2637: [, 9],
		2649: [[2582, 2620], 512],
		2650: [[2583, 2620], 512],
		2651: [[2588, 2620], 512],
		2654: [[2603, 2620], 512],
		2748: [, 7],
		2765: [, 9],
		68109: [, 220],
		68111: [, 230],
		68152: [, 230],
		68153: [, 1],
		68154: [, 220],
		68159: [, 9]
	},
	2816: {
		2876: [, 7],
		2887: [, , { 2878: 2891, 2902: 2888, 2903: 2892 }],
		2888: [[2887, 2902]],
		2891: [[2887, 2878]],
		2892: [[2887, 2903]],
		2893: [, 9],
		2908: [[2849, 2876], 512],
		2909: [[2850, 2876], 512],
		2962: [, , { 3031: 2964 }],
		2964: [[2962, 3031]],
		3014: [, , { 3006: 3018, 3031: 3020 }],
		3015: [, , { 3006: 3019 }],
		3018: [[3014, 3006]],
		3019: [[3015, 3006]],
		3020: [[3014, 3031]],
		3021: [, 9]
	},
	3072: {
		3142: [, , { 3158: 3144 }],
		3144: [[3142, 3158]],
		3149: [, 9],
		3157: [, 84],
		3158: [, 91],
		3260: [, 7],
		3263: [, , { 3285: 3264 }],
		3264: [[3263, 3285]],
		3270: [, , { 3266: 3274, 3285: 3271, 3286: 3272 }],
		3271: [[3270, 3285]],
		3272: [[3270, 3286]],
		3274: [[3270, 3266], , { 3285: 3275 }],
		3275: [[3274, 3285]],
		3277: [, 9]
	},
	3328: {
		3398: [, , { 3390: 3402, 3415: 3404 }],
		3399: [, , { 3390: 3403 }],
		3402: [[3398, 3390]],
		3403: [[3399, 3390]],
		3404: [[3398, 3415]],
		3405: [, 9],
		3530: [, 9],
		3545: [, , { 3530: 3546, 3535: 3548, 3551: 3550 }],
		3546: [[3545, 3530]],
		3548: [[3545, 3535], , { 3530: 3549 }],
		3549: [[3548, 3530]],
		3550: [[3545, 3551]]
	},
	3584: {
		3635: [[3661, 3634], 256],
		3640: [, 103],
		3641: [, 103],
		3642: [, 9],
		3656: [, 107],
		3657: [, 107],
		3658: [, 107],
		3659: [, 107],
		3763: [[3789, 3762], 256],
		3768: [, 118],
		3769: [, 118],
		3784: [, 122],
		3785: [, 122],
		3786: [, 122],
		3787: [, 122],
		3804: [[3755, 3737], 256],
		3805: [[3755, 3745], 256]
	},
	3840: {
		3852: [[3851], 256],
		3864: [, 220],
		3865: [, 220],
		3893: [, 220],
		3895: [, 220],
		3897: [, 216],
		3907: [[3906, 4023], 512],
		3917: [[3916, 4023], 512],
		3922: [[3921, 4023], 512],
		3927: [[3926, 4023], 512],
		3932: [[3931, 4023], 512],
		3945: [[3904, 4021], 512],
		3953: [, 129],
		3954: [, 130],
		3955: [[3953, 3954], 512],
		3956: [, 132],
		3957: [[3953, 3956], 512],
		3958: [[4018, 3968], 512],
		3959: [[4018, 3969], 256],
		3960: [[4019, 3968], 512],
		3961: [[4019, 3969], 256],
		3962: [, 130],
		3963: [, 130],
		3964: [, 130],
		3965: [, 130],
		3968: [, 130],
		3969: [[3953, 3968], 512],
		3970: [, 230],
		3971: [, 230],
		3972: [, 9],
		3974: [, 230],
		3975: [, 230],
		3987: [[3986, 4023], 512],
		3997: [[3996, 4023], 512],
		4002: [[4001, 4023], 512],
		4007: [[4006, 4023], 512],
		4012: [[4011, 4023], 512],
		4025: [[3984, 4021], 512],
		4038: [, 220]
	},
	4096: {
		4133: [, , { 4142: 4134 }],
		4134: [[4133, 4142]],
		4151: [, 7],
		4153: [, 9],
		4154: [, 9],
		4237: [, 220],
		4348: [[4316], 256],
		69702: [, 9],
		69785: [, , { 69818: 69786 }],
		69786: [[69785, 69818]],
		69787: [, , { 69818: 69788 }],
		69788: [[69787, 69818]],
		69797: [, , { 69818: 69803 }],
		69803: [[69797, 69818]],
		69817: [, 9],
		69818: [, 7]
	},
	4352: {
		69888: [, 230],
		69889: [, 230],
		69890: [, 230],
		69934: [[69937, 69927]],
		69935: [[69938, 69927]],
		69937: [, , { 69927: 69934 }],
		69938: [, , { 69927: 69935 }],
		69939: [, 9],
		69940: [, 9],
		70080: [, 9]
	},
	4864: { 4957: [, 230], 4958: [, 230], 4959: [, 230] },
	5632: { 71350: [, 9], 71351: [, 7] },
	5888: { 5908: [, 9], 5940: [, 9], 6098: [, 9], 6109: [, 230] },
	6144: { 6313: [, 228] },
	6400: { 6457: [, 222], 6458: [, 230], 6459: [, 220] },
	6656: {
		6679: [, 230],
		6680: [, 220],
		6752: [, 9],
		6773: [, 230],
		6774: [, 230],
		6775: [, 230],
		6776: [, 230],
		6777: [, 230],
		6778: [, 230],
		6779: [, 230],
		6780: [, 230],
		6783: [, 220]
	},
	6912: {
		6917: [, , { 6965: 6918 }],
		6918: [[6917, 6965]],
		6919: [, , { 6965: 6920 }],
		6920: [[6919, 6965]],
		6921: [, , { 6965: 6922 }],
		6922: [[6921, 6965]],
		6923: [, , { 6965: 6924 }],
		6924: [[6923, 6965]],
		6925: [, , { 6965: 6926 }],
		6926: [[6925, 6965]],
		6929: [, , { 6965: 6930 }],
		6930: [[6929, 6965]],
		6964: [, 7],
		6970: [, , { 6965: 6971 }],
		6971: [[6970, 6965]],
		6972: [, , { 6965: 6973 }],
		6973: [[6972, 6965]],
		6974: [, , { 6965: 6976 }],
		6975: [, , { 6965: 6977 }],
		6976: [[6974, 6965]],
		6977: [[6975, 6965]],
		6978: [, , { 6965: 6979 }],
		6979: [[6978, 6965]],
		6980: [, 9],
		7019: [, 230],
		7020: [, 220],
		7021: [, 230],
		7022: [, 230],
		7023: [, 230],
		7024: [, 230],
		7025: [, 230],
		7026: [, 230],
		7027: [, 230],
		7082: [, 9],
		7083: [, 9],
		7142: [, 7],
		7154: [, 9],
		7155: [, 9]
	},
	7168: {
		7223: [, 7],
		7376: [, 230],
		7377: [, 230],
		7378: [, 230],
		7380: [, 1],
		7381: [, 220],
		7382: [, 220],
		7383: [, 220],
		7384: [, 220],
		7385: [, 220],
		7386: [, 230],
		7387: [, 230],
		7388: [, 220],
		7389: [, 220],
		7390: [, 220],
		7391: [, 220],
		7392: [, 230],
		7394: [, 1],
		7395: [, 1],
		7396: [, 1],
		7397: [, 1],
		7398: [, 1],
		7399: [, 1],
		7400: [, 1],
		7405: [, 220],
		7412: [, 230]
	},
	7424: {
		7468: [[65], 256],
		7469: [[198], 256],
		7470: [[66], 256],
		7472: [[68], 256],
		7473: [[69], 256],
		7474: [[398], 256],
		7475: [[71], 256],
		7476: [[72], 256],
		7477: [[73], 256],
		7478: [[74], 256],
		7479: [[75], 256],
		7480: [[76], 256],
		7481: [[77], 256],
		7482: [[78], 256],
		7484: [[79], 256],
		7485: [[546], 256],
		7486: [[80], 256],
		7487: [[82], 256],
		7488: [[84], 256],
		7489: [[85], 256],
		7490: [[87], 256],
		7491: [[97], 256],
		7492: [[592], 256],
		7493: [[593], 256],
		7494: [[7426], 256],
		7495: [[98], 256],
		7496: [[100], 256],
		7497: [[101], 256],
		7498: [[601], 256],
		7499: [[603], 256],
		7500: [[604], 256],
		7501: [[103], 256],
		7503: [[107], 256],
		7504: [[109], 256],
		7505: [[331], 256],
		7506: [[111], 256],
		7507: [[596], 256],
		7508: [[7446], 256],
		7509: [[7447], 256],
		7510: [[112], 256],
		7511: [[116], 256],
		7512: [[117], 256],
		7513: [[7453], 256],
		7514: [[623], 256],
		7515: [[118], 256],
		7516: [[7461], 256],
		7517: [[946], 256],
		7518: [[947], 256],
		7519: [[948], 256],
		7520: [[966], 256],
		7521: [[967], 256],
		7522: [[105], 256],
		7523: [[114], 256],
		7524: [[117], 256],
		7525: [[118], 256],
		7526: [[946], 256],
		7527: [[947], 256],
		7528: [[961], 256],
		7529: [[966], 256],
		7530: [[967], 256],
		7544: [[1085], 256],
		7579: [[594], 256],
		7580: [[99], 256],
		7581: [[597], 256],
		7582: [[240], 256],
		7583: [[604], 256],
		7584: [[102], 256],
		7585: [[607], 256],
		7586: [[609], 256],
		7587: [[613], 256],
		7588: [[616], 256],
		7589: [[617], 256],
		7590: [[618], 256],
		7591: [[7547], 256],
		7592: [[669], 256],
		7593: [[621], 256],
		7594: [[7557], 256],
		7595: [[671], 256],
		7596: [[625], 256],
		7597: [[624], 256],
		7598: [[626], 256],
		7599: [[627], 256],
		7600: [[628], 256],
		7601: [[629], 256],
		7602: [[632], 256],
		7603: [[642], 256],
		7604: [[643], 256],
		7605: [[427], 256],
		7606: [[649], 256],
		7607: [[650], 256],
		7608: [[7452], 256],
		7609: [[651], 256],
		7610: [[652], 256],
		7611: [[122], 256],
		7612: [[656], 256],
		7613: [[657], 256],
		7614: [[658], 256],
		7615: [[952], 256],
		7616: [, 230],
		7617: [, 230],
		7618: [, 220],
		7619: [, 230],
		7620: [, 230],
		7621: [, 230],
		7622: [, 230],
		7623: [, 230],
		7624: [, 230],
		7625: [, 230],
		7626: [, 220],
		7627: [, 230],
		7628: [, 230],
		7629: [, 234],
		7630: [, 214],
		7631: [, 220],
		7632: [, 202],
		7633: [, 230],
		7634: [, 230],
		7635: [, 230],
		7636: [, 230],
		7637: [, 230],
		7638: [, 230],
		7639: [, 230],
		7640: [, 230],
		7641: [, 230],
		7642: [, 230],
		7643: [, 230],
		7644: [, 230],
		7645: [, 230],
		7646: [, 230],
		7647: [, 230],
		7648: [, 230],
		7649: [, 230],
		7650: [, 230],
		7651: [, 230],
		7652: [, 230],
		7653: [, 230],
		7654: [, 230],
		7676: [, 233],
		7677: [, 220],
		7678: [, 230],
		7679: [, 220]
	},
	7680: {
		7680: [[65, 805]],
		7681: [[97, 805]],
		7682: [[66, 775]],
		7683: [[98, 775]],
		7684: [[66, 803]],
		7685: [[98, 803]],
		7686: [[66, 817]],
		7687: [[98, 817]],
		7688: [[199, 769]],
		7689: [[231, 769]],
		7690: [[68, 775]],
		7691: [[100, 775]],
		7692: [[68, 803]],
		7693: [[100, 803]],
		7694: [[68, 817]],
		7695: [[100, 817]],
		7696: [[68, 807]],
		7697: [[100, 807]],
		7698: [[68, 813]],
		7699: [[100, 813]],
		7700: [[274, 768]],
		7701: [[275, 768]],
		7702: [[274, 769]],
		7703: [[275, 769]],
		7704: [[69, 813]],
		7705: [[101, 813]],
		7706: [[69, 816]],
		7707: [[101, 816]],
		7708: [[552, 774]],
		7709: [[553, 774]],
		7710: [[70, 775]],
		7711: [[102, 775]],
		7712: [[71, 772]],
		7713: [[103, 772]],
		7714: [[72, 775]],
		7715: [[104, 775]],
		7716: [[72, 803]],
		7717: [[104, 803]],
		7718: [[72, 776]],
		7719: [[104, 776]],
		7720: [[72, 807]],
		7721: [[104, 807]],
		7722: [[72, 814]],
		7723: [[104, 814]],
		7724: [[73, 816]],
		7725: [[105, 816]],
		7726: [[207, 769]],
		7727: [[239, 769]],
		7728: [[75, 769]],
		7729: [[107, 769]],
		7730: [[75, 803]],
		7731: [[107, 803]],
		7732: [[75, 817]],
		7733: [[107, 817]],
		7734: [[76, 803], , { 772: 7736 }],
		7735: [[108, 803], , { 772: 7737 }],
		7736: [[7734, 772]],
		7737: [[7735, 772]],
		7738: [[76, 817]],
		7739: [[108, 817]],
		7740: [[76, 813]],
		7741: [[108, 813]],
		7742: [[77, 769]],
		7743: [[109, 769]],
		7744: [[77, 775]],
		7745: [[109, 775]],
		7746: [[77, 803]],
		7747: [[109, 803]],
		7748: [[78, 775]],
		7749: [[110, 775]],
		7750: [[78, 803]],
		7751: [[110, 803]],
		7752: [[78, 817]],
		7753: [[110, 817]],
		7754: [[78, 813]],
		7755: [[110, 813]],
		7756: [[213, 769]],
		7757: [[245, 769]],
		7758: [[213, 776]],
		7759: [[245, 776]],
		7760: [[332, 768]],
		7761: [[333, 768]],
		7762: [[332, 769]],
		7763: [[333, 769]],
		7764: [[80, 769]],
		7765: [[112, 769]],
		7766: [[80, 775]],
		7767: [[112, 775]],
		7768: [[82, 775]],
		7769: [[114, 775]],
		7770: [[82, 803], , { 772: 7772 }],
		7771: [[114, 803], , { 772: 7773 }],
		7772: [[7770, 772]],
		7773: [[7771, 772]],
		7774: [[82, 817]],
		7775: [[114, 817]],
		7776: [[83, 775]],
		7777: [[115, 775]],
		7778: [[83, 803], , { 775: 7784 }],
		7779: [[115, 803], , { 775: 7785 }],
		7780: [[346, 775]],
		7781: [[347, 775]],
		7782: [[352, 775]],
		7783: [[353, 775]],
		7784: [[7778, 775]],
		7785: [[7779, 775]],
		7786: [[84, 775]],
		7787: [[116, 775]],
		7788: [[84, 803]],
		7789: [[116, 803]],
		7790: [[84, 817]],
		7791: [[116, 817]],
		7792: [[84, 813]],
		7793: [[116, 813]],
		7794: [[85, 804]],
		7795: [[117, 804]],
		7796: [[85, 816]],
		7797: [[117, 816]],
		7798: [[85, 813]],
		7799: [[117, 813]],
		7800: [[360, 769]],
		7801: [[361, 769]],
		7802: [[362, 776]],
		7803: [[363, 776]],
		7804: [[86, 771]],
		7805: [[118, 771]],
		7806: [[86, 803]],
		7807: [[118, 803]],
		7808: [[87, 768]],
		7809: [[119, 768]],
		7810: [[87, 769]],
		7811: [[119, 769]],
		7812: [[87, 776]],
		7813: [[119, 776]],
		7814: [[87, 775]],
		7815: [[119, 775]],
		7816: [[87, 803]],
		7817: [[119, 803]],
		7818: [[88, 775]],
		7819: [[120, 775]],
		7820: [[88, 776]],
		7821: [[120, 776]],
		7822: [[89, 775]],
		7823: [[121, 775]],
		7824: [[90, 770]],
		7825: [[122, 770]],
		7826: [[90, 803]],
		7827: [[122, 803]],
		7828: [[90, 817]],
		7829: [[122, 817]],
		7830: [[104, 817]],
		7831: [[116, 776]],
		7832: [[119, 778]],
		7833: [[121, 778]],
		7834: [[97, 702], 256],
		7835: [[383, 775]],
		7840: [[65, 803], , { 770: 7852, 774: 7862 }],
		7841: [[97, 803], , { 770: 7853, 774: 7863 }],
		7842: [[65, 777]],
		7843: [[97, 777]],
		7844: [[194, 769]],
		7845: [[226, 769]],
		7846: [[194, 768]],
		7847: [[226, 768]],
		7848: [[194, 777]],
		7849: [[226, 777]],
		7850: [[194, 771]],
		7851: [[226, 771]],
		7852: [[7840, 770]],
		7853: [[7841, 770]],
		7854: [[258, 769]],
		7855: [[259, 769]],
		7856: [[258, 768]],
		7857: [[259, 768]],
		7858: [[258, 777]],
		7859: [[259, 777]],
		7860: [[258, 771]],
		7861: [[259, 771]],
		7862: [[7840, 774]],
		7863: [[7841, 774]],
		7864: [[69, 803], , { 770: 7878 }],
		7865: [[101, 803], , { 770: 7879 }],
		7866: [[69, 777]],
		7867: [[101, 777]],
		7868: [[69, 771]],
		7869: [[101, 771]],
		7870: [[202, 769]],
		7871: [[234, 769]],
		7872: [[202, 768]],
		7873: [[234, 768]],
		7874: [[202, 777]],
		7875: [[234, 777]],
		7876: [[202, 771]],
		7877: [[234, 771]],
		7878: [[7864, 770]],
		7879: [[7865, 770]],
		7880: [[73, 777]],
		7881: [[105, 777]],
		7882: [[73, 803]],
		7883: [[105, 803]],
		7884: [[79, 803], , { 770: 7896 }],
		7885: [[111, 803], , { 770: 7897 }],
		7886: [[79, 777]],
		7887: [[111, 777]],
		7888: [[212, 769]],
		7889: [[244, 769]],
		7890: [[212, 768]],
		7891: [[244, 768]],
		7892: [[212, 777]],
		7893: [[244, 777]],
		7894: [[212, 771]],
		7895: [[244, 771]],
		7896: [[7884, 770]],
		7897: [[7885, 770]],
		7898: [[416, 769]],
		7899: [[417, 769]],
		7900: [[416, 768]],
		7901: [[417, 768]],
		7902: [[416, 777]],
		7903: [[417, 777]],
		7904: [[416, 771]],
		7905: [[417, 771]],
		7906: [[416, 803]],
		7907: [[417, 803]],
		7908: [[85, 803]],
		7909: [[117, 803]],
		7910: [[85, 777]],
		7911: [[117, 777]],
		7912: [[431, 769]],
		7913: [[432, 769]],
		7914: [[431, 768]],
		7915: [[432, 768]],
		7916: [[431, 777]],
		7917: [[432, 777]],
		7918: [[431, 771]],
		7919: [[432, 771]],
		7920: [[431, 803]],
		7921: [[432, 803]],
		7922: [[89, 768]],
		7923: [[121, 768]],
		7924: [[89, 803]],
		7925: [[121, 803]],
		7926: [[89, 777]],
		7927: [[121, 777]],
		7928: [[89, 771]],
		7929: [[121, 771]]
	},
	7936: {
		7936: [[945, 787], , { 768: 7938, 769: 7940, 834: 7942, 837: 8064 }],
		7937: [[945, 788], , { 768: 7939, 769: 7941, 834: 7943, 837: 8065 }],
		7938: [[7936, 768], , { 837: 8066 }],
		7939: [[7937, 768], , { 837: 8067 }],
		7940: [[7936, 769], , { 837: 8068 }],
		7941: [[7937, 769], , { 837: 8069 }],
		7942: [[7936, 834], , { 837: 8070 }],
		7943: [[7937, 834], , { 837: 8071 }],
		7944: [[913, 787], , { 768: 7946, 769: 7948, 834: 7950, 837: 8072 }],
		7945: [[913, 788], , { 768: 7947, 769: 7949, 834: 7951, 837: 8073 }],
		7946: [[7944, 768], , { 837: 8074 }],
		7947: [[7945, 768], , { 837: 8075 }],
		7948: [[7944, 769], , { 837: 8076 }],
		7949: [[7945, 769], , { 837: 8077 }],
		7950: [[7944, 834], , { 837: 8078 }],
		7951: [[7945, 834], , { 837: 8079 }],
		7952: [[949, 787], , { 768: 7954, 769: 7956 }],
		7953: [[949, 788], , { 768: 7955, 769: 7957 }],
		7954: [[7952, 768]],
		7955: [[7953, 768]],
		7956: [[7952, 769]],
		7957: [[7953, 769]],
		7960: [[917, 787], , { 768: 7962, 769: 7964 }],
		7961: [[917, 788], , { 768: 7963, 769: 7965 }],
		7962: [[7960, 768]],
		7963: [[7961, 768]],
		7964: [[7960, 769]],
		7965: [[7961, 769]],
		7968: [[951, 787], , { 768: 7970, 769: 7972, 834: 7974, 837: 8080 }],
		7969: [[951, 788], , { 768: 7971, 769: 7973, 834: 7975, 837: 8081 }],
		7970: [[7968, 768], , { 837: 8082 }],
		7971: [[7969, 768], , { 837: 8083 }],
		7972: [[7968, 769], , { 837: 8084 }],
		7973: [[7969, 769], , { 837: 8085 }],
		7974: [[7968, 834], , { 837: 8086 }],
		7975: [[7969, 834], , { 837: 8087 }],
		7976: [[919, 787], , { 768: 7978, 769: 7980, 834: 7982, 837: 8088 }],
		7977: [[919, 788], , { 768: 7979, 769: 7981, 834: 7983, 837: 8089 }],
		7978: [[7976, 768], , { 837: 8090 }],
		7979: [[7977, 768], , { 837: 8091 }],
		7980: [[7976, 769], , { 837: 8092 }],
		7981: [[7977, 769], , { 837: 8093 }],
		7982: [[7976, 834], , { 837: 8094 }],
		7983: [[7977, 834], , { 837: 8095 }],
		7984: [[953, 787], , { 768: 7986, 769: 7988, 834: 7990 }],
		7985: [[953, 788], , { 768: 7987, 769: 7989, 834: 7991 }],
		7986: [[7984, 768]],
		7987: [[7985, 768]],
		7988: [[7984, 769]],
		7989: [[7985, 769]],
		7990: [[7984, 834]],
		7991: [[7985, 834]],
		7992: [[921, 787], , { 768: 7994, 769: 7996, 834: 7998 }],
		7993: [[921, 788], , { 768: 7995, 769: 7997, 834: 7999 }],
		7994: [[7992, 768]],
		7995: [[7993, 768]],
		7996: [[7992, 769]],
		7997: [[7993, 769]],
		7998: [[7992, 834]],
		7999: [[7993, 834]],
		8000: [[959, 787], , { 768: 8002, 769: 8004 }],
		8001: [[959, 788], , { 768: 8003, 769: 8005 }],
		8002: [[8000, 768]],
		8003: [[8001, 768]],
		8004: [[8000, 769]],
		8005: [[8001, 769]],
		8008: [[927, 787], , { 768: 8010, 769: 8012 }],
		8009: [[927, 788], , { 768: 8011, 769: 8013 }],
		8010: [[8008, 768]],
		8011: [[8009, 768]],
		8012: [[8008, 769]],
		8013: [[8009, 769]],
		8016: [[965, 787], , { 768: 8018, 769: 8020, 834: 8022 }],
		8017: [[965, 788], , { 768: 8019, 769: 8021, 834: 8023 }],
		8018: [[8016, 768]],
		8019: [[8017, 768]],
		8020: [[8016, 769]],
		8021: [[8017, 769]],
		8022: [[8016, 834]],
		8023: [[8017, 834]],
		8025: [[933, 788], , { 768: 8027, 769: 8029, 834: 8031 }],
		8027: [[8025, 768]],
		8029: [[8025, 769]],
		8031: [[8025, 834]],
		8032: [[969, 787], , { 768: 8034, 769: 8036, 834: 8038, 837: 8096 }],
		8033: [[969, 788], , { 768: 8035, 769: 8037, 834: 8039, 837: 8097 }],
		8034: [[8032, 768], , { 837: 8098 }],
		8035: [[8033, 768], , { 837: 8099 }],
		8036: [[8032, 769], , { 837: 8100 }],
		8037: [[8033, 769], , { 837: 8101 }],
		8038: [[8032, 834], , { 837: 8102 }],
		8039: [[8033, 834], , { 837: 8103 }],
		8040: [[937, 787], , { 768: 8042, 769: 8044, 834: 8046, 837: 8104 }],
		8041: [[937, 788], , { 768: 8043, 769: 8045, 834: 8047, 837: 8105 }],
		8042: [[8040, 768], , { 837: 8106 }],
		8043: [[8041, 768], , { 837: 8107 }],
		8044: [[8040, 769], , { 837: 8108 }],
		8045: [[8041, 769], , { 837: 8109 }],
		8046: [[8040, 834], , { 837: 8110 }],
		8047: [[8041, 834], , { 837: 8111 }],
		8048: [[945, 768], , { 837: 8114 }],
		8049: [[940]],
		8050: [[949, 768]],
		8051: [[941]],
		8052: [[951, 768], , { 837: 8130 }],
		8053: [[942]],
		8054: [[953, 768]],
		8055: [[943]],
		8056: [[959, 768]],
		8057: [[972]],
		8058: [[965, 768]],
		8059: [[973]],
		8060: [[969, 768], , { 837: 8178 }],
		8061: [[974]],
		8064: [[7936, 837]],
		8065: [[7937, 837]],
		8066: [[7938, 837]],
		8067: [[7939, 837]],
		8068: [[7940, 837]],
		8069: [[7941, 837]],
		8070: [[7942, 837]],
		8071: [[7943, 837]],
		8072: [[7944, 837]],
		8073: [[7945, 837]],
		8074: [[7946, 837]],
		8075: [[7947, 837]],
		8076: [[7948, 837]],
		8077: [[7949, 837]],
		8078: [[7950, 837]],
		8079: [[7951, 837]],
		8080: [[7968, 837]],
		8081: [[7969, 837]],
		8082: [[7970, 837]],
		8083: [[7971, 837]],
		8084: [[7972, 837]],
		8085: [[7973, 837]],
		8086: [[7974, 837]],
		8087: [[7975, 837]],
		8088: [[7976, 837]],
		8089: [[7977, 837]],
		8090: [[7978, 837]],
		8091: [[7979, 837]],
		8092: [[7980, 837]],
		8093: [[7981, 837]],
		8094: [[7982, 837]],
		8095: [[7983, 837]],
		8096: [[8032, 837]],
		8097: [[8033, 837]],
		8098: [[8034, 837]],
		8099: [[8035, 837]],
		8100: [[8036, 837]],
		8101: [[8037, 837]],
		8102: [[8038, 837]],
		8103: [[8039, 837]],
		8104: [[8040, 837]],
		8105: [[8041, 837]],
		8106: [[8042, 837]],
		8107: [[8043, 837]],
		8108: [[8044, 837]],
		8109: [[8045, 837]],
		8110: [[8046, 837]],
		8111: [[8047, 837]],
		8112: [[945, 774]],
		8113: [[945, 772]],
		8114: [[8048, 837]],
		8115: [[945, 837]],
		8116: [[940, 837]],
		8118: [[945, 834], , { 837: 8119 }],
		8119: [[8118, 837]],
		8120: [[913, 774]],
		8121: [[913, 772]],
		8122: [[913, 768]],
		8123: [[902]],
		8124: [[913, 837]],
		8125: [[32, 787], 256],
		8126: [[953]],
		8127: [[32, 787], 256, { 768: 8141, 769: 8142, 834: 8143 }],
		8128: [[32, 834], 256],
		8129: [[168, 834]],
		8130: [[8052, 837]],
		8131: [[951, 837]],
		8132: [[942, 837]],
		8134: [[951, 834], , { 837: 8135 }],
		8135: [[8134, 837]],
		8136: [[917, 768]],
		8137: [[904]],
		8138: [[919, 768]],
		8139: [[905]],
		8140: [[919, 837]],
		8141: [[8127, 768]],
		8142: [[8127, 769]],
		8143: [[8127, 834]],
		8144: [[953, 774]],
		8145: [[953, 772]],
		8146: [[970, 768]],
		8147: [[912]],
		8150: [[953, 834]],
		8151: [[970, 834]],
		8152: [[921, 774]],
		8153: [[921, 772]],
		8154: [[921, 768]],
		8155: [[906]],
		8157: [[8190, 768]],
		8158: [[8190, 769]],
		8159: [[8190, 834]],
		8160: [[965, 774]],
		8161: [[965, 772]],
		8162: [[971, 768]],
		8163: [[944]],
		8164: [[961, 787]],
		8165: [[961, 788]],
		8166: [[965, 834]],
		8167: [[971, 834]],
		8168: [[933, 774]],
		8169: [[933, 772]],
		8170: [[933, 768]],
		8171: [[910]],
		8172: [[929, 788]],
		8173: [[168, 768]],
		8174: [[901]],
		8175: [[96]],
		8178: [[8060, 837]],
		8179: [[969, 837]],
		8180: [[974, 837]],
		8182: [[969, 834], , { 837: 8183 }],
		8183: [[8182, 837]],
		8184: [[927, 768]],
		8185: [[908]],
		8186: [[937, 768]],
		8187: [[911]],
		8188: [[937, 837]],
		8189: [[180]],
		8190: [[32, 788], 256, { 768: 8157, 769: 8158, 834: 8159 }]
	},
	8192: {
		8192: [[8194]],
		8193: [[8195]],
		8194: [[32], 256],
		8195: [[32], 256],
		8196: [[32], 256],
		8197: [[32], 256],
		8198: [[32], 256],
		8199: [[32], 256],
		8200: [[32], 256],
		8201: [[32], 256],
		8202: [[32], 256],
		8209: [[8208], 256],
		8215: [[32, 819], 256],
		8228: [[46], 256],
		8229: [[46, 46], 256],
		8230: [[46, 46, 46], 256],
		8239: [[32], 256],
		8243: [[8242, 8242], 256],
		8244: [[8242, 8242, 8242], 256],
		8246: [[8245, 8245], 256],
		8247: [[8245, 8245, 8245], 256],
		8252: [[33, 33], 256],
		8254: [[32, 773], 256],
		8263: [[63, 63], 256],
		8264: [[63, 33], 256],
		8265: [[33, 63], 256],
		8279: [[8242, 8242, 8242, 8242], 256],
		8287: [[32], 256],
		8304: [[48], 256],
		8305: [[105], 256],
		8308: [[52], 256],
		8309: [[53], 256],
		8310: [[54], 256],
		8311: [[55], 256],
		8312: [[56], 256],
		8313: [[57], 256],
		8314: [[43], 256],
		8315: [[8722], 256],
		8316: [[61], 256],
		8317: [[40], 256],
		8318: [[41], 256],
		8319: [[110], 256],
		8320: [[48], 256],
		8321: [[49], 256],
		8322: [[50], 256],
		8323: [[51], 256],
		8324: [[52], 256],
		8325: [[53], 256],
		8326: [[54], 256],
		8327: [[55], 256],
		8328: [[56], 256],
		8329: [[57], 256],
		8330: [[43], 256],
		8331: [[8722], 256],
		8332: [[61], 256],
		8333: [[40], 256],
		8334: [[41], 256],
		8336: [[97], 256],
		8337: [[101], 256],
		8338: [[111], 256],
		8339: [[120], 256],
		8340: [[601], 256],
		8341: [[104], 256],
		8342: [[107], 256],
		8343: [[108], 256],
		8344: [[109], 256],
		8345: [[110], 256],
		8346: [[112], 256],
		8347: [[115], 256],
		8348: [[116], 256],
		8360: [[82, 115], 256],
		8400: [, 230],
		8401: [, 230],
		8402: [, 1],
		8403: [, 1],
		8404: [, 230],
		8405: [, 230],
		8406: [, 230],
		8407: [, 230],
		8408: [, 1],
		8409: [, 1],
		8410: [, 1],
		8411: [, 230],
		8412: [, 230],
		8417: [, 230],
		8421: [, 1],
		8422: [, 1],
		8423: [, 230],
		8424: [, 220],
		8425: [, 230],
		8426: [, 1],
		8427: [, 1],
		8428: [, 220],
		8429: [, 220],
		8430: [, 220],
		8431: [, 220],
		8432: [, 230]
	},
	8448: {
		8448: [[97, 47, 99], 256],
		8449: [[97, 47, 115], 256],
		8450: [[67], 256],
		8451: [[176, 67], 256],
		8453: [[99, 47, 111], 256],
		8454: [[99, 47, 117], 256],
		8455: [[400], 256],
		8457: [[176, 70], 256],
		8458: [[103], 256],
		8459: [[72], 256],
		8460: [[72], 256],
		8461: [[72], 256],
		8462: [[104], 256],
		8463: [[295], 256],
		8464: [[73], 256],
		8465: [[73], 256],
		8466: [[76], 256],
		8467: [[108], 256],
		8469: [[78], 256],
		8470: [[78, 111], 256],
		8473: [[80], 256],
		8474: [[81], 256],
		8475: [[82], 256],
		8476: [[82], 256],
		8477: [[82], 256],
		8480: [[83, 77], 256],
		8481: [[84, 69, 76], 256],
		8482: [[84, 77], 256],
		8484: [[90], 256],
		8486: [[937]],
		8488: [[90], 256],
		8490: [[75]],
		8491: [[197]],
		8492: [[66], 256],
		8493: [[67], 256],
		8495: [[101], 256],
		8496: [[69], 256],
		8497: [[70], 256],
		8499: [[77], 256],
		8500: [[111], 256],
		8501: [[1488], 256],
		8502: [[1489], 256],
		8503: [[1490], 256],
		8504: [[1491], 256],
		8505: [[105], 256],
		8507: [[70, 65, 88], 256],
		8508: [[960], 256],
		8509: [[947], 256],
		8510: [[915], 256],
		8511: [[928], 256],
		8512: [[8721], 256],
		8517: [[68], 256],
		8518: [[100], 256],
		8519: [[101], 256],
		8520: [[105], 256],
		8521: [[106], 256],
		8528: [[49, 8260, 55], 256],
		8529: [[49, 8260, 57], 256],
		8530: [[49, 8260, 49, 48], 256],
		8531: [[49, 8260, 51], 256],
		8532: [[50, 8260, 51], 256],
		8533: [[49, 8260, 53], 256],
		8534: [[50, 8260, 53], 256],
		8535: [[51, 8260, 53], 256],
		8536: [[52, 8260, 53], 256],
		8537: [[49, 8260, 54], 256],
		8538: [[53, 8260, 54], 256],
		8539: [[49, 8260, 56], 256],
		8540: [[51, 8260, 56], 256],
		8541: [[53, 8260, 56], 256],
		8542: [[55, 8260, 56], 256],
		8543: [[49, 8260], 256],
		8544: [[73], 256],
		8545: [[73, 73], 256],
		8546: [[73, 73, 73], 256],
		8547: [[73, 86], 256],
		8548: [[86], 256],
		8549: [[86, 73], 256],
		8550: [[86, 73, 73], 256],
		8551: [[86, 73, 73, 73], 256],
		8552: [[73, 88], 256],
		8553: [[88], 256],
		8554: [[88, 73], 256],
		8555: [[88, 73, 73], 256],
		8556: [[76], 256],
		8557: [[67], 256],
		8558: [[68], 256],
		8559: [[77], 256],
		8560: [[105], 256],
		8561: [[105, 105], 256],
		8562: [[105, 105, 105], 256],
		8563: [[105, 118], 256],
		8564: [[118], 256],
		8565: [[118, 105], 256],
		8566: [[118, 105, 105], 256],
		8567: [[118, 105, 105, 105], 256],
		8568: [[105, 120], 256],
		8569: [[120], 256],
		8570: [[120, 105], 256],
		8571: [[120, 105, 105], 256],
		8572: [[108], 256],
		8573: [[99], 256],
		8574: [[100], 256],
		8575: [[109], 256],
		8585: [[48, 8260, 51], 256],
		8592: [, , { 824: 8602 }],
		8594: [, , { 824: 8603 }],
		8596: [, , { 824: 8622 }],
		8602: [[8592, 824]],
		8603: [[8594, 824]],
		8622: [[8596, 824]],
		8653: [[8656, 824]],
		8654: [[8660, 824]],
		8655: [[8658, 824]],
		8656: [, , { 824: 8653 }],
		8658: [, , { 824: 8655 }],
		8660: [, , { 824: 8654 }]
	},
	8704: {
		8707: [, , { 824: 8708 }],
		8708: [[8707, 824]],
		8712: [, , { 824: 8713 }],
		8713: [[8712, 824]],
		8715: [, , { 824: 8716 }],
		8716: [[8715, 824]],
		8739: [, , { 824: 8740 }],
		8740: [[8739, 824]],
		8741: [, , { 824: 8742 }],
		8742: [[8741, 824]],
		8748: [[8747, 8747], 256],
		8749: [[8747, 8747, 8747], 256],
		8751: [[8750, 8750], 256],
		8752: [[8750, 8750, 8750], 256],
		8764: [, , { 824: 8769 }],
		8769: [[8764, 824]],
		8771: [, , { 824: 8772 }],
		8772: [[8771, 824]],
		8773: [, , { 824: 8775 }],
		8775: [[8773, 824]],
		8776: [, , { 824: 8777 }],
		8777: [[8776, 824]],
		8781: [, , { 824: 8813 }],
		8800: [[61, 824]],
		8801: [, , { 824: 8802 }],
		8802: [[8801, 824]],
		8804: [, , { 824: 8816 }],
		8805: [, , { 824: 8817 }],
		8813: [[8781, 824]],
		8814: [[60, 824]],
		8815: [[62, 824]],
		8816: [[8804, 824]],
		8817: [[8805, 824]],
		8818: [, , { 824: 8820 }],
		8819: [, , { 824: 8821 }],
		8820: [[8818, 824]],
		8821: [[8819, 824]],
		8822: [, , { 824: 8824 }],
		8823: [, , { 824: 8825 }],
		8824: [[8822, 824]],
		8825: [[8823, 824]],
		8826: [, , { 824: 8832 }],
		8827: [, , { 824: 8833 }],
		8828: [, , { 824: 8928 }],
		8829: [, , { 824: 8929 }],
		8832: [[8826, 824]],
		8833: [[8827, 824]],
		8834: [, , { 824: 8836 }],
		8835: [, , { 824: 8837 }],
		8836: [[8834, 824]],
		8837: [[8835, 824]],
		8838: [, , { 824: 8840 }],
		8839: [, , { 824: 8841 }],
		8840: [[8838, 824]],
		8841: [[8839, 824]],
		8849: [, , { 824: 8930 }],
		8850: [, , { 824: 8931 }],
		8866: [, , { 824: 8876 }],
		8872: [, , { 824: 8877 }],
		8873: [, , { 824: 8878 }],
		8875: [, , { 824: 8879 }],
		8876: [[8866, 824]],
		8877: [[8872, 824]],
		8878: [[8873, 824]],
		8879: [[8875, 824]],
		8882: [, , { 824: 8938 }],
		8883: [, , { 824: 8939 }],
		8884: [, , { 824: 8940 }],
		8885: [, , { 824: 8941 }],
		8928: [[8828, 824]],
		8929: [[8829, 824]],
		8930: [[8849, 824]],
		8931: [[8850, 824]],
		8938: [[8882, 824]],
		8939: [[8883, 824]],
		8940: [[8884, 824]],
		8941: [[8885, 824]]
	},
	8960: { 9001: [[12296]], 9002: [[12297]] },
	9216: {
		9312: [[49], 256],
		9313: [[50], 256],
		9314: [[51], 256],
		9315: [[52], 256],
		9316: [[53], 256],
		9317: [[54], 256],
		9318: [[55], 256],
		9319: [[56], 256],
		9320: [[57], 256],
		9321: [[49, 48], 256],
		9322: [[49, 49], 256],
		9323: [[49, 50], 256],
		9324: [[49, 51], 256],
		9325: [[49, 52], 256],
		9326: [[49, 53], 256],
		9327: [[49, 54], 256],
		9328: [[49, 55], 256],
		9329: [[49, 56], 256],
		9330: [[49, 57], 256],
		9331: [[50, 48], 256],
		9332: [[40, 49, 41], 256],
		9333: [[40, 50, 41], 256],
		9334: [[40, 51, 41], 256],
		9335: [[40, 52, 41], 256],
		9336: [[40, 53, 41], 256],
		9337: [[40, 54, 41], 256],
		9338: [[40, 55, 41], 256],
		9339: [[40, 56, 41], 256],
		9340: [[40, 57, 41], 256],
		9341: [[40, 49, 48, 41], 256],
		9342: [[40, 49, 49, 41], 256],
		9343: [[40, 49, 50, 41], 256],
		9344: [[40, 49, 51, 41], 256],
		9345: [[40, 49, 52, 41], 256],
		9346: [[40, 49, 53, 41], 256],
		9347: [[40, 49, 54, 41], 256],
		9348: [[40, 49, 55, 41], 256],
		9349: [[40, 49, 56, 41], 256],
		9350: [[40, 49, 57, 41], 256],
		9351: [[40, 50, 48, 41], 256],
		9352: [[49, 46], 256],
		9353: [[50, 46], 256],
		9354: [[51, 46], 256],
		9355: [[52, 46], 256],
		9356: [[53, 46], 256],
		9357: [[54, 46], 256],
		9358: [[55, 46], 256],
		9359: [[56, 46], 256],
		9360: [[57, 46], 256],
		9361: [[49, 48, 46], 256],
		9362: [[49, 49, 46], 256],
		9363: [[49, 50, 46], 256],
		9364: [[49, 51, 46], 256],
		9365: [[49, 52, 46], 256],
		9366: [[49, 53, 46], 256],
		9367: [[49, 54, 46], 256],
		9368: [[49, 55, 46], 256],
		9369: [[49, 56, 46], 256],
		9370: [[49, 57, 46], 256],
		9371: [[50, 48, 46], 256],
		9372: [[40, 97, 41], 256],
		9373: [[40, 98, 41], 256],
		9374: [[40, 99, 41], 256],
		9375: [[40, 100, 41], 256],
		9376: [[40, 101, 41], 256],
		9377: [[40, 102, 41], 256],
		9378: [[40, 103, 41], 256],
		9379: [[40, 104, 41], 256],
		9380: [[40, 105, 41], 256],
		9381: [[40, 106, 41], 256],
		9382: [[40, 107, 41], 256],
		9383: [[40, 108, 41], 256],
		9384: [[40, 109, 41], 256],
		9385: [[40, 110, 41], 256],
		9386: [[40, 111, 41], 256],
		9387: [[40, 112, 41], 256],
		9388: [[40, 113, 41], 256],
		9389: [[40, 114, 41], 256],
		9390: [[40, 115, 41], 256],
		9391: [[40, 116, 41], 256],
		9392: [[40, 117, 41], 256],
		9393: [[40, 118, 41], 256],
		9394: [[40, 119, 41], 256],
		9395: [[40, 120, 41], 256],
		9396: [[40, 121, 41], 256],
		9397: [[40, 122, 41], 256],
		9398: [[65], 256],
		9399: [[66], 256],
		9400: [[67], 256],
		9401: [[68], 256],
		9402: [[69], 256],
		9403: [[70], 256],
		9404: [[71], 256],
		9405: [[72], 256],
		9406: [[73], 256],
		9407: [[74], 256],
		9408: [[75], 256],
		9409: [[76], 256],
		9410: [[77], 256],
		9411: [[78], 256],
		9412: [[79], 256],
		9413: [[80], 256],
		9414: [[81], 256],
		9415: [[82], 256],
		9416: [[83], 256],
		9417: [[84], 256],
		9418: [[85], 256],
		9419: [[86], 256],
		9420: [[87], 256],
		9421: [[88], 256],
		9422: [[89], 256],
		9423: [[90], 256],
		9424: [[97], 256],
		9425: [[98], 256],
		9426: [[99], 256],
		9427: [[100], 256],
		9428: [[101], 256],
		9429: [[102], 256],
		9430: [[103], 256],
		9431: [[104], 256],
		9432: [[105], 256],
		9433: [[106], 256],
		9434: [[107], 256],
		9435: [[108], 256],
		9436: [[109], 256],
		9437: [[110], 256],
		9438: [[111], 256],
		9439: [[112], 256],
		9440: [[113], 256],
		9441: [[114], 256],
		9442: [[115], 256],
		9443: [[116], 256],
		9444: [[117], 256],
		9445: [[118], 256],
		9446: [[119], 256],
		9447: [[120], 256],
		9448: [[121], 256],
		9449: [[122], 256],
		9450: [[48], 256]
	},
	10752: {
		10764: [[8747, 8747, 8747, 8747], 256],
		10868: [[58, 58, 61], 256],
		10869: [[61, 61], 256],
		10870: [[61, 61, 61], 256],
		10972: [[10973, 824], 512]
	},
	11264: {
		11388: [[106], 256],
		11389: [[86], 256],
		11503: [, 230],
		11504: [, 230],
		11505: [, 230]
	},
	11520: {
		11631: [[11617], 256],
		11647: [, 9],
		11744: [, 230],
		11745: [, 230],
		11746: [, 230],
		11747: [, 230],
		11748: [, 230],
		11749: [, 230],
		11750: [, 230],
		11751: [, 230],
		11752: [, 230],
		11753: [, 230],
		11754: [, 230],
		11755: [, 230],
		11756: [, 230],
		11757: [, 230],
		11758: [, 230],
		11759: [, 230],
		11760: [, 230],
		11761: [, 230],
		11762: [, 230],
		11763: [, 230],
		11764: [, 230],
		11765: [, 230],
		11766: [, 230],
		11767: [, 230],
		11768: [, 230],
		11769: [, 230],
		11770: [, 230],
		11771: [, 230],
		11772: [, 230],
		11773: [, 230],
		11774: [, 230],
		11775: [, 230]
	},
	11776: { 11935: [[27597], 256], 12019: [[40863], 256] },
	12032: {
		12032: [[19968], 256],
		12033: [[20008], 256],
		12034: [[20022], 256],
		12035: [[20031], 256],
		12036: [[20057], 256],
		12037: [[20101], 256],
		12038: [[20108], 256],
		12039: [[20128], 256],
		12040: [[20154], 256],
		12041: [[20799], 256],
		12042: [[20837], 256],
		12043: [[20843], 256],
		12044: [[20866], 256],
		12045: [[20886], 256],
		12046: [[20907], 256],
		12047: [[20960], 256],
		12048: [[20981], 256],
		12049: [[20992], 256],
		12050: [[21147], 256],
		12051: [[21241], 256],
		12052: [[21269], 256],
		12053: [[21274], 256],
		12054: [[21304], 256],
		12055: [[21313], 256],
		12056: [[21340], 256],
		12057: [[21353], 256],
		12058: [[21378], 256],
		12059: [[21430], 256],
		12060: [[21448], 256],
		12061: [[21475], 256],
		12062: [[22231], 256],
		12063: [[22303], 256],
		12064: [[22763], 256],
		12065: [[22786], 256],
		12066: [[22794], 256],
		12067: [[22805], 256],
		12068: [[22823], 256],
		12069: [[22899], 256],
		12070: [[23376], 256],
		12071: [[23424], 256],
		12072: [[23544], 256],
		12073: [[23567], 256],
		12074: [[23586], 256],
		12075: [[23608], 256],
		12076: [[23662], 256],
		12077: [[23665], 256],
		12078: [[24027], 256],
		12079: [[24037], 256],
		12080: [[24049], 256],
		12081: [[24062], 256],
		12082: [[24178], 256],
		12083: [[24186], 256],
		12084: [[24191], 256],
		12085: [[24308], 256],
		12086: [[24318], 256],
		12087: [[24331], 256],
		12088: [[24339], 256],
		12089: [[24400], 256],
		12090: [[24417], 256],
		12091: [[24435], 256],
		12092: [[24515], 256],
		12093: [[25096], 256],
		12094: [[25142], 256],
		12095: [[25163], 256],
		12096: [[25903], 256],
		12097: [[25908], 256],
		12098: [[25991], 256],
		12099: [[26007], 256],
		12100: [[26020], 256],
		12101: [[26041], 256],
		12102: [[26080], 256],
		12103: [[26085], 256],
		12104: [[26352], 256],
		12105: [[26376], 256],
		12106: [[26408], 256],
		12107: [[27424], 256],
		12108: [[27490], 256],
		12109: [[27513], 256],
		12110: [[27571], 256],
		12111: [[27595], 256],
		12112: [[27604], 256],
		12113: [[27611], 256],
		12114: [[27663], 256],
		12115: [[27668], 256],
		12116: [[27700], 256],
		12117: [[28779], 256],
		12118: [[29226], 256],
		12119: [[29238], 256],
		12120: [[29243], 256],
		12121: [[29247], 256],
		12122: [[29255], 256],
		12123: [[29273], 256],
		12124: [[29275], 256],
		12125: [[29356], 256],
		12126: [[29572], 256],
		12127: [[29577], 256],
		12128: [[29916], 256],
		12129: [[29926], 256],
		12130: [[29976], 256],
		12131: [[29983], 256],
		12132: [[29992], 256],
		12133: [[30000], 256],
		12134: [[30091], 256],
		12135: [[30098], 256],
		12136: [[30326], 256],
		12137: [[30333], 256],
		12138: [[30382], 256],
		12139: [[30399], 256],
		12140: [[30446], 256],
		12141: [[30683], 256],
		12142: [[30690], 256],
		12143: [[30707], 256],
		12144: [[31034], 256],
		12145: [[31160], 256],
		12146: [[31166], 256],
		12147: [[31348], 256],
		12148: [[31435], 256],
		12149: [[31481], 256],
		12150: [[31859], 256],
		12151: [[31992], 256],
		12152: [[32566], 256],
		12153: [[32593], 256],
		12154: [[32650], 256],
		12155: [[32701], 256],
		12156: [[32769], 256],
		12157: [[32780], 256],
		12158: [[32786], 256],
		12159: [[32819], 256],
		12160: [[32895], 256],
		12161: [[32905], 256],
		12162: [[33251], 256],
		12163: [[33258], 256],
		12164: [[33267], 256],
		12165: [[33276], 256],
		12166: [[33292], 256],
		12167: [[33307], 256],
		12168: [[33311], 256],
		12169: [[33390], 256],
		12170: [[33394], 256],
		12171: [[33400], 256],
		12172: [[34381], 256],
		12173: [[34411], 256],
		12174: [[34880], 256],
		12175: [[34892], 256],
		12176: [[34915], 256],
		12177: [[35198], 256],
		12178: [[35211], 256],
		12179: [[35282], 256],
		12180: [[35328], 256],
		12181: [[35895], 256],
		12182: [[35910], 256],
		12183: [[35925], 256],
		12184: [[35960], 256],
		12185: [[35997], 256],
		12186: [[36196], 256],
		12187: [[36208], 256],
		12188: [[36275], 256],
		12189: [[36523], 256],
		12190: [[36554], 256],
		12191: [[36763], 256],
		12192: [[36784], 256],
		12193: [[36789], 256],
		12194: [[37009], 256],
		12195: [[37193], 256],
		12196: [[37318], 256],
		12197: [[37324], 256],
		12198: [[37329], 256],
		12199: [[38263], 256],
		12200: [[38272], 256],
		12201: [[38428], 256],
		12202: [[38582], 256],
		12203: [[38585], 256],
		12204: [[38632], 256],
		12205: [[38737], 256],
		12206: [[38750], 256],
		12207: [[38754], 256],
		12208: [[38761], 256],
		12209: [[38859], 256],
		12210: [[38893], 256],
		12211: [[38899], 256],
		12212: [[38913], 256],
		12213: [[39080], 256],
		12214: [[39131], 256],
		12215: [[39135], 256],
		12216: [[39318], 256],
		12217: [[39321], 256],
		12218: [[39340], 256],
		12219: [[39592], 256],
		12220: [[39640], 256],
		12221: [[39647], 256],
		12222: [[39717], 256],
		12223: [[39727], 256],
		12224: [[39730], 256],
		12225: [[39740], 256],
		12226: [[39770], 256],
		12227: [[40165], 256],
		12228: [[40565], 256],
		12229: [[40575], 256],
		12230: [[40613], 256],
		12231: [[40635], 256],
		12232: [[40643], 256],
		12233: [[40653], 256],
		12234: [[40657], 256],
		12235: [[40697], 256],
		12236: [[40701], 256],
		12237: [[40718], 256],
		12238: [[40723], 256],
		12239: [[40736], 256],
		12240: [[40763], 256],
		12241: [[40778], 256],
		12242: [[40786], 256],
		12243: [[40845], 256],
		12244: [[40860], 256],
		12245: [[40864], 256]
	},
	12288: {
		12288: [[32], 256],
		12330: [, 218],
		12331: [, 228],
		12332: [, 232],
		12333: [, 222],
		12334: [, 224],
		12335: [, 224],
		12342: [[12306], 256],
		12344: [[21313], 256],
		12345: [[21316], 256],
		12346: [[21317], 256],
		12358: [, , { 12441: 12436 }],
		12363: [, , { 12441: 12364 }],
		12364: [[12363, 12441]],
		12365: [, , { 12441: 12366 }],
		12366: [[12365, 12441]],
		12367: [, , { 12441: 12368 }],
		12368: [[12367, 12441]],
		12369: [, , { 12441: 12370 }],
		12370: [[12369, 12441]],
		12371: [, , { 12441: 12372 }],
		12372: [[12371, 12441]],
		12373: [, , { 12441: 12374 }],
		12374: [[12373, 12441]],
		12375: [, , { 12441: 12376 }],
		12376: [[12375, 12441]],
		12377: [, , { 12441: 12378 }],
		12378: [[12377, 12441]],
		12379: [, , { 12441: 12380 }],
		12380: [[12379, 12441]],
		12381: [, , { 12441: 12382 }],
		12382: [[12381, 12441]],
		12383: [, , { 12441: 12384 }],
		12384: [[12383, 12441]],
		12385: [, , { 12441: 12386 }],
		12386: [[12385, 12441]],
		12388: [, , { 12441: 12389 }],
		12389: [[12388, 12441]],
		12390: [, , { 12441: 12391 }],
		12391: [[12390, 12441]],
		12392: [, , { 12441: 12393 }],
		12393: [[12392, 12441]],
		12399: [, , { 12441: 12400, 12442: 12401 }],
		12400: [[12399, 12441]],
		12401: [[12399, 12442]],
		12402: [, , { 12441: 12403, 12442: 12404 }],
		12403: [[12402, 12441]],
		12404: [[12402, 12442]],
		12405: [, , { 12441: 12406, 12442: 12407 }],
		12406: [[12405, 12441]],
		12407: [[12405, 12442]],
		12408: [, , { 12441: 12409, 12442: 12410 }],
		12409: [[12408, 12441]],
		12410: [[12408, 12442]],
		12411: [, , { 12441: 12412, 12442: 12413 }],
		12412: [[12411, 12441]],
		12413: [[12411, 12442]],
		12436: [[12358, 12441]],
		12441: [, 8],
		12442: [, 8],
		12443: [[32, 12441], 256],
		12444: [[32, 12442], 256],
		12445: [, , { 12441: 12446 }],
		12446: [[12445, 12441]],
		12447: [[12424, 12426], 256],
		12454: [, , { 12441: 12532 }],
		12459: [, , { 12441: 12460 }],
		12460: [[12459, 12441]],
		12461: [, , { 12441: 12462 }],
		12462: [[12461, 12441]],
		12463: [, , { 12441: 12464 }],
		12464: [[12463, 12441]],
		12465: [, , { 12441: 12466 }],
		12466: [[12465, 12441]],
		12467: [, , { 12441: 12468 }],
		12468: [[12467, 12441]],
		12469: [, , { 12441: 12470 }],
		12470: [[12469, 12441]],
		12471: [, , { 12441: 12472 }],
		12472: [[12471, 12441]],
		12473: [, , { 12441: 12474 }],
		12474: [[12473, 12441]],
		12475: [, , { 12441: 12476 }],
		12476: [[12475, 12441]],
		12477: [, , { 12441: 12478 }],
		12478: [[12477, 12441]],
		12479: [, , { 12441: 12480 }],
		12480: [[12479, 12441]],
		12481: [, , { 12441: 12482 }],
		12482: [[12481, 12441]],
		12484: [, , { 12441: 12485 }],
		12485: [[12484, 12441]],
		12486: [, , { 12441: 12487 }],
		12487: [[12486, 12441]],
		12488: [, , { 12441: 12489 }],
		12489: [[12488, 12441]],
		12495: [, , { 12441: 12496, 12442: 12497 }],
		12496: [[12495, 12441]],
		12497: [[12495, 12442]],
		12498: [, , { 12441: 12499, 12442: 12500 }],
		12499: [[12498, 12441]],
		12500: [[12498, 12442]],
		12501: [, , { 12441: 12502, 12442: 12503 }],
		12502: [[12501, 12441]],
		12503: [[12501, 12442]],
		12504: [, , { 12441: 12505, 12442: 12506 }],
		12505: [[12504, 12441]],
		12506: [[12504, 12442]],
		12507: [, , { 12441: 12508, 12442: 12509 }],
		12508: [[12507, 12441]],
		12509: [[12507, 12442]],
		12527: [, , { 12441: 12535 }],
		12528: [, , { 12441: 12536 }],
		12529: [, , { 12441: 12537 }],
		12530: [, , { 12441: 12538 }],
		12532: [[12454, 12441]],
		12535: [[12527, 12441]],
		12536: [[12528, 12441]],
		12537: [[12529, 12441]],
		12538: [[12530, 12441]],
		12541: [, , { 12441: 12542 }],
		12542: [[12541, 12441]],
		12543: [[12467, 12488], 256]
	},
	12544: {
		12593: [[4352], 256],
		12594: [[4353], 256],
		12595: [[4522], 256],
		12596: [[4354], 256],
		12597: [[4524], 256],
		12598: [[4525], 256],
		12599: [[4355], 256],
		12600: [[4356], 256],
		12601: [[4357], 256],
		12602: [[4528], 256],
		12603: [[4529], 256],
		12604: [[4530], 256],
		12605: [[4531], 256],
		12606: [[4532], 256],
		12607: [[4533], 256],
		12608: [[4378], 256],
		12609: [[4358], 256],
		12610: [[4359], 256],
		12611: [[4360], 256],
		12612: [[4385], 256],
		12613: [[4361], 256],
		12614: [[4362], 256],
		12615: [[4363], 256],
		12616: [[4364], 256],
		12617: [[4365], 256],
		12618: [[4366], 256],
		12619: [[4367], 256],
		12620: [[4368], 256],
		12621: [[4369], 256],
		12622: [[4370], 256],
		12623: [[4449], 256],
		12624: [[4450], 256],
		12625: [[4451], 256],
		12626: [[4452], 256],
		12627: [[4453], 256],
		12628: [[4454], 256],
		12629: [[4455], 256],
		12630: [[4456], 256],
		12631: [[4457], 256],
		12632: [[4458], 256],
		12633: [[4459], 256],
		12634: [[4460], 256],
		12635: [[4461], 256],
		12636: [[4462], 256],
		12637: [[4463], 256],
		12638: [[4464], 256],
		12639: [[4465], 256],
		12640: [[4466], 256],
		12641: [[4467], 256],
		12642: [[4468], 256],
		12643: [[4469], 256],
		12644: [[4448], 256],
		12645: [[4372], 256],
		12646: [[4373], 256],
		12647: [[4551], 256],
		12648: [[4552], 256],
		12649: [[4556], 256],
		12650: [[4558], 256],
		12651: [[4563], 256],
		12652: [[4567], 256],
		12653: [[4569], 256],
		12654: [[4380], 256],
		12655: [[4573], 256],
		12656: [[4575], 256],
		12657: [[4381], 256],
		12658: [[4382], 256],
		12659: [[4384], 256],
		12660: [[4386], 256],
		12661: [[4387], 256],
		12662: [[4391], 256],
		12663: [[4393], 256],
		12664: [[4395], 256],
		12665: [[4396], 256],
		12666: [[4397], 256],
		12667: [[4398], 256],
		12668: [[4399], 256],
		12669: [[4402], 256],
		12670: [[4406], 256],
		12671: [[4416], 256],
		12672: [[4423], 256],
		12673: [[4428], 256],
		12674: [[4593], 256],
		12675: [[4594], 256],
		12676: [[4439], 256],
		12677: [[4440], 256],
		12678: [[4441], 256],
		12679: [[4484], 256],
		12680: [[4485], 256],
		12681: [[4488], 256],
		12682: [[4497], 256],
		12683: [[4498], 256],
		12684: [[4500], 256],
		12685: [[4510], 256],
		12686: [[4513], 256],
		12690: [[19968], 256],
		12691: [[20108], 256],
		12692: [[19977], 256],
		12693: [[22235], 256],
		12694: [[19978], 256],
		12695: [[20013], 256],
		12696: [[19979], 256],
		12697: [[30002], 256],
		12698: [[20057], 256],
		12699: [[19993], 256],
		12700: [[19969], 256],
		12701: [[22825], 256],
		12702: [[22320], 256],
		12703: [[20154], 256]
	},
	12800: {
		12800: [[40, 4352, 41], 256],
		12801: [[40, 4354, 41], 256],
		12802: [[40, 4355, 41], 256],
		12803: [[40, 4357, 41], 256],
		12804: [[40, 4358, 41], 256],
		12805: [[40, 4359, 41], 256],
		12806: [[40, 4361, 41], 256],
		12807: [[40, 4363, 41], 256],
		12808: [[40, 4364, 41], 256],
		12809: [[40, 4366, 41], 256],
		12810: [[40, 4367, 41], 256],
		12811: [[40, 4368, 41], 256],
		12812: [[40, 4369, 41], 256],
		12813: [[40, 4370, 41], 256],
		12814: [[40, 4352, 4449, 41], 256],
		12815: [[40, 4354, 4449, 41], 256],
		12816: [[40, 4355, 4449, 41], 256],
		12817: [[40, 4357, 4449, 41], 256],
		12818: [[40, 4358, 4449, 41], 256],
		12819: [[40, 4359, 4449, 41], 256],
		12820: [[40, 4361, 4449, 41], 256],
		12821: [[40, 4363, 4449, 41], 256],
		12822: [[40, 4364, 4449, 41], 256],
		12823: [[40, 4366, 4449, 41], 256],
		12824: [[40, 4367, 4449, 41], 256],
		12825: [[40, 4368, 4449, 41], 256],
		12826: [[40, 4369, 4449, 41], 256],
		12827: [[40, 4370, 4449, 41], 256],
		12828: [[40, 4364, 4462, 41], 256],
		12829: [[40, 4363, 4457, 4364, 4453, 4523, 41], 256],
		12830: [[40, 4363, 4457, 4370, 4462, 41], 256],
		12832: [[40, 19968, 41], 256],
		12833: [[40, 20108, 41], 256],
		12834: [[40, 19977, 41], 256],
		12835: [[40, 22235, 41], 256],
		12836: [[40, 20116, 41], 256],
		12837: [[40, 20845, 41], 256],
		12838: [[40, 19971, 41], 256],
		12839: [[40, 20843, 41], 256],
		12840: [[40, 20061, 41], 256],
		12841: [[40, 21313, 41], 256],
		12842: [[40, 26376, 41], 256],
		12843: [[40, 28779, 41], 256],
		12844: [[40, 27700, 41], 256],
		12845: [[40, 26408, 41], 256],
		12846: [[40, 37329, 41], 256],
		12847: [[40, 22303, 41], 256],
		12848: [[40, 26085, 41], 256],
		12849: [[40, 26666, 41], 256],
		12850: [[40, 26377, 41], 256],
		12851: [[40, 31038, 41], 256],
		12852: [[40, 21517, 41], 256],
		12853: [[40, 29305, 41], 256],
		12854: [[40, 36001, 41], 256],
		12855: [[40, 31069, 41], 256],
		12856: [[40, 21172, 41], 256],
		12857: [[40, 20195, 41], 256],
		12858: [[40, 21628, 41], 256],
		12859: [[40, 23398, 41], 256],
		12860: [[40, 30435, 41], 256],
		12861: [[40, 20225, 41], 256],
		12862: [[40, 36039, 41], 256],
		12863: [[40, 21332, 41], 256],
		12864: [[40, 31085, 41], 256],
		12865: [[40, 20241, 41], 256],
		12866: [[40, 33258, 41], 256],
		12867: [[40, 33267, 41], 256],
		12868: [[21839], 256],
		12869: [[24188], 256],
		12870: [[25991], 256],
		12871: [[31631], 256],
		12880: [[80, 84, 69], 256],
		12881: [[50, 49], 256],
		12882: [[50, 50], 256],
		12883: [[50, 51], 256],
		12884: [[50, 52], 256],
		12885: [[50, 53], 256],
		12886: [[50, 54], 256],
		12887: [[50, 55], 256],
		12888: [[50, 56], 256],
		12889: [[50, 57], 256],
		12890: [[51, 48], 256],
		12891: [[51, 49], 256],
		12892: [[51, 50], 256],
		12893: [[51, 51], 256],
		12894: [[51, 52], 256],
		12895: [[51, 53], 256],
		12896: [[4352], 256],
		12897: [[4354], 256],
		12898: [[4355], 256],
		12899: [[4357], 256],
		12900: [[4358], 256],
		12901: [[4359], 256],
		12902: [[4361], 256],
		12903: [[4363], 256],
		12904: [[4364], 256],
		12905: [[4366], 256],
		12906: [[4367], 256],
		12907: [[4368], 256],
		12908: [[4369], 256],
		12909: [[4370], 256],
		12910: [[4352, 4449], 256],
		12911: [[4354, 4449], 256],
		12912: [[4355, 4449], 256],
		12913: [[4357, 4449], 256],
		12914: [[4358, 4449], 256],
		12915: [[4359, 4449], 256],
		12916: [[4361, 4449], 256],
		12917: [[4363, 4449], 256],
		12918: [[4364, 4449], 256],
		12919: [[4366, 4449], 256],
		12920: [[4367, 4449], 256],
		12921: [[4368, 4449], 256],
		12922: [[4369, 4449], 256],
		12923: [[4370, 4449], 256],
		12924: [[4366, 4449, 4535, 4352, 4457], 256],
		12925: [[4364, 4462, 4363, 4468], 256],
		12926: [[4363, 4462], 256],
		12928: [[19968], 256],
		12929: [[20108], 256],
		12930: [[19977], 256],
		12931: [[22235], 256],
		12932: [[20116], 256],
		12933: [[20845], 256],
		12934: [[19971], 256],
		12935: [[20843], 256],
		12936: [[20061], 256],
		12937: [[21313], 256],
		12938: [[26376], 256],
		12939: [[28779], 256],
		12940: [[27700], 256],
		12941: [[26408], 256],
		12942: [[37329], 256],
		12943: [[22303], 256],
		12944: [[26085], 256],
		12945: [[26666], 256],
		12946: [[26377], 256],
		12947: [[31038], 256],
		12948: [[21517], 256],
		12949: [[29305], 256],
		12950: [[36001], 256],
		12951: [[31069], 256],
		12952: [[21172], 256],
		12953: [[31192], 256],
		12954: [[30007], 256],
		12955: [[22899], 256],
		12956: [[36969], 256],
		12957: [[20778], 256],
		12958: [[21360], 256],
		12959: [[27880], 256],
		12960: [[38917], 256],
		12961: [[20241], 256],
		12962: [[20889], 256],
		12963: [[27491], 256],
		12964: [[19978], 256],
		12965: [[20013], 256],
		12966: [[19979], 256],
		12967: [[24038], 256],
		12968: [[21491], 256],
		12969: [[21307], 256],
		12970: [[23447], 256],
		12971: [[23398], 256],
		12972: [[30435], 256],
		12973: [[20225], 256],
		12974: [[36039], 256],
		12975: [[21332], 256],
		12976: [[22812], 256],
		12977: [[51, 54], 256],
		12978: [[51, 55], 256],
		12979: [[51, 56], 256],
		12980: [[51, 57], 256],
		12981: [[52, 48], 256],
		12982: [[52, 49], 256],
		12983: [[52, 50], 256],
		12984: [[52, 51], 256],
		12985: [[52, 52], 256],
		12986: [[52, 53], 256],
		12987: [[52, 54], 256],
		12988: [[52, 55], 256],
		12989: [[52, 56], 256],
		12990: [[52, 57], 256],
		12991: [[53, 48], 256],
		12992: [[49, 26376], 256],
		12993: [[50, 26376], 256],
		12994: [[51, 26376], 256],
		12995: [[52, 26376], 256],
		12996: [[53, 26376], 256],
		12997: [[54, 26376], 256],
		12998: [[55, 26376], 256],
		12999: [[56, 26376], 256],
		13000: [[57, 26376], 256],
		13001: [[49, 48, 26376], 256],
		13002: [[49, 49, 26376], 256],
		13003: [[49, 50, 26376], 256],
		13004: [[72, 103], 256],
		13005: [[101, 114, 103], 256],
		13006: [[101, 86], 256],
		13007: [[76, 84, 68], 256],
		13008: [[12450], 256],
		13009: [[12452], 256],
		13010: [[12454], 256],
		13011: [[12456], 256],
		13012: [[12458], 256],
		13013: [[12459], 256],
		13014: [[12461], 256],
		13015: [[12463], 256],
		13016: [[12465], 256],
		13017: [[12467], 256],
		13018: [[12469], 256],
		13019: [[12471], 256],
		13020: [[12473], 256],
		13021: [[12475], 256],
		13022: [[12477], 256],
		13023: [[12479], 256],
		13024: [[12481], 256],
		13025: [[12484], 256],
		13026: [[12486], 256],
		13027: [[12488], 256],
		13028: [[12490], 256],
		13029: [[12491], 256],
		13030: [[12492], 256],
		13031: [[12493], 256],
		13032: [[12494], 256],
		13033: [[12495], 256],
		13034: [[12498], 256],
		13035: [[12501], 256],
		13036: [[12504], 256],
		13037: [[12507], 256],
		13038: [[12510], 256],
		13039: [[12511], 256],
		13040: [[12512], 256],
		13041: [[12513], 256],
		13042: [[12514], 256],
		13043: [[12516], 256],
		13044: [[12518], 256],
		13045: [[12520], 256],
		13046: [[12521], 256],
		13047: [[12522], 256],
		13048: [[12523], 256],
		13049: [[12524], 256],
		13050: [[12525], 256],
		13051: [[12527], 256],
		13052: [[12528], 256],
		13053: [[12529], 256],
		13054: [[12530], 256]
	},
	13056: {
		13056: [[12450, 12497, 12540, 12488], 256],
		13057: [[12450, 12523, 12501, 12449], 256],
		13058: [[12450, 12531, 12506, 12450], 256],
		13059: [[12450, 12540, 12523], 256],
		13060: [[12452, 12491, 12531, 12464], 256],
		13061: [[12452, 12531, 12481], 256],
		13062: [[12454, 12457, 12531], 256],
		13063: [[12456, 12473, 12463, 12540, 12489], 256],
		13064: [[12456, 12540, 12459, 12540], 256],
		13065: [[12458, 12531, 12473], 256],
		13066: [[12458, 12540, 12512], 256],
		13067: [[12459, 12452, 12522], 256],
		13068: [[12459, 12521, 12483, 12488], 256],
		13069: [[12459, 12525, 12522, 12540], 256],
		13070: [[12460, 12525, 12531], 256],
		13071: [[12460, 12531, 12510], 256],
		13072: [[12462, 12460], 256],
		13073: [[12462, 12491, 12540], 256],
		13074: [[12461, 12517, 12522, 12540], 256],
		13075: [[12462, 12523, 12480, 12540], 256],
		13076: [[12461, 12525], 256],
		13077: [[12461, 12525, 12464, 12521, 12512], 256],
		13078: [[12461, 12525, 12513, 12540, 12488, 12523], 256],
		13079: [[12461, 12525, 12527, 12483, 12488], 256],
		13080: [[12464, 12521, 12512], 256],
		13081: [[12464, 12521, 12512, 12488, 12531], 256],
		13082: [[12463, 12523, 12476, 12452, 12525], 256],
		13083: [[12463, 12525, 12540, 12493], 256],
		13084: [[12465, 12540, 12473], 256],
		13085: [[12467, 12523, 12490], 256],
		13086: [[12467, 12540, 12509], 256],
		13087: [[12469, 12452, 12463, 12523], 256],
		13088: [[12469, 12531, 12481, 12540, 12512], 256],
		13089: [[12471, 12522, 12531, 12464], 256],
		13090: [[12475, 12531, 12481], 256],
		13091: [[12475, 12531, 12488], 256],
		13092: [[12480, 12540, 12473], 256],
		13093: [[12487, 12471], 256],
		13094: [[12489, 12523], 256],
		13095: [[12488, 12531], 256],
		13096: [[12490, 12494], 256],
		13097: [[12494, 12483, 12488], 256],
		13098: [[12495, 12452, 12484], 256],
		13099: [[12497, 12540, 12475, 12531, 12488], 256],
		13100: [[12497, 12540, 12484], 256],
		13101: [[12496, 12540, 12524, 12523], 256],
		13102: [[12500, 12450, 12473, 12488, 12523], 256],
		13103: [[12500, 12463, 12523], 256],
		13104: [[12500, 12467], 256],
		13105: [[12499, 12523], 256],
		13106: [[12501, 12449, 12521, 12483, 12489], 256],
		13107: [[12501, 12451, 12540, 12488], 256],
		13108: [[12502, 12483, 12471, 12455, 12523], 256],
		13109: [[12501, 12521, 12531], 256],
		13110: [[12504, 12463, 12479, 12540, 12523], 256],
		13111: [[12506, 12477], 256],
		13112: [[12506, 12491, 12498], 256],
		13113: [[12504, 12523, 12484], 256],
		13114: [[12506, 12531, 12473], 256],
		13115: [[12506, 12540, 12472], 256],
		13116: [[12505, 12540, 12479], 256],
		13117: [[12509, 12452, 12531, 12488], 256],
		13118: [[12508, 12523, 12488], 256],
		13119: [[12507, 12531], 256],
		13120: [[12509, 12531, 12489], 256],
		13121: [[12507, 12540, 12523], 256],
		13122: [[12507, 12540, 12531], 256],
		13123: [[12510, 12452, 12463, 12525], 256],
		13124: [[12510, 12452, 12523], 256],
		13125: [[12510, 12483, 12495], 256],
		13126: [[12510, 12523, 12463], 256],
		13127: [[12510, 12531, 12471, 12519, 12531], 256],
		13128: [[12511, 12463, 12525, 12531], 256],
		13129: [[12511, 12522], 256],
		13130: [[12511, 12522, 12496, 12540, 12523], 256],
		13131: [[12513, 12460], 256],
		13132: [[12513, 12460, 12488, 12531], 256],
		13133: [[12513, 12540, 12488, 12523], 256],
		13134: [[12516, 12540, 12489], 256],
		13135: [[12516, 12540, 12523], 256],
		13136: [[12518, 12450, 12531], 256],
		13137: [[12522, 12483, 12488, 12523], 256],
		13138: [[12522, 12521], 256],
		13139: [[12523, 12500, 12540], 256],
		13140: [[12523, 12540, 12502, 12523], 256],
		13141: [[12524, 12512], 256],
		13142: [[12524, 12531, 12488, 12466, 12531], 256],
		13143: [[12527, 12483, 12488], 256],
		13144: [[48, 28857], 256],
		13145: [[49, 28857], 256],
		13146: [[50, 28857], 256],
		13147: [[51, 28857], 256],
		13148: [[52, 28857], 256],
		13149: [[53, 28857], 256],
		13150: [[54, 28857], 256],
		13151: [[55, 28857], 256],
		13152: [[56, 28857], 256],
		13153: [[57, 28857], 256],
		13154: [[49, 48, 28857], 256],
		13155: [[49, 49, 28857], 256],
		13156: [[49, 50, 28857], 256],
		13157: [[49, 51, 28857], 256],
		13158: [[49, 52, 28857], 256],
		13159: [[49, 53, 28857], 256],
		13160: [[49, 54, 28857], 256],
		13161: [[49, 55, 28857], 256],
		13162: [[49, 56, 28857], 256],
		13163: [[49, 57, 28857], 256],
		13164: [[50, 48, 28857], 256],
		13165: [[50, 49, 28857], 256],
		13166: [[50, 50, 28857], 256],
		13167: [[50, 51, 28857], 256],
		13168: [[50, 52, 28857], 256],
		13169: [[104, 80, 97], 256],
		13170: [[100, 97], 256],
		13171: [[65, 85], 256],
		13172: [[98, 97, 114], 256],
		13173: [[111, 86], 256],
		13174: [[112, 99], 256],
		13175: [[100, 109], 256],
		13176: [[100, 109, 178], 256],
		13177: [[100, 109, 179], 256],
		13178: [[73, 85], 256],
		13179: [[24179, 25104], 256],
		13180: [[26157, 21644], 256],
		13181: [[22823, 27491], 256],
		13182: [[26126, 27835], 256],
		13183: [[26666, 24335, 20250, 31038], 256],
		13184: [[112, 65], 256],
		13185: [[110, 65], 256],
		13186: [[956, 65], 256],
		13187: [[109, 65], 256],
		13188: [[107, 65], 256],
		13189: [[75, 66], 256],
		13190: [[77, 66], 256],
		13191: [[71, 66], 256],
		13192: [[99, 97, 108], 256],
		13193: [[107, 99, 97, 108], 256],
		13194: [[112, 70], 256],
		13195: [[110, 70], 256],
		13196: [[956, 70], 256],
		13197: [[956, 103], 256],
		13198: [[109, 103], 256],
		13199: [[107, 103], 256],
		13200: [[72, 122], 256],
		13201: [[107, 72, 122], 256],
		13202: [[77, 72, 122], 256],
		13203: [[71, 72, 122], 256],
		13204: [[84, 72, 122], 256],
		13205: [[956, 8467], 256],
		13206: [[109, 8467], 256],
		13207: [[100, 8467], 256],
		13208: [[107, 8467], 256],
		13209: [[102, 109], 256],
		13210: [[110, 109], 256],
		13211: [[956, 109], 256],
		13212: [[109, 109], 256],
		13213: [[99, 109], 256],
		13214: [[107, 109], 256],
		13215: [[109, 109, 178], 256],
		13216: [[99, 109, 178], 256],
		13217: [[109, 178], 256],
		13218: [[107, 109, 178], 256],
		13219: [[109, 109, 179], 256],
		13220: [[99, 109, 179], 256],
		13221: [[109, 179], 256],
		13222: [[107, 109, 179], 256],
		13223: [[109, 8725, 115], 256],
		13224: [[109, 8725, 115, 178], 256],
		13225: [[80, 97], 256],
		13226: [[107, 80, 97], 256],
		13227: [[77, 80, 97], 256],
		13228: [[71, 80, 97], 256],
		13229: [[114, 97, 100], 256],
		13230: [[114, 97, 100, 8725, 115], 256],
		13231: [[114, 97, 100, 8725, 115, 178], 256],
		13232: [[112, 115], 256],
		13233: [[110, 115], 256],
		13234: [[956, 115], 256],
		13235: [[109, 115], 256],
		13236: [[112, 86], 256],
		13237: [[110, 86], 256],
		13238: [[956, 86], 256],
		13239: [[109, 86], 256],
		13240: [[107, 86], 256],
		13241: [[77, 86], 256],
		13242: [[112, 87], 256],
		13243: [[110, 87], 256],
		13244: [[956, 87], 256],
		13245: [[109, 87], 256],
		13246: [[107, 87], 256],
		13247: [[77, 87], 256],
		13248: [[107, 937], 256],
		13249: [[77, 937], 256],
		13250: [[97, 46, 109, 46], 256],
		13251: [[66, 113], 256],
		13252: [[99, 99], 256],
		13253: [[99, 100], 256],
		13254: [[67, 8725, 107, 103], 256],
		13255: [[67, 111, 46], 256],
		13256: [[100, 66], 256],
		13257: [[71, 121], 256],
		13258: [[104, 97], 256],
		13259: [[72, 80], 256],
		13260: [[105, 110], 256],
		13261: [[75, 75], 256],
		13262: [[75, 77], 256],
		13263: [[107, 116], 256],
		13264: [[108, 109], 256],
		13265: [[108, 110], 256],
		13266: [[108, 111, 103], 256],
		13267: [[108, 120], 256],
		13268: [[109, 98], 256],
		13269: [[109, 105, 108], 256],
		13270: [[109, 111, 108], 256],
		13271: [[80, 72], 256],
		13272: [[112, 46, 109, 46], 256],
		13273: [[80, 80, 77], 256],
		13274: [[80, 82], 256],
		13275: [[115, 114], 256],
		13276: [[83, 118], 256],
		13277: [[87, 98], 256],
		13278: [[86, 8725, 109], 256],
		13279: [[65, 8725, 109], 256],
		13280: [[49, 26085], 256],
		13281: [[50, 26085], 256],
		13282: [[51, 26085], 256],
		13283: [[52, 26085], 256],
		13284: [[53, 26085], 256],
		13285: [[54, 26085], 256],
		13286: [[55, 26085], 256],
		13287: [[56, 26085], 256],
		13288: [[57, 26085], 256],
		13289: [[49, 48, 26085], 256],
		13290: [[49, 49, 26085], 256],
		13291: [[49, 50, 26085], 256],
		13292: [[49, 51, 26085], 256],
		13293: [[49, 52, 26085], 256],
		13294: [[49, 53, 26085], 256],
		13295: [[49, 54, 26085], 256],
		13296: [[49, 55, 26085], 256],
		13297: [[49, 56, 26085], 256],
		13298: [[49, 57, 26085], 256],
		13299: [[50, 48, 26085], 256],
		13300: [[50, 49, 26085], 256],
		13301: [[50, 50, 26085], 256],
		13302: [[50, 51, 26085], 256],
		13303: [[50, 52, 26085], 256],
		13304: [[50, 53, 26085], 256],
		13305: [[50, 54, 26085], 256],
		13306: [[50, 55, 26085], 256],
		13307: [[50, 56, 26085], 256],
		13308: [[50, 57, 26085], 256],
		13309: [[51, 48, 26085], 256],
		13310: [[51, 49, 26085], 256],
		13311: [[103, 97, 108], 256]
	},
	42496: {
		42607: [, 230],
		42612: [, 230],
		42613: [, 230],
		42614: [, 230],
		42615: [, 230],
		42616: [, 230],
		42617: [, 230],
		42618: [, 230],
		42619: [, 230],
		42620: [, 230],
		42621: [, 230],
		42655: [, 230],
		42736: [, 230],
		42737: [, 230]
	},
	42752: { 42864: [[42863], 256], 43000: [[294], 256], 43001: [[339], 256] },
	43008: {
		43014: [, 9],
		43204: [, 9],
		43232: [, 230],
		43233: [, 230],
		43234: [, 230],
		43235: [, 230],
		43236: [, 230],
		43237: [, 230],
		43238: [, 230],
		43239: [, 230],
		43240: [, 230],
		43241: [, 230],
		43242: [, 230],
		43243: [, 230],
		43244: [, 230],
		43245: [, 230],
		43246: [, 230],
		43247: [, 230],
		43248: [, 230],
		43249: [, 230]
	},
	43264: {
		43307: [, 220],
		43308: [, 220],
		43309: [, 220],
		43347: [, 9],
		43443: [, 7],
		43456: [, 9]
	},
	43520: {
		43696: [, 230],
		43698: [, 230],
		43699: [, 230],
		43700: [, 220],
		43703: [, 230],
		43704: [, 230],
		43710: [, 230],
		43711: [, 230],
		43713: [, 230],
		43766: [, 9]
	},
	43776: { 44013: [, 9] },
	53504: {
		119134: [[119127, 119141], 512],
		119135: [[119128, 119141], 512],
		119136: [[119135, 119150], 512],
		119137: [[119135, 119151], 512],
		119138: [[119135, 119152], 512],
		119139: [[119135, 119153], 512],
		119140: [[119135, 119154], 512],
		119141: [, 216],
		119142: [, 216],
		119143: [, 1],
		119144: [, 1],
		119145: [, 1],
		119149: [, 226],
		119150: [, 216],
		119151: [, 216],
		119152: [, 216],
		119153: [, 216],
		119154: [, 216],
		119163: [, 220],
		119164: [, 220],
		119165: [, 220],
		119166: [, 220],
		119167: [, 220],
		119168: [, 220],
		119169: [, 220],
		119170: [, 220],
		119173: [, 230],
		119174: [, 230],
		119175: [, 230],
		119176: [, 230],
		119177: [, 230],
		119178: [, 220],
		119179: [, 220],
		119210: [, 230],
		119211: [, 230],
		119212: [, 230],
		119213: [, 230],
		119227: [[119225, 119141], 512],
		119228: [[119226, 119141], 512],
		119229: [[119227, 119150], 512],
		119230: [[119228, 119150], 512],
		119231: [[119227, 119151], 512],
		119232: [[119228, 119151], 512]
	},
	53760: { 119362: [, 230], 119363: [, 230], 119364: [, 230] },
	54272: {
		119808: [[65], 256],
		119809: [[66], 256],
		119810: [[67], 256],
		119811: [[68], 256],
		119812: [[69], 256],
		119813: [[70], 256],
		119814: [[71], 256],
		119815: [[72], 256],
		119816: [[73], 256],
		119817: [[74], 256],
		119818: [[75], 256],
		119819: [[76], 256],
		119820: [[77], 256],
		119821: [[78], 256],
		119822: [[79], 256],
		119823: [[80], 256],
		119824: [[81], 256],
		119825: [[82], 256],
		119826: [[83], 256],
		119827: [[84], 256],
		119828: [[85], 256],
		119829: [[86], 256],
		119830: [[87], 256],
		119831: [[88], 256],
		119832: [[89], 256],
		119833: [[90], 256],
		119834: [[97], 256],
		119835: [[98], 256],
		119836: [[99], 256],
		119837: [[100], 256],
		119838: [[101], 256],
		119839: [[102], 256],
		119840: [[103], 256],
		119841: [[104], 256],
		119842: [[105], 256],
		119843: [[106], 256],
		119844: [[107], 256],
		119845: [[108], 256],
		119846: [[109], 256],
		119847: [[110], 256],
		119848: [[111], 256],
		119849: [[112], 256],
		119850: [[113], 256],
		119851: [[114], 256],
		119852: [[115], 256],
		119853: [[116], 256],
		119854: [[117], 256],
		119855: [[118], 256],
		119856: [[119], 256],
		119857: [[120], 256],
		119858: [[121], 256],
		119859: [[122], 256],
		119860: [[65], 256],
		119861: [[66], 256],
		119862: [[67], 256],
		119863: [[68], 256],
		119864: [[69], 256],
		119865: [[70], 256],
		119866: [[71], 256],
		119867: [[72], 256],
		119868: [[73], 256],
		119869: [[74], 256],
		119870: [[75], 256],
		119871: [[76], 256],
		119872: [[77], 256],
		119873: [[78], 256],
		119874: [[79], 256],
		119875: [[80], 256],
		119876: [[81], 256],
		119877: [[82], 256],
		119878: [[83], 256],
		119879: [[84], 256],
		119880: [[85], 256],
		119881: [[86], 256],
		119882: [[87], 256],
		119883: [[88], 256],
		119884: [[89], 256],
		119885: [[90], 256],
		119886: [[97], 256],
		119887: [[98], 256],
		119888: [[99], 256],
		119889: [[100], 256],
		119890: [[101], 256],
		119891: [[102], 256],
		119892: [[103], 256],
		119894: [[105], 256],
		119895: [[106], 256],
		119896: [[107], 256],
		119897: [[108], 256],
		119898: [[109], 256],
		119899: [[110], 256],
		119900: [[111], 256],
		119901: [[112], 256],
		119902: [[113], 256],
		119903: [[114], 256],
		119904: [[115], 256],
		119905: [[116], 256],
		119906: [[117], 256],
		119907: [[118], 256],
		119908: [[119], 256],
		119909: [[120], 256],
		119910: [[121], 256],
		119911: [[122], 256],
		119912: [[65], 256],
		119913: [[66], 256],
		119914: [[67], 256],
		119915: [[68], 256],
		119916: [[69], 256],
		119917: [[70], 256],
		119918: [[71], 256],
		119919: [[72], 256],
		119920: [[73], 256],
		119921: [[74], 256],
		119922: [[75], 256],
		119923: [[76], 256],
		119924: [[77], 256],
		119925: [[78], 256],
		119926: [[79], 256],
		119927: [[80], 256],
		119928: [[81], 256],
		119929: [[82], 256],
		119930: [[83], 256],
		119931: [[84], 256],
		119932: [[85], 256],
		119933: [[86], 256],
		119934: [[87], 256],
		119935: [[88], 256],
		119936: [[89], 256],
		119937: [[90], 256],
		119938: [[97], 256],
		119939: [[98], 256],
		119940: [[99], 256],
		119941: [[100], 256],
		119942: [[101], 256],
		119943: [[102], 256],
		119944: [[103], 256],
		119945: [[104], 256],
		119946: [[105], 256],
		119947: [[106], 256],
		119948: [[107], 256],
		119949: [[108], 256],
		119950: [[109], 256],
		119951: [[110], 256],
		119952: [[111], 256],
		119953: [[112], 256],
		119954: [[113], 256],
		119955: [[114], 256],
		119956: [[115], 256],
		119957: [[116], 256],
		119958: [[117], 256],
		119959: [[118], 256],
		119960: [[119], 256],
		119961: [[120], 256],
		119962: [[121], 256],
		119963: [[122], 256],
		119964: [[65], 256],
		119966: [[67], 256],
		119967: [[68], 256],
		119970: [[71], 256],
		119973: [[74], 256],
		119974: [[75], 256],
		119977: [[78], 256],
		119978: [[79], 256],
		119979: [[80], 256],
		119980: [[81], 256],
		119982: [[83], 256],
		119983: [[84], 256],
		119984: [[85], 256],
		119985: [[86], 256],
		119986: [[87], 256],
		119987: [[88], 256],
		119988: [[89], 256],
		119989: [[90], 256],
		119990: [[97], 256],
		119991: [[98], 256],
		119992: [[99], 256],
		119993: [[100], 256],
		119995: [[102], 256],
		119997: [[104], 256],
		119998: [[105], 256],
		119999: [[106], 256],
		120000: [[107], 256],
		120001: [[108], 256],
		120002: [[109], 256],
		120003: [[110], 256],
		120005: [[112], 256],
		120006: [[113], 256],
		120007: [[114], 256],
		120008: [[115], 256],
		120009: [[116], 256],
		120010: [[117], 256],
		120011: [[118], 256],
		120012: [[119], 256],
		120013: [[120], 256],
		120014: [[121], 256],
		120015: [[122], 256],
		120016: [[65], 256],
		120017: [[66], 256],
		120018: [[67], 256],
		120019: [[68], 256],
		120020: [[69], 256],
		120021: [[70], 256],
		120022: [[71], 256],
		120023: [[72], 256],
		120024: [[73], 256],
		120025: [[74], 256],
		120026: [[75], 256],
		120027: [[76], 256],
		120028: [[77], 256],
		120029: [[78], 256],
		120030: [[79], 256],
		120031: [[80], 256],
		120032: [[81], 256],
		120033: [[82], 256],
		120034: [[83], 256],
		120035: [[84], 256],
		120036: [[85], 256],
		120037: [[86], 256],
		120038: [[87], 256],
		120039: [[88], 256],
		120040: [[89], 256],
		120041: [[90], 256],
		120042: [[97], 256],
		120043: [[98], 256],
		120044: [[99], 256],
		120045: [[100], 256],
		120046: [[101], 256],
		120047: [[102], 256],
		120048: [[103], 256],
		120049: [[104], 256],
		120050: [[105], 256],
		120051: [[106], 256],
		120052: [[107], 256],
		120053: [[108], 256],
		120054: [[109], 256],
		120055: [[110], 256],
		120056: [[111], 256],
		120057: [[112], 256],
		120058: [[113], 256],
		120059: [[114], 256],
		120060: [[115], 256],
		120061: [[116], 256],
		120062: [[117], 256],
		120063: [[118], 256]
	},
	54528: {
		120064: [[119], 256],
		120065: [[120], 256],
		120066: [[121], 256],
		120067: [[122], 256],
		120068: [[65], 256],
		120069: [[66], 256],
		120071: [[68], 256],
		120072: [[69], 256],
		120073: [[70], 256],
		120074: [[71], 256],
		120077: [[74], 256],
		120078: [[75], 256],
		120079: [[76], 256],
		120080: [[77], 256],
		120081: [[78], 256],
		120082: [[79], 256],
		120083: [[80], 256],
		120084: [[81], 256],
		120086: [[83], 256],
		120087: [[84], 256],
		120088: [[85], 256],
		120089: [[86], 256],
		120090: [[87], 256],
		120091: [[88], 256],
		120092: [[89], 256],
		120094: [[97], 256],
		120095: [[98], 256],
		120096: [[99], 256],
		120097: [[100], 256],
		120098: [[101], 256],
		120099: [[102], 256],
		120100: [[103], 256],
		120101: [[104], 256],
		120102: [[105], 256],
		120103: [[106], 256],
		120104: [[107], 256],
		120105: [[108], 256],
		120106: [[109], 256],
		120107: [[110], 256],
		120108: [[111], 256],
		120109: [[112], 256],
		120110: [[113], 256],
		120111: [[114], 256],
		120112: [[115], 256],
		120113: [[116], 256],
		120114: [[117], 256],
		120115: [[118], 256],
		120116: [[119], 256],
		120117: [[120], 256],
		120118: [[121], 256],
		120119: [[122], 256],
		120120: [[65], 256],
		120121: [[66], 256],
		120123: [[68], 256],
		120124: [[69], 256],
		120125: [[70], 256],
		120126: [[71], 256],
		120128: [[73], 256],
		120129: [[74], 256],
		120130: [[75], 256],
		120131: [[76], 256],
		120132: [[77], 256],
		120134: [[79], 256],
		120138: [[83], 256],
		120139: [[84], 256],
		120140: [[85], 256],
		120141: [[86], 256],
		120142: [[87], 256],
		120143: [[88], 256],
		120144: [[89], 256],
		120146: [[97], 256],
		120147: [[98], 256],
		120148: [[99], 256],
		120149: [[100], 256],
		120150: [[101], 256],
		120151: [[102], 256],
		120152: [[103], 256],
		120153: [[104], 256],
		120154: [[105], 256],
		120155: [[106], 256],
		120156: [[107], 256],
		120157: [[108], 256],
		120158: [[109], 256],
		120159: [[110], 256],
		120160: [[111], 256],
		120161: [[112], 256],
		120162: [[113], 256],
		120163: [[114], 256],
		120164: [[115], 256],
		120165: [[116], 256],
		120166: [[117], 256],
		120167: [[118], 256],
		120168: [[119], 256],
		120169: [[120], 256],
		120170: [[121], 256],
		120171: [[122], 256],
		120172: [[65], 256],
		120173: [[66], 256],
		120174: [[67], 256],
		120175: [[68], 256],
		120176: [[69], 256],
		120177: [[70], 256],
		120178: [[71], 256],
		120179: [[72], 256],
		120180: [[73], 256],
		120181: [[74], 256],
		120182: [[75], 256],
		120183: [[76], 256],
		120184: [[77], 256],
		120185: [[78], 256],
		120186: [[79], 256],
		120187: [[80], 256],
		120188: [[81], 256],
		120189: [[82], 256],
		120190: [[83], 256],
		120191: [[84], 256],
		120192: [[85], 256],
		120193: [[86], 256],
		120194: [[87], 256],
		120195: [[88], 256],
		120196: [[89], 256],
		120197: [[90], 256],
		120198: [[97], 256],
		120199: [[98], 256],
		120200: [[99], 256],
		120201: [[100], 256],
		120202: [[101], 256],
		120203: [[102], 256],
		120204: [[103], 256],
		120205: [[104], 256],
		120206: [[105], 256],
		120207: [[106], 256],
		120208: [[107], 256],
		120209: [[108], 256],
		120210: [[109], 256],
		120211: [[110], 256],
		120212: [[111], 256],
		120213: [[112], 256],
		120214: [[113], 256],
		120215: [[114], 256],
		120216: [[115], 256],
		120217: [[116], 256],
		120218: [[117], 256],
		120219: [[118], 256],
		120220: [[119], 256],
		120221: [[120], 256],
		120222: [[121], 256],
		120223: [[122], 256],
		120224: [[65], 256],
		120225: [[66], 256],
		120226: [[67], 256],
		120227: [[68], 256],
		120228: [[69], 256],
		120229: [[70], 256],
		120230: [[71], 256],
		120231: [[72], 256],
		120232: [[73], 256],
		120233: [[74], 256],
		120234: [[75], 256],
		120235: [[76], 256],
		120236: [[77], 256],
		120237: [[78], 256],
		120238: [[79], 256],
		120239: [[80], 256],
		120240: [[81], 256],
		120241: [[82], 256],
		120242: [[83], 256],
		120243: [[84], 256],
		120244: [[85], 256],
		120245: [[86], 256],
		120246: [[87], 256],
		120247: [[88], 256],
		120248: [[89], 256],
		120249: [[90], 256],
		120250: [[97], 256],
		120251: [[98], 256],
		120252: [[99], 256],
		120253: [[100], 256],
		120254: [[101], 256],
		120255: [[102], 256],
		120256: [[103], 256],
		120257: [[104], 256],
		120258: [[105], 256],
		120259: [[106], 256],
		120260: [[107], 256],
		120261: [[108], 256],
		120262: [[109], 256],
		120263: [[110], 256],
		120264: [[111], 256],
		120265: [[112], 256],
		120266: [[113], 256],
		120267: [[114], 256],
		120268: [[115], 256],
		120269: [[116], 256],
		120270: [[117], 256],
		120271: [[118], 256],
		120272: [[119], 256],
		120273: [[120], 256],
		120274: [[121], 256],
		120275: [[122], 256],
		120276: [[65], 256],
		120277: [[66], 256],
		120278: [[67], 256],
		120279: [[68], 256],
		120280: [[69], 256],
		120281: [[70], 256],
		120282: [[71], 256],
		120283: [[72], 256],
		120284: [[73], 256],
		120285: [[74], 256],
		120286: [[75], 256],
		120287: [[76], 256],
		120288: [[77], 256],
		120289: [[78], 256],
		120290: [[79], 256],
		120291: [[80], 256],
		120292: [[81], 256],
		120293: [[82], 256],
		120294: [[83], 256],
		120295: [[84], 256],
		120296: [[85], 256],
		120297: [[86], 256],
		120298: [[87], 256],
		120299: [[88], 256],
		120300: [[89], 256],
		120301: [[90], 256],
		120302: [[97], 256],
		120303: [[98], 256],
		120304: [[99], 256],
		120305: [[100], 256],
		120306: [[101], 256],
		120307: [[102], 256],
		120308: [[103], 256],
		120309: [[104], 256],
		120310: [[105], 256],
		120311: [[106], 256],
		120312: [[107], 256],
		120313: [[108], 256],
		120314: [[109], 256],
		120315: [[110], 256],
		120316: [[111], 256],
		120317: [[112], 256],
		120318: [[113], 256],
		120319: [[114], 256]
	},
	54784: {
		120320: [[115], 256],
		120321: [[116], 256],
		120322: [[117], 256],
		120323: [[118], 256],
		120324: [[119], 256],
		120325: [[120], 256],
		120326: [[121], 256],
		120327: [[122], 256],
		120328: [[65], 256],
		120329: [[66], 256],
		120330: [[67], 256],
		120331: [[68], 256],
		120332: [[69], 256],
		120333: [[70], 256],
		120334: [[71], 256],
		120335: [[72], 256],
		120336: [[73], 256],
		120337: [[74], 256],
		120338: [[75], 256],
		120339: [[76], 256],
		120340: [[77], 256],
		120341: [[78], 256],
		120342: [[79], 256],
		120343: [[80], 256],
		120344: [[81], 256],
		120345: [[82], 256],
		120346: [[83], 256],
		120347: [[84], 256],
		120348: [[85], 256],
		120349: [[86], 256],
		120350: [[87], 256],
		120351: [[88], 256],
		120352: [[89], 256],
		120353: [[90], 256],
		120354: [[97], 256],
		120355: [[98], 256],
		120356: [[99], 256],
		120357: [[100], 256],
		120358: [[101], 256],
		120359: [[102], 256],
		120360: [[103], 256],
		120361: [[104], 256],
		120362: [[105], 256],
		120363: [[106], 256],
		120364: [[107], 256],
		120365: [[108], 256],
		120366: [[109], 256],
		120367: [[110], 256],
		120368: [[111], 256],
		120369: [[112], 256],
		120370: [[113], 256],
		120371: [[114], 256],
		120372: [[115], 256],
		120373: [[116], 256],
		120374: [[117], 256],
		120375: [[118], 256],
		120376: [[119], 256],
		120377: [[120], 256],
		120378: [[121], 256],
		120379: [[122], 256],
		120380: [[65], 256],
		120381: [[66], 256],
		120382: [[67], 256],
		120383: [[68], 256],
		120384: [[69], 256],
		120385: [[70], 256],
		120386: [[71], 256],
		120387: [[72], 256],
		120388: [[73], 256],
		120389: [[74], 256],
		120390: [[75], 256],
		120391: [[76], 256],
		120392: [[77], 256],
		120393: [[78], 256],
		120394: [[79], 256],
		120395: [[80], 256],
		120396: [[81], 256],
		120397: [[82], 256],
		120398: [[83], 256],
		120399: [[84], 256],
		120400: [[85], 256],
		120401: [[86], 256],
		120402: [[87], 256],
		120403: [[88], 256],
		120404: [[89], 256],
		120405: [[90], 256],
		120406: [[97], 256],
		120407: [[98], 256],
		120408: [[99], 256],
		120409: [[100], 256],
		120410: [[101], 256],
		120411: [[102], 256],
		120412: [[103], 256],
		120413: [[104], 256],
		120414: [[105], 256],
		120415: [[106], 256],
		120416: [[107], 256],
		120417: [[108], 256],
		120418: [[109], 256],
		120419: [[110], 256],
		120420: [[111], 256],
		120421: [[112], 256],
		120422: [[113], 256],
		120423: [[114], 256],
		120424: [[115], 256],
		120425: [[116], 256],
		120426: [[117], 256],
		120427: [[118], 256],
		120428: [[119], 256],
		120429: [[120], 256],
		120430: [[121], 256],
		120431: [[122], 256],
		120432: [[65], 256],
		120433: [[66], 256],
		120434: [[67], 256],
		120435: [[68], 256],
		120436: [[69], 256],
		120437: [[70], 256],
		120438: [[71], 256],
		120439: [[72], 256],
		120440: [[73], 256],
		120441: [[74], 256],
		120442: [[75], 256],
		120443: [[76], 256],
		120444: [[77], 256],
		120445: [[78], 256],
		120446: [[79], 256],
		120447: [[80], 256],
		120448: [[81], 256],
		120449: [[82], 256],
		120450: [[83], 256],
		120451: [[84], 256],
		120452: [[85], 256],
		120453: [[86], 256],
		120454: [[87], 256],
		120455: [[88], 256],
		120456: [[89], 256],
		120457: [[90], 256],
		120458: [[97], 256],
		120459: [[98], 256],
		120460: [[99], 256],
		120461: [[100], 256],
		120462: [[101], 256],
		120463: [[102], 256],
		120464: [[103], 256],
		120465: [[104], 256],
		120466: [[105], 256],
		120467: [[106], 256],
		120468: [[107], 256],
		120469: [[108], 256],
		120470: [[109], 256],
		120471: [[110], 256],
		120472: [[111], 256],
		120473: [[112], 256],
		120474: [[113], 256],
		120475: [[114], 256],
		120476: [[115], 256],
		120477: [[116], 256],
		120478: [[117], 256],
		120479: [[118], 256],
		120480: [[119], 256],
		120481: [[120], 256],
		120482: [[121], 256],
		120483: [[122], 256],
		120484: [[305], 256],
		120485: [[567], 256],
		120488: [[913], 256],
		120489: [[914], 256],
		120490: [[915], 256],
		120491: [[916], 256],
		120492: [[917], 256],
		120493: [[918], 256],
		120494: [[919], 256],
		120495: [[920], 256],
		120496: [[921], 256],
		120497: [[922], 256],
		120498: [[923], 256],
		120499: [[924], 256],
		120500: [[925], 256],
		120501: [[926], 256],
		120502: [[927], 256],
		120503: [[928], 256],
		120504: [[929], 256],
		120505: [[1012], 256],
		120506: [[931], 256],
		120507: [[932], 256],
		120508: [[933], 256],
		120509: [[934], 256],
		120510: [[935], 256],
		120511: [[936], 256],
		120512: [[937], 256],
		120513: [[8711], 256],
		120514: [[945], 256],
		120515: [[946], 256],
		120516: [[947], 256],
		120517: [[948], 256],
		120518: [[949], 256],
		120519: [[950], 256],
		120520: [[951], 256],
		120521: [[952], 256],
		120522: [[953], 256],
		120523: [[954], 256],
		120524: [[955], 256],
		120525: [[956], 256],
		120526: [[957], 256],
		120527: [[958], 256],
		120528: [[959], 256],
		120529: [[960], 256],
		120530: [[961], 256],
		120531: [[962], 256],
		120532: [[963], 256],
		120533: [[964], 256],
		120534: [[965], 256],
		120535: [[966], 256],
		120536: [[967], 256],
		120537: [[968], 256],
		120538: [[969], 256],
		120539: [[8706], 256],
		120540: [[1013], 256],
		120541: [[977], 256],
		120542: [[1008], 256],
		120543: [[981], 256],
		120544: [[1009], 256],
		120545: [[982], 256],
		120546: [[913], 256],
		120547: [[914], 256],
		120548: [[915], 256],
		120549: [[916], 256],
		120550: [[917], 256],
		120551: [[918], 256],
		120552: [[919], 256],
		120553: [[920], 256],
		120554: [[921], 256],
		120555: [[922], 256],
		120556: [[923], 256],
		120557: [[924], 256],
		120558: [[925], 256],
		120559: [[926], 256],
		120560: [[927], 256],
		120561: [[928], 256],
		120562: [[929], 256],
		120563: [[1012], 256],
		120564: [[931], 256],
		120565: [[932], 256],
		120566: [[933], 256],
		120567: [[934], 256],
		120568: [[935], 256],
		120569: [[936], 256],
		120570: [[937], 256],
		120571: [[8711], 256],
		120572: [[945], 256],
		120573: [[946], 256],
		120574: [[947], 256],
		120575: [[948], 256]
	},
	55040: {
		120576: [[949], 256],
		120577: [[950], 256],
		120578: [[951], 256],
		120579: [[952], 256],
		120580: [[953], 256],
		120581: [[954], 256],
		120582: [[955], 256],
		120583: [[956], 256],
		120584: [[957], 256],
		120585: [[958], 256],
		120586: [[959], 256],
		120587: [[960], 256],
		120588: [[961], 256],
		120589: [[962], 256],
		120590: [[963], 256],
		120591: [[964], 256],
		120592: [[965], 256],
		120593: [[966], 256],
		120594: [[967], 256],
		120595: [[968], 256],
		120596: [[969], 256],
		120597: [[8706], 256],
		120598: [[1013], 256],
		120599: [[977], 256],
		120600: [[1008], 256],
		120601: [[981], 256],
		120602: [[1009], 256],
		120603: [[982], 256],
		120604: [[913], 256],
		120605: [[914], 256],
		120606: [[915], 256],
		120607: [[916], 256],
		120608: [[917], 256],
		120609: [[918], 256],
		120610: [[919], 256],
		120611: [[920], 256],
		120612: [[921], 256],
		120613: [[922], 256],
		120614: [[923], 256],
		120615: [[924], 256],
		120616: [[925], 256],
		120617: [[926], 256],
		120618: [[927], 256],
		120619: [[928], 256],
		120620: [[929], 256],
		120621: [[1012], 256],
		120622: [[931], 256],
		120623: [[932], 256],
		120624: [[933], 256],
		120625: [[934], 256],
		120626: [[935], 256],
		120627: [[936], 256],
		120628: [[937], 256],
		120629: [[8711], 256],
		120630: [[945], 256],
		120631: [[946], 256],
		120632: [[947], 256],
		120633: [[948], 256],
		120634: [[949], 256],
		120635: [[950], 256],
		120636: [[951], 256],
		120637: [[952], 256],
		120638: [[953], 256],
		120639: [[954], 256],
		120640: [[955], 256],
		120641: [[956], 256],
		120642: [[957], 256],
		120643: [[958], 256],
		120644: [[959], 256],
		120645: [[960], 256],
		120646: [[961], 256],
		120647: [[962], 256],
		120648: [[963], 256],
		120649: [[964], 256],
		120650: [[965], 256],
		120651: [[966], 256],
		120652: [[967], 256],
		120653: [[968], 256],
		120654: [[969], 256],
		120655: [[8706], 256],
		120656: [[1013], 256],
		120657: [[977], 256],
		120658: [[1008], 256],
		120659: [[981], 256],
		120660: [[1009], 256],
		120661: [[982], 256],
		120662: [[913], 256],
		120663: [[914], 256],
		120664: [[915], 256],
		120665: [[916], 256],
		120666: [[917], 256],
		120667: [[918], 256],
		120668: [[919], 256],
		120669: [[920], 256],
		120670: [[921], 256],
		120671: [[922], 256],
		120672: [[923], 256],
		120673: [[924], 256],
		120674: [[925], 256],
		120675: [[926], 256],
		120676: [[927], 256],
		120677: [[928], 256],
		120678: [[929], 256],
		120679: [[1012], 256],
		120680: [[931], 256],
		120681: [[932], 256],
		120682: [[933], 256],
		120683: [[934], 256],
		120684: [[935], 256],
		120685: [[936], 256],
		120686: [[937], 256],
		120687: [[8711], 256],
		120688: [[945], 256],
		120689: [[946], 256],
		120690: [[947], 256],
		120691: [[948], 256],
		120692: [[949], 256],
		120693: [[950], 256],
		120694: [[951], 256],
		120695: [[952], 256],
		120696: [[953], 256],
		120697: [[954], 256],
		120698: [[955], 256],
		120699: [[956], 256],
		120700: [[957], 256],
		120701: [[958], 256],
		120702: [[959], 256],
		120703: [[960], 256],
		120704: [[961], 256],
		120705: [[962], 256],
		120706: [[963], 256],
		120707: [[964], 256],
		120708: [[965], 256],
		120709: [[966], 256],
		120710: [[967], 256],
		120711: [[968], 256],
		120712: [[969], 256],
		120713: [[8706], 256],
		120714: [[1013], 256],
		120715: [[977], 256],
		120716: [[1008], 256],
		120717: [[981], 256],
		120718: [[1009], 256],
		120719: [[982], 256],
		120720: [[913], 256],
		120721: [[914], 256],
		120722: [[915], 256],
		120723: [[916], 256],
		120724: [[917], 256],
		120725: [[918], 256],
		120726: [[919], 256],
		120727: [[920], 256],
		120728: [[921], 256],
		120729: [[922], 256],
		120730: [[923], 256],
		120731: [[924], 256],
		120732: [[925], 256],
		120733: [[926], 256],
		120734: [[927], 256],
		120735: [[928], 256],
		120736: [[929], 256],
		120737: [[1012], 256],
		120738: [[931], 256],
		120739: [[932], 256],
		120740: [[933], 256],
		120741: [[934], 256],
		120742: [[935], 256],
		120743: [[936], 256],
		120744: [[937], 256],
		120745: [[8711], 256],
		120746: [[945], 256],
		120747: [[946], 256],
		120748: [[947], 256],
		120749: [[948], 256],
		120750: [[949], 256],
		120751: [[950], 256],
		120752: [[951], 256],
		120753: [[952], 256],
		120754: [[953], 256],
		120755: [[954], 256],
		120756: [[955], 256],
		120757: [[956], 256],
		120758: [[957], 256],
		120759: [[958], 256],
		120760: [[959], 256],
		120761: [[960], 256],
		120762: [[961], 256],
		120763: [[962], 256],
		120764: [[963], 256],
		120765: [[964], 256],
		120766: [[965], 256],
		120767: [[966], 256],
		120768: [[967], 256],
		120769: [[968], 256],
		120770: [[969], 256],
		120771: [[8706], 256],
		120772: [[1013], 256],
		120773: [[977], 256],
		120774: [[1008], 256],
		120775: [[981], 256],
		120776: [[1009], 256],
		120777: [[982], 256],
		120778: [[988], 256],
		120779: [[989], 256],
		120782: [[48], 256],
		120783: [[49], 256],
		120784: [[50], 256],
		120785: [[51], 256],
		120786: [[52], 256],
		120787: [[53], 256],
		120788: [[54], 256],
		120789: [[55], 256],
		120790: [[56], 256],
		120791: [[57], 256],
		120792: [[48], 256],
		120793: [[49], 256],
		120794: [[50], 256],
		120795: [[51], 256],
		120796: [[52], 256],
		120797: [[53], 256],
		120798: [[54], 256],
		120799: [[55], 256],
		120800: [[56], 256],
		120801: [[57], 256],
		120802: [[48], 256],
		120803: [[49], 256],
		120804: [[50], 256],
		120805: [[51], 256],
		120806: [[52], 256],
		120807: [[53], 256],
		120808: [[54], 256],
		120809: [[55], 256],
		120810: [[56], 256],
		120811: [[57], 256],
		120812: [[48], 256],
		120813: [[49], 256],
		120814: [[50], 256],
		120815: [[51], 256],
		120816: [[52], 256],
		120817: [[53], 256],
		120818: [[54], 256],
		120819: [[55], 256],
		120820: [[56], 256],
		120821: [[57], 256],
		120822: [[48], 256],
		120823: [[49], 256],
		120824: [[50], 256],
		120825: [[51], 256],
		120826: [[52], 256],
		120827: [[53], 256],
		120828: [[54], 256],
		120829: [[55], 256],
		120830: [[56], 256],
		120831: [[57], 256]
	},
	60928: {
		126464: [[1575], 256],
		126465: [[1576], 256],
		126466: [[1580], 256],
		126467: [[1583], 256],
		126469: [[1608], 256],
		126470: [[1586], 256],
		126471: [[1581], 256],
		126472: [[1591], 256],
		126473: [[1610], 256],
		126474: [[1603], 256],
		126475: [[1604], 256],
		126476: [[1605], 256],
		126477: [[1606], 256],
		126478: [[1587], 256],
		126479: [[1593], 256],
		126480: [[1601], 256],
		126481: [[1589], 256],
		126482: [[1602], 256],
		126483: [[1585], 256],
		126484: [[1588], 256],
		126485: [[1578], 256],
		126486: [[1579], 256],
		126487: [[1582], 256],
		126488: [[1584], 256],
		126489: [[1590], 256],
		126490: [[1592], 256],
		126491: [[1594], 256],
		126492: [[1646], 256],
		126493: [[1722], 256],
		126494: [[1697], 256],
		126495: [[1647], 256],
		126497: [[1576], 256],
		126498: [[1580], 256],
		126500: [[1607], 256],
		126503: [[1581], 256],
		126505: [[1610], 256],
		126506: [[1603], 256],
		126507: [[1604], 256],
		126508: [[1605], 256],
		126509: [[1606], 256],
		126510: [[1587], 256],
		126511: [[1593], 256],
		126512: [[1601], 256],
		126513: [[1589], 256],
		126514: [[1602], 256],
		126516: [[1588], 256],
		126517: [[1578], 256],
		126518: [[1579], 256],
		126519: [[1582], 256],
		126521: [[1590], 256],
		126523: [[1594], 256],
		126530: [[1580], 256],
		126535: [[1581], 256],
		126537: [[1610], 256],
		126539: [[1604], 256],
		126541: [[1606], 256],
		126542: [[1587], 256],
		126543: [[1593], 256],
		126545: [[1589], 256],
		126546: [[1602], 256],
		126548: [[1588], 256],
		126551: [[1582], 256],
		126553: [[1590], 256],
		126555: [[1594], 256],
		126557: [[1722], 256],
		126559: [[1647], 256],
		126561: [[1576], 256],
		126562: [[1580], 256],
		126564: [[1607], 256],
		126567: [[1581], 256],
		126568: [[1591], 256],
		126569: [[1610], 256],
		126570: [[1603], 256],
		126572: [[1605], 256],
		126573: [[1606], 256],
		126574: [[1587], 256],
		126575: [[1593], 256],
		126576: [[1601], 256],
		126577: [[1589], 256],
		126578: [[1602], 256],
		126580: [[1588], 256],
		126581: [[1578], 256],
		126582: [[1579], 256],
		126583: [[1582], 256],
		126585: [[1590], 256],
		126586: [[1592], 256],
		126587: [[1594], 256],
		126588: [[1646], 256],
		126590: [[1697], 256],
		126592: [[1575], 256],
		126593: [[1576], 256],
		126594: [[1580], 256],
		126595: [[1583], 256],
		126596: [[1607], 256],
		126597: [[1608], 256],
		126598: [[1586], 256],
		126599: [[1581], 256],
		126600: [[1591], 256],
		126601: [[1610], 256],
		126603: [[1604], 256],
		126604: [[1605], 256],
		126605: [[1606], 256],
		126606: [[1587], 256],
		126607: [[1593], 256],
		126608: [[1601], 256],
		126609: [[1589], 256],
		126610: [[1602], 256],
		126611: [[1585], 256],
		126612: [[1588], 256],
		126613: [[1578], 256],
		126614: [[1579], 256],
		126615: [[1582], 256],
		126616: [[1584], 256],
		126617: [[1590], 256],
		126618: [[1592], 256],
		126619: [[1594], 256],
		126625: [[1576], 256],
		126626: [[1580], 256],
		126627: [[1583], 256],
		126629: [[1608], 256],
		126630: [[1586], 256],
		126631: [[1581], 256],
		126632: [[1591], 256],
		126633: [[1610], 256],
		126635: [[1604], 256],
		126636: [[1605], 256],
		126637: [[1606], 256],
		126638: [[1587], 256],
		126639: [[1593], 256],
		126640: [[1601], 256],
		126641: [[1589], 256],
		126642: [[1602], 256],
		126643: [[1585], 256],
		126644: [[1588], 256],
		126645: [[1578], 256],
		126646: [[1579], 256],
		126647: [[1582], 256],
		126648: [[1584], 256],
		126649: [[1590], 256],
		126650: [[1592], 256],
		126651: [[1594], 256]
	},
	61696: {
		127232: [[48, 46], 256],
		127233: [[48, 44], 256],
		127234: [[49, 44], 256],
		127235: [[50, 44], 256],
		127236: [[51, 44], 256],
		127237: [[52, 44], 256],
		127238: [[53, 44], 256],
		127239: [[54, 44], 256],
		127240: [[55, 44], 256],
		127241: [[56, 44], 256],
		127242: [[57, 44], 256],
		127248: [[40, 65, 41], 256],
		127249: [[40, 66, 41], 256],
		127250: [[40, 67, 41], 256],
		127251: [[40, 68, 41], 256],
		127252: [[40, 69, 41], 256],
		127253: [[40, 70, 41], 256],
		127254: [[40, 71, 41], 256],
		127255: [[40, 72, 41], 256],
		127256: [[40, 73, 41], 256],
		127257: [[40, 74, 41], 256],
		127258: [[40, 75, 41], 256],
		127259: [[40, 76, 41], 256],
		127260: [[40, 77, 41], 256],
		127261: [[40, 78, 41], 256],
		127262: [[40, 79, 41], 256],
		127263: [[40, 80, 41], 256],
		127264: [[40, 81, 41], 256],
		127265: [[40, 82, 41], 256],
		127266: [[40, 83, 41], 256],
		127267: [[40, 84, 41], 256],
		127268: [[40, 85, 41], 256],
		127269: [[40, 86, 41], 256],
		127270: [[40, 87, 41], 256],
		127271: [[40, 88, 41], 256],
		127272: [[40, 89, 41], 256],
		127273: [[40, 90, 41], 256],
		127274: [[12308, 83, 12309], 256],
		127275: [[67], 256],
		127276: [[82], 256],
		127277: [[67, 68], 256],
		127278: [[87, 90], 256],
		127280: [[65], 256],
		127281: [[66], 256],
		127282: [[67], 256],
		127283: [[68], 256],
		127284: [[69], 256],
		127285: [[70], 256],
		127286: [[71], 256],
		127287: [[72], 256],
		127288: [[73], 256],
		127289: [[74], 256],
		127290: [[75], 256],
		127291: [[76], 256],
		127292: [[77], 256],
		127293: [[78], 256],
		127294: [[79], 256],
		127295: [[80], 256],
		127296: [[81], 256],
		127297: [[82], 256],
		127298: [[83], 256],
		127299: [[84], 256],
		127300: [[85], 256],
		127301: [[86], 256],
		127302: [[87], 256],
		127303: [[88], 256],
		127304: [[89], 256],
		127305: [[90], 256],
		127306: [[72, 86], 256],
		127307: [[77, 86], 256],
		127308: [[83, 68], 256],
		127309: [[83, 83], 256],
		127310: [[80, 80, 86], 256],
		127311: [[87, 67], 256],
		127338: [[77, 67], 256],
		127339: [[77, 68], 256],
		127376: [[68, 74], 256]
	},
	61952: {
		127488: [[12411, 12363], 256],
		127489: [[12467, 12467], 256],
		127490: [[12469], 256],
		127504: [[25163], 256],
		127505: [[23383], 256],
		127506: [[21452], 256],
		127507: [[12487], 256],
		127508: [[20108], 256],
		127509: [[22810], 256],
		127510: [[35299], 256],
		127511: [[22825], 256],
		127512: [[20132], 256],
		127513: [[26144], 256],
		127514: [[28961], 256],
		127515: [[26009], 256],
		127516: [[21069], 256],
		127517: [[24460], 256],
		127518: [[20877], 256],
		127519: [[26032], 256],
		127520: [[21021], 256],
		127521: [[32066], 256],
		127522: [[29983], 256],
		127523: [[36009], 256],
		127524: [[22768], 256],
		127525: [[21561], 256],
		127526: [[28436], 256],
		127527: [[25237], 256],
		127528: [[25429], 256],
		127529: [[19968], 256],
		127530: [[19977], 256],
		127531: [[36938], 256],
		127532: [[24038], 256],
		127533: [[20013], 256],
		127534: [[21491], 256],
		127535: [[25351], 256],
		127536: [[36208], 256],
		127537: [[25171], 256],
		127538: [[31105], 256],
		127539: [[31354], 256],
		127540: [[21512], 256],
		127541: [[28288], 256],
		127542: [[26377], 256],
		127543: [[26376], 256],
		127544: [[30003], 256],
		127545: [[21106], 256],
		127546: [[21942], 256],
		127552: [[12308, 26412, 12309], 256],
		127553: [[12308, 19977, 12309], 256],
		127554: [[12308, 20108, 12309], 256],
		127555: [[12308, 23433, 12309], 256],
		127556: [[12308, 28857, 12309], 256],
		127557: [[12308, 25171, 12309], 256],
		127558: [[12308, 30423, 12309], 256],
		127559: [[12308, 21213, 12309], 256],
		127560: [[12308, 25943, 12309], 256],
		127568: [[24471], 256],
		127569: [[21487], 256]
	},
	63488: {
		194560: [[20029]],
		194561: [[20024]],
		194562: [[20033]],
		194563: [[131362]],
		194564: [[20320]],
		194565: [[20398]],
		194566: [[20411]],
		194567: [[20482]],
		194568: [[20602]],
		194569: [[20633]],
		194570: [[20711]],
		194571: [[20687]],
		194572: [[13470]],
		194573: [[132666]],
		194574: [[20813]],
		194575: [[20820]],
		194576: [[20836]],
		194577: [[20855]],
		194578: [[132380]],
		194579: [[13497]],
		194580: [[20839]],
		194581: [[20877]],
		194582: [[132427]],
		194583: [[20887]],
		194584: [[20900]],
		194585: [[20172]],
		194586: [[20908]],
		194587: [[20917]],
		194588: [[168415]],
		194589: [[20981]],
		194590: [[20995]],
		194591: [[13535]],
		194592: [[21051]],
		194593: [[21062]],
		194594: [[21106]],
		194595: [[21111]],
		194596: [[13589]],
		194597: [[21191]],
		194598: [[21193]],
		194599: [[21220]],
		194600: [[21242]],
		194601: [[21253]],
		194602: [[21254]],
		194603: [[21271]],
		194604: [[21321]],
		194605: [[21329]],
		194606: [[21338]],
		194607: [[21363]],
		194608: [[21373]],
		194609: [[21375]],
		194610: [[21375]],
		194611: [[21375]],
		194612: [[133676]],
		194613: [[28784]],
		194614: [[21450]],
		194615: [[21471]],
		194616: [[133987]],
		194617: [[21483]],
		194618: [[21489]],
		194619: [[21510]],
		194620: [[21662]],
		194621: [[21560]],
		194622: [[21576]],
		194623: [[21608]],
		194624: [[21666]],
		194625: [[21750]],
		194626: [[21776]],
		194627: [[21843]],
		194628: [[21859]],
		194629: [[21892]],
		194630: [[21892]],
		194631: [[21913]],
		194632: [[21931]],
		194633: [[21939]],
		194634: [[21954]],
		194635: [[22294]],
		194636: [[22022]],
		194637: [[22295]],
		194638: [[22097]],
		194639: [[22132]],
		194640: [[20999]],
		194641: [[22766]],
		194642: [[22478]],
		194643: [[22516]],
		194644: [[22541]],
		194645: [[22411]],
		194646: [[22578]],
		194647: [[22577]],
		194648: [[22700]],
		194649: [[136420]],
		194650: [[22770]],
		194651: [[22775]],
		194652: [[22790]],
		194653: [[22810]],
		194654: [[22818]],
		194655: [[22882]],
		194656: [[136872]],
		194657: [[136938]],
		194658: [[23020]],
		194659: [[23067]],
		194660: [[23079]],
		194661: [[23000]],
		194662: [[23142]],
		194663: [[14062]],
		194664: [[14076]],
		194665: [[23304]],
		194666: [[23358]],
		194667: [[23358]],
		194668: [[137672]],
		194669: [[23491]],
		194670: [[23512]],
		194671: [[23527]],
		194672: [[23539]],
		194673: [[138008]],
		194674: [[23551]],
		194675: [[23558]],
		194676: [[24403]],
		194677: [[23586]],
		194678: [[14209]],
		194679: [[23648]],
		194680: [[23662]],
		194681: [[23744]],
		194682: [[23693]],
		194683: [[138724]],
		194684: [[23875]],
		194685: [[138726]],
		194686: [[23918]],
		194687: [[23915]],
		194688: [[23932]],
		194689: [[24033]],
		194690: [[24034]],
		194691: [[14383]],
		194692: [[24061]],
		194693: [[24104]],
		194694: [[24125]],
		194695: [[24169]],
		194696: [[14434]],
		194697: [[139651]],
		194698: [[14460]],
		194699: [[24240]],
		194700: [[24243]],
		194701: [[24246]],
		194702: [[24266]],
		194703: [[172946]],
		194704: [[24318]],
		194705: [[140081]],
		194706: [[140081]],
		194707: [[33281]],
		194708: [[24354]],
		194709: [[24354]],
		194710: [[14535]],
		194711: [[144056]],
		194712: [[156122]],
		194713: [[24418]],
		194714: [[24427]],
		194715: [[14563]],
		194716: [[24474]],
		194717: [[24525]],
		194718: [[24535]],
		194719: [[24569]],
		194720: [[24705]],
		194721: [[14650]],
		194722: [[14620]],
		194723: [[24724]],
		194724: [[141012]],
		194725: [[24775]],
		194726: [[24904]],
		194727: [[24908]],
		194728: [[24910]],
		194729: [[24908]],
		194730: [[24954]],
		194731: [[24974]],
		194732: [[25010]],
		194733: [[24996]],
		194734: [[25007]],
		194735: [[25054]],
		194736: [[25074]],
		194737: [[25078]],
		194738: [[25104]],
		194739: [[25115]],
		194740: [[25181]],
		194741: [[25265]],
		194742: [[25300]],
		194743: [[25424]],
		194744: [[142092]],
		194745: [[25405]],
		194746: [[25340]],
		194747: [[25448]],
		194748: [[25475]],
		194749: [[25572]],
		194750: [[142321]],
		194751: [[25634]],
		194752: [[25541]],
		194753: [[25513]],
		194754: [[14894]],
		194755: [[25705]],
		194756: [[25726]],
		194757: [[25757]],
		194758: [[25719]],
		194759: [[14956]],
		194760: [[25935]],
		194761: [[25964]],
		194762: [[143370]],
		194763: [[26083]],
		194764: [[26360]],
		194765: [[26185]],
		194766: [[15129]],
		194767: [[26257]],
		194768: [[15112]],
		194769: [[15076]],
		194770: [[20882]],
		194771: [[20885]],
		194772: [[26368]],
		194773: [[26268]],
		194774: [[32941]],
		194775: [[17369]],
		194776: [[26391]],
		194777: [[26395]],
		194778: [[26401]],
		194779: [[26462]],
		194780: [[26451]],
		194781: [[144323]],
		194782: [[15177]],
		194783: [[26618]],
		194784: [[26501]],
		194785: [[26706]],
		194786: [[26757]],
		194787: [[144493]],
		194788: [[26766]],
		194789: [[26655]],
		194790: [[26900]],
		194791: [[15261]],
		194792: [[26946]],
		194793: [[27043]],
		194794: [[27114]],
		194795: [[27304]],
		194796: [[145059]],
		194797: [[27355]],
		194798: [[15384]],
		194799: [[27425]],
		194800: [[145575]],
		194801: [[27476]],
		194802: [[15438]],
		194803: [[27506]],
		194804: [[27551]],
		194805: [[27578]],
		194806: [[27579]],
		194807: [[146061]],
		194808: [[138507]],
		194809: [[146170]],
		194810: [[27726]],
		194811: [[146620]],
		194812: [[27839]],
		194813: [[27853]],
		194814: [[27751]],
		194815: [[27926]]
	},
	63744: {
		63744: [[35912]],
		63745: [[26356]],
		63746: [[36554]],
		63747: [[36040]],
		63748: [[28369]],
		63749: [[20018]],
		63750: [[21477]],
		63751: [[40860]],
		63752: [[40860]],
		63753: [[22865]],
		63754: [[37329]],
		63755: [[21895]],
		63756: [[22856]],
		63757: [[25078]],
		63758: [[30313]],
		63759: [[32645]],
		63760: [[34367]],
		63761: [[34746]],
		63762: [[35064]],
		63763: [[37007]],
		63764: [[27138]],
		63765: [[27931]],
		63766: [[28889]],
		63767: [[29662]],
		63768: [[33853]],
		63769: [[37226]],
		63770: [[39409]],
		63771: [[20098]],
		63772: [[21365]],
		63773: [[27396]],
		63774: [[29211]],
		63775: [[34349]],
		63776: [[40478]],
		63777: [[23888]],
		63778: [[28651]],
		63779: [[34253]],
		63780: [[35172]],
		63781: [[25289]],
		63782: [[33240]],
		63783: [[34847]],
		63784: [[24266]],
		63785: [[26391]],
		63786: [[28010]],
		63787: [[29436]],
		63788: [[37070]],
		63789: [[20358]],
		63790: [[20919]],
		63791: [[21214]],
		63792: [[25796]],
		63793: [[27347]],
		63794: [[29200]],
		63795: [[30439]],
		63796: [[32769]],
		63797: [[34310]],
		63798: [[34396]],
		63799: [[36335]],
		63800: [[38706]],
		63801: [[39791]],
		63802: [[40442]],
		63803: [[30860]],
		63804: [[31103]],
		63805: [[32160]],
		63806: [[33737]],
		63807: [[37636]],
		63808: [[40575]],
		63809: [[35542]],
		63810: [[22751]],
		63811: [[24324]],
		63812: [[31840]],
		63813: [[32894]],
		63814: [[29282]],
		63815: [[30922]],
		63816: [[36034]],
		63817: [[38647]],
		63818: [[22744]],
		63819: [[23650]],
		63820: [[27155]],
		63821: [[28122]],
		63822: [[28431]],
		63823: [[32047]],
		63824: [[32311]],
		63825: [[38475]],
		63826: [[21202]],
		63827: [[32907]],
		63828: [[20956]],
		63829: [[20940]],
		63830: [[31260]],
		63831: [[32190]],
		63832: [[33777]],
		63833: [[38517]],
		63834: [[35712]],
		63835: [[25295]],
		63836: [[27138]],
		63837: [[35582]],
		63838: [[20025]],
		63839: [[23527]],
		63840: [[24594]],
		63841: [[29575]],
		63842: [[30064]],
		63843: [[21271]],
		63844: [[30971]],
		63845: [[20415]],
		63846: [[24489]],
		63847: [[19981]],
		63848: [[27852]],
		63849: [[25976]],
		63850: [[32034]],
		63851: [[21443]],
		63852: [[22622]],
		63853: [[30465]],
		63854: [[33865]],
		63855: [[35498]],
		63856: [[27578]],
		63857: [[36784]],
		63858: [[27784]],
		63859: [[25342]],
		63860: [[33509]],
		63861: [[25504]],
		63862: [[30053]],
		63863: [[20142]],
		63864: [[20841]],
		63865: [[20937]],
		63866: [[26753]],
		63867: [[31975]],
		63868: [[33391]],
		63869: [[35538]],
		63870: [[37327]],
		63871: [[21237]],
		63872: [[21570]],
		63873: [[22899]],
		63874: [[24300]],
		63875: [[26053]],
		63876: [[28670]],
		63877: [[31018]],
		63878: [[38317]],
		63879: [[39530]],
		63880: [[40599]],
		63881: [[40654]],
		63882: [[21147]],
		63883: [[26310]],
		63884: [[27511]],
		63885: [[36706]],
		63886: [[24180]],
		63887: [[24976]],
		63888: [[25088]],
		63889: [[25754]],
		63890: [[28451]],
		63891: [[29001]],
		63892: [[29833]],
		63893: [[31178]],
		63894: [[32244]],
		63895: [[32879]],
		63896: [[36646]],
		63897: [[34030]],
		63898: [[36899]],
		63899: [[37706]],
		63900: [[21015]],
		63901: [[21155]],
		63902: [[21693]],
		63903: [[28872]],
		63904: [[35010]],
		63905: [[35498]],
		63906: [[24265]],
		63907: [[24565]],
		63908: [[25467]],
		63909: [[27566]],
		63910: [[31806]],
		63911: [[29557]],
		63912: [[20196]],
		63913: [[22265]],
		63914: [[23527]],
		63915: [[23994]],
		63916: [[24604]],
		63917: [[29618]],
		63918: [[29801]],
		63919: [[32666]],
		63920: [[32838]],
		63921: [[37428]],
		63922: [[38646]],
		63923: [[38728]],
		63924: [[38936]],
		63925: [[20363]],
		63926: [[31150]],
		63927: [[37300]],
		63928: [[38584]],
		63929: [[24801]],
		63930: [[20102]],
		63931: [[20698]],
		63932: [[23534]],
		63933: [[23615]],
		63934: [[26009]],
		63935: [[27138]],
		63936: [[29134]],
		63937: [[30274]],
		63938: [[34044]],
		63939: [[36988]],
		63940: [[40845]],
		63941: [[26248]],
		63942: [[38446]],
		63943: [[21129]],
		63944: [[26491]],
		63945: [[26611]],
		63946: [[27969]],
		63947: [[28316]],
		63948: [[29705]],
		63949: [[30041]],
		63950: [[30827]],
		63951: [[32016]],
		63952: [[39006]],
		63953: [[20845]],
		63954: [[25134]],
		63955: [[38520]],
		63956: [[20523]],
		63957: [[23833]],
		63958: [[28138]],
		63959: [[36650]],
		63960: [[24459]],
		63961: [[24900]],
		63962: [[26647]],
		63963: [[29575]],
		63964: [[38534]],
		63965: [[21033]],
		63966: [[21519]],
		63967: [[23653]],
		63968: [[26131]],
		63969: [[26446]],
		63970: [[26792]],
		63971: [[27877]],
		63972: [[29702]],
		63973: [[30178]],
		63974: [[32633]],
		63975: [[35023]],
		63976: [[35041]],
		63977: [[37324]],
		63978: [[38626]],
		63979: [[21311]],
		63980: [[28346]],
		63981: [[21533]],
		63982: [[29136]],
		63983: [[29848]],
		63984: [[34298]],
		63985: [[38563]],
		63986: [[40023]],
		63987: [[40607]],
		63988: [[26519]],
		63989: [[28107]],
		63990: [[33256]],
		63991: [[31435]],
		63992: [[31520]],
		63993: [[31890]],
		63994: [[29376]],
		63995: [[28825]],
		63996: [[35672]],
		63997: [[20160]],
		63998: [[33590]],
		63999: [[21050]],
		194816: [[27966]],
		194817: [[28023]],
		194818: [[27969]],
		194819: [[28009]],
		194820: [[28024]],
		194821: [[28037]],
		194822: [[146718]],
		194823: [[27956]],
		194824: [[28207]],
		194825: [[28270]],
		194826: [[15667]],
		194827: [[28363]],
		194828: [[28359]],
		194829: [[147153]],
		194830: [[28153]],
		194831: [[28526]],
		194832: [[147294]],
		194833: [[147342]],
		194834: [[28614]],
		194835: [[28729]],
		194836: [[28702]],
		194837: [[28699]],
		194838: [[15766]],
		194839: [[28746]],
		194840: [[28797]],
		194841: [[28791]],
		194842: [[28845]],
		194843: [[132389]],
		194844: [[28997]],
		194845: [[148067]],
		194846: [[29084]],
		194847: [[148395]],
		194848: [[29224]],
		194849: [[29237]],
		194850: [[29264]],
		194851: [[149000]],
		194852: [[29312]],
		194853: [[29333]],
		194854: [[149301]],
		194855: [[149524]],
		194856: [[29562]],
		194857: [[29579]],
		194858: [[16044]],
		194859: [[29605]],
		194860: [[16056]],
		194861: [[16056]],
		194862: [[29767]],
		194863: [[29788]],
		194864: [[29809]],
		194865: [[29829]],
		194866: [[29898]],
		194867: [[16155]],
		194868: [[29988]],
		194869: [[150582]],
		194870: [[30014]],
		194871: [[150674]],
		194872: [[30064]],
		194873: [[139679]],
		194874: [[30224]],
		194875: [[151457]],
		194876: [[151480]],
		194877: [[151620]],
		194878: [[16380]],
		194879: [[16392]],
		194880: [[30452]],
		194881: [[151795]],
		194882: [[151794]],
		194883: [[151833]],
		194884: [[151859]],
		194885: [[30494]],
		194886: [[30495]],
		194887: [[30495]],
		194888: [[30538]],
		194889: [[16441]],
		194890: [[30603]],
		194891: [[16454]],
		194892: [[16534]],
		194893: [[152605]],
		194894: [[30798]],
		194895: [[30860]],
		194896: [[30924]],
		194897: [[16611]],
		194898: [[153126]],
		194899: [[31062]],
		194900: [[153242]],
		194901: [[153285]],
		194902: [[31119]],
		194903: [[31211]],
		194904: [[16687]],
		194905: [[31296]],
		194906: [[31306]],
		194907: [[31311]],
		194908: [[153980]],
		194909: [[154279]],
		194910: [[154279]],
		194911: [[31470]],
		194912: [[16898]],
		194913: [[154539]],
		194914: [[31686]],
		194915: [[31689]],
		194916: [[16935]],
		194917: [[154752]],
		194918: [[31954]],
		194919: [[17056]],
		194920: [[31976]],
		194921: [[31971]],
		194922: [[32000]],
		194923: [[155526]],
		194924: [[32099]],
		194925: [[17153]],
		194926: [[32199]],
		194927: [[32258]],
		194928: [[32325]],
		194929: [[17204]],
		194930: [[156200]],
		194931: [[156231]],
		194932: [[17241]],
		194933: [[156377]],
		194934: [[32634]],
		194935: [[156478]],
		194936: [[32661]],
		194937: [[32762]],
		194938: [[32773]],
		194939: [[156890]],
		194940: [[156963]],
		194941: [[32864]],
		194942: [[157096]],
		194943: [[32880]],
		194944: [[144223]],
		194945: [[17365]],
		194946: [[32946]],
		194947: [[33027]],
		194948: [[17419]],
		194949: [[33086]],
		194950: [[23221]],
		194951: [[157607]],
		194952: [[157621]],
		194953: [[144275]],
		194954: [[144284]],
		194955: [[33281]],
		194956: [[33284]],
		194957: [[36766]],
		194958: [[17515]],
		194959: [[33425]],
		194960: [[33419]],
		194961: [[33437]],
		194962: [[21171]],
		194963: [[33457]],
		194964: [[33459]],
		194965: [[33469]],
		194966: [[33510]],
		194967: [[158524]],
		194968: [[33509]],
		194969: [[33565]],
		194970: [[33635]],
		194971: [[33709]],
		194972: [[33571]],
		194973: [[33725]],
		194974: [[33767]],
		194975: [[33879]],
		194976: [[33619]],
		194977: [[33738]],
		194978: [[33740]],
		194979: [[33756]],
		194980: [[158774]],
		194981: [[159083]],
		194982: [[158933]],
		194983: [[17707]],
		194984: [[34033]],
		194985: [[34035]],
		194986: [[34070]],
		194987: [[160714]],
		194988: [[34148]],
		194989: [[159532]],
		194990: [[17757]],
		194991: [[17761]],
		194992: [[159665]],
		194993: [[159954]],
		194994: [[17771]],
		194995: [[34384]],
		194996: [[34396]],
		194997: [[34407]],
		194998: [[34409]],
		194999: [[34473]],
		195000: [[34440]],
		195001: [[34574]],
		195002: [[34530]],
		195003: [[34681]],
		195004: [[34600]],
		195005: [[34667]],
		195006: [[34694]],
		195007: [[17879]],
		195008: [[34785]],
		195009: [[34817]],
		195010: [[17913]],
		195011: [[34912]],
		195012: [[34915]],
		195013: [[161383]],
		195014: [[35031]],
		195015: [[35038]],
		195016: [[17973]],
		195017: [[35066]],
		195018: [[13499]],
		195019: [[161966]],
		195020: [[162150]],
		195021: [[18110]],
		195022: [[18119]],
		195023: [[35488]],
		195024: [[35565]],
		195025: [[35722]],
		195026: [[35925]],
		195027: [[162984]],
		195028: [[36011]],
		195029: [[36033]],
		195030: [[36123]],
		195031: [[36215]],
		195032: [[163631]],
		195033: [[133124]],
		195034: [[36299]],
		195035: [[36284]],
		195036: [[36336]],
		195037: [[133342]],
		195038: [[36564]],
		195039: [[36664]],
		195040: [[165330]],
		195041: [[165357]],
		195042: [[37012]],
		195043: [[37105]],
		195044: [[37137]],
		195045: [[165678]],
		195046: [[37147]],
		195047: [[37432]],
		195048: [[37591]],
		195049: [[37592]],
		195050: [[37500]],
		195051: [[37881]],
		195052: [[37909]],
		195053: [[166906]],
		195054: [[38283]],
		195055: [[18837]],
		195056: [[38327]],
		195057: [[167287]],
		195058: [[18918]],
		195059: [[38595]],
		195060: [[23986]],
		195061: [[38691]],
		195062: [[168261]],
		195063: [[168474]],
		195064: [[19054]],
		195065: [[19062]],
		195066: [[38880]],
		195067: [[168970]],
		195068: [[19122]],
		195069: [[169110]],
		195070: [[38923]],
		195071: [[38923]]
	},
	64000: {
		64000: [[20999]],
		64001: [[24230]],
		64002: [[25299]],
		64003: [[31958]],
		64004: [[23429]],
		64005: [[27934]],
		64006: [[26292]],
		64007: [[36667]],
		64008: [[34892]],
		64009: [[38477]],
		64010: [[35211]],
		64011: [[24275]],
		64012: [[20800]],
		64013: [[21952]],
		64016: [[22618]],
		64018: [[26228]],
		64021: [[20958]],
		64022: [[29482]],
		64023: [[30410]],
		64024: [[31036]],
		64025: [[31070]],
		64026: [[31077]],
		64027: [[31119]],
		64028: [[38742]],
		64029: [[31934]],
		64030: [[32701]],
		64032: [[34322]],
		64034: [[35576]],
		64037: [[36920]],
		64038: [[37117]],
		64042: [[39151]],
		64043: [[39164]],
		64044: [[39208]],
		64045: [[40372]],
		64046: [[37086]],
		64047: [[38583]],
		64048: [[20398]],
		64049: [[20711]],
		64050: [[20813]],
		64051: [[21193]],
		64052: [[21220]],
		64053: [[21329]],
		64054: [[21917]],
		64055: [[22022]],
		64056: [[22120]],
		64057: [[22592]],
		64058: [[22696]],
		64059: [[23652]],
		64060: [[23662]],
		64061: [[24724]],
		64062: [[24936]],
		64063: [[24974]],
		64064: [[25074]],
		64065: [[25935]],
		64066: [[26082]],
		64067: [[26257]],
		64068: [[26757]],
		64069: [[28023]],
		64070: [[28186]],
		64071: [[28450]],
		64072: [[29038]],
		64073: [[29227]],
		64074: [[29730]],
		64075: [[30865]],
		64076: [[31038]],
		64077: [[31049]],
		64078: [[31048]],
		64079: [[31056]],
		64080: [[31062]],
		64081: [[31069]],
		64082: [[31117]],
		64083: [[31118]],
		64084: [[31296]],
		64085: [[31361]],
		64086: [[31680]],
		64087: [[32244]],
		64088: [[32265]],
		64089: [[32321]],
		64090: [[32626]],
		64091: [[32773]],
		64092: [[33261]],
		64093: [[33401]],
		64094: [[33401]],
		64095: [[33879]],
		64096: [[35088]],
		64097: [[35222]],
		64098: [[35585]],
		64099: [[35641]],
		64100: [[36051]],
		64101: [[36104]],
		64102: [[36790]],
		64103: [[36920]],
		64104: [[38627]],
		64105: [[38911]],
		64106: [[38971]],
		64107: [[24693]],
		64108: [[148206]],
		64109: [[33304]],
		64112: [[20006]],
		64113: [[20917]],
		64114: [[20840]],
		64115: [[20352]],
		64116: [[20805]],
		64117: [[20864]],
		64118: [[21191]],
		64119: [[21242]],
		64120: [[21917]],
		64121: [[21845]],
		64122: [[21913]],
		64123: [[21986]],
		64124: [[22618]],
		64125: [[22707]],
		64126: [[22852]],
		64127: [[22868]],
		64128: [[23138]],
		64129: [[23336]],
		64130: [[24274]],
		64131: [[24281]],
		64132: [[24425]],
		64133: [[24493]],
		64134: [[24792]],
		64135: [[24910]],
		64136: [[24840]],
		64137: [[24974]],
		64138: [[24928]],
		64139: [[25074]],
		64140: [[25140]],
		64141: [[25540]],
		64142: [[25628]],
		64143: [[25682]],
		64144: [[25942]],
		64145: [[26228]],
		64146: [[26391]],
		64147: [[26395]],
		64148: [[26454]],
		64149: [[27513]],
		64150: [[27578]],
		64151: [[27969]],
		64152: [[28379]],
		64153: [[28363]],
		64154: [[28450]],
		64155: [[28702]],
		64156: [[29038]],
		64157: [[30631]],
		64158: [[29237]],
		64159: [[29359]],
		64160: [[29482]],
		64161: [[29809]],
		64162: [[29958]],
		64163: [[30011]],
		64164: [[30237]],
		64165: [[30239]],
		64166: [[30410]],
		64167: [[30427]],
		64168: [[30452]],
		64169: [[30538]],
		64170: [[30528]],
		64171: [[30924]],
		64172: [[31409]],
		64173: [[31680]],
		64174: [[31867]],
		64175: [[32091]],
		64176: [[32244]],
		64177: [[32574]],
		64178: [[32773]],
		64179: [[33618]],
		64180: [[33775]],
		64181: [[34681]],
		64182: [[35137]],
		64183: [[35206]],
		64184: [[35222]],
		64185: [[35519]],
		64186: [[35576]],
		64187: [[35531]],
		64188: [[35585]],
		64189: [[35582]],
		64190: [[35565]],
		64191: [[35641]],
		64192: [[35722]],
		64193: [[36104]],
		64194: [[36664]],
		64195: [[36978]],
		64196: [[37273]],
		64197: [[37494]],
		64198: [[38524]],
		64199: [[38627]],
		64200: [[38742]],
		64201: [[38875]],
		64202: [[38911]],
		64203: [[38923]],
		64204: [[38971]],
		64205: [[39698]],
		64206: [[40860]],
		64207: [[141386]],
		64208: [[141380]],
		64209: [[144341]],
		64210: [[15261]],
		64211: [[16408]],
		64212: [[16441]],
		64213: [[152137]],
		64214: [[154832]],
		64215: [[163539]],
		64216: [[40771]],
		64217: [[40846]],
		195072: [[38953]],
		195073: [[169398]],
		195074: [[39138]],
		195075: [[19251]],
		195076: [[39209]],
		195077: [[39335]],
		195078: [[39362]],
		195079: [[39422]],
		195080: [[19406]],
		195081: [[170800]],
		195082: [[39698]],
		195083: [[40000]],
		195084: [[40189]],
		195085: [[19662]],
		195086: [[19693]],
		195087: [[40295]],
		195088: [[172238]],
		195089: [[19704]],
		195090: [[172293]],
		195091: [[172558]],
		195092: [[172689]],
		195093: [[40635]],
		195094: [[19798]],
		195095: [[40697]],
		195096: [[40702]],
		195097: [[40709]],
		195098: [[40719]],
		195099: [[40726]],
		195100: [[40763]],
		195101: [[173568]]
	},
	64256: {
		64256: [[102, 102], 256],
		64257: [[102, 105], 256],
		64258: [[102, 108], 256],
		64259: [[102, 102, 105], 256],
		64260: [[102, 102, 108], 256],
		64261: [[383, 116], 256],
		64262: [[115, 116], 256],
		64275: [[1396, 1398], 256],
		64276: [[1396, 1381], 256],
		64277: [[1396, 1387], 256],
		64278: [[1406, 1398], 256],
		64279: [[1396, 1389], 256],
		64285: [[1497, 1460], 512],
		64286: [, 26],
		64287: [[1522, 1463], 512],
		64288: [[1506], 256],
		64289: [[1488], 256],
		64290: [[1491], 256],
		64291: [[1492], 256],
		64292: [[1499], 256],
		64293: [[1500], 256],
		64294: [[1501], 256],
		64295: [[1512], 256],
		64296: [[1514], 256],
		64297: [[43], 256],
		64298: [[1513, 1473], 512],
		64299: [[1513, 1474], 512],
		64300: [[64329, 1473], 512],
		64301: [[64329, 1474], 512],
		64302: [[1488, 1463], 512],
		64303: [[1488, 1464], 512],
		64304: [[1488, 1468], 512],
		64305: [[1489, 1468], 512],
		64306: [[1490, 1468], 512],
		64307: [[1491, 1468], 512],
		64308: [[1492, 1468], 512],
		64309: [[1493, 1468], 512],
		64310: [[1494, 1468], 512],
		64312: [[1496, 1468], 512],
		64313: [[1497, 1468], 512],
		64314: [[1498, 1468], 512],
		64315: [[1499, 1468], 512],
		64316: [[1500, 1468], 512],
		64318: [[1502, 1468], 512],
		64320: [[1504, 1468], 512],
		64321: [[1505, 1468], 512],
		64323: [[1507, 1468], 512],
		64324: [[1508, 1468], 512],
		64326: [[1510, 1468], 512],
		64327: [[1511, 1468], 512],
		64328: [[1512, 1468], 512],
		64329: [[1513, 1468], 512],
		64330: [[1514, 1468], 512],
		64331: [[1493, 1465], 512],
		64332: [[1489, 1471], 512],
		64333: [[1499, 1471], 512],
		64334: [[1508, 1471], 512],
		64335: [[1488, 1500], 256],
		64336: [[1649], 256],
		64337: [[1649], 256],
		64338: [[1659], 256],
		64339: [[1659], 256],
		64340: [[1659], 256],
		64341: [[1659], 256],
		64342: [[1662], 256],
		64343: [[1662], 256],
		64344: [[1662], 256],
		64345: [[1662], 256],
		64346: [[1664], 256],
		64347: [[1664], 256],
		64348: [[1664], 256],
		64349: [[1664], 256],
		64350: [[1658], 256],
		64351: [[1658], 256],
		64352: [[1658], 256],
		64353: [[1658], 256],
		64354: [[1663], 256],
		64355: [[1663], 256],
		64356: [[1663], 256],
		64357: [[1663], 256],
		64358: [[1657], 256],
		64359: [[1657], 256],
		64360: [[1657], 256],
		64361: [[1657], 256],
		64362: [[1700], 256],
		64363: [[1700], 256],
		64364: [[1700], 256],
		64365: [[1700], 256],
		64366: [[1702], 256],
		64367: [[1702], 256],
		64368: [[1702], 256],
		64369: [[1702], 256],
		64370: [[1668], 256],
		64371: [[1668], 256],
		64372: [[1668], 256],
		64373: [[1668], 256],
		64374: [[1667], 256],
		64375: [[1667], 256],
		64376: [[1667], 256],
		64377: [[1667], 256],
		64378: [[1670], 256],
		64379: [[1670], 256],
		64380: [[1670], 256],
		64381: [[1670], 256],
		64382: [[1671], 256],
		64383: [[1671], 256],
		64384: [[1671], 256],
		64385: [[1671], 256],
		64386: [[1677], 256],
		64387: [[1677], 256],
		64388: [[1676], 256],
		64389: [[1676], 256],
		64390: [[1678], 256],
		64391: [[1678], 256],
		64392: [[1672], 256],
		64393: [[1672], 256],
		64394: [[1688], 256],
		64395: [[1688], 256],
		64396: [[1681], 256],
		64397: [[1681], 256],
		64398: [[1705], 256],
		64399: [[1705], 256],
		64400: [[1705], 256],
		64401: [[1705], 256],
		64402: [[1711], 256],
		64403: [[1711], 256],
		64404: [[1711], 256],
		64405: [[1711], 256],
		64406: [[1715], 256],
		64407: [[1715], 256],
		64408: [[1715], 256],
		64409: [[1715], 256],
		64410: [[1713], 256],
		64411: [[1713], 256],
		64412: [[1713], 256],
		64413: [[1713], 256],
		64414: [[1722], 256],
		64415: [[1722], 256],
		64416: [[1723], 256],
		64417: [[1723], 256],
		64418: [[1723], 256],
		64419: [[1723], 256],
		64420: [[1728], 256],
		64421: [[1728], 256],
		64422: [[1729], 256],
		64423: [[1729], 256],
		64424: [[1729], 256],
		64425: [[1729], 256],
		64426: [[1726], 256],
		64427: [[1726], 256],
		64428: [[1726], 256],
		64429: [[1726], 256],
		64430: [[1746], 256],
		64431: [[1746], 256],
		64432: [[1747], 256],
		64433: [[1747], 256],
		64467: [[1709], 256],
		64468: [[1709], 256],
		64469: [[1709], 256],
		64470: [[1709], 256],
		64471: [[1735], 256],
		64472: [[1735], 256],
		64473: [[1734], 256],
		64474: [[1734], 256],
		64475: [[1736], 256],
		64476: [[1736], 256],
		64477: [[1655], 256],
		64478: [[1739], 256],
		64479: [[1739], 256],
		64480: [[1733], 256],
		64481: [[1733], 256],
		64482: [[1737], 256],
		64483: [[1737], 256],
		64484: [[1744], 256],
		64485: [[1744], 256],
		64486: [[1744], 256],
		64487: [[1744], 256],
		64488: [[1609], 256],
		64489: [[1609], 256],
		64490: [[1574, 1575], 256],
		64491: [[1574, 1575], 256],
		64492: [[1574, 1749], 256],
		64493: [[1574, 1749], 256],
		64494: [[1574, 1608], 256],
		64495: [[1574, 1608], 256],
		64496: [[1574, 1735], 256],
		64497: [[1574, 1735], 256],
		64498: [[1574, 1734], 256],
		64499: [[1574, 1734], 256],
		64500: [[1574, 1736], 256],
		64501: [[1574, 1736], 256],
		64502: [[1574, 1744], 256],
		64503: [[1574, 1744], 256],
		64504: [[1574, 1744], 256],
		64505: [[1574, 1609], 256],
		64506: [[1574, 1609], 256],
		64507: [[1574, 1609], 256],
		64508: [[1740], 256],
		64509: [[1740], 256],
		64510: [[1740], 256],
		64511: [[1740], 256]
	},
	64512: {
		64512: [[1574, 1580], 256],
		64513: [[1574, 1581], 256],
		64514: [[1574, 1605], 256],
		64515: [[1574, 1609], 256],
		64516: [[1574, 1610], 256],
		64517: [[1576, 1580], 256],
		64518: [[1576, 1581], 256],
		64519: [[1576, 1582], 256],
		64520: [[1576, 1605], 256],
		64521: [[1576, 1609], 256],
		64522: [[1576, 1610], 256],
		64523: [[1578, 1580], 256],
		64524: [[1578, 1581], 256],
		64525: [[1578, 1582], 256],
		64526: [[1578, 1605], 256],
		64527: [[1578, 1609], 256],
		64528: [[1578, 1610], 256],
		64529: [[1579, 1580], 256],
		64530: [[1579, 1605], 256],
		64531: [[1579, 1609], 256],
		64532: [[1579, 1610], 256],
		64533: [[1580, 1581], 256],
		64534: [[1580, 1605], 256],
		64535: [[1581, 1580], 256],
		64536: [[1581, 1605], 256],
		64537: [[1582, 1580], 256],
		64538: [[1582, 1581], 256],
		64539: [[1582, 1605], 256],
		64540: [[1587, 1580], 256],
		64541: [[1587, 1581], 256],
		64542: [[1587, 1582], 256],
		64543: [[1587, 1605], 256],
		64544: [[1589, 1581], 256],
		64545: [[1589, 1605], 256],
		64546: [[1590, 1580], 256],
		64547: [[1590, 1581], 256],
		64548: [[1590, 1582], 256],
		64549: [[1590, 1605], 256],
		64550: [[1591, 1581], 256],
		64551: [[1591, 1605], 256],
		64552: [[1592, 1605], 256],
		64553: [[1593, 1580], 256],
		64554: [[1593, 1605], 256],
		64555: [[1594, 1580], 256],
		64556: [[1594, 1605], 256],
		64557: [[1601, 1580], 256],
		64558: [[1601, 1581], 256],
		64559: [[1601, 1582], 256],
		64560: [[1601, 1605], 256],
		64561: [[1601, 1609], 256],
		64562: [[1601, 1610], 256],
		64563: [[1602, 1581], 256],
		64564: [[1602, 1605], 256],
		64565: [[1602, 1609], 256],
		64566: [[1602, 1610], 256],
		64567: [[1603, 1575], 256],
		64568: [[1603, 1580], 256],
		64569: [[1603, 1581], 256],
		64570: [[1603, 1582], 256],
		64571: [[1603, 1604], 256],
		64572: [[1603, 1605], 256],
		64573: [[1603, 1609], 256],
		64574: [[1603, 1610], 256],
		64575: [[1604, 1580], 256],
		64576: [[1604, 1581], 256],
		64577: [[1604, 1582], 256],
		64578: [[1604, 1605], 256],
		64579: [[1604, 1609], 256],
		64580: [[1604, 1610], 256],
		64581: [[1605, 1580], 256],
		64582: [[1605, 1581], 256],
		64583: [[1605, 1582], 256],
		64584: [[1605, 1605], 256],
		64585: [[1605, 1609], 256],
		64586: [[1605, 1610], 256],
		64587: [[1606, 1580], 256],
		64588: [[1606, 1581], 256],
		64589: [[1606, 1582], 256],
		64590: [[1606, 1605], 256],
		64591: [[1606, 1609], 256],
		64592: [[1606, 1610], 256],
		64593: [[1607, 1580], 256],
		64594: [[1607, 1605], 256],
		64595: [[1607, 1609], 256],
		64596: [[1607, 1610], 256],
		64597: [[1610, 1580], 256],
		64598: [[1610, 1581], 256],
		64599: [[1610, 1582], 256],
		64600: [[1610, 1605], 256],
		64601: [[1610, 1609], 256],
		64602: [[1610, 1610], 256],
		64603: [[1584, 1648], 256],
		64604: [[1585, 1648], 256],
		64605: [[1609, 1648], 256],
		64606: [[32, 1612, 1617], 256],
		64607: [[32, 1613, 1617], 256],
		64608: [[32, 1614, 1617], 256],
		64609: [[32, 1615, 1617], 256],
		64610: [[32, 1616, 1617], 256],
		64611: [[32, 1617, 1648], 256],
		64612: [[1574, 1585], 256],
		64613: [[1574, 1586], 256],
		64614: [[1574, 1605], 256],
		64615: [[1574, 1606], 256],
		64616: [[1574, 1609], 256],
		64617: [[1574, 1610], 256],
		64618: [[1576, 1585], 256],
		64619: [[1576, 1586], 256],
		64620: [[1576, 1605], 256],
		64621: [[1576, 1606], 256],
		64622: [[1576, 1609], 256],
		64623: [[1576, 1610], 256],
		64624: [[1578, 1585], 256],
		64625: [[1578, 1586], 256],
		64626: [[1578, 1605], 256],
		64627: [[1578, 1606], 256],
		64628: [[1578, 1609], 256],
		64629: [[1578, 1610], 256],
		64630: [[1579, 1585], 256],
		64631: [[1579, 1586], 256],
		64632: [[1579, 1605], 256],
		64633: [[1579, 1606], 256],
		64634: [[1579, 1609], 256],
		64635: [[1579, 1610], 256],
		64636: [[1601, 1609], 256],
		64637: [[1601, 1610], 256],
		64638: [[1602, 1609], 256],
		64639: [[1602, 1610], 256],
		64640: [[1603, 1575], 256],
		64641: [[1603, 1604], 256],
		64642: [[1603, 1605], 256],
		64643: [[1603, 1609], 256],
		64644: [[1603, 1610], 256],
		64645: [[1604, 1605], 256],
		64646: [[1604, 1609], 256],
		64647: [[1604, 1610], 256],
		64648: [[1605, 1575], 256],
		64649: [[1605, 1605], 256],
		64650: [[1606, 1585], 256],
		64651: [[1606, 1586], 256],
		64652: [[1606, 1605], 256],
		64653: [[1606, 1606], 256],
		64654: [[1606, 1609], 256],
		64655: [[1606, 1610], 256],
		64656: [[1609, 1648], 256],
		64657: [[1610, 1585], 256],
		64658: [[1610, 1586], 256],
		64659: [[1610, 1605], 256],
		64660: [[1610, 1606], 256],
		64661: [[1610, 1609], 256],
		64662: [[1610, 1610], 256],
		64663: [[1574, 1580], 256],
		64664: [[1574, 1581], 256],
		64665: [[1574, 1582], 256],
		64666: [[1574, 1605], 256],
		64667: [[1574, 1607], 256],
		64668: [[1576, 1580], 256],
		64669: [[1576, 1581], 256],
		64670: [[1576, 1582], 256],
		64671: [[1576, 1605], 256],
		64672: [[1576, 1607], 256],
		64673: [[1578, 1580], 256],
		64674: [[1578, 1581], 256],
		64675: [[1578, 1582], 256],
		64676: [[1578, 1605], 256],
		64677: [[1578, 1607], 256],
		64678: [[1579, 1605], 256],
		64679: [[1580, 1581], 256],
		64680: [[1580, 1605], 256],
		64681: [[1581, 1580], 256],
		64682: [[1581, 1605], 256],
		64683: [[1582, 1580], 256],
		64684: [[1582, 1605], 256],
		64685: [[1587, 1580], 256],
		64686: [[1587, 1581], 256],
		64687: [[1587, 1582], 256],
		64688: [[1587, 1605], 256],
		64689: [[1589, 1581], 256],
		64690: [[1589, 1582], 256],
		64691: [[1589, 1605], 256],
		64692: [[1590, 1580], 256],
		64693: [[1590, 1581], 256],
		64694: [[1590, 1582], 256],
		64695: [[1590, 1605], 256],
		64696: [[1591, 1581], 256],
		64697: [[1592, 1605], 256],
		64698: [[1593, 1580], 256],
		64699: [[1593, 1605], 256],
		64700: [[1594, 1580], 256],
		64701: [[1594, 1605], 256],
		64702: [[1601, 1580], 256],
		64703: [[1601, 1581], 256],
		64704: [[1601, 1582], 256],
		64705: [[1601, 1605], 256],
		64706: [[1602, 1581], 256],
		64707: [[1602, 1605], 256],
		64708: [[1603, 1580], 256],
		64709: [[1603, 1581], 256],
		64710: [[1603, 1582], 256],
		64711: [[1603, 1604], 256],
		64712: [[1603, 1605], 256],
		64713: [[1604, 1580], 256],
		64714: [[1604, 1581], 256],
		64715: [[1604, 1582], 256],
		64716: [[1604, 1605], 256],
		64717: [[1604, 1607], 256],
		64718: [[1605, 1580], 256],
		64719: [[1605, 1581], 256],
		64720: [[1605, 1582], 256],
		64721: [[1605, 1605], 256],
		64722: [[1606, 1580], 256],
		64723: [[1606, 1581], 256],
		64724: [[1606, 1582], 256],
		64725: [[1606, 1605], 256],
		64726: [[1606, 1607], 256],
		64727: [[1607, 1580], 256],
		64728: [[1607, 1605], 256],
		64729: [[1607, 1648], 256],
		64730: [[1610, 1580], 256],
		64731: [[1610, 1581], 256],
		64732: [[1610, 1582], 256],
		64733: [[1610, 1605], 256],
		64734: [[1610, 1607], 256],
		64735: [[1574, 1605], 256],
		64736: [[1574, 1607], 256],
		64737: [[1576, 1605], 256],
		64738: [[1576, 1607], 256],
		64739: [[1578, 1605], 256],
		64740: [[1578, 1607], 256],
		64741: [[1579, 1605], 256],
		64742: [[1579, 1607], 256],
		64743: [[1587, 1605], 256],
		64744: [[1587, 1607], 256],
		64745: [[1588, 1605], 256],
		64746: [[1588, 1607], 256],
		64747: [[1603, 1604], 256],
		64748: [[1603, 1605], 256],
		64749: [[1604, 1605], 256],
		64750: [[1606, 1605], 256],
		64751: [[1606, 1607], 256],
		64752: [[1610, 1605], 256],
		64753: [[1610, 1607], 256],
		64754: [[1600, 1614, 1617], 256],
		64755: [[1600, 1615, 1617], 256],
		64756: [[1600, 1616, 1617], 256],
		64757: [[1591, 1609], 256],
		64758: [[1591, 1610], 256],
		64759: [[1593, 1609], 256],
		64760: [[1593, 1610], 256],
		64761: [[1594, 1609], 256],
		64762: [[1594, 1610], 256],
		64763: [[1587, 1609], 256],
		64764: [[1587, 1610], 256],
		64765: [[1588, 1609], 256],
		64766: [[1588, 1610], 256],
		64767: [[1581, 1609], 256]
	},
	64768: {
		64768: [[1581, 1610], 256],
		64769: [[1580, 1609], 256],
		64770: [[1580, 1610], 256],
		64771: [[1582, 1609], 256],
		64772: [[1582, 1610], 256],
		64773: [[1589, 1609], 256],
		64774: [[1589, 1610], 256],
		64775: [[1590, 1609], 256],
		64776: [[1590, 1610], 256],
		64777: [[1588, 1580], 256],
		64778: [[1588, 1581], 256],
		64779: [[1588, 1582], 256],
		64780: [[1588, 1605], 256],
		64781: [[1588, 1585], 256],
		64782: [[1587, 1585], 256],
		64783: [[1589, 1585], 256],
		64784: [[1590, 1585], 256],
		64785: [[1591, 1609], 256],
		64786: [[1591, 1610], 256],
		64787: [[1593, 1609], 256],
		64788: [[1593, 1610], 256],
		64789: [[1594, 1609], 256],
		64790: [[1594, 1610], 256],
		64791: [[1587, 1609], 256],
		64792: [[1587, 1610], 256],
		64793: [[1588, 1609], 256],
		64794: [[1588, 1610], 256],
		64795: [[1581, 1609], 256],
		64796: [[1581, 1610], 256],
		64797: [[1580, 1609], 256],
		64798: [[1580, 1610], 256],
		64799: [[1582, 1609], 256],
		64800: [[1582, 1610], 256],
		64801: [[1589, 1609], 256],
		64802: [[1589, 1610], 256],
		64803: [[1590, 1609], 256],
		64804: [[1590, 1610], 256],
		64805: [[1588, 1580], 256],
		64806: [[1588, 1581], 256],
		64807: [[1588, 1582], 256],
		64808: [[1588, 1605], 256],
		64809: [[1588, 1585], 256],
		64810: [[1587, 1585], 256],
		64811: [[1589, 1585], 256],
		64812: [[1590, 1585], 256],
		64813: [[1588, 1580], 256],
		64814: [[1588, 1581], 256],
		64815: [[1588, 1582], 256],
		64816: [[1588, 1605], 256],
		64817: [[1587, 1607], 256],
		64818: [[1588, 1607], 256],
		64819: [[1591, 1605], 256],
		64820: [[1587, 1580], 256],
		64821: [[1587, 1581], 256],
		64822: [[1587, 1582], 256],
		64823: [[1588, 1580], 256],
		64824: [[1588, 1581], 256],
		64825: [[1588, 1582], 256],
		64826: [[1591, 1605], 256],
		64827: [[1592, 1605], 256],
		64828: [[1575, 1611], 256],
		64829: [[1575, 1611], 256],
		64848: [[1578, 1580, 1605], 256],
		64849: [[1578, 1581, 1580], 256],
		64850: [[1578, 1581, 1580], 256],
		64851: [[1578, 1581, 1605], 256],
		64852: [[1578, 1582, 1605], 256],
		64853: [[1578, 1605, 1580], 256],
		64854: [[1578, 1605, 1581], 256],
		64855: [[1578, 1605, 1582], 256],
		64856: [[1580, 1605, 1581], 256],
		64857: [[1580, 1605, 1581], 256],
		64858: [[1581, 1605, 1610], 256],
		64859: [[1581, 1605, 1609], 256],
		64860: [[1587, 1581, 1580], 256],
		64861: [[1587, 1580, 1581], 256],
		64862: [[1587, 1580, 1609], 256],
		64863: [[1587, 1605, 1581], 256],
		64864: [[1587, 1605, 1581], 256],
		64865: [[1587, 1605, 1580], 256],
		64866: [[1587, 1605, 1605], 256],
		64867: [[1587, 1605, 1605], 256],
		64868: [[1589, 1581, 1581], 256],
		64869: [[1589, 1581, 1581], 256],
		64870: [[1589, 1605, 1605], 256],
		64871: [[1588, 1581, 1605], 256],
		64872: [[1588, 1581, 1605], 256],
		64873: [[1588, 1580, 1610], 256],
		64874: [[1588, 1605, 1582], 256],
		64875: [[1588, 1605, 1582], 256],
		64876: [[1588, 1605, 1605], 256],
		64877: [[1588, 1605, 1605], 256],
		64878: [[1590, 1581, 1609], 256],
		64879: [[1590, 1582, 1605], 256],
		64880: [[1590, 1582, 1605], 256],
		64881: [[1591, 1605, 1581], 256],
		64882: [[1591, 1605, 1581], 256],
		64883: [[1591, 1605, 1605], 256],
		64884: [[1591, 1605, 1610], 256],
		64885: [[1593, 1580, 1605], 256],
		64886: [[1593, 1605, 1605], 256],
		64887: [[1593, 1605, 1605], 256],
		64888: [[1593, 1605, 1609], 256],
		64889: [[1594, 1605, 1605], 256],
		64890: [[1594, 1605, 1610], 256],
		64891: [[1594, 1605, 1609], 256],
		64892: [[1601, 1582, 1605], 256],
		64893: [[1601, 1582, 1605], 256],
		64894: [[1602, 1605, 1581], 256],
		64895: [[1602, 1605, 1605], 256],
		64896: [[1604, 1581, 1605], 256],
		64897: [[1604, 1581, 1610], 256],
		64898: [[1604, 1581, 1609], 256],
		64899: [[1604, 1580, 1580], 256],
		64900: [[1604, 1580, 1580], 256],
		64901: [[1604, 1582, 1605], 256],
		64902: [[1604, 1582, 1605], 256],
		64903: [[1604, 1605, 1581], 256],
		64904: [[1604, 1605, 1581], 256],
		64905: [[1605, 1581, 1580], 256],
		64906: [[1605, 1581, 1605], 256],
		64907: [[1605, 1581, 1610], 256],
		64908: [[1605, 1580, 1581], 256],
		64909: [[1605, 1580, 1605], 256],
		64910: [[1605, 1582, 1580], 256],
		64911: [[1605, 1582, 1605], 256],
		64914: [[1605, 1580, 1582], 256],
		64915: [[1607, 1605, 1580], 256],
		64916: [[1607, 1605, 1605], 256],
		64917: [[1606, 1581, 1605], 256],
		64918: [[1606, 1581, 1609], 256],
		64919: [[1606, 1580, 1605], 256],
		64920: [[1606, 1580, 1605], 256],
		64921: [[1606, 1580, 1609], 256],
		64922: [[1606, 1605, 1610], 256],
		64923: [[1606, 1605, 1609], 256],
		64924: [[1610, 1605, 1605], 256],
		64925: [[1610, 1605, 1605], 256],
		64926: [[1576, 1582, 1610], 256],
		64927: [[1578, 1580, 1610], 256],
		64928: [[1578, 1580, 1609], 256],
		64929: [[1578, 1582, 1610], 256],
		64930: [[1578, 1582, 1609], 256],
		64931: [[1578, 1605, 1610], 256],
		64932: [[1578, 1605, 1609], 256],
		64933: [[1580, 1605, 1610], 256],
		64934: [[1580, 1581, 1609], 256],
		64935: [[1580, 1605, 1609], 256],
		64936: [[1587, 1582, 1609], 256],
		64937: [[1589, 1581, 1610], 256],
		64938: [[1588, 1581, 1610], 256],
		64939: [[1590, 1581, 1610], 256],
		64940: [[1604, 1580, 1610], 256],
		64941: [[1604, 1605, 1610], 256],
		64942: [[1610, 1581, 1610], 256],
		64943: [[1610, 1580, 1610], 256],
		64944: [[1610, 1605, 1610], 256],
		64945: [[1605, 1605, 1610], 256],
		64946: [[1602, 1605, 1610], 256],
		64947: [[1606, 1581, 1610], 256],
		64948: [[1602, 1605, 1581], 256],
		64949: [[1604, 1581, 1605], 256],
		64950: [[1593, 1605, 1610], 256],
		64951: [[1603, 1605, 1610], 256],
		64952: [[1606, 1580, 1581], 256],
		64953: [[1605, 1582, 1610], 256],
		64954: [[1604, 1580, 1605], 256],
		64955: [[1603, 1605, 1605], 256],
		64956: [[1604, 1580, 1605], 256],
		64957: [[1606, 1580, 1581], 256],
		64958: [[1580, 1581, 1610], 256],
		64959: [[1581, 1580, 1610], 256],
		64960: [[1605, 1580, 1610], 256],
		64961: [[1601, 1605, 1610], 256],
		64962: [[1576, 1581, 1610], 256],
		64963: [[1603, 1605, 1605], 256],
		64964: [[1593, 1580, 1605], 256],
		64965: [[1589, 1605, 1605], 256],
		64966: [[1587, 1582, 1610], 256],
		64967: [[1606, 1580, 1610], 256],
		65008: [[1589, 1604, 1746], 256],
		65009: [[1602, 1604, 1746], 256],
		65010: [[1575, 1604, 1604, 1607], 256],
		65011: [[1575, 1603, 1576, 1585], 256],
		65012: [[1605, 1581, 1605, 1583], 256],
		65013: [[1589, 1604, 1593, 1605], 256],
		65014: [[1585, 1587, 1608, 1604], 256],
		65015: [[1593, 1604, 1610, 1607], 256],
		65016: [[1608, 1587, 1604, 1605], 256],
		65017: [[1589, 1604, 1609], 256],
		65018: [
			[
				1589, 1604, 1609, 32, 1575, 1604, 1604, 1607, 32, 1593, 1604, 1610, 1607, 32, 1608,
				1587, 1604, 1605
			],
			256
		],
		65019: [[1580, 1604, 32, 1580, 1604, 1575, 1604, 1607], 256],
		65020: [[1585, 1740, 1575, 1604], 256]
	},
	65024: {
		65040: [[44], 256],
		65041: [[12289], 256],
		65042: [[12290], 256],
		65043: [[58], 256],
		65044: [[59], 256],
		65045: [[33], 256],
		65046: [[63], 256],
		65047: [[12310], 256],
		65048: [[12311], 256],
		65049: [[8230], 256],
		65056: [, 230],
		65057: [, 230],
		65058: [, 230],
		65059: [, 230],
		65060: [, 230],
		65061: [, 230],
		65062: [, 230],
		65072: [[8229], 256],
		65073: [[8212], 256],
		65074: [[8211], 256],
		65075: [[95], 256],
		65076: [[95], 256],
		65077: [[40], 256],
		65078: [[41], 256],
		65079: [[123], 256],
		65080: [[125], 256],
		65081: [[12308], 256],
		65082: [[12309], 256],
		65083: [[12304], 256],
		65084: [[12305], 256],
		65085: [[12298], 256],
		65086: [[12299], 256],
		65087: [[12296], 256],
		65088: [[12297], 256],
		65089: [[12300], 256],
		65090: [[12301], 256],
		65091: [[12302], 256],
		65092: [[12303], 256],
		65095: [[91], 256],
		65096: [[93], 256],
		65097: [[8254], 256],
		65098: [[8254], 256],
		65099: [[8254], 256],
		65100: [[8254], 256],
		65101: [[95], 256],
		65102: [[95], 256],
		65103: [[95], 256],
		65104: [[44], 256],
		65105: [[12289], 256],
		65106: [[46], 256],
		65108: [[59], 256],
		65109: [[58], 256],
		65110: [[63], 256],
		65111: [[33], 256],
		65112: [[8212], 256],
		65113: [[40], 256],
		65114: [[41], 256],
		65115: [[123], 256],
		65116: [[125], 256],
		65117: [[12308], 256],
		65118: [[12309], 256],
		65119: [[35], 256],
		65120: [[38], 256],
		65121: [[42], 256],
		65122: [[43], 256],
		65123: [[45], 256],
		65124: [[60], 256],
		65125: [[62], 256],
		65126: [[61], 256],
		65128: [[92], 256],
		65129: [[36], 256],
		65130: [[37], 256],
		65131: [[64], 256],
		65136: [[32, 1611], 256],
		65137: [[1600, 1611], 256],
		65138: [[32, 1612], 256],
		65140: [[32, 1613], 256],
		65142: [[32, 1614], 256],
		65143: [[1600, 1614], 256],
		65144: [[32, 1615], 256],
		65145: [[1600, 1615], 256],
		65146: [[32, 1616], 256],
		65147: [[1600, 1616], 256],
		65148: [[32, 1617], 256],
		65149: [[1600, 1617], 256],
		65150: [[32, 1618], 256],
		65151: [[1600, 1618], 256],
		65152: [[1569], 256],
		65153: [[1570], 256],
		65154: [[1570], 256],
		65155: [[1571], 256],
		65156: [[1571], 256],
		65157: [[1572], 256],
		65158: [[1572], 256],
		65159: [[1573], 256],
		65160: [[1573], 256],
		65161: [[1574], 256],
		65162: [[1574], 256],
		65163: [[1574], 256],
		65164: [[1574], 256],
		65165: [[1575], 256],
		65166: [[1575], 256],
		65167: [[1576], 256],
		65168: [[1576], 256],
		65169: [[1576], 256],
		65170: [[1576], 256],
		65171: [[1577], 256],
		65172: [[1577], 256],
		65173: [[1578], 256],
		65174: [[1578], 256],
		65175: [[1578], 256],
		65176: [[1578], 256],
		65177: [[1579], 256],
		65178: [[1579], 256],
		65179: [[1579], 256],
		65180: [[1579], 256],
		65181: [[1580], 256],
		65182: [[1580], 256],
		65183: [[1580], 256],
		65184: [[1580], 256],
		65185: [[1581], 256],
		65186: [[1581], 256],
		65187: [[1581], 256],
		65188: [[1581], 256],
		65189: [[1582], 256],
		65190: [[1582], 256],
		65191: [[1582], 256],
		65192: [[1582], 256],
		65193: [[1583], 256],
		65194: [[1583], 256],
		65195: [[1584], 256],
		65196: [[1584], 256],
		65197: [[1585], 256],
		65198: [[1585], 256],
		65199: [[1586], 256],
		65200: [[1586], 256],
		65201: [[1587], 256],
		65202: [[1587], 256],
		65203: [[1587], 256],
		65204: [[1587], 256],
		65205: [[1588], 256],
		65206: [[1588], 256],
		65207: [[1588], 256],
		65208: [[1588], 256],
		65209: [[1589], 256],
		65210: [[1589], 256],
		65211: [[1589], 256],
		65212: [[1589], 256],
		65213: [[1590], 256],
		65214: [[1590], 256],
		65215: [[1590], 256],
		65216: [[1590], 256],
		65217: [[1591], 256],
		65218: [[1591], 256],
		65219: [[1591], 256],
		65220: [[1591], 256],
		65221: [[1592], 256],
		65222: [[1592], 256],
		65223: [[1592], 256],
		65224: [[1592], 256],
		65225: [[1593], 256],
		65226: [[1593], 256],
		65227: [[1593], 256],
		65228: [[1593], 256],
		65229: [[1594], 256],
		65230: [[1594], 256],
		65231: [[1594], 256],
		65232: [[1594], 256],
		65233: [[1601], 256],
		65234: [[1601], 256],
		65235: [[1601], 256],
		65236: [[1601], 256],
		65237: [[1602], 256],
		65238: [[1602], 256],
		65239: [[1602], 256],
		65240: [[1602], 256],
		65241: [[1603], 256],
		65242: [[1603], 256],
		65243: [[1603], 256],
		65244: [[1603], 256],
		65245: [[1604], 256],
		65246: [[1604], 256],
		65247: [[1604], 256],
		65248: [[1604], 256],
		65249: [[1605], 256],
		65250: [[1605], 256],
		65251: [[1605], 256],
		65252: [[1605], 256],
		65253: [[1606], 256],
		65254: [[1606], 256],
		65255: [[1606], 256],
		65256: [[1606], 256],
		65257: [[1607], 256],
		65258: [[1607], 256],
		65259: [[1607], 256],
		65260: [[1607], 256],
		65261: [[1608], 256],
		65262: [[1608], 256],
		65263: [[1609], 256],
		65264: [[1609], 256],
		65265: [[1610], 256],
		65266: [[1610], 256],
		65267: [[1610], 256],
		65268: [[1610], 256],
		65269: [[1604, 1570], 256],
		65270: [[1604, 1570], 256],
		65271: [[1604, 1571], 256],
		65272: [[1604, 1571], 256],
		65273: [[1604, 1573], 256],
		65274: [[1604, 1573], 256],
		65275: [[1604, 1575], 256],
		65276: [[1604, 1575], 256]
	},
	65280: {
		65281: [[33], 256],
		65282: [[34], 256],
		65283: [[35], 256],
		65284: [[36], 256],
		65285: [[37], 256],
		65286: [[38], 256],
		65287: [[39], 256],
		65288: [[40], 256],
		65289: [[41], 256],
		65290: [[42], 256],
		65291: [[43], 256],
		65292: [[44], 256],
		65293: [[45], 256],
		65294: [[46], 256],
		65295: [[47], 256],
		65296: [[48], 256],
		65297: [[49], 256],
		65298: [[50], 256],
		65299: [[51], 256],
		65300: [[52], 256],
		65301: [[53], 256],
		65302: [[54], 256],
		65303: [[55], 256],
		65304: [[56], 256],
		65305: [[57], 256],
		65306: [[58], 256],
		65307: [[59], 256],
		65308: [[60], 256],
		65309: [[61], 256],
		65310: [[62], 256],
		65311: [[63], 256],
		65312: [[64], 256],
		65313: [[65], 256],
		65314: [[66], 256],
		65315: [[67], 256],
		65316: [[68], 256],
		65317: [[69], 256],
		65318: [[70], 256],
		65319: [[71], 256],
		65320: [[72], 256],
		65321: [[73], 256],
		65322: [[74], 256],
		65323: [[75], 256],
		65324: [[76], 256],
		65325: [[77], 256],
		65326: [[78], 256],
		65327: [[79], 256],
		65328: [[80], 256],
		65329: [[81], 256],
		65330: [[82], 256],
		65331: [[83], 256],
		65332: [[84], 256],
		65333: [[85], 256],
		65334: [[86], 256],
		65335: [[87], 256],
		65336: [[88], 256],
		65337: [[89], 256],
		65338: [[90], 256],
		65339: [[91], 256],
		65340: [[92], 256],
		65341: [[93], 256],
		65342: [[94], 256],
		65343: [[95], 256],
		65344: [[96], 256],
		65345: [[97], 256],
		65346: [[98], 256],
		65347: [[99], 256],
		65348: [[100], 256],
		65349: [[101], 256],
		65350: [[102], 256],
		65351: [[103], 256],
		65352: [[104], 256],
		65353: [[105], 256],
		65354: [[106], 256],
		65355: [[107], 256],
		65356: [[108], 256],
		65357: [[109], 256],
		65358: [[110], 256],
		65359: [[111], 256],
		65360: [[112], 256],
		65361: [[113], 256],
		65362: [[114], 256],
		65363: [[115], 256],
		65364: [[116], 256],
		65365: [[117], 256],
		65366: [[118], 256],
		65367: [[119], 256],
		65368: [[120], 256],
		65369: [[121], 256],
		65370: [[122], 256],
		65371: [[123], 256],
		65372: [[124], 256],
		65373: [[125], 256],
		65374: [[126], 256],
		65375: [[10629], 256],
		65376: [[10630], 256],
		65377: [[12290], 256],
		65378: [[12300], 256],
		65379: [[12301], 256],
		65380: [[12289], 256],
		65381: [[12539], 256],
		65382: [[12530], 256],
		65383: [[12449], 256],
		65384: [[12451], 256],
		65385: [[12453], 256],
		65386: [[12455], 256],
		65387: [[12457], 256],
		65388: [[12515], 256],
		65389: [[12517], 256],
		65390: [[12519], 256],
		65391: [[12483], 256],
		65392: [[12540], 256],
		65393: [[12450], 256],
		65394: [[12452], 256],
		65395: [[12454], 256],
		65396: [[12456], 256],
		65397: [[12458], 256],
		65398: [[12459], 256],
		65399: [[12461], 256],
		65400: [[12463], 256],
		65401: [[12465], 256],
		65402: [[12467], 256],
		65403: [[12469], 256],
		65404: [[12471], 256],
		65405: [[12473], 256],
		65406: [[12475], 256],
		65407: [[12477], 256],
		65408: [[12479], 256],
		65409: [[12481], 256],
		65410: [[12484], 256],
		65411: [[12486], 256],
		65412: [[12488], 256],
		65413: [[12490], 256],
		65414: [[12491], 256],
		65415: [[12492], 256],
		65416: [[12493], 256],
		65417: [[12494], 256],
		65418: [[12495], 256],
		65419: [[12498], 256],
		65420: [[12501], 256],
		65421: [[12504], 256],
		65422: [[12507], 256],
		65423: [[12510], 256],
		65424: [[12511], 256],
		65425: [[12512], 256],
		65426: [[12513], 256],
		65427: [[12514], 256],
		65428: [[12516], 256],
		65429: [[12518], 256],
		65430: [[12520], 256],
		65431: [[12521], 256],
		65432: [[12522], 256],
		65433: [[12523], 256],
		65434: [[12524], 256],
		65435: [[12525], 256],
		65436: [[12527], 256],
		65437: [[12531], 256],
		65438: [[12441], 256],
		65439: [[12442], 256],
		65440: [[12644], 256],
		65441: [[12593], 256],
		65442: [[12594], 256],
		65443: [[12595], 256],
		65444: [[12596], 256],
		65445: [[12597], 256],
		65446: [[12598], 256],
		65447: [[12599], 256],
		65448: [[12600], 256],
		65449: [[12601], 256],
		65450: [[12602], 256],
		65451: [[12603], 256],
		65452: [[12604], 256],
		65453: [[12605], 256],
		65454: [[12606], 256],
		65455: [[12607], 256],
		65456: [[12608], 256],
		65457: [[12609], 256],
		65458: [[12610], 256],
		65459: [[12611], 256],
		65460: [[12612], 256],
		65461: [[12613], 256],
		65462: [[12614], 256],
		65463: [[12615], 256],
		65464: [[12616], 256],
		65465: [[12617], 256],
		65466: [[12618], 256],
		65467: [[12619], 256],
		65468: [[12620], 256],
		65469: [[12621], 256],
		65470: [[12622], 256],
		65474: [[12623], 256],
		65475: [[12624], 256],
		65476: [[12625], 256],
		65477: [[12626], 256],
		65478: [[12627], 256],
		65479: [[12628], 256],
		65482: [[12629], 256],
		65483: [[12630], 256],
		65484: [[12631], 256],
		65485: [[12632], 256],
		65486: [[12633], 256],
		65487: [[12634], 256],
		65490: [[12635], 256],
		65491: [[12636], 256],
		65492: [[12637], 256],
		65493: [[12638], 256],
		65494: [[12639], 256],
		65495: [[12640], 256],
		65498: [[12641], 256],
		65499: [[12642], 256],
		65500: [[12643], 256],
		65504: [[162], 256],
		65505: [[163], 256],
		65506: [[172], 256],
		65507: [[175], 256],
		65508: [[166], 256],
		65509: [[165], 256],
		65510: [[8361], 256],
		65512: [[9474], 256],
		65513: [[8592], 256],
		65514: [[8593], 256],
		65515: [[8594], 256],
		65516: [[8595], 256],
		65517: [[9632], 256],
		65518: [[9675], 256]
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952645, function(require, module, exports) {


var indexOf = String.prototype.indexOf, slice = String.prototype.slice;

module.exports = function (search, replace) {
	var index = indexOf.call(this, search);
	if (index === -1) return String(this);
	return slice.call(this, 0, index) + replace + slice.call(this, index + String(search).length);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952646, function(require, module, exports) {


var value = require("../../object/valid-value");

module.exports = function (search, replace) {
	var index, pos = 0, str = String(value(this)), sl, rl;
	search = String(search);
	replace = String(replace);
	sl = search.length;
	rl = replace.length;
	while ((index = str.indexOf(search, pos)) !== -1) {
		str = str.slice(0, index) + replace + str.slice(index + sl);
		pos = index + rl;
	}
	return str;
};

}, function(modId) { var map = {"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952647, function(require, module, exports) {


module.exports = require("./is-implemented")() ? String.prototype.startsWith : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952648,"./shim":1629437952649}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952648, function(require, module, exports) {


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.startsWith !== "function") return false;
	return str.startsWith("trzy") === false && str.startsWith("raz") === true;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952649, function(require, module, exports) {


var value     = require("../../../object/valid-value")
  , toInteger = require("../../../number/to-integer")
  , max       = Math.max
  , min       = Math.min;

module.exports = function (searchString/*, position*/) {
	var start, self = String(value(this));
	start = min(max(toInteger(arguments[1]), 0), self.length);
	return self.indexOf(searchString, start) === start;
};

}, function(modId) { var map = {"../../../object/valid-value":1629437952320,"../../../number/to-integer":1629437952315}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952650, function(require, module, exports) {


var ensureStringifiable = require("../../object/validate-stringifiable-value");

module.exports = function () {
	var str = ensureStringifiable(this);
	return str.charAt(0).toLowerCase() + str.slice(1);
};

}, function(modId) { var map = {"../../object/validate-stringifiable-value":1629437952594}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952651, function(require, module, exports) {


module.exports = require("./is-implemented")() ? String.fromCodePoint : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952652,"./shim":1629437952653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952652, function(require, module, exports) {


module.exports = function () {
	var fromCodePoint = String.fromCodePoint;
	if (typeof fromCodePoint !== "function") return false;
	return fromCodePoint(0x1d306, 0x61, 0x1d307) === "\ud834\udf06a\ud834\udf07";
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952653, function(require, module, exports) {
// Based on:
// http://norbertlindenberg.com/2012/05/ecmascript-supplementary-characters/
// and:
// https://github.com/mathiasbynens/String.fromCodePoint/blob/master
// /fromcodepoint.js



var floor = Math.floor, fromCharCode = String.fromCharCode;

// eslint-disable-next-line no-unused-vars
module.exports = function (codePoint1/*, …codePoints*/) {
	var chars = [], length = arguments.length, i, codePoint, result = "";
	for (i = 0; i < length; ++i) {
		codePoint = Number(arguments[i]);
		if (
			!isFinite(codePoint) ||
			codePoint < 0 ||
			codePoint > 0x10ffff ||
			floor(codePoint) !== codePoint
		) {
			throw new RangeError("Invalid code point " + codePoint);
		}

		if (codePoint < 0x10000) {
			chars.push(codePoint);
		} else {
			codePoint -= 0x10000;
			// eslint-disable-next-line no-bitwise
			chars.push((codePoint >> 10) + 0xd800, (codePoint % 0x400) + 0xdc00);
		}
		if (i + 1 !== length && chars.length <= 0x4000) continue;
		result += fromCharCode.apply(null, chars);
		chars.length = 0;
	}
	return result;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952654, function(require, module, exports) {


var isValue         = require("../object/is-value")
  , toNaturalNumber = require("../number/to-pos-integer");

var generated = Object.create(null), random = Math.random, uniqTryLimit = 100;

var getChunk = function () { return random().toString(36).slice(2); };

var getString = function (/* length */) {
	var str = getChunk(), length = arguments[0];
	if (!isValue(length)) return str;
	while (str.length < length) str += getChunk();
	return str.slice(0, length);
};

module.exports = function (/* options */) {
	var options = Object(arguments[0]), length = options.length, isUnique = options.isUnique;

	if (isValue(length)) length = toNaturalNumber(length);

	var str = getString(length);
	if (isUnique) {
		var count = 0;
		while (generated[str]) {
			if (++count === uniqTryLimit) {
				throw new Error(
					"Cannot generate random string.\n" +
						"String.random is not designed to effectively generate many short and " +
						"unique random strings"
				);
			}
			str = getString(length);
		}
		generated[str] = true;
	}
	return str;
};

}, function(modId) { var map = {"../object/is-value":1629437952302,"../number/to-pos-integer":1629437952314}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952655, function(require, module, exports) {


var generated = Object.create(null), random = Math.random;

module.exports = function () {
	var str;
	do {
		str = random().toString(36).slice(2);
	} while (generated[str]);
	return str;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952656, function(require, module, exports) {


module.exports = require("./is-implemented")() ? String.raw : require("./shim");

}, function(modId) { var map = {"./is-implemented":1629437952657,"./shim":1629437952658}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952657, function(require, module, exports) {


module.exports = function () {
	var raw = String.raw, test;
	if (typeof raw !== "function") return false;
	test = ["foo\nbar", "marko\n"];
	test.raw = ["foo\\nbar", "marko\\n"];
	return raw(test, "INSE\nRT") === "foo\\nbarINSE\nRTmarko\\n";
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629437952658, function(require, module, exports) {


var toPosInt   = require("../../number/to-pos-integer")
  , validValue = require("../../object/valid-value")
  , reduce     = Array.prototype.reduce;

module.exports = function (callSite/*,  …substitutions*/) {
	var args, rawValue = Object(validValue(Object(validValue(callSite)).raw));
	if (!toPosInt(rawValue.length)) return "";
	args = arguments;
	return reduce.call(rawValue, function (str1, str2, i) {
		return str1 + String(args[i]) + str2;
	});
};

}, function(modId) { var map = {"../../number/to-pos-integer":1629437952314,"../../object/valid-value":1629437952320}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1629437952299);
})()
//miniprogram-npm-outsideDeps=["es6-symbol","es6-iterator/array","next-tick","es6-iterator/for-of","es6-iterator/is-iterable","es6-iterator/string"]
//# sourceMappingURL=index.js.map