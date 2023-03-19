---
title: React v15
order: 1
group:
  title: architecture
---

##### React 15架构
> ###### Reconciler
> 负责找出变化的组件 
> 1. 调用函数组件或class render，将JSX转化为虚拟DOM
> 2. 将虚拟DOM和上次的虚拟ODM作对比
> 3. 对比找出本次更新中变化的DOM.
> ###### Renderer(ReactDOM|ReactNative|ReactTest..etc.. )
> 接受Reconciler通知将变化的组件渲染到页面

##### 缺点
> 在Reconciler中，<a href="https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/ReactDOMComponent.js#L498" target="_blank">mount</a>和<a href="https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/ReactDOMComponent.js#L877" target="_blank">update</a>会递归更新子组件，无法中断
