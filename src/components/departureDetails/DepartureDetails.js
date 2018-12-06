import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import './DepartureDetails.scss';

const DepartureDetails = props => {
    const displayTime = (time) => {
        return moment(time).format('hh:mm A')
    }

    return (
        <div className="DepartureDetails">
            <Paper className="container">
                <div className="departure">
                    <div className="time">{displayTime(props.departure.departure_time)}</div>
                    <div className="city">{props.departure_city} - </div>
                    <div className="origin-location">{props.originLocation.name}</div>
                </div>
                <div className="bus">🚌</div>
                <div className="destination">
                    <div className="time">{displayTime(props.departure.arrival_time)}</div>
                    <div className="city">{props.arrival_city} -</div>                    
                    <div className="destination-location">{props.destinationLocation.name}</div>
                </div>
                <div className="price">
                    <div className="passenger">1 passenger</div>
                    <div className="total"> {props.departure.prices.total}  {props.departure.prices.currency}</div>
                </div>
            </Paper>
        </div>
    )
}

DepartureDetails.propTypes = {
    departure: PropTypes.shape({
        departure_time: PropTypes.string,
        arrival_time: PropTypes.string,
        prices: PropTypes.shape({
            total: PropTypes.number,
            currency: PropTypes.string
        }).isRequired,
    }).isRequired,
    departure_city: PropTypes.string.isRequired,
    arrival_city: PropTypes.string.isRequired,
    originLocation: PropTypes.shape({
        name: PropTypes.string
    }).isRequired,
    destinationLocation: PropTypes.shape({
        name: PropTypes.string
    }).isRequired
}

export default DepartureDetails;