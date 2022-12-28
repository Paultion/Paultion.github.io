---
title: 事件循环
group:
  title: es
demo:
  cols: 2
---

##### 例 1

```js
const example1 = () => {
  new Promise(resolve => {
    setTimeout(() => {
      console.log(0);
    }, 0);
    resolve();
  }).then(() => {
    setTimeout(() => {
      console.log(1);
    }, 0);
  });

  setTimeout(() => {
    console.log(2);
  }, 0);

  new Promise(resolve => {
    setTimeout(resolve, 0);
  }).then(() => {
    console.log(3);
    setTimeout(() => {
      console.log(4);
    }, 0);
    new Promise(r => r()).then(() => {
      console.log(5);
    });
  });

  setTimeout(() => {
    console.log(6);
  }, 0);

  new Promise(resolve => {
    console.log(7);
    resolve();
  }).then(() => {
    console.log(8);
  });
};
```

###### 例 2

```js
const example2 = () => {
  async function async1() {
    console.log('async1 start'); // 2
    await async2();
    console.log('async1 end'); // 6
  }
  async function async2() {
    console.log('async2 end'); // 3
  }
  console.log('script start'); // 1
  setTimeout(function () {
    console.log('setTimeout'); // 8
  }, 0);
  async1();
  new Promise(function (resolve) {
    console.log('promise1'); // 4
    resolve();
  }).then(function () {
    console.log('promise2'); // 7
  });
  console.log('script end'); // 5
};
example2();
```

##### 例 3

```js
const example6 = () => {
  async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
  }
  async function async2() {
    console.log('async2');
    return Promise.resolve().then(() => {
      console.log('async2-inner');
    });
  }

  console.log('script start');
  setTimeout(function () {
    console.log('settimeout');
  });

  async1();
  new Promise(function (resolve) {
    console.log('promise1');
    resolve();
  })
    .then(function () {
      console.log('promise2');
    })
    .then(function () {
      console.log('promise3');
    })
    .then(function () {
      console.log('promise4');
    });
  console.log('script end');
};
example6();
```

##### 例 4

[题解](https://mp.weixin.qq.com/s/JBQ9WtNMYzSFVWqlmnUBpA)

```js
const example4 = () => {
  Promise.resolve()
    .then(() => {
      console.log(0);
      return Promise.resolve(4);
    })
    .then(res => {
      console.log(res);
    });

  Promise.resolve()
    .then(() => {
      console.log(1);
    })
    .then(() => {
      console.log(2);
    })
    .then(() => {
      console.log(3);
    })
    .then(() => {
      console.log(5);
    })
    .then(() => {
      console.log(6);
    });
};
```
