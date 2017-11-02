import React, { Component } from 'react';
import logo from './logo.svg';
import Departures from './components/departures'
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap'
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col mdOffset={2} md={8}>
            <Departures></Departures>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App;
