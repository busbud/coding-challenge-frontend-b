import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <Grid.Column color="blue">
        <h1 className="Header-title">{this.props.title}</h1>
      </Grid.Column>
    );
  }
}

export default Header;
