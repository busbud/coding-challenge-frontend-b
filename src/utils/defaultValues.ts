// For 'Select' component usage
export type Value = {
  value: string;
  key: string;
}

/**
 * Default values usually comes from a Localization service, or some other service.
 * Here we're forcing the data, but for the sake of this challenge it works.
 */
// Default Values, which should actually come from a Localization service.
export const defaultOrigin = {
  value: "f2m673",
  key: "Québec"
};

export const defaultDestination = {
  value: "f25dvk",
  key: "Montréal"
};

export const seatTypes = [
  {
    value: 'adult',
    label: 'adult',
  },
  {
    value: 'child',
    label: 'child',
  },
  {
    value: 'senior',
    label: 'senior',
  },
];

export const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export const defaultSeat = 1;
export const defaultSeatType = 'adult';
export const defaultLang = 'en';
export const defaultCurrency = 'USD';