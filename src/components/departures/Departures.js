import React, { Fragment } from 'react';
import DepartureDetails from '../departuresDetails/DeparturesDetails';
import { connect } from 'react-redux';

import './Departures.scss';

export const Departures = (props) => {
    return (
        <div className="Departures">
            {props.departures.map((departure, index) => {
                return (
                    <DepartureDetails
                        key={index}
                        departure={departure}
                        originLocation={props.locations[departure.origin_location_id]}
                        destinationLocation={props.locations[departure.destination_location_id]}
                    />
                )
            })}
        </div>
    )
}

const mapStateToProps = state => ({
    departures: state.departures,
    locations: state.locations
});
export default connect(mapStateToProps)(Departures);