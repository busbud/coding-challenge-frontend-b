import React, { PropTypes } from 'react';
import Departure from '../Departure/Departure';
import './DeparturesList.scss';

class DeparturesList extends React.Component {
  constructor(props) {
    super(props);
  }
  getHydratedFilteredDepartures(data) {
    let departures = [];
    if (data && data.departures) {
        data.departures.map((departure) => {
            //@TODO: filter & order

            let hydratedDeparture = Object.assign({}, departure, {
                //@TODO: hydrate
            });

            departures.push(hydratedDeparture);
        });  
    }
    return departures;
  }
  render() {

    const { isFetching, data } = this.props;

    let hydratedFilteredDepartures = this.getHydratedFilteredDepartures(data);

    return (
      <div className="departures-list">
        {isFetching ? 'loading' : ''}
        {hydratedFilteredDepartures.map((departure) => {
            return <Departure key={departure.id} departure={departure} />;
        })}
      </div>
    );
  }
}

DeparturesList.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.object
};

export default DeparturesList;