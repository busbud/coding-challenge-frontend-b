import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';
import modules from './config/modules';
import reducers from './reducers/';
import configureStore from './store/configureStore';

function getRoute(module) {
	return <Route key={module.path} {...module} />;
}

const store = configureStore()(reducers);

export default (
	<I18nextProvider i18n={i18n()}>
		<Provider store={store}>
			<Router history={syncHistoryWithStore(browserHistory, store)}>
				{modules.map(getRoute)}
			</Router>
		</Provider>
	</I18nextProvider>
);
