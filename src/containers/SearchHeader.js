import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchHeaderComponent from '../components/SearchHeader';
import { getRoutes } from '../actions/routes';

class SearchHeader extends PureComponent {
  static propTypes = {
    getRoutes: PropTypes.func,
  }

  submitHandler = (origin, destination, outbound_date) => {
    this.props.getRoutes(origin, destination, outbound_date);
  }

  render() {
    return (<SearchHeaderComponent
      onSubmit={this.submitHandler}
    />);
  }
}

const mapDispatchToProps = (dispatch) => ({
  getRoutes: (origin, destination, outbound_date) => dispatch(getRoutes(origin, destination, outbound_date)),
});

export default connect(null, mapDispatchToProps)(SearchHeader);
