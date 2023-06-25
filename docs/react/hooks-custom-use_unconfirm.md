---
title: test
order: 4
group:
  title: hooks-custom
---
###### react-use
> useLongPress
> useCss
> useUpdateEffect
> useAsyncEffect
> useDeepCompreEffect
> useLifeCycles

```jsx
import React, { useRef, useState, useMemo } from "react";
import { useLogger, useSetState, useLifecycles } from 'react-use';
import { useCreation  } from 'ahooks';

export default function App() {
  const [, setFlag] = useState({});
 useLifecycles(() => console.log('MOUNTED'), () => console.log('UNMOUNTED'));

  return (
    <>
      <button
        type="button"
        onClick={() => setFlag({})}
      >
        Rerender
      </button>
    </>
  );  
};
```