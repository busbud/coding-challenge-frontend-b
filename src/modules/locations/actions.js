export const GET_LOCATIONS_DATA_RECEIVED = 'GET_LOCATIONS_DATA_RECEIVED';

export function gotLocations (data = []) {
  return {
    type: GET_LOCATIONS_DATA_RECEIVED,
    data
  };
}
