var abandon599 = {
	/**
	 * [chunk description]
	 * @param  {[type]} array [description]
	 * @param  {Number} size  [description]
	 * @return {[type]}       [description]
	 */
	chunk: function chunk (array, size = 1) {
		var result = []
		for (i = 0; i < array.length; i += size) {
			result.push(array.slice(i, i + size))
		}
		return result
	},

	/**
	 * [compact description]
	 * @param  {[type]} array [description]
	 * @return {[type]}       [description]
	 */
	compact: function compact (array) {
		var result = []
		for (i = 0; i < array.length; i++) {
			if (array[i]) {
				result.push(array[i])
			}
		}
		return result
	},

	/**
	 * [difference description]
	 * @param  {[type]} array [description]
	 * @return {[type]}       [description]
	 */
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

	/**
	 * [drop description]
	 * @param  {[type]} array [description]
	 * @param  {Number} n     [description]
	 * @return {[type]}       [description]
	 */
	drop: drop = (array, n = 1) => array.slice(n),
	/**
	 * [dropRight description]
	 * @param  {[type]} array [description]
	 * @param  {Number} n     [description]
	 * @return {[type]}       [description]
	 */
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

	/**
	 * [fill description]
	 * @param  {[type]} array [description]
	 * @param  {[type]} value [description]
	 * @param  {Number} start [description]
	 * @param  {[type]} end   [description]
	 * @return {[type]}       [description]
	 */
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

	/**
	 * [flatten description]
	 * @param  {[type]} array [description]
	 * @return {[type]}       [description]
	 */
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

	/**	
	 * [flattenDeep description]
	 * @param  {[type]} array [description]
	 * @return {[type]}       [description]
	 */
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

	/**
	 * [flattenDepth description]
	 * @param  {[type]} array [description]
	 * @param  {Number} depth [description]
	 * @return {[type]}       [description]
	 */
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

	/**
	 * [fromPairs description]
	 * @param  {[type]} pairs [description]
	 * @return {[type]}       [description]
	 */
	fromPairs: function fromPairs (pairs) {
		result = {}
		for (i = 0; i < pairs.length; i++) {
			result[pairs[i][0]] = pairs[i][1]
		}
		return result
	},

	/**
	 * [indexOf description]
	 * @param  {[type]} array     [description]
	 * @param  {[type]} value     [description]
	 * @param  {Number} fromIndex [description]
	 * @return {[type]}           [description]
	 */
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

	/**
	 * [initial description]
	 * @param  {[type]} array [description]
	 * @return {[type]}       [description]
	 */
	initial: function initial (array) {
		result = array.slice()
		if (result.length !== 0) {
			result.length = result.length - 1
		}
		return result
	},

	/**
	 * [intersection description]
	 * @param  {[type]} arrays [description]
	 * @return {[type]}        [description]
	 */
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



	/**
	 * [forEach description]
	 * @param  {[type]} collection [description]
	 * @param  {[type]} iteratee   [description]
	 * @return {[type]}            [description]
	 */
	forEach: function forEach (collection, iteratee) {
		var iteratee = _.iteratee(iteratee)
		for (var key in collection) {
			iteratee(collection[key], key, collection)
		}
		return collection
	},

	// filter: function filter(collection, predicate) {


	// },

	/**
	 * [创建一个深比较的方法来比较给定的对象和source对象，如果给定的对象拥有相同的属性值返回true，否则返回false]
	 * @param  {[type]} source [给定的source对象]
	 * @return {[type]}        [返回Boolean]
	 */
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
	/**
	 * [返回collection（集合）的长度，如果是对象返回其可以枚举的个数，如果是字符串或者数组，则返回其长度]
	 * @param  {[type]} collection [description]
	 * @return {[type]}            [description]
	 */
	size: size = collection => _.isObject(collection) ? Object.keys(collection).length : collection.length,
	/**
	 * [使用函数来进行数据的汇总，通过一组数值，给出经过函数iteratee计算之后的值]
	 * @param  {[type]} collection  [给定的数组或者对象]
	 * @param  {[type]} iteratee    [需要进行计算的计算]
	 * @param  {[type]} accumulator [计算初始值，或者对象类型]
	 * @return {[type]}             [计算汇总之后的返回结果]
	 */
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

	/**
	 * [flip给定函数，将数据反向调用]
	 * @param  {[type]} func [给定的函数]
	 * @return {[type]}      [返回反向调用之后返回的值]
	 */
	flip: function flip (func) {
		return function (...args) {
			return func(...args.reverse())
		}
	},

	/**
	 * [negate给定函数，返回与这个函数相反的计算结果]
	 * @param  {[type]} predicate [给定的函数]
	 * @return {[type]}           [description]
	 */
	negate: function negate (predicate) {
		return function (...args) {
			return !predicate(...args)
		}
	},
	/**
	 * [函数仅调用一次，第二次调用时，函数不在调用，返回第一次调用的结果]
	 * @param  {[type]} func [once调用的函数]
	 * @return {[type]}      [返回的结果，第二次调用也返回第一次调用的结果]
	 */
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

	/**
	 * [创建的函数只能接受一个参数，忽略多余的参数]
	 * @param  {[type]} func [传入的函数]
	 * @return {[type]}      [返回函数处理第一个参数的返回值]
	 */
	unary: function unary (func) {
		return function (arg) {
			return func(arg)
		}
	},

	/**
	 * [创建的一个调用的函数只能接受n个参数，忽略多余的函数]
	 * @param  {[type]} func [创建一个调用的函数]
	 * @param  {[type]} n    [能接受的n个函数的数量]
	 * @return {[type]}      [返回函数接受]
	 */
	ary: function ary (func, n = fun.length) {
		return function (...args) {
			if (n < args.length) {
				args.length = n
			}
			return func(...args)
		}
	},

	/**
	 * [times description]
	 * @param  {[type]} n        [description]
	 * @param  {[type]} iteratee [description]
	 * @return {[type]}          [description]
	 */
	times: function times (n, iteratee) {
		var result = []
		for (var i = 0; i < n; i++) {
			result.push(iteratee(i))
		}
		return result
	},

	/**
	 * [join description]
	 * @param  {[type]} array     [description]
	 * @param  {String} separator [description]
	 * @return {[type]}           [description]
	 */
	join: function join (array, separator = ".") {
		var separator = separator.toString(),
			result = ''
		for (var sub in array) {
			sub == array.length - 1 ? result += array[sub] : result += array[sub] + separator
		}
		return result
	},

	/**
	 * [last description]
	 * @param  {[type]} array [description]
	 * @return {[type]}       [description]
	 */
	last: function last (array) {
		return array[array.length - 1]
	},

	/**
	 * [lastIndexOf description]
	 * @param  {[type]} array     [description]
	 * @param  {[type]} value     [description]
	 * @param  {[type]} fromIndex [description]
	 * @return {[type]}           [description]
	 */
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

	/**
	 * [nth description]
	 * @param  {[type]} array [description]
	 * @param  {Number} n     [description]
	 * @return {[type]}       [description]
	 */
	nth: nth = (array, n = 0) => n >= 0 ? array[n] : array[array.length + n],

	/**
	 * [pull description]
	 * @param  {[type]} array   [description]
	 * @param  {[type]} [value] [description]
	 * @return {[type]}         [description]
	 */
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
	/**
	 * [reverse description]
	 * @param  {[type]} array [description]
	 * @return {[type]}       [description]
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
	/**
	 * [将value转化为属性路径的数组]
	 * @param  {[type]} value [需要转换的数组]
	 * @return {[type]}       [返回的结果]
	 */
	toPath: toPath = (value) => value.toString().split('[').join('.').split(']').join('').split('.'),

	/**
	 * [根据object对象的path路径取值，如果value是undefined返回defaulValue的值]
	 * @param  {[type]} object       [需要取值的对象]
	 * @param  {[type]} path         [取值的路径]
	 * @param  {[type]} defaultValue [当结果为undefined返回的值]
	 * @return {[type]}              [返回值]
	 */
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

	/**
	 * [forIn description]
	 * @param  {[type]} object   [description]
	 * @param  {[type]} iteratee [description]
	 * @return {[type]}          [description]
	 */
	forIn: function forIn (object, iteratee) {
		for (var key in object) {
			iteratee(object[key], key, object)
		}
		return object
	},

	/**
	 * [forIn description]
	 * @param  {[type]} object   [description]
	 * @param  {[type]} iteratee [description]
	 * @return {[type]}          [description]
	 */
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

	/**
	 * [forIn description]
	 * @param  {[type]} object   [description]
	 * @param  {[type]} iteratee [description]
	 * @return {[type]}          [description]
	 */
	forOwn: function forOwn (object, iteratee) {
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				iteratee(object[key], key, object)
			}
		}
		return object
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

	/**
	 * [forIn description]
	 * @param  {[type]} object   [description]
	 * @param  {[type]} iteratee [description]
	 * @return {[type]}          [description]
	 */
	isArray: function isArray (value) {
		return Object.prototype.toString.call(value) === '[object Array]'
	},

	/**
	 * [forIn description]
	 * @param  {[type]} object   [description]
	 * @param  {[type]} iteratee [description]
	 * @return {[type]}          [description]
	 */
	isArrayBuffer: function isArray (value) {
		return Object.prototype.toString.call(value) === '[object ArrayBuffer]'
	},

	/**
	 * [forIn description]
	 * @param  {[type]} object   [description]
	 * @param  {[type]} iteratee [description]
	 * @return {[type]}          [description]
	 */
	isBoolean: function isBoolean (value) {
		return Object.prototype.toString.call(value) == '[object Boolean]'
	},

	/**
	 * [isDate description]
	 * @param  {[type]}  value [description]
	 * @return {Boolean}       [description]
	 */
	isDate: function isDate (value) {
		return Object.prototype.toString.call(value) === '[object Date]'
	},

	/**
	 * [isFunction description]
	 * @param  {[type]}  value [description]
	 * @return {Boolean}       [description]
	 */
	isFunction: function isFunction (value) {
		return Object.prototype.toString.call(value) === '[object Function]'
	},

	/**
	 * [isString description]
	 * @param  {[type]}  value [description]
	 * @return {Boolean}       [description]
	 */
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

	/**
	 * [tail description]
	 * @param  {[type]} array [description]
	 * @return {[type]}       [description]
	 */
	tail: tail = array => array.slice(1),

	/**
	 * [take description]
	 * @param  {[type]} array [description]
	 * @param  {Number} n     [description]
	 * @return {[type]}       [description]
	 */
	take: take = (array, n = 1) => array.slice(0, n),

	/**
	 * [takeRight description]
	 * @param  {[type]} array [description]
	 * @param  {Number} n     [description]
	 * @return {[type]}       [description]
	 */
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

	/**
	 * [简单的JSON解析器]
	 * @param  {[type]} Str [输入需要解析的JSON]
	 * @return {[type]}     [输出解析的结果]
	 */
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
		Objects.forEach(obj => {
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

	property: function property (path) {
		return obj => this.get(obj, path)

		// return obj => this.get(obj, path, "")
	},

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

	curry: function curry (func, arity = func.length) {
		return function (...args) {
			if (args.length >= arity) {
				return func(...args)
			} else {
				return curry(func.bind(null, ...args), arity - args.length)
			}
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