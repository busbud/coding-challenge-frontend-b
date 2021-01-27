module.exports = {
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: [
    '<rootDir>/src/test-support/',
    '<rootDir>/src/styles/',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test-support/setup-tests.ts'],
}
