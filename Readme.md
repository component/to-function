# to-function

  Convert property access strings into functions

## Installation

    $ component install component/to-function

## Example

```js
var toFunction = require('to-function');
var fn = toFunction('name.first');
var user = { name: { first: 'Tobi' }};
fn(user);
// => "Tobi"

// Matching object properties:
var fn = toFunction({
  name: 'Tobi',
  age: function(age) {
    return age > 2
  }
});

// Note: matcher ignores additional object properties
var luna = { name: 'Luna', age: 3 };
var tobi = { name: 'Tobi', age: 2 };
var tobi = { name: 'Tobi', age: 3 };

fn(luna); // => false
fn(tobi); // => true

```

## Converts

  - strings to expressions, for ex `foo.bar()` becomes `return _.foo.bar()`
  - regexps to `re.test(val)` calls
  - functions to themselves
  - defaults to `===` equality
  - objects that match object properties

## License

  MIT
