import { connect } from 'react-redux';
import DeparturesList from './DeparturesList';

/**
 *  Container for DepartureList : map props to redux store
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

const DeparturesListContainer = connect(mapStateToProps, mapDispatchToProps)(DeparturesList);

export default DeparturesListContainer;