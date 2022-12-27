---
title: 继承
order: 4
group:
  title: es
---

##### ES5、ES6 继承区别

> ###### 继承机制不同
>
> 1. ES5：子类对于父类构造函数的继承时，子类的 this 已经存在，通过 SuperType.call(this, ...args) 的方式来修改子类的 this
> 2. ES6：子类必须要调用 super(...args) 来生成 this

> ###### 构造函数原型链指向不同
>
> 1. ES5：子类和父类的原型链都指向 Function.prototype
> 2. ES6：子类原型链都指向父类的构造函数
