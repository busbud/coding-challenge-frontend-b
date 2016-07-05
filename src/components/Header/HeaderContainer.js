import { connect } from 'react-redux';
import Header from './Header';

/**
 *  Container for Header : map props to redux store
 **/

const mapStateToProps = (state) => { console.log('state',state);
  return {
    translations: state.translater.translations
  };
};

const HeaderContainer = connect(mapStateToProps)(Header);

export default HeaderContainer;