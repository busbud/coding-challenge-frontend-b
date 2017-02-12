import React from 'react';
import moment from 'moment-timezone';
import currencies from 'currencies';

export function Departure({ departure }) {
  const departureTime = moment(departure.departure_time).tz(departure.departure_timezone);
  const arrivalTime = moment(departure.arrival_time).tz(departure.arrival_timezone);

  const dateDiff = parseInt(arrivalTime.format('MD'), 10) - parseInt(departureTime.format('MD'), 10);
  const currencySymbol = currencies.get(departure.prices.currency).symbol;

  return (
    <div className="c-departure u-margin-bottom">
      <div className="o-layout">
        <div className="o-layout__item u-3-4 u-m-1-1">
          <div className="u-padding">
            <div className="o-layout">
              <div className="o-layout__item u-1-4">
                {departureTime.format('H:mm')}

                <div className="c-departure__arrow">
                  <i className="fa fa-arrow-down" />
                  <span className="c-departure__offset">{dateDiff > 0 ? `+${dateDiff}` : ''}</span>
                </div>
              </div>
              <div className="o-layout__item u-3-4">
                {departure.origin.name}
              </div>
            </div>

            <div className="o-layout">
              <div className="o-layout__item u-1-4">
                {arrivalTime.format('H:mm')}
              </div>
              <div className="o-layout__item u-3-4">
                {departure.destination.name}
              </div>
            </div>
          </div>
        </div>
        <div className="o-layout__item u-1-4 u-m-1-1">
          <div className="c-departure__price u-padding">
            {currencySymbol}{Math.round(departure.prices.total / 100)}
          </div>
        </div>
      </div>
    </div>
  );
}

Departure.propTypes = {
  departure: React.PropTypes.object.isRequired,
};
