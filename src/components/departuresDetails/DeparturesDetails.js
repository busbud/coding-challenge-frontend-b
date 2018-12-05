import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import './DeparturesDetails.scss';

const DeparturesDetails = props => {
    const displayTime = (time) => {
        return moment(time).format('hh:mm')
    }

    return (
        <div className="DepartureDetails">
            <Paper className="container">
                <div className="departure">
                    <div>{displayTime(props.departure.departure_time)}</div>
                    <div>{props.originLocation.name}</div>
                </div>
                <div className="bus">🚌</div>
                <div className="destination">
                    <div>{displayTime(props.departure.arrival_time)}</div>
                    <div>{props.destinationLocation.name}</div>
                </div>
                <div className="price">
                    <div className="passenger">1 passenger</div>

                    <Button variant="contained">
                        {props.departure.prices.total}
                    </Button>
                </div>

            </Paper>
        </div>
    )
}

DeparturesDetails.propTypes = {
    departure: PropTypes.shape({
        departure_time: PropTypes.string,
        arrival_time: PropTypes.string,
        prices: PropTypes.shape({
            total: PropTypes.number
        }),
    }).isRequired,
    originLocation: PropTypes.shape({
        name: PropTypes.string
    }).isRequired,
    destinationLocation: PropTypes.shape({
        name: PropTypes.string
    }).isRequired
}

export default DeparturesDetails;