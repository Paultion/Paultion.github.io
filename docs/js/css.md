---
title: CSS常见问题
order: 1
group:
  title: css
---

##### 盒模型

> 普通盒模型 content 不包含 padding，但是 IE 盒模型下 content 包含 padding 和 border
>
> ###### W3C 标准盒模型
>
> - content
> - padding
> - margin
> - border
>
> ###### IE 怪异盒模型
>
> - content(content、padding、border)
> - margin

##### 垂直水平局中方案

> ###### 行内元素
>
> 1. **text-align** + **line-height**
> 2. **position** + **transform**
> 3. flex: **align-items: center** + **justify-content: center**
> 4. **display: table-cell** + **vertical-align: middle** + (**text-align: center** | **margin: 0 auto**)
>
> ###### 块级元素

##### 选择器优先级

> !important > 内联 > id > class = props > tag = 伪元素选择器

##### position

> 1. 相对定位（relative）：相对自身进行定位
> 2. 绝对定位（absolute）：基于 relative 进行定位，若没有则根据浏览器窗口定位
> 3. 固定定位（fixed）：相对浏览器进行定位
> 4. 粘性定位（sticky）：滑动到一定距离进行固定定位

##### BEM 命名规范

> 1. 中划线（-） ：仅作为连字符使用，表示某个块或者某个子元素的多单词之间的连接记号。
> 2. 双下划线（\_\_）：双下划线用来连接块和块的子元素
> 3. 双中划线（--）：单下划线用来描述一个块或者块的子元素的一种状态
