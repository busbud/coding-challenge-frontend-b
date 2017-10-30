import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import { fetchTrips } from '../../actions/index';
import { connect } from 'react-redux';

export class ErrorMessage extends Component {
  render() {
    return (
      <Message negative>
        <Message.Header>Oh non ! Il y a eu un problème.</Message.Header>
        <p>
          Nous n’avons pas pu récupérer les trajets pour Osheaga…<br />
          <a href="/" onClick={event => this.tryFetchTripsAgain(event)}>
            Essayez à nouveau
          </a>{' '}
          ou bien{' '}
          <a href="https://help.busbud.com/hc/en-us">
            contactez le support de Busbud
          </a>.
        </p>
      </Message>
    );
  }

  tryFetchTripsAgain(event) {
    event.preventDefault();
    this.props.dispatch(fetchTrips());
  }
}

export default connect()(ErrorMessage);
