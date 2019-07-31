import React from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Translate, Localize } from 'react-redux-i18n';
import PropTypes from 'prop-types';

const Departure = ({ departure }) => (
  <Card className="my-4">
    <Card.Body>
      <div className="departure-info d-flex flex-column flex-md-row justify-content-between align-items-stretch">
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

        <Alert className="d-flex px-lg-5 justifiy-content-center align-items-center" variant="info">
          <p>
            <Translate value="departure.price" />
            <br />
            <Localize
              value={departure.prices.total / 100}
              options={{
                style: 'currency', currency: 'CAD', minimumFractionDigits: 2, maximumFractionDigits: 2,
              }}
              className="departure-price font-weight-bold"
            />
          </p>
        </Alert>
      </div>
    </Card.Body>
  </Card>
);

Departure.propTypes = {
  departure: PropTypes.object.isRequired,
};

export default Departure;
