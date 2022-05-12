const ORIGIN_GEO = "f2m673";
const DESTINATION_GEO = "f25dvk";
const DATE = "2022-08-02";

export const getDepartures = async ({ passengers, index = 0 } = {}) => {
	const url = `${
		process.env.REACT_APP_BUSBUD_API
	}/x-departures/${ORIGIN_GEO}/${DESTINATION_GEO}/${DATE}${
		index ? `/poll?index=${index}&` : "?"
	}adult=${passengers}&currency=CAD`;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
				"X-Busbud-Token": process.env.REACT_APP_BUSBUD_TOKEN,
			},
		});

		return await res.json();
	} catch (error) {
		throw new Error(error);
	}
};
