```js
const funcs = [
  function a(args) {
    return args + 1;
  },
  function b(args) {
    return Math.pow(args, 2);
  },
  function c(args) {
    return args + 2;
  },
];

function compose(...funcs) {
  if (funcs.length === 0) return arg => arg;
  if (funcs.length === 1) return funcs[0];

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

/**
    add(1,2,3,4,5,6) === adder(1)(2)(3)(4)(5)(6)
*/
function add(a, b, c, d, e, f) {
  return [...arguments].reduce((a, b) => a + b);
}

function addWithCurry(fn) {
  const c = (...args) =>
    args.length === fn.length
      ? fn(...args)
      : (...args1) => c(...args, ...args1);
  return c;
}

const adder = addWithCurry(add);

/**
 *  add(1,2,3) === add(1)(2,3) === add(1)(2)(3) === add(1,2)(3)
 */

function add2() {
  const originalArgs = [...arguments];

  const _adder = (...args) => {
    originalArgs.push(...args);
    return _adder;
  };

  _adder.toString = () => {
    return originalArgs.reduce((a, b) => a + b);
  };

  return _adder;
}

function test1(a, b, c) {
  return [...arguments].reduce((x, y) => x * y);
}

function testCurry(fn) {
  const c = (...args) =>
    fn.length === args.length
      ? fn(...args)
      : (...args1) => c(...args, ...args1);
  return c;
}

/*
  实现add方法
  add(1,2).add(3).add(4).output() === 10
  add(1, 2).add(3, 5, 6).add(4).output() === 21
*/

function add3() {
  const fn = arguments.callee;

  fn.args = [...(fn.args || []), ...arguments];

  return {
    output: () => fn.args.reduce((m, n) => m + n),
    [fn.name]: fn,
  };
}
```
