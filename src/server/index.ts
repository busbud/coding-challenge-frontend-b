import express from 'express';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../client/App';

const server = express();
const PORT = process.env.PORT || 3000;

// prerender and cache the frontend application
// this allows the react application to be indexed by search engines
const indexHtml = fs.readFileSync(__dirname + '/index.html', 'utf8');
const appRendered = ReactDOMServer.renderToString(React.createElement(App));
const indexRendered = indexHtml.replace('{app}', appRendered);

server.use(express.static('dist/assets'));

server.get('/', (_, res) => {
  return res.send(indexRendered);
});

server.listen(3000, () => {
  console.log(`Server started on port ${PORT}`);
});
