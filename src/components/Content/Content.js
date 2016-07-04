import React from 'react';
import FiltersList from '../FiltersList/FiltersList';

class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <FiltersList></FiltersList>
    );
  }
}

export default Content;