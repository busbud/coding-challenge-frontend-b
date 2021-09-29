import { Injectable } from '@angular/core';

import translationEn from '../../assets/i18n/literals.en.json';
import translationEs from '../../assets/i18n/literals.es.json';
import translationFr from '../../assets/i18n/literals.fr.json';


@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private translations: any = {
    en: translationEn,
    es: translationEs,
    fr: translationFr
  };

  translate(id: string, lang: string, params?: { [key: string]: any }) {
    const translationSet = this.translations[lang] || {};
    const translation: string = translationSet[id] || id || '';
    const valueRegexp: RegExp = /{([^}]*)}/g;
    if (params) {
      return translation.replace(valueRegexp, key => {
        key = key.substring(1, key.length - 1);
        return params && params[key] || ''
      });
    }
    return translation;
  }

}
