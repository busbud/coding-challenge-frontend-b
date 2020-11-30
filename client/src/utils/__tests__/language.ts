import { getLanguage } from '../language';

describe('Test getDepartureInfo function', () => {
    it('should return the default language', () => {
        const language = getLanguage();
        expect(language).toBe('en');
    });

    it('should return the default language from the url', () => {
        const url = 'http://busbud.com/fr';
        Object.defineProperty(window, 'location', {
            value: new URL(url),
        });

        window.location.href = url;
        const language = getLanguage();
        expect(language).toBe('fr');
    });
});
