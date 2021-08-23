/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: [
      'client',
      'components',
      'configs',
      'domains',
      'messages',
      'pages',
    ],
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  serverRuntimeConfig: {
    API_URL: process.env.API_URL,
    API_TOKEN: process.env.API_TOKEN,
  },
};
