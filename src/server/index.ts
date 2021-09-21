import cookieParser from 'cookie-parser';
import express from 'express';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import BusbudApi from './BusbudApi';
import App from '../client/App';
import { apiSearchOptions, validateCookie } from './util';

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

// the base html file is constant and always present, load and store it
const indexHtml = fs.readFileSync(__dirname + '/index.html', 'utf8');

server.use(cookieParser());
server.use(express.static('dist/assets'));

server.get('/', (req, res) => {
  let language: string;
  const currency: string =
    validateCookie(req.cookies.currency, ['USD', 'EUR', 'CAD'], 'USD');

  // if the language cookie has not been set for this user then guess their
  // language from their Accept-Language header
  if (!req.cookies.language) {
    language =
      (req.headers['accept-language'] || 'en').includes('fr') ?
        'fr' :
        'en';
    // the cookie will expire in a year
    res.cookie('language', language, {
      expires: new Date(Date.now() + (1000 * 3600 * 24 * 365))
    });
  } else {
    language = validateCookie(req.cookies.language, ['en', 'fr'], 'en');
  }

  // dynamically generate the index page using the language and currency
  // since there are only a limited number of possible language/currency
  // combinations the generated pages could be cached in future
  const appRendered =
    ReactDOMServer.renderToString(
      React.createElement(App, { language, currency })
    );
  const indexRendered =
    indexHtml
      .replace('{language}', language)
      .replace('{app}', appRendered);
  return res.send(indexRendered);
});

// proxy the calls to the busbud API

server.get('/api/search', (req, res) => {
  const options = apiSearchOptions(req);
  busbudApi.departureSearchInit('f2m673', 'f25dvk', '2021-09-25', options)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.log("Busbud API error: ", error);
      res.json({ error: 'search-failed' })
    });
});

server.get('/api/search/poll', (req, res) => {
  const options = apiSearchOptions(req);
  busbudApi.departureSearchPoll('f2m673', 'f25dvk', '2021-09-25', options)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.log("Busbud API error: ", error);
      res.json({ error: 'search-failed' })
    });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
