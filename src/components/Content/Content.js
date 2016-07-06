import React from 'react';
import FiltersContainer from '../Filters/FiltersContainer';
import DeparturesListContainer from '../DeparturesList/DeparturesListContainer';
import './Content.scss';

class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <section className="content">
            <DeparturesListContainer />
            <FiltersContainer />
        </section>
    );
  }
}

export default Content;