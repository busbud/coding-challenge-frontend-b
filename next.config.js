/* eslint-disable @typescript-eslint/no-var-requires */
const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {
  fr: 'fr',
};

module.exports = {
  cssModules: true,
  rewrites: async () =>
    nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  env: {
    BASE_API: 'https://napi.busbud.com/',
  },
};
