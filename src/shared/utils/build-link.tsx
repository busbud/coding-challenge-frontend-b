export const buildLink = (url: string, queryParams?: Object): string => {
  if (
    !(
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("/")
    )
  )
    throw new Error("Invalid URL detected");

  if (!queryParams) return url;

  const stringifiedQueryParams = Object.entries(queryParams).map(
    ([key, value]) => `${key}=${value}`
  );
  if (stringifiedQueryParams.length === 0) return url;

  const query = `?${stringifiedQueryParams.join("&")}`;
  return url + query;
};
