import { combineReducers } from 'redux';

import globalReducer from './containers/App/reducer';
import languageProviderReducer from './containers/LanguageProvider/reducer';

export default function createReducer(injectedReducers) {
  return combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    ...injectedReducers,
  });
}
