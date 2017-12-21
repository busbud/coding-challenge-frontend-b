export const GET_CITIES_DATA_RECEIVED = 'GET_CITIES_DATA_RECEIVED';

export function gotCities (data = []) {
  return {
    type: GET_CITIES_DATA_RECEIVED,
    data
  };
}
