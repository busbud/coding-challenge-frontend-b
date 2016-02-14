var _ = require('underscore');
var Backbone = require('backbone');

var Departures = Backbone.Collection.extend({
  url: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2016-07-29',

  findLocationNameById: function(id, locations) {
    var name;

    _.find(locations, function(location) {

      if (id === location.id) {
        name = location.name;
      }

    });

    return name;

  },

  parseImageURL: function(url) {
    return url.split('?')[0]
  },

  addMissingZero: function(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
  },

  formatedTime: function(time) {
    // Prefered aproach though its not consistent accross browsers.
    // var d = new Date(time);
    // return d.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
    var d = new Date(time);
    var h = d.getHours();
    var m = d.getMinutes();


    return this.addMissingZero(h) + ':' + this.addMissingZero(m);
  },

  formattedPrice: function(price) {
    return parseInt(price) / 100;
  },

  comparator: 'price',

  parse: function(response) {
    var data = {};
    var departuresDetails = [];

    var departures = response.departures;
    var locations = response.locations;

    data.originCity = response.cities[0].name;
    data.destinationCity = response.cities[1].name;
    data.destinationCityImage =  this.parseImageURL(response.cities[1].hero_image_url);
    data.originName = [];
    data.destinationName = [];


    _.map(departures, function(item) {
      data.originName.push(this.findLocationNameById(item.origin_location_id, locations));
      data.destinationName.push(this.findLocationNameById(item.destination_location_id, locations));
    }.bind(this));

    for (var i=0; i < data.originName.length; i++ ){
      departuresDetails.push({
        id: i,
        originCity: data.originCity,
        originName: data.originName[i],
        destinationCity: data.destinationCity,
        destinationName: data.destinationName[i],
        destinationCityImage: data.destinationCityImage,
        arrivalTime: this.formatedTime(departures[i].arrival_time),
        departureTime: this.formatedTime(departures[i].departure_time),
        price: this.formattedPrice(departures[i].prices.total),
        ticketClass: departures[i].class_name,
        availableSeats: departures[i].available_seats,
        amenities: departures[i].amenities
      })
    }

    return departuresDetails;
  }
});

module.exports = Departures;