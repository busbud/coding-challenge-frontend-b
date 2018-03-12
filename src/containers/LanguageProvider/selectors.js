import { createSelector } from 'reselect';
import { prop } from 'ramda';

const selectLanguage = prop('language');

const makeSelectLocale = () => createSelector(selectLanguage, prop('locale'));

export { selectLanguage, makeSelectLocale };
