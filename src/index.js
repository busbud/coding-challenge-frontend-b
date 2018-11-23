import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.scss';

const configureStore = () => {
    return createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware),
    );
};

const rootElement = (
    <Provider store={configureStore()}>
        <App />
    </Provider>
);

ReactDOM.render(rootElement, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
