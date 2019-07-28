const withCSS = require("@zeit/next-css");

require("dotenv").config();

module.exports = withCSS({
  env: {
    BUSBUD_TOKEN: process.env.BUSBUD_TOKEN,
    BUSBUD_ENDPOINT: process.env.BUSBUD_ENDPOINT
  }
});
