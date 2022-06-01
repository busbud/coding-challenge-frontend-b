import en from "./en";
import es from "./es";
import fr from "./fr";

export const translations: Record<string, TranslationType> = {
  en,
  es,
  fr,
};

export type TranslationType = {
  title: string;
  chooseCurrency: string;
  chooseLanguage: string;
  origin: string;
  destination: string;
  date: string;
  passenger: string;
  submit: string;
  passengerUnit: string;
  resultList: string;
};
