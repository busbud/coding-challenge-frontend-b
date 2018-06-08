/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { translate } from 'react-i18next';

import './styles/DepartureItem.scss';

const formatPrice = price => (price / 100.0).toFixed(2);

const formatDatetime = (datetime, timezone, languageCode) => DateTime
  .fromISO(datetime)
  .setZone(timezone)
  .setLocale(languageCode)
  .toLocaleString(DateTime.DATETIME_MED);

const formatLink = link => link
  .replace('{utm_source}', 'microsite')
  .replace('{utm_campaign}', 'challenge')
  .replace('{utm_medium}', 'heroku');

function DepartureItem(props) {
  const { departure, i18n, t } = props;

  const currentLanguage = i18n.language;
  const {
    arrival_time,
    destinationLocation,
    departure_timezone,
    departure_time,
    arrival_timezone,
    originLocation,
    prices,
    links,
  } = departure;

  const { deeplink } = links;
  const price = formatPrice(prices.total);

  return (
    <div className="DepartureItem">
      <div className="DepartureItem__informations">
        <div className="DepartureItem__locations">
          <div className="DepartureItem__location DepartureItem__location--origin">
            <div className="DepartureItem__city">{originLocation.name}</div>
            <div className="DepartureItem__date">
              {t('departure', {
                date: formatDatetime(departure_time, departure_timezone, currentLanguage),
              })}
            </div>
          </div>

          <div className="DepartureItem__location DepartureItem__location--destination">
            <div className="DepartureItem__city">{destinationLocation.name}</div>
            <div className="DepartureItem__date">
              {t('departure', {
                date: formatDatetime(arrival_time, arrival_timezone, currentLanguage),
              })}
            </div>
          </div>
        </div>

        <div className="DepartureItem__price">
          {t('price', { price })}
        </div>
      </div>

      <a className="DepartureItem__select" href={formatLink(deeplink)} target="_blank" rel="noopener noreferrer">
        {t('selectTravel')}
      </a>
    </div>
  );
}

DepartureItem.propTypes = {
  departure: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('translations')(DepartureItem);
