import { createReducer } from 'typesafe-actions';
import { getLanguage } from '../../utils/language';
import * as actions from './actions';

export interface LanguageStateType {
    language: string;
}

export const languageInitialState: LanguageStateType = {
    language: getLanguage(),
};

export const languageReducer = createReducer<Readonly<LanguageStateType>>(
    languageInitialState
).handleAction(
    actions.changeLanguageAction,
    (state: LanguageStateType, action): LanguageStateType => {
        return { ...state, language: action.payload };
    }
);
