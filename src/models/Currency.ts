export class Currency {
    value: string;
    keyTranslation: string;

    constructor(value: string, keyTranslation: string) {
        this.value = value;
        this.keyTranslation = keyTranslation;
    }

    static getCurrencies(): Currency[]
    {
        return [new Currency("EUR", "CURRENCY_EUR"), new Currency("USD", "CURRENCY_USD")]
    }

    static getDefaultCurrency(currentLang: string): Currency {
        if (currentLang === "fr") {
            return new Currency("EUR", "CURRENCY_EUR");
        } else {
            return new Currency("USD", "CURRENCY_USD"); 
        }
    }
}