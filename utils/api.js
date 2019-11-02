export const getApi = async url => {
  try {
    let response = await fetch(url, {
      headers: {
        Accept:
          "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "X-Busbud-Token": "PARTNER_AHm3M6clSAOoyJg4KyCg7w"
      }
    });
    return await response.json();
  } catch (error) {
    // Error handling here!
  }
};
