export const GET_OPERATORS_DATA_RECEIVED = 'GET_OPERATORS_DATA_RECEIVED';

export function gotOperators (data = []) {
  return {
    type: GET_OPERATORS_DATA_RECEIVED,
    data
  };
}
