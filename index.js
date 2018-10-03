const Bundler = require('parcel-bundler');
const express = require('express');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3000;

const file = './src/index.pug';
const options = {};
const bundler = new Bundler(file, options);

// using gzip compression to speed things up
app.use(compression());
app.use(bundler.middleware());

app.listen(port, () => console.log(`Challenge app listening on port ${port}!`));
