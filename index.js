
/**
 * Expose `toFunction()`.
 */

module.exports = toFunction;

/**
 * Convert `obj` to a `Function`.
 *
 * TODO: consider compiling to functions.
 *
 * @param {Mixed} obj
 * @return {Function}
 * @api private
 */

function toFunction(obj) {
  switch ({}.toString.call(obj)) {
    case '[object Function]':
      return obj;
    case '[object String]':
      return stringToFunction(obj);
    case '[object RegExp]':
      return regexpToFunction(obj);
    default:
      throw new TypeError('invalid callback "' + obj + '"');
  }
}

/**
 * Convert `re` to a function.
 *
 * @param {RegExp} re
 * @return {Function}
 * @api private
 */

function regexpToFunction(re) {
  return function(obj){
    return re.test(obj);
  }
}

/**
 * Convert property `str` to a function.
 *
 * @param {String} str
 * @return {Function}
 * @api private
 */

function stringToFunction(str) {
  var props = str.split('.');
  return function(obj){
    for (var i = 0; i < props.length; ++i) {
      if (null == obj) return;
      var name = props[i];
      if ('function' == typeof obj[name]) {
        obj = obj[name]();
      } else {
        obj = obj[name];
      }
    }
    return obj;
  }
}