import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store';

export interface AugmentedWindow extends Window {
  __PRELOADED_STATE__?: string;
}

// eslint-disable-next-line no-underscore-dangle
const store = configureStore((window as AugmentedWindow).__PRELOADED_STATE__!);

function ComponentsTree() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}

hydrate(<ComponentsTree />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
