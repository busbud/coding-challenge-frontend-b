import React from 'react';
import PropTypes from 'prop-types';
import DepartureResult from './DepartureResult';
import './DepartureResults.scss';

const DepartureResults = props => (
    <div className='departure-results'>
        {props.departures.map(departure => (
            <DepartureResult 
                key={departure.id}
                departure={departure} 
                locations={props.locations}
                city={props.city} />
        ))}
    </div>
);

DepartureResults.propTypes = {
    departures: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired,
    city: PropTypes.object.isRequired,
};

export default DepartureResults;
