---
title: useReactive
order: 3
group:
  title: hooks-custom
---

```jsx
import React, { useState, useRef, useCallback } from 'react';

class ObjectType {
  static [Symbol.hasInstance](o) {
    return o !== null && typeof o === 'object';
  }
}

function useUpdate(){
  const [, setState] = useState({});
  return useCallback(() => setState({}), [])
}

const oMap = new WeakMap();
const pMap = new WeakMap();
function observer(initialVal, cb) {
  if (oMap.has(initialVal)) oMap.get(initialVal);

  const proxy = new Proxy(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return res instanceof ObjectType ? observer(res, cb) : res;
    },
    set(target, key, val) {
      const res = Reflect.set(target, key, val);
      cb();
      return res;
    },
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key);
      cb();
      return res;
    }
  })

  if (pMap.has(proxy)) return pMap.get(proxy);

  oMap.set(initialVal, proxy);
  pMap.set(proxy, initialVal);

  return proxy;
}

function useReactive(initialState) {
  const update = useUpdate();
  const stateRef = useRef(initialState);
  const state = observer(stateRef.current, () => update());
  return state;
}

export default () => {
  const state = useReactive({
    count: 0,
    inputVal: '',
    obj: {
      value: '',
    },
  });

  return (
    <div>
      <p> state.count：{state.count}</p>
      <button style={{ marginRight: 8 }} onClick={() => state.count++}>
        state.count++
      </button>
      <button onClick={() => state.count--}>state.count--</button>
      <p style={{ marginTop: 20 }}> state.inputVal: {state.inputVal}</p>
      <input onChange={e => (state.inputVal = e.target.value)} />
      <p style={{ marginTop: 20 }}> state.obj.value: {state.obj.value}</p>
      <input onChange={e => (state.obj.value = e.target.value)} />
    </div>
  );
};
```
