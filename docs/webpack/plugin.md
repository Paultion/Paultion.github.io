---
title: 插件
group: 
  title: plugin
---

##### compiler
> 初始化(run) =>   创建compilation(compilation) => 编译(make) => 资源输出(emit)
##### compilation 
> 加载(load) => 封存(seal) => 优化(optimize) => 分块(chunk) => 哈希(hash) => 重新创建(restore)
##### Plugin生命周期
> run 
> compile 创建compilation之前
> compilation 创建compilation之后
>> buildModule
>> seal
>> optimize
>> reviveChunks
>> seal
> make 编译完成前
> afterCompile 编译完成后
> emit 
> afterEmit
> done