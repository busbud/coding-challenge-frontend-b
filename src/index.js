import 'babel-polyfill';

import React  from 'react';
import { render }  from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localForage';
import allReducers from './reducers';
import { fetchApiIfNeeded, getQueryParams } from './actions';
import App from './components/App/App';

import './index.scss';

//This is our entry point for the bb frontend challenge app

//Create the main redux store for the app
//using autoRehydrate() from redux-persist allows the state to be saved locally
const store = createStore(allReducers, applyMiddleware(thunkMiddleware)/*, autoRehydrate()*/); //@TODO: remove comments on hydrater
//We're using local forage to avoid the state being truncated by the local storage limit on most of the browsers
//persistStore(store, { storage: localForage });


let currentState
function handleChange() {
    let previousState = Object.assign({}, currentState);
    currentState = store.getState(); 
    console.log('state IN handleChange',currentState, previousState);

    if (previousState && previousState.translater && previousState.currency) {
      //Trigger API fetch if the lang or the currency has changed
      if (  previousState.translater.lang != currentState.translater.lang ||
            previousState.currency != currentState.currency
        ) {

            store.dispatch(fetchApiIfNeeded(undefined, getQueryParams(currentState.translater.lang, currentState.currency)));
      }
    }
}
//Subscribe for changes
let unsubscribe = store.subscribe(handleChange)
//Fetch API
store.dispatch(fetchApiIfNeeded());




//Render the main App in the '#challenge' div
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#challenge')
);