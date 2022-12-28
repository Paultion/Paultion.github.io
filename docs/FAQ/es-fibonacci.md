---
title: 斐波那契数列
group:
  title: es
---

```js
function fibonacci(len) {
  return [...new Array(len).keys()].reduce(
    (t, v, i) => (i > 1 && t.push(t[i - 1] + t[i - 2]), t),
    [0, 1]
  );
}
```
