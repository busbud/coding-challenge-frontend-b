import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import moment from 'moment';
import styles from '../styles/components/departure.css';
import { Row, Col } from 'react-flexbox-grid';

const cx = classNames.bind(styles);

const Departure = ({departure, destination, operator, origin}) => {
  console.log(operator);
  const departureTime = moment(departure.departure_time).format('h:mm a');
  const arrivalTime = moment(departure.arrival_time).format('h:mm a');

  console.log(departureTime);
  return (
    <div className={cx('departure-box')}>
      <Row>
        <Col xs={2}>
          <p>{ departureTime }</p>
          <i className="fa fa-arrow-down" aria-hidden="true"></i>
          <p>{ arrivalTime }</p>
        </Col>
        <Col xs={4}>
          <p>{destination.name}</p>
          <p>{origin.name}</p>

        </Col>
        <Col xs={3}>{operator.name}</Col>
        <Col xs={3}>Price</Col>
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
