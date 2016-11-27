# deeppi

Set and get values on objects via dot-notation strings or array notation.

## Example

```js
var deep = require('deeppi');

var obj = {
  foo: {
    bar: 'baz'
    qux: ['quix']
  }
};

// Get
console.log(deep(obj, 'foo.bar'));
  // => "baz"
  
// Get
console.log(deep(obj, 'foo.qux[0]'));
  // => "quix"

// Set
deep(obj, 'foo.bar', 'hello');
console.log(obj.foo.bar);
  // => "hello"
  
// Set
  deep(obj, 'foo.qux[1]', 'baz');
  console.log(obj.foo.qux[1]);
    // => "baz"
```

## API

### deep(object, path[, value])

Where `path` is a dot-notation string `foo.bar` or array notation string `foo[0]`.

- If `value` is passed it will be set on the path.
- Set `deep.p = true` if you want non-existent paths to be initialized.
- If you want to unset (or delete), pass `undefined` as the `value`.

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install deeppi
```

## Note

There's a dozen modules like this on [npm](https://npmjs.org).
This is a fork from [@acstll's](https://github.com/acstll) [deep-get-set](https://github.com/acstll/deep-get-set) module, with additional array notation access 


## License

MIT