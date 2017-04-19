import { connect } from 'react-redux';
import { toggleCurrency } from '../../actions';
import CurrencyToggler from './CurrencyToggler';

/**
 *  Container for CurrencyToggler : map props to redux store
 **/

const mapStateToProps = (state) => {
  return {
    currency: state.currency
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (newCurrency) => {
      dispatch(toggleCurrency(newCurrency));
    }
  };
};

const CurrencyTogglerContainer = connect(mapStateToProps, mapDispatchToProps)(CurrencyToggler);

export default CurrencyTogglerContainer;