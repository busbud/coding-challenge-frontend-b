/***
 * @author Shiming Chen <chen@lemontv.me>
 */

const CHANGE_LOCALE  = 'CHANGE_LOCALE';

export function changeLocale (lang, currency) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_LOCALE,
      lang,
      currency
    })
  }
}

/*
 * schedules init state
 */
const initState = {
  lang: 'en',
  currency: 'USD'
}

export default function reducer (state = initState, action) {
  switch(action.type) {
    case CHANGE_LOCALE:
      return Object.assign({}, state, {
        lang: action.lang,
        currency: action.currency
      })
    default:
      return state
  }
}
