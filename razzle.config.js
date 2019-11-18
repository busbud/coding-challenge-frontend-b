const razzleHeroku = require('razzle-heroku');

module.exports = {
  modify(config, { target, dev }, webpack) {
    const herokuConfig = razzleHeroku(config, { target, dev }, webpack);

    return herokuConfig;
  },
  plugins: [
    {
      name: 'typescript',
      options: {
        useBabel: true,
        useEslint: true,
        forkTsChecker: {
          tsconfig: './tsconfig.json',
          tslint: false,
          watch: './src',
          typeCheck: true
        }
      }
    }
  ]
};
