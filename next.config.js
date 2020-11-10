// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
require('dotenv').config();

module.exports = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@apiFunctions': path.resolve(__dirname, 'apiFunctions'),
      '@constants': path.resolve(__dirname, 'constants'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@texts': path.resolve(__dirname, 'texts'),
      '@customTypes': path.resolve(__dirname, 'customTypes'),
      '@uiAssets': path.resolve(__dirname, 'uiAssets'),
      '@uiComponents': path.resolve(__dirname, 'uiComponents'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@views': path.resolve(__dirname, 'views'),
      '@root': path.resolve(__dirname, ''),
    };

    config.module.rules.push({
      test: /\.pcss$/i,
      exclude: /node_modules/,
      use: {
        loader: 'pcss-loader',
        options: {
          minified: true,
        },
      },
    });

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
  poweredByHeader: false,
  target: 'serverless',
  trailingSlash: false,
};
