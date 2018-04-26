import { createStore } from 'redux';
import { install } from 'redux-loop';
import rootReducer from './reducers/index';

const store = createStore(rootReducer, undefined, install());

export default store;
