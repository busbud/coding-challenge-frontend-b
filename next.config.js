const withCSS = require("@zeit/next-css");

require("dotenv").config();

module.exports = withCSS({
  env: {
    TOKEN: process.env.TOKEN,
    ENDPOINT: process.env.ENDPOINT
  }
});
