import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import './Header.css';
import logo from '../logo.svg';
import { goToOnboarding } from '../actions/index';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <Grid.Column color="blue">
        <a
          href="/"
          onClick={event => this.tryFetchTripsAgain(event)}
          className="Header-link"
        >
          <h1 className="Header-title">
            <Image
              src={logo}
              alt="Busbud"
              className="Header-logo"
              avatar
              verticalAlign="top"
            />
            <span>{this.props.title}</span>
          </h1>
        </a>
      </Grid.Column>
    );
  }

  tryFetchTripsAgain(event) {
    event.preventDefault();
    this.props.dispatch(goToOnboarding());
  }
}

export default connect()(Header);
