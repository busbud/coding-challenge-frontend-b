import React, { useState } from 'react';
import DatePicker from 'react-datepicker-clean';
import Button from './Button';
import BusServices from '../api/services/BusServices';
import ServiceOption from './ServiceOption';
import { IDeparture, ISearchResponseDTO } from '../api/dtos/ISearchResponseDTO';
import '../styles/SearchTravels.scss';

const SearchTravels = () => {
  const [date, setDate] = useState('');
  const [destination, setDestination] = useState('');
  const [numberPeople, setNumberPeople] = useState('0');
  const [departure, setDeparture] = useState('');
  const [searchResult, setSearchResult] = useState({});
  const [isSearchDone, setIsSearchDone] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleDateChange = (dates: any) => {
    if (dates.length > 0) {
      const isoDate = dates[0].toISOString().split('T')[0];
      setDate(isoDate);
    }
  };

  const shouldMergeResponses = (departures = [] as IDeparture[], newDepartures = [] as IDeparture[]) => {
    const firstNewDeparture = newDepartures[0] || {};
    const { id: newDepartureId } = firstNewDeparture;
    const matchDepartures = departures.filter(({ id }: any) => newDepartureId === id);
    return matchDepartures.length > 0;
  };

  const setControlVariables = (newMergedResponse = {} as ISearchResponseDTO) => {
    const { departures = [] } = newMergedResponse;
    if (departures.length === 0) {
      setIsSearchDone(true);
    }
    setIsSearching(false);
  };

  const handleSearchResponse = (response = {} as ISearchResponseDTO, searchResult = {} as ISearchResponseDTO) => {
    // @ts-ignore
    const { departures = [], locations = [] } = searchResult;
    const { complete, departures: newDepartures = [], locations: newLocations = [] } = response;

    const resultsValue = Object.keys(searchResult).length > 0 ? searchResult : response;

    let shouldMerge = true;
    if (departures.length > 0) {
      shouldMerge = shouldMergeResponses(departures, newDepartures);
    }
    const newSearchResults = {
      ...resultsValue,
      departures: shouldMerge ? [...departures, ...newDepartures] : departures,
      locations: shouldMerge ? [...locations, ...newLocations] : locations,
      complete,
    };
    setSearchResult(newSearchResults);
    return newSearchResults;
  };

  const handleSubmit = () => {
    setSearchResult({});
    setIsSearchDone(false);
    setIsSearching(true);
    let mergedResponse = {} as ISearchResponseDTO;

    BusServices.search({ departure, destination, date, numberPeople }).then((response) => {
      // @ts-ignore
      mergedResponse = handleSearchResponse(response, {});
      let { complete } = mergedResponse;

      if (!complete) {
        const intervalId = window.setInterval(function () {
          if (!complete) {
            let { departures = [] } = mergedResponse;
            let index = departures.length;

            BusServices.search({ departure, destination, date, index, numberPeople }).then((response) => {
              const newMergedResponse = handleSearchResponse(response, mergedResponse);
              const { complete: completeFromResponse } = newMergedResponse;
              complete = completeFromResponse;
              if (completeFromResponse) {
                clearInterval(intervalId);
                setControlVariables(newMergedResponse);
              }
            });
          } else {
            clearInterval(intervalId);
            setIsSearching(false);
          }
        }, 5000);
      } else {
        setControlVariables(mergedResponse);
      }
    });
  };

  const handleDestinationChange = (e: any): void => {
    const { target = {} } = e;
    const { value = '' } = target;
    setDestination(value);
  };

  const handleDepartureChange = (e: any): void => {
    const { target = {} } = e;
    const { value = '' } = target;
    setDeparture(value);
  };

  const handleNumberPeopleChange = (e: any): void => {
    const { target = {} } = e;
    const { value = '' } = target;
    setNumberPeople(value);
  };

  const isButtonDisable = () => {
    return date === '' || destination === '' || departure === '' || numberPeople !== '1' || isSearching;
  };

  return (
    <div className="container">
      <div className="inputs">
        <div className="cities">
          <label htmlFor="city-from" className="label">
            Departure
          </label>
          <select id="departure" name="departure" className="input" value={departure} onChange={handleDepartureChange}>
            <option value="">--Please choose an option--</option>
            <option value="f2m673">Québec</option>
          </select>
        </div>

        <div className="cities">
          <label htmlFor="city-from" className="label">
            Destination
          </label>
          <select
            id="destination"
            name="destination"
            className="input"
            value={destination}
            onChange={handleDestinationChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="f25dvk">Montréal</option>
          </select>
        </div>

        <div className="cities">
          <label htmlFor="city-from" className="label">
            Number of adults
          </label>
          <select
            id="numberPeople"
            name="numberPeople"
            className="input"
            value={numberPeople}
            onChange={handleNumberPeopleChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="1">1</option>
          </select>
        </div>

        <div className="date">
          <DatePicker onDateClick={handleDateChange} />
        </div>

        <div className="wrapperButton">
          <Button
            className="button"
            defaultText="Search"
            onClick={handleSubmit}
            disabled={isButtonDisable()}
            dataTestId={`btn-search-submit`}
          />
        </div>
      </div>

      {Object.keys(searchResult).length > 0 && (
        <div>
          <ServiceOption searchResult={searchResult} />
          {isSearchDone && <label>Sorry, there are no travels available for the selected parameters</label>}
        </div>
      )}
    </div>
  );
};

export default SearchTravels;
