
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

  it('should invoke getter-style functions', function(){
    var user = { attrs: { name: 'tj' }};
    user.name = function(){ return this.attrs.name };
    var fn = toFunction('name()');
    assert('tj' == fn(user));
  })

  it('should support js expressions', function(){
    var fn = toFunction('age > 18');
    assert(true === fn({ age: 20 }));
    assert(false === fn({ age: 18 }));
  })

  it('should support js with immediate value', function(){
    var fn = toFunction('> 18');
    assert(true === fn(20));
    assert(false === fn(18));
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

describe('toFunction(object)', function(){
  it('should match object values', function(){
    var fn = toFunction({
      name: 'tobi',
      age: /\d+/
    });
    assert(false === fn({}));
    assert(false === fn({ name: 'luna' }));
    assert(false === fn('tobi'));
    assert(false === fn({ name: 'luna', age: 2 }));
    assert(false === fn({ name: 'tobi' }));
    assert(true === fn({ name: 'tobi', age: 3, type: 'ferret' }));
  })
  
  it('should match regexps in sub-objects', function(){
    var fn = toFunction({
      name: /Mr\./,
      age: function(age) {
        return age > 2
      },
      address: {
        street: /\d+ Mayne Street/,
        town: 'Rhode Island'
      }
    });

    // Doesn't match inner regex
    assert(false === fn({
      name: 'Mrs. Tobi',
      age: 3,
      address: {
        street: 'Somewhere on Mayne Street',
        town: 'Rhode Island'
      }
    }));

    // Missing address.street
    assert(false === fn({
      name: 'Mr. Tobi',
      age: 3,
      address: {
        town: 'Rhode Island'
      }
    }));

    // age < 2
    assert(false === fn({
      name: 'Mr. Tobi',
      age: 2,
      address: {
        street: '12 Mayne Street',
        town: 'Rhode Island'
      }
    }));

    assert(true === fn({
      name: 'Mr. Tobi',
      age: 3,
      address: {
        street: '12 Mayne Street',
        town: 'Rhode Island'
      }
    }));
  });
});

describe('toFunction(other)', function(){
  it('should default to === equality', function(){
    var fn = toFunction(null);
    assert(true == fn(null));
    assert(false == fn(0));
    assert(false == fn());
  })
})