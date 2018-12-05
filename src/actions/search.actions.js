import { normalize, schema } from 'normalizr';

export const cleanStore = () => {
    return {
        type: 'CLEAN_STORE'
    }
}

export const searchRequestSuccess = data => {
    const locations = new schema.Entity('locations');
    const locationsSchema = { locations: [locations] }
    const normalizedLocationsData = normalize(data, locationsSchema)
    return {
        type: 'SEARCH_REQUEST_SUCCESS',
        departures: data.departures,
        locations: normalizedLocationsData.entities.locations
    }
}
