import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDepartures } from '../store/modules/departures';

import Departure from './Departure';


const Departures = ({ departures, loading, getDeparturesConnect }) => {
  useEffect(() => {
    getDeparturesConnect();
  }, []);

  return (
    <div>
      {departures && departures.map(departure => (
        <Departure departure={departure} />
      ))}
      {loading && (
        <p>Loading</p>
      )}
    </div>
  );
};

Departures.propTypes = {
  departures: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  getDeparturesConnect: PropTypes.func.isRequired,
};

Departures.defaultProps = {
  departures: [],
};

function mapStateToProps(state) {
  return {
    departures: state.departures.list,
    loading: state.departures.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getDeparturesConnect: getDepartures,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Departures);
