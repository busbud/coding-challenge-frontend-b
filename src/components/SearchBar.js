import React from 'react';

import styled from 'styled-components';
import LocationInput from './LocationInput';
import SearchButton from './SearchButton';

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1300px;
  border-radius: 4px 20px 4px 20px;
  height: 100px;
  background-color: #fff;
  display: flex;
  flex-wrap: no-wrap;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.18);
  margin: 10px;
`;

const StyledDivider = styled.div`
  width: 2px;
  height: 44px;
  border-radius: 1px;
  background-color: #e0e0e0;
`;

const SearchBar = (props) => {
  return (
    <StyledSearchBar>
      <LocationInput label={'Where'} text={'Quebec → Montreal'} />
      <StyledDivider />

      <LocationInput label={'When'} text={'Sat, August 2 2021'} />
      <StyledDivider />

      <LocationInput label={'Passengers'} text={'1'} />

      <SearchButton onClick={console.log('Search button pressed')} />
    </StyledSearchBar>
  );
};

export default SearchBar;
