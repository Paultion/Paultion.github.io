---
title: 驼峰解析
group:
  title: es
---

```js
const o = {
  aBcD: {
    eFgH: {
      IjKl: {
        mNoP: 111,
        qRsT: {
          uVwX: 222,
        },
        uVwX: [1, 2, 3],
      },
    },
  },
};

function camelToUnderline(obj) {
  (function t(obj) {
    Object.keys(obj).forEach(o => {
      const newO = o.replace(/[A-Z]/g, $0 => `_${$0.toLowerCase()}`);
      obj[newO] = obj[o];
      Reflect.deleteProperty(obj, o);
      if (Object.prototype.toString.call(obj[newO]) === '[object Object]') {
        t(obj[newO]);
      }
    });
  })(obj);
}

camelToUnderline(o);

console.log(JSON.stringify(o, null, 2));
```
