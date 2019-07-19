module.exports = ({ _file, _options, env }) => ({
  plugins: {
    cssnano: env === "production"
  }
});
