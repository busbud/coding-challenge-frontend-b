import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import '../styles/base.scss';

class SearchBtn extends Component {

  constructor(props) {
    super(props)

    this.state({ 
    })
  }

  render() {
    const searchBtn = (<Button bsSize="large" bsStyle="warning">Search</Button>);

    return (
      <div className="search-btn">
        {searchBtn}
      </div>
    )
  }
}

export default SearchBtn;