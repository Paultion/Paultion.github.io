---
title: 模块
order: 1
group:
  title: modules
---

[CommonJs](https://juejin.cn/post/6892786383249735687)

[CommonJS & ESModule 区别](https://juejin.cn/post/6994224541312483336)

[CommonJs & ESModule 加载规范](https://zhuanlan.zhihu.com/p/346405395)

##### Commonjs

> 1. CommonJS 模块由 JS 运行时实现
> 2. 模块的输出的是值的复制拷贝，对于基本数据类型的输出，属于复制，对于复杂数据类型，属于浅拷贝
> 3. CommonJS 模块同步加载并执行模块文件

##### ES Module

> 1.  ES Module 静态，不能放进会计作用域，代码发生在编译时
> 2.  ES Module 值为动态绑定，不能直接修改，可以通过导出方法修改
> 3.  ES Module 提前加载并执行模块文件
> 4.  ES Module 导入模块在严格模式下
> 5.  ES Module 特性可以很容易实现 Tree Shaking 和 Code Splitting
