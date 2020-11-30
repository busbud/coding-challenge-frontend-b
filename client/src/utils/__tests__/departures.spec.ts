import { getDepartureInfo } from '../departures';

describe('Test getDepartureInfo function', () => {
    const departure1 = {
        origin_location_id: 12189,
        arrival_time: '2020-12-13T12:45:00',
        departure_time: '2020-12-13T09:30:00',
        destination_location_id: 1938,
        prices: {
            currency: 'CAD',
            total: 6869,
        },
    };
    const departure2 = {
        origin_location_id: 12189,
        arrival_time: '2020-12-13T14:15:00',
        departure_time: '2020-11-30T10:30:00',
        destination_location_id: 1938,
        prices: {
            currency: 'CAD',
            total: 6869,
        },
    };
    const schedules = {
        complete: true,
        locations: [
            {
                id: 12159,
                name: 'Université Laval',
            },
            {
                id: 12189,
                name: 'Gare du Palais',
            },
            {
                id: 1938,
                name: "Gare d'autocars",
            },
        ],
        cities: [
            {
                id: '375dd587-9001-acbd-84a4-683deddcb1b1',
                name: 'Quebec City',
            },
            {
                id: '375dd587-9001-acbd-84a4-683dedfb933e',
                name: 'Montreal',
            },
        ],
    };
    it('should return the relevant info', () => {
        const result1 = getDepartureInfo(schedules, departure1);
        expect(result1?.departureHour).toBe('9:30');
        expect(result1?.arrivalHour).toBe('12:45');
        expect(result1?.price).toBe('68.69 CAD');
        expect(result1?.locationOriginName).toStrictEqual(["Gare du Palais"]);
        expect(result1?.locationDestinationName).toStrictEqual([`Gare d'autocars`]);

        const result2 = getDepartureInfo(schedules, departure2);
        expect(result2?.arrivalHour).toBe('14:15');
        expect(result2?.departureHour).toBe('10:30');
    });
});
