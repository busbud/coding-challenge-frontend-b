module.exports = {
  extends: 'stylelint-config-standard',
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
  rules: {
    'max-empty-lines': 2,
    'value-list-comma-newline-after': null,
    'declaration-colon-newline-after': null,
    'no-descending-specificity': null,
    'rule-empty-line-before': [
      'always',
      {
        except: ['after-single-line-comment', 'first-nested'],
        ignore: ['after-comment', 'inside-block', 'first-nested'],
      },
    ],
  },
};
