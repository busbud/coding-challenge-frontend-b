import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../styles/components/departure.css';

const cx = classNames.bind(styles);

const Departure = ({onEntryChange, onEntrySave, topic}) => {
  return (
    <div className={cx('departure-box')}>
      <h1 className={cx('header')}>This is a departure</h1>
    </div>
  );
};

Departure.propTypes = {
  departure: PropTypes.object
};

export default Departure;
