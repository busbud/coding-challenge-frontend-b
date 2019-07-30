export const departuresSelector = state => state.departures.list;
export const indexSelector = state => state.departures.list.length;
export const isLoadingSelector = state => state.departures.isLoading;
export const isCompleteSelector = state => state.departures.isComplete;
export const filtersSelector = state => state.departures.filters;
