import Cookies from 'js-cookie';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const language = Cookies.get('language') || 'en';

// guess the user's currency based on their language and timezone
const currencyGuess =
  new Date().getTimezoneOffset() < 0 ?
    'EUR' :
    (language == 'en' ? 'USD' : 'CAD');

const currency = Cookies.get('currency') || currencyGuess;

ReactDOM.hydrate(
  <React.StrictMode>
    <App language={language} currency={currency} />
  </React.StrictMode>,
  document.getElementById('root')
);
