import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './containers/App';

export const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
