import React from 'react';
import Card from 'react-bootstrap/Card';
import { Translate, Localize } from 'react-redux-i18n';

const Departure = ({ departure }) => (
  <Card className="my-4">
    <Card.Body>
      <div className="departure-info d-flex justify-content-between">
        <div>
          <h4 className="departure-subtitle mb-4"><Translate value="departure.departure" /></h4>
          <p className="departure-time font-weight-bold mb-0"><Localize value={departure.departure_time} dateFormat="llll" /></p>
          <p className="text-black-50">{`(${departure.departure_timezone})`}</p>
          <p className="text-black-50 font-weight-bold">{`${departure.originLocationName} - ${departure.originCityName}`}</p>
        </div>

        <div>
          <h4 className="departure-subtitle mb-4"><Translate value="departure.arrival" /></h4>
          <p className="departure-time font-weight-bold mb-0"><Localize value={departure.arrival_time} dateFormat="llll" /></p>
          <p className="text-black-50">{`(${departure.arrival_timezone})`}</p>
          <p className="text-black-50 font-weight-bold">{`${departure.destinationLocationName} - ${departure.destinationCityName}`}</p>
        </div>

        <div>
          <h2>{departure.prices.total}</h2>
        </div>
      </div>
    </Card.Body>
  </Card>
);

export default Departure;
