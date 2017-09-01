import thunks, { types } from '../';
import currencies from '../../config/currencies';

export default ({ currency }) => dispatch => {
	const currentCurrencyIndex = currencies.indexOf(currency);
	const newCurrencyIndex = currentCurrencyIndex + 1 === currencies.length
		? 0
		: currentCurrencyIndex + 1;

	dispatch(thunks[types.onCurrencyChangeSuccess]({ currency: currencies[newCurrencyIndex] }));
};
