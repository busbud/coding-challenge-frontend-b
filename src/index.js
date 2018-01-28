import React from 'react'
import ReactDOM from 'react-dom'
import {applyMiddleware, compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import {createLogger} from 'redux-logger'
import reducer from './reducers'
import saga from './sagas'
import './index.css'
// eslint-disable-next-line import/no-named-as-default
import App from './containers/app'
import registerServiceWorker from './registerServiceWorker'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger())
}

const store = createStore(
	reducer,
	composeEnhancers(
		applyMiddleware(...middleware)
	)
)
sagaMiddleware.run(saga)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
registerServiceWorker()
