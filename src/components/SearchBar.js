import React from 'react';

import LocationInput from './LocationInput';
import SearchButton from './SearchButton';
import { getDepartures } from '../api/busbud';

import styled from 'styled-components';
import moment from 'moment';

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
  padding: 10px;
  border: solid 1px #dbdbdb;
`;

const StyledDivider = styled.div`
  width: 2px;
  height: 44px;
  border-radius: 1px;
  background-color: #e0e0e0;
`;

const originLocation = [
  { id: 1, city: 'Québec City', state: 'Quebec', geoHash: 'f2m673' },
];

const destinationLocation = [
  { id: 1, city: 'Montreal', state: 'Quebec', geoHash: 'f25dvk' },
];

const initialQueryParams = {
  adult: 1,
  child: 0,
  senior: 0,
  lang: 'EN',
  currency: 'CAD',
};

const SearchBar = (props) => {
  const { setDepartures, setLoading } = props;

  const todayDate = new Date('August 2 2022');
  const date = moment(todayDate).format('YYYY-MM-DD');

  const handleSearch = () => {
    FetchDeparturesFromAPI();
  };

  const FetchDeparturesFromAPI = async () => {
    setLoading(true);
    setDepartures([]);

    const data = await getDepartures(
      originLocation[0].geoHash,
      destinationLocation[0].geoHash,
      date,
      initialQueryParams
    );

    setLoading(false);

    const locations = data.locations;
    const cities = data.cities;

    const departures = data.departures.map((item) => {
      const locationOrigin = locations.filter(
        (location) => location.id === item.origin_location_id
      )[0];

      const locationDestination = locations.filter(
        (location) => location.id === item.destination_location_id
      )[0];

      const originCity = cities.filter(
        (city) => city.id === locationOrigin.city_id
      )[0];

      const destinationCity = cities.filter(
        (city) => city.id === locationDestination.city_id
      )[0];

      const originLocationName = `${originCity.name} - ${locationOrigin.name}`;
      const destinationLocationName = `${destinationCity.name} - ${locationDestination.name}`;

      return {
        arrivalTime: item.arrival_time,
        currency: item.prices.currency,
        departureTime: item.departure_time,
        id: item.id,
        originLocationName,
        destinationLocationName,
        price: item.prices.total,
      };
    });

    setDepartures(departures);
  };

  return (
    <StyledSearchBar>
      <LocationInput label={'Where'} text={'Quebec → Montreal'} />
      <StyledDivider />

      <LocationInput label={'When'} text={'Sat, August 2 2022'} />
      <StyledDivider />

      <LocationInput label={'Passengers'} text={'1'} />

      <SearchButton onClick={handleSearch} />
    </StyledSearchBar>
  );
};

export default SearchBar;
