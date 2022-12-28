---
title: diff
group: 
  title: diff
---

##### diff 策略

> ###### tree diff
>
> Web UI 中节点跨层级的移动操作特别少，可以忽略不计
>
> 1. 只比较同一层级，跨层级操作则直接 create|delete
>    ![treeDiff](/react/diff/treeDiff.png)
>
> ###### component diff
>
> 拥有相同类的两个组件将会生成相似的的树形结构，拥有不同类的两个组件将会生成不同的树形结构
>
> 1. 同一类型的组件按照原策略继续比较 VDOM，可以通过 shouldComponentUpdate 优化是否更新
> 2. 不同类型组件直接替换所有子节点
>    ![componentDiff](/react/diff/componentDiff.png)
>
> ###### element diff
>
> 对于同一层级的一组子节点，通过唯一 id 区分
> ![elementDiff](/react/diff/elementDiff.png)