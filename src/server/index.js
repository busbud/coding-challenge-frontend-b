import dotEnvSafe from 'dotenv-safe';

import express from 'express';
import compression from 'compression';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import ServerRouter from 'react-router/ServerRouter';
import createServerRenderContext from 'react-router/createServerRenderContext';

import App from '../components/App';
import template from './template';

import fetchDepartures from '../services/serverFetchDepartures';

// Include environment variables from .env.
dotEnvSafe.load();

const clientAssets = require(KYT.ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require
const app = express();

// Remove annoying Express header addition.
app.disable('x-powered-by');

// Compress (gzip) assets in production.
app.use(compression());

// Setup the public directory so that we can server static assets.
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

const handleError = (err, res) => {
  switch(err.type) {
    case 'Unauthorized':
      return res.status(401).json(err).end();
    case 'InputInvalid':
      return res.status(400).json(err).end();
    default:
      return res.status(500).json(err).end();
  }
};

app.get(
  '/departures/:origin/:destination/:outboundDate',
  (req, res) => {
    fetchDepartures(req.params, req.query)
      .then(data => {
        if (data.error) {
          return handleError(data.error, res);
        }
        res.json(data).end();
      })
      .catch(err => {
        handleError(err, res);
      });
  }
);

app.get('*', (req, res) => {
  res.end(template({
    root: renderToString(
      <ServerRouter location={req.url} context={createServerRenderContext()}>
        <App />
      </ServerRouter>
    ),
    jsBundle: clientAssets.main.js,
    cssBundle: clientAssets.main.css,
  }));
});

app.listen(parseInt(KYT.SERVER_PORT, 10));
