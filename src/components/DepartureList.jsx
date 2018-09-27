import React from 'react';
import PropTypes from 'prop-types';

import DepartureItem from './DepartureItem';

import './styles/DepartureList.scss';

function DepartureList({ departures }) {
  return (
    <div className="DepartureList">
      {departures.map(departure => <DepartureItem key={departure.id} departure={departure} />)}
    </div>
  );
}

DepartureList.propTypes = {
  departures: PropTypes.array,
};

DepartureList.defaultProps = {
  departures: [],
};

export default DepartureList;
