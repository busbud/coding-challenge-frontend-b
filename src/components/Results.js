import React, { Component } from 'react';
import '../styles/base.css';

class Results extends Component {
  render() {
    const results = this._getResults() || [];

    return (
    <div>{results}</div>);
  }

  _getResults() {
    const busTickets = {

    };

    return busTickets.map((busTicket) => {
      return (
        <div>test</div>
      );
    });
  }
}

export default Results;
