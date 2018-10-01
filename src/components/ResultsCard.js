import React from 'react';
import PropTypes from 'prop-types';
import { format, distanceInWords } from 'date-fns';

function ResultsCard(props) {
  const {
    departureTime,
    departureLocation,
    arrivalTime,
    arrivalLocation,
    price,
    currency,
    operator,
    link,
  } = props;

  return (
    <div className="result-card box has-text-centered">
      <div className="columns">
        <div className="column">
          <div className="columns is-mobile is-vcentered">
            <div className="column">
              <div>
                <p>Departing</p>
                <p className="is-size-6 has-text-weight-bold">{format(new Date(departureTime), 'h:mma')}</p>
                <p>{departureLocation.name}</p>
              </div>
            </div>
            <div className="column is-narrow has-text-weight-bold">
              <div>
                <p className="is-size-6">→</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p>Arriving</p>
                <p className="is-size-6 has-text-weight-bold">{format(new Date(arrivalTime), 'h:mma')}</p>
                <p>{arrivalLocation.name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-one-quarter">
          <a className="button is-primary is-medium" href={link}>{price.toLocaleString('en-US', { style: 'currency', minimumFractionDigits: 0, currency })}</a>
        </div>
      </div>
      <div className="operator">
        {operator.display_name}
      </div>
      <div className="duration">
        {`Duration: ${distanceInWords(new Date(departureTime), new Date(arrivalTime))}`}
      </div>
    </div>
  );
}

ResultsCard.defaultProps = {
  departureTime: '',
  departureLocation: {},
  arrivalTime: '',
  arrivalLocation: {},
  price: 0,
  currency: 'USD',
  operator: {},
  link: '',
};

ResultsCard.propTypes = {
  departureTime: PropTypes.string,
  departureLocation: PropTypes.shape({
    address: PropTypes.array,
    name: PropTypes.string,
  }),
  arrivalTime: PropTypes.string,
  arrivalLocation: PropTypes.shape({
    address: PropTypes.array,
    name: PropTypes.string,
  }),
  price: PropTypes.number,
  currency: PropTypes.string,
  operator: PropTypes.shape({
    display_name: PropTypes.string,
  }),
  link: PropTypes.string,
};

export default ResultsCard;
