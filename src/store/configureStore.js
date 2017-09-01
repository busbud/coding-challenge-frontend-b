import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

export default function configureStore() {
	const logger = createLogger();

	return applyMiddleware(thunkMiddleware, logger)(createStore);
}
