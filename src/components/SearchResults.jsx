var React = require('react');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require("request"));
var languages = require("../languages.js");
var Router = require('react-router');

var DEPARTURE_URL = "https://napi.busbud.com/x-departures/";
var ACCEPT_HEADER = "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/";
var GUEST_TOKEN = "GUEST_ZX3fNR26SB-m1MBsyz196g";

function formatTime(time, currentLanguage){
    var hour = Number(time.substring(0, time.indexOf(":")));
    var minute = Number(time.substring(time.indexOf(":") + 1, time.lastIndexOf(":")));
    var am = " AM";
    
    if (minute < 10) {
        minute = "0" + minute; 
    }
    if (currentLanguage === 'fr') {
        if (hour < 10) {
            hour = "0" + hour;
        }
        var formattedTime = hour + ":" + minute;
    }
    else {
        if (hour >=12){
            am = " PM";
        }
        if (hour < 1) {
            hour = 12;
        }
        if (hour > 12) {
        hour = hour - 12;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        formattedTime = hour + ":" + minute + am;
    }
    return formattedTime;
}


    
function getDepartures(url, operatorObject, locationObject, departureArray, cities, params, querys) {
    var options = {
        url: url,
        headers: {
            'Accept': ACCEPT_HEADER,
            'x-busbud-token': GUEST_TOKEN,
            'Cache-Control': 'no-cache'
        }
    };
    return request.getAsync(options)
                    .then(function(body){
                        var response = JSON.parse(body.body)
                if (response.cities) {
                    cities.departure = response.cities[0];
                    cities.arrival = response.cities[1];
                    response.locations.map(function(location) {
                        locationObject[location.id] = location;
                    });
                }

                response.operators.map(function(operator) {
                    operatorObject[operator.id] = operator;
                });
                response.departures.map(function(departure) {
                    departureArray.push(departure);
                });
 
                if (!response.complete) {
                    var index = departureArray.length;

                    var pollUrl = DEPARTURE_URL + params + "/poll" + querys + "&index=" + index;

                    return getDepartures(pollUrl, operatorObject, locationObject, departureArray, cities, params, querys);
                  
                    
                }
                else {

                    return {
                        operators: operatorObject,
                        locations: locationObject,
                        departures: departureArray,
                        cities: cities
                    };
                }
            });
    }

    
var ResultHeaderWrapper = React.createClass({
    render: function(){
        var lang = this.props.lang;
        var _h2 = lang.loading;
        var _h4 = lang.thankyou;
        var _h3 = "";
        if (this.props.departure) {
            _h4 = lang.trip;
            _h2 = this.props.departure.name + ' ' + lang.to + " " + this.props.arrival.name;
            _h3 = this.props.date;
        }
        return (
             <div className="result-header">
                 <div className="row">
                     <div className="col-md-8 col-xs-10 col-lg-8 col-lg-push-2 col-xs-push-1 col-md-push-2">
                         <h4>{_h4} </h4>
                         <h2> {_h2} </h2>
                         <h3>{_h3}</h3>
                     </div>
                 </div>
             </div>
        );
    }
});


var DepartureWrapper = React.createClass({
    render: function() {
        var departure = this.props.departure;
        var locations = this.props.locations;
        var operators = this.props.operators;
        var lang = this.props.lang;

        var departureInfo = departure.departure_time;
        var departureDate = departureInfo.substring(0, departureInfo.indexOf("T"));
        var departureTime = departureInfo.substring(departureInfo.indexOf("T") + 1);
        var departureName =  locations[departure.origin_location_id].name;
        var departureAddress = locations[departure.origin_location_id].address;
        var departureTimeFormatted = formatTime(departureTime, lang.abbr);
        
        var arrivalInfo = departure.arrival_time;
        var arrivalDate = arrivalInfo.substring(0, arrivalInfo.indexOf("T"));
        var arrivalTime = arrivalInfo.substring(arrivalInfo.indexOf("T") + 1);
        var arrivalName =  locations[departure.destination_location_id].name;
        var arrivalAddress = locations[departure.destination_location_id].address;
        var arrivalTimeFormatted = formatTime(arrivalTime, lang.abbr);
        
        var price = (departure.prices.total/10).toFixed(2);
        
        var operator = operators[departure.operator_id];

    return (
        <div className="row resultsRow">
            <div className="results col-xs-12 col-sm-10 col-sm-push-1 col-md-8 col-md-push-2 col-lg-10 col-lg-push-1">
                <div className="col-lg-8 col-sm-8 col-xs-12">
                    <div className="col-lg-12">
                        <h2>{lang.departure}</h2>
                        <hr />
                        <div className="results-column col-sm-4 col-lg-3">
                            <p><strong>{departureTimeFormatted}</strong>
                                <br/> {departureDate}
                            </p>
                        </div>
                        <div className="results-column col-sm-8 col-lg-9">
                            <ul className="departureAddress">
                                <li><strong>{departureName}</strong></li>
        
                                { departureAddress.map(function(address){ 
                                
                                return <li key={address}> {address} </li>;
                                
                                } ) }
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <h2>{lang.arrival}</h2>
                        <hr />
                        <div className="results-column col-sm-4 col-lg-3">
                            <p><strong>{arrivalTimeFormatted}</strong>
                                <br/> {arrivalDate}
                            </p>
                        </div>
                        <div className="results-column col-sm-8 col-lg-9">
                            <ul className="departureAddress">
                                <li><strong>{arrivalName}</strong></li>
                                { arrivalAddress.map(function(address){ 
                                return <li key={address}> {address} </li>
                                } ) }
                            </ul>
                        </div>
                    </div>
                </div>
        
                <div className="results-column col-sm-4 col-lg-4 col-xs-12">
                    <div className='row priceRow'>
                        <div className="results-column col-lg-12">
                            <p className="price text-center">
                                {price}<span className="currency"> {this.props.currency}</span>
                            </p>
                        </div>
                        <div className="results-column col-sm-8 col-sm-push-2 col-xs-4 col-xs-push-4 col-lg-8 col-lg-push-2">
        
                            <img className="operatorLogo" src={operator.logo_url} alt="operator image" />
                            <p className="text-center">
                                {operator.name}
                                <br /> {departure.class}
        
                            </p>
                        </div>
                    </div>
        
                </div>
        
            </div>
        </div>

        );
    }
});

var SearchResultsLayout = React.createClass({
           mixins: [Router.State],
            getInitialState: function() {
                return {
                    language: this.getParams().language,
                    departure: this.getParams().departure,
                    arrival: this.getParams().arrival,
                    date: this.getParams().date,
                    adults: this.getParams().adults,
                    searchComplete: false,
                    outbound_departures: []
                };
            },
            componentDidMount: function() {
                var self = this;
                var operatorObject = {};
                var locationObject = {};
                var departureArray = [];
                var cities = {};
                var params = self.state.departure + "/" + self.state.arrival + "/" + self.state.date;
                var querys = "/?lang=" + self.state.language + "&currency=CAD&adult=" + self.state.adults;
                var url = DEPARTURE_URL + params + querys;
                getDepartures(url, operatorObject, locationObject, departureArray, cities, params, querys)
                .then(function(response){

                    if (self.isMounted()){
                        self.setState({
                            departure: response.cities.departure,
                            arrival: response.cities.arrival,
                            locations: response.locations,
                            operators:  response.operators,
                            outbound_departures: response.departures,
                            currency: 'CAD'
                        });
                    }
                });
                
                    
                    
                    
                    
                    
                    
                    
            },
            render: function() {
                var locations;
                var operators;
                var lang = languages[this.state.language];
                var ResultHeader = <ResultHeaderWrapper date={this.state.date} lang={lang}/>;
                if (this.state.outbound_departures.length){
                    ResultHeader = <ResultHeaderWrapper date={this.state.date} lang={lang} arrival={this.state.arrival} departure={this.state.departure} />;
                    locations = this.state.locations;
                    operators = this.state.operators;
                }
 
            return (
                <section id="search-results">
                   
                    {ResultHeader}
                    
                    <div>
                        {this.state.outbound_departures.map(function(departure) {
                           return <DepartureWrapper key={departure.id} lang={lang} departure={departure} locations={locations} operators={operators} currency={'CAD'}/>;
                        })}
                    </div>
                    
                </section>
            );
        }
});

module.exports = SearchResultsLayout;