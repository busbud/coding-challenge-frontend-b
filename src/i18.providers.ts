import {
    TRANSLATIONS,
    TRANSLATIONS_FORMAT,
    LOCALE_ID,
    StaticProvider
} from '@angular/core';

declare const require;

export function getTranslationProviders(): StaticProvider[] {
    let locale = document['locale'] as string;
    if (locale && locale.length) {
        locale = locale.split('-')[0]
    }

    const noProviders: StaticProvider[] = [];

    if (!locale || locale === 'en') {
        return noProviders;
    }

    const translationFile = `./locale/messages.${locale}.xlf`;
    const translations = require(`raw-loader!${translationFile}`).default;

    return [
        { provide: TRANSLATIONS, useValue: translations },
        { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
        { provide: LOCALE_ID, useValue: locale }
    ];
}
