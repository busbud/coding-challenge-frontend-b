import { fork } from 'redux-saga/effects';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { History } from 'history';
import createReduxPromiseListener from 'redux-promise-listener';
import createRootReducer, { ApplicationState } from './store';

import routerSaga from './store/router/sagas';
import schedulesSaga from './store/schedules/sagas';

const reduxPromiseListener = createReduxPromiseListener();

export default function configureStore(
    history: History,
    initialState: ApplicationState
): Store<ApplicationState> {
    const composeEnhancers = composeWithDevTools({});

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        createRootReducer(history),
        initialState,
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
                sagaMiddleware,
                reduxPromiseListener.middleware
            )
        )
    );

    function* rootSaga() {
        yield fork(routerSaga);
        yield fork(schedulesSaga);
    }

    sagaMiddleware.run(rootSaga);

    return store;
}
