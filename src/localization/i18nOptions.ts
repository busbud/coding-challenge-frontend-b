import LocalStorageService from '../helpers/LocalStorageService';
import { commonTranslations } from './commonTranslations';
import { Locale, format as formatDate, isDate } from 'date-fns';
import { enCA as en, fr } from 'date-fns/locale';
import { InitOptions, Resource } from 'i18next';

const locales: { [key: string]: Locale } = {
  en,
  fr,
};

export const LANGUAGE_LOCAL_STORAGE_KEY = 'language';
export const DEFAULT_LANGUAGE = 'en';

export const i18nOptions: InitOptions = {
  lng:
    LocalStorageService.getItem(LANGUAGE_LOCAL_STORAGE_KEY) ?? DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  debug: false,

  defaultNS: 'common',
  fallbackNS: 'common',

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
    format: (value: any, format?: string, lng?: string): string => {
      if (isDate(value) && format && lng) {
        const locale = locales[lng];
        return formatDate(value, format, { locale });
      }

      return value as string;
    },
  },

  react: {
    defaultTransParent: 'span',
    useSuspense: false,
  },

  resources: commonTranslations as Resource,
};
