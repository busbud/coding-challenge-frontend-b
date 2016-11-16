import React from 'react';

export default class Departure extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            arrivalTime: this.props.departure.arrival_time,
            departureTime: this.props.departure.departure_time,
            departurePrice: this.props.departure.prices.total,
            departureTime: new Date(this.props.departure.departure_time),
            arrivalTime: new Date(this.props.departure.arrival_time),
            destination: this.props.locations.filter(location => {
                return location.id == this.props.departure.destination_location_id;
            })[0],
            origin: this.props.locations.filter(location => {
                return location.id == this.props.departure.origin_location_id;
            })[0],
            operator: this.props.operators.filter(operator => {
                return operator.id == this.props.departure.operator_id;
            })[0],
            originCity: this.props.cities[0],
            destinationCity: this.props.cities[1]

        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <div className="row">
                        <table className="table table-bordered col-middle">
                            <tbody>
                                <tr>
                                    <td className="departureTime">{this.formatAMPM(this.state.departureTime)}</td>
                                    <td className="departureLocation">
                                      <div>{this.state.origin.name}</div>
                                      <div className="cityName">{this.state.originCity.name}</div>
                                    </td>
                                    <td className="departureOperator" rowSpan="2">
                                        <img src={this.state.operator.logo_url} className="img-responsive operatorImage vertical-align:middle" alt="Operator"></img>
                                        <div className="text-center">{this.props.departure.class}</div>
                                    </td>
                                    <td className="departurePrice" rowSpan="2">${this.state.departurePrice} {this.props.currency}</td>
                                </tr>
                                <tr>
                                    <td className="departureTime">{this.formatAMPM(this.state.arrivalTime)}</td>
                                    <td className="departureLocation">
                                      <div>{this.state.destination.name}</div>
                                      <div  className="cityName">{this.state.destinationCity.name}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }

    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12
            ? 'pm'
            : 'am';
        hours = hours % 12;
        hours = hours
            ? hours
            : 12; // the hour '0' should be '12'
        minutes = minutes < 10
            ? '0' + minutes
            : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

}
