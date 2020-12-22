export const fetchDepartures = pathParams => ({
  type: 'FETCH_ACTION',
  pathParams,
});
export const fetchDeparturesSuccess = response => ({
  type: 'FETCH_SUCCESS',
  response,
});
export const fetchDeparturesError = error => ({
  type: 'FETCH_ERROR',
  error,
});
