import React, { Component } from 'react';

class Result extends Component {
    getLocation(locationID) {
        let locations = this.props.locations;
        let locationsArray = locations.reduce((rLocations, obj) => {
            rLocations[obj.id] = obj.city_id;
            return rLocations;
        }, {});

        return this.getCity(locationsArray[locationID]);
    }

    getOperator(operatorID) {
        let operators = this.props.operators;
        let operatorsArray = operators.reduce((rOperators, obj) => {
            rOperators[obj.id] = obj.name;
            return rOperators;
        }, {});

        return operatorsArray[operatorID];
    }

    getCity(cityID) {
        let cities = this.props.cities;
        let citiesArray = cities.reduce((rCities, obj) => {
            rCities[obj.id] = obj.name;
            return rCities;
        }, {});

        return citiesArray[cityID];
    }

    render() {
        const departures = this.props.departures;

        return (
            departures.map((departure, index) => {
                const departureTime = new Date(departure.departure_time);
                const arrivalTime = new Date(departure.arrival_time);
                
                return (
                    <div key={ departure.id } className="results__entry">
                        <div className="entry__locations">
                            <div className="entry__departure">
                                <p>{ departureTime.getFullYear() }-{ (departureTime.getMonth() + 1) }-{ departureTime.getDate() }</p>
                                <p>{ (departureTime.getHours() < 10 ? '0' : '') + departureTime.getHours() }:{ (departureTime.getMinutes() < 10 ? '0' : '') + departureTime.getMinutes() }</p>
                                <p>{ this.getLocation(departure.origin_location_id) }</p>
                            </div>
                            <div className="entry__arrival">
                                <p>{ arrivalTime.getFullYear() }-{ (arrivalTime.getMonth() + 1) }-{ arrivalTime.getDate() }</p>
                                <p>{ (arrivalTime.getHours() < 10 ? '0' : '') + arrivalTime.getHours() }:{ (arrivalTime.getMinutes() < 10 ? '0' : '') + arrivalTime.getMinutes() }</p>
                                <p>{ this.getLocation(departure.destination_location_id) }</p>
                            </div>
                        </div>
                        <div className="entry__details">
                            <div className="entry__operator">
                                <p>{ this.getOperator(departure.operator_id) }</p>
                            </div>
                            <div className="entry__price">
                                <p className="seats">Seats Available: { departure.available_seats }</p>
                                <p className="ticket_price">${ (departure.prices.total / 100).toFixed(2) }</p>
                            </div>
                        </div>
                    </div>
                );
            })
        );
    }
}

export default Result;