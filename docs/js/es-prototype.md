---
title: 原型链
order: 3
group:
  title: es
---

```js
const name = 'Paultion0';
const age = 18;

function test(name, age) {
  return {
    name,
    age,
    ctxName: this.name
  };
}
const ctx = { name: 'Paultion1' };
```

```js
/**
 * bind
 */
if (!Function.prototype.myBind)
  Function.prototype.myBind = function (context, ...args) {
    return (...args1) => {
      context = context || window;
      const args2 = [...args, ...args1];
      context.fn = this;
      const v = context.fn(...args2);
      delete context.fn;
      return v;
    };
  };
const t = test.myBind(ctx, name);
console.log(t(age));
```

```js
/**
 * call
 */
if (!Function.prototype.myCall)
  Function.prototype.myCall = function (context, ...args) {
    context = context || window;
    context.fn = this;
    const v = context.fn(...args);
    delete context.fn;
    return v;
  };
const t2 = test.myCall(ctx, name, age);
console.log(t2)
```

```js
/**
 * apply
 */
if (!Function.prototype.myApply)
  Function.prototype.myApply = function (context, args) {
    context = context || window;
    context.fn = this;
    const v = context.fn(...args);
    delete context.fn;
    return v;
  };
const t3 = test.myApply(ctx, [name, age]);
console.log(t3);
```
