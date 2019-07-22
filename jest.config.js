module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'jsx'],
  setupFiles: ['./jest/enzyme.config.js', './jest/setup-jest.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
};
