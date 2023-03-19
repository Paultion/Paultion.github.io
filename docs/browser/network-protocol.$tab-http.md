---
title: http
order: 2
group:
  title: network
---

##### http1.0 http1.1

> ###### 连接方式
>
> 1. http1.0 默认使用短连接，http1.1 默认使用长连接模式
> 2. http1.1 使用管道化（pipelining）优化队头阻塞
>
> ###### 缓存
>
> http1.0 主要使用 Expires，Last-Modified/If-Modified-Since，http1.1 使用更多如 Cache-Control,ETag/If-None-Match 控制缓存策略
>
> ###### HOST 头处理
>
> http1.1 的请求消息和响应消息都绑定 Host 头域以支持单台物理服务器存在多个虚拟主机
>
> ###### 带宽优化
>
> 引入了 Range 头域，允许只请求资源的某个部分，充分利用带宽和连接;

##### http1.x http2.x

> ###### 解析格式
>
> http1.x 基于文本协议解析，http2 基于二进制格式
>
> ###### 多路复用
>
> http1.x 半双工通信。http2 全双工通信，一个链接上有多个 request，且消息帧粒度更小并携带 request id，彻底解决 http1.x 队头阻塞
>
> ###### header 压缩
>
> http1.x 中 header 需要携带大量信息，而且每次都要重复发送。http2.0 使用 encode 减少传输的 header 大小，而且 client 和 server 可以各自缓存一份 header field，避免了 header 的重复传输
>
> ###### 服务器推送
>
> 可以通过解析 html 中的依赖,智能的返回所需的其他文件(css 或者 js 等),而不用再发起一次请求

##### http https

> ###### 证书
>
> https 协议需要 CA 申请证书
>
> ###### 安全性
>
> http 运行在 TCP 协议之上，内容都是明文传输，安全性较差。https 运行在 SSL/TLS 层之上，而 SSL/TLS 运行在 TCP 层之上，https 传输的内容都是加密的，安全性较高
>
> ###### 端口
>
> http 默认端口 => 80
> https 默认端口 => 443
