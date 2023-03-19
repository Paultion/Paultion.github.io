---
title: 模块
debug:  true
order: 1
group:
  title: module
---

[CommonJs](https://juejin.cn/post/6892786383249735687)

[CommonJS & ESModule 区别](https://juejin.cn/post/6994224541312483336)

[CommonJs & ESModule 加载规范](https://zhuanlan.zhihu.com/p/346405395)

##### CommonJS

> 1. CommonJS 模块由 JS 运行时实现
> 2. 模块的输出的是值的复制拷贝，对于基本数据类型的输出，属于复制，对于复杂数据类型，属于浅拷贝
> 3. CommonJS 模块同步加载并执行模块文件

##### ES Module

> 1.  ES Module 静态，不能放进会计作用域，代码发生在编译时
> 2.  ES Module 值为动态绑定，不能直接修改，可以通过导出方法修改
> 3.  ES Module 提前加载并执行模块文件
> 4.  ES Module 导入模块在严格模式下
> 5.  ES Module 特性可以很容易实现 Tree Shaking 和 Code Splitting
```js
// CommonJS

//main.js
const a = require('./a')
const b = require('./b')
console.log('node 入口文件')

// a.js
const getMes = require('./b')
console.log('我是 a 文件')
exports.say = function(){
    const message = getMes()
    console.log(message)
}

// b.js
const say = require('./a')
const  object = {
   name:'《React进阶实践指南》',
   author:'我不是外星人'
}
console.log('我是 b 文件')
console.log('打印 a 模块' , say)

setTimeout(()=>{
    console.log('异步打印 a 模块' , say)
},0)

module.exports = function(){
    return object
}

// result
// 我是b文件
// 打印a模块 {}
// 我是a文件
// node入口文件
// 异步打印a模块 { say: [Function] }

```

```js
// ESM

// main.js
console.log('main.js开始执行')
import say from './a'
import say1 from './b'
console.log('main.js执行完毕')

// a.js
import b from './b'
console.log('a模块加载')
export default  function say (){
    console.log('hello , world')
}

// b.js
console.log('b模块加载')
export default function sayhello(){
    console.log('hello,world')
}

// result
// b模块加载
// a模块加载
// main.js开始执行
// main.js执行结束
```