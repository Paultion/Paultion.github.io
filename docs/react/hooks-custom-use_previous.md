---
title: usePrevious
order: 3
group:
  title: hooks-custom
---

```jsx
import React, { useState, useRef, useEffect } from "react"

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// const defaultShouldUpdate = <T>(a?: T, b?: T) => !Object.is(a, b);
// function usePrevious<T>(
//   state: T,
//   shouldUpdate: ShouldUpdateFunc<T> = defaultShouldUpdate,
// ): T | undefined {
//   const prevRef = useRef<T>();
//   const curRef = useRef<T>();

//   if (shouldUpdate(curRef.current, state)) {
//     prevRef.current = curRef.current;
//     curRef.current = state;
//   }

//   return prevRef.current;
// }

export default function App() {
  const [state, setState] = useState(0);
  const prevState = usePrevious(state);

  return <div onClick={() => setState(s => s+1)} style={{cursor: 'pointer', userSelect: 'none'}}>
    <div>state: { state }</div>
    <div>prevState: { prevState }</div>
  </div>
}
```
