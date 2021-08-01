import express from "express";
import cors from "cors";
import https from "https";
import { encodeQueryData } from "../utils/utils";

const app = express();

require("dotenv").config();

// Enable cross-origin resource sharing.
app.use(cors());

app.listen(8000, () => {
  console.log("Express server started!");
});

// Get Departures data.
app.use("/api/departures", (queryParams, response) => {
  const poll = queryParams.query?.poll ?? "false";
  const { departureDate, adult, child, senior, lang, currency } =
    queryParams.query;

  // Create the URL Params for the query.
  let path = `/x-departures/f2m673/f25dvk/${departureDate}?${encodeQueryData({
    adult,
    child,
    senior,
    lang,
    currency,
  })}`;

  // Append the "Poll" parameter if polling needs to continue.
  if (poll === "true") {
    path = `${path}/poll?index=10`;
  }

  const options = {
    headers: {
      Accept:
        "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
      "X-Busbud-Token": "PARTNER_c9g6z7V0SNqUlnar2EFsxw",
    },
    hostname: "napi.busbud.com",
    path,
    method: "GET",
  };

  const chunks = [];

  // Complete the request by appending all the data chunks until they're ready to be returned.
  const req = https.request(options, (res) => {
    res.on("data", (chunk) => {
      chunks.push(chunk);
    });

    res.on("end", () => {
      const data = Buffer.concat(chunks);

      response.send(data);
    });
  });

  req.end();
});
