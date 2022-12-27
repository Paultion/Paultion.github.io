---
title: Promise
order: 7
group:
  title: es
---

```js
import staticFunction from './all-race-resolve-reject-allSettled.js';
import prototypeFunction from './catch-finally.js';

const isFunction = f => typeof f === 'function';
const PromiseEnum = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
};

class MyPromise {
  constructor(exec) {
    this.status = 'PENDING';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      if (this.status === PromiseEnum.PENDING) {
        this.status = PromiseEnum.FULFILLED;
        this.value = value;
        // 循环执行成功回调队列
        while (this.onResolvedCallbacks.length)
          this.onResolvedCallbacks.shift()();
      }
    };

    const reject = reason => {
      if (this.status === PromiseEnum.PENDING) {
        this.status = PromiseEnum.REJECTED;
        this.reason = reason;
        // 循环执行失败回调队列
        while (this.onRejectedCallbacks.length)
          this.onRejectedCallbacks.shift()();
      }
    };

    try {
      exec(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulFilled, onRejected) {
    onFulFilled = isFunction(onFulFilled) ? onFulFilled : v => v;
    onRejected = isFunction(onRejected)
      ? onRejected
      : err => {
          throw err;
        };

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === PromiseEnum.FULFILLED) {
        setTimeout(() => {
          try {
            // 执行成功回调，返回普通值直接resolve，若返回MyPromise实例执行此实例then注册回调等待执行
            const sx = onFulFilled(this.value);
            resolvePromise(promise2, sx, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === PromiseEnum.REJECTED) {
        setTimeout(() => {
          try {
            const fx = onRejected(this.reason);
            resolvePromise(promise2, fx, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === PromiseEnum.PENDING) {
        // 存储成功和失败回调
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('cycle call for promise'));
  }
  if (x instanceof MyPromise) {
    // x.then(v => resolve(v), e => reject(e));
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

Object.assign(MyPromise, staticFunction(MyPromise));
Object.assign(MyPromise.prototype, prototypeFunction(MyPromise));

const p = new MyPromise((resolve, reject) => {
  reject('fail');
})
  .then(
    d => console.log(d),
    e => console.log(e, 111)
  )
  .then(undefined, e => console.log(e, 222));

new MyPromise((resolve, reject) => {
  setTimeout(_ => {
    resolve('my code delay 2000 ms');
  }, 2000);
})
  .then(result => {
    console.log(result, 111111);
    console.log('第 1 个 then');
  })
  .then(result => {
    console.log(result, 222222);
    console.log('第 2 个 then');
  });

export default MyPromise;
```
