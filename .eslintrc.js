module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    indent: [1, 2, { SwitchCase: 1 }],
    quotes: [1, 'single', 'avoid-escape'],
    semi: [2, 'always'],
    'linebreak-style': [2, 'unix'],
    'no-console': 1,
    'no-unused-vars': 1,
    'no-underscore-dangle': 0,
    'arrow-body-style': [0],
    'jsx-a11y/anchor-is-valid': [2, { components: [] }],
    'import/no-named-as-default': 0,
    'import/no-extraneous-dependencies': [1, {
      devDependencies: true,
      optionalDependencies: false,
      peerDependencies: false,
    }],
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
  },
};
