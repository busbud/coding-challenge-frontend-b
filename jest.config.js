module.exports = {
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'domain/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}',
  ],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
