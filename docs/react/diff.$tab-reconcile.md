---
title: diff策略详解
---

##### diff策略分类

> react依据newChild(JSX对象)的类型将dif分为单节点diff(<font color=red>reconcileSingleElement、reconcileSingleTextNode</font>)和多节点diff(<font color=red>reconcileChildrenArray</font>)

```js
// 根据newChild类型选择不同diff函数处理
function reconcileChildFibers(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null,
    newChild: any
): Fiber | null {
    const isObject = typeof newChild === 'object' && newChild !== null;

    if (isObject) {
        switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
                // 调用 reconcileSingleElement 处理
                // ...省略其他case
        }
    }

    if (typeof newChild === 'string' || typeof newChild === 'number') {
        // 调用 reconcileSingleTextNode 处理
    }

    if (isArray(newChild)) {
        // 调用 reconcileChildrenArray 处理
    }

    // 一些其他情况调用处理函数

    // 以上都没有命中，删除节点
    return deleteRemainingChildren(returnFiber, currentFirstChild);
}
```

##### 单节点diff

> React通过先判断key是否相同，如果key相同则判断type是否相同，只有都相同时一个DOM节点才能复用。
>
> 当child !== null且key相同且type不同时执行deleteRemainingChildren将child及其兄弟fiber都标记删除（key已匹配上，剩余的oldFiber不可能再次匹配上）。
>
> 当child !== null且key不同时仅将child标记删除。

##### 多节点diff

> ###### 第一轮遍历
> let i = 0，遍历newChildren，将newChildren[i]与oldFiber比较，判断DOM节点是否可复用。
>
> 如果可复用，i++，继续比较newChildren[i]与oldFiber.sibling，可以复用则继续遍历。
>
> 如果不可复用，分两种情况：
>
> 1. key不同导致不可复用，立即跳出整个遍历，第一轮遍历结束。
>
> 2. key相同type不同导致不可复用，会将oldFiber标记为DELETION，并继续遍历
>
> 如果newChildren遍历完（即i === newChildren.length - 1）或者oldFiber遍历完（即oldFiber.sibling === null），跳出遍历，第一轮遍历结束。

> ###### 第二轮遍历
> 1. newChildren与oldFiber同时遍历完
> 只在第一轮遍历更新即diff结束
>
> 2. newChildren没遍历完，oldFiber遍历完
> 遍历剩下的newChildren为生成的workInProcessFiber添加Replacement
> 
> 3. newChildren遍历完，oldFiber没遍历完
> 遍历剩下的oldFiber，依次标记Deletion
>
> 4. newChildren与oldFiber都没遍历完
> lastPlacedIndex初始为0，每遍历一个可复用的节点，如果oldIndex >= lastPlacedIndex，则oldFiber不移动且lastPlacedIndex = oldIndex，如果oldIndex < lastPlacedIndex，则oldFiber移动

<!-- 既然我们的目标是寻找移动的节点，那么我们需要明确：节点是否移动是以什么为参照物？

我们的参照物是：最后一个可复用的节点在oldFiber中的位置索引（用变量lastPlacedIndex表示）。

由于本次更新中节点是按newChildren的顺序排列。在遍历newChildren过程中，每个遍历到的可复用节点一定是当前遍历到的所有可复用节点中最靠右的那个，即一定在lastPlacedIndex对应的可复用的节点在本次更新中位置的后面。

那么我们只需要比较遍历到的可复用节点在上次更新时是否也在lastPlacedIndex对应的oldFiber后面，就能知道两次更新中这两个节点的相对位置改变没有。

我们用变量oldIndex表示遍历到的可复用节点在oldFiber中的位置索引。如果oldIndex < lastPlacedIndex，代表本次更新该节点需要向右移动。

lastPlacedIndex初始为0，每遍历一个可复用的节点，如果oldIndex >= lastPlacedIndex，则lastPlacedIndex = oldIndex。 -->