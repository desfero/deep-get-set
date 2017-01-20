var test = require('tape');
var deep = require('./');

test('deep gets', function (t) {
    var obj = {
        foo: 'qux',
        bar: 'baz'
    };
    t.equal(deep(obj, 'foo'), 'qux');
    t.equal(obj.bar, 'baz');

    obj = {
        bar: {
            baz: {
                beep: 'boop'
            }
        }
    };
    t.equal(deep(obj, 'bar.baz.beep'), 'boop');

    obj = {
        quz: ['yeey']
    };
    t.equal(deep(obj, 'quz.0'), 'yeey');
    t.equal(deep(obj, 'quz[0]'), 'yeey');

    obj = {
        quz: {
            2: 'yaay'
        }
    };
    t.equal(deep(obj, 'quz.2'), 'yaay');
    t.equal(deep(obj, 'quz[2]'), 'yaay');

    obj = {
        quz: {
            1: {
                foo: 'baz'
            }
        }
    };
    t.equal(deep(obj, 'quz[1].foo'), 'baz');

    obj = [[undefined, [undefined, undefined, [undefined, undefined, undefined, 'yaay']]]];
    t.equal(deep(obj, '[0][1][2][3]'), 'yaay');

    obj = {
        0: {
            1: {
                2: {
                    3: 'yaay'
                }
            }
        }
    };
    t.equal(deep(obj, '0.1.2.3'), 'yaay');

    obj = {};
    t.equal(deep(obj, 'bar.baz.beep.yep.nope'), undefined);
    t.end();
});

test('deep sets on empty object', function (t) {
    var obj = {};
    t.equal(deep(obj, 'foo.bar', 'baz'), 'baz');
    t.equal(obj.foo.bar, 'baz');

    obj = {};
    t.equal(deep(obj, 'bar[4]', 'baz'), 'baz');
    t.equal(Array.isArray(obj.bar), true);
    t.equal(obj.bar[4], 'baz');

    obj = {};
    t.equal(deep(obj, 'bar[4][2]', 'baz'), 'baz');
    t.equal(Array.isArray(obj.bar), true);
    t.equal(Array.isArray(obj.bar[4]), true);
    t.equal(obj.bar[4][2], 'baz');

    obj = [];
    t.equal(deep(obj, '[4][2]', 'baz'), 'baz');
    t.equal(Array.isArray(obj[4]), true);
    t.equal(obj[4][2], 'baz');

    t.end();
});

test('deep sets on existing object', function (t) {
  var obj = {
    bar: {
      baz: 'foo'
    },
    foo: [1, 2],
    quix: []
  };

  t.equal(deep(obj, 'bar.qux', 'quix'), 'quix');
  t.equal(obj.bar.baz, 'foo');
  t.equal(obj.bar.qux, 'quix');

  t.equal(deep(obj, 'foo[2]', 3), 3);
  t.equal(obj.foo[0], 1);
  t.equal(obj.foo[1], 2);
  t.equal(obj.foo[2], 3);

  t.equal(deep(obj, 'quix[1].bar', 'baz'), 'baz');
  t.equal(obj.quix[1].bar, 'baz');

  t.end();
});


test('deep sets on null and undefined own objects', function (t) {
  var obj = {
    foo: null,
    bar: undefined
  };

  t.equal(deep(obj, 'foo.quz', 'quix'), 'quix');
  t.equal(obj.foo.quz, 'quix');

  t.equal(deep(obj, 'bar.qux', 'quix'), 'quix');
  t.equal(obj.bar.qux, 'quix');

  t.end();
});