import axios from 'axios';
import { get_departures } from './departures.js';

jest.mock('axios');

jest.useFakeTimers();

describe('get_departures', () => {
    let data;
    let params;
    beforeEach(() => {
        params = {
            departure_date: '2022-07-01',
            departure_origin: 'Quebec',
            arrival_origin: 'Montreal',
            adult: 5,
            child: 0,
            currency: 'CAD',
            lang: 'en',
            senior: 0,
        };
        data = {
            complete: true,
            departures: [
                {
                    id: 1,
                    departure_time: '2022-03-05',
                    departure_timezone: 'America/Montreal',
                    arrival_time: '2022-03-06',
                    arrival_timezone: 'America/Montreal',
                    origin_location_id: 'xxx',
                    destination_location_id: 'yyy',
                    prices: {
                        total: 100,
                        currency: 'USD',
                    },
                },
                {
                    id: 2,
                    departure_time: '2022-03-08',
                    departure_timezone: 'America/Montreal',
                    arrival_time: '2022-03-09',
                    arrival_timezone: 'America/Montreal',
                    origin_location_id: 'yyy',
                    destination_location_id: 'xxx',
                    prices: {
                        total: 150,
                        currency: 'PESO',
                    },
                },
            ],
            locations: [
                {
                    id: 'xxx',
                    name: 'Palais de congres',
                },
                {
                    id: 'yyy',
                    name: 'gare central',
                },
            ],
        };
    });

    describe('when request is complete at the first time', () => {
        beforeEach(() => {
            axios.get.mockReset();
        });

        beforeEach(() => {
            axios.get.mockResolvedValue({
                data: data,
            });
        });

        it('should sent GET request to init search endpoint with expected params', async () => {
            const result = await get_departures(params);
            expect(axios.get).toHaveBeenCalledWith(
                'https://napi.busbud.com/x-departures/f2m673/f25dvk/2022-07-01',
                {
                    headers: {
                        Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                        'X-Busbud-Token': 'PARTNER_c9g6z7V0SNqUlnar2EFsxw',
                    },
                    params: { adult: 5, child: 0, currency: 'CAD', lang: 'en', senior: 0 },
                }
            );

            expect(result).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: 1,
                        departure_time: '2022-03-05',
                        departure_timezone: 'America/Montreal',
                        arrival_time: '2022-03-06',
                        arrival_timezone: 'America/Montreal',
                        total_price: 100,
                        currency: 'USD',
                        departure_location: 'Palais de congres',
                        arrival_location: 'gare central',
                    }),
                    expect.objectContaining({
                        id: 2,
                        departure_time: '2022-03-08',
                        departure_timezone: 'America/Montreal',
                        arrival_time: '2022-03-09',
                        arrival_timezone: 'America/Montreal',
                        total_price: 150,
                        currency: 'PESO',
                        departure_location: 'gare central',
                        arrival_location: 'Palais de congres',
                    }),
                ])
            );
        });

        describe('when init request has not yet been completed', () => {
            let newData;

            beforeEach(() => {
                newData = {
                    complete: true,
                    departures: [
                        {
                            id: 3,
                            departure_time: '2022-03-10',
                            departure_timezone: 'America/Montreal',
                            arrival_time: '2022-03-11',
                            arrival_timezone: 'America/Montreal',
                            origin_location_id: 'xxx',
                            destination_location_id: 'yyy',
                            prices: {
                                total: 200,
                                currency: 'USD',
                            },
                        },
                        {
                            id: 4,
                            departure_time: '2022-03-12',
                            departure_timezone: 'America/Montreal',
                            arrival_time: '2022-03-13',
                            arrival_timezone: 'America/Montreal',
                            origin_location_id: 'yyy',
                            destination_location_id: 'xxx',
                            prices: {
                                total: 300,
                                currency: 'AUD',
                            },
                        },
                    ],
                    locations: [
                        {
                            id: 'xxx',
                            name: 'Palais de congres',
                        },
                        {
                            id: 'yyy',
                            name: 'gare central',
                        },
                    ],
                };
                axios.get.mockImplementation((url) => {
                    if (url.includes('poll')) {
                        return Promise.resolve({
                            data: { ...newData, complete: true },
                        });
                    }
                    return Promise.resolve({
                        data: { ...data, complete: false },
                    });
                });
            });

            it('should init search and then call a poll endpoint', async () => {
                const result = await get_departures(params);
                jest.runAllTimers();
                expect(axios.get).toHaveBeenCalledWith(
                    'https://napi.busbud.com/x-departures/f2m673/f25dvk/2022-07-01',
                    {
                        headers: {
                            Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                            'X-Busbud-Token': 'PARTNER_c9g6z7V0SNqUlnar2EFsxw',
                        },
                        params: { adult: 5, child: 0, currency: 'CAD', lang: 'en', senior: 0 },
                    }
                );

                expect(axios.get).toHaveBeenCalledWith(
                    'https://napi.busbud.com/x-departures/f2m673/f25dvk/2022-07-01/poll',
                    {
                        headers: {
                            Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                            'X-Busbud-Token': 'PARTNER_c9g6z7V0SNqUlnar2EFsxw',
                        },
                        params: {
                            adult: 5,
                            child: 0,
                            currency: 'CAD',
                            lang: 'en',
                            senior: 0,
                            index: 2,
                        },
                    }
                );

                expect(result).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: 1,
                            departure_time: '2022-03-05',
                            departure_timezone: 'America/Montreal',
                            arrival_time: '2022-03-06',
                            arrival_timezone: 'America/Montreal',
                            total_price: 100,
                            currency: 'USD',
                            departure_location: 'Palais de congres',
                            arrival_location: 'gare central',
                        }),
                        expect.objectContaining({
                            id: 2,
                            departure_time: '2022-03-08',
                            departure_timezone: 'America/Montreal',
                            arrival_time: '2022-03-09',
                            arrival_timezone: 'America/Montreal',
                            total_price: 150,
                            currency: 'PESO',
                            departure_location: 'gare central',
                            arrival_location: 'Palais de congres',
                        }),
                        expect.objectContaining({
                            id: 3,
                            departure_time: '2022-03-10',
                            departure_timezone: 'America/Montreal',
                            arrival_time: '2022-03-11',
                            arrival_timezone: 'America/Montreal',
                            total_price: 200,
                            currency: 'USD',
                            departure_location: 'Palais de congres',
                            arrival_location: 'gare central',
                        }),
                        expect.objectContaining({
                            id: 4,
                            departure_time: '2022-03-12',
                            departure_timezone: 'America/Montreal',
                            arrival_time: '2022-03-13',
                            arrival_timezone: 'America/Montreal',
                            total_price: 300,
                            currency: 'AUD',
                            departure_location: 'gare central',
                            arrival_location: 'Palais de congres',
                        }),
                    ])
                );
            });
        });
    });
});
