import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n'; // initialized i18next instance

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <App />
    </I18nextProvider>,
    document.getElementById('root'));
registerServiceWorker();
