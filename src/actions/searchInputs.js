export const UPDATE_SEARCH_DATE = 'UPDATE_SEARCH_DATE'
export const UPDATE_SEARCH_LANGUAGE = 'UPDATE_SEARCH_LANGUAGE'


export const updateSearchDate = (date) => {
    return (dispatch) => {
        dispatch({
            type:UPDATE_SEARCH_DATE,
            payload: date
        })
    } 
}

export const updateSearchLang = (lang) => {
    return (dispatch) => {
        dispatch({
            type:UPDATE_SEARCH_LANGUAGE,
            payload: lang
        })
    } 
}
