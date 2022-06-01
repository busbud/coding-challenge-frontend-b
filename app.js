const express = require("express");
const axios = require("axios");
const { createServer } = require("http");
const cors = require("cors");
const qs = require("qs");
const url = require("url");
const path = require("path");

const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false,
  },
});

const ExpressRedisCache = require("express-redis-cache")({ client: client });

// const ExpressRedisCache = require("express-redis-cache");
const { initializeSearch, searchPolling } = require("./services/search");

const app = express();

app.use(cors());

const buildPath = path.join(__dirname, ".", "client/build");
app.use(express.static(buildPath));

const version = "api/v1";

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params);
};

redis_uri = url.parse(process.env.REDIS_URL);

const cache = ExpressRedisCache;

app.get(
  `/${version}/search/:origin/:destination/:outbound_date`,
  cache.route(),
  initializeSearch
);

app.get(
  `/${version}/search/:origin/:destination/:outbound_date/poll`,
  cache.route(),
  searchPolling
);

const port = process.env.PORT || 3001;
const server = createServer(app);
server.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
