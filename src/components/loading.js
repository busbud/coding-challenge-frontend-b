import React, { Component } from 'react';

import '../styles/base.scss';

class Loading extends Component {

  render() {
    if (this.props.fetchComplete === false && this.props.showLoading === true) {
      return (
        <main className="results-container">
          <h1 className="result-header white-text">Gathering info...</h1>
        </main>
      );
    } else {
      return null;
    }
  }
}

export default Loading;
