import React from 'react';
import ReactDOM from 'react-dom';

import './lang/i18n';
import './index.scss';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
