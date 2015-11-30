var React = require('react');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require("request"));
var languages = require("../languages.js");
var Router = require('react-router');

var GUEST_TOKEN = "GUEST_ZX3fNR26SB-m1MBsyz196g";
var API_URL = 'https://busbud-napi-prod.global.ssl.fastly.net';
var DEPARTURE_URL = "https://napi.busbud.com/x-departures/";

//Search Constants
var DEPARTURE_CITY = "New York";
var ARRIVAL_CITY = "Montreal";
var DATE = "2016-01-14";

//default city values for initial rendering of component
var departureCity = {
    geohash: "dr5reg",
    full_name: "New York, New York, United States"
};

var arrivalCity = {
    geohash: "f25dvk",
    full_name: "Montreal, Quebec, Canada"

};

//function to get a new token if the default token expires
//have not ran into this issue yet, so I am not sure the correct 
//error/response code to check for to implement this function
function getToken() {
    return request.getAsync("https://busbud-napi-prod.global.ssl.fastly.net/auth/guest")
        .then(function(response) {
            var guestToken = (JSON.parse(response.body)).token;
            return guestToken;
        });
}

function getCityInfo(city, language) {
    var options = {
        url: API_URL + "/search?q=" + city + "&lang=" + language,
        headers: {
            'x-busbud-token': GUEST_TOKEN
        }
    };
    return request.getAsync(options)
        .then(function(cityId) {
            return (JSON.parse(cityId.body))[0];
        });
}

var DepartureWrapper = React.createClass({
    render: function() {
        var departure = this.props.departure;
        var locations = this.props.locations;
        var operators = this.props.operators;
        
        var departureTime = departure.departure_time;
        var departureName =  locations[departure.origin_location_id].name
        var departureAddress = locations[departure.origin_location_id].address
        
        var arrivalTime = departure.arrival_time;
        var arrivalName =  locations[departure.destination_location_id].name
        var arrivalAddress = locations[departure.destination_location_id].address
        
        var operator = operators[departure.operator_id]

    return (
        
        <div className="row">
            <div className="results col-md-8 col-xs-12 col-lg-8 col-lg-push-2 col-md-push-2">
                <div className="col-xs-7">
                    <div className="row">
                        <h2>Departure</h2>
                        <hr />
                        <div className="results-column col-xs-4">
                            <p>{departureTime}</p>
                        </div>
                        <div className="results-column col-xs-8">
                            <p>{departureName}
                                <br /> {departureAddress}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <h2>Arrival</h2>
                        <hr />
                        <div className="results-column col-xs-4">
                            <p>{arrivalTime}</p>
                        </div>
                        <div className="results-column col-xs-8">
                            <p> {arrivalName}
                                <br /> {arrivalAddress}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="results-column col-xs-5">
                    <div className="results-column col-xs-12">
                        <h2>Outbound Price</h2>
                        <hr />
                        <p className="price">
                            {departure.prices.total}<span className="currency"> {this.props.currency}</span>
                        </p>
        
                    </div>
                    <div className="results-column col-xs-12">
        
                        <hr />
                        <img src={operator.logo_url} alt="operator image" />
                        <p>
                           {operator.name}
                            <br /> {departure.class}
                           
                        </p>
                    </div>
        
                </div>
            </div>
        </div>
        )
    }
})

