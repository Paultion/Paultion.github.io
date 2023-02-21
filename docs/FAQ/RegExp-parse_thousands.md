---
title: 数字千分位
group:
  title: RegExp
---

[数字千分位](https://zhuanlan.zhihu.com/p/300135522)
```js
/**
 * 数字千分位
 */
// 解1
function parseThousands1(num) {
  const str = num + '';
  const ary = str.split('');

  let decimal = '';
  const index = str.indexOf('.');
  if (index > -1) {
    decimal = ary.splice(index).join('');
  }
 
  const integer = ary.reverse().reduce((prev, next, index) => {
    return (index % 3 ? next : next + ',') + prev;
  });
  return integer + decimal;
}
// 1234567.89
// console.log(parseThousands1(12345678.12345678));

// 解2
// /b单词边界 /B非单词边界

function parseThousands2(num) {
  const str = num + '';
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
// console.log(parseThousands2(12345678.12345678));

// 解3
function parseThousands3(num) {
  const str = num + '';
  return str.replace(/\d{1,3}(?=(\d{3})+($|\.))/g, $1 => $1 + ',');
}
console.log(parseThousands3(12345678.12345678));






```
