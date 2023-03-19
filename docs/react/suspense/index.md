---
title: suspense
order: 1
group:
  title: suspense
---

```jsx
import React, { Suspense } from 'react';

const requestUser = (id) =>
    new Promise((resolve) =>
        setTimeout(
            () => resolve({ id, name: `用户${id}`, age: 10 + id }),
            id * 1000
        )
    );

function wrapPromise(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(r => {
    status = 'success';
    result = r;
  }, e => {
    status = 'error';
    result = e;
  });

  return {
    read() {
      if (status === 'pending'){
        throw suspender
      } else if (status === 'error') {
        throw result
      } else if (status === 'success') {
        return result;
      }
    }
  }
}

const resource = {
  user: wrapPromise(requestUser(1))
}
const User = () => {
  const user = resource.user.read();
  return <div>当前用户是{ user.name }</div>
}

const App = () => {
  return <User/>;
  // return <Suspense fallback='loading...'>
  //   <User/>
  // </Suspense>
}

export default App
```
