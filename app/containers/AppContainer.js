import React from 'react';
import styles from '../styles/containers/app-container.css';
import classNames from 'classnames/bind';
import Departure from '../components/Departure';
import { connect } from 'react-redux';
import { fetchData, fetchPollData } from '../actions/actions';
import { Grid, Row, Col } from 'react-flexbox-grid';
import headerImage from '../assets/images/header-image.png';
import moment from 'moment';

const cx = classNames.bind(styles);

class AppContainer extends React.Component {
  componentDidMount() {
    // this.getDepartures();
  }
  getDepartures() {
    const { fetchDepartures, pollDepartures, query } = this.props;

    fetchDepartures(query.params.origin.geohash, query.params.destination.geohash, query.params.date.format('YYYY-MM-DD'), query.params.currency).then(() => {
      if (!this.props.query.data.complete) {
        const index = this.props.query.data.departures.length;
        this.poll(index);
      }
    });
  }

  poll(index) {
    const { query, pollDepartures, poll } = this.props;

    pollDepartures(query.params.origin.geohash, query.params.destination.geohash, query.params.date.format('YYYY-MM-DD'), query.params.currency, index).then((result) => {
      if (!poll.data.complete) {
        const newIndex = poll.data.departures.length;
        return this.poll(newIndex);
      }
    });
  }

  render() {
    const { query, poll } = this.props;

    const allDepartures = [ ...query.data.departures, ...poll.data.departures];
    const allOperators = [ ...query.data.operators, ...poll.data.operators];

    return (
      <div className={cx('app')} >
        <Grid>
          <Row>
            <Col xs={12} md={6} mdOffset={3} className={cx('header')}>
              <img alt="osheaga header" src={ headerImage }></img>

            </Col>
            <Col xs={12} xsOffset={0} md={8} mdOffset={2}>
              <div className={cx('leader')}>
                <p>Going to Osheaga? The festival starts { query.params.date.format('dddd, MMMM Do YYYY')}!</p>

                  {allDepartures.length === 0 &&
                    <div>
                      <p>Click the button below to get bus times to get you to Montreal in time for the action.</p>
                      <button className={ cx('fetch-button') } onClick={() => { this.getDepartures(); } }>Get bus times!</button>
                    </div>
                  }
              </div>
            </Col>
            <Col xs={12}>
              {query.isLoading && !query.error &&
                <div className={cx('center-loading')}>
                  <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                  <span className="sr-only">Loading...</span>
                  <p>Loading initial data...</p>
                </div>
              }
              {poll.isLoading && !poll.error &&
                <div className={cx('center-loading')}>
                  <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                  <span className="sr-only">Poll Loading...</span>
                  <p>Loading more departures...</p>
                </div>
              }
            </Col>
            <Col xs={12} xsOffset={0} md={8} mdOffset={2}>
            { allDepartures.map((departure) => {
                return (
                  <Departure
                    key={ departure.id }
                    currency={ query.params.currency }
                    destination={ query.data.locations.filter(location => location.id === departure.destination_location_id )[0] }
                    destinationCity={ query.params.destination.name }
                    origin={ query.data.locations.filter(location => location.id === departure.origin_location_id )[0] }
                    originCity={ query.params.origin.name }
                    operator={ allOperators.filter(operator => operator.id === departure.operator_id)[0] }
                    departure={ departure }
                  />
                );
              })
            }
          </Col>
          </Row>
      </Grid>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    query: state.initialQuery,
    poll: state.poll
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDepartures: (origin, destination, date, currency) => {
      return dispatch(fetchData(`x-departures/${origin}/${destination}/${date}`, {
        adult: 1,
        child: 0,
        senior: 0,
        lang: 'en',
        currency
      }))
    },
    pollDepartures: (origin, destination, date, currency, index) => {
      return dispatch(fetchPollData(`x-departures/${origin}/${destination}/${date}/poll`, {
        adult: 1,
        child: 0,
        senior: 0,
        lang: 'en',
        currency,
        index
      }))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
