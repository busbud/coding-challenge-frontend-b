import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import DepartureResult from './DepartureResult';
import './DepartureResults.scss';

const DepartureResults = props => (
    <div className='departure-results'>
        <Grid container spacing={24}>
            {props.departures.map(departure => (
                <Grid item xs={12} key={departure.id}>
                    <DepartureResult 
                        departure={departure} 
                        locations={props.locations}
                        city={props.city} />
                </Grid>
            ))}
        </Grid>
    </div>
);

DepartureResults.propTypes = {
    departures: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired,
    city: PropTypes.object.isRequired,
};

export default DepartureResults;
