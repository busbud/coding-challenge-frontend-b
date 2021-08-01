export const parseTime = (dateToParse) => {
  const date = new Date(dateToParse);

  const timeToParse = new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "numeric",
  });

  return timeToParse.format(date);
};

// Returns a date format for the Departure service.
export const selectedDateFormat = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${(date.getDate() + 1).toString().padStart(2, "0")}`;
};

// Parse an ISO date time stamp into readible English.
export const dateTimeFormat = (dateToParse) => {
  const date = new Date(dateToParse);

  const dateTimeToFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return dateTimeToFormat.format(date);
};

// Converts price style based on currency.
export const convertPrice = (price, currency = "CAD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price / 100);
};

// Handles route navigation with ability to pass parameters.
export const handleNavClick = (pathname, history, params?) => () => {
  history.push({
    pathname,
    state: params,
  });
};

// Create URL Params.
export const encodeQueryData = (objectToParse) => {
  const params = [];

  for (let param in objectToParse) {
    params.push(
      `${encodeURIComponent(param)}=${encodeURIComponent(objectToParse[param])}`
    );
  }

  return params.join("&");
};
