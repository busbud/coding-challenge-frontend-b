import { createImmutableSelector } from '../../config/selectors'

const getLocalState = state => state.get('locales')

export const getLang = createImmutableSelector(
  getLocalState,
  (locale) => locale.lang
)

export const getCurrency = createImmutableSelector(
  getLocalState,
  (locale) => locale.currency
)
