import React from 'react';
import { geohashToName } from '../utils/utils';
import DepartureList from './DepartureList';
import Loading from './Loading';
import './MainSection.css';

const MainSection = ({
    currentSearch,
    departures,
    error,
    isLoading,
  }) => {

  const originCity = geohashToName(currentSearch.origin);
  const destinationCity = geohashToName(currentSearch.destination);
  const date = currentSearch.date.toLocaleDateString('fr');

  return (
    <div className="MainSection section container is-paddingless">
      <div className="description is-hidden-mobile">
        {`Departures from ${originCity} to ${destinationCity} on ${date}`}
      </div>
      <div className="description is-hidden-tablet">
        <p>{`${originCity} to ${destinationCity}`}</p>
        <p>{`${date}`}</p>
      </div>
      { isLoading ? <Loading /> : (
        <div>
          <DepartureList departures={ departures }/>
        </div>
      )}
      { error && (
        <div className="notification is-danger">
          <p>{ error }</p>
        </div>
      )}
    </div>
  );
};

export default MainSection;
