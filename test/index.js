
var toFunction = require('..')
  , assert = require('better-assert')
  , should = require('should');

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

  it('should support js expressions with logical operators', function(){
    var fn = toFunction('age > 18 && age < 25 && height > 170 && weight < 60 || rich == "yes"');
    assert(true === fn({ age: 19, height: 175, weight: 55 }));
    assert(false === fn({ age: 22, height: 160, weight: 45 }));
    assert(true === fn({ age: 44, height: 150, weight: 70, rich: "yes" }));
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
  it('should support ==', function(){
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

  it('should support nesting', function(){
    var user = {
      name: {
        first: 'Tobi',
        last: 'Ferret'
      }
    };

    var fn = toFunction({
      name: {
        first: 'Tobi',
        last: 'Ferret'
      }
    });

    assert(true == fn(user));

    var fn = toFunction({
      name: {
        first: 'Loki',
        last: 'Ferret'
      }
    });

    assert(false == fn(user));
  })

  it('should support regexps', function(){
    var user = {
      name: {
        first: 'Tobi',
        last: 'Ferret'
      }
    };

    var fn = toFunction({
      name: { last: /^Fer/ }
    });

    assert(true == fn(user));

    var fn = toFunction({
      name: {
        last: /^ferret$/
      }
    });

    assert(false == fn(user));
  })
});

describe('toFunction(other)', function(){
  it('should default to === equality', function(){
    var fn = toFunction(null);
    assert(true == fn(null));
    assert(false == fn(0));
    assert(false == fn());
  })
})
