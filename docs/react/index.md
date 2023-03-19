---
title: react
nav:
  title: react
  order: 7
---

react


```jsx
import React, { useState } from 'react';

export default function App() {
  const [state, setState] = useState(0)

  const stateHandler = () => {
    setState(state+1);
    setTimeout(() => console)
  }

  return <div onClick={stateHandler}></div>
}
```