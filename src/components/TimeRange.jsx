import React from 'react';
import styled from 'styled-components';

import { formatTime } from '../utils/format';

const H5 = styled.h5`
  font-family: Quicksand;
  font-size: 1.1rem;
  color: #025687;
`;

function TimeRange({ from = '18:30PM', to = '01:30AM' }) {
  return (
    <H5>
      {formatTime(from)} - {formatTime(to)}
    </H5>
  );
}

export default TimeRange;
