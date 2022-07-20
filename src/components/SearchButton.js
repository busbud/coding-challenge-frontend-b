import React from 'react';
import styled from 'styled-components';

const StyledSearchButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 4px 10px 4px 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  margin: 0px 10px 0px 0px;
  background-color: #f2af3d;
  color: ${({ color }) => color || '#fff'};

  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;

const SearchButton = ({ onClick }) => {
  return <StyledSearchButton onClick={onClick}>Search</StyledSearchButton>;
};

export default SearchButton;
