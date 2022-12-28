---
title: 数组扁平化
group:
  title: es
---

```js
const multiAry = [[[1], 2, 3], 4, 5, 6, [[7]], []];

// 解1
function flatten1(ary, result = []) {
  ary.forEach(a => (Array.isArray(a) ? flatten1(a, result) : result.push(a)));
  return result;
}
// console.log(flatten1(multiAry));

// 解2
function flatten2(ary) {
  return ary.toString().split(',');
}
// console.log(flatten2(multiAry));

// 解3
function flatten3(arr) {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flatten3(toFlatten) : toFlatten);
  }, []);
}
// console.log(flatten3(multiAry));

```