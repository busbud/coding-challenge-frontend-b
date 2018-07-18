import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const StyledDiv = styled.div`
  font-weight: lighter;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    transition: box-shadow 0.25s ease-in-out;
    &:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
  }

  &&& {
    @media screen and (max-width: 768px) {
      margin-bottom: 0px;
    }
  }

  .departure-date {
    &>.day {
      font-size: 2rem;
      line-height: 2rem;
    }
    &>.month {
      font-size: 1.6rem;
      line-height: 1.6rem;
      text-transform: uppercase;
    }
    &>.year {
      font-size: 1.2rem;
      line-height: 1.2rem;
    }
  }

  .departure .time {
    font-weight: normal;
    font-size: 1.4rem;
  }

  .place {
    font-size: 0.9rem;

    /* it makes all cards look the same, even if station names are big */
    /* @media screen and (max-width: 768px) { */
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 190px;
      overflow: hidden;
    /* } */
  }

  .arrow {
    flex-shrink: 5;
  }

  .price {
    font-size: 1.5rem;
    font-weight: normal;
  }
`;

/**
 * Card component.
 *
 * For sake of simplicity we will always consider price as american dollars.
 */
const DepartureCard = (props) => {
  const {departureDate, arrivalDate, departureLocation, arrivalLocation, price, duration } = props;
  const departureMoment = moment(departureDate);
  const arrivalMoment = moment(arrivalDate);
  const durationMoment = duration && moment.duration(duration, 'minutes').format('h[h] mm[m]');

  return (<StyledDiv className="box is-radiusless">
    <div className="level is-mobile">
      <div className="level-item has-text-centered">
        <div className="departure-date">
          <p className="day">{departureMoment.format('DD')}</p>
          <p className="month">{departureMoment.format('MMM')}</p>
          <p className="year">{departureMoment.format('YYYY')}</p>
        </div>
      </div>
      <div className="level-item">
        <div>
          <div className="departure time-place">
            <p className="time">{departureMoment.format('LT')}</p>
            <p className="place has-text-grey">{departureLocation}</p>
          </div>
          <div className="arrival time-place">
            <p className="time">{arrivalMoment.format('LT')}</p>
            <p className="place has-text-grey">{arrivalLocation}</p>
          </div>
        </div>
      </div>
      <div className="level-item is-hidden-mobile">
        <span className="icon is-small">
          <i className="fa fa-clock-o has-text-grey"></i>
        </span>
        {durationMoment}
      </div>
      <div className="level-item">
        <span className="price">US$ {Number(price).toFixed(2)}</span>
      </div>
    </div>
  </StyledDiv>);
};

DepartureCard.propTypes = {
  departureDate: PropTypes.string,
  arrivalDate: PropTypes.string,
  departureLocation: PropTypes.string,
  arrivalLocation: PropTypes.string,
  price: PropTypes.number,
  duration: PropTypes.number,
};

export default DepartureCard;
