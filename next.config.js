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
  publicRuntimeConfig: {
    POLLING_INTERVAL: process.env.NEXT_PUBLIC_POLLING_INTERVAL,
  },
  serverRuntimeConfig: {
    API_URL: process.env.API_URL,
    API_TOKEN: process.env.API_TOKEN,
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/f2m673/f25dvk?outbound_date=2021-09-03&adults=1',
      },
    ];
  },
};
