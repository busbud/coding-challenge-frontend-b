import { NextApiRequest, NextApiResponse } from "next";

const API_BASE = "https://napi.busbud.com/x-departures";
const ORIGIN_ID = "f2m673"; // Québec
const DESTINATION_ID = "f25dvk"; // Montréal
const DATE = "2021-11-01";

const departures = async (
  req: NextApiRequest,
  res: NextApiResponse<Record<string, unknown>>
) => {
  try {
    const index = req.query.index as string;
    const passengers = req.query.passengers as string;

    const urlSuffix = parseInt(index)
      ? `/poll?index=${index}&adult=${passengers}`
      : `?adult=${passengers}`;

    const url = `${API_BASE}/${ORIGIN_ID}/${DESTINATION_ID}/${DATE}${urlSuffix}`;

    const departuresResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept:
          "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "X-Busbud-Token": process.env.BUSBUD_TOKEN,
      },
    });

    const departuresJson = await departuresResponse.json();

    if (departuresJson?.error) {
      throw new Error(departuresJson.error.type);
    }

    res.status(200).json(departuresJson);
  } catch (error) {
    console.log("[Departures] Error", error);
    res.status(400).send({ error: error.message });
  }
};

export default departures;
