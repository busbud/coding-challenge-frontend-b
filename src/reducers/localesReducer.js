import * as types from '../actions/actionsTypes'

export default function localeReducer(state = 'fr', action) {
  switch (action.type) {
    case types.TRANSLATE_SUCCESS:
      return action.locale
    default:
      return state
  }
}
