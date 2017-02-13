import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';

import { Challenge } from './components/Challenge';
import i18n from './lib/i18n';

ReactDOM.render(
  <I18nextProvider i18n={i18n}><Challenge /></I18nextProvider>,
  document.getElementById('app-root')
);
