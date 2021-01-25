import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrencyDomain } from '../../domain/currency'

type CurrencyState = {
  value: CurrencyDomain.Currency
}

const initialState: CurrencyState = {
  value: CurrencyDomain.USD,
}

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<CurrencyDomain.Currency>) {
      state.value = action.payload
    },
  },
})

export const {
  reducer: currencyReducer,
  actions: { setCurrency },
} = currencySlice
