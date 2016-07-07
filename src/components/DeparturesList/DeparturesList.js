import React, { PropTypes } from 'react';
import DepartureContainer from '../Departure/DepartureContainer';
import Loader from '../Loader/Loader';
import _ from 'lodash';

import './DeparturesList.scss';

class DeparturesList extends React.Component {
  constructor(props) {
    super(props);
  }
  getSortedDepartures(departures, sort) {
    //return an empty array if there are no departures
    if (!departures || !departures.length) {
      return [];
    }

    try {
      //sort depending on the sort type
      switch (sort) {
        case 'departureDate': 
          //order by dateDeparture ASC
          return _.orderBy(departures, 'display.departure_time');
        case 'price': 
          //order by price ASC
          return _.orderBy(departures, 'display.price');
        case 'company': 
          //order by operator's name ASC
          return _.orderBy(departures, 'display.operator.display_name');
        default:
        return departures;
      }
    } catch(err) {
      //in case of error (if we were not able to get all necessary parameters, just return the original array)
      return departures;
    }

  }
  render() {
    const { isFetching, data, sort } = this.props;

    //get sorted departures
    let departures = this.getSortedDepartures(data.departures, sort);

    return (
      <div className="departures-list">
        {departures.map((departure) => {
            return <DepartureContainer key={departure.id} departure={departure.display} />;
        })}
        {isFetching ? <Loader /> : null }
      </div>
    );
  }
}

DeparturesList.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    sort: PropTypes.string.isRequired
};

export default DeparturesList;