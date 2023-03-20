const koa = require('koa');
const app = new koa();

app.use(async ctx => {
  ctx.body = 'test'
})

app.listen(3001, () => {
  console.log(123)
})