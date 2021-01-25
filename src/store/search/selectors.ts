import { State } from '../'

export const getOrigin = (state: State) => state.search.form.origin
export const getDestination = (state: State) => state.search.form.destination
export const getOutboundDate = (state: State) => state.search.form.outboundDate
