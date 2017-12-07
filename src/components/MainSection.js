import React from 'react';
import moment from 'moment';
import { translate } from 'react-i18next';
import i18n from '../i18n/i18n';
import DepartureList from './DepartureList';
import Loading from './Loading';
import { geohashToName } from '../utils/utils';
import '../styles/MainSection.css';

const MainSection = ({
  currentLang,
  currentSearch,
  departures,
  error,
  isLoading,
  t,
}) => {
  const originCity = geohashToName(currentSearch.origin);
  const destinationCity = geohashToName(currentSearch.destination);
  const { date } = currentSearch;
  return (
    <div className="MainSection section container is-paddingless">
      {/* Desktop Description */}
      <div className="description is-hidden-mobile">
        <p>
          {
            t('p.departures.desktop', {
              origin: originCity,
              destination: destinationCity,
              date: moment(date).locale(currentLang).format('LL'),
            })
          }
        </p>
      </div>

      {/* Mobile Description */}
      <div className="description is-hidden-tablet">
        <p>
          {
            t('p.departures.mobile', {
              origin: originCity,
              destination: destinationCity,
            })
          }
        </p>
        <p>{moment(date).locale(currentLang).format('LL')}</p>
      </div>

      {/* Loading Icon */}
      { isLoading ? <Loading /> : (
        <div>
          <DepartureList departures={departures} />
        </div>
      )}

      {/* Error Message */}
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
