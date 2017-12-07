const VALID_CITIES = [
  {
    geohash: 'dr5reg',
    cityName: 'New York',
  }, {
    geohash: 'f25dvk',
    cityName: 'Montreal',
  },
];

export function delay(t) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
}

export function geohashToName(geohash) {
  return VALID_CITIES.find(city => city.geohash === geohash).cityName;
}
