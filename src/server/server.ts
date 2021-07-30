import express from "express";
import cors from "cors";
import https from "https";

const app = express();

require("dotenv").config();

// Enable cross-origin resource sharing.
app.use(cors());

app.listen(8000, () => {
  console.log("Express server started!");
});

app.use("/api/departures", (queryParams, response) => {
  const poll = queryParams.query?.poll ?? "false";

  let path =
    "/x-departures/f2m673/f25dvk/2021-08-02?adult=1&child=0&senior=0&lang=en&currency=CAD";

  if (poll === "true") {
    path = `${path}/poll`;
  }

  console.log(path);

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
