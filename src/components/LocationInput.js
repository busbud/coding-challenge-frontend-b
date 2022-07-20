import React from 'react';
import styled from 'styled-components';

const StyledLocationInput = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  margin: 5px;
  width: 100%;
  color: #001c3f;
`;

const StyledLabel = styled.label`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #a7afb9;
`;

const StyledTitle = styled.p`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #001c3f;
`;

const LocationInput = ({ label, text }) => {
  return (
    <StyledLocationInput>
      <div>
        <StyledLabel>{label}</StyledLabel>
        <div>
          <StyledTitle>{text}</StyledTitle>
        </div>
      </div>
    </StyledLocationInput>
  );
};

export default LocationInput;
