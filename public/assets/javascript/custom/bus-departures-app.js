/**
 * Bus Departures App
 *
 */
(function() {
  'use strict';
  var app = angular
    .module('DeparturesApp', []);
}).call(this);

/**
 * Services
 *
 */
(function() {
  'use strict';
  angular.module('DeparturesApp').factory('departuresServices', ['$http', '$rootScope', function($http, $rootScope) {
    var fact = {};
    fact.getToken = function() {
      $http({
        method: 'GET',
        url: '/getToken'
      }).then(function successCallback(response) {
          var data = response.data;
          $rootScope.$broadcast('getToken', data);
      }, function errorCallback(response) {
        $rootScope.$broadcast('getError', response);
      });
    };

    fact.getDepartures = function(query, parameters, token) {
    	$http({
			  method: 'GET',
			  url: 'https://napi.busbud.com/x-departures/'+query.origin+'/'+query.destination+'/'+query.date,
				params: parameters,
				headers: {
			  	'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
					'x-busbud-token': token
				}
			}).then(function successCallback(response) {
			    var data = response.data;
			    if(data.complete) $rootScope.$broadcast('getDepartures', data);
					else fact.pollSearch(query, parameters, data, token);
			}, function errorCallback(response) {
				$rootScope.$broadcast('getError', response);
		  });
    };

    fact.pollSearch = function(query, parameters, previousData, token) {
    	parameters.index = 0; //fixme, not sure of how to init it
    	$http({
			  method: 'GET',
			  url: 'https://napi.busbud.com/x-departures/'+query.origin+'/'+query.destination+'/'+query.date+'/poll',
				params: parameters,
				headers: {
			  	'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
					'x-busbud-token': token
				}
			}).then(function successCallback(response) {
			    var data = response.data;
			    if(data.complete) {
			    	previousData.departures = data.departures;
			    	previousData.operators = data.operators;
			    	$rootScope.$broadcast('getDepartures', previousData);
					} else fact.pollSearch(query, parameters, previousData, token);
			}, function errorCallback(response) {
				$rootScope.$broadcast('getError', response);
		  });
    };

    return fact;
  }]);
}).call(this);

/**
 * Main Controller
 *
 */
(function() {
  'use strict';
  angular.module('DeparturesApp').controller('departuresController', ['$scope', 'departuresServices',
    function($scope, departuresServices) {
      var token = '';
      $scope.orderby = { comparator: 'departure_time' };
      departuresServices.getToken();

    	$scope.seeDepartures = function() {
    		//For dynamic values we could use inputs with ng-model
    		//fixme, parameters seem to have no effect
    		$scope.wait = true;
    		var query = {
    					origin: 'dr5reg', //NYC
    		  		destination: 'f25dvk', //Montreal
    		  		date: '2017-07-29'
    				},
    				parameters = {
							adult: 1,
							child: 0,
							senior: 0,
							lang: 'en',
							currency: 'USD'
						};
    		departuresServices.getDepartures(query, parameters, token);
    	};

      $scope.$on('getToken', function(event, data) {
        token = data;
      });

      $scope.$on('getError', function(event, data) {
        $scope.wait = false;
        console.error('Error callback', data);
        alert('Sorry an error occured, please try again.');
      });

    	$scope.$on('getDepartures', function(event, data) {
    		$scope.departures = [];
    		data.departures.map(function(departure){
    			var cleanedDeparture = {},
    					originLocation,
    					destinationLocation,
    				  operatorData;
    			//get departure time
    			cleanedDeparture.departure_time = departure.departure_time;
    			//get arrival time
    			cleanedDeparture.arrival_time = departure.arrival_time;
    			//get origin location
    			originLocation = data.locations.filter(function(location){
    				return departure.origin_location_id === location.id;
    			})[0];
    			cleanedDeparture.origin_location = originLocation.name;
    			//get destination location
    			destinationLocation = data.locations.filter(function(location){
    				return departure.destination_location_id === location.id;
    			})[0];
    			cleanedDeparture.destination_location = destinationLocation.name;
    			//get origin and destination cities
    			data.cities.map(function(city){
    				if(originLocation.city_id === city.id) cleanedDeparture.origin_city = city.name;
    				else if(destinationLocation.city_id === city.id) cleanedDeparture.destination_city = city.name;
    			});
    			//get operators logo and name
    			operatorData = data.operators.filter(function(operator){
    				return departure.operator_id === operator.id;
    			})[0];
    			cleanedDeparture.operator = {
    				name: operatorData.name,
    				logo_url: operatorData.logo_url
    			};
    			cleanedDeparture.price = departure.prices.total;
    			$scope.departures.push(cleanedDeparture);
    		});
    		$scope.ready = true;
    		$scope.wait = false;
    	});
    }
  ]);
}).call(this);
