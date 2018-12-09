import { is } from 'immutable'
import { createSelectorCreator, defaultMemoize } from 'reselect'

export const createImmutableSelector = createSelectorCreator(
  defaultMemoize,
  is,
)
