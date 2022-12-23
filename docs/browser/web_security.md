1. 跨站脚本攻击 XSS(Cross Site Scripting)

   - 介绍：web页面插入恶意script，访问页面时恶意脚本执行攻击用户

   - 防御：
      - 对输入内容过滤或转义
      - Content-Security-Policy | X-XSS-Protection


2. 跨站请求伪造 CSRF(Cross Site Request Forgery)

   - 介绍：通过登录授信网站，并在本地生成cookie，不退出的情况下访问危险网站
   
   - 防御：
      
      - 验证referer字段
      - token验证