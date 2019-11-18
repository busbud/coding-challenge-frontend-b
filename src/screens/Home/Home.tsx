import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import LayoutDefault from '../../layouts/LayoutDefault';

const StyledContainer = styled(Container)`
  margin: 30px;
  text-align: center;
`;

function Home() {
  return (
    <LayoutDefault>
      <StyledContainer>
        <Link to="/departures/dr5reg/f25dvk/2020-08-02">
          <FormattedMessage id="demo" />
        </Link>
      </StyledContainer>
    </LayoutDefault>
  );
}

export default Home;
