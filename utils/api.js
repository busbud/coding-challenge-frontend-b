export const getApi = async url => {
  try {
    let response = await fetch(url, {
      headers: {
        Accept:
          "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "X-Busbud-Token": "PARTNER_AHm3M6clSAOoyJg4KyCg7w"
      }
    });
    // Error handling here! We can show give feedback to user
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

export const createUrl = (baseUrl, urlParams, queryParams) => {
  baseUrl += urlParams.join('/');
  let params = queryParams.join('&');
  return baseUrl + params;
}