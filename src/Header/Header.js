import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import './Header.css';
import logo from '../logo.svg';

class Header extends Component {
  render() {
    return (
      <Grid.Column color="blue">
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
      </Grid.Column>
    );
  }
}

export default Header;
