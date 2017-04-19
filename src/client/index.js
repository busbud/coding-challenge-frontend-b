
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import BrowserRouter from 'react-router/BrowserRouter';

import App from '../components/App';

const root = document.querySelector('#root');

const mount = (RootComponent) => {
  render(
    <AppContainer>
      <BrowserRouter>
        <RootComponent />
      </BrowserRouter>
    </AppContainer>,
    root
  );
};

if (module.hot) {
  module.hot.accept('../components/App', () => {
    // eslint-disable-next-line global-require,import/newline-after-import
    const RootComponent = require('../components/App').default;
    mount(RootComponent);
  });
}

mount(App);
