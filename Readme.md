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
```

## Converts

  - strings to expressions, for ex `foo.bar()` becomes `return _.foo.bar()`
  - regexps to `re.test(val)` calls
  - functions to themselves
  - defaults to `===` equality

## License

  MIT
