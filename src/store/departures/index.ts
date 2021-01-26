import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DeparturesDomain } from '../../domain/search'
import { fetchDepartures, pollDepartures } from '../search/thunks'

const initialState: DeparturesDomain.Departures = {
  origin_city_id: '',
  destination_city_id: '',
  cities: [],
  locations: [],
  operators: [],
  departures: [],
  complete: false,
  status: DeparturesDomain.NOT_INITIALIZED,
}

const departuresSlice = createSlice({
  name: 'departures',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDepartures.pending, (state, _) => {
      state.status = DeparturesDomain.PENDING
    })

    builder.addCase(fetchDepartures.rejected, (state, _) => {
      state.status = DeparturesDomain.REJECTED
    })

    builder.addCase(fetchDepartures.fulfilled, (state, action) => {
      state = {
        ...state,
        ...action.payload,
      }

      state.status = DeparturesDomain.setCompleteOrIncomplete(
        action.payload.complete
      )

      return state
    })

    builder.addCase(pollDepartures.fulfilled, (state, action) => {
      const { operators, complete, departures } = action.payload
      state = {
        ...state,
        departures: [...state.departures, ...departures],
        operators: [...state.operators, ...operators],
        complete,
      }

      state.status = DeparturesDomain.setCompleteOrIncomplete(
        action.payload.complete
      )
      return state
    })
  },
})

export const { reducer: departuresReducer } = departuresSlice
