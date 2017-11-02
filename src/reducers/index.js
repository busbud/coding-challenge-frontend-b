import {combineReducers} from 'redux'
import departures from './departures'
import cities from './cities'
import operators from './operators'

const reducers = combineReducers({
    departures,
    cities,
    operators
})

export default reducers;