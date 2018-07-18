import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DepartureListComponent from '../components/DepartureList';

class DepartureList extends Component {
  static propTypes = {
    routes: PropTypes.shape({
      list: PropTypes.array,
      error: PropTypes.instanceOf(Error),
      isComplete: PropTypes.bool,
    }),
  };

  render() {
    const { list, error, isComplete } = this.props.routes || {};
    if (error) {
      return <div>ERROR</div>; // TODO: show better error
    }
    return (<DepartureListComponent
      routes={list}
      isComplete={isComplete}
    />);
  }
}

const mapStateToProps = state => ({
  routes: state.routes,
});

export default connect(mapStateToProps, null)(DepartureList);
