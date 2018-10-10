import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import common_fr from "./translations/fr.json";
import common_en from "./translations/en.json";

i18next
	.use(LngDetector)
	.init({
		interpolation: { escapeValue: false },
		resources: {
			en: {
				common: common_en
			},
			fr: {
				common: common_fr
			},
		},
		fallbackLng: 'en',
	});

ReactDOM.render(
	<I18nextProvider i18n={i18next}>
		<App />
	</I18nextProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
