import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Segment } from 'semantic-ui-react';
import { isBefore } from 'date-fns';
import './FoundTrips.css';
import Loading from './Loading/Loading';
import Trip from './Trip/Trip';
import parseTrips from './Trip/parseTrips';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import NoTripMessage from './NoTripMessage/NoTripMessage';

const mapStateToProps = ({ trips }) => {
  return {
    isFetching: trips.isFetching,
    isPolling: trips.isPolling,
    hasError: trips.hasError,
    trips: parseTrips(trips.apiResponse)
  };
};

export class FoundTrips extends Component {
  render() {
    let content;
    if (this.props.hasError) {
      content = <ErrorMessage />;
    } else if (this.props.isFetching || this.isPollingWithoutTripToShow()) {
      content = <Loading />;
    } else if (this.hasNoTripToShow()) {
      content = <NoTripMessage />;
    } else if (this.props.isPolling) {
      content = (
        <div>
          <Segment.Group className="FoundTrips-trips">
            {this.props.trips
              .sort(increasingDepartureTimeSorter)
              .map(renderTrip)}
          </Segment.Group>
          <Loading />
        </div>
      );
    } else {
      content = (
        <Segment.Group className="FoundTrips-trips">
          {this.props.trips.sort(increasingDepartureTimeSorter).map(renderTrip)}
        </Segment.Group>
      );
    }

    return (
      <Grid.Column className="FoundTrips-column">
        <Container text>{content}</Container>
      </Grid.Column>
    );
  }

  isPollingWithoutTripToShow() {
    return this.props.isPolling && this.props.trips.length === 0;
  }

  hasNoTripToShow() {
    return (
      !this.props.isFetching &&
      !this.props.isPolling &&
      this.props.trips.length === 0
    );
  }
}

export default connect(mapStateToProps)(FoundTrips);

function renderTrip(trip, index) {
  return (
    <Segment className="FoundTrips-trip" padded key={index}>
      <Trip key={index} trip={trip} />
    </Segment>
  );
}

function increasingDepartureTimeSorter(tripA, tripB) {
  return isBefore(tripA.departure.time, tripB.departure.time) ? -1 : 1;
}
