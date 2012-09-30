
var toFunction = require('..')
  , assert = require('assert');

describe('toFunction(str)', function(){
  it('should access properties', function(){
    var fn = toFunction('name');
    fn({ name: 'Tobi' }).should.equal('Tobi');
  })

  it('should access nested properties', function(){
    var fn = toFunction('name.first');
    fn({ name: { first: 'Tobi' } }).should.equal('Tobi');
  })

  it('should ignore undefined properties', function(){
    var fn = toFunction('name.first');
    assert(null == fn({}));
  })
})

describe('toFunction(fn)', function(){
  it('should return the function', function(){
    var fn = function(){};
    assert(fn == toFunction(fn));
  })
})