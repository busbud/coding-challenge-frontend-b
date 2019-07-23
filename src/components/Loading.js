import React from 'react';

export default class Loading extends React.Component {
  render() {
    return (
      <div className="loading-departures-container">
        <div className="lds-facebook">
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}
