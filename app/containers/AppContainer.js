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
    // don't do this here
    const { fetchDepartures, pollDepartures } = this.props;
    fetchDepartures().then(() => {
      if (!this.props.query.data.complete) {
        console.log('query after', this.props.query);
        const index = this.props.query.data.departures.length;
        this.poll(index);
      }
    });
  }

  poll(index) {
    this.props.pollDepartures(index).then((result) => {
      if (!this.props.poll.data.complete) {
        const index = this.props.poll.data.departures.length;
        return this.poll(index);
      }
    });
  }

  render() {
    const { query, poll } = this.props;

    const allDepartures = [ ...query.data.departures, ...poll.data.departures];
    const allOperators = [ ...query.data.operators, ...poll.data.operators];
    console.log('query', query);
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
    fetchDepartures: () => {
      return dispatch(fetchData('x-departures', {
        adult: 1,
        child: 0,
        senior: 0,
        lang: 'en',
        currency: 'CAD'
      }))
    },
    pollDepartures: (index) => {
      return dispatch(fetchPollData('poll-x-departures', {
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
