import React from 'react';
import FiltersContainer from '../Filters/FiltersContainer';
import DeparturesListContainer from '../DeparturesList/DeparturesListContainer';
import RouteContainer from '../Route/RouteContainer';
import './Content.scss';

class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <section className="content">
            <RouteContainer />
            <FiltersContainer />
            <DeparturesListContainer />
        </section>
    );
  }
}

export default Content;