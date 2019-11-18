import { createSelector } from 'reselect';
import { AppState } from '.';

// Constants
export const CHANGE_LANG = 'CHANGE_LANG';

// Typings
interface ChangeLangAction {
  type: typeof CHANGE_LANG;
  payload: Lang;
}

// Actions
export type Lang = 'en' | 'fr';
type LangActionTypes = ChangeLangAction;

export function changeLang(payload: Lang): ChangeLangAction {
  return {
    type: CHANGE_LANG,
    payload
  };
}

// Initial state
const initialState: Lang = 'en';

// Reducers
export function langReducer(state = initialState, action: LangActionTypes) {
  switch (action.type) {
    case CHANGE_LANG:
      return action.payload;
    default:
      return state;
  }
}

// Selectors
const getLang = (state: AppState) => state.lang;

export const langSelector = createSelector(getLang, lang => lang);
