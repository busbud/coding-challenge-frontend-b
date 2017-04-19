import { connect } from 'react-redux';
import { toggleLang, fetchApiIfNeeded } from '../../actions';
import LangToggler from './LangToggler';

/**
 *  Container for LangToggler : map props to redux store
 **/

const mapStateToProps = (state) => {
  return {
    lang: state.translater.lang
  };
};

const mapDispatchToProps = (dispatch) => { 
  return {
    onClick: (newLang) => {
        //dispatch a TOGGLE_LANG action
        dispatch(toggleLang(newLang));
    }
  };
};

const LangTogglerContainer = connect(mapStateToProps, mapDispatchToProps)(LangToggler);

export default LangTogglerContainer;