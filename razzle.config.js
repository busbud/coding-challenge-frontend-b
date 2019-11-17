module.exports = {
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
