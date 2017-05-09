const path  = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
var fs = require("fs");

app.use(morgan('tiny'))

// if dev use wepback middleware
if (process.env.NODE_ENV !== "production") {
  console.log('serving development')

  const webpackMiddleware     = require('webpack-dev-middleware'),
        webpackHotMiddleware  = require('webpack-hot-middleware'),
        webpack               = require('webpack'),
        config                = require('./webpack.config.js'),
        apiFallBack           = require('connect-history-api-fallback'),
        webpackCompiler       = webpack(config);

  const devMiddleWare = webpackMiddleware(webpackCompiler, {
    publicPath: config.output.publicPath,
    hot: true,
    stats: {
      colors: true,
      chunks: false,
      'errors-only': true
    }
  })

  app.use(apiFallBack({
    verbose: true
  }));

  app.use(devMiddleWare)

  app.use(webpackHotMiddleware(webpackCompiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));

} else {
  console.log('serving production')
  // use static content from dist
  app.use(express.static('build'))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  })
}

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port: ${port}...`))
