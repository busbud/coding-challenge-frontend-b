var React = require('react');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require("request"));
var languages = require("../languages.js");
var Router = require('react-router');
var router = require('../routes.jsx');

var GUEST_TOKEN = "GUEST_ofyd3W7JSEK15rrKBcvD7w";
var API_URL = 'https://busbud-napi-prod.global.ssl.fastly.net';


//Search Constants
var DEPARTURE_CITY = "New York";
var ARRIVAL_CITY = "Montreal";
var DATE = "2016-01-14";



// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}


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

//function to get the json data for the cities
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

//function to make the requests for the departure and arrival cities
function getCities(lang) {
    var city = {};
    return getCityInfo(DEPARTURE_CITY, lang)
        .then(function(departure) {
            city.departure = departure;
            return getCityInfo(ARRIVAL_CITY, lang);
        }).then(function(arrival) {
            city.arrival = arrival;
            return city;
        });
}


var SearchLayout = React.createClass({
            
            mixins: [Router.State],
            
            getInitialState: function() {
                var language = this.getParams().language;
                if (!language) {
                    language = "en";
                }

                return {
                    
                    currentLanguage: language,
                    date: DATE,
                    arrival: "",
                    departure: "",
                    notLoaded: true
                };
            },
            componentDidMount: function() {
                var self = this;
                getCities(self.state.currentLanguage)
                    .then(function(city) {
                        if (self.isMounted()) {
                            self.setState({
                                arrival: city.arrival,
                                departure: city.departure,
                                notLoaded: false
                            });
                        }
                    });

            },
            onClick: function() {
                var self = this.state;
                var passengers = $("#adults").val();
                document.location = self.currentLanguage + '/schedules/' + self.departure.geohash + '/' + self.arrival.geohash + '/' + self.date + "/" + passengers;

            },
            render: function() {

                var currentLanguage = languages[this.state.currentLanguage];

                return (
                    <section id="search-menu">
                        <div className="row">
                            <div className="col-lg-10 col-lg-push-1 col-sm-10 col-sm-push-1">
                                <div className="search-form">
                                <div className="row">
                                    <div className="col-md-10 col-md-push-1 col-sm-12 col-xs-12 col-lg-10 col-lg-push-1">
                                        <strong className="slogan">{currentLanguage.header}</strong>
                                            <hr />
                                            <div className="row location">
                                                <form>
                                                    <div className="form-group">
                                                        <div className="col-lg-6 col-sm-6 col-xs-12">
                                                            <label htmlFor="departure">{currentLanguage.leaving}</label>
                                                            <div className="input-group"><span id="mapIcon" className="input-group-addon"><span className="glyphicon glyphicon-map-marker"></span></span>
                                                                <input type="text" aria-describedby="mapIcon" id="departure" placeholder={currentLanguage.selectCity} data-departure-geohash={this.state.departure.geohash} value={this.state.departure.full_name} className="form-control" disabled />
                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-lg-6 col-sm-6 col-xs-12">
                                                            <label htmlFor="arrival">{currentLanguage.going}</label>
                                                            <div className="input-group"><span id="mapIcon" className="input-group-addon"><span className="glyphicon glyphicon-map-marker"></span></span>
                                                                <input type="text" id="arrival" placeholder={currentLanguage.selectCity} data-arrival-geohash={this.state.arrival.geohash} value={this.state.arrival.full_name} className="form-control" disabled />
                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="row route">
                                                <div className="form-group">
                                                    <div className="col-lg-6 col-sm-5 col-xs-12">
                                                        <label>{currentLanguage.date}</label>
                                                        <div className="input-group"><span id="calIcon" className="input-group-addon"><span className="glyphicon glyphicon-calendar"></span></span>
                                                            <input type="text" id="departureDate" placeholder="Date" value={this.state.date} className="form-control" disabled />
                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-lg-6 col-sm-7 col-xs-12">
                                                        <div className="radio">
                                                            <label></label>
                                                            <label className="tripSegment">
                                                                <input type="radio" name="tripSegment" id="oneWay" value="OneWay" checked readOnly /> {currentLanguage.oneWay}
                                                            </label>
                                                            <label className="tripSegment">
                                                                <input type="radio" name="tripSegment" id="roundTrip" value="roundTrip" disabled /> {currentLanguage.round}
                            
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row passengers">
                                                <div className="form-group">
                                                    <div className="col-lg-2 col-sm-3 passenger">
                                                        <label>{currentLanguage.adults}</label>
                                                        <div className="input-group"><span id="userIcon" className="input-group-addon"><span className="glyphicon glyphicon-user"></span></span>
                                                            <select id="adults" className="form-control" defaultValue="1" disabled>
                                                                <option value="0">0</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-sm-3 passenger">
                                                        <label>{currentLanguage.children}</label>
                                                        <div className="input-group"><span id="userIcon" className="input-group-addon"><span className="glyphicon glyphicon-user"></span></span>
                                                            <select className="form-control" defaultValue="0" disabled>
                                                                <option value="0">0</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-sm-3 passenger">
                                                        <label>{currentLanguage.seniors}</label>
                                                        <div className="input-group"><span id="userIcon" className="input-group-addon"><span className="glyphicon glyphicon-user"></span></span>
                                                            <select className="form-control" defaultValue="0" disabled>
                                                                <option value="0">0</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row searchRow">
                                                <div className="col-lg-12">
                            
                                                    <button onClick={this.onClick} className="btn btn-primary" disabled={this.state.notLoaded}>{currentLanguage.search}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            }
});

module.exports = SearchLayout;