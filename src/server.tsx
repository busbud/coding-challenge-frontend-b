import * as React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import * as Express from 'express';
import { Provider } from 'mobx-react';
import { ServerStyleSheet } from 'styled-components'
import SearchStore from './app/store/search';

import Html from './html';
import App from './app/app';

const app = Express();

app.use(Express.static('dist'));

const initialData = {
    name: 'World'
};


app.get('*', (_req, res) => {
    const sheet = new ServerStyleSheet()
    const jsx = sheet.collectStyles( 
        <Html initialData={JSON.stringify(initialData)}>
          <Provider store={SearchStore}>
            <App />
          </Provider>
        </Html>
    );
    const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));
    stream.pipe(res);
});

app.listen(8888, () => {
    console.log('listening on port 8888...')
});
