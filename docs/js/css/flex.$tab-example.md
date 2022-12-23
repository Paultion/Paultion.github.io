<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>测试flex</title>
    <style>
      .container {
        display: flex;
        border: solid 1px red;
        width: 300px;
        height: 300px;
        flex-wrap: wrap;
        margin: auto;
      }
      .container > div {
        background-color: aqua;
        border: solid 1px yellow;
        height: 50px;
        width: 98px;
        flex: 0 0 auto;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div>paultion</div>
      <div>p</div>
      <div>nerix</div>
      <div>paultion</div>
      <div>p</div>
      <div>nerix</div>
      <div>paultion</div>
      <div>pfdxcl</div>
      <div>nerix</div>
    </div>
  </body>
</html>
