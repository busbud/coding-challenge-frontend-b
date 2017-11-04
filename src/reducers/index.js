import {combineReducers} from 'redux'
import departures from './departures'
import cities from './cities'
import operators from './operators'
import searchInputs from './searchInputs'
import { localeReducer as locale} from 'react-localize-redux';

const reducers = combineReducers({
    departures,
    cities,
    operators,
    searchInputs,
    locale
})

export default reducers;