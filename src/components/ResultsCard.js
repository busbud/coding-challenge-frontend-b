import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

function ResultsCard(props) {
  const {
    departureTime,
    arrivalTime,
    price,
    currency,
  } = props;

  return (
    <div className="result-card box">
      <div className="columns is-mobile">
        <div className="column">
          <div className="columns is-mobile is-vcentered">
            <div className="column has-text-centered">
              <div>
                <p>Departing</p>
                <p className="is-size-6 has-text-weight-bold">{format(new Date(departureTime), 'h:mma')}</p>
              </div>
            </div>
            <div className="column is-narrow has-text-centered has-text-weight-bold">
              <div>
                <p className="is-size-6">→</p>
              </div>
            </div>
            <div className="column has-text-centered">
              <div>
                <p>Arriving</p>
                <p className="is-size-6 has-text-weight-bold">{format(new Date(arrivalTime), 'h:mma')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-one-quarter box has-background-primary has-text-white has-text-centered">
          <p className="is-size-4 has-text-weight-bold">{price.toLocaleString('en-US', { style: 'currency', minimumFractionDigits: 0, currency })}</p>
        </div>
      </div>
    </div>
  );
}

ResultsCard.defaultProps = {
  departureTime: '',
  arrivalTime: '',
  price: 0,
  currency: 'USD',
};

ResultsCard.propTypes = {
  departureTime: PropTypes.string,
  arrivalTime: PropTypes.string,
  price: PropTypes.number,
  currency: PropTypes.string,
};

export default ResultsCard;
