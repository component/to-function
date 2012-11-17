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

## License

  MIT
