---
title: 防抖节流案例
---

```jsx
import React from 'react';

function mouseover() {
  console.log('编审');
}

// 防抖
const mouseoverWithDebounce1 = debounce1(mouseover, 1000);
const mouseoverWithDebounce2 = debounce2(mouseover, 1000);
function debounce1(func, wait) {
  let timeout;
  const args = arguments;
  return function () {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(this, args);
    }, wait);
  };
}
function debounce2(func, wait) {
  let timeout;
  let args = arguments;
  return function () {
    if (timeout) clearTimeout(timeout);
    const callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) func.apply(this, args);
  };
}

// 节流
const mouseoverWithThrottle1 = throttle1(mouseover, 1000);
const mouseoverWithThrottle2 = throttle2(mouseover, 1000);
function throttle1(func, wait) {
  let timeout;
  let args = arguments;
  return function () {
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(this, args);
      }, wait);
    }
  };
}
function throttle2(func, wait) {
  const args = arguments;
  let previous = 0;
  return function () {
    const now = Date.now();
    if (now - previous > wait) {
      func.apply(this, args);
      previous = now;
    }
  };
}

export default () => {
  const blockStyle = {
    width: '500px',
    height: '100px',
    margin: '10px 0',
    backgroundColor: 'silver',
  };
  return (
    <div>
      <div style={blockStyle} onMouseMove={mouseoverWithThrottle1}></div>
      <div style={blockStyle} onMouseMove={mouseoverWithThrottle2}></div>
      <div style={blockStyle} onMouseMove={mouseoverWithDebounce1}></div>
      <div style={blockStyle} onMouseMove={mouseoverWithDebounce2}></div>
    </div>
  );
};
```
