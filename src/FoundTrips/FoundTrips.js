import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Segment } from 'semantic-ui-react';
import Loading from './Loading/Loading';
import Trip from './Trip/Trip';
import './FoundTrips.css';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import parseTrips from './Trip/parseTrips';

const mapStateToProps = ({ trips }) => {
  return {
    isFetching: trips.isFetching,
    hasError: trips.hasError,
    trips: parseTrips(trips.apiResponse)
  };
};

export class FoundTrips extends Component {
  render() {
    let content;
    if (this.props.hasError) {
      content = <ErrorMessage />;
    } else if (this.props.isFetching) {
      content = <Loading />;
    } else {
      const trips = this.props.trips.map((trip, index) => (
        <Segment padded key={index}>
          <Trip key={index} trip={trip} />
        </Segment>
      ));

      content = (
        <Segment.Group className="FoundTrips-trips">{trips}</Segment.Group>
      );
    }

    return (
      <Grid.Column className="FoundTrips-column">
        <Container text>{content}</Container>
      </Grid.Column>
    );
  }
}

export default connect(mapStateToProps)(FoundTrips);
