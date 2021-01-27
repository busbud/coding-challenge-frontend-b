import { SearchDomain } from 'src/domain/search'
import { Search } from 'src/domain/search/Search'
import { State } from '../'

export const getSearchForm = (state: State) => state.search.form
export const getOrigin = (state: State) => state.search.form.origin
export const getDestination = (state: State) => state.search.form.destination
export const getOutboundDate = (state: State) => state.search.form.outboundDate
export const getPassengersCount = (state: State) =>
  state.search.form.child + state.search.form.adult + state.search.form.senior

export const getPassenger = (
  state: State,
  key: SearchDomain.PassengerKeys | SearchDomain.PassengerAgeKeys
) => state.search.form[key]

export const getPassengers = (state: State) => ({
  child: state.search.form.child,
  adult: state.search.form.adult,
  senior: state.search.form.senior,
  senior_ages: state.search.form.senior_ages,
  child_ages: state.search.form.child_ages,
})
