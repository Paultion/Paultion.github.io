---
title: useState
order: 1
group:
  title: hooks
---

```jsx
import React, { useState } from 'react';

export default function App() {
  const [num, updateNum] = useState(0);
_
  return <p onClick={() => updateNum(num => num + 1)}>{num}</p>;
}
```