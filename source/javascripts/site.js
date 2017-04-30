$(document).ready(function() {

  // Spinner icon
  var $spinner = $('.loading-icon');
  var $btnTickets = $(".btn-tickets");
  var $vAlign = $(".v-align");

  $btnTickets.click(function(){
    $("form").trigger("submit");
  });


  // Listen to the form submit event
  $("form").submit(function(event){
      // Prevent defaut form behavior
      event.preventDefault();

      // Empty object that will store form values
      var _values = {};

      // Show spinner
      $spinner.removeClass("hidden");

      // Hide btnTickets
      $btnTickets.addClass("hidden");

      // Remove all previous results from the list
      $(".results > li").not(".template").remove();

      // Loop through all inputs and add value to _values object
      // ex.: { email: "mrt@gmail.ca" }
      $('input', this).each(function() {
        _values[$(this).attr("name")] = $(this).val();
      });

      // Busbud API url
      var apiUrl = "https://napi.busbud.com/x-departures/";

      // Build API URL based on form values
      apiUrl += _values.origin + "/" + _values.destination + "/" + _values.outbound_date;

      getDepartures(apiUrl);
  });

  function getDepartures(apiUrl){
    // Ajax request
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": apiUrl,
      "method": "GET",
      "headers": {
        "x-busbud-token": "PARTNER_JSWsVZQcS_KzxNRzGtIt1A",
        "cache-control": "no-cache"
      }}).done(function(response) {
      // Debug: Response from the server
      //console.log("Response: ", response.departures);

      // If response is complete
      if (response.complete) {

        // If there is departures
        if (response.departures.length) {
          displayResults(response);
        } else {
          $(".noResults").removeClass("hidden");
          $spinner.addClass("hidden");
        }
      } else {
        getDepartures(apiUrl);
      }
    });
  };

  function displayResults(response){
    // Hide spinner
    $spinner.addClass("hidden");
    $btnTickets.addClass("hidden");
    $vAlign.removeClass("v-align");

    // Loop through all departures
    $.each(response.departures, function( index, departure ) {

      // Empty variable to store destination location
      var _destLocation;
      // Empty variable to store origin location
      var _originLocation;
      // Destination ID
      var destId = departure.destination_location_id;
      // Origin ID
      var originId = departure.origin_location_id;

      // Loop through all locations
      $.each(response.locations, function( index, location ) {
        // If the location ID match the destination ID save the destination location
        if (location.id == destId) {
          _destLocation = location;
          return;
        }

        // If the location ID match the origin ID save the origin location
        if (location.id == originId) {
          _originLocation = location;
          return;
        }
      });

      // Clone the .template that will be used for displaying destinations
      var $template = $(".results .template").clone(false, false).removeClass("template");

      // Set the first city name
      $(".departure-city", $template).text(response.cities[0].name);
      // Set the origin location name
      $(".departure-station", $template).text(_originLocation.name);

      // Format date/time to time
      var departureDate = new Date(departure.departure_time);

      // Set the departure time
      $(".departure-time", $template).text(departureDate.toDateString() + " at " + format_time(departureDate));

      // Set the second city name
      $(".arrival-city", $template).text(response.cities[1].name);
      // Set the destination location name
      $(".arrival-station", $template).text(_destLocation.name);

      // Format date/time to time
      var arrivalDate = new Date(departure.arrival_time);
      // Set the arrival time
      $(".arrival-time", $template).text(arrivalDate.toDateString() + " at " + format_time(arrivalDate));

      // Set the price variable
      var price = departure.prices.total;
      // Convert int to string
      var formatedPrice = price.toString();
      // Add a dot to the string before the two character at the end
      var result = formatedPrice.slice(0, -2) + "." + formatedPrice.slice(-2);

      // Set the price and currency
      $(".price", $template).text("$" + result + " " + departure.prices.currency);
      // Set href for buy button
      $(".btn-buy", $template).attr("href", departure.links.deeplink);

      // Append cloned template to list
      $(".results").append($template);
    });
  };


  // Formats a javascript Date object into a 12h AM/PM time string
  function format_time(date_obj) {
    var hour = date_obj.getHours();
    var minute = date_obj.getMinutes();
    var amPM = (hour > 11) ? "pm" : "am";
    if(hour > 12) {
      hour -= 12;
    } else if(hour == 0) {
      hour = "12";
    }
    if(minute < 10) {
      minute = "0" + minute;
    }
    return hour + ":" + minute + amPM;
  }
});
