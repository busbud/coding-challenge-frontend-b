import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DepartureCard from './DepartureCard';

const StyledDiv = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  @media screen and (max-width: 768px) {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const DepartureList = (props) => {
  const routes = props.routes || [];
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
  </StyledDiv>)
};

DepartureList.propTypes = {
  routes: PropTypes.array,
  isLoading: PropTypes.bool,
  isComplete: PropTypes.bool,
};

export default DepartureList;
