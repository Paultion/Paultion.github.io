---
title: all-race-resolve-reject-allSettled
order: 7
group:
  title: es
---

```js
function all(list) {
  // 存储值集合
  const result = [];
  let index = 0;
  return new MyPromise((resolve, reject) => {
    function addData(i, v) {
      result[i] = v;
      index++;
      if (index >= list.length) {
        resolve(result);
      }
    }

    for (let [i, l] of list.entries()) {
      // 非MyPromise实例直接存储
      if (l instanceof MyPromise) {
        l.then(
          v => addData(i, v),
          reason => reject(reason)
        );
      } else {
        addData(i, l);
      }
    }
  });
}

function race(list) {
  return new Promise((resolve, reject) => {
    for (let l of list) {
      this.resolve(l).then(
        d => resolved(d),
        e => reject(e)
      );
    }
  });
}

function allSettled(promises) {
  const result = [];
  let index = 0;
  return new Promise((resolve, reject) => {
    function addData(k, v) {
      result[k] = v;
      index++;
      if (index >= promises.length) {
        resolve(result);
      }
    }
    for (let [k, v] of promises.entries()) {
      if (v instanceof Promise) {
        v.then(
          d => addData(k, { status: 'fulfilled', value: d }),
          r => reject({ status: 'rejected', reason: r })
        );
      } else {
        addData(k, v);
      }
    }
  });
}

function resolve(v) {
  if (v instanceof MyPromise) return v;
  return new MyPromise(resolve => resolve(v));
}

function reject(v) {
  if (v instanceof MyPromise) return v;
  return new MyPromise((resolve, reject) => reject(v));
}
```
