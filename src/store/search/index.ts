import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { formatISO } from 'date-fns'

import { DateDomain, LanguageDomain } from '../../domain/language'
import { CurrencyDomain } from '../../domain/currency'
import { SearchData } from '../../domain/search/Search'
import { setCurrency } from '../currency'
import { LocationDomain } from '../../domain/location'

type SearchState = {
  form: SearchData & {
    isLoading: boolean
  }
}

const initialState: SearchState = {
  form: {
    origin: LocationDomain.getLocationByName('Québec'),
    destination: LocationDomain.getLocationByName('Montréal'),
    outboundDate: DateDomain.todayString(),
    adult: 0,
    child: 0,
    senior: 0,
    lang: LanguageDomain.EN,
    currency: CurrencyDomain.USD,
    isLoading: false,
  },
}

type SetPlaceAction = {
  field: 'origin' | 'destination'
  location: LocationDomain.Location['name']
}
const setPlace = (
  state: SearchState,
  action: PayloadAction<SetPlaceAction>
) => {
  const { field, location } = action.payload
  state.form[field] = LocationDomain.getLocationByName(location)
}

const setDate = (state: SearchState, action: PayloadAction<string>) => {
  state.form.outboundDate = action.payload
}

const switchPlaces = (state: SearchState) => {
  const newOrigin = state.form.destination
  const newDestination = state.form.origin
  state.form.destination = newDestination
  state.form.origin = newOrigin
}

const currencySlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setPlace,
    switchPlaces,
    setDate,
  },
  extraReducers: (builder) => {
    builder.addCase(
      setCurrency,
      (state, action: PayloadAction<CurrencyDomain.Currency>) => {
        state.form.currency = action.payload
      }
    )
  },
})

export const { reducer: searchReducer, actions } = currencySlice
