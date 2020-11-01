module.exports = {
  extends: [
    'react-app',
    'airbnb',
    'airbnb/hooks',
  ],
  globals: {
    it: true,
    fit: true,
    shallow: true,
    render: true,
    test: true,
  },
  rules: {
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxEOF: 0,
      },
    ],
    'arrow-body-style': [
      0,
      'never',
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'react/no-multi-comp': [
      2,
      {
        ignoreStateless: false,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.stories.js',
          '**/*.test.js',
        ],
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.js',
          '.jsx',
        ],
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: [
          'Link',
        ],
        specialLink: [
          'to',
        ],
        aspects: [
          'noHref',
        ],
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        controlComponents: [
          'Checkbox',
        ],
        depth: 3,
      },
    ],
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'enforce',
        custom: 'ignore',
        exceptions: [],
      },
    ],
    'no-console': [
      'error',
      {
        allow: [
          'warn',
          'error',
          'log',
        ],
      },
    ],
    'import/order': [
      'error',
    ],
  },
  overrides: [
    {
      files: [
        './src/**/*.stories.js',
      ],
      rules: {
        'import/no-unresolved': [
          2,
          {
            ignore: [
              '^@storybook',
            ],
          },
        ],
        'react/no-multi-comp': [
          0,
        ],
      },
    },
    {
      files: [
        './src/**/*.test.js',
      ],
      globals: {
        it: true,
        fit: true,
        describe: true,
        expect: true,
      },
    },
  ],
};
