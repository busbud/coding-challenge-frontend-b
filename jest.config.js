module.exports = {
  roots: ['<rootDir>'],
  setupFiles: ['./dotenvConfig.ts'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '^@apiFunctions/(.*)': '<rootDir>apiFunctions/$1',
    '^@constants/(.*)': '<rootDir>constants/$1',
    '^@pages/(.*)': '<rootDir>pages/$1',
    '^@texts/(.*)': '<rootDir>texts/$1',
    '^@cutomTypes/(.*)': '<rootDir>cutomTypes/$1',
    '^@uiAssets/(.*)': '<rootDir>uiAssets/$1',
    '^@uiComponents/(.*)': '<rootDir>uiComponents/$1',
    '^@utils/(.*)': '<rootDir>utils/$1',
    '^@views/(.*)': '<rootDir>views/$1',
    '^@root/(.*)': '<rootDir>$1',
  },
};
