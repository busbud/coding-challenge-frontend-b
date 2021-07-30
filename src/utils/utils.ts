export const parseTime = (dateToParse) => {
  const date = new Date(dateToParse);

  const timeToParse = new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "numeric",
  });

  return timeToParse.format(date);
};

export const convertPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
};

export const handleNavClick = (path, history) => () => {
  history.push(path);
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
