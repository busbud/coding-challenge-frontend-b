import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchHeaderComponent from '../components/SearchHeader';
import { getRoutes } from '../actions/routes';

class SearchHeader extends PureComponent {
  static propTypes = {
    getRoutes: PropTypes.func,
    routes: PropTypes.shape({
      isComplete: PropTypes.bool,
    })
  }

  submitHandler = (origin, destination, outbound_date) => {
    this.props.getRoutes(origin, destination, outbound_date);
  }

  render() {
    return (<SearchHeaderComponent
      onSubmit={this.submitHandler}
      isLoading={this.props.routes.isComplete !== null && !this.props.routes.isComplete}
    />);
  }
}

const mapStateToProps = state => ({
  routes: state.routes,
});

const mapDispatchToProps = (dispatch) => ({
  getRoutes: (origin, destination, outbound_date) => dispatch(getRoutes(origin, destination, outbound_date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchHeader);
