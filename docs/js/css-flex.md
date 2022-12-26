---
group: 
  title: css
---

- container attributes
1. flex-direction: row|row-reverse|column|column-reverse 主轴方向
2. __flex-wrap: nowrap|wrap|wrap-reverse 换行__
3. flex-flow: 主轴方向|换行
4. __justify-content: flex-start|flex-end|center|space-between|space-around 主轴对齐方式__
5. __align-items: flex-start|flex-end|center|baseline|stretch 交叉轴对齐方式__
6. align-content: flex-start|flex-end|center|space-between|space-around 多根轴线对齐方式

-  item attributes
1. order: integer (default: 0) 项目排列顺序，数值越小越靠前
2. __flex-grow: number (default: 0)，项目放大比例，为0时存在剩余空间也不放大__
3. __flex-shrink: number (default: 1)，空间不足时项目缩小比例__
4. __flex-basis: length|auto (defaut: auto)，分配多余空间之前项目占据的主轴空间__
5. __flex: flex-grow|flex-shrink|flex-basis (default: 0 1 auto)，auto => 1 1 auto, none => 0 0 auto, 1 => 1 1 0__
6. align-items: auto | flex-start | flex-end | center | baseline | stretch 改变单个项目的交叉轴对齐方式