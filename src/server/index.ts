import express from 'express';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import BusbudApi from './BusbudApi';
import App from '../client/App';

const server = express();
const PORT = process.env.PORT || 3000;

// a busbud API token is required
if (!process.env.BUSBUD_TOKEN) {
  console.log('Error: Busbud API token not found');
  console.log('Please set the BUSBUD_TOKEN environment variable');
  process.exit(1);
}

const BUSBUD_TOKEN = process.env.BUSBUD_TOKEN;
const busbudApi = new BusbudApi(BUSBUD_TOKEN);

// prerender and cache the frontend application
// this allows the react application to be indexed by search engines
const indexHtml = fs.readFileSync(__dirname + '/index.html', 'utf8');
const appRendered = ReactDOMServer.renderToString(React.createElement(App));
const indexRendered = indexHtml.replace('{app}', appRendered);

server.use(express.static('dist/assets'));

server.get('/', (_, res) => {
  return res.send(indexRendered);
});

// proxy the calls to the busbud API
server.get('/api/search', (req, res) => {
  busbudApi.departureSearchInit('f2m673', 'f25dvk', '2021-09-21', {
    adult: 1,
    child: 0,
    senior: 0,
    lang: 'en',
    currency: 'EUR'
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.log(error);
      res.json({ error: 'search-failed' })
    });
});

server.listen(3000, () => {
  console.log(`Server started on port ${PORT}`);
});
