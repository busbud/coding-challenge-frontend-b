import { createAsyncThunk } from '@reduxjs/toolkit'
import { State } from '..'
import { getSearchForm } from './selectors'
import { getDeparturesCount } from '../departures/selectors'
import { SearchDomain, DeparturesDomain } from '../../domain/search'
import SearchService from '../../services/searchService'

export const fetchDepartures = createAsyncThunk<
  DeparturesDomain.Departures,
  void,
  { state: State }
>('search/fetchDepartures', async (_, { getState }) => {
  const state = getState()
  const form = getSearchForm(state)
  const search = SearchDomain.Search.start(form)
  const searchService = SearchService(search)

  const response = await searchService.fetch()

  return response?.data!
})

export const pollDepartures = createAsyncThunk<
  Pick<DeparturesDomain.Departures, 'operators' | 'departures' | 'complete'>,
  void,
  { state: State }
>('search/pollDepartures', async (_, { getState }) => {
  const state = getState()
  const form = getSearchForm(state)
  const search = SearchDomain.Search.start(form)
  const searchService = SearchService(search)

  const index = getDeparturesCount(state)
  const response = await searchService.poll(index)

  return response?.data!
})
