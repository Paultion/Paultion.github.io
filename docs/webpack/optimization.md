---
title: 优化
group:
  title: optimization
---

> ###### 持久化缓存
>
> - hash
>
>   1. hash 计算所有 chunks 的 hash，每次生成一个唯一的 hash
>   2. chunkHash 为每个 chunk 计算 hash，样式 hash 和对应脚本的 hash 相同
>   3. contentHash extract-text-plugin 为 css 提供的 hash，css 文件 hash 只跟本身有关
>
> - module id
>
>   1. 目的：module id 会基于默认的解析顺序增量，增删文件之后文件对应 hash 值会发生变化
>   2. 解决方案：
>    开发环境使用<font color='red'>NamedModulePlugin</font>将 module id 转换成模块路径，
>    生产环境使用<font color='red'>HashedModuleIdsPlugin</font>将 module id 转换成 hash 之后的模块路径
>
> ######  预编译
> DllPlugin 创建动态链接库文件
> DllReferencePlugin 在主配置中引入打包好的动态链接库文件
>
> ######  Tree Shaking
>
> ######  缓存
> 1. cache-loader
> 2. babel-loader
>
> ###### 多进程打包
> happypack
> thread-loader
>
> ###### alias 路径别名
>
> ###### noParse 不解析和转换未遵循 CommonJS 规范的模块
