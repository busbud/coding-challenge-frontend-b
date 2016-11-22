import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import moment from 'moment';
import styles from '../styles/components/departure.css';
import { Row, Col } from 'react-flexbox-grid';

const cx = classNames.bind(styles);

const Departure = ({departure, destination, operator, origin}) => {
  const departureTime = moment(departure.departure_time).format('h:mm a');
  const arrivalTime = moment(departure.arrival_time).format('h:mm a');
  return (
    <div className={cx('departure-box')}>
      <Row>
        <Col xs={2} className={cx('time-section')}>
          <p className={cx('departure')}>{ departureTime }</p>
          <i className="fa fa-arrow-down" aria-hidden="true"></i>
          <p>{ arrivalTime }</p>
        </Col>
        <Col xs={4} className={cx('city-section')}>
          <p>{destination.name}</p>
          <p className={cx('city-name')}>city name</p>
          <p>{origin.name}</p>
          <p className={cx('city-name')}>city name</p>
        </Col>
        <Col xs={3} className={cx('bordered')}>
          <p>{operator.name}</p>
        </Col>
        <Col xs={3}>
          <p>${departure.prices.total / 100 }</p>
        </Col>
      </Row>
    </div>
  );
};

Departure.propTypes = {
  departure: PropTypes.object,
  operator: PropTypes.object,
  origin: PropTypes.object,
  destination: PropTypes.object
};

export default Departure;
