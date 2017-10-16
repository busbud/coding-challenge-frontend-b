import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import search from '../actions/index';

import '../styles/base.scss';

class SearchBtn extends Component {

  constructor(props) {
    super(props);
    this.setState({displayResults: false});
  }

  render() {
    return (
      <div className="search-btn">
        {<Button bsSize="large" bsStyle="warning" onClick={search()}>Search</Button>}
      </div>
    )
  }
}

export default SearchBtn;