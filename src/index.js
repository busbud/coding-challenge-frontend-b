import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducers } from './reducers';
import I18nProvider from './contexts/I18nProvider';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <I18nProvider>
            <App />
        </I18nProvider>
    </Provider>,
    document.getElementById('root'));