import React, { Component } from 'react';
import { Icon, Message } from 'semantic-ui-react';

export class AllTripsFoundMessage extends Component {
  render() {
    return (
      <Message positive>
        <Icon name="thumbs outline up" /> Voici tous les trajets pour{' '}
        <strong>Osheaga</strong> au départ de <strong>New York City</strong> le{' '}
        <strong>2 août 2018</strong>.
      </Message>
    );
  }
}

export default AllTripsFoundMessage;
