---
title: generator
group:
  title: es
---


```js
function* gen(x) {
  console.log('start');
  const y = yield x * 2;
  return y;
}

// const g = gen(1);
// console.log(g.next());
// console.log(g.next(4));

const thunkify = function (fn) {
  return function (...rest) {
    return function (calllback) {
      return fn(...rest, calllback);
    };
  };
};
F
const run = (generator, ...rest) => {
  return new Promise((resolve, reject) => {
    const g = generator(...rest);
    const next = res => {
      const result = g.next(res);
      if (result.done) return resolve(result.value);
      next(result.value);
    };
    next();
  });
};

run(gen, 3).then(d => console.log(d, 111));

```