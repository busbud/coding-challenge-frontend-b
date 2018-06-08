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
  } = departure;

  const price = formatPrice(prices.total);

  return (
    <div className="DepartureItem">
      <div className="DepartureItem__travel">
        <div className="DepartureItem__city DepartureItem__city--origin">{originLocation.name}</div>
        <div className="DepartureItem__date DepartureItem__date--origin">{formatDatetime(departure_time, departure_timezone, currentLanguage)}</div>

        <div className="DepartureItem__city DepartureItem__city--destination">{destinationLocation.name}</div>
        <div className="DepartureItem__date DepartureItem__date--destination">{formatDatetime(arrival_time, arrival_timezone, currentLanguage)}</div>
      </div>

      <div className="DepartureItem__price">
        {t('price', { price })}
      </div>
    </div>
  );
}

DepartureItem.propTypes = {
  departure: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('translations')(DepartureItem);
