import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import departureSearchReducer from '../features/departure-search/departureSearchSlice'

export const store = configureStore({
  reducer: {
    departureSearch: departureSearchReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
