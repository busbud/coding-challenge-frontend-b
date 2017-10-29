import React, { Component } from 'react';
import { Dimmer, Image, Loader, Segment } from 'semantic-ui-react';

class Loading extends Component {
  render() {
    return (
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
    );
  }
}

export default Loading;
