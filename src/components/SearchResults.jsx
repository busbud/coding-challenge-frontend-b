var React = require('react');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require("request"));
var languages = require("../languages.js");

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


var SearchResultsLayout = React.createClass({
            getInitialState: function() {
                return {
                };
            },
            componentDidMount: function() {
                var url = DEPARTURE_URL + this.props.departure.geohash + "/" + this.props.arrival.geohash + "/" + this.props.date + "/?lang=" + this.props.langAbbr;
                $.get(url, function(response){
                    console.log(response);
                    
                });
            },
            onClick: function(){
            },
            render: function() {
                    
            return (
                <section id="search-results">
                <div className="result-header">
                        <div className="row">
                            <div className="col-md-8 col-xs-10 col-lg-8 col-lg-push-2 col-xs-push-1 col-md-push-2">
                                <h4>Results For Your Trip </h4>
                                <h2> ____ to _____ </h2>
                                <h3>January 14, 2016</h3>
                            </div>
                        </div>
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