import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import Departure from './Departure';

const DeparturesList = ({ departures }) => {
  return (
    <div className="App-body">
      {map(departureInfo => <Departure {...departureInfo} />, departures)}
    </div>
  );
};

DeparturesList.propTypes = {
  departures: PropTypes.arrayOf(PropTypes.object),
};

DeparturesList.defaultProps = {
  departures: [],
};

export default DeparturesList;
