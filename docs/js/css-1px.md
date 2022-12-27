---
title: 移动端1px
order: 2
group:
  title: css
---


```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <meta
      name="viewport"
      content="initial-scale=1, maximum-scale=1,minimum-scale=1, user-scalable=no "
    />
    <style>
      * {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>

  <body>
    <div
      style="width: 50%; height: 10rem; font-size: 2rem; border: solid 1px red"
    >
      test
    </div>
    <div>test2</div>
    <script>
      const viewport = document.querySelector('meta[name=viewport]');
      const scale = 1 / window.devicePixelRatio;
      viewport.setAttribute(
        'content',
        `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`
      );

      const docEl = document.documentElement;

      const fontsize = 10 * (docEl.clientWidth / 750) + 'px';
      docEl.style.fontSize = fontsize;
    </script>
  </body>
</html>
```

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <meta
      name="viewport"
      content="initial-scale=1, maximum-scale=1,minimum-scale=1, user-scalable=no "
    />
    <style>
      * {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>

  <body>
    <div
      style="width: 50%; height: 10rem; font-size: 2rem; border: solid 1px red"
    >
      test
    </div>
    <div>test2</div>
    <script>
      const viewport = document.querySelector('meta[name=viewport]');
      const scale = 1 / window.devicePixelRatio;
      viewport.setAttribute(
        'content',
        `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`
      );

      const docEl = document.documentElement;

      const fontsize = 10 * (docEl.clientWidth / 750) + 'px';
      docEl.style.fontSize = fontsize;
    </script>
  </body>
</html>