import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';
import App from './App';
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
