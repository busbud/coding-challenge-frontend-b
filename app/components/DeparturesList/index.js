import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import DepartureListItem from 'containers/DepartureListItem';

function DeparturesList({ loading, error, departures }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }

  if (departures !== false) {
    return <List items={departures} component={DepartureListItem} />;
  }

  return null;
}

DeparturesList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  departures: PropTypes.any,
};

export default DeparturesList;