var SearchResultsLayout = React.createClass({
           mixins: [Router.State],
            getInitialState: function() {
                return {
                    language: this.getParams().language,
                    departure: this.getParams().departure,
                    arrival: this.getParams().arrival,
                    date: this.getParams().date,
                    searchComplete: false,
                    outbound_departures: [],
                    locations: {},
                    operators: {},
                };
            },
            componentDidMount: function() {
                var self = this
                var url = DEPARTURE_URL + self.state.departure + "/" + self.state.arrival + "/" + self.state.date + "/?lang=" + self.state.language + "/currency=CAD";
                $.get(url, function(response){
                    var locationObject = {}
                    response.locations.map(function(location){
                        return locationObject[location.id] = location
                    })
                    var operatorObject = {}
                    response.operators.map(function(operator){
                        return operatorObject[operator.id] = operator
                    })
                    console.log(operatorObject)
                    console.log(locationObject)
                    if (self.isMounted()){
                        self.setState({
                            arrival: response.cities[0],
                            departure: response.cities[1],
                            locations: locationObject,
                            operators:  operatorObject,
                            outbound_departures: response.outbound_departures,
                            currency: 'CAD'
                        });
                    }
                    
                });
            },
            onClick: function(){
            },
            render: function() {
                var locations
                var operators
                if (this.state.outbound_departures){
                    locations = this.state.locations
                    operators = this.state.operators
                }
                //       var DeparturesArray = [];
                //      for (var departure in this.state.outbound_departures) {
                //          DeparturesArray.push(<Departures key={departure.id} departure={departure} locations={this.state.locations} operators={this.state.operators}/>)
                //      }
                //      console.log(DeparturesArray)
                // }
                // var currentLanguage = languages[this.state.currentLang].name;
                // for (var lang in languages) {
                //     languageArray.push(
                //         <li key={languages[lang].abbr}><a href={"/" + languages[lang].abbr}>{languages[lang].name}</a></li>
                //     );
                // }
            return (
              // Correct :)
// var ListItemWrapper = React.createClass({
//   render: function() {
//     return <li>{this.props.data.text}</li>;
//   }
// });
// var MyComponent = React.createClass({
//   render: function() {
//     return (
//       <ul>
//         {this.props.results.map(function(result) {
//           return <ListItemWrapper key={result.id} data={result}/>;
//         })}
//       </ul>
//     );
//   }
// });
                <section id="search-results">
                <div className="result-header">
                        <div className="row">
                            <div className="col-md-8 col-xs-10 col-lg-8 col-lg-push-2 col-xs-push-1 col-md-push-2">
                                <h4>Results For Your Trip </h4>
                                <h2> {this.state.departure.name} to {this.state.arrival.name} </h2>
                                <h3>{this.state.date}</h3>
                            </div>
                        </div>
                    </div>
                    <div>
                    
                      {this.state.outbound_departures.map(function(departure) {
                           return <DepartureWrapper key={departure.id} departure={departure} locations={locations} operators={operators} currency={'CAD'}/>;
                        })}
                    </div>
                    <div className="row">
                        <div className="results col-md-8 col-xs-12 col-lg-8 col-lg-push-2 col-md-push-2">
                            <div className="col-xs-7">
                                <div className="row">
                                    <h2>Departure</h2>
                                    <hr />
                                    <div className="results-column col-xs-4">
                                        <p>10:45pm</p>
                                    </div>
                                    <div className="results-column col-xs-8">
                                        <p>Montreal Bus Statation
                                            <br /> full address, H$4H5v
                                            <br />Montral Quebec
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <h2>Arrival</h2>
                                    <hr />
                                    <div className="results-column col-xs-4">
                                        <p>1:45am</p>
                                    </div>
                                    <div className="results-column col-xs-8">
                                        <p>NEW YORK CITY
                                            <br /> full address, H$4H5v
                                            <br />Montral Quebec
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="results-column col-xs-5">
                                <div className="results-column col-xs-12">
                                    <h2>Outbound Price</h2>
                                    <hr />
                                    <p className="price">
                                        $205.00<span className="currency"> CAD</span>
                                    </p>
                
                                </div>
                                <div className="results-column col-xs-12">
                
                                    <hr />
                                    <p>
                                        Image Logo
                                        <br />
                                        <br /> Economy
                                    </p>
                                </div>
                
                            </div>
                        </div>
                    </div>
            </section>
            );
        }
});

module.exports = SearchResultsLayout;