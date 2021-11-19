import { atom, selector } from 'recoil';
import { DeparturesEntity, CitiesEntity, OperatorsEntity, LocationsEntity, DeparturesFullEntity } from '../interfaces/response';

export const citiesState = atom({
    key: 'cities',
    default: [] as CitiesEntity[],
});

export const locationsState = atom({
    key: 'locations',
    default: [] as LocationsEntity[],
});

export const operatorsState = atom({
    key: 'operators',
    default: [] as OperatorsEntity[],
});

export const departuresState = atom({
    key: 'departures',
    default: [] as DeparturesEntity[],
});

export const isLoadingState = atom({
    key: 'isLoading',
    default: false,
});

export const errorState = atom({
    key: 'error',
    default: '',
});

/**
 * Creates an array of Departures element with all of the additional information required (city name, operator, etc)
 * Only the required additional data is added to avoid a large element
 */
export const departuresFullState = selector({
    key: 'departuresFull',
    get: ({ get }): DeparturesFullEntity[] => {
        const departures = get(departuresState);
        const locations = get(locationsState);
        const operators = get(operatorsState);
        const cities = get(citiesState);

        return departures.map(departure => {
            const { display_name: operatorDisplayName, logo_url } = operators.find(operator => operator.id === departure.operator_id);
            const { name: originLocationName, city_id: origin_city_id } = locations.find(location => location.id === departure.origin_location_id);
            const { name: destinationLocationName, city_id: destination_city_id } = locations.find(location => location.id === departure.destination_location_id);
            const { name: originLocationCityName } = cities.find(city => city.id === origin_city_id);
            const { name: destinationLocationCityName } = cities.find(city => city.id === destination_city_id);
            return {
                ...departure,
                operator: {
                    name: operatorDisplayName,
                    logo_url,
                },
                originLocation: {
                    name: originLocationName,
                    cityName: originLocationCityName,
                },
                destinationLocation: {
                    name: destinationLocationName,
                    cityName: destinationLocationCityName,
                },
            };
        });
    },
})