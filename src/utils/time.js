import { DateTime } from 'luxon';

export const getDepartureDuration = ({ departure_time, arrival_time, departure_timezone, arrival_timezone }) => {
    const departureTZ = DateTime.fromISO(departure_time, { zone: departure_timezone })
    const arrivalTZ = DateTime.fromISO(arrival_time, { zone: arrival_timezone })

    return arrivalTZ.diff(departureTZ, ['days', 'hours', 'minutes']).toObject()
}
