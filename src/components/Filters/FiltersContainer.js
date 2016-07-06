import { connect } from 'react-redux';
import Filters from './Filters';

/**
 *  Container for Filters : map props to redux store
 **/

const mapStateToProps = (state) => {
  return {
    isFetching: state.api.isFetching,
    data: state.api.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const FiltersContainer = connect(mapStateToProps, mapDispatchToProps)(Filters);

export default FiltersContainer;