const utils = {

  validCities: [
    {
      geohash: "dr5reg",
      cityName: "New York"
    }, {
      geohash: "f25dvk",
      cityName: "Montreal"
    }
  ],

  parseTime: function(rawDate) {
    const date = new Date(Date.parse(rawDate));
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`
  },

  delay: function(t) {
    return new Promise((resolve) => {
      setTimeout(function() {
        resolve();
      }, t);
    });
  },

  geohashToName: function(geohash) {
    return this.validCities.find(city => city.geohash === geohash).cityName
  },

  cityNameToGeohash: function(cityName) {
    return this.validCities.find(city => city.cityName === cityName).geohash
  }

};


export default utils;
