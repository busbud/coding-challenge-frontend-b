const CITIES = [
    {
        geohash: 'dr5reg',
        city: 'New York'
    },
    {
        geohash: 'f25dvk',
        city: 'Montreal'
    }
];

export const geohashToCity = geohash => {
    return CITIES.find(city => city.geohash === geohash).city;
}

export const timeout = delay => (
    new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, delay)
    })
);

