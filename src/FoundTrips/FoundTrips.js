import React, { Component } from 'react';
import {
  Container,
  Dimmer,
  Grid,
  Image,
  Loader,
  Segment
} from 'semantic-ui-react';

class FoundTrips extends Component {
  render() {
    return (
      <Grid.Column>
        <Container text>
          <Segment>
            <Dimmer active inverted>
              <Loader
                inverted
                size="large"
                content="Nous recherchons les meilleurs trajets…"
              />
            </Dimmer>

            <Image src="/images/wireframe/paragraph.png" />
          </Segment>
        </Container>
      </Grid.Column>
    );
  }
}

export default FoundTrips;
