import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { fetchDepartures, DepartureSearchParams } from './departuresAPI'

export interface DeparturesState {
  data: any
  status: 'idle' | 'loading' | 'failed'
  error: string | null
  searchParams: DepartureSearchParams
  pollStatus: 'idle' | 'loading' | 'failed'
  pollError: string | null
}

const initialState: DeparturesState = {
  data: {},
  status: 'idle',
  error: null,
  searchParams: {
    origin: 'f2m673', // Québec - geohash
    destination: 'f25dvk', // Montréal - geohash
    outboundDate: '2021-11-02', // Departure date
    adult: 1,
    poll: false,
    index: 0,
  },
  pollStatus: 'idle',
  pollError: null,
}

export const fetchDeparturesSearchAsync = createAsyncThunk(
  'departureSearch/fetchDepartures',
  async (searchParams: DepartureSearchParams) => {
    const response = await fetchDepartures(searchParams)
    return response.data
  }
)

export const pollDeparturesAsync = createAsyncThunk(
  'departureSearch/pollDepartures',
  async (searchParams: DepartureSearchParams) => {
    const response = await fetchDepartures(searchParams)
    return response.data
  }
)

export const departureSearchSlice = createSlice({
  name: 'departureSearch',
  initialState,
  reducers: {
    updateSearchParams: (
      state,
      action: PayloadAction<DepartureSearchParams>
    ) => {
      state.searchParams = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeparturesSearchAsync.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchDeparturesSearchAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.data = action.payload
      })
      .addCase(fetchDeparturesSearchAsync.rejected, (state) => {
        state.status = 'failed'
        state.error = 'Oops, something went wrong, please try again later.'
      })

    // Polling
    builder
      .addCase(pollDeparturesAsync.pending, (state) => {
        state.pollStatus = 'loading'
        state.pollError = null
      })
      .addCase(pollDeparturesAsync.fulfilled, (state, action) => {
        const nextData = {
          ...state.data,
          departures: [...state.data.departures, ...action.payload.departures],
          locations: [...state.data.locations, ...action.payload.locations],
          operators: [...state.data.operators, ...action.payload.operators],
          complete: action.payload.complete,
          ttl: action.payload.ttl,
        }
        const nextSearchParams = {
          ...state.searchParams,
          index: state.data.departures.length,
          poll: !action.payload.complete,
        }

        return {
          ...state,
          pollStatus: 'idle',
          data: nextData,
          searchParams: nextSearchParams,
        }
      })
      .addCase(pollDeparturesAsync.rejected, (state) => {
        state.pollStatus = 'failed'
        state.pollError = 'Oops, something went wrong, please try again later.'
      })
  },
})

export const { updateSearchParams } = departureSearchSlice.actions

export const selectDeparturesData = (state: RootState) =>
  state.departureSearch.data
export const selectDeparturesSearchParams = (state: RootState) =>
  state.departureSearch.searchParams
export const selectDepartureStatuses = (state: RootState) => {
  return {
    status: state.departureSearch.status,
    pollStatus: state.departureSearch.pollStatus,
  }
}

export default departureSearchSlice.reducer
