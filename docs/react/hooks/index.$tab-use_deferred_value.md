---
title: useDeferredValue
---

> 将状态滞后变化，避开紧急任务的渲染，让出优先级

```jsx
import App from './index'
export default App;
```

```jsx
import React, { useState, useEffect, useDeferredValue } from "react";
import { List } from './index';

export default function App() {
  const [text, setText] = useState("喵爸");
  const deferredText = useDeferredValue(text);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="App">
      <input value={text} onChange={handleChange}/>
      <List text={deferredText} length={500}/>
    </div>
  );
};
```
