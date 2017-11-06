import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import {departureEpic} from '../epics'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const epicMiddleware = createEpicMiddleware(departureEpic);

export default createStore(
    reducers, 
    composeWithDevTools(
        applyMiddleware(thunk,epicMiddleware)
    )
)