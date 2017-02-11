import React from 'react';
import moment from 'moment';

export function Departure(props) {
  const departureTime = moment(props.departure.departure_time);
  const destinationTime = moment(props.departure.destination_time);

  return (
    <div className="c-departure u-padding u-margin-bottom">
      <div className="o-layout">
        <div className="o-layout__item u-padding u-3-4">
          <div className="o-layout">
            <div className="o-layout__item u-1-4">
              {departureTime.format('H:mm')}

              <div>
                <i className="fa fa-arrow-down" />
              </div>
            </div>
            <div className="o-layout__item u-3-4">
              {props.departure.origin.name}
            </div>
          </div>

          <div className="o-layout">
            <div className="o-layout__item u-1-4">
              {destinationTime.format('H:mm')}
            </div>
            <div className="o-layout__item u-3-4">
              {props.departure.destination.name}
            </div>
          </div>
        </div>
        <div className="o-layout__item u-padding u-1-4">
          <div className="c-departure__price">
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

