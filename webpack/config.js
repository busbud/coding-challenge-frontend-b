require('dotenv').config()
let config = {}
if (process.env.NODE_ENV === 'production') {
  config = require('./production.config')
} else {
  config = require('./development.config')
}

module.exports = config
