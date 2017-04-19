import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import moment from 'moment';
import styles from '../styles/components/departure.css';
import { Row, Col } from 'react-flexbox-grid';

const cx = classNames.bind(styles);

const Departure = ({departure, destination, operator, origin, destinationCity, originCity, currency}) => {

  const departureTime = moment(departure.departure_time).format('h:mm a');
  const arrivalTime = moment(departure.arrival_time).format('h:mm a');
  const duration = moment.duration(departure.duration, 'minutes').humanize();

  return (
    <div className={cx('departure-box')}>
      <Row>
        <Col xs={2} className={cx('time-section')}>
          <p className={cx('departure')}>{ departureTime }</p>
          <i className="fa fa-arrow-down" aria-hidden="true"></i>
          <p>{ arrivalTime }</p>
          <p>Total time: <br /> <i className="fa fa-clock-o" aria-hidden="true"></i> { duration }</p>
        </Col>
        <Col xs={4} className={cx('city-section')}>
          <p>{origin.name}</p>
          <p className={cx('city-name')}>Departure: { originCity }</p>
          <p>{destination.name}</p>
          <p className={cx('city-name')}>Arrival: { destinationCity }</p>

        </Col>
        <Col xs={3} className={cx('bordered')}>
          <p className={cx('operator-name')}>{operator.name}</p>
        </Col>
        <Col xs={3} className={cx('purchase-section')}>
          <p className={cx('price')}>${departure.prices.total / 100 } {currency}</p>
          <p>one way per person</p>
          <a target="_BLANK" className={cx('purchase-ticket-btn')} href={departure.links.deeplink}>Buy</a>
        </Col>
      </Row>
    </div>
  );
};

Departure.propTypes = {
  currency: PropTypes.string,
  departure: PropTypes.object,
  operator: PropTypes.object,
  origin: PropTypes.object,
  originCity: PropTypes.string,
  destination: PropTypes.object,
  destinationCity: PropTypes.string
};

export default Departure;
