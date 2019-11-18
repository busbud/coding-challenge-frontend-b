/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import { StaticRouter, matchPath } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets as MaterialServerStyleSheets } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import App from './App';
import configureStore from './store';
import routes from './routes';
import { GET_DEPARTURES_SUCCEEDED } from './store/departures';
import messages from './i18n/messages';

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
    // In real life, you could have multiple matches...
    // but not in this app ;-)
    const match: any = routes.find(route => matchPath(req.url, route)) || {};
    // TODO: Fix typing throughout this file
    const { loadData }: any = match;

    let promise = null;

    if (loadData) {
      const { params }: any = matchPath(req.url, match);
      promise = loadData(params);
    } else {
      promise = Promise.resolve(null);
    }

    const lang = 'en';

    promise
      .then((data: any) => {
        const context = {};
        const sheet = new ServerStyleSheet();
        const materialSheet = new MaterialServerStyleSheets();
        const store = configureStore();
        store.dispatch({
          type: GET_DEPARTURES_SUCCEEDED,
          payload: data
        });
        const preloadedState = store.getState();

        const markup = renderToString(
          materialSheet.collect(
            sheet.collectStyles(
              <StaticRouter context={context} location={req.url}>
                <Provider store={store}>
                  <IntlProvider
                    key={lang}
                    locale={lang}
                    messages={messages[lang]}
                  >
                    <App />
                  </IntlProvider>
                </Provider>
              </StaticRouter>
            )
          )
        );
        const styleTags = sheet.getStyleTags();
        const materialStyleTags = materialSheet.toString();
        res.status(200).send(
          `<!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>Busbud coding challenge</title>
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
          <style>${materialStyleTags}</style>
      </head>
      <body>
          <div id="root">${markup}</div>
          <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
          </script>
      </body>
  </html>`
        );
      })
      .catch((e: Error) => {
        console.error(e);
        res.status(500).send(`ERROR: ${e}`);
      });
  });

export default server;
