/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IDeparture } from 'src/types';
import { dateCompare } from 'src/utils/compare';
import { getTime } from 'src/utils/date';

export const createDepartures = (
    responseData: Record<string, any>,
): IDeparture[] => {
    const departures = responseData.departures.map((data: any) => {
        return {
            key: data.id,
            id: data.id,
            departureTime: getTime(data.departure_time),
            arrivalTime: getTime(data.arrival_time),
            price: data.prices.total,
            location: responseData.locations?.find(
                (x: any) => x.id == data.origin_location_id,
            ).name,
            stops: data.trip_stops.map((stop: any) => {
                return {
                    departureTime: getTime(stop.departure_time),
                    arrivalTime: getTime(stop.arrival_time),
                    location: stop.name,
                    duration: stop.duration,
                };
            }),
        } as IDeparture;
    });

    return departures.sort((a: IDeparture, b: IDeparture) =>
        dateCompare(a.departureTime, b.departureTime),
    );
};
