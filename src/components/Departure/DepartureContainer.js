import { connect } from 'react-redux';
import Departure from './Departure';

/**
 *  Container for Departure: map props to redux store
 **/

const mapStateToProps = (state) => {
  return {
    lang: state.translater.lang,
    currency: state.currency,
    translations: state.translater.translations
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const DepartureContainer = connect(mapStateToProps, mapDispatchToProps)(Departure);

export default DepartureContainer;