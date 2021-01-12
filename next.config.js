/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const withPWA = require('next-pwa')

const isProd = process.env.NODE_ENV === 'production'

module.exports = withPlugins([
  [
    withPWA,
    {
      pwa: {
        dest: 'public',
        disable: !isProd
      }
    }
  ],
  [optimizedImages]
])
