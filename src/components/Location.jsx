import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LocationName = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
  font-weight: 500;
  font-size: 1rem;
`;

const LocationAddress = styled.p`
  font-weight: 300;
  font-size: 0.8rem;
`;

const LoationWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

function Location({ name, address = [] }) {
  return (
    <LoationWrapper>
      <LocationName>{name}</LocationName>
      {address.map((line, index) => (
        <LocationAddress key={index}>{line}</LocationAddress>
      ))}
    </LoationWrapper>
  );
}

Location.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.arrayOf(PropTypes.string)
};

export default Location;
