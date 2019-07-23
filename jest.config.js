module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'jsx'],
  setupFiles: ['./enzyme.config.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
};
