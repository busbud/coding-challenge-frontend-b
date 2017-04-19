import { connect } from 'react-redux';
import Footer from './Footer';

/**
 *  Container for Footer : map props to redux store
 **/

const mapStateToProps = (state) => {
  return {
    translations: state.translater.translations
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const FooterContainer = connect(mapStateToProps, mapDispatchToProps)(Footer);

export default FooterContainer;