export const testTripInfo = {
  locations: [
    { id: 1, name: 'park', address: ['street', 'the city'] },
    { id: 2, name: 'pool', address: ['road', 'the town'] },
  ],
  departures: [{
    prices: { total: 2700 },
    arrivalTime: '2018-04-27T18:55:00',
    departureTime: '2018-04-27T14:55:00',
    originLocationId: 1,
    destinationLocationId: 2,
    operatorId: 'x',
    id: 'a',
  }],
  operators: [{ id: 'x', displayName: 'Coach Operator' }],
  complete: true
};
