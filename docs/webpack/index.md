---
title: webpack
nav:
  title: webpack
  order: 8
---

##### 构建流程
> 1. 初始化参数：从配置文件和命令行读取、合并参数，得出最终的结果
> 2. 用得到的参数初始化Compiler对象，加载所有的插件啊，执行Compiler的run方法
> 3. 从入口文件开始调用配置的loader编译文件，并找出依赖关系递归处理
> 4. 根据入口和模块之间的关系，确定最终输出的chunk文件
> 5. 在以上过程中pllugin监听到webpack广播出的事件，调用webpack的API改变输出结果

##### Loader     
> Loader是资源加载器，操作的是文件，实现的是资源模块的转换和编译，需要导出一个函数，对加载的资源进行处理，输出最终的加载结果。

##### Plugin:
> Plugin是扩展器，基于事件机制，监听webpack构建过程中广播的事件，针对的是webpack的整个构建流程。Plugin是在webpack构建的生命周期钩子中挂载处理函数，在不同的节点挂载不同的任务，一般为包含apply方法的函数
