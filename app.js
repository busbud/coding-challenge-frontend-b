const path = require('path')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')))

app.use(
  '/x-departures',
  createProxyMiddleware({
    target: 'https://napi.busbud.com',
    changeOrigin: true,
  })
)

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'))
})

const port = process.env.PORT || 3000
app.listen(port)

console.log(`app listening on ${port}`)
