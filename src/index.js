import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers';
import { Provider } from 'react-redux'
import makeStore from './store/makeStore';
import * as serviceWorker from './serviceWorker';
import './styles/core.css';

const store = makeStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
