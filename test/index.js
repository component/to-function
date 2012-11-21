
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

  it('should invoke getter-style functions', function(){
    var user = { attrs: { name: 'tj' }};
    user.name = function(){ return this.attrs.name };
    var fn = toFunction('name');
    assert('tj' == fn(user));
  })
})

describe('toFunction(fn)', function(){
  it('should return the function', function(){
    var fn = function(){};
    assert(fn == toFunction(fn));
  })
})

describe('toFunction(regexp)', function(){
  it('should .test the value', function(){
    var fn = toFunction(/^tob/);
    assert(false === fn({}));
    assert(false === fn('luna'));
    assert(true === fn('tobi'));
  })
})

describe('toFunction(other)', function(){
  it('should default to === equality', function(){
    var fn = toFunction(null);
    assert(true == fn(null));
    assert(false == fn(0));
    assert(false == fn());
  })
})