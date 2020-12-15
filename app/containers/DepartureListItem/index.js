/**
 * DepartureListItem
 *
 * Shows all interesting information for a departure
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl';

import { makeSelectSearchParams } from 'containers/App/store/selectors';
import ListItem from 'components/ListItem';
import { formatTime } from 'utils/common';

import Wrapper from './Wrapper';
import messages from './messages';

export function DepartureListItem(props) {
  const { searchParams, item } = props;
  const NumberProps = { style: 'currency', currency: 'CAD' };

  // Put together the content of the departure
  const content = (
    <Wrapper>
      <div>
        <strong>{formatTime(item.departure_time)} </strong>
        <FormattedMessage {...messages[searchParams.origin]} />
        <span> - {item.location.name}</span>
      </div>
      <div>
        <strong>{formatTime(item.arrival_time)} </strong>
        <FormattedMessage {...messages[searchParams.destination]} />
      </div>
      <div>
        <strong>
          <FormattedNumber value={item.price / 100} {...NumberProps} />
        </strong>
      </div>
    </Wrapper>
  );

  // Render the content into a list item
  return <ListItem item={content} />;
}

DepartureListItem.propTypes = {
  item: PropTypes.object,
  searchParams: PropTypes.object,
  intl: PropTypes.any,
};

export default connect(
  createStructuredSelector({
    searchParams: makeSelectSearchParams(),
  }),
)(injectIntl(DepartureListItem));
