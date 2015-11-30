var React = require('react');
var ReactDOM = require('react-dom');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require("request"));
var languages = require("../languages.js");
var SearchResultsLayout = React.createFactory(require('./SearchResults.jsx'));
var Router = require('react-router');
// var history = require('react-router').History
var router = require('../routes.jsx');

var GUEST_TOKEN = "GUEST_ZX3fNR26SB-m1MBsyz196g";
var API_URL = 'https://busbud-napi-prod.global.ssl.fastly.net';


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
            // contextTypes: {
            //     router: React.PropTypes.object
            //   },
            getInitialState: function() {
                var language =  this.getParams().language
                if  (!language){
                    language = "en"
                }
                // console.log(language)
                return {
                    // currentLanguage: 'en',
                    currentLanguage: language,
                    date: DATE,
                    arrival: "",
                    departure: ""
                };
            },
            componentDidMount: function() {
                var self = this;
                

                getCities(self.state.currentLanguage)
                    .then(function(city) {
                        if (self.isMounted()){
                            self.setState({
                                arrival: city.arrival,
                                departure: city.departure
                            });
                        }
                    });
                
            },
            onClick: function(){
                var language = languages[this.props.currentLang];
                var self = this.state;
                var props = {
                    language: this.state.currentLang,
                    arrival: this.state.arrival,
                    departure: this.state.departure,
                    date: this.state.date
                }
                
                $(document.getElementById("props")).dangerouslySetInnerHTML={__html: 'var APP_PROPS = ' + safeStringify(props)} 
                document.location = this.state.currentLanguage + '/schedules/' + self.departure.geohash + '/' + self.arrival.geohash + '/' + self.date 

                
                
                
                
                
                
            },
            render: function() {
                // console.log(this.props.language)
                    var currentLanguage = languages[this.state.currentLanguage];
                    // console.log(currentLanguage)
            return (
                <section id="search-menu">
                    
                
                    <div className="main-column row">
                        <div className="column large-8 large-push-2">
                            <div className="search-form"><strong className="slogan">{currentLanguage.header}</strong>
                                <hr />
                                <div className="row location">
                                    <form>
                                        <div className="form-group">
                                            <div className="col-lg-6">
                                                <label htmlFor="departure">{currentLanguage.leaving}</label>
                                                <div className="input-group"><span id="mapIcon" className="input-group-addon"><span className="glyphicon glyphicon-map-marker"></span></span>
                                                    <input type="text" aria-describedby="mapIcon" id="departure" placeholder={currentLanguage.selectCity} data-departure-geohash={this.state.departure.geohash} value={this.state.departure.full_name} className="form-control" disabled />
                
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-lg-6">
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
                                        <div className="col-lg-6">
                                            <label>{currentLanguage.date}</label>
                                            <div className="input-group"><span id="calIcon" className="input-group-addon"><span className="glyphicon glyphicon-calendar"></span></span>
                                                <input type="text" id="departureDate" placeholder="Date" value={this.state.date} className="form-control" disabled />
                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-lg-6">
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
                                        <div className="col-lg-2">
                                            <label>{currentLanguage.adults}</label>
                                            <div className="input-group"><span id="userIcon" className="input-group-addon"><span className="glyphicon glyphicon-user"></span></span>
                                                <select className="form-control" defaultValue="1" disabled>
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
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
                                        <div className="col-lg-2">
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
                            
                                        <button onClick={this.onClick} className="btn btn-primary">{currentLanguage.search}</button>
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