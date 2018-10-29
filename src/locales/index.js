import { addLocaleData } from 'react-intl'
import fr from 'react-intl/locale-data/fr'
import en from 'react-intl/locale-data/en'

addLocaleData([...en, ...fr])
export { default } from './locales'
