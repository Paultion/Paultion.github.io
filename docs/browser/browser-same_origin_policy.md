---
title: 同源策略
order: 4
group:
  title: browser
  order: 1
---

##### 同源策略

> 浏览器安全策略，域名、协议、端口不同即为跨域

##### 跨域方法

> ###### jsonp
>
> 利用 script 不受同源策略限制
> 
> 1. 浏览器定义callback
> 2. 服务端输出callback的调用
> - 缺点：只能用 get 方式、容易受到 XSS 攻击
>

> ###### CORS
>
> 1. 当使用 XMLHttpRequest 发送请求时，如果浏览器发现违反了同源策略会自动加上一个请求头 origin
> 2. 后端再接受到请求后确定响应后会在 Response Header 中加入一个属性 Access-Control-Allow-Origin
> 3. 浏览器判断响应中的 Access-Control-Allow-Origin 值是否和当前地址相同，匹配成功后才继续响应处理，否则报错
>
> - 缺点：忽略 cookie、浏览器版本有一定要求
>

> ###### Nginx
>
> 将前端请求代理到需要请求的服务器
>
> - 缺点：需要额外的代理服务器
>

> ###### Html PostMessage
>
> 允许来自不同源的脚本采用异步方式进行有限的通讯，可以实现跨文本、多窗口、跨域消息传递
>
> - 缺点：浏览器版本有一定要求，部分浏览器要配置放开跨域
>
> PostMessage示例如下
```html
<!-- 发送 -->
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>42度空间-window.postMessage()跨域消息传递</title>
</head>
<body>
<div>
    <input id="text" type="text" value="42度空间" />
    <button id="send" >发送消息</button>
</div>
<iframe id="receiver" src="http://res.42du.cn/static/html/receiver.html" width="500" height="60">
    <p>你的浏览器不支持IFrame。</p>
</iframe>
<script>
    window.onload = function() {
        var receiver = document.getElementById('receiver').contentWindow;
        var btn = document.getElementById('send');
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var val = document.getElementById('text').value;
            receiver.postMessage("Hello "+val+"！", "http://res.42du.cn");
        });
    }
</script>
</body>
</html>
```
```html
<!-- 接收 -->
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>42度空间-从www.42du.cn接收消息</title>
</head>
<body>
<div id="message">
    Hello World!
</div>
<script>
    window.onload = function() {
        var messageEle = document.getElementById('message');
        window.addEventListener('message', function (e) {
            alert(e.origin);
            if (e.origin !== "http://www.42du.cn") {
                return;
            }
            messageEle.innerHTML = "从"+ e.origin +"收到消息： " + e.data;
        });
    }
</script>
</body>
</html>
```

> ###### document.domain
>

> ###### websocket 协议
>
> 基于该协议可以做到浏览器与服务器全双工通信，允许跨域
>
> - 缺点：浏览器版本有一定要求，服务器需要支持 websocket 协议
>

> ###### iframe
>
> iframe 是浏览器非同源标签，加载内容中转，传到当前页面的属性中
>
> - 缺点：页面的属性值有大小要求
