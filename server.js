const express = require('express')
const path = require('path')
const webpack = require('webpack')

const app = express()

const isDevelopment = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 8080

if (isDevelopment) {
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')

  // load local .env file
  const dotenv = require('dotenv')
  dotenv.load()

  const config = require('./webpack.config')
  const compiler = webpack(config)

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }))

  app.use(webpackHotMiddleware(compiler))
}
else {
  app.use('/static', express.static(path.join(__dirname, 'dist')))
}

app.use('/translations', express.static(path.join(__dirname, 'translations')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  const translations = require('./translations/en_US.json')

  res.render('home', {
    key: process.env.BUSBUD_API_KEY || 'NOT_FOUND',
    locale: 'en_US',
    translations,
    languages: ['en_US', 'fr_FR'],
  })
})

app.listen(port, () => {
  console.log('App is running on http://localhost:' + port)
})