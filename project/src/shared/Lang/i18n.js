import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEn from './en.json'
import translationFr from './fr.json'

// set translation
const resources = {
	en: {
		translation: translationEn
	},
	fr: {
		translation: translationFr
	}
}

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: 'en',
		fallbackLng: 'fr',
		debug: true,
		keySeparator: false, 
		interpolation: {
			escapeValue: false,
			formatSeparator: ','
		},
		react: {
		  	wait: true
		}
	})

export default i18n
