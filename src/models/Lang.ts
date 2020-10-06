export class Lang {
    value: string;
    keyTranslation: string;

    constructor(value: string, keyTranslation: string) {
        this.value = value;
        this.keyTranslation = keyTranslation;
    }

    static getLangs(): Lang[]
    {
        return [new Lang("fr", "FRENCH_LANG"), new Lang("en", "ENGLISH_LANG")]
    }

    isLangActive(currentLang: string): boolean {
        return currentLang === this.value;
    }
}