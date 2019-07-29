import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
// import InfiniteScroll from 'react-infinite-scroll-component';

import InfiniteScroll from 'react-infinite-scroller';

import Departure from './Departure';
import Loader from './Loader';

import {
  initDepartures, pollDepartures, departuresSelector, isCompleteSelector, isLoadingSelector,
} from '../store/modules/departures';

const Departures = ({
  departures, isComplete, isLoading, initDeparturesConnect, pollDeparturesConnect,
}) => {
  useEffect(() => {
    initDeparturesConnect();
  }, []);

  const pollData = () => {
    if (!isComplete && !isLoading) {
      pollDeparturesConnect();
    }
  };

  return (
    <div className="">

      <InfiniteScroll
        pageStart={0}
        loadMore={pollData}
        hasMore={!isComplete}
        // initialLoad={false}
        loader={(
          <div style={{ textAlign: 'center', clear: 'both' }}>
            <Loader />
          </div>
        )}
        useWindow={false}
      >
        {departures.map(departure => (
          <Departure departure={departure} />
        ))}
      </InfiniteScroll>
      {isComplete && !isLoading && (
        <p style={{ textAlign: 'center' }}>
          <b>No more available departures</b>
        </p>
      )}
    </div>
  );
};

Departures.propTypes = {
  departures: PropTypes.array,
  isComplete: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  initDeparturesConnect: PropTypes.func.isRequired,
  pollDeparturesConnect: PropTypes.func.isRequired,
};

Departures.defaultProps = {
  departures: [],
};

const mapStateToPropsSelector = createStructuredSelector({
  departures: departuresSelector,
  isComplete: isCompleteSelector,
  isLoading: isLoadingSelector,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initDeparturesConnect: initDepartures,
    pollDeparturesConnect: pollDepartures,
  }, dispatch);
}

export default connect(mapStateToPropsSelector, mapDispatchToProps)(Departures);
