import express from 'express';

// simple helper method to make sure a cookie conforms to a list of valid values
export function validateCookie(
  value: string,
  values: string[],
  defaultValue: string
): string {
  return values.includes(value) ? value : defaultValue;
}

// builds the options for a busbud search using a request's query parameters
export const apiSearchOptions = (req: express.Request) => {
  return {
    index: req.query.index || 0,
    adult: req.query.people || 1,
    child: 0,
    senior: 0,
    lang: req.query.language,
    currency: req.query.currency
  };
}
