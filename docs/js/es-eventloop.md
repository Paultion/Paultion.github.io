---
title: 事件循环
order: 7
group: 
  title: es  
---

[事件循环机制](https://mp.weixin.qq.com/s/QgfE5Km1xiEkQqADMLmj-Q)




### generator
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

### LazyMan

```js
class _LazyMan {
  constructor(name) {
    this.name = name;
    this.callBackQueues = [];

    console.log(`Hi, i am ${name}`);

    let promise = Promise.resolve();
    setTimeout(() => {
      this.callBackQueues.forEach(callback => {
        promise = promise.then(callback);
      });
    });
  }

  eat(food) {
    const _eat = food => {
      console.log(`${this.name} is eating ${food}`);
    };
    this.callBackQueues.push(_eat.bind(this, food));
    return this;
  }
  sleepFirst(timeout) {
    const s = () => {
      return new Promise(resolve =>
        setTimeout(() => {
          console.log(`waiting ${timeout}s`);
          resolve();
        }, timeout * 1000)
      );
    };
    this.callBackQueues.unshift(s);
    return this;
  }
  sleep(timeout) {
    const s = () => {
      return new Promise(resolve =>
        setTimeout(() => {
          console.log(`waiting ${timeout}s`);
          resolve();
        }, timeout * 1000)
      );
    };
    this.callBackQueues.push(s);
    return this;
  }
}

function LazyMan(name) {
  return new _LazyMan(name);
}

LazyMan('dmb');
LazyMan('Paultion').eat('lunch');
LazyMan('jason').sleep(3).eat('lunch');
LazyMan('pfdxcl').eat('lunch').sleep(3).eat('dinner');
LazyMan('nerix').eat('breakfast').eat('lunch').sleepFirst(3).sleep(3).eat('dinner');

// Promise.resolve().then(() => console.log('eat lunch')).then(() => new Promise(resolve => setTimeout(() => {
// 	console.log('waiting')
// 	resolve()
// }, 1000))).then(() => console.log('eat dinner'))

// Promise.resolve().then(() => {
// 	console.log('eat lunch');

// })

```