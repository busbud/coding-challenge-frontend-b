module.exports = {
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        esModuleInterop: true,
        jsx: 'react',
      },
    },
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/test-support/',
    '<rootDir>/src/styles/',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test-support/setup-tests.ts'],
}
