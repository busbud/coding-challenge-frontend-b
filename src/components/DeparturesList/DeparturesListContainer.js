import { connect } from 'react-redux';
import DeparturesList from './DeparturesList';

/**
 *  Container for DeparturesList : map props to redux store
 **/

const mapStateToProps = (state) => {
  return {
    isFetching: state.api.isFetching,
    data: state.api.data,
    sort: state.sort
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const DeparturesListContainer = connect(mapStateToProps, mapDispatchToProps)(DeparturesList);

export default DeparturesListContainer;