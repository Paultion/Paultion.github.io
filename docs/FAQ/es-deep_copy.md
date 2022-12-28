---
title: 深拷贝
group:
  title: es
---

```js
function deepCopy(o, caches = []) {
  if (o === null || typeof o !== 'object') return o;
  if (o instanceof Date) return new Date(o.getTime());
  if (o instanceof RegExp) return new RegExp(o.source, o.flags);

  const c = caches.find(c => c.origin === o);
  if (c) return c.copy;

  const copy = Array.isArray(o) ? [] : {};
  caches.push({ origin: o, copy });

  Object.keys(o).forEach(i => {
    copy[i] = deepCopy(o[i], caches);
  });
  return copy;
}

var obj1 = { d: obj1, b: 1, c: new Date() };
// obj1.d = obj1;
var obj1Copy = deepCopy(obj1);

console.log(obj1);
console.log(obj1Copy);
```
