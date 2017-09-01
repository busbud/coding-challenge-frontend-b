const express = require('express');
const expressStaticGzip = require('express-static-gzip');

const app = express();
const port = process.env.PORT || 5000;

app.use(expressStaticGzip(`${__dirname}/out`));

app.listen(port);

console.info(`Started app on port ${port}`);
