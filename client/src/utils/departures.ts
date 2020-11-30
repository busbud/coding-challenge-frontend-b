import { Schedules, Departure } from '../api/interfaces';

export const getDepartureInfo = (
    schedules: Schedules,
    departure: Departure
) => {
    const {
        departure_time,
        arrival_time,
        prices,
        origin_location_id,
        destination_location_id,
    } = departure;
    const { locations, cities } = schedules;
    const departureDate = new Date(departure_time);
    const arrivalDate = new Date(arrival_time);
    const departureHour = `${departureDate.getHours()}:${String(
        departureDate.getMinutes()
    ).padStart(2, '0')}`;
    const arrivalHour = `${arrivalDate.getHours()}:${String(
        arrivalDate.getMinutes()
    ).padStart(2, '0')}`;
    const price = `${prices?.total / 100} ${prices?.currency}`;
    const locationOriginName = locations
        ?.filter((location) => location.id === origin_location_id)
        .map((l) => l.name);
    const locationDestinationName = locations
        ?.filter((location) => location.id === destination_location_id)
        .map((l) => l.name);
    return {
        departureHour,
        arrivalHour,
        price,
        locationOriginName,
        locationDestinationName,
        originCity: cities[0]?.name,
        destinationCity: cities[1]?.name,
    };
};
