/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store';

let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', (req, res) => {
    const context = {};
    const sheet = new ServerStyleSheet();
    const store = configureStore();
    const preloadedState = store.getState();

    const markup = renderToString(
      sheet.collectStyles(
        <StaticRouter context={context} location={req.url}>
          <Provider store={store}>
            <App />
          </Provider>
        </StaticRouter>
      )
    );
    const styleTags = sheet.getStyleTags();

    res.status(200).send(
      `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        ${styleTags}
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
    </body>
</html>`
    );
  });

export default server;
