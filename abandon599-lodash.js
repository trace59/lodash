var trace = {
	chunk: function chunk (array, size = 1) {
		var result = []
		for (i = 0; i < array.length; i += size) {
			result.push(array.slice(i, i + size))
		}
		return result
	},

	
	compact: function compact (array) {
		var result = []
		for (i = 0; i < array.length; i++) {
			if (array[i]) {
				result.push(array[i])
			}
		}
		return result
	},

	
	difference: function difference (array) {
		var result = arguments[0].slice()
		for (i = 1; i < arguments.length; i++) {
			for (var val of arguments[i]) {
				if (result.indexOf(val) !== -1) {
					result.splice(result.indexOf(val), 1)
				}
			}
		}
		return result
	},

	// iteratee: function iteratee(value) {
	// 	var type = this.getType(value)
	// 	if (type == "Object") {
	// 		predicate = this.matches(value)
	// 	} else if (type == "Array") {
	// 		predicate = this.matchesProperty(...value)
	// 	} else if (type == "String") {
	// 		predicate = this.property(value)
	// 	} else if (type == "Function") {
	// 		return predicate(value)
	// 	}
	// 	return predicate
	// },

	differenceBy: differenceBy = (array, values, iteratee) => {
		var predicate = _.iteratee(iteratee)
		return array.filter(it => !values.some(val => predicate(val) === predicate(it)))
	},

	differenceWith: differenceWith = (array, values, comparator) => array.filter(it => !values.some(val => comparator(val, it))),

	
	drop: drop = (array, n = 1) => array.slice(n),
	
	dropRight: dropRight = (array, n = 1) => array.reverse().slice(n).reverse(),

	dropRightWhile: dropRightWhile = (array, predicate) => {
		var predicate = _.iteratee(predicate)
		for (var i = array.length - 1; i > -1; i--) {
			if (!predicate(array[i])) {
				var pos = i
				break
			}
		}
		return array.slice(0, pos + 1)
	},

	dropWhile: dropWhile = (arrays, predicate) => arrays.slice(arrays.findIndex(it => !_.iteratee(predicate)(it))),

	fill: function fill (array, value, start = 0, end = array.length) {
		for (i = start; i < end; i++) {
			array[i] = value
		}
		return array
	},

	findIndex: function findIndex (array, predicate, fromIndex = 0) {
		predicate = _.iteratee(predicate)
		for (var i = fromIndex; i < array.length; i++) {
			if (predicate(array[i])) {
				return i
			}
		}
		return -1
	},

	findLastIndex: function findLastIndex (array, predicate, fromIndex = array.length - 1) {
		predicate = _.iteratee(predicate)
		for (var i = fromIndex; i > -1; i--) {
			if (predicate(array[i])) {
				return i
			}
		}
		return -1
	},

	head: head = (array) => array[0],

	flatten: function flatten (array) {
		// return [].concat(...array)
		// return Array.prototype.concat.apply([], array)
		// flatten = Function.apply.bind([].concat, [])
		var result = []
		for (var i = 0; i < array.length; i++) {
			if (Array.isArray(array[i])) {
				for (var val of array[i]) {
					result.push(val)
				}
			} else {
				result.push(array[i])
			}
		}
		return result
	},

	flattenDeep: function flattenDeep (array) {
		var result = []
		for (var i = 0; i < array.length; i++) {
			if (Array.isArray(array[i])) {
				for (var val of array[i]) {
					result.push(val)
				}
			} else {
				result.push(array[i])
			}
		}
		for (var val of result) {
			if (Array.isArray(val)) {
				return flattenDeep(result)
			}
		}
		return result
	},

	flattenDepth: function flattenDepth (array, depth = 1) {
		var result = []
		for (var i = 0; i < array.length; i++) {
			if (Array.isArray(array[i])) {
				for (var val of array[i]) {
					result.push(val)
				}
			} else {
				result.push(array[i])
			}
		}
		depth--
		if (depth == 0) {
			return result
		}
		return flattenDepth(result, depth)
	},

	fromPairs: function fromPairs (pairs) {
		result = {}
		for (i = 0; i < pairs.length; i++) {
			result[pairs[i][0]] = pairs[i][1]
		}
		return result
	},

	indexOf: function indexOf (array, value, fromIndex = 0) {
		if (fromIndex < 0) {
			fromIndex += array.length
		}
		for (i = fromIndex; i < array.length; i++) {
			if (array[i] === value) {
				return i
			}
		}
		return -1
	},

	initial: function initial (array) {
		result = array.slice()
		if (result.length !== 0) {
			result.length = result.length - 1
		}
		return result
	},

	intersection: function intersection (...arrays) {
		var arr = arrays.shift()
		return arrays.reduce((result, val) => {
			arr.forEach(it => {
				if (val.includes(it)) result.push(it)
			})
			return result
		}, [])
	},

	intersectionBy: function intersectionBy (...arrays) {
		var predicate = _.iteratee(arrays.pop())
		var arr = arrays.shift()
		return arrays.reduce((result, val) => {
			var val = val.map(it => predicate(it))
			arr.forEach(it => {
				if (val.includes(predicate(it))) result.push(it)
			})
			return result
		}, [])
	},

	intersectionWith: function intersectionWith (...arrays) {
		var comparator = _.iteratee(arrays.pop())
		var arr = arrays.shift()
		return arrays.reduce((res, values) => {
			arr.forEach(it => {
				values.forEach(val => {
					if (comparator(it, val)) res.push(it)
				})
			})
			return res
		}, [])
	},



	forEach: function forEach (collection, iteratee) {
		var iteratee = _.iteratee(iteratee)
		for (var key in collection) {
			iteratee(collection[key], key, collection)
		}
		return collection
	},

	matches: function matches (source) {
		return function (obj) {
			for (var val in obj) {
				if (source[val] !== obj[val]) {
					return false
				}
			}
			return true
		}
	},

	matchesProperty: function matchesProperty (path, srcValue) {
		return function (obj) {
			for (var index in obj) {
				if (obj[index][path] == srcValue) {
					return obj[index]
				}
			}
			return false
		}
	},
	
	size: size = collection => _.isObject(collection) ? Object.keys(collection).length : collection.length,
	
	reduce: function reduce (collection, iteratee, accumulator = 0) {
		var result = accumulator
		var iteratee = _.iteratee(iteratee)
		for (var val in collection) {
			result = iteratee(result, collection[val], val)
		}
		return result
	},

	reduceRight: function reduceRight (collection, iteratee, accumulator = 0) {
		var result = accumulator
		collection = collection.reverse()
		for (var key in collection) {
			result = iteratee(result, collection[key], key)
		}
		return result
	},

	flip: function flip (func) {
		return function (...args) {
			return func(...args.reverse())
		}
	},

	negate: function negate (predicate) {
		return function (...args) {
			return !predicate(...args)
		}
	},
	
	once: function once (func) {
		var called = false
		var first
		return function (...args) {
			if (!called) {
				called = true
				return first = func(...args)
			} else {
				return first
			}
		}
	},

	spread: function spread (func, start = 0) {
		return function (args) {
			return func(...args)
		}
	},

	unary: function unary (func) {
		return function (arg) {
			return func(arg)
		}
	},

	ary: function ary (func, n = fun.length) {
		return function (...args) {
			if (n < args.length) {
				args.length = n
			}
			return func(...args)
		}
	},

	times: function times (n, iteratee) {
		var result = []
		for (var i = 0; i < n; i++) {
			result.push(iteratee(i))
		}
		return result
	},

	join: function join (array, separator = ".") {
		var separator = separator.toString(),
			result = ''
		for (var sub in array) {
			sub == array.length - 1 ? result += array[sub] : result += array[sub] + separator
		}
		return result
	},

	last: function last (array) {
		return array[array.length - 1]
	},

	lastIndexOf: function lastIndexOf (array, value, fromIndex = array.length - 1) {
		if (Math.abs(fromIndex) >= array.length) {
			return -1
		}
		for (i = fromIndex; i > 0; i--) {
			if (array[i] == value) {
				return i
			}
		}
	},

	
	nth: nth = (array, n = 0) => n >= 0 ? array[n] : array[array.length + n],

	
	pull: pull = (array, ...values) => array.filter(it => !values.includes(it)),

	pullAll: pullAll = (array, values) => array.filter(it => !values.includes(it)),

	pullAllBy: pullAllBy = (array, values, iteratee) => {
		var predicate = _.iteratee(iteratee)
		var values = values.map(it => predicate(it))
		return array.filter(it => !values.includes(predicate(it)))
	},

	pullAllWith: pullAllWith = (arr, val, compara) => arr.filter(it => !val.some(val => _.iteratee(compara)(it, val))),

	pullAt: pullAt = (arr, indexes) => {
		var res = []
		indexes.forEach(index => {
			res.push(arr[index])
			arr.splice(arr, 1)
		})
		return res
	},
	turn {[type]}       [description]
	 */
	reverse: function reverse (array) {
		var result = []
		for (i = array.length - 1; i >= 0; i--) {
			result.push(array[i])
		}
		return result
	},

	sortedIndex: function sortedIndex (array, value) {
		var left = 0,
			right = array.length - 1
		if (array[left] > value) return 0
		if (array[right] < value) return array.length
		while (left <= right) {
			var mid = (left + right) / 2 | 0
			if (array[mid] < value) {
				left = mid + 1
			} else if (array[mid] >= value) {
				right = mid - 1
			}
		}
		return left
	},

	sortedIndexBy: function sortedIndexBy (arr, val, iteratee) {
		var predicate = _.iteratee(iteratee)
		var arr = arr.map(it => predicate(it))
		return this.sortedIndex(arr, predicate(val))
	},

	sortedIndexOf: function sortedIndexOf (array, value) {
		var left = 0,
			right = array.length - 1
		if (array[left] > value || array[right] < value) return -1
		while (left <= right) {
			var mid = (left + right) / 2 | 0
			if (array[mid] < value) {
				left = mid + 1
			} else if (array[mid] > value) {
				right = mid - 1
			} else {
				while (array[mid - 1] === value) mid--
				return mid
			}
		}
		return -1
	},

	sortedLastIndex: sortedLastIndex = (arr, val) => {
		arr = arr.reverse()
		return arr.findIndex(it => it === val) > -1 ? arr.length - arr.findIndex(it => it === val) : -1
	},

	sortedLastIndexBy: function sortedLastIndexBy (arr, val, iteratee) {
		var predicate = _.iteratee(iteratee)
		var arr = arr.map(it => predicate(it))
		return this.sortedLastIndex(arr, predicate(val))
	},

	sortedLastIndexOf: sortedLastIndexOf = (arr, val) => this.sortedLastIndex(arr, val) > -1 ? this.sortedLastIndex(arr, val) - 1 : -1,

	sortedUniq: sortedUniq = arr => {
		var res = []
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] !== arr[i + 1]) {
				res.push(arr[i])
			}
		}
		return res
	},

	sortedUniqBy: sortedUniqBy = (arr, iteratee) => {
		var predicate = _.iteratee(iteratee)
		var res = []
		for (var i = 0; i < arr.length; i++) {
			if (predicate(arr[i]) !== predicate(arr[i - 1])) {
				res.push(arr[i])
			}
		}
		return res
	},
	
	toPath: toPath = (value) => value.toString().split('[').join('.').split(']').join('').split('.'),

	get: function get (object, path, defaultValue) {
		//将输入的path路径转换为数组方式
		if (!Array.isArray(path)) path = this.toPath(path)
		for (var val in path) {
			object = object[path[val]]
			if (object == undefined) {
				return defaultValue
			}
		}
		return object
	},

	forIn: function forIn (object, iteratee) {
		for (var key in object) {
			iteratee(object[key], key, object)
		}
		return object
	},

	forInRight: function forInRight (object, iteratee) {
		var result = []
		for (var val in object) {
			result.unshift(val)
		}
		for (var key of result) {
			iteratee(result[key], key, object)
		}
		return object
	},

	forOwn: function forOwn (object, iteratee) {
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				iteratee(object[key], key, object)
			}
		}
		return object
	},

	forOwnRight: function forOwnRight (object, iteratee) {
		var res = []
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				res.unshift(key)
			}
		}
		res.forEach(key => iteratee(Object[key], key, Object))
		return object
	},

	functions: functions = object => {
		var res = []
		for (let key in object) {
			if (object.hasOwnProperty(key)) {
				res.push(key)
			}
		}
		return res
	},

	functionsIn: functionsIn = object => {
		var res = []
		for (let key in object) {
				res.push(key)
		}
		return res
	},

	has: has = (object, ...paths) => {
		var paths = _.flattenDeep(paths.map(path => _.toPath(path)))
		var obj = Object.assign({}, object)
		for (let key of paths) {
			if (obj.hasOwnProperty(key)) {
				obj = obj[key]
			} else {
				return false
			}
		}
		return true
	},

	hasIn: hasIn = (object, ...paths) => {
		var paths = _.flattenDeep(paths.map(path => _.toPath(path)))
		for (let key of paths) {
			if (object[key]) {
				object = object[key]
			} else {
				return false
			}
		}
		return true
	},

	invert: invert = object => {
		return Object.keys(object).reduce((res, key) => {
			res[object[key]] = key
			return res
		}, {})
	},

	invertBy: invertBy = (object, iteratee) => {
		var predicate = _.iteratee(iteratee)
		return Object.keys(object).reduce((res, key) => {
			if (res[predicate(object[key])]) {
				res[predicate(object[key])].push(key)
			} else {
				res[predicate(object[key])] = [key]
			}
			return res
		}, {})
	},

	invoke: invoke = (object, path, ...args) => {
		paths = _.toPath(path)
		func = paths.pop()
		paths.forEach(key => {
			object = object[key]
		})
		return object[func](...args)
	},

	keys: keys = object => {

	},

	keys: keys = object => Object.keys(object),

	keysIn: keysIn = object => {
		var keys = []
		for (var key in object) {
			keys.push(key)
		}
		return keys
	},

	mapKeys: mapKeys = (object, iteratee) => {
		var predicate = _.iteratee(iteratee)
		return Object.entries(object).reduce((res, val) => {
			res[predicate(...val.reverse())] = _.head(val)
			return res
		}, {})
	},

	mapValues: mapValues = (object, iteratee) => {
		var predicate = _.iteratee(iteratee)
		return Object.keys(object).reduce((res, key) => {
			var val = predicate(object[key])
			if (val) {
				res[key] = val
			}
			return res
		}, {})
	},

	merge: merge = (object, sources) => {
		for (var key in sources) {
			if (object[key] === undefined) {
				object[key] = sources[key]
			}
			if (_.isObject(object[key]) && _.isObject(sources[key])) {
				merge(object[key], sources[key])
			}
			if (_.isArray(object[key]) && _.isArray(sources[key])) {
				Object.keys(sources[key]).forEach(index => merge(object[key][index], sources[key][index]))
			}
		}
		return object
	},

	// mergeWith: mergeWith = (object, sources, customizer) => {
	// 	for (var key in sources) {
			
	// 	}
	// 	return object
	// },

	omit: omit = (object, ...paths) => {
		var keys = Object.keys(object)
		return keys.reduce((res, key) => {
			if (!_.flattenDeep(paths).includes(key)) {
				res[key] = object[key]
			}
			return res
		}, {})
	},

	omitBy: omitBy = (object, predicate) => {
		var values = Object.entries(object)
		return values.reduce((res, val) => {
			if (!predicate(_.last(val))) {
				res[_.head(val)] = _.last(val)
			}
			return res
		}, {})
	},

	pick: pick = (object, ...paths) => {
		var keys = Object.keys(object)
		return keys.reduce((res, key) => {
			if (_.flattenDeep(paths).includes(key)) {
				res[key] = object[key]
			}
			return res
		}, {})
	},

	pickBy: pickBy = (object, predicate) => {
		var values = Object.entries(object)
		return values.reduce((res, val) => {
			if (predicate(_.last(val))) {
				res[_.head(val)] = _.last(val)
			}
			return res
		}, {})
	},

	result: result = (object, path, defaultValue) => {
		var obj = Object.assign({}, object), flag = false
		if (_.isArray(path)) {
			path = path.map(it => _.toPath(it))
		} else {
			path = _.toPath(path)
		}
		path.forEach(key => {
			obj = obj[key]
			if (obj === undefined) {
				flag = true
				return
			}
		})
		if (flag) return _.isFunction(defaultValue) ? defaultValue() : defaultValue
		return _.isFunction(obj) ? obj() : obj
	},

	set: set = (object, path, value) => {
		var path = _.flattenDeep(_.isArray(path) ? path.map(it => _.toPath(it)) : _.toPath(path))
		var result = object
		path.forEach((key, index) => {
			if (object[key] === undefined) {
				object[key] = _.isNaN(+path[index + 1]) ? {} : []
			}
			if (index === path.length - 1) object[key] = value
			object = object[key]
		})
		return result
	},

	setWith: setWith = (object, path, value, customizer) => {
		var path = _.isArray(path) ? path.map(it => _.toPath(it)) : _.toPath(path)
		var result = object
		path.forEach((key, index) => {
			if (object[path[index + 1]] === undefined) {
				object[key] = _.isNumber(path[index + 1]) ? [] : {}
			}
			if (index === path.length - 1) object[key] = customizer ? customizer(value)  : value
			object = customizer ? customizer(object[key]) : object[key]
		})
		return result
	},

	isArguments: isArray = value => Object.prototype.toString.call(value) === '[object Arguments]',

	isArrayLike: isArrayLike = value => {
		return Number.isInteger(value.length) && value.length > 0 && typeof value !== 'function'
	},

	isArrayLikeObject: isArrayLikeObject = value => {
		return Number.isInteger(value.length) && typeof value === 'object'
	},

	isElement: isElement = value => {
		return value instanceof Element
	},

	isEmpty: isElement = value => {
		var type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
		if (value === null || value === undefined) {
			return true
		}
		if (type === 'map' || type === 'set') {
			return !value.size()
		}

		return !Object.values(value).length
	},

	isEqual: function isEqual (value, other) {
		if (value === other) return true
		if (_.isNaN(value) && _.isNaN(other)) return true
		if (value.toString() === other.toString()) return true
		var type1 = Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
		var type2 = Object.prototype.toString.call(other).slice(8, -1).toLowerCase()

		if (type1 !== type2) return false

		if (type1 === 'string' || type1 === 'boolean' || type1 === 'number' || type1 === 'date') {
			return value.toString() === other.toString()
		}

		if (type1 === 'array' || type1 === 'object') {
			var key1 = Object.keys(value)
			var key2 = Object.keys(other)
			if (key1.length !== key2.length) return false
			return key1.every(key => isEqual(value[key], other[key]))
		}

		return false
	},

	isEqualWith: isEqualWith = (value, other, customizer) => {
		var type1 = Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
		var type2 = Object.prototype.toString.call(other).slice(8, -1).toLowerCase()
		if (type1 === 'array' || type1 === 'object') {
			return Object.values(value).length !== Object.values(other).length ? false : Object.keys(value).every(key => customizer(value[key], other[key]) === undefined ? _.isEqual(value[key], other[key]) : customizer(value[key], other[key]))			
		}
		return customizer(value.toString(), other.toString()) ? true : _.isEqual(value.toString(), other.toString())
	},

	isError: isError = value => {
		return value instanceof Error
	},

	isFinite: isFinite = value => {
		// var type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
		// return value === 'number' && value > -Infinity && value < Infinity
		return Number.isFinite(value)
	},

	isTypedArray: isTypedArray = value => /^(?:(float)|(u?int))\d{1,2}array$/.test(Object.prototype.toString.call(value).slice(8, -1).toLowerCase()),

	isInteger: isInteger = value => Number.isInteger(value),

	isLength: isLength = value => Number.isInteger(value) && value > 0 && value < Number.MAX_SAFE_INTEGER,

	isMap: isMap = value => Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'map',

	isMatch: isMatch = (object, source) => _.isEqual(object, Object.assign({}, object, source)),

	isMatchWith: isMatchWith = (object, source, customizer) => {
		var customizer = _.iteratee(customizer)
		var keys = Object.keys(object)
		keys.forEach(key => {
			if (!customizer(object[key], source[key]) || undefined) {
				return false
			}
		})
		return true
	},

	isNaN: isNaN = value => {
		if (typeof value === 'object') return Number.isNaN(value.valueOf())
		return Number.isNaN(value)
	},

	isNative: isNative = value => value.toString().indexOf('native code') > -1,

	isNil: isNil = value => value === null || value === undefined,

	isNull: isNull = value => value === null,

	isNumber: isNumber = value => Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'number',

	isObject: isObject = value => {
		return typeof value === 'function' || (value !== null && typeof value === 'object')
	},

	isObjectLike: isObjectLike = value => value !== null && typeof value === 'object',

	isPlainObject: isPlainObject = value => {
		var proto = Object.getPrototypeOf(value)
		return proto === null || proto === Object.prototype
	},

	isRegExp: isRegExp = value => Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'regexp',

	isSafeInteger: isSafeInteger = value => {
		return Number.isSafeInteger(value)
	},

	isSet: isSet = value => Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'set',

	isSymbol: isSymbol = value => Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'symbol',

	isUndefined: isUndefined = value => Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'undefined',

	isWeakMap: isWeakMap = value => Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'weakmap',

	isWeakSet: isWeakSet = value => Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'weakset',

	lt: lt = (value, other) => value < other,

	lte: lte = (value, other) => value <= other,

	isArray: function isArray (value) {
		return Object.prototype.toString.call(value) === '[object Array]'
	},

	isArrayBuffer: function isArray (value) {
		return Object.prototype.toString.call(value) === '[object ArrayBuffer]'
	},

	isBoolean: function isBoolean (value) {
		return Object.prototype.toString.call(value) == '[object Boolean]'
	},

	isDate: function isDate (value) {
		return Object.prototype.toString.call(value) === '[object Date]'
	},

	isFunction: function isFunction (value) {
		return Object.prototype.toString.call(value) === '[object Function]'
	},

	isString: function isString (value) {
		return Object.prototype.toString.call(value) === '[object String]'
	},

	toArray: toArray = value => {
		type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
		if (type === 'null' || type === 'undefined' || _.isNaN(value)) {
			return []
		}
		return Object.values(value)
	},

	toFinite: toFinite = value => {
		if (_.isFinite(Number(value))) return Number(value)
		if (value === Infinity) return Number.MAX_VALUE
		if (value === -Infinity) return Number.MIN_VALUE
		return 0
	},

	toInteger: toInteger = value => {
		if (_.isNaN(value)) return 0
		if (Number.isInteger(Number(value))) return value
		if (value === Infinity || value === -Infinity) return _.toFinite(value)
		return Math.floor(Number(value))
	},

	toLength: toLength = value => {
		value = _.toInteger(value)
		if (value <= 0) return 0
		if (value > Number.MAX_SAFE_INTEGER) return 2 ** 32 - 1
		return value
	},

	toNumber: toNumber = value => {
		if (_.isNaN(Number(value))) return NaN
		return Number(value)
	},

	assign: assign = (...values) => {
		obj = values.shift()
		values.forEach(val => {
			Object.keys(val).forEach(key => {
				obj[key] = val[key]
			})
		})
		return obj
	},

	toSafeInteger: toSafeInteger = value => {
		var value = _.toInteger(value)
		if (value > Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER
		if (value < Number.MIN_SAFE_INTEGER) return Number.MIN_SAFE_INTEGER
		return value
	},

	tail: tail = array => array.slice(1),

	take: take = (array, n = 1) => array.slice(0, n),

	takeRight: takeRight = (array, n = 1) => array.slice().reverse().slice(0, n).reverse(),

	takeRightWhile: takeRightWhile = (array, iteratee) => {
		var predicate = _.iteratee(iteratee)
		for (var i = array.length - 1; i > -1; i--) {
			if (!predicate(array[i])) {
				break
			}
		}
		return array.slice(i + 1)
	},

	takeWhile: takeWhile = (array, iteratee) => {
		var predicate = _.iteratee(iteratee)
		for (var i = 0; i < array.length; i++) {
			if (!predicate(array[i])) {
				break
			}
		}
		return array.slice(0, i)
	},

	union: union = (...arrays) => [...new Set(arrays.reduce((res, val) => res.concat(val)), [])],

	unionBy: unionBy = (...arrays) => {
		var predicate = _.iteratee(arrays.pop())
		return arrays.reduce((array, val) => {
			val.forEach(res => {
				if (!array.map(it => predicate(it)).includes(predicate(res))) array.push(res)
			})
			return array
		}, [])
	},

	unionWith: unionWith = (...arrays) => {
		var predicate = _.iteratee(arrays.pop())
		arr = arrays.reduce((res, val) => res.concat(val), [])
		var result = []
		for (var i = 0; i < arr.length; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (predicate(arr[i], arr[j])) {
					arr.splice(j, 1)
				}
			}
			result.push(arr[i])
		}
		return result
	},

	identity: function identity (value) {
		return arguments[0]
	},

	uniq: uniq = (array) => [...new Set(array)],
	// 	var result = []
	// 	for (var i = 0; i < array.length; i++) {
	// 		if (array.indexOf(array[i]) == [i]) {
	// 			result.push(array[i])
	// 		}
	// 	}
	// 	return result
	// },

	uniqBy: uniqBy = (arr, iteratee) => {
		var predicate = _.iteratee(iteratee)
		var result = []
		var res = new Set()
		arr.forEach(it => {
			if (!res.has(predicate(it))) {
				res.add(predicate(it))
				result.push(it)
			}
		})
		return result
	},

	uniqWith: uniqWith = (arr, compara) => {
		var compara = _.iteratee(compara)
		var res = new Set()
		arr.forEach((val, index) => {
			arr.slice(index + 1).forEach(it => {
				if (!compara(it, val) && !res.has(val)) {
					res.add(val)
				}
			})
		})
		return [...res]
	},

	unzip: unzip = (arrays) => {
		return arrays.shift().reduce((res, val) => {
			var val = [val]
			arrays.forEach(it => {
				val.push(it.shift())
			})
			res.push(val)
			return res
		}, [])
	},

	unzipWith: unzipWith = (arrays, iteratee) => this.unzip(arrays).map(it => iteratee(...it)),

	without: without = (array, ...values) => {
		var values = new Set(values)
		var res = []
		array.forEach(val => {
			if (!values.has(val)) res.push(val)
		})
		return res
	},

	xor: xor = (...arrays) => {
		var res = new Set(arrays.shift())
		arrays.forEach(arr => {
			arr.forEach(val => {
				!res.has(val) ? res.add(val) : res.delete(val)
			})
		})
		return [...res]
	},

	xorBy: xorBy = (...arrays) => {
		var predicate = _.iteratee(arrays.pop())
		var res = {}
		_.flattenDeep(arrays).forEach(val => {
			if (res[predicate(val)]) {
				res[predicate(val)].push(val)
			} else {
				res[predicate(val)] = [val]
			}
		})
		return _.flattenDeep(Object.values(res).filter(it => it.length === 1))
	},

	xorWith: xorWith = (...arrays) => {
		var predicate = _.iteratee(arrays.pop())
		var arrays = _.flattenDeep(arrays)
		return arrays.reduce((res, val, i) => {
			arr = arrays.slice()
			arr.splice(i, 1)
			if (!arr.some(it => predicate(it, val))) {
				res.push(val)
			}
			return res
		}, [])
	},

	zip: zip = (...arrays) => {
		return arrays.shift().reduce((res, val, index) => {
			var val = [val]
			arrays.forEach((it) => {
				val.push(it[index])
			})
			res.push(val)
			return res
		}, [])
	},

	zipObject: zipObject = (props, values) => {
		return props.reduce((res, val, index) => {
			res[val] = values[index]
			return res
		}, {})
	},

	// zipObjectDeep: zipObjectDeep = (props, values) => {
	// 	var path = props.map(it => _.toPath(it))
	// 	var res = {}

	// }

	zipWith: zipWith = (...arrays) => {
		var predicate = _.iteratee(arrays.pop())
		return this.unzipWith(arrays, predicate)
	},

	countBy: countBy = (collection, iteratee) => {
		var predicate = _.iteratee(iteratee)
		return collection.reduce((res, val) => {
			!res[predicate(val)] ? res[predicate(val)] = 1 : res[predicate(val)]++
			return res
		}, {})
	},

	every: every = (collection, predicate) => !collection.filter((it, index) => !_.iteratee(predicate)(it, index, collection)).length,

	filter: filter = (collection, predicate) => {
		var res = []
		var predicate = _.iteratee(predicate)
		return collection.reduce((res, val) => {
			if (predicate(val)) {
				res.push(val)
			}
			return res
		}, [])
	},

	find: find = (collection, predicate, fromIndex = 0) => {
		var predicate = _.iteratee(predicate), res = []
		for (var i = fromIndex; i < collection.length; i++) {
			if (predicate(collection[i])) {
				return collection[i]
			}
		}
	},

	findLast: findLast = (collection, predicate, fromIndex = collection.length - 1) => {
		var predicate = _.iteratee(predicate)
		for (var i = fromIndex; i > -1; i--) {
			if (predicate(collection[i])) {
				return collection[i]
			}
		}
	},

	flatMap: flatMap = (collection, iteratee) => {
		var predicate = _.iteratee(iteratee)
		return Object.values(collection).reduce((res, val) => {
			res.push(...predicate(val))
			return res
		}, [])
	},

	flatMapDeep: flattenDeep = (collection, iteratee) => {
		var predicate = _.iteratee(iteratee)
		return Object.values(collection).reduce((res, val) => {
			res.push(..._.flattenDeep(predicate(val)))
			return res
		}, [])
	},

	flatMapDepth: flatMapDepth = (collection, iteratee, depth = 1) => {
		var predicate = _.iteratee(iteratee)
		return Object.values(collection).reduce((res, val) => {
			res.push(..._.flattenDepth(predicate(val), depth - 1))
			return res
		}, [])
	},

	forEachRight: forEachRight = (collection, iteratee) => {
		_.forEach(collection.reverse(), iteratee)
		return collection.reverse()
	},

	groupBy: groupBy = (collection, iteratee) => {
		var predicate = _.iteratee(iteratee)
		return collection.reduce((res, val) => {
			!res[predicate(val)] ? res[predicate(val)] = [val] : res[predicate(val)].push(val)
			return res
		}, {})
	},

	includes: includes = (collection, values, fromIndex = 0) => {
		if (typeof collection === 'string') {
			return collection.indexOf(values) > -1
		} else {
			collection = Object.values(collection)
			for (var i = fromIndex; i < collection.length; i++) {
				if (values === collection[i]) {
					return true
				}
			}
			return false
		}
	},

	invokeMap: invokeMap = (collection, path, args) => {
		if (typeof path === 'string') {
			predicate = Object.values(collection)[path]
		} else {
			predicate = path
		}
		return collection.reduce((res, val) => {
			res.push(predicate.call(val, args))
			return res
		}, [])
	},

	keyBy: keyBy = (collection, iteratee) => {
		return Object.values(collection).reduce((res, val) => {
			res[_.iteratee(iteratee)(val)] = val
			return res
		}, {})
	},

	map: map = (collection, iteratee) => {
		var predicate = _.iteratee(iteratee)
		return Object.values(collection).reduce((res, val, index) => {
			res.push(predicate(val, index, Object.values(collection)))
			return res
		}, [])
	},

	orderBy: orderBy = (collection, iteratee, orders) => {
		iteratee = iteratee.map(it => _.iteratee(it))
		orders = orders.reverse()
		iteratee.reverse().forEach((predicate, index) => {
			if (orders[index] === 'desc') {
				collection.sort((a, b) => {
					return predicate(b) > predicate(a)
				})
			} else {
				collection.sort((a, b) => {
					return predicate(a) > predicate(b)
				})
			}
		})
		return collection
	},

	partition: partition = (collection, predicate) => {
		var predicate = _.iteratee(predicate)
		return collection.reduce((res, val) => {
			if (predicate(val)) res[0].push(val)
			if (!predicate(val)) res[1].push(val)
			return res
		}, [[], []])
	},

	reject: reject = (collection, predicate) => collection.filter(val => !_.iteratee(predicate)(val)),

	sample: sample = collection => Object.values(collection)[Math.random() * Object.values(collection).length | 0],

	sampleSize: sampleSize = (collection, n = 1) => {
		n = n > collection.length ? collection.length : n
		var res = []
		while (res.length < n) {
			var val = _.sample(collection)
			if (!res.includes(val)) {
				res.push(val)
			}
		}
		return res
	},

	shuffle: shuffle = (collection) => _.sampleSize(collection, collection.length),

	some: some = (collection, predicate) => Object.values(collection).findIndex((val, index) => _.iteratee(predicate)(val, index, Object.values(collection))) > -1,

	sortBy: sortBy = (collection, iteratee) => {
		iteratee = iteratee.map(it => _.iteratee(it)).reverse()
		iteratee.forEach(predicate => {
			collection.sort((a, b) => predicate(a) > predicate(b))
		})
		return collection
	},

	defer: defer = (func, ...args) => {
		return setTimeout(() => {
			func.call(this, ...arg)
		}, 0)
	},

	delay: delay = (func, wait, ...args) => {
		return setTimeout(() => {
			func.call(this, ...args)
		}, wait);
	},

	castArray: castArray = (...values) => [...values],

	// clone: clone = value =>  Object.assign({}, value),

	conformsTo: conformsTo = (object, source) => Object.keys(source).every(key => _.iteratee(source[key])(object[key])),

	eq: eq = (value, other) => value === other || Number.isNaN(value) && Number.isNaN(other),

	gt: gt = (value, other) => value > other,

	gte: gte = (value, other) => value >= other,

	assignIn: assignIn = (...objects) => {
		var res = {}
		objects.forEach(obj => {
			for(var key in obj) {
				res[key] = obj[key]
			}
		})
		return res
	},

	at: at = (value, ...paths) => {
		paths = _.flattenDeep(paths).map(path => _.toPath(path))
		return paths.reduce((res, path) => {
			obj = Object.assign({}, value)
			for (var key of path) {
				obj = obj[key]
			}
			res.push(obj)
			return res
		}, [])
	},

	defaults: defaults = (...objects) => Object.assign(...(objects.reverse())),

	defaultsDeep: defaultsDeep = (object, source) => {
		for (let key in source) {
			if (!object[key]) {
				object[key] = source[key]
			} else if(_.isObject(source[key]) && _.isObject(object[key])){
				object[key] = Object.assign(source[key], object[key])
			}
		}
		return object
	},

	findKey: findKey = (object, predicate) => Object.keys(object).filter(key => _.iteratee(predicate)(object[key]))[0],

	findLastKey: findLastKey = (object, predicate) => _.last(Object.keys(object).filter(key => _.iteratee(predicate)(object[key]))),

	parseJson: function parseJson (Str) {
		var jsonStr = Str
		var i = 0
		return parseValue(jsonStr)

		function parseValue () {
			while (jsonStr[i] === " ") {
				i++
			}
			if (jsonStr[i] === "{")
				return parseObject()
			if (jsonStr[i] === "[")
				return parseArray()
			if (jsonStr[i] === '"')
				return parseString()
			if (jsonStr[i] === "t" || jsonStr[i] === "f")
				return parseBoolean()
			if (jsonStr[i] === "n")
				return parseNull()
			return parseNumber()
		}

		function parseObject () {
			i++
			var result = {}
			while (jsonStr[i] !== "}") {
				var key = parseString()
				i++
				var value = parseValue()
				result[key] = value
				if (jsonStr[i] == ",")
					i++
			}
			i++
			return result
		}

		function parseString () {
			i++
			var result = ""
			while (jsonStr[i] !== '"') {
				result += jsonStr[i]
				i++
			}
			i++
			return result
		}

		function parseArray () {
			i++
			var result = []
			while (jsonStr[i] !== "]") {
				result.push(parseValue(jsonStr[i]))
				if (jsonStr[i] == ",")
					i++
			}
			i++
			return result
		}

		function parseBoolean () {
			if (jsonStr[i] === "t") {
				i += 4
				return true
			} else {
				i += 5
				return false
			}
		}

		function parseNumber () {
			var symbol = {
				"+": true,
				"-": true,
				"e": true,
				"E": true,
				".": true
			}
			var result = ""
			while (symbol[jsonStr[i]] || (jsonStr[i] >= "0" && jsonStr[i] <= "9")) {
				result += jsonStr[i]
				i++
			}
			return Number(result)
		}

		function parseNull () {
			i += 4
			return null
		}
	},

	getType: function getType (value) {
		return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
	},

	values: function values (object) {
		return Object.keys(object).map(key => object[key])
	},

	valuesIn: valuesIn = (object) => {
		var res = []
		for (var key in object) {
			res.push(object[key])
		}
		return res
	},

	camelCase: function camelCase (string) {
		return string.toLowerCase().replace(/^[\W|_]*/, "").replace(/[\W|_]([a-zA-Z])/g, it => it.toUpperCase()).replace(/[\W|_]/g, "")
	},

	toPairs: function toPairs (object) {
		var result = []
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				var ele = [key, object[key]]
				result.push(ele)
			}
		}
		return result
	},

	toPairsIn: function toPairs (object) {
		var result = []
		for (var key in object) {
			var ele = [key, object[key]]
			result.push(ele)
		}
		return result
	},

	transform: transform = (object, iteratee, accumulator) => {
		var predicate = _.iteratee(iteratee)
		for (var [key, val] of Object.entries(object)) {
			if (predicate(accumulator, val, key, object) === false) {
				break
			}
		}
		return accumulator
	},

	unset: unset = (object, path) => {
		var paths = _.flattenDeep(_.isArray(path) ? path.map(it => _.toPath(it)) : _.toPath(path))
		last = paths.pop()
		paths.forEach((path) => {
			object = object[path]
		})
		if (object !== undefined && object[last] !== undefined) {
			return delete object[last]
		}
		return false
	},

	update: update = (object, path, updater) => {
		var paths = _.flattenDeep(_.isArray(path) ? path.map(it => _.toPath(it)) : _.toPath(path))
		var last = paths.pop()
		var predicate = _.iteratee(updater)
		var res = object
		try {
			paths.forEach(path => {
				object = object[path]
			})
			object[last] = predicate(object[last])
		} catch (e) {
			var object = res
			paths.push(last)
			object = _.set(object, paths)
			update(object, paths, updater)
		}
		return res
	},

	property: function property (path) {
		return obj => _.get(obj, path)

		// return obj => this.get(obj, path, "")
	},

	propertyOf: propertyOf = object => path => _.get(object, path),

	concat: function concat (array, ...values) {
		var result = []
		for (var val of arguments) {
			if (this.getType(val) === 'array') {
				result = result.concat(val)
			} else {
				result.push(val)
			}
		}
		return result
	},

	capitalize: function capitalize (string = '') {
		return string.toLowerCase().replace(/( |^)[a-z]/g, it => it.toUpperCase())
	},

	endsWith: function endsWith (string = '', target, position = string.length) {
		return string.slice(0, position).charAt(position - 1) === target
	},

	escape: function escape (string = '') {
		return string.replace(/[&|<|>|"|']/g, it => {
			if (it == '"') return "&quot;"
			if (it == "&") return "&amp;"
			if (it == "<") return "&lt;"
			if (it == ">") return "&gt;"
			if (it == "'") return "&apos;"
		})
	},

	escapeRegExp: function escapeRegExp (string = '') {
		return string.replace(/[\^|\$|\\|\.|\*|\+|\?|\(|\)|\[|\]|\{|\}|\|]/g, it => ('\\' + it))
	},

	kebabCase: kebabCase = string => string.replace(/^\s+|^\_+|\s+$|\_+$|^\W+|\W+$/g, '').replace(/(\_+|\W+|\s+)/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),

	lowerCase: lowerCase = string => string.replace(/^\s+|^\_+|\s+$|\_+$|^\W+|\W+$|^\-+|\-+$/g, '').replace(/(\_+|\W+|\s+)/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase(),

	lowerFirst: lowerFirst = string => string.replace(/^([A-Z])/, it => it.toLowerCase()),

	pad: pad = (string = '', length = 0, chars = ' ') => {
		var padLength = length - string.length
		var padLlength = padLength / 2 | 0
		var padRlength = Math.ceil(padLength / 2)
		var padLeft = chars.repeat(Math.ceil(padLlength / chars.length)).slice(0, padLlength)
		var padRight = chars.repeat(Math.ceil(padRlength / chars.length)).slice(0, padRlength)
		return padLeft + string + padRight
	},

	padEnd: padEnd = (string = '', length = 0, chars = ' ') => {
		var padRlength = length - string.length
		var padRight = chars.repeat(Math.ceil(padRlength / chars.length)).slice(0, padRlength)
		return string + padRight
	},

	padStart: padStart = (string = '', length = 0, chars = ' ') => {
		var padLlength = length - string.length
		var padLeft = chars.repeat(Math.ceil(padLlength / chars.length)).slice(0, padLlength)
		return padLeft + string
	},

	parseInt: parseInt = (string, radix = 10) => Number.parseInt(string, radix),

	repeat: repeat = (string = '', n = 1) => {
		if (n <= 0) return ''
		var str = string
		while(--n) {
			string += str
		}
		return string
	},

	replace: replace = (string = '', pattern, replacement) => {
		res = string.split(pattern)
		var result = res[0]
		for (var i = 1; i < res.length; i++) {
			result += replacement + res[i]
		}
		return result
	},

	snakeCase: snakeCase = (string = '') => string.replace(/^\s+|^\_+|\s+$|\_+$|^\W+|\W+$|^\-+|\-+$/g, '').replace(/(\_+|\W+|\s+)/g, '_').replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase(),

	split: split = (string = '', separator, limit) => string.split(separator).slice(0, limit),

	startCase: startCase = (string = '') => string.replace(/^\s+|^\_+|\s+$|\_+$|^\W+|\W+$/g, '').replace(/(\_+|\W+|\s+)/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').split(' ').map(it => it.replace(/^([a-z])/, it => it.toUpperCase())).join(' '),

	startsWith: startsWith = (string = '', target, position = 0) => string[position] === target,

	toLower: toLower = (string = '') => string.toLowerCase(),

	toUpper: toUpper = (string = '') => string.toUpperCase(),

	trim: trim = (string = '', chars =' ') => {
		var res = []
		for(var i = 0; i < string.length; i++) {
			if (!chars.includes(string[i])) {
				res.push(string[i])
			}
		}
		return res.join('')
	},

	trimEnd: trimEnd = (string = '', chars = ' ') => {
		string = string.split('').reverse()
		for(var i = 0; i < string.length; i++) {
			if (chars.includes(string[i])) {
				string.splice(i, 1)
				i--			
			} else {
				return string.reverse().join('')
			}
		}
		return ''
	},

	trimStart: trimStart = (string = '', chars = ' ') => {
		string = string.split('')
		for(var i = 0; i < string.length; i++) {
			if (chars.includes(string[i])) {
				string.splice(i, 1)
				i--
			} else {
				return string.join('')
			}
		}
		return ''
	},

	truncate: truncate = (string = '', options = {}) => {
		if (options['length'] === undefined) options['length'] = 30
		if (options['omission'] === undefined) options['omission'] = '...'
		if (options['separator'] === undefined) options['separator'] = ''
		string = string.split(options['separator']).join('')
		string = string.slice(0, options['length'] - options['omission'].length)
		string = string + options['omission']
		return string
	},

	unescape: unescape = (string = '') => {
		return string.replace(/(\&[a-z]+\;)/, it => {
			if (it == "&quot;") return '"'
			if (it == "&amp;") return "&"
			if (it == "&lt;") return "<"
			if (it == "&gt;") return ">"
			if (it == "&apos;") return "'"
		})
	},

	upperCase: upperCase = (string = '') => string.replace(/^\s+|^\_+|\s+$|\_+$|^\W+|\W+$|^\-+|\-+$/g, '').replace(/(\_+|\W+|\s+)/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase(),

	upperFirst: upperFirst = (string = '') => string.replace(/^([a-z])/, it => it.toUpperCase()),

	words: words = (string = '', pattern) => pattern ? string.match(pattern) : string.split(/[^\w]+/g),

	defaultTo: defaultTo = (value, defaultValue) => {
		if (_.isNaN(value) || _.isNil(value)) return defaultValue
		return value
	},

	range: range = (start = 0, end, step = 1) => {
		if (end === undefined) {
			end = start
			start = 0
			if (end === start) return []
		}
		if (step === 0) return Array(end - start).fill(start)
		var result = []
		while (start < end) {
			if (step < 0) return []
			result.push(start)
			start += step
		}
		while(start > end) {
			result.push(start)
			start -= step > 0 ? step : -step
		}
		return result
	},

	rangeRight: rangeRight = (start = 0, end, step = 1) => {
		var result = [], endL = end
		if (endL === undefined) {
			var endL = 0
			if (endL === start) return []
		}
		if (step === 0) {
			return endL-start > 0 ? Array(endL - start).fill(start) : []
		}
		while (start < endL) {
			if (step < 0) return []
			endL -= step
			result.push(endL)
		}
		while (start > endL) {
			endL += step > 0 ? step : -step
			result.push(endL)
		}
		if (end === undefined) {
			result.pop()
			result.reverse()
			result.push(0)
		}
		return result
	},

	conforms: conforms = source => {
		var keys = Object.keys(source)
		return object => {
			return keys.every(key => {
				if (source[key](object[key])) return true
				return false 
			})
		}
	},

	constant: constant = value => () => value,

	flow: flow = (...funcs) => {
		var funcs = _.flattenDeep(funcs)
		return (...args) => {
			var val = funcs.shift()(...args)
			return funcs.reduce((val, func) => func.call(null, val), val)
		}
	},

	method: method = (path, ...args) => {
		return object => {
			try {
				return _.get(object, path)(...args)
			} catch (e) {
				return undefined
			}
		}
	},

	methodOf: methodOf = (path, ...args) => {
		return object => {
			try {
				return _.get(object, path)(...args)
			} catch (e) {
				return undefined
			}
		}
	},

	nthArg: nthArg = (n = 0) => (...args) => n < 0 ? args[args.length - n] :args[n],

	curry: function curry (func, arity = func.length) {
		return function (...args) {
			if (args.length >= arity) {
				return func(...args)
			} else {
				return curry(func.bind(null, ...args), arity - args.length)
			}
		}
	},

	bind: function bind(func, ...fixedArgs) {
		return function (...args) {
			return func(...fixedArgs, ...args)
		}
	},

	debounce: debounce = (func, duration) => {
		var timeoutId
		return function (...args) {
			if (timeoutId) clearTimeout(timeoutId)
			setTimeout(() => {
				func.call(this, ...args)
			}, duration);
		}
	},

	throttle: throttle = (func, duration) => {
		var lastRuntime = -Infinity
		var lastResult
		return function (...args) {
			var now = Date.now()
			if (now - lastRuntime > duration) {
				lastResult = func.call(this, ...args)
			}
			return lastResult
		}
	}

	// isEqual: function isEqual(value, other) {
	// 	if (value === other) return true
	// 	var type1 = this.getType(value)
	// 	var type2 = this.getType(other)

	// 	if (type1 !== type2) return false

	// 	if (type1 === 'String' || type1 === 'Boolean' || type1 === 'Number') {
	// 		return value.toString() === other.toString()
	// 	}

	// 	if (type1 === 'Array' || type1 = 'Object') {
	// 		var key1 = Object.keys(value)
	// 		var key2 = Object.keys(other)
	// 		if (key1.length !== key2.length) return false
	// 		return key1.every(key => isEqual(value[key], other[key]))
	// 	}

	// 	return false
	// }


}
