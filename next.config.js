module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    // Example using webpack option
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
    return config
  }
}