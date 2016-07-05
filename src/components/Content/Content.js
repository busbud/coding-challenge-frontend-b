import React from 'react';
import FiltersList from '../FiltersList/FiltersList';
import DeparturesListContainer from '../DeparturesList/DeparturesListContainer';

class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <section className="content">
            <DeparturesListContainer />
            <FiltersList />
        </section>
    );
  }
}

export default Content;