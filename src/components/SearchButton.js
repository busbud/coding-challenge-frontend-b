import React from 'react';

import styled from 'styled-components';
import { HiSearch } from 'react-icons/hi';

const StyledSearchButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 4px 20px 4px 20px;
  border: none;
  cursor: pointer;
  background-color: #f2af3d;
  color: ${({ color }) => color || '#2a63cb'};

  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;

const StyledSearchIcon = styled.p`
  font-size: 32px;
  padding-top: 6px;
`;

const SearchButton = ({ onClick }) => {
  return (
    <StyledSearchButton onClick={onClick}>
      <StyledSearchIcon>
        <HiSearch />
      </StyledSearchIcon>
    </StyledSearchButton>
  );
};

export default SearchButton;
