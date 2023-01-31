---
title: instanceof & new
order: 3
group:
  title: es
---

```js
function _instanceof(I, C) {
  I = I.__proto__;
  while(true) {    
    if (I === C.prototype) return true;
    if (I === null) return false;
    I = I.__proto__;
  }
}
_instanceof([], Object)
```

```js
function _new(Func, ...args){
  const o = Object.create(Func.prototype);
  const result = Func.call(o, ...args);
  return result instanceof Object ? result : o;
}
```