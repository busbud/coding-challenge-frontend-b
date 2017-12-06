import React from 'react';
import { geohashToName } from '../utils/utils';
import DepartureList from './DepartureList';
import Loading from './Loading';
import '../styles/MainSection.css';

import { translate } from 'react-i18next';
import i18n from '../i18n';

const MainSection = ({
    currentSearch,
    departures,
    error,
    isLoading,
    t,
  }) => {

  const originCity = geohashToName(currentSearch.origin);
  const destinationCity = geohashToName(currentSearch.destination);
  const date = currentSearch.date.toLocaleDateString('fr');

  return (
    <div className="MainSection section container is-paddingless">
      <div className="description is-hidden-mobile">
        {
          t('p.departures', {
            origin: originCity,
            destination: destinationCity,
            date: date,
          })
        }
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

translate.setI18n(i18n);
export default translate()(MainSection);
