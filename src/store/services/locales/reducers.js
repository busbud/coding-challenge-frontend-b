import * as actions from './actions'

const localesInitial = {
  currency: 'USD',
  lang: 'en',
}

export const locales = (state = localesInitial, action) => {
  switch (action.type) {
    case actions.CHANGE_LOCALE:
      return {
        ...state,
        currency: action.currency,
        lang: action.lang,
      }
    default:
      return state
  }
}
