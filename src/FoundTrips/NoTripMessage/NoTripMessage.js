import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import { goToOnboarding } from '../../actions/index';
import { connect } from 'react-redux';

export class NoTripMessage extends Component {
  render() {
    return (
      <Message warning>
        <Message.Header>Chou blanc !</Message.Header>
        <p>
          Nous n’avons pas trouvé de trajet pour Osheaga avec ces critères.<br />
          <a href="/" onClick={event => this.tryFetchTripsAgain(event)}>
            Essayez à nouveau
          </a>{' '}
          en changeant de date, par exemple.
        </p>
      </Message>
    );
  }

  tryFetchTripsAgain(event) {
    event.preventDefault();
    this.props.dispatch(goToOnboarding());
  }
}

export default connect()(NoTripMessage);
