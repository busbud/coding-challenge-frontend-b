import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDepartures, clearDepartures } from '../modules/departures';
import Departure from './departure';

class SearchResults extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      lang : this._parseLang(props),
      date : this.props.date
    };

    this._initialQuery();
  }

  _initialQuery () {
    if (!this.state.date || !moment(this.state.date).isAfter(new Date())) {
      return;
    }
    let fetchAction = getDepartures('dr5reg', 'f25dvk', this.state.date, {
      lang : this.state.lang,
      currency : 'CAD'
    });

    this.props.dispatch(fetchAction);
  }

  _parseLang (props) {
    if (!props.match.params.lang) return '';
    return props.match.params.lang.split('-')[0].toUpperCase();
  }

  componentWillReceiveProps (nextProps) {
    let lang = this._parseLang(nextProps);
    let changed = false;

    if (lang !== this.state.lang) {
      changed = true;
    }

    if (nextProps.departures.date !== this.state.date) {
      changed = true;
    }

    if (changed) {
      this.setState({
        lang,
        date : nextProps.departures.date
      }, () => {
        this._initialQuery();
      });
    }
  }

  getCity (id) {
    let cities = this.props.cities.results;
    if (!cities[id]) return null;

    return cities[id];
  }

  getLocation (id) {
    let locations = this.props.locations.results;
    if (!locations[id]) return null;

    let location = locations[id];
    location.city = this.getCity(location.city_id);

    return location;
  }

  getOperator (id) {
    let operators = this.props.operators.results;
    return operators[id] || null;
  }

  render () {
    let results = this.props.departures.results;
    results = Object.entries(results);
    results.sort(([,a], [,b]) => {
      return  (new Date(a.departure_time)).getTime() -  (new Date(b.departure_time)).getTime();
    });

    return (
      <div className="searchResults">
        {this.props.departures.complete ? '' : 'Loading...'}
        {results.map(([index, departure]) => {
          departure.origin_location = this.getLocation(departure.origin_location_id);
          departure.destination_location = this.getLocation(departure.destination_location_id);
          departure.operator = this.getOperator(departure.operator_id);
          return <Departure key={index} {...departure} />;
        })}
      </div>
    );
  }
};

const mapStateToProps = state =>({
  departures : state.departures,
  cities : state.cities,
  locations : state.locations,
  operators : state.operators
});

SearchResults.propTypes = {
  departures: PropTypes.shape({
    results: PropTypes.object,
    complete: PropTypes.bool
  }),
  cities: PropTypes.shape({
    results: PropTypes.object
  }),
  locations: PropTypes.shape({
    results: PropTypes.object
  }),
  operators: PropTypes.shape({
    results: PropTypes.object
  }),
  date : PropTypes.string
}

export default connect(mapStateToProps)(SearchResults);
