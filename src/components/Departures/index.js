import React, { PropTypes, Component } from 'react';

import styles from './styles.scss';

import Departure from '../Departure';

const Departures = ({
  origin,
  destination,
  date,
  adultCount,
  departures,
  allDeparturesFetched,
}) => (
  <div>
    <div className={styles.subheading}>
      Departures from{' '}
      <span className={styles.data}>{origin.name}</span>{' '}
      to{' '}
      <span className={styles.data}>{destination.name}</span>{' '}
      for{' '}
      <span className={styles.data}>{`${adultCount} adult`}</span>{' '}
      on{' '}
      <span className={styles.data}>{new Date(date).toLocaleDateString()}</span>{' '}
    </div>
    <div className={styles.departures}>
      {departures.map(departure => <Departure {...departure} />)}
    </div>
  </div>
);

Departures.propTypes = {
  origin: React.PropTypes.object,
  destination: React.PropTypes.object,
  date: React.PropTypes.string,
  adultCount: React.PropTypes.number,
  departures: React.PropTypes.array,
  allDeparturesFetched: React.PropTypes.bool,
};

class DeparturesContainer extends Component {
  constructor(props) {
    super(props);
    /* Most of this information is static
     * but it's the sort of information that
     * could start changing, so storing it as
     * state is good.
     */
    this.state = {
      origin: {
        name: 'New York',
        geohash: 'dr5reg',
      },
      destination: {
        name: 'Montréal',
        geohash: 'f25dvk',
      },
      date: '29 July 2016',
      adultCount: 1,
      allDeparturesFetched: false,
      departures: [],
    };
  }

  render() {
    return <Departures {...this.state} />
  }
}

export default DeparturesContainer;
