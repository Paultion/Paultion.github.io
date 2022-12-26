---
title: 防抖节流
---

```javascript

const ctx = {
  name: 'Paultion',
  test1: function () {
    console.log(this.name, 111);
  },
  test2: function () {
    console.log(this.name, 222);
  }
};

// 防抖：触发事件后再n秒内只能执行一次，如果n秒内又触发了事件，重新计算函数执行时间（只执行一次）
// 应用场景：输入框等
// 非立即执行版每次清除之前的定时器，立即执行版每次清除之前的定时器并在n秒后清除定时器指针

export function debounce(fn, wait, immediate) {
  let timeout;
  return function (...args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) fn.apply(this, args);
    } else {
      timeout = setTimeout(() => {
        console.log(111);
        fn.apply(this, args);
      }, wait);
    }
  };
}

ctx.test1 = debounce(ctx.test1, 1000, false);

for (let i = 0; i < 3; i++) {
  ctx.test1();
}

// 节流：连续触发函数在n秒内只执行一次（减少执行次数）
// 应用场景：拖拽，mouseover等

export function throttle(fn, wait, immediate) {
  let timeout;
  let previous = 0;
  if (immediate) {
    return function (...args) {
      const now = Date.now();
      if (now - previous > wait) {
        fn.appy(this, args);
        previous = now;
      }
    };
  } else {
    return function (...args) {
      const context = this;
      if (!timeout) {
        timeout = setTimeout(() => {
          fn.apply(this, args);
          timeout = null;
        }, wait);
      }
    };
  }
}

```