
/**
 * Expose `toFunction()`.
 */

module.exports = toFunction;

/**
 * Convert `obj` to a `Function`.
 *
 * @param {Mixed} obj
 * @return {Function}
 * @api private
 */

function toFunction(obj) {
  switch (typeof obj) {
    case 'function':
      return obj;
    case 'string':
      return stringToFunction(obj);
    default:
      throw new TypeError('invalid callback "' + obj + '"');
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
      obj = obj[props[i]];
    }
    return obj;
  }
}