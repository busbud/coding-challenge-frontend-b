import thunks, { types } from '../';
import languages from '../../config/languages';

export default () => (dispatch, getState) => {
	const currentLangIndex = languages.indexOf(getState().app.lang);
	const newLangIndex = currentLangIndex + 1 === languages.length
		? 0
		: currentLangIndex + 1;

	getState().app.i18n.changeLanguage(languages[newLangIndex]);

	dispatch(thunks[types.onLanguageChangeSuccess]({ lang: languages[newLangIndex] }));
};
