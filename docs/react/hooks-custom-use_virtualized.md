---
title: useVirtualized
order: 3
group:
  title: hooks-custom
---

```js
import { useEffect, useState } from 'react';
import { throttle } from 'common/debounce-throttle';

interface IUseVirtualizedProps {
  scrollElement?: () => HTMLElement; // 滚动元素
  rowCount: number; // 每行数量
  rowHeight: number; // 每行高度
  visualAreaHeight: number; // 视区高度
  extraScrollHeight?: number; // 滚动区域额外高度
}

export default function useVirtualized({
  scrollElement,
  rowCount,
  rowHeight,
  extraScrollHeight = 0,
  visualAreaHeight,
}: IUseVirtualizedProps) {
  const visibleRows = Math.ceil(visualAreaHeight / rowHeight) + 1;

  const [scrollParams, setScrollParams] = useState({
    renderRange: {
      startIndex: 0,
      endIndex: rowCount * visibleRows,
    },
  });
  const {
    renderRange: { startIndex, endIndex },
  } = scrollParams;

  useEffect(() => {
    let scrollEl;
    const scrollFunc = throttle(() => {
      const scrollTop = scrollEl.scrollTop;

      // 开始行
      const startRow = Math.floor((scrollTop - extraScrollHeight) / rowHeight);
      // 结束行
      const endRow = startRow + visibleRows;

      setScrollParams({
        renderRange: {
          startIndex: startRow * rowCount,
          endIndex: endRow * rowCount,
        },
      });
    }, 50);

    if (!scrollElement) {
      scrollEl = globalThis?.document.documentElement;
      globalThis.onscroll = scrollFunc;
    } else if (typeof scrollElement === 'function') {
      scrollEl = scrollElement();
      scrollEl.onscroll = scrollFunc;
    }
  }, []);

  return {
    startIndex,
    endIndex,
  };
}
```
