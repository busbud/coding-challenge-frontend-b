import React from 'react';
import { object } from 'prop-types';
import { intlShape } from 'react-intl';
import logo from './logo.svg';
import messages from './messages';

const Component = ({ intl: { formatMessage }, classes }) => (
  <img className={classes.root} alt={formatMessage(messages.alt)} src={logo} />
);

Component.propTypes = {
  intl: intlShape,
  classes: object,
};

export default Component;
