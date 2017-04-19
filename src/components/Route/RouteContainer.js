import { connect } from 'react-redux';
import Route from './Route';

/**
 *  Container for Route : map props to redux store
 **/

const mapStateToProps = (state) => {
  return {
    translations: state.translater.translations,
    data: state.api.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const RouteContainer = connect(mapStateToProps, mapDispatchToProps)(Route);

export default RouteContainer;