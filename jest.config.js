module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  testMatch: ['**/*.test.(ts?(x)|js)'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/cart/src/test-support',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/src/test-support/modules'],
  setupFilesAfterEnv: ['<rootDir>/src/test-support/setup-tests.ts'],
  globals: {
    'ts-jest': {
      tsconfig: {
        esModuleInterop: true,
        jsx: 'react',
      },
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}
