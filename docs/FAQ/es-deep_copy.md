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

```js
function deepClone(target, qfHash = new WeakMap()) {
  // 处理null
  if (target === null) return target;
  // 处理日期
  if (target instanceof Date) return new Date(target);
  // 处理正则
  if (target instanceof RegExp) return new RegExp(target);
  // 处理DOM元素
  if (target instanceof HTMLElement) return target;
  // 处理原始类型和函数
  if (typeof target !== 'object') return target;
  /* 引用类型进行深拷贝*/
  // 需要拷贝当前对象时，先去存储空间中找，有的话直接返回
  if (qfHash.has(target)) return qfHash.get(target);
  // 创建一个新的克隆对象或克隆数组，存储进hash中
  const cloneTarget = new target.constructor();
  qfHash.set(target, cloneTarget);
  /* 引入Reflect.ownKeys处理Symbol作为键名的情况，且进行赋值 */
  Reflect.ownKeys(target).forEach(key => {
    cloneTarget[key] = deepClone(target[key], qfHash);
  });
  return cloneTarget;
}
```
