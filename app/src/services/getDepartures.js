import urljoin from "url-join";

import * as geoHashes from "../constants/geohash";

const API_SCHEDULES_URL = process.env.REACT_APP_API_SCHEDULES_URL;
const API_ACCESS_TOKEN = process.env.REACT_APP_API_ACCESS_TOKEN;

const origin = geoHashes.QUEBEC_QC_CA;
const destination = geoHashes.MONTREAL_QC_CA;
const date = new Date(Date.now());
const isoDate = date.toISOString().substring(0, 10);

const sleep = (m) => new Promise((r) => setTimeout(r, m));

export async function getDepartures(lang) {
  let queryURL = urljoin(API_SCHEDULES_URL, origin, destination, isoDate);
  let paramsURL = urljoin(
    queryURL,
    "?adult=1",
    `&lang=${lang}`,
    "&currency=CAD"
  );
  const data = await fetchDepartures(paramsURL);
  let reply = await data.json();
  if (reply.complete || !reply.is_valid_route) {
    return reply;
  } else {
    let pollQueryURL = urljoin(
      queryURL,
      "poll",
      "?adult=1",
      `&lang=${lang}`,
      "&currency=CAD"
    );

    await sleep(3000);
    let pollData = await fetchDepartures(pollQueryURL);

    return await appendPolled(pollData, reply);
  }
}
async function appendPolled(pollData, reply) {
  let pollReply = await pollData.json();
  if (pollReply.departures) {
    pollReply.departures.forEach((dep) => {
      reply.departures.push(dep);
    });
  }
  if (pollReply.operators) {
    pollReply.operators.forEach((op) => {
      reply.operators.push(op);
    });
  }
  if (pollReply.complete) reply.complete = true;
  return reply;
}

function fetchDepartures(paramsURL) {
  const controller = new AbortController();
  const signal = controller.signal;

  setTimeout(() => controller.abort(), 5000);

  return fetch(
    paramsURL,
    {
      method: "GET",
      mode: "cors",
      headers: {
        Accept:
          "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "X-Busbud-Token": API_ACCESS_TOKEN,
      },
    },
    { signal }
  );
}
