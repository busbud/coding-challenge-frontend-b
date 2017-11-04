import { initialize, addTranslation,setActiveLanguage } from 'react-localize-redux';
import { UPDATE_SEARCH_LANGUAGE } from './searchInputs'

const languages = ['en', 'fr'];

export const initializeLocale = () => {
    const json = require('../locale/global.json');

    return (dispatch) => {
        dispatch(initialize(languages))
        dispatch(addTranslation(json))
    } 
}

export const changeLocale = (lang) => {
    return (dispatch) => {
        dispatch(setActiveLanguage(lang))

        dispatch({
            type : UPDATE_SEARCH_LANGUAGE,
            payload : lang
        })
       
    } 
}
