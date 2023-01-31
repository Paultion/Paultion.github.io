---
title: 最大版本号
group:
  title: es
---

```jsx
import React from 'react';

const compare = (prev, next) => {
  const prevArr = prev.split('.');
  const nextArr = next.split('.');

  const maxLength = Math.max(prevArr.length, nextArr.length);

  for (let i = 0; i < maxLength; i++) {
    if ((prevArr[i] || 0) === (nextArr[i] || 0)) {
      continue;
    }
    return (Number(prevArr[i]) || 0) > (Number(nextArr[i]) || 0)
      ? prevArr.join('.')
      : nextArr.join('.');
  }
  return prevArr.join('.');
};

export default () => {
  const versionArr = ['3.15', '1.0.20.3', '2.0.3', '3.6.27.1', '3.14.5'];

  const maxVersion = versions => {
    const maxDefault = new Array(
      Math.max(...versions.map(v => v.split('.').length))
    )
      .fill('0')
      .join('.');

    return versions.reduce(
      (memo, item) => ((memo = compare(memo, item)), memo),
      maxDefault
    );
  };

  return (
    <div style={{ fontSize: 16 }}>
      <div>版本号：{versionArr.join('，')}</div>
      <div>最大版本号：{maxVersion(versionArr)}</div>
    </div>
  );
};
```
