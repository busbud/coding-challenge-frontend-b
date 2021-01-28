import {
  AnyAction,
  AsyncThunkPayloadCreatorReturnValue,
} from '@reduxjs/toolkit'
import { configureMockStore, MockStoreEnhanced } from '@jedmao/redux-mock-store'
import { State } from '../../../store'
import { RecursivePartial } from '../../../types/utils'

// every piece of state that thunkWithContainer needs to work
export const createMockInitialState = (
  attrs: RecursivePartial<State> = {}
): RecursivePartial<State> => ({
  ...attrs,
})

const mockStore = configureMockStore<any, any, any>()

export const createMockStore = (attrs: RecursivePartial<State> = {}) =>
  mockStore(createMockInitialState(attrs))

export const dispatchThunk = async (
  store: MockStoreEnhanced<State>,
  thunk: AsyncThunkPayloadCreatorReturnValue<any, any>,
  thunkArgs?: any
) => {
  await store.dispatch(thunk(thunkArgs))
  const actions = store.getActions()

  const { typePrefix } = thunk

  const pendingAction = findAction(actions, typePrefix, 'pending')
  const fulfilledAction = findAction(actions, typePrefix, 'fulfilled')
  const rejectedAction = findAction(actions, typePrefix, 'rejected')

  return {
    pendingAction,
    fulfilledAction,
    rejectedAction,
    ...actions,
  }
}

const findAction = (actions: AnyAction[], typePrefix: string, type: string) => {
  const actionType = `${typePrefix}/${type}`

  return actions.find((action: AnyAction) => action.type === actionType)
}
