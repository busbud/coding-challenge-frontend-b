import React from 'react';
import moment from 'moment-timezone';

export function Departure(props) {
  const departureTime = moment(props.departure.departure_time)
    .tz(props.departure.departure_timezone);
  const arrivalTime = moment(props.departure.arrival_time)
    .tz(props.departure.arrival_timezone);

  const dateDiff = parseInt(arrivalTime.format('MD'), 10) - parseInt(departureTime.format('MD'), 10);

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
                {props.departure.origin.name}
              </div>
            </div>

            <div className="o-layout">
              <div className="o-layout__item u-1-4">
                {arrivalTime.format('H:mm')}
              </div>
              <div className="o-layout__item u-3-4">
                {props.departure.destination.name}
              </div>
            </div>
          </div>
        </div>
        <div className="o-layout__item u-1-4 u-m-1-1">
          <div className="c-departure__price u-padding">
            &euro;{Math.round(props.departure.prices.total / 100)}
          </div>
        </div>
      </div>
    </div>
  );
}

Departure.propTypes = {
  departure: React.PropTypes.object.isRequired,
};
