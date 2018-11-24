import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';

const configureStore = (client, preloadedState) => {
    const enhancer = compose(
        applyMiddleware(thunkMiddleware),
    );

    return createStore(
        rootReducer,
        preloadedState,
        enhancer,
    );
};

export default configureStore;
