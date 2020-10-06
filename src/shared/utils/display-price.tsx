export const displayPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency,
    // maximumSignificantDigits: 1,
  }).format(price);
};
