import { connect } from 'react-redux';
import { fetchSchedule } from '../actions';
import App from '../components/App';
import _ from 'lodash';

const mapStateToProps = state => {
  const departures = state.search.schedule.departures;
  _.forEach(departures, departure => {
    departure.operator = _.find(state.search.schedule.operators, operator =>
      operator.id === departure.operator_id
    );
    departure.origLocation = _.find(state.search.schedule.locations, location =>
      location.id === departure.origin_location_id
    );
    departure.origCity = _.find(state.search.schedule.cities, city =>
      city.id === departure.origLocation.city_id
    );
    departure.destLocation = _.find(state.search.schedule.locations, location =>
      location.id === departure.destination_location_id
    );
    departure.destCity = _.find(state.search.schedule.cities, city =>
      city.id === departure.destLocation.city_id
    );
  });
  return {
    isFetching: state.search.isFetching,
    departures,
    searchFailed: state.search.searchFailed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(fetchSchedule());
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
