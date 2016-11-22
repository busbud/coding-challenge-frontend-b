import React from 'react';
import styles from '../styles/containers/app-container.css';
import classNames from 'classnames/bind';
import Departure from '../components/Departure';
import { connect } from 'react-redux';
import { fetchData, fetchPollData } from '../actions/actions';
import { Grid, Row, Col } from 'react-flexbox-grid';

const cx = classNames.bind(styles);

class AppContainer extends React.Component {
  componentDidMount() {
    // don't do this here - move to button

    const { fetchDepartures, pollDepartures, query } = this.props;
    fetchDepartures(query.params.origin.geohash, query.params.destination.geohash, query.params.date.format('YYYY-MM-DD')).then(() => {
      if (!this.props.query.data.complete) {
        const index = this.props.query.data.departures.length;
        this.poll(index);
      }
    });
  }

  poll(index) {
    const { query, pollDepartures, poll } = this.props;
    console.log('poll', poll)
    pollDepartures(query.params.origin.geohash, query.params.destination.geohash, query.params.date.format('YYYY-MM-DD'), index).then((result) => {
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
      <div className={cx('app')}>
        <Grid>
        <Row>
          <Col xs={12}>
            {query.isLoading &&
              <div>Is Loading Initial Query</div>
            }
            {poll.isLoading &&
              <div>Is Loading Polling</div>
            }

          </Col>
          <Col xs={12} xsOffset={0} md={8} mdOffset={2}>
          { allDepartures.map((departure) => {
              return (
                <Departure
                  key={ departure.id }
                  destination={ query.data.locations.filter(location => location.id === departure.destination_location_id )[0] }
                  origin={ query.data.locations.filter(location => location.id === departure.origin_location_id )[0] }
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
    fetchDepartures: (origin, destination, date) => {
      return dispatch(fetchData(`x-departures/${origin}/${destination}/${date}`, {
        adult: 1,
        child: 0,
        senior: 0,
        lang: 'en',
        currency: 'CAD'
      }))
    },
    pollDepartures: (origin, destination, date, index) => {
      return dispatch(fetchPollData(`x-departures/${origin}/${destination}/${date}/poll`, {
        adult: 1,
        child: 0,
        senior: 0,
        lang: 'en',
        currency: 'CAD',
        index
      }))
    }

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
