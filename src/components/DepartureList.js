import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translate } from 'react-i18next'

import DepartureCard from './DepartureCard';
import DepartureCardLoading from './DepartureCardLoading';

const StyledDiv = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  @media screen and (max-width: 768px) {
    margin-top: 0;
    margin-bottom: 0;
  }

  &.no-route {
    text-align: center;
  }
`;

const DepartureList = (props) => {
  const routes = props.routes || [];
  const isLoading = (props.isComplete !== null && !props.isComplete);

  if (props.error) {
    return <StyledDiv className="no-route">
      <p className="subtitle is-1 has-text-grey">:(</p>
      <p className="subtitle is-4 has-text-grey">{props.t(`error.${props.error}`)}</p>
    </StyledDiv>
  }

  if (props.isComplete && routes.length <= 0) {
    return <StyledDiv className="no-route">
      <p className="subtitle is-1 has-text-grey">:(</p>
      <p className="subtitle is-4 has-text-grey">{props.t('result.noRoutes')}</p>
    </StyledDiv>
  }
  return (<StyledDiv className="container">
    {
      routes.map(route => (
        <DepartureCard
          key={route.id}
          departureDate={route.departure.date}
          arrivalDate={route.arrival.date}
          departureLocation={route.departure.location}
          arrivalLocation={route.arrival.location}
          price={route.price}
          duration={route.duration}
        />
      ))
    }
    {
      isLoading && <DepartureCardLoading />
    }
  </StyledDiv>)
};

DepartureList.propTypes = {
  error: PropTypes.string,
  isComplete: PropTypes.bool,
  routes: PropTypes.array,
  t: PropTypes.func,
};

export default translate()(DepartureList);
