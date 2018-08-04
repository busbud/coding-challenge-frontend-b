require('dotenv').config()
const Koa = require('koa')
const staticServe = require('koa-static')
const path = require('path')

const PORT = process.env.PORT
const staticDir = path.resolve(__dirname, '../dist')
const oneYearInMilliseconds = 31557600000

const app = new Koa()
app.use(staticServe(staticDir, {
  maxage: oneYearInMilliseconds
}))

app.listen(PORT || 3000, () => {
  console.log(`Server listening at: http://localhost:${PORT}`)
})
