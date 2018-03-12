import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from '../App/constants';
import { assoc } from 'ramda';

const initialState = {
  locale: DEFAULT_LOCALE,
};

export default (state = initialState, { type, locale }) => {
  switch (type) {
    case CHANGE_LOCALE:
      return assoc('locale', locale, state);

    default:
      return state;
  }
};
