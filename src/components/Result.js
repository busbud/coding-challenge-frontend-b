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
                
                return (<tr key={ departure.id }>
                    <td className="origin">{ this.getLocation(departure.origin_location_id) }</td>
                    <td className="dest">{ this.getLocation(departure.destination_location_id) }</td>
                    <td className="dep_date">{ departureTime.getFullYear() }-{ (departureTime.getMonth() + 1) }-{ departureTime.getDate() }</td>
                    <td className="dep_time">{ (departureTime.getHours() < 10 ? '0' : '') + departureTime.getHours() }:{ (departureTime.getMinutes() < 10 ? '0' : '') + departureTime.getMinutes() }</td>
                    <td className="arr_date">{ arrivalTime.getFullYear() }-{ (arrivalTime.getMonth() + 1) }-{ arrivalTime.getDate() }</td>
                    <td className="arr_time">{ (arrivalTime.getHours() < 10 ? '0' : '') + arrivalTime.getHours() }:{ (arrivalTime.getMinutes() < 10 ? '0' : '') + arrivalTime.getMinutes() }</td>
                    <td className="class">{ departure.class }</td>
                    <td className="avail_seats">{ departure.available_seats }</td>
                    <td className="operator">{ this.getOperator(departure.operator_id) }</td>
                    <td className="price">${ (departure.prices.total / 100).toFixed(2) }</td>
                </tr>);
            })
        );
    }
}

export default Result;