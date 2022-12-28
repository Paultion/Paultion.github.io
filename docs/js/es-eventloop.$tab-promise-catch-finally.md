---
title: catch-finally
order: 7
group:
  title: es
---

```js
function promiseCatch(onRejected) {
  return this.then(undefined, onRejected);
}

function promiseFinally(cb) {
  return this.then(
    v => {
      return MyPromise.resolve(cb()).then(() => v);
    },
    e => {
      return MyPromise.resolve(cb()).then(() => {
        throw e;
      });
    }
  );
}
```
