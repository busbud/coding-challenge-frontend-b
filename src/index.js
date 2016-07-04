import React  from 'react';
import { render }  from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localForage';
import allReducers from './reducers';
import App from './components/App/App';

import './index.scss';

//This is our entry point for the bb frontend challenge app

//Create the main redux store for the app
//using autoRehydrate() from redux-persist allows the state to be saved locally
const store = createStore(allReducers/*, undefined, autoRehydrate()*/); //@TODO: remove comments on hydrater
//We're using local forage to avoid the state being truncated by the local storage limit on most of the browsers
//persistStore(store, { storage: localForage });

//Render the main App in the '#challenge' div
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#challenge')
);