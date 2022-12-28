---
title: 批量发送请求
group:
  title: es
---

```js
const apis = new Array(10).fill(0).map(
  (item, index) => () =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(index), 1000);
    })
);

function concurrenceControl(apis, count) {
  const batchApis = apis.slice(0, count);
  let i = count;

  function fn(execApis) {
    execApis.forEach((api, index) => {
      api().then(d => {
        console.log(d, new Date());
        if (apis[i]) {
          fn(apis.slice(i, i + 1));
          i++;
        }
      });
    });
  }

  fn(batchApis);
}

concurrenceControl(apis, 4);
```
