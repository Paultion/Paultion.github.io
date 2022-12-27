---
title: 寄生组合式继承
---

```js
function SuperType(name) {
  this.name = name;
}
SuperType.staticFun = function () {
  console.log('staticFun');
};
SuperType.prototype.sayName = function () {
  return this.name;
};
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
SubType.prototype = Object.create(SuperType.prototype);
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  return this.age;
};
```
