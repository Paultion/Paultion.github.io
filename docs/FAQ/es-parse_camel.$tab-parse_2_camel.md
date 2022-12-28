---
title: 转换至驼峰
group:
  title: es
---

```js
/* 
  Foo Bar => 'fooBar'
  foo-bar => 'fooBar'
  FOO_BAR => 'fooBar' 
*/
```

##### 解 1

```js
function camelCase(str) {
  const lowerCaseAry = str.toLowerCase().split(/\s|-|_/);
  return lowerCaseAry
    .slice(1)
    .map((s, i) => (i === 0 ? s : s.replace(/^[a-z]/, $1 => $1.toUpperCase())))
    .join('');
}
```

##### 解 2

```js
function camelCase2(str) {
  const re = /(\s|-|_)([a-z])/g;
  return str.toLowerCase().replace(re, ($0, $1, $2) => $2.toUpperCase());
}
```
