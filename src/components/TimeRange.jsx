import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { formatTime } from '../utils/format';

const H5 = styled.h5`
  font-family: Quicksand;
  font-size: 1.1rem;
  color: #025687;
`;

function TimeRange({ from, to }) {
  return (
    <H5>
      {formatTime(from)} - {formatTime(to)}
    </H5>
  );
}

TimeRange.propType = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default TimeRange;
