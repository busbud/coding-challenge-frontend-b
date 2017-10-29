import React, { Component } from 'react';
import { Grid, Icon, Item } from 'semantic-ui-react';
import './Trip.css';
import TripLocation from './TripLocation/TripLocation';

class Trip extends Component {
  render() {
    const { operator, departure, arrival, price } = this.props.trip;

    const tripLocations = (
      <Grid.Column width={12}>
        <TripLocation
          location={departure}
          className="text-primary"
          timeClassName="text-large"
        />
        <Grid className="Trip-arrow-between-locations">
          <Grid.Column mobile={6} tablet={4} computer={4} textAlign="center">
            <Icon name="long arrow down" />
          </Grid.Column>
        </Grid>
        <TripLocation location={arrival} />
      </Grid.Column>
    );

    const tripPrice = (
      <Grid.Column width={4} textAlign="right">
        <p className="Trip-price text-primary">{price}</p>
      </Grid.Column>
    );

    return (
      <Item.Group unstackable>
        <Item>
          <Item.Image
            className="Trip-image"
            size="tiny"
            shape="circular"
            src={operator.logoUrl}
          />
          <Item.Content verticalAlign="middle">
            <Item.Description>
              <Grid verticalAlign="middle">
                {tripLocations}
                {tripPrice}
              </Grid>
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default Trip;
