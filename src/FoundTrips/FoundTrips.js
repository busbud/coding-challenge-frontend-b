import React, { Component } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import Loading from './Loading/Loading';
import Trip from './Trip/Trip';
import './FoundTrips.css';

class FoundTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: true,
      trips: []
    };

    // TODO: refactor state from HTTP call
    setTimeout(() => {
      this.setState({
        isSearching: false,
        trips: [
          {
            operator: {
              name: 'Greyhound',
              logoUrl:
                'https://busbud.imgix.net/operator-logos/greyhound.png?h=100&w=100&auto=format&fit=fill&bg=EEE'
            },
            departure: {
              name: '4211 Broadway',
              time: '2016-01-14T00:01:00'
            },
            arrival: {
              name: 'Métro Bonaventure Bus Station',
              time: '2016-01-14T07:55:00'
            },
            price: '52 $'
          },
          {
            operator: {
              name: 'Greyhound',
              logoUrl:
                'https://busbud.imgix.net/operator-logos/greyhound.png?h=100&w=100&auto=format&fit=fill&bg=EEE'
            },
            departure: {
              name: '4211 Broadway',
              time: '2016-01-14T02:01:00'
            },
            arrival: {
              name: 'Gare d’autocars de Montréal',
              time: '2016-01-14T09:55:00'
            },
            price: '55 $'
          }
        ]
      });
    }, 1000);
  }

  render() {
    let content;
    if (this.state.isSearching) {
      content = <Loading />;
    } else {
      const trips = this.state.trips.map((trip, index) => (
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

export default FoundTrips;
