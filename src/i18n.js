import i18n, { use } from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export default () => {
	use(XHR)
		.use(LanguageDetector)
		.init({
			fallbackLng: 'en',
			react: {},

			// have a common namespace used around the full app
			ns: ['common'],
			defaultNS: 'common',

			interpolation: {
				escapeValue: false,
				formatSeparator: ',',
				format(value, format) {
					if (format === 'uppercase') return value.toUpperCase();
					return value;
				},
			},
		});
	return i18n;
};
