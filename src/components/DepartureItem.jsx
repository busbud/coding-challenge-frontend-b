/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import DepartureItemLocation from './DepartureItemLocation';

import './styles/DepartureItem.scss';

const formatPrice = price => (price / 100.0).toFixed(2);

const formatLink = link => link
  .replace('{utm_source}', 'microsite')
  .replace('{utm_campaign}', 'challenge')
  .replace('{utm_medium}', 'heroku');

function DepartureItem(props) {
  const { departure, t } = props;

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
          <DepartureItemLocation
            city={originLocation.name}
            time={departure_time}
            timezone={departure_timezone}
          />

          <DepartureItemLocation
            city={destinationLocation.name}
            time={arrival_time}
            timezone={arrival_timezone}
          />
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
  t: PropTypes.func.isRequired,
};

export default translate('translations')(DepartureItem);
