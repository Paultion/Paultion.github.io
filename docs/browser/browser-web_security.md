---
title: web安全
order: 1
group:
  title: browser
  order: 1
---

1. 跨站脚本攻击 XSS(Cross Site Scripting)

   > 介绍：web 页面插入恶意 script，访问页面时恶意脚本执行攻击用户
   >
   > 防御：
   > 对输入内容过滤或转义
   > 采用内容安全策略从可信的内容来源加载资源，Content-Security-Policy | X-XSS-Protection

2. 跨站请求伪造 CSRF(Cross Site Request Forgery)

   > 介绍：通过登录授信网站，并在本地生成 cookie，不退出的情况下访问危险网站
   >
   > 防御：
   > 验证 referer 字段
   > token 验证

![csrf](/browser/web_security/security.webp)