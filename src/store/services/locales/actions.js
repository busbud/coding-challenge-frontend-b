export const CHANGE_LOCALE = 'CHANGE_LOCALE'

export const changeLocale = (currency, lang) => dispatch => dispatch({ type: CHANGE_LOCALE, currency, lang })