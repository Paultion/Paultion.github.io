---
title: useEventEmitter
order: 3
group:
  title: hooks-custom
---

```jsx
import React, { useRef, useEffect } from 'react';

class EventEmitter {
  constructor() {
    this.subscriptions = new Set();
  }
  on(cb) {
    const cbRef = useRef();
    cbRef.current = cb;
    useEffect(() => {
      function subscription(...args) {
        if (cbRef.current) cbRef.current(...args);
      }
      this.subscriptions.add(subscription);
      return () => this.subscriptions.delete(subscription);
    }, []);
  }
  emit(...args) {
    for (const subscription of this.subscriptions) {
      subscription(...args);
    }
  }
}
function useEventEmitter() {
  const ref = useRef();
  if (!ref.current) {
    ref.current = new EventEmitter();
  }
  return ref.current;
}

const MessageBox = function (props) {
  return (
    <div style={{ paddingBottom: 24 }}>
      <p>You received a message</p>
      <button type="button" onClick={() => props.focus$.emit()}>
        Reply
      </button>
    </div>
  );
};

const InputBox = function (props) {
  const inputRef = useRef();
  props.focus$.on(() => inputRef.current.focus());
  return (
    <input
      ref={inputRef}
      placeholder="Enter reply"
      style={{ width: '100%', padding: '4px' }}
    />
  );
};

export default function () {
  const focus$ = useEventEmitter();
  return (
    <>
      <MessageBox focus$={focus$} />
      <InputBox focus$={focus$} />
    </>
  );
}
```
