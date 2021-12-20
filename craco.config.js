const path = require(`path`);

const aliases = (prefix = `src`) => ({
  'types': `${prefix}/types`,
  'views': `${prefix}/views`,
  'components': `${prefix}/components`,
  'app': `${prefix}/app`,
});

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [key, path.resolve(__dirname, value)]),
);

module.exports = {
  webpack: {
    alias: resolvedAliases,
  },
};