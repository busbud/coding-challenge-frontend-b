import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';
import clientMiddleware from './clientMiddleware';

const configureStore = (client, preloadedState) => {
    const enhancer = compose(
        // applyMiddleware(clientMiddleware(client)),
        applyMiddleware(thunkMiddleware),
    );

    return createStore(
        rootReducer,
        preloadedState,
        enhancer,
    );
};

export default configureStore;
