---
title: useTransition
---


```jsx
import App from './index'
export default App;
```

```jsx
import React, { useState, useEffect, useTransition } from "react";
import { List } from './index';

export default function App() {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const v = e.target.value;
    setText(v);
    startTransition(() => {
      setQuery(v)
    })
  };

  return (
    <div className="App">
      <input value={text} onChange={handleChange}/>
      {isPending && 'loading' || <List text={query} length={500}/>}
    </div>
  );
};
```