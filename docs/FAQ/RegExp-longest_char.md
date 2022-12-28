---
title: 最长字符
group:
  title: RegExp
---

```js
const str = '011222333334';

function getMaxStr(str) {
  const [maxKey] = [...new Set(str)].reduce(
    (memo, item) => {
      const [, maxLength] = memo;
      const { length } = str.match(new RegExp(item, 'g')) || [];
      if (length > maxLength) {
        memo = [item, length];
      }
      return memo;
    },
    ['', -1]
  );
  return maxKey;
}

console.log(getMaxStr(str));
```
