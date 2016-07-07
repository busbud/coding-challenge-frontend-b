import { connect } from 'react-redux';
import { changeSort } from '../../actions';
import Filters from './Filters';

/**
 *  Container for Filters : map props to redux store
 **/

const mapStateToProps = (state) => {
  return {
    translations: state.translater.translations,
    sort: state.sort
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (sort) => {
      dispatch(changeSort(sort));
    }
  };
};

const FiltersContainer = connect(mapStateToProps, mapDispatchToProps)(Filters);

export default FiltersContainer;