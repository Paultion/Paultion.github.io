---
title: 缓存策略
order: 3
nav:
  title: 浏览器
  order: 1
group:
  title: 浏览器
  order: 1
---

##### 缓存位置

> ###### Memory Cache
>
> 内存缓存，读取速度快，适合小文件，关闭 tab 页面缓存消失（脚本、字体、图片等）
>
> ###### Disk Cache
>
> 磁盘缓存，读取速度慢，适合大文件(css 等)
>
> ###### Service Worker:
>
> 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。使用 Service Worker 的话，传输协议必须为 HTTPS。Service Worker 可以自由控制缓存哪些文件、如何匹配缓存、如何读取缓存
>
> ###### Push Cache？
>
> http2 新增，当以上三种缓存都没有命中之后，只会存在 session 中，一旦会话结束就被释放，所以时间很短，并且只能被使用一次

##### 缓存类型

> ###### 强缓存
>
> 概念：浏览器发送请求前，根据请求头(request header)里面的 expires(htttp1.0)和 cache-control(http1.1)判断是否命中(包括是否过期)强缓存策略，如果命中，直接从缓存读取资源，并不会发送请求。
>
> - Expires: HTTP1.0 缓存方式，绝对时间
> - Cache-Control:
> public => 可以被服务器和中间服务器缓存
> max-age=1000 => 表示 1000 秒内读取该缓存
> private => 只能被服务器缓存
> no-cache => 和服务器协商判断该文件可否被缓存，但是不缓存过期文件
> no-store => 不缓存所有数据
>
> ###### 协商缓存
>
> 概念：浏览器在第一次访问资源时，服务器返回资源的同时，在 response header 中添加 Last-Modified(http1.0)/ETag(http1.1)，浏览器下一次请求这个资源，浏览器检测到有 Last-Modified/Etag，于是添加 If-Modified-Since/If-None-match 这个 header，值就是 Last-Modified/Etag 中的值；服务器再次收到这个资源请求，会根据 If-Modified-Since/If-None-Match 中的值与服务器中的这个值作对比，如果没有变化，返回 304 和空的响应体，直接从缓存读取，反之返回新的资源文件
>
> - Last-Modified / If-Modified-Since（资源的修改时间）
> - Etag / If-None-Match（当前资源文件的唯一标识）
> Last-Modified 以秒计，如果在无法感知的时间范围内修改了文件会命中缓存
> 资源周期性变化无法命中协商缓存
